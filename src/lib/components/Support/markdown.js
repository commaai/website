import { Marked } from 'marked';
import ArrowRight from '$lib/icons/arrow-right.svg?raw';
import ExternalIcon from '$lib/icons/ui/external.svg?raw';

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>|[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
}

function idAttribute(text) {
  const id = slugify(text);
  return id ? ` id="${escapeHtml(id)}"` : '';
}

export function parseFrontmatter(path, source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error(`Missing frontmatter in ${path}`);
  const metadata = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map(line => {
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`Invalid frontmatter in ${path}: ${line}`);
    return [line.slice(0, separator), line.slice(separator + 1).trim()];
  }));
  return { metadata, body: source.slice(match[0].length).trim() };
}

const linkCards = {
  article: { className: 'article-card-link', attributes: '', icon: ArrowRight },
  external: { className: 'article-card-link external-card-link', attributes: ' target="_blank" rel="noopener noreferrer"', icon: ExternalIcon }
};

const renderer = {
  link({ href, title, tokens }) {
    const card = linkCards[title];
    if (!card) return false;
    return `<a href="${escapeHtml(href)}" class="${card.className}"${card.attributes}>${this.parser.parseInline(tokens)}<span class="article-card-arrow" aria-hidden="true">${card.icon}</span></a>`;
  },
  heading({ depth, text, tokens }) {
    return `<h${depth}${idAttribute(text)}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
  }
};

const dropdown = {
  name: 'dropdown',
  level: 'block',
  start(src) {
    return src.indexOf('::: dropdown');
  },
  tokenizer(src) {
    const match = /^::: dropdown[ \t]+([^\n]+)\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/.exec(src);
    if (!match) return;
    return {
      type: 'dropdown',
      raw: match[0],
      titleTokens: this.lexer.inlineTokens(match[1].trim()),
      tokens: this.lexer.blockTokens(match[2].trim(), [])
    };
  },
  renderer(token) {
    const title = this.parser.parseInline(token.titleTokens);
    const content = this.parser.parse(token.tokens);
    return `<details class="support-dropdown"${idAttribute(title)}><summary><span class="support-dropdown-label">${title}</span><span class="support-dropdown-chevron" aria-hidden="true"><svg viewBox="0 0 12 8"><path d="M10.59.59 6 5.17 1.41.59 0 2l6 6 6-6L10.59.59Z" fill="currentColor"/></svg></span></summary><div class="support-dropdown-content">${content}</div></details>`;
  },
  childTokens: ['titleTokens', 'tokens']
};

const markdown = new Marked({ renderer, extensions: [dropdown] });

export function renderArticle(body) {
  const introduction = [];
  const sections = [];
  for (const token of markdown.lexer(body)) {
    if (token.type === 'heading' && token.depth === 2) sections.push({ id: slugify(token.text), title: token.text, tokens: [] });
    else (sections.at(-1)?.tokens ?? introduction).push(token);
  }

  const html = markdown.parser(introduction) + sections.map(({ id, title, tokens }) =>
    `<section id="${escapeHtml(id)}" aria-labelledby="${escapeHtml(id)}-title"><h2 id="${escapeHtml(id)}-title">${escapeHtml(title)}</h2><div class="section-body">${markdown.parser(tokens)}</div></section>`
  ).join('');

  const toc = sections.flatMap(({ id, title, tokens }) => [
    { id: `${id}-title`, label: title },
    ...tokens
      .filter(token => token.type === 'heading' && token.depth === 3 && slugify(token.text))
      .map(token => ({ id: slugify(token.text), label: token.text, nested: true }))
  ]);

  return { html, toc };
}
