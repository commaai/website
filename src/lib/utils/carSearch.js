// Normalize diacritics for matching (e.g., "Škoda" -> "Skoda")
function normalizeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Every word has to match, in any order
export function matchesSearch(text, query) {
  const haystack = normalizeDiacritics(text.toLowerCase());
  return normalizeDiacritics(query.toLowerCase())
    .split(/\s+/)
    .filter(Boolean)
    .every(term => haystack.includes(term));
}
