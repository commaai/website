// Shim for SvelteKit's $app/navigation
import { page } from './app-stores.js';

export async function goto(url, opts = {}) {
  const next = new URL(url, window.location.href);
  if (next.pathname !== window.location.pathname) {
    window.location.href = next.href;
    return;
  }
  if (opts.replaceState) window.history.replaceState({}, '', next);
  else window.history.pushState({}, '', next);
  if (!opts.noScroll && !opts.noscroll) window.scrollTo(0, 0);
  page.update((p) => ({ ...p, url: new URL(window.location.href) }));
}
