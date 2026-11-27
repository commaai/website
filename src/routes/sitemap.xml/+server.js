import { products } from '$lib/data/products.js';
import { articles } from '$lib/components/Support/content';

export const prerender = true;

const ORIGIN = 'https://comma.ai';

// every route with a +page.svelte and no [param]
const staticPaths = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
  .map(file => file.slice('/src/routes'.length, -'/+page.svelte'.length))
  .filter(path => !path.includes('['))
  .map(path => path.replace(/\/\([^)]+\)/g, '') || '/');

const paths = [...new Set([
  ...staticPaths,
  ...Object.keys(products).map(slug => `/shop/${slug}`),
  ...[...articles.keys()].map(slug => `/support/${slug}`),
])].sort();

export function GET() {
  const urls = paths.map(path => `  <url><loc>${ORIGIN}${path}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
