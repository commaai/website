import { readFile, writeFile } from 'node:fs/promises';
import { zipSync } from 'fflate';

export function mediaKitZip() {
  let isServerBuild = false;
  return {
    name: 'media-kit-zip',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      isServerBuild = Boolean(config.build.ssr);
    },
    // SvelteKit prerenders in writeBundle and runs the adapter in closeBundle.
    // Generate the archive in between so the adapter includes it automatically.
    writeBundle: {
      order: 'post',
      sequential: true,
      async handler() {
        if (isServerBuild) await buildMediaKit();
      },
    },
  };
}

async function buildMediaKit() {
  const started = performance.now();
  // Package the actual download links from the rendered page so the ZIP always
  // matches the media kit, including Vite's image conversions and filenames.
  const html = await readFile('.svelte-kit/output/prerendered/pages/media.html', 'utf8');
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
      files[name] = await readFile(`.svelte-kit/output/client${decodeURIComponent(url.pathname)}`);
    }
  }
  if (!Object.keys(files).length) throw new Error('No media downloads found');
  // Images and videos are already compressed, so avoid recompressing them.
  const archive = zipSync(files, { level: 0 });
  await writeFile('.svelte-kit/output/client/comma-media-kit.zip', archive);
  // Also make the archive available in the local development server after a build.
  await writeFile('static/comma-media-kit.zip', archive);
  const seconds = ((performance.now() - started) / 1000).toFixed(2);
  console.log(`Created comma-media-kit.zip with ${Object.keys(files).length} assets (${seconds}s)`);
}
