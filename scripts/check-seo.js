// Checks the built site's search and share tags. Run after `bun run build`:
//
//   bun scripts/check-seo.js [build-dir] [--json]
//
// Fails (exit 1) when:
//   - build/robots.txt or build/sitemap.xml is missing, robots.txt blocks the whole site,
//     or the sitemap is invalid XML
//   - a sitemap URL isn't https://comma.ai + path, or doesn't map to an indexable built page
//   - an indexable page doesn't have exactly one <title>, meta description, canonical,
//     og:title, og:description, og:image, og:url and twitter:card, or its canonical / og:url
//     isn't https://comma.ai + its path, or its canonical isn't in the sitemap
//   - a page doesn't have exactly one <h1>
//   - a JSON-LD block doesn't parse, misses @context or @type, or has a Product
//     without offers carrying a price and priceCurrency
//   - any page (noindex ones too) has no <title>
//
// Warns (no fail) on titles or descriptions shared by several pages, and on an og:image
// that isn't in the build or isn't 1200x630.
//
// Pages marked <meta name="robots" content="noindex"> only need a title (plus valid JSON-LD
// and one <h1>), and must stay out of the sitemap. 404.html is SvelteKit's SPA fallback
// (an empty shell that renders client side) and is skipped. Plain HTML pages copied from
// static/ are hand-written, so for them everything except the title, the canonical matching
// its path and the sitemap is a warning.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

const ORIGIN = 'https://comma.ai';
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// SvelteKit's SPA fallback (svelte.config.js `fallback`)
const FALLBACK = '404.html';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const buildDir = args.find(arg => !arg.startsWith('--')) ?? 'build';

const siteErrors = [];
const siteWarnings = [];

// ---------- tiny HTML helpers (the build is our own SvelteKit output, so regexes suffice) ----------

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function attributes(tag) {
  const attrs = {};
  for (const [, name, , double, single, bare] of tag.matchAll(/([^\s=/>]+)(\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    attrs[name.toLowerCase()] = decode(double ?? single ?? bare ?? '');
  }
  return attrs;
}

// every <tag …> in html, as attribute maps
function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([tag]) => attributes(tag.slice(name.length + 1)));
}

function metas(head, key, value) {
  return tags(head, 'meta').filter(attrs => attrs[key]?.toLowerCase() === value).map(attrs => attrs.content ?? '');
}

