// Normalize diacritics for matching (e.g., "Škoda" -> "Skoda")
function normalizeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Split into words so they can be matched in any order: "2021 camry" finds "camry 2021"
export function searchTerms(query) {
  return normalizeDiacritics(query.toLowerCase()).split(/\s+/).filter(Boolean);
}

export function matchesSearch(text, terms) {
  const haystack = normalizeDiacritics(text.toLowerCase());
  return terms.every(term => haystack.includes(term));
}
