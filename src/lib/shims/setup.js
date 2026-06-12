// Per-page setup shared by all .astro page wrappers: fetches the layout
// data (blog posts, cached for the whole build) and primes the $app/stores
// page store so Svelte components see the right URL/data during SSR.
import { setPage } from './app-stores.js';
import { load as layoutLoad } from '../../routes/+layout.js';

let layoutDataPromise;

export async function setupPage(Astro, extra = {}) {
  layoutDataPromise ??= layoutLoad({ fetch });
  const layoutData = await layoutDataPromise;
  // reset per-page fields: the store is a module-level singleton shared
  // across all pages rendered by one build
  setPage({ url: Astro.url, data: { ...layoutData }, params: {}, status: 200, error: null, ...extra });
  return layoutData;
}
