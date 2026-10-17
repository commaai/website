import { error } from '@sveltejs/kit';
import { articles } from '$lib/components/Support/content';

export function load({ params }) {
  const article = articles.get(params.path);
  if (!article) error(404, 'Article not found');
  return { article };
}

export function entries() {
  return [...articles.keys()].map(path => ({ path }));
}
