// Browser auto-translate turns brand names into words ("comma" becomes the
// punctuation mark), so text with brand names gets them wrapped in
// translate="no". Adjacent spaces go inside the span: translators drop
// whitespace at the edges of the text they translate.
const BRAND = /\s?(?<![\w@/-]|\w\.)(?:comma(?: (?:four|4|3X|3|three|two|2|power|prime|connect|body|pedal|openpilot))?|commacare|openpilot|chestnut)\b(?![@/-]|\.\w)\s?/gi;

const escapeHtml = text => text
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const wrap = match => `<span translate="no">${match}</span>`;

// wraps brand names in an HTML string, leaving tags and their attributes alone
export const markBrands = html => html
  .split(/(<[^>]*>)/)
  .map(part => part.startsWith('<') ? part : part.replace(BRAND, wrap))
  .join('');

export const markBrandsInText = text => markBrands(escapeHtml(text));
