import { marked } from 'marked';
import CommaFourImage from '$lib/images/products/comma-four/four_screen_on.png?w=900';
import ChestnutImage from '$lib/images/products/chestnut/bnut_front.png?w=900';
import CarHarnessImage from '$lib/images/products/car-harness/car-harness.jpg?w=900';
import CommaIcon from '$lib/icons/comma.svg?raw';
import { supportByPath, supportRenderer } from './support-content';
import { renderSections } from './section-content';

const images = { 'comma-four': CommaFourImage, chestnut: ChestnutImage, 'car-harness': CarHarnessImage };

const files = import.meta.glob('/src/lib/content/products/*.md', { eager: true, query: '?raw', import: 'default' });

function parseProduct(path, source) {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatter) throw new Error(`Missing frontmatter in ${path}`);
  const metadata = Object.fromEntries(frontmatter[1].split(/\r?\n/).filter(Boolean).map(line => {
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`Invalid frontmatter in ${path}`);
    return [line.slice(0, separator), line.slice(separator + 1).trim()];
  }));
  if (!metadata.title || !metadata.image || !metadata.description) throw new Error(`Missing product metadata in ${path}`);
  const sections = renderSections(source.slice(frontmatter[0].length), source => {
      const include = /^<!-- support-content:([^\s]+) -->$/.exec(source);
      let html = include ? supportByPath.get(include[1])?.afterArticles : marked.parse(source, { renderer: supportRenderer });
      if (include && !html) throw new Error(`Missing support content ${include[1]} in ${path}`);
      return html;
    });
  return {
    ...metadata,
    kind: 'product',
    image: images[metadata.image] || metadata.image,
    imageHtml: metadata.image === 'comma-prime' ? CommaIcon : null,
    ...sections
  };
}

export const products = new Map(Object.entries(files).map(([path, source]) => [path.split('/').pop().slice(0, -3), parseProduct(path, source)]));
