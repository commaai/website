import { browser } from "$app/environment";
import { writable, get } from 'svelte/store';
import { addToCart as requestAddToCart, loadCart as requestLoadCart } from '$lib/utils/shopify';

export const cart = writable([]);
export const search = writable('');
export const showCart = writable(false);

export const cartId = writable(browser ? window.localStorage.getItem('cartId') : '');
export const checkoutUrl = writable(browser ? window.localStorage.getItem('checkoutUrl') : '');
export const cartCreatedAt = writable(browser ? window.localStorage.getItem('cartCreatedAt') : '');
export const cartTotalQuantity = writable(browser ? window.localStorage.getItem('cartTotalQuantity') : '');

export const cartItems = writable([]);
export const cartDiscount = writable({});
export const cartSubtotal = writable({});
export const selectedCar = writable(browser ? localStorage.getItem('selectedCar') || '' : '');

if (browser) {
  selectedCar.subscribe((value) => {
    if (value) localStorage.setItem('selectedCar', value);
    else localStorage.removeItem('selectedCar');
  });
}

if (browser) {
  cartId.subscribe((value) => window.localStorage.cartId = value)
  checkoutUrl.subscribe((value) => window.localStorage.checkoutUrl = value)
  cartCreatedAt.subscribe((value) => window.localStorage.cartCreatedAt = value)
  cartTotalQuantity.subscribe((value) => window.localStorage.cartTotalQuantity = value)
}

export const loadCart = async () => {
  try {
    const shopifyResponse = await requestLoadCart(get(cartId));
    const cart = shopifyResponse?.body?.data?.cart;
    cartItems.set(cart?.lines?.edges);
    cartDiscount.set(getTotalDiscount(cart));
    cartSubtotal.set(getOriginalSubtotal(cart));
    cartTotalQuantity.set(cart?.totalQuantity);

  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (itemId, additionalProductIds = [], note = "") => {
  await requestAddToCart({ cartId: get(cartId), variantId: itemId, additionalProductIds, note});
  await loadCart();
  showCart.set(true);
}

// Discounts can be applied at the cart level (order discounts) or per line item
// (product discounts), so we gather both before totalling them up.
const getDiscountAllocations = (cart) => {
  const cartLevel = cart?.discountAllocations ?? [];
  const lineLevel = (cart?.lines?.edges ?? []).flatMap(
    (edge) => edge?.node?.discountAllocations ?? []
  );
  return [...cartLevel, ...lineLevel];
}

export const getTotalDiscount = (cart) => {
  const discountAllocations = getDiscountAllocations(cart);
  if (discountAllocations.length === 0) return null;

  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);

  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
}

// The pre-discount subtotal: sum of each line's cost before line-level discounts.
// Shopify's cart cost.subtotalAmount already nets out product discounts, so summing
// the line subtotals keeps the cart's "was / now" strikethrough correct for both
// order- and product-level discounts.
export const getOriginalSubtotal = (cart) => {
  const edges = cart?.lines?.edges ?? [];
  const currencyCode =
    cart?.cost?.subtotalAmount?.currencyCode ??
    edges[0]?.node?.estimatedCost?.subtotalAmount?.currencyCode;
  const amount = edges.reduce((sum, edge) => {
    return sum + Number(edge?.node?.estimatedCost?.subtotalAmount?.amount ?? 0);
  }, 0);

  return { amount, currencyCode };
}
