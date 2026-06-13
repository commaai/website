# https://comma.ai

Built with [Hugo](https://gohugo.io) (extended edition) — no JS framework, no node build step.

## Develop

`./live.sh` is probably all you want to use (it'll take care of setup).

---

Other commands to know:
```bash
# start dev server (http://localhost:1313)
hugo server

# production build (flat .html files into build/, served by firebase cleanUrls)
hugo --gc --cleanDestinationDir
firebase serve  # or `bun run preview` without firebase login
```

use `./encode.sh <video_file.mp4>` to update the hero video

## Layout

- `content/` — every page lives here as ONE file: front matter (title, `js:` bundle, head extras) + the full page markup inside `{{< body.inline >}}`. Exception: the 17 `/shop` product pages are front-matter-only stubs stamped from `data/products.json` by the shared `layouts/shop/single.html` template.
- `layouts/` — the shell (`baseof`, header/footer/cart partials, the shared product template); page markup does NOT live here
- `assets/js/` — vanilla JS; `main.js` is the global shell (cart, menus), `pages/<name>.js` are per-page entries (each starts with `import '../main.js'`), bundled by Hugo's esbuild
- `assets/css/site.css` — the stylesheet (scoped class names `svelte-*` are kept from the old build; HTML and CSS must agree on them)
- `data/` — products, vehicles (regenerated nightly by the compatibility workflow), harnesses, faq
- `static/img/` — images; each jpg/jpeg/png/gif has committed `.avif`/`.webp` siblings rendered by `partials/picture.html`. After adding images, run `bun install && bun run images` (uses sharp) and commit the variants.

Shopify Storefront credentials live in `hugo.toml` under `params.shopify` (dev store).
Production overrides via env: `HUGO_PARAMS_SHOPIFY_STOREFRONTAPITOKEN` (set in CI).
The build fetches the blog feed (header menu, /openpilot) and Shopify product data
(/shop/*) at build time and fails hard if either is unreachable — same behavior as
the old SvelteKit prerender.
