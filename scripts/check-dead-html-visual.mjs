import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [beforeUrl, afterUrl] = process.argv.slice(2);
if (!beforeUrl || !afterUrl) {
  console.error('Usage: node scripts/check-dead-html-visual.mjs <before-url> <after-url>');
  process.exit(2);
}

const routes = [
  '/', '/shop', '/shop/comma-four', '/shop/chestnut', '/shop/body',
  '/shop/comma-four-trade-in', '/vehicles', '/openpilot', '/setup',
  '/support', '/jobs', '/connect', '/media', '/terms', '/neurips.html',
  '/leaderboard.html', '/harness-parts.html',
];
const viewports = [390, 1440];
const outputDirectory = resolve('/tmp/dead-html-visual');
const browser = await chromium.launch({ headless: true });
const failures = [];
mkdirSync(outputDirectory, { recursive: true });

async function capture(url, route, width) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });

  await page.addInitScript(() => {
    const fixedTime = Date.parse('2026-11-01T00:00:00Z');
    Date.now = () => fixedTime;
  });
  await page.route('**/*', (request) => {
    const requestHost = new URL(request.request().url()).hostname;
    return requestHost === '127.0.0.1' || requestHost === 'localhost'
      ? request.continue()
      : request.abort();
  });

  const response = await page.goto(new URL(route, url).href, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  }).catch(() => null);
  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((image) => {
      image.loading = 'eager';
    });
  });
  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete),
    null,
    { timeout: 5_000 },
  ).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: 'video{visibility:hidden!important}*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}',
  });
  await page.waitForTimeout(500);
  const image = await page.screenshot({ fullPage: true, animations: 'disabled' });
  await page.close();
  return { image, status: response?.status() ?? null };
}

try {
  for (const width of viewports) {
    for (const [index, route] of routes.entries()) {
      const before = await capture(beforeUrl, route, width);
      const after = await capture(afterUrl, route, width);
      const beforePath = resolve(outputDirectory, `before-${width}-${index}.png`);
      const afterPath = resolve(outputDirectory, `after-${width}-${index}.png`);
      writeFileSync(beforePath, before.image);
      writeFileSync(afterPath, after.image);

      const a = await sharp(before.image).raw().toBuffer({ resolveWithObject: true });
      const b = await sharp(after.image).raw().toBuffer({ resolveWithObject: true });
      const matches = a.info.width === b.info.width
        && a.info.height === b.info.height
        && a.data.equals(b.data)
        && before.status === 200
        && after.status === 200;

      if (!matches) failures.push({ width, route, beforeStatus: before.status, afterStatus: after.status });
      console.log(`${width}px ${route}: ${matches ? 'MATCH' : 'DIFF'}`);
    }
  }
} finally {
  await browser.close();
}

console.log(`Compared ${routes.length * viewports.length} pages; ${failures.length} mismatches.`);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
