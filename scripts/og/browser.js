// Headless Chromium for the image generators (scripts/og, scripts/icons).
//
// Uses the newest chromium headless shell installed under ~/.cache/ms-playwright, so the
// scripts run without `playwright install` matching this exact playwright version.
// Override with PLAYWRIGHT_CHROMIUM=/path/to/chrome.
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';

function findHeadlessShell() {
  if (process.env.PLAYWRIGHT_CHROMIUM) {
    return process.env.PLAYWRIGHT_CHROMIUM;
  }
  const cache = process.env.PLAYWRIGHT_BROWSERS_PATH || join(homedir(), '.cache', 'ms-playwright');
  if (!existsSync(cache)) {
    return undefined;
  }
  const builds = readdirSync(cache)
    .filter(name => name.startsWith('chromium_headless_shell-'))
    .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]));
  for (const build of builds) {
    const binary = join(cache, build, 'chrome-headless-shell-linux64', 'chrome-headless-shell');
    if (existsSync(binary)) {
      return binary;
    }
  }
  return undefined;
}

export async function launch() {
  return chromium.launch({
    // undefined falls back to playwright's own bundled browser
    executablePath: findHeadlessShell(),
    // templates are local files that read pixels from local photos (canvas getImageData)
    args: ['--allow-file-access-from-files'],
  });
}
