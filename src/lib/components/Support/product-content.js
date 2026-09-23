import { marked } from 'marked';
import CommaFourImage from '$lib/images/products/comma-four/four_screen_on.png?w=900';
import ChestnutImage from '$lib/images/products/chestnut/bnut_front.png?w=900';
import CarHarnessImage from '$lib/images/products/car-harness/car-harness.jpg?w=900';
import CommaIcon from '$lib/icons/comma.svg?raw';
import { supportByPath } from './support-content';

const images = { 'comma-four': CommaFourImage, chestnut: ChestnutImage, 'car-harness': CarHarnessImage };

const files = import.meta.glob('/src/lib/content/products/*.md', { eager: true, query: '?raw', import: 'default' });

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function parseProduct(path, source) {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatter) throw new Error(`Missing frontmatter in ${path}`);
  const metadata = Object.fromEntries(frontmatter[1].split(/\r?\n/).filter(Boolean).map(line => {
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`Invalid frontmatter in ${path}`);
    return [line.slice(0, separator), line.slice(separator + 1).trim()];
  }));
  if (!metadata.title || (!metadata.image && !path.endsWith('/orders-returns.md')) || !metadata.description) throw new Error(`Missing product metadata in ${path}`);
  const sections = [];
  let current;
  for (const line of source.slice(frontmatter[0].length).split(/\r?\n/)) {
    const heading = /^## (.+)$/.exec(line);
    if (heading) {
      const title = heading[1].trim();
      const id = title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
      current = { title, id, lines: [] };
      sections.push(current);
    } else if (current) current.lines.push(line);
  }
  if (!sections.length) throw new Error(`Missing sections in ${path}`);
  const renderedSections = sections.map(({ lines, ...section }) => {
      const source = lines.join('\n').trim();
      const include = /^<!-- support-content:([^\s]+) -->$/.exec(source);
      let html = include ? supportByPath.get(include[1])?.afterArticles : marked.parse(source);
      if (include && !html) throw new Error(`Missing support content ${include[1]} in ${path}`);
      if (include?.[1] === 'orders-warranty') html = html.replace(/^<h3[^>]*>Order FAQ<\/h3>\s*/, '');
      return { ...section, html };
    });
  return {
    ...metadata,
    kind: 'product',
    image: images[metadata.image] || metadata.image,
    imageHtml: metadata.image === 'comma-prime' ? CommaIcon : null,
    navItems: renderedSections.map(({ id, title }) => ({ id, label: title })),
    articleContent: renderedSections.map(({ id, title, html }) => `<section id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title"><h2 id="${escapeHtml(id)}-title">${escapeHtml(title)}</h2><div class="section-body">${html}</div></section>`).join('')
  };
}

export const products = new Map(Object.entries(files).map(([path, source]) => [path.split('/').pop().slice(0, -3), parseProduct(path, source)]));
