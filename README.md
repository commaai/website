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

use `./encode.sh <video_file.mp4> [name] [mode]` to encode videos to HLS format
- `video_file.mp4`: path to input video file
- `name`: output directory name (default: "hero")
- `mode`: encode mode - "hw" (hardware/NVENC) or "sw" (software/CPU, default: "hw")

Examples:
- `./encode.sh landscape.mp4 hero` - creates `static/videos/hero/hero.m3u8`
- `./encode.sh portrait.mp4 hero_portrait` - creates `static/videos/hero_portrait/hero_portrait.m3u8`
- `./encode.sh video.mp4 myvideo sw` - creates `static/videos/myvideo/myvideo.m3u8` using CPU encoding
