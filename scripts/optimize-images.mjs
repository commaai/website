#!/usr/bin/env bun
// Generate .avif/.webp siblings for raster images under static/img.
// Replaces the old vite-imagetools pipeline: every jpg/jpeg/png/gif that a
// template renders through partials/picture.html needs both variants
// committed next to the original. Existing variants are kept unless --force.
//
// Usage: bun scripts/optimize-images.mjs [--force] [path ...]
import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, extname } from 'path';
import { existsSync } from 'fs';

const EXTS = ['.jpg', '.jpeg', '.png', '.gif'];
const force = process.argv.includes('--force');
const roots = process.argv.slice(2).filter(a => a !== '--force');
if (roots.length === 0) roots.push('static/img');

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else yield p;
  }
}

let made = 0;
for (const root of roots) {
  for (const p of walk(root)) {
    const ext = extname(p).toLowerCase();
    if (!EXTS.includes(ext)) continue;
    const stem = p.slice(0, -ext.length);
    const animated = ext === '.gif';
    for (const [variant, opts] of [['avif', {}], ['webp', {}]]) {
      const out = `${stem}.${variant}`;
      if (!force && existsSync(out)) continue;
      await sharp(p, { animated })[variant](opts).toFile(out);
      console.log('wrote', out);
      made++;
    }
  }
}
console.log(made ? `${made} variants generated` : 'all variants up to date');
