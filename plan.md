Implement the new homepage from the Figma page named exactly **"for codex"**:

https://www.figma.com/design/8fzykqp13zr2FpQxQu5uqH/comma-Website?node-id=1400-262

Canonical target frames:

- Desktop: **"home desktop"**, node `1400:263`, 2048 × 5549
- Mobile: **"home mobile"**, node `1400:633`, 402 × 4394

Do not select homepage frames from the `Concepts`, `Redo 2026`, or
`Concepts (adeeb junk)` pages. The old `node-id=0-1` link opens `Concepts`
and is not the implementation target.

Use the red text on the desktop frame as implementation annotations, not as
visible website content.

- The homepage evaluation script is `scripts/capture-homepage.js`.
- Export both canonical frames as reference images and image-diff the
  implementation against the matching desktop and mobile exports.
