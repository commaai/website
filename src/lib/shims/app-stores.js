// Shim for SvelteKit's $app/stores
import { writable } from 'svelte/store';

const initialUrl = typeof window !== 'undefined'
  ? new URL(window.location.href)
  : new URL('https://comma.ai/');

export const page = writable({
  url: initialUrl,
  params: {},
  route: { id: null },
  status: 200,
  error: null,
  data: {},
  form: undefined,
});

// Called from .astro frontmatter before islands render (SSR) and from the
// layout island on the client, so $page reflects the current page everywhere.
export function setPage(values) {
  page.update((p) => ({ ...p, ...values }));
}

// SvelteKit's router kept $page.url in sync on same-page hash navigation
// (FAQ accordions key off $page.url.hash); replicate with native events.
if (typeof window !== 'undefined') {
  const syncUrl = () => setPage({ url: new URL(window.location.href) });
  window.addEventListener('hashchange', syncUrl);
  window.addEventListener('popstate', syncUrl);
}
