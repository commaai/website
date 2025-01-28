// Register route with Sveletekit, but pass-through to generic product server load
import { load as productLoad } from '../[product]/+page.js';

export async function load(event) {
  return await productLoad(event);
}
