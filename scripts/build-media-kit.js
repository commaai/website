import { readFile, writeFile } from 'node:fs/promises';
import { zipSync } from 'fflate';

// Package the actual download links from the rendered page so the ZIP always
// matches the media kit, including Vite's image conversions and filenames.
const html = await readFile('build/media.html', 'utf8');
const files = {};
for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
  const name = tag.match(/\bdownload="([^"]+)"/)?.[1];
  const href = tag.match(/\bhref="([^"]+)"/)?.[1];
  if (!name || !href || name === 'comma-media-kit.zip') continue;
  if (Object.hasOwn(files, name)) throw new Error(`Duplicate media filename: ${name}`);
  if (href.startsWith('data:')) {
    const [, data] = href.split(',');
    files[name] = Buffer.from(data, 'base64');
  } else {
    const url = new URL(href.replaceAll('&amp;', '&'), 'https://comma.ai');
    if (url.origin !== 'https://comma.ai') throw new Error(`External media asset: ${href}`);
    files[name] = await readFile(`build${decodeURIComponent(url.pathname)}`);
  }
}
if (!Object.keys(files).length) throw new Error('No media downloads found');
// Images and videos are already compressed, so avoid recompressing them.
const archive = zipSync(files, { level: 0 });
await writeFile('build/comma-media-kit.zip', archive);
// Vite preview serves the client output rather than the adapter's build directory.
await writeFile('.svelte-kit/output/client/comma-media-kit.zip', archive);
// Also make the archive available in the local development server after a build.
await writeFile('static/comma-media-kit.zip', archive);
console.log(`Created comma-media-kit.zip with ${Object.keys(files).length} assets`);
