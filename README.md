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

## Deploy

Merging to master will deploy the latest state of the repository to the live channel.
