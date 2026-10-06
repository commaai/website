#!/usr/bin/env bash
# Requires Python 3.11+ + Pillow, oxipng, and FFmpeg/ffprobe with libx264 + HLS.
# Preview: ./scripts/compress-assets.sh [--images-only] [--output artifacts/review]
# Apply reviewed candidates: ./scripts/compress-assets.sh --apply-report artifacts/review
# Set FFMPEG/FFPROBE to select different FFmpeg binaries.
# JPEG92/4:4:4 photos; exact-alpha PNG rounding <=1/255; x264 veryslow CRF20–25.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
exec python3 - "$@" <<'PY'
import argparse
import concurrent.futures
import hashlib
import html
import io
import json
import os
import re
import shutil
import struct
import subprocess
import tempfile
from fractions import Fraction
from pathlib import Path
from urllib.parse import quote

parser = argparse.ArgumentParser(prog='scripts/compress-assets.sh', description='Compress website assets into a before/after report; source files stay unchanged until --apply-report.')
parser.add_argument('--output', type=Path, help='New report directory (default: a new folder under artifacts/)')
parser.add_argument('--images-only', action='store_true', help='Skip the slower video encodes')
parser.add_argument('--apply-report', type=Path, help='Apply an existing report, checking that sources/candidates have not changed')
args = parser.parse_args()
repo = Path.cwd()

# Explicitly reviewed photographs: do not turn arbitrary diagrams or cutouts into JPEGs.
photos = {'src/lib/images/hero.png', 'src/lib/images/setup/comma-3x/step-4b.png',
          'static/images/jobs/Frame-176.png', 'static/images/jobs/Frame-176-p-500.png'}
photos.update(f'src/lib/images/manufacturing/factory-{i}.png' for i in range(1, 7))
photos.update(f'src/lib/images/products/chestnut/{name}.png' for name in
              ['plugin_90', 'plugin_cig', 'install_under_seat', 'install_footwell'])
# These full-frame photographs had negligible export alpha, not transparent backgrounds.
near_opaque_photos = {'src/lib/images/products/comma-four/windshield43.png',
                     'src/lib/images/products/comma-four/remount.png'}


def run(command):
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode:
        raise RuntimeError(f'{command[0]} failed:\n{result.stderr[-4000:]}')
    return result.stdout


def digest(path):
    with path.open('rb') as file:
        return hashlib.file_digest(file, 'sha256').hexdigest()


def safe_source(path):
    resolved = (repo / path).resolve()
    if not resolved.is_relative_to(repo) or Path(path).is_absolute():
        raise RuntimeError(f'Invalid asset path: {path}')
    return resolved


