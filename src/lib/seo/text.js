// Meta description from a block of page HTML (e.g. a product's description in products.js):
// plain text, whole sentences, at most `max` characters.
export function summarize(html, max = 160) {
  if (!html) return undefined;
  const text = html
    .replace(/<strong[^>]*>\s*Description\s*<\/strong>/i, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
  if (!text) return undefined;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [text];
  let out = '';
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  return (out.trim() || text.slice(0, max - 1).trimEnd() + '…');
}
