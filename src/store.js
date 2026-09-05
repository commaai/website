import { browser } from "$app/environment";
import { writable, derived, get } from 'svelte/store';
import {
  addToCart as requestAddToCart,
  loadCart as requestLoadCart,
  removeCartLines as requestRemoveCartLines,
  updateCartDiscountCodes as requestUpdateCartDiscountCodes,
} from '$lib/utils/shopify';
import { products } from '$lib/data/products.js';
import { isReferralCode, REFERRAL_DISCOUNT } from '$lib/utils/referral';

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
export const cartReferralWarning = writable(null);
export const cartBulkDiscountAllocation = derived(
  cartDiscountAllocations,
  ($cartDiscountAllocations) =>
    $cartDiscountAllocations.find(({ title }) => title?.toUpperCase() === 'BULK ORDER') || null
);
export const cartReferral = derived(
  [cartDiscountCodes, cartReferralWarning, cartBulkDiscountAllocation],
  ([$cartDiscountCodes, $cartReferralWarning, $cartBulkDiscountAllocation]) => {
    const referral = $cartDiscountCodes.find(({ code }) => isReferralCode(code))
      || ($cartReferralWarning && { code: $cartReferralWarning.code, applicable: false });
    if (!referral) return null;

    const warning = $cartReferralWarning?.code.toLowerCase() === referral.code.toLowerCase()
      ? $cartReferralWarning : null;
    const reason = !referral.applicable ? warning?.reason : null;
    if (reason === 'DISCOUNT_NOT_FOUND') return null;

    const rejected = reason === 'DISCOUNT_USAGE_LIMIT_REACHED';
    if ($cartBulkDiscountAllocation && !rejected) return null;

    return {
      ...referral,
      message: rejected ? 'This referral code has reached its usage limit.' : null,
    };
  }
);
export const cartReferralDiscount = derived(cartReferral, ($cartReferral) =>
  $cartReferral?.applicable ? { code: $cartReferral.code, amount: REFERRAL_DISCOUNT } : null
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
    if (!loadedCart) return;
    cartItems.set(loadedCart.lines.edges);
    cartDiscount.set(getTotalDiscount(loadedCart.discountAllocations));
    cartDiscountAllocations.set(loadedCart.discountAllocations);
    cartSubtotal.set(loadedCart.cost.subtotalAmount);
    cartDiscountCodes.set(loadedCart.discountCodes);
    cartTotalQuantity.set(loadedCart.totalQuantity);
    checkoutUrl.set(loadedCart.checkoutUrl);

  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (itemId, additionalProductIds = [], note = "") => {
  await requestAddToCart({ cartId: get(cartId), variantId: itemId, additionalProductIds, note});
  await loadCart();
  showCart.set(true);
}

export const removeReferralDiscount = async () => {
  await requestUpdateCartDiscountCodes({
    cartId: get(cartId),
    discountCodes: get(cartDiscountCodes)
      .map(({ code }) => code)
      .filter((code) => !isReferralCode(code)),
  });
  await loadCart();
}

export const applyReferralDiscount = async (referralCode) => {
  if (!isReferralCode(referralCode)) return;

  // Refresh first so lines added from another tab or a previously stale view are included.
  await loadCart();

  const tradeInLineIds = (get(cartItems) || [])
    .filter(({ node }) => {
      const product = node.merchandise.product;
      return product.id === products['comma-four-trade-in'].id;
    })
    .map(({ node }) => node.id);

  await requestRemoveCartLines({
    cartId: get(cartId),
    lineIds: tradeInLineIds,
  });

  await requestUpdateCartDiscountCodes({
    cartId: get(cartId),
    discountCodes: [
      ...get(cartDiscountCodes)
        .map(({ code }) => code)
        .filter((code) => !isReferralCode(code)),
      referralCode,
    ],
  });
  await loadCart();
}

export const getTotalDiscount = (discountAllocations) => {
  if (!discountAllocations || discountAllocations.length === 0) return null;

  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);

  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
}
