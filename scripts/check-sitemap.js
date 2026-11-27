// Fails when build/sitemap.xml isn't valid XML or lists a page that isn't in the build,
// or when a built page doesn't have exactly one canonical that matches its sitemap URL

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

const xml = readFileSync('build/sitemap.xml', 'utf8');
const valid = XMLValidator.validate(xml);
if (valid !== true) throw new Error(`build/sitemap.xml is invalid: ${JSON.stringify(valid.err)}`);

const urls = [new XMLParser().parse(xml).urlset.url].flat().map(url => url.loc);
const missing = urls.filter(url => {
  const { origin, pathname } = new URL(url);
  const file = pathname === '/' ? 'build/index.html' : `build${pathname}.html`;
  return origin !== 'https://comma.ai' || pathname.endsWith('/') && pathname !== '/' || !existsSync(file);
});

if (missing.length) {
  console.error(`sitemap lists pages that aren't in the build:\n${missing.join('\n')}`);
  process.exit(1);
}

// plain HTML files copied as-is from static/ and the SPA fallback aren't SvelteKit pages
const unmanaged = new Set(['404.html', ...readdirSync('static', { recursive: true }).filter(file => file.endsWith('.html'))]);
const pages = readdirSync('build', { recursive: true })
  .filter(file => file.endsWith('.html') && !unmanaged.has(file))
  .sort();

const sitemapUrls = new Set(urls);
const badCanonicals = pages.flatMap(file => {
  const html = readFileSync(`build/${file}`, 'utf8');
  const canonicals = [...html.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/g)]
    .map(([tag]) => tag.match(/\bhref="([^"]*)"/)?.[1]);
  const path = file === 'index.html' ? '/' : `/${file.slice(0, -'.html'.length)}`;
  const expected = `https://comma.ai${path}`;
  if (canonicals.length !== 1) return [`${file}: ${canonicals.length} canonicals`];
  if (canonicals[0] !== expected) return [`${file}: canonical ${canonicals[0]}, expected ${expected}`];
  if (!sitemapUrls.has(expected)) return [`${file}: ${expected} isn't in the sitemap`];
  return [];
});

if (badCanonicals.length) {
  console.error(`pages with a bad canonical:\n${badCanonicals.join('\n')}`);
  process.exit(1);
}
console.log(`sitemap ok: ${urls.length} urls, ${pages.length} pages with matching canonicals`);
