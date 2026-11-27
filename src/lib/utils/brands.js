// Browser auto-translate turns brand names into words ("comma" becomes the
// punctuation mark), so every brand name on the site is wrapped in
// <brand-name translate="no">. Nobody has to do that by hand:
// src/lib/preprocess/brands.js wraps static template text at build time and
// routes {expr} and {@html expr} through brandText/markBrands below.
// scripts/check-brands.js fails the build if a brand name is left unwrapped.

export const BRANDS = [
  'comma',
  'comma four',
  'comma 4',
  'comma 3X',
  'comma three',
  'comma 3',
  'comma two',
  'comma 2',
  'comma power',
  'comma prime',
  'comma connect',
  'comma body',
  'comma pedal',
  'comma panda',
  'comma openpilot',
  'commacare',
  'openpilot',
  'chestnut',
];

const words = [...BRANDS]
  .sort((a, b) => b.length - a.length)
  .map(brand => brand.split(' ').join('(?:\\s|&nbsp;)+'))
  .join('|');

// a whole word, and not part of a URL, domain, or handle:
// comma.ai, connect.comma.ai, @comma_ai, github.com/commaai/openpilot, /shop/comma-four
const brand = `(?<![\\w@/-]|\\w\\.)(?:${words})(?![\\w@/-]|\\.\\w)`;

export const BRAND = new RegExp(brand, 'i');
const BRANDS_IN_TEXT = new RegExp(brand, 'gi');

export const TAG = 'brand-name';
export const OPEN_TAG = `<${TAG} translate="no">`;
export const CLOSE_TAG = `</${TAG}>`;

// the brand names in a run of HTML text (no tags)
export const findBrands = text => text.matchAll(BRANDS_IN_TEXT);

// wraps brand names in a run of HTML text (no tags)
export const wrapBrands = text => text.replace(BRANDS_IN_TEXT, match => OPEN_TAG + match + CLOSE_TAG);

// elements whose text is never shown as translatable page text, or can't hold a wrapper
export const SKIP_ELEMENTS = new Set([
  'script',
  'style',
  'title',
  'textarea',
  'option',
  'code',
  'pre',
  'svg',
  'math',
  'noscript',
  TAG,
]);

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

// wraps brand names in an HTML string, leaving tags, attributes, and
// SKIP_ELEMENTS / subtrees alone
export const markBrands = html => {
  if (typeof html !== 'string' || !BRAND.test(html)) return html;

  let skip = null;
  return html.split(/(<!--[\s\S]*?-->|<[^>]*>)/).map(part => {
    const tag = part.match(/^<(\/?)([a-zA-Z][\w:-]*)/);
    if (!tag) {
      return part.startsWith('<') || skip ? part : wrapBrands(part);
    }

    const [, closing, rawName] = tag;
    const name = rawName.toLowerCase();
    const opens = !closing && !part.endsWith('/>') && !VOID_ELEMENTS.has(name);
    if (skip) {
      if (name === skip.name) skip.depth += closing ? -1 : opens ? 1 : 0;
      if (skip.depth === 0) skip = null;
    } else if (opens && (SKIP_ELEMENTS.has(name) || /\stranslate\s*=\s*["']?no\b/i.test(part))) {
      skip = { name, depth: 1 };
    }
    return part;
  }).join('');
};

const escapeHtml = text => text
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

// renders a value the way Svelte 4 renders {value} (String(value), so
// undefined still shows as "undefined"), as HTML with brand names wrapped
export const brandText = value => {
  const text = String(value);
  return BRAND.test(text) ? wrapBrands(escapeHtml(text)) : escapeHtml(text);
};
