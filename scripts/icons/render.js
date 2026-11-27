// Renders the site icons into static/ from the comma mark in src/lib/icons/comma.svg.
//
//   bun run icons
//
// Writes (overwriting; re-run after changing the mark or the settings below):
//   favicon.svg            comma mark, black, white in dark mode (prefers-color-scheme)
//   favicon.ico            16, 32 and 48 px, black mark on transparent (like the old favicon.png)
//   apple-touch-icon.png   180 px, black mark on white (iOS needs it opaque)
//   icon-192.png           Android / manifest icons, black mark on white
//   icon-512.png
//   icon-maskable-512.png  mark inside the maskable safe zone (centre 80% circle)
//   manifest.webmanifest
//
// static/favicon.png (the old 32 px icon) is left in place for old bookmarks and links.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from '../og/browser.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const STATIC = join(ROOT, 'static');

const THEME_COLOR = '#f5f5f5';
const BACKGROUND = '#ffffff';

// the mark is 24 x 42 units
const COMMA_PATH = readFileSync(join(ROOT, 'src/lib/icons/comma.svg'), 'utf8').match(/ d="([^"]+)"/)[1];
const MARK_WIDTH = 24;
const MARK_HEIGHT = 42;

// square SVG with the mark centred at `height` (fraction of the square), optional background
function iconSvg({ height, background = null, darkMode = false }) {
  const size = MARK_HEIGHT / height;
  const x = (size - MARK_WIDTH) / 2;
  const y = (size - MARK_HEIGHT) / 2;
  const n = value => Number(value.toFixed(3));
  const style = darkMode
    ? `<style>path{fill:#000}@media (prefers-color-scheme:dark){path{fill:#fff}}</style>`
    : '';
  const rect = background ? `<rect width="${n(size)}" height="${n(size)}" fill="${background}"/>` : '';
  const fill = darkMode ? '' : ' fill="#000"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(size)} ${n(size)}">${style}${rect}`
    + `<path transform="translate(${n(x)} ${n(y)})"${fill} d="${COMMA_PATH}"/></svg>\n`;
}

// ICO with PNG-compressed entries (supported by every browser that reads .ico)
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map(png => png.data)]);
}

const browser = await launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

async function png(svg, size, transparent) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<!doctype html><html><head><style>
    html, body { margin: 0; background: transparent; }
    img { display: block; width: ${size}px; height: ${size}px; }
  </style></head><body><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"></body></html>`);
  await page.evaluate(() => document.images[0].decode());
  return page.screenshot({ type: 'png', omitBackground: transparent });
}

const write = (name, data) => {
  writeFileSync(join(STATIC, name), data);
  console.log(`wrote ${name} (${data.length} bytes)`);
};

try {
  // tab icons: the mark nearly fills the square
  write('favicon.svg', iconSvg({ height: 0.94, darkMode: true }));
  const tab = iconSvg({ height: 0.94 });
  // one at a time: png() resizes the shared page, so parallel renders would all come out at the last size
  const tabPngs = [];
  for (const size of [16, 32, 48]) tabPngs.push({ size, data: await png(tab, size, true) });
  write('favicon.ico', ico(tabPngs));

  // home screen icons: opaque, with room around the mark
  const tile = iconSvg({ height: 0.6, background: BACKGROUND });
  write('apple-touch-icon.png', await png(tile, 180, false));
  write('icon-192.png', await png(tile, 192, false));
  write('icon-512.png', await png(tile, 512, false));

  // maskable: the 24 x 42 mark at 50% height has a diagonal of ~58%, inside the 80% safe circle
  write('icon-maskable-512.png', await png(iconSvg({ height: 0.5, background: BACKGROUND }), 512, false));
} finally {
  await browser.close();
}

const manifest = {
  name: 'comma.ai',
  short_name: 'comma',
  start_url: '/',
  scope: '/',
  display: 'browser',
  theme_color: THEME_COLOR,
  background_color: BACKGROUND,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
write('manifest.webmanifest', JSON.stringify(manifest, null, 2) + '\n');
