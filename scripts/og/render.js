// Renders the share images in scripts/og/cards.js to static/og/*.jpg (1200x630 JPEG).
//
//   bun run og                         render every card that doesn't exist yet
//   bun run og -- comma-four-v1.jpg    render only these cards
//   bun run og -- --out /tmp/og-preview   render everything into another directory
//                                         (overwrites there) to preview a change
//
// Existing files in static/og/ are never overwritten: a changed card needs a new name
// (see cards.js). Afterwards every image src/lib/seo/share-images.js points at is checked.
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { launch } from './browser.js';
import { cards } from './cards.js';
import { shareImageFiles } from '../../src/lib/seo/share-images.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const STATIC_OG = join(ROOT, 'static/og');
const WIDTH = 1200;
const HEIGHT = 630;
const QUALITY = 88;
const MAX_BYTES = 300 * 1024;

const fileUrl = path => pathToFileURL(join(ROOT, path)).href;

const COMMA_PATH = readFileSync(join(ROOT, 'src/lib/icons/comma.svg'), 'utf8').match(/ d="([^"]+)"/)[1];

const escapeHtml = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function photoMarkup(card) {
  switch (card.layout) {
    case 'exact':
      return `<img class="exact" style="${card.style}" src="${fileUrl(card.photo)}" alt="">`;
    case 'photo':
      return `<img class="cover" style="object-position: ${card.position ?? '50% 50%'}" src="${fileUrl(card.photo)}" alt="">`;
    case 'product':
      return `<div class="box"><img ${card.trim === false ? '' : 'data-trim'} src="${fileUrl(card.photo)}" alt=""></div>`;
    case 'duo':
      return `<div class="box duo">${card.photos.map(photo => `<div><img data-trim src="${fileUrl(photo)}" alt=""></div>`).join('')}</div>`;
    case 'mark':
      return `<div class="box"><svg class="mark" viewBox="0 0 24 42"><path d="${COMMA_PATH}"/></svg></div>`;
    default:
      throw new Error(`${card.file}: unknown layout ${card.layout}`);
  }
}

