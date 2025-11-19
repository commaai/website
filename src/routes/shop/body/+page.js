// Register route with Sveletekit, but pass-through to generic product server load
import { load as productLoad } from '../[product]/+page.js';

export async function load(event) {
  const data = await productLoad(event);
  data.product.forceOutOfStock = true;
  return data;
}