function parsePage(html) {
  // comments hide markup (e.g. the commented-out live chat script) and Svelte's hydration markers
  const clean = html.replace(/<!--[\s\S]*?-->/g, '');
  const headEnd = clean.search(/<\/head>/i);
  const head = headEnd === -1 ? clean : clean.slice(0, headEnd);
  const body = headEnd === -1 ? '' : clean.slice(headEnd);
  const robots = metas(head, 'name', 'robots').join(',').toLowerCase();

  return {
    titles: [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(([, text]) => decode(text).trim()),
    descriptions: metas(head, 'name', 'description'),
    canonicals: tags(head, 'link').filter(attrs => attrs.rel?.toLowerCase() === 'canonical').map(attrs => attrs.href ?? ''),
    og: name => metas(head, 'property', `og:${name}`),
    twitter: name => [...metas(head, 'name', `twitter:${name}`), ...metas(head, 'property', `twitter:${name}`)],
    noindex: /\bnoindex\b/.test(robots),
    h1s: (body.match(/<h1[\s>]/gi) ?? []).length,
    jsonLd: [...clean.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
      .filter(([, attrs]) => attributes(attrs).type?.toLowerCase() === 'application/ld+json')
      .map(([, , text]) => text),
  };
}

// ---------- JSON-LD ----------

const types = node => [node?.['@type']].flat().filter(Boolean);

function checkOffers(offers) {
  const list = [offers].flat().filter(Boolean);
  if (!list.length) return 'has no offers';
  for (const offer of list) {
    const price = types(offer).includes('AggregateOffer') ? offer.lowPrice ?? offer.price : offer.price;
    if (price === undefined || price === null || price === '' || Number.isNaN(Number(price))) return `offer has no numeric price (${JSON.stringify(price)})`;
    if (!/^[A-Z]{3}$/.test(offer.priceCurrency ?? '')) return `offer has no priceCurrency (${JSON.stringify(offer.priceCurrency)})`;
  }
  return null;
}

// every Product anywhere in the data, with its name for the report
function products(node, found = []) {
  if (Array.isArray(node)) node.forEach(item => products(item, found));
  else if (node && typeof node === 'object') {
    if (types(node).includes('Product')) found.push(node);
    Object.values(node).forEach(value => products(value, found));
  }
  return found;
}

function checkJsonLd(blocks) {
  const problems = [];
  const summary = [];
  blocks.forEach((text, i) => {
    const label = `JSON-LD #${i + 1}`;
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      problems.push(`${label} doesn't parse: ${error.message}`);
      return;
    }
    for (const item of [data].flat()) {
      if (!item || typeof item !== 'object') {
        problems.push(`${label} isn't an object`);
        continue;
      }
      if (!item['@context']) problems.push(`${label} has no @context`);
      const nodes = item['@graph'] ? [item['@graph']].flat() : [item];
      for (const node of nodes) {
        if (!types(node).length) problems.push(`${label} has a node without @type`);
        else summary.push(types(node).join('/'));
      }
    }
    for (const product of products(data)) {
      const problem = checkOffers(product.offers);
      if (problem) problems.push(`${label} Product "${product.name ?? '?'}" ${problem}`);
    }
  });
  return { problems, summary };
}

// ---------- image dimensions from header bytes ----------

function imageSize(file) {
  const bytes = readFileSync(file);
  // PNG: IHDR is the first chunk
  if (bytes.length >= 24 && bytes.readUInt32BE(0) === 0x89504e47) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  // JPEG: walk the segments to the first start-of-frame
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = bytes[offset + 1];
      if (marker === 0xff) {
        offset++;
        continue;
      }
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const isFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isFrame) return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
      offset += 2 + bytes.readUInt16BE(offset + 2);
    }
    return null;
  }
  // WebP (VP8, VP8L, VP8X)
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = bytes.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const bits = bytes.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') return { width: bytes.readUIntLE(24, 3) + 1, height: bytes.readUIntLE(27, 3) + 1 };
  }
  return null;
}

const imageCache = new Map();

function checkShareImage(url) {
  if (imageCache.has(url)) return imageCache.get(url);
  let problem = null;
  let parsed = null;
  try {
    parsed = new URL(url);
  } catch {
    problem = `og:image isn't an absolute URL: ${url}`;
  }
  if (parsed && parsed.origin !== ORIGIN) problem = `og:image isn't served from ${ORIGIN}, can't check it: ${url}`;
  else if (parsed) {
    const file = join(buildDir, decodeURIComponent(parsed.pathname));
    if (!existsSync(file)) problem = `og:image isn't in the build: ${parsed.pathname}`;
    else {
      const size = imageSize(file);
      if (!size) problem = `og:image size unreadable: ${parsed.pathname}`;
      else if (size.width !== OG_WIDTH || size.height !== OG_HEIGHT) {
        problem = `og:image is ${size.width}x${size.height}, not ${OG_WIDTH}x${OG_HEIGHT}: ${parsed.pathname}`;
      }
    }
  }
  imageCache.set(url, problem);
  return problem;
}

// ---------- site files ----------

function listHtml(dir, prefix = '') {
  return readdirSync(join(dir, prefix), { withFileTypes: true }).flatMap(entry => {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return rel === '_app' ? [] : listHtml(dir, rel);
    return entry.name.endsWith('.html') ? [rel] : [];
  });
}

const pathFor = file => {
  const path = `/${file.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '')}`;
  return path.length > 1 ? path.replace(/\/$/, '') : '/';
};

const fileFor = path => [
  path === '/' ? 'index.html' : `${path.slice(1)}.html`,
  path === '/' ? null : `${path.slice(1)}/index.html`,
].find(file => file && existsSync(join(buildDir, file)));

if (!existsSync(buildDir)) {
  console.error(`no build at ${buildDir}; run \`bun run build\` first`);
  process.exit(1);
}

