import { parseFrontmatter, renderArticle } from './markdown';

const images = import.meta.glob('/src/lib/images/**/*.{png,jpg,jpeg}', { eager: true, query: '?w=900&format=webp&as=url', import: 'default' });

function resolve(files, path, source) {
  const file = files[path.replace(/^\$lib\//, '/src/lib/')];
  if (!file) throw new Error(`Unknown file "${path}" in ${source}`);
  return file;
}

function loadMarkdown(files) {
  return new Map(Object.entries(files).map(([path, source]) => {
    const slug = path.split('/').pop().slice(0, -'.md'.length);
    const { metadata, body } = parseFrontmatter(path, source);
    if (!metadata.title || !metadata.description) throw new Error(`Missing title or description in ${path}`);
    return [slug, {
      ...metadata,
      image: metadata.image && resolve(images, metadata.image, path),
      ...renderArticle(body, image => resolve(images, image, path))
    }];
  }));
}

export const products = loadMarkdown(
  import.meta.glob('/src/lib/content/products/*.md', { eager: true, query: '?raw', import: 'default' })
);

export const articles = loadMarkdown(
  import.meta.glob('/src/lib/content/support/*.md', { eager: true, query: '?raw', import: 'default' })
);
for (const [slug, product] of products) {
  if (articles.has(slug)) throw new Error(`Duplicate support slug "${slug}" in content/support and content/products`);
  articles.set(slug, product);
}

for (const product of products.values()) product.breadcrumb = `${product.title} support`;

function parentsOf(page, seen = new Set()) {
  if (!page.parent) return [];
  if (seen.has(page)) throw new Error(`Parent cycle at "${page.parent}"`);
  seen.add(page);
  const parent = articles.get(page.parent.match(/^\/support\/([^/]+)$/)?.[1]);
  if (!parent) throw new Error(`Unknown parent "${page.parent}"`);
  return [...parentsOf(parent, seen), { href: page.parent, label: parent.breadcrumb ?? parent.title }];
}

for (const article of articles.values()) article.parents = parentsOf(article);
