# https://comma.ai

Built on [Svelte 4](https://svelte.dev).

## Develop

`./live.sh` is probably all you want to use (it'll take care of setup).

---

Other commands to know:
```bash
# install dependencies
bun install

# start dev server
bun run dev

# production build
bun run build
firebase serve  # or `bun run preview` without firebase login
```

FFmpeg with HLS support is required for development and production builds. Set `FFMPEG` to override the executable.
The landscape HLS video is generated from the downloadable driving MP4 without re-encoding.

use `./encode.sh <video_file.mp4>` to update other hero videos


## Compress assets

Requires Python 3.11+ with Pillow, `oxipng`, and FFmpeg/ffprobe with libx264 and HLS support.

```bash
# Generate smaller candidates and a before/after HTML page; source files stay unchanged.
./scripts/compress-assets.sh --output artifacts/compression-review

# Apply that reviewed report without encoding again.
./scripts/compress-assets.sh --apply-report artifacts/compression-review
```

Use `--images-only` for a faster image-only pass. Set `FFMPEG` and `FFPROBE` to override the video tools.

The script captures the reviewed JPEG85 (4:4:4 for brand assets), exact-alpha PNG, and H.264 CRF20–25 policies.
Photographic PNG conversion is explicitly allowlisted in the script; add new photos there after review.
It applies reviewed size caps to display-only illustrations and videos, retains rendering metadata,
validates video frame counts/FPS/audio, and skips
already compressed JPEG/video outputs. Applying a report checks source and candidate hashes, updates
renamed image references, and leaves committing the changes to you. Review visual quality before applying.