// robots.txt
const robotsFile = join(buildDir, 'robots.txt');
if (!existsSync(robotsFile)) siteErrors.push('robots.txt is missing');
else {
  const robots = readFileSync(robotsFile, 'utf8');
  let everyone = false;
  for (const line of robots.split('\n').map(line => line.replace(/#.*/, '').trim())) {
    const [key, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (/^user-agent$/i.test(key)) everyone = value === '*';
    if (everyone && /^disallow$/i.test(key) && value === '/') siteErrors.push('robots.txt disallows the whole site for User-agent: *');
  }
  if (!new RegExp(`^sitemap:\\s*${ORIGIN}/sitemap\\.xml\\s*$`, 'im').test(robots)) {
    siteWarnings.push(`robots.txt has no "Sitemap: ${ORIGIN}/sitemap.xml" line`);
  }
}

// sitemap.xml
let sitemapUrls = [];
const sitemapFile = join(buildDir, 'sitemap.xml');
if (!existsSync(sitemapFile)) siteErrors.push('sitemap.xml is missing');
else {
  const xml = readFileSync(sitemapFile, 'utf8');
  const valid = XMLValidator.validate(xml);
  if (valid !== true) siteErrors.push(`sitemap.xml is invalid XML: ${valid.err.msg} (line ${valid.err.line})`);
  else {
    const urlset = new XMLParser().parse(xml).urlset;
    if (!urlset) siteErrors.push('sitemap.xml has no <urlset>');
    sitemapUrls = [urlset?.url ?? []].flat().map(url => String(url?.loc ?? ''));
    if (!sitemapUrls.length) siteErrors.push('sitemap.xml lists no URLs');
    const seen = new Set();
    for (const url of sitemapUrls) {
      if (seen.has(url)) siteWarnings.push(`sitemap lists ${url} twice`);
      seen.add(url);
    }
  }
}
const sitemap = new Set(sitemapUrls);

// ---------- pages ----------

const staticPages = new Set(existsSync('static') ? listHtml('static') : []);
const files = listHtml(buildDir).sort();
const pages = [];

for (const file of files) {
  const path = pathFor(file);
  const page = { path, file, kind: 'page', title: null, errors: [], warnings: [], jsonLd: [] };
  pages.push(page);

  if (file === FALLBACK) {
    page.kind = 'skipped';
    page.note = 'SPA fallback';
    continue;
  }

  const html = readFileSync(join(buildDir, file), 'utf8');
  const parsed = parsePage(html);
  const handWritten = staticPages.has(file);
  page.kind = parsed.noindex ? 'noindex' : handWritten ? 'static' : 'page';
  page.title = parsed.titles[0] ?? null;

  // hand-written static/ pages warn on what a SvelteKit page would fail on
  const soft = message => (handWritten ? page.warnings : page.errors).push(message);
  const one = (name, values) => {
    if (values.length !== 1) soft(values.length ? `${values.length}x ${name}` : `no ${name}`);
    else if (!values[0].trim()) soft(`empty ${name}`);
  };

  if (!parsed.titles.length || !parsed.titles[0]) page.errors.push('no <title>');
  else if (parsed.titles.length > 1) page.errors.push(`${parsed.titles.length}x <title>`);

  if (parsed.h1s !== 1) soft(`${parsed.h1s}x <h1>`);

  const ld = checkJsonLd(parsed.jsonLd);
  ld.problems.forEach(soft);
  page.jsonLd = ld.summary;

  const expected = ORIGIN + path;
  if (parsed.noindex) {
    if (sitemap.has(expected)) page.errors.push('noindex page is in the sitemap');
    if (parsed.canonicals.length) page.warnings.push('noindex page has a canonical');
    continue;
  }

  page.description = parsed.descriptions[0] ?? null;
  one('meta description', parsed.descriptions);
  for (const name of ['title', 'description', 'image', 'url']) one(`og:${name}`, parsed.og(name));
  one('twitter:card', parsed.twitter('card'));

  // canonical: the page's own clean URL, listed in the sitemap
  if (parsed.canonicals.length > 1) page.errors.push(`${parsed.canonicals.length}x canonical`);
  const canonical = parsed.canonicals[0];
  if (canonical === undefined) {
    if (handWritten && !sitemap.has(expected)) page.warnings.push('no canonical and not in the sitemap (indexable by default)');
    else page.errors.push('no canonical');
  } else {
    if (canonical !== expected) page.errors.push(`canonical is ${canonical}, expected ${expected}`);
    if (!sitemap.has(canonical)) page.errors.push(`canonical ${canonical} isn't in the sitemap`);
  }
  const ogUrl = parsed.og('url')[0];
  if (ogUrl !== undefined && ogUrl !== expected) soft(`og:url is ${ogUrl}, expected ${expected}`);

  const image = parsed.og('image')[0];
  if (image) {
    const problem = checkShareImage(image);
    if (problem) page.warnings.push(problem);
    const [width] = parsed.og('image:width');
    const [height] = parsed.og('image:height');
    if ((width && Number(width) !== OG_WIDTH) || (height && Number(height) !== OG_HEIGHT)) {
      page.warnings.push(`og:image:width/height say ${width}x${height}`);
    }
  }
}

// every sitemap URL is a clean comma.ai URL of an indexable page in the build
const byPath = new Map(pages.map(page => [page.path, page]));
for (const url of sitemapUrls) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    siteErrors.push(`sitemap URL isn't a URL: ${url}`);
    continue;
  }
  const clean = parsed.origin === ORIGIN && !parsed.search && !parsed.hash && (parsed.pathname === '/' || !parsed.pathname.endsWith('/'));
  if (!clean || url !== ORIGIN + parsed.pathname) {
    siteErrors.push(`sitemap URL isn't ${ORIGIN} + a clean path: ${url}`);
    continue;
  }
  const file = fileFor(parsed.pathname);
  const page = file && byPath.get(pathFor(file));
  if (!page) siteErrors.push(`sitemap URL has no built page: ${url}`);
  else if (page.kind === 'skipped') siteErrors.push(`sitemap lists the SPA fallback: ${url}`);
}

// duplicates across indexable pages
const indexable = pages.filter(page => page.kind === 'page' || page.kind === 'static');
for (const field of ['title', 'description']) {
  const groups = new Map();
  for (const page of indexable) {
    if (page[field]) groups.set(page[field], [...(groups.get(page[field]) ?? []), page.path]);
  }
  for (const [value, paths] of groups) {
    if (paths.length > 1) siteWarnings.push(`${paths.length} pages share the ${field} "${value}": ${paths.join(', ')}`);
  }
}

// ---------- report ----------

const errorCount = siteErrors.length + pages.reduce((sum, page) => sum + page.errors.length, 0);
const warningCount = siteWarnings.length + pages.reduce((sum, page) => sum + page.warnings.length, 0);
const ok = errorCount === 0;

if (asJson) {
  console.log(JSON.stringify({ ok, buildDir, errors: errorCount, warnings: warningCount, site: { errors: siteErrors, warnings: siteWarnings }, sitemapUrls: sitemapUrls.length, pages }, null, 2));
} else {
  const status = page => (page.kind === 'skipped' ? 'skip' : page.errors.length ? 'FAIL' : page.warnings.length ? 'warn' : 'ok');
  const truncate = (text, n) => (text.length > n ? `${text.slice(0, n - 1)}…` : text);
  const rows = pages.map(page => [status(page), page.kind, page.path, truncate(page.title ?? page.note ?? '', 48), page.jsonLd.join(' ')]);
  const header = ['status', 'kind', 'path', 'title', 'json-ld'];
  const widths = header.map((name, i) => Math.max(name.length, ...rows.map(row => row[i].length)));
  const line = row => row.map((cell, i) => cell.padEnd(widths[i])).join('  ').trimEnd();
  console.log(line(header));
  console.log(line(widths.map(width => '-'.repeat(width))));
  rows.forEach(row => console.log(line(row)));

  const problems = pages.filter(page => page.errors.length || page.warnings.length);
  if (problems.length || siteErrors.length || siteWarnings.length) console.log('');
  for (const message of siteErrors) console.log(`FAIL  site  ${message}`);
  for (const message of siteWarnings) console.log(`warn  site  ${message}`);
  for (const page of problems) {
    for (const message of page.errors) console.log(`FAIL  ${page.path}  ${message}`);
    for (const message of page.warnings) console.log(`warn  ${page.path}  ${message}`);
  }
  console.log('');
  console.log(`${pages.length} html files, ${indexable.length} indexable, ${sitemapUrls.length} sitemap urls: ${errorCount} errors, ${warningCount} warnings`);
  console.log(ok ? 'seo check passed' : 'seo check FAILED');
}

process.exit(ok ? 0 : 1);