def apply_report(folder):
    entries = json.loads((folder / 'manifest.json').read_text())
    pending = []
    for entry in entries:
        old, new = safe_source(entry['oldPath']), safe_source(entry['newPath'])
        if new.exists() and digest(new) == entry['afterSha256'] and (old == new or not old.exists()):
            continue
        if not old.exists() or digest(old) != entry['beforeSha256']:
            raise RuntimeError(f'Source changed since review: {entry["oldPath"]}')
        candidate = folder / 'after' / entry['newPath']
        if digest(candidate) != entry['afterSha256']:
            raise RuntimeError(f'Candidate changed since review: {candidate}')
        if new != old and new.exists():
            raise RuntimeError(f'Refusing to overwrite existing asset: {entry["newPath"]}')
        pending.append((entry, old, new, candidate))
    # Plan every text/config edit before changing any assets.
    renames = [(entry['oldPath'], entry['newPath']) for entry in entries
               if entry['oldPath'] != entry['newPath']]
    text_updates = {}
    for name in run(['git', 'ls-files']).splitlines():
        path = repo / name
        if path.suffix not in {'.svelte', '.js', '.ts', '.json', '.css', '.html', '.md'}:
            continue
        try:
            original = path.read_text()
        except UnicodeDecodeError:  # MPEG-TS video segments also end in .ts.
            continue
        text = original
        for old, new in renames:
            text = text.replace(old, new).replace('/' + Path(old).name, '/' + Path(new).name)
            for prefix in ['src/lib/', 'static/']:
                if old.startswith(prefix):
                    text = text.replace(old[len(prefix):], new[len(prefix):])
        # Serve newly converted full-resolution downloads without another JPEG encode.
        for old, new in renames:
            if new.startswith('src/lib/'):
                source = '$lib/' + new.removeprefix('src/lib/')
                pattern = r'import (\w+Download) from "' + re.escape(source) + r'\?[^"\n]*"'
                for variable in re.findall(pattern, text):
                    text = re.sub(pattern, lambda match: f'import {match[1]} from "{source}?url"', text)
                    text = re.sub(r'(download:\s*' + variable + r',\s*name:\s*"[^"\n]+)\.png"', r'\1.jpg"', text)
        if text != original:
            text_updates[path] = text
    config = repo / 'vite.config.js'
    if renames and config.exists():
        text = text_updates.get(config, config.read_text())
        if 'imagetools({' in text and '/\\?url(?:&|$)/' not in text:
            if re.search(r'\bexclude\s*:', text):
                raise RuntimeError('Add /\\?url(?:&|$)/ to the existing imagetools exclude setting.')
            text_updates[config] = text.replace('imagetools({', "imagetools({\n      exclude: ['public/**/*', /\\?url(?:&|$)/],", 1)
    # Install segments before playlists, then install the preflighted text edits.
    for entry, old, new, candidate in sorted(pending, key=lambda row: row[2].suffix == '.m3u8'):
        shutil.copy2(candidate, new)
        if old != new:
            old.unlink()
    for path, text in text_updates.items():
        path.write_text(text)
    print(f'Applied {len(pending)} asset changes. Rebuild and review the git diff before committing.')


if args.apply_report:
    apply_report(args.apply_report.resolve())
    raise SystemExit()

try:
    from PIL import Image, PngImagePlugin
except ImportError:
    raise SystemExit('Install Pillow in your Python environment: python3 -m pip install Pillow')

if not shutil.which('oxipng'):
    raise SystemExit('Install oxipng first (for example: cargo install oxipng).')
if args.output:
    report = args.output.resolve()
    if report.exists():
        raise SystemExit('Choose a new --output directory; existing reviews are never overwritten.')
    report.mkdir(parents=True)
else:
    (repo / 'artifacts').mkdir(exist_ok=True)
    report = Path(tempfile.mkdtemp(prefix='compression-', dir=repo / 'artifacts'))
work = report / 'work'
work.mkdir()
files = [Path(name) for name in run(['git', 'ls-files']).splitlines()
         if name.startswith(('src/', 'static/')) and (repo / name).is_file()]
entries = []
video_pairs = []


def record(old, new, candidate, method):
    before, after = report / 'before' / old, report / 'after' / new
    before.parent.mkdir(parents=True, exist_ok=True)
    after.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(repo / old, before)
    shutil.copy2(candidate, after)
    return dict(oldPath=str(old), newPath=str(new), originalBytes=before.stat().st_size,
                afterBytes=after.stat().st_size, beforeSha256=digest(before),
                afterSha256=digest(after), method=method)


def png_metadata(path):
    data, offset, info = path.read_bytes(), 8, PngImagePlugin.PngInfo()
    while offset < len(data):
        length = struct.unpack('>I', data[offset:offset + 4])[0]
        kind, chunk = data[offset + 4:offset + 8], data[offset + 8:offset + 8 + length]
        offset += length + 12
        if kind in {b'gAMA', b'cHRM', b'sRGB', b'pHYs', b'tEXt', b'zTXt', b'iTXt'}:
            info.add(kind, chunk)
    return info


sample = io.BytesIO()
Image.new('RGB', (1, 1)).save(sample, format='JPEG', quality=92, subsampling=0)
jpeg92 = Image.open(sample).quantization


