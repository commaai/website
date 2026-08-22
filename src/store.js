import { browser } from "$app/environment";
import { writable, derived, get } from 'svelte/store';
import { addToCart as requestAddToCart, loadCart as requestLoadCart } from '$lib/utils/shopify';

export const showCart = writable(false);

export const cartId = writable(browser ? window.localStorage.getItem('cartId') : '');
export const checkoutUrl = writable(browser ? window.localStorage.getItem('checkoutUrl') : '');
export const cartCreatedAt = writable(browser ? window.localStorage.getItem('cartCreatedAt') : '');
export const cartTotalQuantity = writable(browser ? window.localStorage.getItem('cartTotalQuantity') : '');

export const cartItems = writable([]);
export const cartDiscount = writable({});
export const cartDiscountAllocations = writable([]);
export const cartSubtotal = writable({});
export const cartDiscountCodes = writable([]);
export const cartReferralDiscount = derived(
  [cartDiscountCodes, cartItems, cartDiscountAllocations],
  ([$cartDiscountCodes, $cartItems, $cartDiscountAllocations]) => {
    const hasBulkDiscount = $cartDiscountAllocations.some(
      ({ title }) => title?.toUpperCase() === 'BULK ORDER'
    );
    if (hasBulkDiscount) return null;

    const code = $cartDiscountCodes[0]?.code;
    if (!code) return null;

    const allocations = ($cartItems || [])
      .flatMap(({ node }) => node.discountAllocations || [])
      .filter(({ code: allocationCode }) => allocationCode?.toLowerCase() === code.toLowerCase());
    const amount = allocations.reduce(
      (total, { discountedAmount }) => total + Number(discountedAmount.amount),
      0
    );

    return {
      code,
      amount,
      currencyCode: allocations[0]?.discountedAmount.currencyCode
    };
  }
);
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
    const loadedCart = shopifyResponse?.body?.data?.cart;
    cartItems.set(loadedCart?.lines?.edges);
    cartDiscount.set(getTotalDiscount(loadedCart?.discountAllocations));
    cartDiscountAllocations.set(loadedCart?.discountAllocations || []);
    cartSubtotal.set(loadedCart?.cost?.subtotalAmount);
    cartDiscountCodes.set(loadedCart?.discountCodes || []);
    cartTotalQuantity.set(loadedCart?.totalQuantity);
    checkoutUrl.set(loadedCart?.checkoutUrl || '');

  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (itemId, additionalProductIds = [], note = "") => {
  await requestAddToCart({ cartId: get(cartId), variantId: itemId, additionalProductIds, note});
  await loadCart();
  showCart.set(true);
}

const getTotalDiscount = (discountAllocations) => {
  if (!discountAllocations || discountAllocations.length === 0) return null;

  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);

  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
}