function cardHtml(card) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Inter';
    font-weight: 600;
    src: url('${fileUrl('node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2')}') format('woff2');
  }

  @font-face {
    font-family: 'Monument Extended Black';
    src: url('${fileUrl('src/lib/fonts/MonumentExtended/MonumentExtended-Black.woff2')}') format('woff2');
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    background: #ffffff;
  }

  .exact {
    position: absolute;
  }

  .cover {
    position: absolute;
    left: 0;
    top: 0;
    width: ${WIDTH}px;
    height: 474px;
    object-fit: cover;
  }

  .box {
    position: absolute;
    left: 120px;
    top: 48px;
    width: 960px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .duo {
    gap: 64px;
  }

  .duo > div {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mark {
    height: 340px;
    fill: #000000;
  }

  .footer {
    position: absolute;
    left: 44px;
    right: 48px;
    top: 521px;
    height: 61px;
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .label {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 40px;
    letter-spacing: -0.02em;
    line-height: 1;
    color: #000000;
    white-space: nowrap;
    padding-bottom: 4px;
  }

  .rule {
    flex: 1;
    height: 2px;
    background: #000000;
  }

  .wordmark {
    font-family: 'Monument Extended Black';
    font-size: 80px;
    line-height: 1;
    color: #000000;
    margin-left: 8px;
    position: relative;
    top: 7px;
  }
</style>
</head>
<body>
  ${photoMarkup(card)}
  <div class="footer">
    <div class="label">${escapeHtml(card.label)}</div>
    <div class="rule"></div>
    <div class="wordmark">COMMA</div>
  </div>
</body>
</html>`;
}

// Crops each img[data-trim] to its subject: drops transparent and near-white margins, so
// photos shot on white and cut-outs with padding fill the same box.
async function trimImages(page) {
  await page.evaluate(async () => {
    const images = [...document.images];
    await Promise.all(images.map(img => img.decode()));
    for (const img of document.querySelectorAll('img[data-trim]')) {
      const scale = Math.min(1, 800 / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const probe = document.createElement('canvas');
      probe.width = w;
      probe.height = h;
      const ctx = probe.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);
      // rows / columns with only a few stray pixels (JPEG noise, faint shadows) don't count
      const rows = new Array(h).fill(0);
      const cols = new Array(w).fill(0);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const blank = data[i + 3] < 16 || (data[i] > 236 && data[i + 1] > 236 && data[i + 2] > 236);
          if (!blank) {
            rows[y]++;
            cols[x]++;
          }
        }
      }
      const rowMin = Math.max(2, w * 0.01);
      const colMin = Math.max(2, h * 0.01);
      const left = cols.findIndex(count => count >= colMin);
      const right = cols.findLastIndex(count => count >= colMin);
      const top = rows.findIndex(count => count >= rowMin);
      const bottom = rows.findLastIndex(count => count >= rowMin);
      if (right < 0) {
        continue;
      }
      const pad = 2;
      const sx = Math.max(0, (left - pad) / scale);
      const sy = Math.max(0, (top - pad) / scale);
      const sw = Math.min(img.naturalWidth, (right + 1 + pad) / scale) - sx;
      const sh = Math.min(img.naturalHeight, (bottom + 1 + pad) / scale) - sy;
      const crop = document.createElement('canvas');
      crop.width = Math.round(sw);
      crop.height = Math.round(sh);
      crop.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, crop.width, crop.height);
      img.src = crop.toDataURL('image/png');
      await img.decode();
    }
    await document.fonts.ready;
  });
}

function parseArgs(argv) {
  const args = { out: null, only: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--out') {
      args.out = resolve(argv[++i]);
    } else {
      args.only.push(argv[i]);
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const outDir = args.out ?? STATIC_OG;
const preview = args.out !== null;
mkdirSync(outDir, { recursive: true });

const names = new Set();
for (const card of cards) {
  if (!/^[a-z0-9-]+-v\d+\.jpg$/.test(card.file)) {
    throw new Error(`${card.file}: card files are named <name>-v<version>.jpg`);
  }
  if (names.has(card.file)) {
    throw new Error(`${card.file}: two cards share this file name`);
  }
  names.add(card.file);
}
for (const name of args.only) {
  if (!names.has(name)) {
    throw new Error(`${name}: no such card in scripts/og/cards.js`);
  }
}

const todo = cards.filter(card => args.only.length === 0 || args.only.includes(card.file));
const browser = await launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
const work = mkdtempSync(join(tmpdir(), 'og-'));
let failed = false;

try {
  for (const card of todo) {
    const target = join(outDir, card.file);
    if (!preview && existsSync(target)) {
      console.log(`skip    ${card.file} (exists; never overwritten, bump the version in cards.js to change it)`);
      continue;
    }
    const html = join(work, card.file.replace(/\.jpg$/, '.html'));
    writeFileSync(html, cardHtml(card));
    await page.goto(pathToFileURL(html).href);
    await trimImages(page);
    const jpeg = await page.screenshot({ type: 'jpeg', quality: QUALITY });
    writeFileSync(target, jpeg, { flag: preview ? 'w' : 'wx' });
    const kb = Math.round(jpeg.length / 1024);
    console.log(`wrote   ${card.file} (${kb} KB)`);
    if (jpeg.length > MAX_BYTES) {
      console.warn(`warning ${card.file} is over ${MAX_BYTES / 1024} KB`);
    }
  }
} finally {
  await browser.close();
  rmSync(work, { recursive: true, force: true });
}

// every share image the site points at must exist
for (const path of preview ? [] : shareImageFiles()) {
  const file = join(ROOT, 'static', path);
  if (!existsSync(file)) {
    console.error(`missing ${path} (referenced in src/lib/seo/share-images.js)`);
    failed = true;
  } else if (statSync(file).size > MAX_BYTES) {
    console.warn(`warning ${path} is over ${MAX_BYTES / 1024} KB`);
  }
}

process.exit(failed ? 1 : 0);