def image_candidate(path):
    source, destination = repo / path, work / path
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        if getattr(image, 'is_animated', False):
            return None  # Never flatten an APNG or multi-frame image.
        image.load()
        metadata = {key: image.info[key] for key in ['icc_profile', 'exif'] if image.info.get(key)}
        original_size = source.stat().st_size
        new = path
        if path.suffix.lower() == '.png':
            rgba = image.convert('RGBA')
            alpha = rgba.getchannel('A')
            histogram = alpha.histogram()
            opaque = alpha.getextrema() == (255, 255)
            flatten = str(path) in near_opaque_photos and alpha.getextrema()[0] >= 241 and sum(histogram[:255]) / (image.width * image.height) < .003
            if ((str(path) in photos and opaque) or flatten) and not source.with_suffix('.jpg').exists():
                new, destination = path.with_suffix('.jpg'), destination.with_suffix('.jpg')
                rgb = Image.alpha_composite(Image.new('RGBA', rgba.size, 'white'), rgba).convert('RGB')
                rgb.save(destination, quality=92, subsampling=0, progressive=True, optimize=True, **metadata)
                method, minimum = 'JPEG92 4:4:4; full resolution' + ('; negligible photo alpha flattened white' if flatten else ''), .85
            else:
                shutil.copy2(source, destination)
                run(['oxipng', '-o', '2', str(destination)])
                method, minimum = 'Lossless PNG optimization', .98
                if original_size > 200000 and image.mode in {'RGB', 'RGBA'} and ('products' in path.parts or path.name in {'device.png', 'device-glow.png'}):
                    rgb = tuple(rgba.getchannel(channel).point(lambda value: min(((value + 1) // 2) * 2, 255)) for channel in ['R', 'G', 'B'])
                    rounded = Image.merge('RGBA', (*rgb, alpha))
                    alternate = destination.with_name(destination.stem + '.rgb7.png')
                    rounded.save(alternate, compress_level=9, pnginfo=png_metadata(source), **metadata, **({'dpi': image.info['dpi']} if 'dpi' in image.info else {}))
                    run(['oxipng', '-o', '2', str(alternate)])
                    if alternate.stat().st_size < min(original_size * .85, destination.stat().st_size):
                        destination, method, minimum = alternate, 'PNG RGB rounding <=1/255; exact alpha', .85
        else:
            if image.format != 'JPEG' or original_size < 100000 or image.mode not in {'RGB', 'L'}:
                return None
            if all(jpeg92.get(key) == values for key, values in image.quantization.items()):
                return None  # Do not repeatedly recompress our existing JPEG92 outputs.
            image.save(destination, quality=92, subsampling=0, progressive=True, optimize=True, **metadata)
            method, minimum = 'JPEG92 4:4:4; full resolution', .85
        if destination.stat().st_size >= original_size * minimum:
            return None
        result = record(path, new, destination, method)
        result.update(width=image.width, height=image.height)
        return result


images = [path for path in files if path.suffix.lower() in {'.png', '.jpg', '.jpeg'}]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    entries.extend(result for result in pool.map(image_candidate, images) if result)

if not args.images_only:
    ffmpeg, ffprobe = os.environ.get('FFMPEG', 'ffmpeg'), os.environ.get('FFPROBE', 'ffprobe')
    if not os.environ.get('FFMPEG') and ' hls ' not in run([ffmpeg, '-hide_banner', '-formats']) and Path('/usr/bin/ffmpeg').exists():
        ffmpeg, ffprobe = '/usr/bin/ffmpeg', os.environ.get('FFPROBE', '/usr/bin/ffprobe')

    def probe(path, count=False):
        return json.loads(run([ffprobe, '-v', 'error', *(['-count_frames'] if count else []),
                               '-show_streams', '-show_format', '-of', 'json', str(path)]))

    def stream(data):
        return next(item for item in data['streams'] if item['codec_type'] == 'video')

    def already_encoded(path, crf):
        data = json.loads(run([ffprobe, '-v', 'error', '-select_streams', 'v:0', '-read_intervals', '%+#1',
                               '-show_packets', '-show_data', '-of', 'json', str(path)]))
        if not data.get('packets'):
            return False
        hex_data = ''.join(re.findall(r'^[0-9a-f]{8}: (.*?)  ', data['packets'][0].get('data', ''), re.M)).replace(' ', '')
        raw = bytes.fromhex(hex_data)
        value = re.search(rb'crf=([\d.]+)', raw)
        return value and float(value[1]) >= crf and b'me=umh' in raw and b'subme=10' in raw

    for path in [p for p in files if p.suffix in {'.mp4', '.m3u8'}]:
        is_hls = path.suffix == '.m3u8'
        crf = 25 if path.stem in {'hero-landscape', 'hero-portrait'} else 20 if path.stem == 'driver-monitoring-demo' else 23
        original_files = [path]
        if is_hls:
            names = [line for line in (repo / path).read_text().splitlines() if line and not line.startswith('#')]
            if not all(re.fullmatch(r'[\w.-]+_\d+\.ts', name) for name in names):
                print(f'Skipping {path}: requires a local numbered MPEG-TS playlist.')
                continue
            original_files += [path.parent / name for name in names]
        if already_encoded(repo / path, crf):
            continue
        original_bytes = sum((repo / p).stat().st_size for p in original_files)
        folder = work / path.parent / path.stem
        folder.mkdir(parents=True, exist_ok=True)
        output = folder / path.name
        data = probe(repo / path)
        if sum(s['codec_type'] == 'video' for s in data['streams']) != 1:
            print(f'Skipping {path}: multiple video streams require manual handling.')
            continue
        before_stream = stream(data)
        command = [ffmpeg, '-v', 'error', '-y', '-i', str(repo / path), '-map', '0:v:0', '-map', '0:a?',
                   '-c:v', 'libx264', '-preset', 'veryslow', '-crf', str(crf), '-threads', '4', '-pix_fmt', 'yuv420p', '-c:a', 'copy']
        if is_hls:
            first = re.fullmatch(r'(.*_)(\d+)\.ts', names[0])
            keyframes = str(round(float(Fraction(before_stream['r_frame_rate'])) * 2))
            command += ['-g', keyframes, '-keyint_min', keyframes, '-sc_threshold', '0', '-force_key_frames', 'expr:gte(t,n_forced*2)',
                        '-f', 'hls', '-hls_time', '2', '-hls_list_size', '0', '-hls_playlist_type', 'vod',
                        '-start_number', first[2], '-hls_segment_filename', str(folder / (first[1] + '%0' + str(len(first[2])) + 'd.ts'))]
        else:
            command += ['-movflags', '+faststart']
        print(f'Encoding {path} (CRF{crf})', flush=True)
        run(command + [str(output)])
        outputs = [output] + sorted(folder.glob('*.ts')) if is_hls else [output]
        if sum(p.stat().st_size for p in outputs) >= original_bytes * .99:
            continue
        if is_hls and {p.name for p in outputs} != {p.name for p in original_files}:
            print(f'Skipping {path}: segment names/count changed; requires manual review.')
            continue
        run([ffmpeg, '-v', 'error', '-xerror', '-i', str(output), '-f', 'null', '-'])
        original, encoded = probe(repo / path, True), probe(output, True)
        old_video, new_video = stream(original), stream(encoded)
        assert all(old_video[key] == new_video[key] for key in ['width', 'height', 'r_frame_rate', 'nb_read_frames']), str(path)
        audio = lambda info: [(s['codec_name'], s['sample_rate'], s['channels'], s['nb_read_frames']) for s in info['streams'] if s['codec_type'] == 'audio']
        assert audio(original) == audio(encoded), f'Audio changed: {path}'
        assert abs(float(original['format']['duration']) - float(encoded['format']['duration'])) <= .1001, f'Duration changed: {path}'
        method = f'H.264 veryslow CRF{crf}; original dimensions/FPS/frame count; audio copied'
        for candidate in outputs:
            asset = path.parent / candidate.name if is_hls else path
            if digest(repo / asset) != digest(candidate):
                entries.append(record(asset, asset, candidate, method))
        if is_hls:
            previews = report / 'videos'
            previews.mkdir(exist_ok=True)
            pair = []
            for side, source in [('before', repo / path), ('after', output)]:
                preview = previews / f'{path.stem}-{side}.mp4'
                run([ffmpeg, '-v', 'error', '-y', '-i', str(source), '-c', 'copy', '-movflags', '+faststart', str(preview)])
                pair.append(preview.relative_to(report))
            video_pairs.append((str(path), *pair))

entries.sort(key=lambda entry: entry['originalBytes'] - entry['afterBytes'], reverse=True)
(report / 'manifest.json').write_text(json.dumps(entries, indent=2) + '\n')
shutil.rmtree(work)


def esc(text):
    return html.escape(str(text), quote=True)


def link(path):
    return quote(str(path), safe='/')


cards = []
for name, before, after in video_pairs:
    cards.append(f'<article><h2>Playlist: {esc(name)}</h2><div class="pair"><video controls preload="none" src="{link(before)}"></video><video controls preload="none" src="{link(after)}"></video></div><button class="play">Play both</button></article>')
for entry in entries:
    old, new = entry['oldPath'], entry['newPath']
    before, after = link('before/' + old), link('after/' + new)
    if Path(new).suffix in {'.png', '.jpg', '.jpeg'}:
        media = f'<div class="pair"><a href="{before}"><img loading="lazy" src="{before}"></a><a href="{after}"><img loading="lazy" src="{after}"></a></div><button class="zoom">Toggle full resolution</button>'
    elif Path(new).suffix == '.mp4':
        media = f'<div class="pair"><video controls preload="none" src="{before}"></video><video controls preload="none" src="{after}"></video></div><button class="play">Play both</button>'
    else:
        media = '<p>HLS component; compare the full playlist above.</p>'
    cards.append(f'<article><h2>{esc(old)}</h2><p>{entry["originalBytes"]/1e6:.3f} MB → {entry["afterBytes"]/1e6:.3f} MB · {esc(entry["method"])}</p>{media}<p><a href="{before}">Original</a> · <a href="{after}">Candidate {esc(new)}</a></p></article>')
saved = sum(entry['originalBytes'] - entry['afterBytes'] for entry in entries)
page = '''<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Compression review</title><style>
body{font:16px system-ui;background:#11151b;color:#eef2f6;max-width:1400px;margin:auto;padding:24px}article{border:1px solid #435062;padding:20px;margin:24px 0;border-radius:10px}h2{font-size:17px;overflow-wrap:anywhere}.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}.pair a{display:block;height:400px;overflow:auto;background:repeating-conic-gradient(#eee 0% 25%,#ccc 0% 50%) 0/24px 24px}img{width:100%;height:400px;object-fit:contain}.full img{width:auto;height:auto;max-width:none}video{width:100%;max-height:600px}a{color:#9ac9ff}button{padding:10px;margin-top:12px}p{line-height:1.5}@media(max-width:700px){.pair{grid-template-columns:1fr}}
</style><h1>Compression review</h1>SUMMARY<p>Before is on the left, candidate on the right. Click images to inspect original resolution. Source files are unchanged until --apply-report. Review visually before applying; automated checks cannot judge visual quality.</p>CARDS<script>
document.querySelectorAll('.zoom').forEach(b=>b.onclick=()=>b.closest('article').classList.toggle('full'));document.querySelectorAll('.play').forEach(b=>b.onclick=async()=>{const vs=[...b.closest('article').querySelectorAll('video')];await Promise.all(vs.map(v=>new Promise(r=>{v.pause();v.muted=true;if(v.readyState>=2)return r();v.onloadeddata=r;v.load();})));vs.forEach(v=>v.currentTime=0);await Promise.all(vs.map(v=>v.play()));});
</script>'''
(report / 'index.html').write_text(page.replace('SUMMARY', f'<p>{len(entries)} changed assets · {saved/1e6:.2f} MB saved</p>').replace('CARDS', '\n'.join(cards)))
print(f'{len(entries)} candidates; {saved/1e6:.2f} MB saved. Review: {report / "index.html"}')
print(f'Apply without re-encoding: ./scripts/compress-assets.sh --apply-report {report}')
PY
