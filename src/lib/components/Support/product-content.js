import CommaIcon from '$lib/icons/comma.svg?raw';
import { parseFrontmatter, renderSections } from './markdown';
import { productImages } from './images';

const files = import.meta.glob('/src/lib/content/products/*.md', { eager: true, query: '?raw', import: 'default' });

function parseProduct(path, source) {
  const { metadata, body } = parseFrontmatter(path, source);
  if (!metadata.title || !metadata.image || !metadata.description) throw new Error(`Missing product metadata in ${path}`);
  return {
    ...metadata,
    image: productImages[metadata.image] || metadata.image,
    imageHtml: metadata.image === 'comma-prime' ? CommaIcon : null,
    ...renderSections(body)
  };
}

export const products = new Map(Object.entries(files).map(([path, source]) => [path.split('/').pop().slice(0, -3), parseProduct(path, source)]));
