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

use `./encode.sh <video_file.mp4>` to update the hero video

## Vehicle setup guides

`src/lib/setup-guides.json` is generated from opendbc CarDocs alongside the
vehicle list by `scripts/compatibility.py`. Shared setup blocks live in
`opendbc/car/docs_definitions.py`; brand-specific instructions live in each
brand’s existing `values.py`, in its CarDocs subclass. Edit content there;
the website maps media keys to photos/illustrations and renders the guide.

For this draft, the compatibility workflow uses the companion opendbc branch
`vehicle-setup-instructions`. From that opendbc checkout, regenerate with:

```bash
uv run --with jinja2 python /path/to/website/scripts/compatibility.py
```

The setup page uses the existing `?harness=` links and saved vehicle selection.
The location diagrams are illustrative; model-specific references are included
in each guide. Before merging, replace the workflow branch pin with the merged
opendbc revision.
