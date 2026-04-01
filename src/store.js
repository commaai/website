import { addToCart as requestAddToCart, loadCart as requestLoadCart } from '$lib/utils/shopify';

// Simple reactive store for client-side state
function createStore(key, initialValue) {
  let value = typeof window !== 'undefined' && key && window.localStorage.getItem(key) != null
    ? window.localStorage.getItem(key)
    : initialValue;
  const listeners = new Set();

  return {
    get() { return value; },
    set(newValue) {
      value = newValue;
      if (typeof window !== 'undefined' && key) {
        window.localStorage.setItem(key, newValue);
      }
      listeners.forEach(fn => fn(value));
    },
    subscribe(fn) {
      listeners.add(fn);
      fn(value);
      return () => listeners.delete(fn);
    }
  };
}

export const cart = createStore(null, []);
export const search = createStore(null, '');
export const showCart = createStore(null, false);

export const cartId = createStore('cartId', '');
export const checkoutUrl = createStore('checkoutUrl', '');
export const cartCreatedAt = createStore('cartCreatedAt', '');
export const cartTotalQuantity = createStore('cartTotalQuantity', '');

export const cartItems = createStore(null, []);
export const cartDiscount = createStore(null, {});
export const cartSubtotal = createStore(null, {});
export const selectedCar = createStore('selectedCar', '');

export const loadCart = async () => {
  try {
    const shopifyResponse = await requestLoadCart(cartId.get());
    cartItems.set(shopifyResponse?.body?.data?.cart?.lines?.edges);
    cartDiscount.set(getTotalDiscount(shopifyResponse?.body?.data?.cart?.discountAllocations));
    cartSubtotal.set(shopifyResponse?.body?.data?.cart?.cost?.subtotalAmount);
    cartTotalQuantity.set(shopifyResponse.body?.data?.cart?.totalQuantity);
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (itemId, additionalProductIds = [], note = "") => {
  await requestAddToCart({ cartId: cartId.get(), variantId: itemId, additionalProductIds, note });
  await loadCart();
  showCart.set(true);
};

export const getTotalDiscount = (discountAllocations) => {
  if (!discountAllocations || discountAllocations.length === 0) return null;

  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);

  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
};
