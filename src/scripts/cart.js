import {
  loadCartRemote,
  createCart as createCartRemote,
  addToCartRemote,
  updateCartLine,
} from '$lib/utils/shopify.js';

const KEY_CART_ID = 'cartId';
const KEY_CART_CREATED_AT = 'cartCreatedAt';
const KEY_CHECKOUT_URL = 'checkoutUrl';
const KEY_CART_TOTAL_QUANTITY = 'cartTotalQuantity';
const KEY_SELECTED_CAR = 'selectedCar';

export const cartEvents = new EventTarget();

const state = {
  items: [],
  discount: null,
  subtotal: null,
  totalQuantity: 0,
};

export function getCartId() {
  return localStorage.getItem(KEY_CART_ID);
}
function setCartId(v) {
  if (v == null) localStorage.removeItem(KEY_CART_ID);
  else localStorage.setItem(KEY_CART_ID, v);
}
function setCartCreatedAt(v) {
  localStorage.setItem(KEY_CART_CREATED_AT, String(v));
}
function getCartCreatedAt() {
  return Number(localStorage.getItem(KEY_CART_CREATED_AT) || 0);
}
function setCheckoutUrl(v) {
  if (v == null) localStorage.removeItem(KEY_CHECKOUT_URL);
  else localStorage.setItem(KEY_CHECKOUT_URL, v);
}
export function getCheckoutUrl() {
  return localStorage.getItem(KEY_CHECKOUT_URL);
}
function setCartTotalQuantity(v) {
  if (v == null) localStorage.removeItem(KEY_CART_TOTAL_QUANTITY);
  else localStorage.setItem(KEY_CART_TOTAL_QUANTITY, String(v));
}
export function getCartTotalQuantity() {
  return Number(localStorage.getItem(KEY_CART_TOTAL_QUANTITY) || 0);
}

export function getSelectedCar() {
  return localStorage.getItem(KEY_SELECTED_CAR) || '';
}
export function setSelectedCar(value) {
  if (value) localStorage.setItem(KEY_SELECTED_CAR, value);
  else localStorage.removeItem(KEY_SELECTED_CAR);
}

function getTotalDiscount(discountAllocations) {
  if (!discountAllocations || discountAllocations.length === 0) return null;
  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);
  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
}

async function ensureCart() {
  const currentDate = Date.now();
  const difference = currentDate - getCartCreatedAt();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  const expired = totalDays > 6;
  const id = getCartId();
  if (id === null || id === 'undefined' || id === 'null' || expired) {
    await createNewCart();
  }
}

async function createNewCart() {
  const response = await createCartRemote();
  const cart = response.body?.data?.cartCreate?.cart;
  setCartId(cart?.id);
  setCartCreatedAt(Date.now());
  setCheckoutUrl(cart?.checkoutUrl);
  setCartTotalQuantity(cart?.totalQuantity ?? 0);
}

export async function loadCart() {
  try {
    await ensureCart();
    let response = await loadCartRemote(getCartId());
    if (!response?.body?.data?.cart) {
      console.log('setting up a new cart', response);
      await createNewCart();
      response = await loadCartRemote(getCartId());
    }
    const cart = response?.body?.data?.cart;
    state.items = cart?.lines?.edges ?? [];
    state.discount = getTotalDiscount(cart?.discountAllocations);
    state.subtotal = cart?.cost?.subtotalAmount ?? null;
    state.totalQuantity = cart?.totalQuantity ?? 0;
    setCartTotalQuantity(state.totalQuantity);
    if (cart?.checkoutUrl) setCheckoutUrl(cart.checkoutUrl);
    cartEvents.dispatchEvent(new CustomEvent('change', { detail: getState() }));
    return response;
  } catch (error) {
    console.error(error);
  }
}

export function getState() {
  return { ...state };
}

export async function addToCart(itemId, additionalProductIds = [], note = '') {
  await ensureCart();
  await addToCartRemote({
    cartId: getCartId(),
    variantId: itemId,
    additionalProductIds,
    note,
  });
  await loadCart();
  cartEvents.dispatchEvent(new CustomEvent('show'));
}

export async function updateProductQuantity({ lineId, variantId, quantity }) {
  await updateCartLine({
    cartId: getCartId(),
    lineId,
    variantId,
    quantity,
  });
  await loadCart();
}

export function showCart() {
  cartEvents.dispatchEvent(new CustomEvent('show'));
}

export function hideCart() {
  cartEvents.dispatchEvent(new CustomEvent('hide'));
}
