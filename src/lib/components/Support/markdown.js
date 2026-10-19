import { Marked } from 'marked';
import ArrowRight from '$lib/icons/arrow-right.svg?raw';
import ExternalIcon from '$lib/icons/ui/external.svg?raw';
import Chevron from '$lib/icons/icon-chevron.svg?raw';

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
}

function idAttribute(id) {
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

const renderer = {
  link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    if (title !== 'card') return `<a href="${escapeHtml(href)}" class="highlight"${title ? ` title="${escapeHtml(title)}"` : ''}>${text}</a>`;
    const external = /^https?:/.test(href);
    return `<a href="${escapeHtml(href)}" class="support-card article-card-link${external ? ' external-card-link' : ''}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}<span class="article-card-arrow" aria-hidden="true">${external ? ExternalIcon : ArrowRight}</span></a>`;
  },
  heading({ depth, id, tokens }) {
    return `<h${depth}${idAttribute(id)}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
  }
};

const dropdown = {
  name: 'dropdown',
  level: 'block',
  tokenizer(src) {
    const match = /^::: dropdown (.+)\n([\s\S]*?)\n:::(?:\n|$)/.exec(src);
    if (match) return { type: 'dropdown', raw: match[0], title: match[1], tokens: this.lexer.blockTokens(match[2]) };
  },
  renderer(token) {
    return `<details class="support-dropdown"${idAttribute(slugify(token.title))}><summary><span class="support-dropdown-label">${escapeHtml(token.title)}</span><span class="support-dropdown-chevron" aria-hidden="true">${Chevron}</span></summary><div class="support-dropdown-content">${this.parser.parse(token.tokens)}</div></details>`;
  }
};

const markdown = new Marked({ renderer, extensions: [dropdown] });

export function renderArticle(body) {
  const tokens = markdown.lexer(body);
  const headings = tokens.filter(token => token.type === 'heading');
  headings.forEach(token => token.id = slugify(token.text));
  const toc = headings
    .filter(token => (token.depth === 2 || token.depth === 3) && token.id)
    .map(token => ({ id: token.id, label: token.text, nested: token.depth === 3 }));
  return { html: markdown.parser(tokens), toc };
}
