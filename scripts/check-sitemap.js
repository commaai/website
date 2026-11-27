// Fails when build/sitemap.xml isn't valid XML or lists a page that isn't in the build

import { existsSync, readFileSync } from 'node:fs';
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
console.log(`sitemap ok: ${urls.length} urls`);
