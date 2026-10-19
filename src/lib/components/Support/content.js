import { parseFrontmatter, renderArticle } from './markdown';

const images = import.meta.glob('/src/lib/images/**/*.{png,jpg,jpeg}', { eager: true, query: '?w=900', import: 'default' });
const icons = import.meta.glob('/src/lib/icons/*.svg', { eager: true, query: '?raw', import: 'default' });

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
      icon: metadata.icon && resolve(icons, metadata.icon, path),
      ...renderArticle(body)
    }];
  }));
}

export const articles = loadMarkdown(
  import.meta.glob('/src/lib/content/support/*.md', { eager: true, query: '?raw', import: 'default' })
);

export const products = loadMarkdown(
  import.meta.glob('/src/lib/content/products/*.md', { eager: true, query: '?raw', import: 'default' })
);