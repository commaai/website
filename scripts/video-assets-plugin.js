import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { access, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

const exec = promisify(execFile);

export function videoAssets() {
  return {
    name: 'video-assets',
    enforce: 'pre',
    // SvelteKit discovers static files in its config hook. Generate these first
    // for both dev and build, before discovery and Vite's public-directory copy.
    config: {
      order: 'pre',
      async handler(config) {
        await buildVideoAssets(resolve(config.root || '.'));
      },
    },
  };
}

export async function buildVideoAssets(root) {
  const source = join(root, 'src/lib/images/products/comma-four/driving-landscape.mp4');
  const target = join(root, 'static/videos/hero-landscape');
  const cache = join(root, 'node_modules/.cache/video-assets');
  const stamp = join(cache, 'hero-landscape.json');
  const hash = createHash('sha256').update(await readFile(source)).digest('hex');
  try {
    const saved = JSON.parse(await readFile(stamp, 'utf8'));
    if (saved.hash === hash && saved.files.length) {
      await Promise.all(saved.files.map((file) => access(join(target, file))));
      return;
    }
  } catch {
    // A fresh checkout, changed source, or missing output needs regeneration.
  }

  let ffmpeg = process.env.FFMPEG || 'ffmpeg';
  if (!process.env.FFMPEG) {
    try {
      const { stdout } = await exec(ffmpeg, ['-hide_banner', '-formats']);
      if (!/\bhls\b/.test(stdout)) ffmpeg = '/usr/bin/ffmpeg';
    } catch {
      ffmpeg = '/usr/bin/ffmpeg';
    }
  }
  await mkdir(cache, { recursive: true });
  await mkdir(target, { recursive: true });
  const staging = await mkdtemp(join(cache, 'hero-landscape-'));
  const started = performance.now();
  try {
    // The canonical MP4 already has suitable keyframes. Copy its H.264 stream
    // without another lossy encode; the landscape hero has no audio.
    await exec(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-y', '-i', source,
      '-map', '0:v:0', '-c:v', 'copy', '-an', '-f', 'hls',
      '-hls_time', '2', '-hls_playlist_type', 'vod',
      '-hls_segment_filename', join(staging, 'part_%03d.ts'),
      join(staging, 'hero-landscape.m3u8'),
    ]);
    const files = await readdir(staging);
    if (!files.includes('hero-landscape.m3u8') || !files.some((file) => file.endsWith('.ts'))) {
      throw new Error('FFmpeg did not produce the landscape HLS video');
    }
    // Install only a complete generation; leave the poster and other files alone.
    for (const file of files.filter((file) => file.endsWith('.ts'))) {
      await rename(join(staging, file), join(target, file));
    }
    await rename(join(staging, 'hero-landscape.m3u8'), join(target, 'hero-landscape.m3u8'));
    for (const file of await readdir(target)) {
      if (/^part_.*\.ts$/.test(file) && !files.includes(file)) await rm(join(target, file));
    }
    await writeFile(stamp, JSON.stringify({ hash, files }));
    console.log(`Created landscape HLS from its MP4 (${((performance.now() - started) / 1000).toFixed(2)}s)`);
  } catch (error) {
    throw new Error(`Cannot generate landscape HLS. Install FFmpeg with HLS support or set FFMPEG. ${error.message}`, { cause: error });
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}
