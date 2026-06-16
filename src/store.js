import { browser } from "$app/environment";
import { writable, get } from 'svelte/store';
import { addToCart as requestAddToCart, loadCart as requestLoadCart, getProduct, addCartLines, updateCartLines, removeCartLines } from '$lib/utils/shopify';

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

// --- Bundle auto-combination ---
// When a loose comma four and a loose car harness are both in the cart, merge
// them into the matching "comma four + harness" bundle variant (one per
// vehicle, matched by variant title) before checkout. Native Shopify can't
// auto-bundle, so we do it client-side here after each cart change.
const BUNDLE_PRODUCT_ID = "gid://shopify/Product/8209310384191";
const COMMA_FOUR_PRODUCT_ID = "gid://shopify/Product/7964554231871";
const CAR_HARNESS_PRODUCT_ID = "gid://shopify/Product/4447447908415";

let _bundleVariantsByTitle = null;
const getBundleVariants = async () => {
  if (_bundleVariantsByTitle) return _bundleVariantsByTitle;
  const resp = await getProduct(BUNDLE_PRODUCT_ID);
  const nodes = resp?.body?.data?.product?.variants?.nodes ?? [];
  const map = {};
  for (const v of nodes) map[v.title] = v.id;
  _bundleVariantsByTitle = map;
  return map;
};

export const reconcileBundles = async () => {
  const id = get(cartId);
  if (!id) return;

  const edges = get(cartItems) ?? [];
  const fourLines = [];
  const harnessLines = [];
  for (const edge of edges) {
    const node = edge?.node;
    const productId = node?.merchandise?.product?.id;
    if (productId === COMMA_FOUR_PRODUCT_ID) {
      fourLines.push({ id: node.id, qty: node.quantity });
    } else if (productId === CAR_HARNESS_PRODUCT_ID) {
      harnessLines.push({ id: node.id, qty: node.quantity, title: node.merchandise.title });
    }
  }

  let fourRemaining = fourLines.reduce((sum, l) => sum + l.qty, 0);
  if (fourRemaining === 0 || harnessLines.length === 0) return; // nothing to pair

  const bundleMap = await getBundleVariants();
  const toAdd = [];
  const toUpdate = [];
  const toRemove = [];
  let pairs = 0;

  // Pair each loose harness with available loose comma fours.
  for (const h of harnessLines) {
    if (fourRemaining <= 0) break;
    const bundleVariantId = bundleMap[h.title];
    if (!bundleVariantId) {
      console.warn("[bundle] no bundle variant for harness:", h.title);
      continue; // leave this harness loose
    }
    const n = Math.min(h.qty, fourRemaining);
    if (n === h.qty) toRemove.push(h.id);
    else toUpdate.push({ id: h.id, quantity: h.qty - n });
    toAdd.push({ merchandiseId: bundleVariantId, quantity: n });
    fourRemaining -= n;
    pairs += n;
  }

  if (pairs === 0) return;

  // Remove `pairs` comma four units from the loose comma four lines.
  let toReduce = pairs;
  for (const f of fourLines) {
    if (toReduce <= 0) break;
    const take = Math.min(f.qty, toReduce);
    if (take === f.qty) toRemove.push(f.id);
    else toUpdate.push({ id: f.id, quantity: f.qty - take });
    toReduce -= take;
  }

  try {
    if (toRemove.length) await removeCartLines({ cartId: id, lineIds: toRemove });
    if (toUpdate.length) await updateCartLines({ cartId: id, lines: toUpdate });
    if (toAdd.length) await addCartLines({ cartId: id, lines: toAdd });
    await loadCart();
  } catch (error) {
    console.error("[bundle] reconcile failed:", error);
  }
};

export const addToCart = async (itemId, additionalProductIds = [], note = "") => {
  await requestAddToCart({ cartId: get(cartId), variantId: itemId, additionalProductIds, note});
  await loadCart();
  await reconcileBundles();
  showCart.set(true);
}

export const getTotalDiscount = (discountAllocations) => {
  if (!discountAllocations || discountAllocations.length === 0) return null;

  const discountAmount = discountAllocations.reduce((totalAmount, allocation) => {
    return totalAmount + Number(allocation.discountedAmount.amount);
  }, 0);

  return { amount: discountAmount, currencyCode: discountAllocations[0].discountedAmount.currencyCode };
}
