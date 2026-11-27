// Fails when a prerendered page shows a brand name that browser auto-translate
// can still reach, i.e. visible text outside a translate="no" element.
// Brand names are wrapped automatically (see src/lib/utils/brands.js); this
// catches text that slips past that. Run after `bun run build`.

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { BRAND } from '../src/lib/utils/brands.js';

const BUILD = 'build';

// hand-written pages in static/ are copied into the build as-is, so the automatic
// wrapping never sees them; they're left out rather than wrapped by hand
const STATIC = 'static';

// text that can't be wrapped, as [page, text containing the brand name]
const ALLOWED = [
];

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

// <head> is title and meta tags, and these never show as page text. Text the
// automatic wrapping skips (<option>, <code>, <svg>, ...) is still checked: it
// needs a translate="no" by hand.
const SKIP = new Set(['head', 'script', 'style', 'template']);

const copied = new Set(readdirSync(STATIC, { recursive: true }));

const pages = readdirSync(BUILD, { recursive: true })
  .filter(file => file.endsWith('.html') && !copied.has(file))
  .map(file => join(BUILD, file));

if (pages.length === 0) throw new Error(`no pages in ${BUILD}/, run the build first`);

const unwrapped = page => {
  const html = readFileSync(page, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const found = [];
  const stack = [];
  for (const part of html.split(/(<[^>]*>)/)) {
    const tag = part.match(/^<(\/?)([a-zA-Z][\w:-]*)/);
    if (tag) {
      const [, closing, rawName] = tag;
      const name = rawName.toLowerCase();
      if (closing) {
        const index = stack.findLastIndex(element => element.name === name);
        if (index !== -1) stack.length = index;
      } else if (!part.endsWith('/>') && !VOID_ELEMENTS.has(name)) {
        stack.push({ name, skip: SKIP.has(name) || /\stranslate\s*=\s*["']?no\b/i.test(part) });
      }
    } else if (!stack.some(element => element.skip)) {
      const match = part.match(BRAND);
      if (match) found.push(part.replace(/\s+/g, ' ').trim());
    }
  }
  return found;
};

let failures = 0;
for (const page of pages) {
  const path = relative(BUILD, page);
  for (const text of unwrapped(page)) {
    if (ALLOWED.some(([allowedPage, allowedText]) => allowedPage === path && text.includes(allowedText))) continue;
    console.error(`${path}: "${text}"`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} brand name(s) can be translated by the browser. They are wrapped in translate="no" automatically`);
  console.error('(src/lib/preprocess/brands.js), so this text skipped that: render it through the template or {@html}.');
  process.exit(1);
}

console.log(`brand names are marked untranslated on all ${pages.length} pages`);
