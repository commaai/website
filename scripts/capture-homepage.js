import { copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const DEFAULT_URL = 'http://127.0.0.1:5173/';
const OUTPUT_DIRECTORY = resolve('artifacts/homepage');
const INITIAL_VIEWPORT_DIRECTORY = resolve(OUTPUT_DIRECTORY, 'initial-viewport');
const VIEWPORT_SEGMENTS_DIRECTORY = resolve(OUTPUT_DIRECTORY, 'viewport-segments');
const FULL_PAGE_DIRECTORY = resolve(OUTPUT_DIRECTORY, 'full-page');
const CHROME_EXECUTABLE = '/usr/bin/google-chrome';
const PRESET_VIEWPORTS = [
  { name: 'mobile-small', width: 375, height: 812 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-wide', width: 480, height: 854 },
  { name: 'tablet-narrow', width: 512, height: 900 },
  { name: 'tablet-breakpoint', width: 768, height: 1024 },
  { name: 'tablet-above-breakpoint', width: 769, height: 1024 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'desktop-wide', width: 1440, height: 900 },
];

function usage() {
  console.error(`Usage:
  bun run capture:home
  bun run capture:home -- <width>x<height> [url]
  bun run capture:home -- <width>x<height> <width>x<height> ...
  bun run capture:home -- <width> <height> [url]

Examples:
  bun run capture:home
  bun run capture:home -- 1440x900
  bun run capture:home -- 390x844 768x1024 1440x900
  bun run capture:home -- 390 844 http://127.0.0.1:5173/`);
}

function parseArguments(args) {
  if (args.length === 0) {
    return { viewports: PRESET_VIEWPORTS, url: DEFAULT_URL };
  }

  const sizeArguments = args.filter((argument) => /^\d+x\d+$/i.test(argument));
  if (sizeArguments.length > 0) {
    const invalidArguments = args.filter((argument) => !/^\d+x\d+$/i.test(argument));
    const url = invalidArguments[0] ?? DEFAULT_URL;

    if (invalidArguments.length > 1 || (invalidArguments[0] && !URL.canParse(invalidArguments[0]))) {
      usage();
      process.exit(1);
    }

    const viewports = sizeArguments.map((size) => {
      const [, width, height] = size.match(/^(\d+)x(\d+)$/i);
      return { name: 'custom', width: Number(width), height: Number(height) };
    });

    return { viewports, url };
  }

  const width = Number(args[0]);
  const height = Number(args[1]);
  const url = args[2] ?? DEFAULT_URL;
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || !URL.canParse(url)) {
    usage();
    process.exit(1);
  }

  return { viewports: [{ name: 'custom', width, height }], url };
}

async function getScrollPositions(page, viewportHeight) {
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const lastPosition = Math.max(pageHeight - viewportHeight, 0);
  const step = Math.max(Math.floor(viewportHeight * 0.85), 1);
  const positions = [];

  for (let position = 0; position < lastPosition; position += step) {
    positions.push(position);
  }

  if (positions.at(-1) !== lastPosition) {
    positions.push(lastPosition);
  }

  return positions;
}

const { viewports, url } = parseArguments(process.argv.slice(2));
const browser = await chromium.launch({
  headless: true,
  executablePath: CHROME_EXECUTABLE,
});

try {
  mkdirSync(INITIAL_VIEWPORT_DIRECTORY, { recursive: true });
  mkdirSync(VIEWPORT_SEGMENTS_DIRECTORY, { recursive: true });
  mkdirSync(FULL_PAGE_DIRECTORY, { recursive: true });

  await Promise.all(viewports.map(async ({ name, width, height }) => {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });

    try {
      const page = await context.newPage();
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30_000,
      });

      if (!response?.ok()) {
        throw new Error(`Homepage returned HTTP ${response?.status() ?? 'unknown'}`);
      }

      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1_000);

      const viewportName = `${name}-${width}x${height}`;
      const filename = `${viewportName}.png`;
      const initialViewportPath = resolve(INITIAL_VIEWPORT_DIRECTORY, filename);
      await page.screenshot({
        path: initialViewportPath,
        animations: 'disabled',
      });

      const segmentDirectory = resolve(VIEWPORT_SEGMENTS_DIRECTORY, viewportName);
      rmSync(segmentDirectory, { recursive: true, force: true });
      mkdirSync(segmentDirectory, { recursive: true });

      const positions = await getScrollPositions(page, height);
      const firstSegmentPath = resolve(segmentDirectory, '000-y00000.png');
      copyFileSync(initialViewportPath, firstSegmentPath);

      for (const [index, position] of positions.slice(1).entries()) {
        await page.evaluate((scrollPosition) => window.scrollTo(0, scrollPosition), position);
        await page.waitForTimeout(100);

        const segmentNumber = String(index + 1).padStart(3, '0');
        const scrollPosition = String(position).padStart(5, '0');
        await page.screenshot({
          path: resolve(segmentDirectory, `${segmentNumber}-y${scrollPosition}.png`),
          animations: 'disabled',
        });
      }

      await page.evaluate(() => window.scrollTo(0, 0));
      const fullPagePath = resolve(FULL_PAGE_DIRECTORY, filename);
      await page.screenshot({
        path: fullPagePath,
        fullPage: true,
        animations: 'disabled',
      });

      console.log(`${viewportName}: ${positions.length} viewport segments`);
    } finally {
      await context.close();
    }
  }));
} finally {
  await browser.close();
}
