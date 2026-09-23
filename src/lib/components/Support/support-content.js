import { marked, Renderer } from 'marked';
import homeMarkdown from '$lib/content/support/index.md?raw';
import ShippingIcon from '$lib/icons/features/shipping.svg';
import WarrantyIcon from '$lib/icons/features/warranty.svg';
import CarIcon from '$lib/icons/features/car.svg';
import TroubleshootingIcon from '$lib/icons/features/dials.svg';
import CableIcon from '$lib/icons/features/cable.svg';
import ShopIcon from '$lib/icons/ui/basket.svg';
import ConnectivityIcon from '$lib/icons/features/connectivity.svg';
import ConnectImage from '$lib/images/faq/connect.svg';
import OtherImage from '$lib/images/faq/other.svg';

const files = import.meta.glob('/src/lib/content/support/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});
const root = '/src/lib/content/support/';
const articleMarker = '<!-- articles -->';
const supportImages = {
  shipping: ShippingIcon,
  warranty: WarrantyIcon,
  car: CarIcon,
  troubleshooting: TroubleshootingIcon,
  cable: CableIcon,
  shop: ShopIcon,
  connectivity: ConnectivityIcon,
  connect: ConnectImage,
  other: OtherImage
};
const supportRenderer = new Renderer();
const renderLink = supportRenderer.link.bind(supportRenderer);
const renderHeading = supportRenderer.heading.bind(supportRenderer);

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function supportImage(name) {
  if (!supportImages[name]) throw new Error(`Unknown support image: ${name}`);
  return supportImages[name];
}

function headingId(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>|[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
}

supportRenderer.link = function(token) {
  if (token.title === 'card') {
    return renderLink({ ...token, title: null })
      .replace('<a ', '<a class="article-card-link" ')
      .replace('</a>', '<span class="article-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>');
  }
  if (token.title === 'external-card') {
    return renderLink({ ...token, title: null })
      .replace('<a ', '<a class="article-card-link external-card-link" target="_blank" rel="noopener noreferrer" ')
      .replace('</a>', '<span class="article-card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></span></a>');
  }
  return renderLink(token);
};

supportRenderer.heading = function(token) {
  const html = renderHeading(token);
  const id = headingId(token.text);
  return id ? html.replace(/^<h([1-6])>/, `<h$1 id="${escapeAttribute(id)}">`) : html;
};

const dropdownExtension = {
  name: 'supportDropdown',
  level: 'block',
  start(src) {
    return src.indexOf('::: dropdown');
  },
  tokenizer(src) {
    const match = /^::: dropdown[ \t]+([^\n]+)\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/.exec(src);
    if (!match) return;

    const titleTokens = this.lexer.inlineTokens(match[1].trim());
    const tokens = this.lexer.blockTokens(match[2].trim(), []);
    return { type: 'supportDropdown', raw: match[0], titleTokens, tokens };
  },
  renderer(token) {
    const title = this.parser.parseInline(token.titleTokens);
    const content = this.parser.parse(token.tokens);
    const id = headingId(title);
    const idAttribute = id ? ` id="${escapeAttribute(id)}"` : '';
    return `<details class="support-dropdown"${idAttribute}><summary><span class="support-dropdown-label">${title}</span><span class="support-dropdown-chevron" aria-hidden="true"><svg viewBox="0 0 12 8"><path d="M10.59.59 6 5.17 1.41.59 0 2l6 6 6-6L10.59.59Z" fill="currentColor"/></svg></span></summary><div class="support-dropdown-content">${content}</div></details>`;
  },
  childTokens: ['titleTokens', 'tokens']
};

const headerExtension = {
  name: 'supportHeader',
  level: 'block',
  start(src) {
    return src.indexOf('::: header');
  },
  tokenizer(src) {
    const match = /^::: header[ \t]+([^\n]+)\nimage:[ \t]*([^\n]+)(?:\nalt:[ \t]*([^\n]+))?\n:::[ \t]*(?:\n|$)/.exec(src);
    if (!match) return;

    return {
      type: 'supportHeader',
      raw: match[0],
      titleTokens: this.lexer.inlineTokens(match[1].trim()),
      image: match[2].trim(),
      alt: match[3]?.trim()
    };
  },
  renderer(token) {
    const title = this.parser.parseInline(token.titleTokens);
    const alt = token.alt || token.titleTokens.map(part => part.text || part.raw || '').join('');
    return `<div class="support-article-header"><h1>${title}</h1><div class="support-article-header-image mobile-first"><img src="${escapeAttribute(supportImage(token.image))}" alt="${escapeAttribute(alt)}"></div></div>`;
  },
  childTokens: ['titleTokens']
};

const optionsExtension = {
  name: 'supportOptions',
  level: 'block',
  start(src) {
    return src.indexOf('::: options');
  },
  tokenizer(src) {
    const match = /^::: options[ \t]*\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/.exec(src);
    if (!match) return;

    const options = parseOptions(match[1], value => this.lexer.inlineTokens(value));
    return { type: 'supportOptions', raw: match[0], options };
  },
  renderer(token) {
    const options = token.options.map(option => {
      const title = this.parser.parseInline(option.titleTokens);
      const description = this.parser.parseInline(option.descriptionTokens);
      const image = option.image
        ? `<div class="card-image"><img src="${escapeAttribute(option.image)}" alt=""></div>`
        : '';
      const copy = option.image
        ? `<div class="help-card-copy"><h3>${title}</h3><p>${description}</p></div>`
        : `<h3>${title}</h3><p>${description}</p>`;
      return `<a class="category-card help-card support-option" href="${escapeAttribute(option.href)}">${image}${copy}</a>`;
    }).join('');
    return `<div class="fix-category-grid">${options}</div>`;
  }
};

function parseOptions(source, tokenize = value => value) {
  const items = source.trim().split(/\r?\n(?=\s*-\s+\[)/).filter(Boolean);
  const options = items.map(item => {
    const lines = item.split(/\r?\n/);
    const option = /^\s*-\s+\[([^\]]+)\]\(([^\s)]+)\)\s+(?:—|-)\s+(.+?)\s*$/.exec(lines[0]);
    if (!option) throw new Error(`Invalid support option: ${lines[0]}`);

    let image;
    for (const line of lines.slice(1)) {
      const property = /^\s+image:\s*(\S+)\s*$/.exec(line);
      if (!property || image) throw new Error(`Invalid support option property: ${line}`);
      image = supportImage(property[1]);
    }

    return {
      title: option[1],
      href: option[2],
      description: option[3],
      image,
      titleTokens: tokenize(option[1]),
      descriptionTokens: tokenize(option[3])
    };
  });
  if (!options.length) throw new Error('Support options block cannot be empty');
  return options;
}

function findOptions(body) {
  const blocks = [...body.matchAll(/^::: options[ \t]*\n([\s\S]*?)\n:::[ \t]*$/gm)];
  return blocks.flatMap(match => parseOptions(match[1]).map(option => {
    const { titleTokens, descriptionTokens, ...values } = option;
    return values;
  }));
}

marked.use({ extensions: [headerExtension, dropdownExtension, optionsExtension] });

function parseMarkdown(path, markdown, kind) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error(`Missing frontmatter in ${path}`);
  const metadata = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map(line => {
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`Invalid frontmatter in ${path}: ${line}`);
    return [line.slice(0, separator), line.slice(separator + 1).trim()];
  }));
  if (!metadata.title || !/^\d+$/.test(metadata.order || '')) throw new Error(`Missing title or order in ${path}`);
  const body = markdown.slice(match[0].length).trim();
  const entry = { ...metadata, order: Number(metadata.order) };
  if (entry.image) entry.image = supportImage(entry.image);

  if (kind === 'home') return { ...entry, options: findOptions(body) };

  if (kind === 'landing') {
    const parts = body.split(articleMarker);
    if (parts.length > 2) throw new Error(`More than one article marker in ${path}`);
    return {
      ...entry,
      beforeArticles: marked.parse(parts[0].trim(), { renderer: supportRenderer }),
      afterArticles: parts[1] ? marked.parse(parts[1].trim(), { renderer: supportRenderer }) : ''
    };
  }

  const articleHeader = /^::: header[^\n]*\nimage:[ \t]*([^\n]+)(?:\nalt:[ \t]*([^\n]+))?\n:::[ \t]*(?:\n|$)/.exec(body);
  return {
    ...entry,
    articleImage: articleHeader ? supportImage(articleHeader[1].trim()) : undefined,
    articleImageAlt: articleHeader?.[2]?.trim() || metadata.title,
    articleContent: marked.parse(articleHeader ? body.slice(articleHeader[0].length).trim() : body, { renderer: supportRenderer })
  };
}

