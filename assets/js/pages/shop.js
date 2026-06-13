import '../main.js';
import { addToCart } from '../lib/cart.js';

// /shop services accordion — "Add to cart" for the Custom car ports
// $50,000 down payment (src/routes/shop/+page.svelte:182-189). This is the
// only page-specific event handler on the shop index; adds the variant
// (qty 1), reloads the cart and opens the drawer (all inside addToCart).
document
  .querySelector('#services button')
  .addEventListener('click', () => addToCart('gid://shopify/ProductVariant/31864934662207'));
