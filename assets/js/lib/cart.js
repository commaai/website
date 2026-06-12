/**
 * Cross-page cart API (port of src/store.js).
 *
 * Pages must talk to the cart ONLY through this module:
 *
 *   import { addToCart, openCart, refreshCart } from '../lib/cart.js';
 *
 *   addToCart(variantId, additionalProductIds = [], note = "")
 *     Adds the variant (qty 1 each, plus optional extra product ids and cart
 *     note) to the Shopify cart, reloads it and opens the cart drawer.
 *   openCart()
 *     Reloads the cart, then opens the drawer.
 *   refreshCart()
 *     Reloads the cart from Shopify into the stores below (the old
 *     store.js `loadCart`). Errors are caught and logged.
 *
 * State is exposed as tiny Svelte-compatible writable stores (set/update/
 * subscribe — subscribe fires immediately with the current value):
 *   cart, search          — dead code carried over from store.js
 *   showCart              — drawer visibility (main.js renders the drawer)
 *   cartId, checkoutUrl, cartCreatedAt, cartTotalQuantity
 *                         — initialized from localStorage and written back on
 *                           EVERY change via `window.localStorage.<key> = v`,
 *                           which stringifies: undefined becomes the literal
 *                           string "undefined" (load-bearing — shopify.js
 *                           treats "undefined"/"null" as "create new cart")
 *   cartItems, cartDiscount, cartSubtotal — current cart contents
 *   selectedCar           — localStorage-synced (setItem when truthy,
 *                           removeItem when falsy); used by other pages
 *
 * localStorage keys (exact): cartId, checkoutUrl, cartCreatedAt,
 * cartTotalQuantity, selectedCar.
 */
import {
  addToCart as requestAddToCart,
  loadCart as requestLoadCart,
} from './shopify.js';

// --- minimal svelte/store replacement -------------------------------------

// Svelte's safe_not_equal: objects/functions always notify, primitives only
// when changed (NaN-safe).
const safeNotEqual = (a, b) =>
  a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';

export function writable(value) {
  const subscribers = new Set();
  return {
    set(newValue) {
      if (safeNotEqual(value, newValue)) {
        value = newValue;
        subscribers.forEach((fn) => fn(value));
      }
    },
    update(fn) {
      this.set(fn(value));
    },
    subscribe(fn) {
      subscribers.add(fn);
      fn(value); // svelte stores fire immediately on subscribe
      return () => subscribers.delete(fn);
    },
    get() {
      return value;
    },
  };
}

export const get = (store) => store.get();

// --- stores (src/store.js) -------------------------------------------------

export const cart = writable([]);
export const search = writable('');
export const showCart = writable(false);

export const cartId = writable(window.localStorage.getItem('cartId'));
export const checkoutUrl = writable(window.localStorage.getItem('checkoutUrl'));
export const cartCreatedAt = writable(window.localStorage.getItem('cartCreatedAt'));
export const cartTotalQuantity = writable(window.localStorage.getItem('cartTotalQuantity'));

export const cartItems = writable([]);
export const cartDiscount = writable({});
export const cartSubtotal = writable({});
export const selectedCar = writable(localStorage.getItem('selectedCar') || '');

selectedCar.subscribe((value) => {
  if (value) localStorage.setItem('selectedCar', value);
  else localStorage.removeItem('selectedCar');
});

// Write-through on every change. Property assignment stringifies the value,
// so undefined/null become the strings "undefined"/"null" — keep as-is.
cartId.subscribe((value) => (window.localStorage.cartId = value));
checkoutUrl.subscribe((value) => (window.localStorage.checkoutUrl = value));
cartCreatedAt.subscribe((value) => (window.localStorage.cartCreatedAt = value));
cartTotalQuantity.subscribe((value) => (window.localStorage.cartTotalQuantity = value));

// --- cart actions (src/store.js loadCart/addToCart) -------------------------

// src/store.js `loadCart` — exported as refreshCart (cross-page contract name).
export const refreshCart = async () => {
  try {
    const shopifyResponse = await requestLoadCart();
    cartItems.set(shopifyResponse?.body?.data?.cart?.lines?.edges);
    cartDiscount.set(getTotalDiscount(shopifyResponse?.body?.data?.cart?.discountAllocations));
    cartSubtotal.set(shopifyResponse?.body?.data?.cart?.cost?.subtotalAmount);
    cartTotalQuantity.set(shopifyResponse.body?.data?.cart?.totalQuantity);
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (itemId, additionalProductIds = [], note = "") => {
  await requestAddToCart({ cartId: get(cartId), variantId: itemId, additionalProductIds, note });
  await refreshCart();
  showCart.set(true);
};

// src/routes/+layout.svelte `openCart`
export const openCart = async () => {
  await refreshCart();
  showCart.set(true);
};

export const getTotalDiscount = (discountAllocations) => {
  if (!discountAllocations || discountAllocations.length === 0) return null;

  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);

  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
};