function byOrder(a, b) {
  return a.order - b.order || a.title.localeCompare(b.title);
}

export const supportHome = parseMarkdown('support/index.md', homeMarkdown, 'home');

const documents = Object.entries(files)
  .filter(([path, markdown]) => path.startsWith(root) && markdown.trim())
  .map(([path, markdown]) => ({
    parts: path.slice(root.length, -3).split('/'),
    ...parseMarkdown(path, markdown, path.endsWith('/index.md') ? 'landing' : 'article')
  }));

const supportSections = documents
  .filter(document => document.parts.length === 2 && document.parts[1] === 'index')
  .map(document => ({ ...document, kind: 'section', id: document.parts[0], path: document.parts[0], groups: [], articles: [] }))
  .sort(byOrder);

for (const section of supportSections) {
  if (!section.image) throw new Error(`Missing image in ${section.id}/index.md`);
}

const sectionById = new Map(supportSections.map(section => [section.id, section]));
const entries = [...supportSections];

for (const document of documents) {
  const [sectionId, second, third] = document.parts;
  if (!second) {
    entries.push({ ...document, kind: 'article', id: sectionId, path: sectionId });
    continue;
  }
  if (second === 'index' && !third) continue;
  const section = sectionById.get(sectionId);
  if (!section) throw new Error(`Missing section index for ${sectionId}`);

  if (third === 'index') {
    const group = { ...document, kind: 'group', id: `${sectionId}-${second}`, path: `${sectionId}/${second}`, sectionId, articles: [] };
    section.groups.push(group);
    entries.push(group);
  } else if (!third) {
    const article = { ...document, kind: 'article', id: `${sectionId}-${second}`, path: `${sectionId}/${second}`, sectionId };
    section.articles.push(article);
    entries.push(article);
  } else {
    const groupId = `${sectionId}-${second}`;
    const article = { ...document, kind: 'article', id: `${groupId}-${third}`, path: `${sectionId}/${second}/${third}`, sectionId, groupId };
    entries.push(article);
  }
}

const entryById = new Map(entries.map(entry => [entry.id, entry]));
if (entryById.size !== entries.length) throw new Error('Duplicate support article IDs');

for (const section of supportSections) {
  section.groups.sort(byOrder);
  section.articles.sort(byOrder);
}
for (const entry of entries) {
  if (entry.kind === 'article' && entry.groupId) {
    const group = entryById.get(entry.groupId);
    if (!group || group.kind !== 'group') throw new Error(`Missing group index for ${entry.id}`);
    group.articles.push(entry);
  }
}
for (const section of supportSections) {
  for (const group of section.groups) group.articles.sort(byOrder);
}

export const supportEntries = supportSections.flatMap(section => [
  section,
  ...section.articles,
  ...section.groups.flatMap(group => [group, ...group.articles])
]).concat(entries.filter(entry => entry.kind === 'article' && !entry.sectionId));
export const supportById = new Map(supportEntries.map(entry => [entry.id, entry]));
export const supportByPath = new Map(supportEntries.map(entry => [entry.path, entry]));
