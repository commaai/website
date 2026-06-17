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
    cartItems.set(shopifyResponse?.body?.data?.cart?.lines?.edges);
    cartDiscount.set(getTotalDiscount(shopifyResponse?.body?.data?.cart?.discountAllocations));
    cartSubtotal.set(shopifyResponse?.body?.data?.cart?.cost?.subtotalAmount);
    cartTotalQuantity.set(shopifyResponse.body?.data?.cart?.totalQuantity);

  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (itemId, additionalProductIds = [], note = "") => {
  await requestAddToCart({ cartId: get(cartId), variantId: itemId, additionalProductIds, note});
  await loadCart();
  showCart.set(true);
}

export const getTotalDiscount = (discountAllocations) => {
  if (!discountAllocations || discountAllocations.length === 0) return null;

  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);

  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
}
