import homeMarkdown from '$lib/content/support/index.md?raw';
import { parseFrontmatter, renderSections } from './markdown';
import { supportIcon } from './images';

const files = import.meta.glob([
  '/src/lib/content/support/*.md',
  '!/src/lib/content/support/index.md'
], {
  eager: true,
  query: '?raw',
  import: 'default'
});

function parseDocument(path, markdown) {
  const { metadata, body } = parseFrontmatter(path, markdown);
  if (!metadata.title || !/^\d+$/.test(metadata.order || '')) throw new Error(`Missing title or order in ${path}`);
  return { metadata: { ...metadata, order: Number(metadata.order) }, body };
}

function parseOptions(source) {
  const items = source.trim().split(/\r?\n(?=\s*-\s+\[)/).filter(Boolean);
  const options = items.map(item => {
    const lines = item.split(/\r?\n/);
    const option = /^\s*-\s+\[([^\]]+)\]\(([^\s)]+)\)\s+(?:—|-)\s+(.+?)\s*$/.exec(lines[0]);
    if (!option) throw new Error(`Invalid support option: ${lines[0]}`);

    let image;
    for (const line of lines.slice(1)) {
      const property = /^\s+image:\s*(\S+)\s*$/.exec(line);
      if (!property || image) throw new Error(`Invalid support option property: ${line}`);
      image = supportIcon(property[1]);
    }

    return { title: option[1], href: option[2], description: option[3], image };
  });
  if (!options.length) throw new Error('Support options block cannot be empty');
  return options;
}

const home = parseDocument('support/index.md', homeMarkdown);
export const supportHome = {
  ...home.metadata,
  options: [...home.body.matchAll(/^::: options[ \t]*\n([\s\S]*?)\n:::[ \t]*$/gm)].flatMap(match => parseOptions(match[1]))
};

export const supportEntries = Object.entries(files)
  .filter(([, markdown]) => markdown.trim())
  .map(([path, markdown]) => {
    const { metadata, body } = parseDocument(path, markdown);
    const name = path.split('/').pop().slice(0, -3);
    return { ...metadata, id: name, path: name, ...renderSections(body) };
  });
export const supportByPath = new Map(supportEntries.map(entry => [entry.path, entry]));
