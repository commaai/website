// Keeps brand names out of browser auto-translate without anyone wrapping them
// by hand (see src/lib/utils/brands.js). For every component under src/:
// - static template text gets its brand names wrapped in <brand-name translate="no">
// - {expr} becomes {@html brandText(expr)} and {@html expr} becomes
//   {@html markBrands(expr)}, so text from data is wrapped when it renders
// It works on the component source, so the server render and hydration match.
import path from 'node:path';
import MagicString from 'magic-string';
import { parse } from 'svelte/compiler';
import { CLOSE_TAG, OPEN_TAG, SKIP_ELEMENTS, findBrands } from '../utils/brands.js';

const SRC = path.resolve('src') + path.sep;
const HELPERS = `import { brandText as __brandText, markBrands as __markBrands } from '$lib/utils/brands.js';`;

const isUntranslated = node => node.attributes?.some(attr => attr.type === 'Attribute' && attr.name === 'translate');

const processMarkup = ({ content, filename }) => {
  if (!filename?.startsWith(SRC)) return;

  const ast = parse(content, { filename });
  const s = new MagicString(content);
  let usesHelpers = false;

  const visit = node => {
    if (!node) return;

    if (node.type === 'Text') {
      for (const match of findBrands(content.slice(node.start, node.end))) {
        const start = node.start + match.index;
        s.prependRight(start, OPEN_TAG);
        s.appendLeft(start + match[0].length, CLOSE_TAG);
      }
      return;
    }

    if (node.type === 'MustacheTag' || node.type === 'RawMustacheTag') {
      const { start, end } = node.expression;
      if (node.type === 'MustacheTag') {
        s.prependRight(node.start + 1, '@html __brandText((');
      } else {
        s.prependRight(start, '__markBrands((');
      }
      s.appendLeft(end, '))');
      usesHelpers = true;
      return;
    }

    if (node.type === 'Head' || node.type === 'Title') return;
    if (node.type === 'Element' && (SKIP_ELEMENTS.has(node.name) || isUntranslated(node))) return;

    node.children?.forEach(visit);
    visit(node.else);
    visit(node.pending);
    visit(node.then);
    visit(node.catch);
  };

  visit(ast.html);

  if (!s.hasChanged()) return;

  // on the <script> line, so compiler warnings keep their line numbers
  if (usesHelpers) {
    const script = ast.instance ?? ast.module;
    if (script) {
      s.appendLeft(script.content.start, ` ${HELPERS}`);
    } else {
      s.prepend(`<script>${HELPERS}</script>`);
    }
  }

  return {
    code: s.toString(),
    map: s.generateMap({ source: filename, hires: true }),
  };
};

export const brandsPreprocess = () => ({
  name: 'brand-names',
  markup: processMarkup,
});
