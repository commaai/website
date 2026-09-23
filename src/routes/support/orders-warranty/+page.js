import { products } from '$lib/components/Support/product-content';

export function load() {
  return { product: products.get('orders-returns') };
}
