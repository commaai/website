import { error } from '@sveltejs/kit';
import { products } from '$lib/components/Support/product-content';

export function load({ params }) {
  const product = products.get(params.product);
  if (!product) error(404, 'Product not found');
  return { product };
}

export function entries() {
  return [...products.keys()].filter(product => product !== 'orders-returns').map(product => ({ product }));
}
