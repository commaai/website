/**
 * Product.svelte client behaviors for the generic /shop/<product> pages
 * (and the comma-four / body / setup slices that reuse the partial).
 *
 * The Hugo partial product/product.html prerenders the build-time Shopify
 * snapshot and emits <script type="application/json" id="product-config">
 * with: { key, id, autoSelectFirstVariant, forceOutOfStock,
 *         hideOutOfStockVariants, hasVariantSelector, hasPriceSlot,
 *         backordered, backorderedPrefix, priceOverride,
 *         disableBuyButtonText }.
 *
 * On load this module re-fetches the product from Shopify (the original
 * universal load re-ran in the browser on every page view) and patches the
 * DOM: option list, variant image, price label, buy-button label/disabled.
 *
 *   const controller = initProductPage(overrides);
 *
 * overrides (all optional — used by comma-four/body/setup wrappers):
 *   getCartNote()              -> string cart note (CommaFour vehicle note)
 *   getAdditionalProductIds()  -> [variantId, ...] extra cart lines
 *   beforeAddToCart(thunk)     intercepts add-to-cart (CommaFour modal);
 *                              call thunk() to perform the add
 *   onHarnessChange(selection) replaces the default harness onChange
 *                              (controller.handleVariantSelection)
 *   hideSupportNoteCard, restoreSelection  forwarded to initHarnessSelector
 *   renderPrice(priceEl, state) custom price-slot painter (pages that
 *                              override the price slot; default painter is
 *                              skipped automatically when hasPriceSlot)
 *
 * controller: { config, state, ready (Promise of the initial refetch),
 *   harnessSelector (initHarnessSelector handle or null),
 *   handleVariantSelection(variant), updatePriceAndButton(),
 *   setDisableBuyButtonText(text|null), selectedVariant() }
 */
import { getProduct } from './shopify.js';
import { addToCart } from './cart.js';
import { formatCurrency } from './currency.js';
import { initHarnessSelector } from './harness-selector.js';

export function initProductPage(overrides = {}) {
  const configEl = document.getElementById('product-config');
  if (!configEl) return null;
  const config = JSON.parse(configEl.textContent);
  const section = document.getElementById('product-item');

  const state = {
    product: null, // fresh Shopify product (set by the runtime refetch)
    variants: [],
    selectedVariantId: null,
    backordered: config.backordered,
    backorderedPrefix: config.backorderedPrefix,
    disableBuyButtonText: config.disableBuyButtonText,
    forceOutOfStock: config.forceOutOfStock,
    priceOverride: config.priceOverride,
  };

  /* --- image gallery (Product.svelte:100-113) ----------------------------- */
  const previewPicture = section.querySelector('.preview picture');
  const thumbs = Array.from(section.querySelectorAll('.product-images button.variant'));
  thumbs.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      thumbs.forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
      // swap BOTH <source srcset> avif/webp AND <img src> in the preview
      const from = btn.querySelector('picture');
      for (const type of ['image/avif', 'image/webp']) {
        const fromSource = from.querySelector(`source[type="${type}"]`);
        const toSource = previewPicture.querySelector(`source[type="${type}"]`);
        if (fromSource && toSource) toSource.setAttribute('srcset', fromSource.getAttribute('srcset'));
      }
      previewPicture.querySelector('img').setAttribute('src', from.querySelector('img').getAttribute('src'));
    });
  });

  /* --- variant selection / price / buy button ----------------------------- */
  const variantSelectorEl = section.querySelector('.variant-selector');
  const priceEl = variantSelectorEl.querySelector('.price');
  const buyBtn = section.querySelector('button.svelte-1io34pc');

  const selectedVariant = () =>
    state.variants.find(variant => variant.id === state.selectedVariantId);

  function getPriceLabel() {
    if (state.priceOverride !== null && state.priceOverride !== undefined) {
      return formatCurrency({ amount: state.priceOverride, currencyCode: 'USD' }, 0);
    }
    const variant = selectedVariant();
    if (variant) {
      return formatCurrency(variant.price, 0);
    } else if (state.product.priceRange.minVariantPrice.amount !== state.product.priceRange.maxVariantPrice.amount) {
      return `from ${formatCurrency(state.product.priceRange.minVariantPrice, 0)}`;
    } else {
      return formatCurrency(state.product.priceRange.minVariantPrice, 0);
    }
  }

  function addToCartLabel() {
    const variant = selectedVariant();
    if (state.disableBuyButtonText) return state.disableBuyButtonText;
    if (state.forceOutOfStock || (variant && !variant.availableForSale)) {
      let label = 'Out of stock';
      if (state.backordered) label += ` (${state.backorderedPrefix}${state.backordered})`;
      return label;
    }
    if (state.backordered) return `Add to cart (${state.backorderedPrefix}${state.backordered})`;
    return 'Add to cart';
  }

  function isDisabled() {
    const variant = selectedVariant();
    return state.forceOutOfStock
      || !variant
      || variant.availableForSale === false
      || (state.disableBuyButtonText !== null && state.disableBuyButtonText !== undefined);
  }

  function updatePriceAndButton() {
    if (!state.product) return;
    if (typeof overrides.renderPrice === 'function') {
      overrides.renderPrice(priceEl, state);
    } else if (!config.hasPriceSlot) {
      priceEl.textContent = getPriceLabel();
    }
    buyBtn.textContent = `${addToCartLabel()} `;
    // class:disabled — toggled on the SSR class string, NOT the disabled attr
    buyBtn.classList.toggle('disabled', isDisabled());
  }

  function updateVariantImage() {
    const variant = selectedVariant();
    const img = variantSelectorEl.querySelector(':scope > picture img');
    if (img && variant && variant.image) img.setAttribute('src', variant.image.url);
  }

  // Rebuild the variant <img> + <select> from fresh data. Handles all three
  // transitions: rebuild in place, create (a second variant came back in
  // stock on a hideOutOfStockVariants page), remove (only one sellable left).
  let selectWired = false;
  function rebuildVariantUI() {
    if (config.hasVariantSelector) return;
    let picture = variantSelectorEl.querySelector(':scope > picture');
    let selectWrap = variantSelectorEl.querySelector(':scope > .select');
    if (state.variants.length > 1) {
      if (!picture) {
        picture = document.createElement('picture');
        const img = document.createElement('img');
        img.setAttribute('alt', '');
        picture.appendChild(img);
        variantSelectorEl.append(picture, ' ');
      }
      if (!selectWrap) {
        selectWrap = document.createElement('div');
        selectWrap.className = 'select svelte-zt3auu';
        const select = document.createElement('select');
        select.className = 'svelte-zt3auu';
        selectWrap.append(select, ' ');
        variantSelectorEl.appendChild(selectWrap);
      }
      const select = selectWrap.querySelector('select');
      select.textContent = '';
      for (const variant of state.variants) {
        const option = document.createElement('option');
        option.value = variant.id;
        option.textContent = `${variant.title} `;
        select.appendChild(option);
      }
      select.value = state.selectedVariantId;
      if (!selectWired) {
        selectWired = true;
        select.addEventListener('change', () => {
          state.selectedVariantId = select.value;
          updateVariantImage();
          updatePriceAndButton();
        });
      }
      updateVariantImage();
    } else {
      if (picture) picture.remove();
      if (selectWrap) selectWrap.remove();
    }
  }

  /* --- add to cart (Product.svelte addItem) -------------------------------- */
  buyBtn.addEventListener('click', () => {
    if (isDisabled()) return; // Button.svelte: no dispatch when disabled
    let note = '';
    if (typeof overrides.getCartNote === 'function') {
      note = overrides.getCartNote();
    }
    const additionalProductIds = typeof overrides.getAdditionalProductIds === 'function'
      ? overrides.getAdditionalProductIds()
      : [];
    const itemId = selectedVariant().id;
    if (typeof overrides.beforeAddToCart === 'function') {
      overrides.beforeAddToCart(() => addToCart(itemId, additionalProductIds, note));
    } else {
      addToCart(itemId, additionalProductIds, note);
    }
  });

  /* --- harness selector (car-harness; comma-four via overrides) ------------ */
  function handleVariantSelection(variant) {
    state.selectedVariantId = (variant && variant.id) || null;
    state.backordered = variant && variant.currentlyNotInStock
      ? (variant.backordered || '1-12 weeks')
      : null;
    updatePriceAndButton();
  }

  let harnessSelector = null;
  if (config.hasVariantSelector) {
    harnessSelector = initHarnessSelector({
      root: section.querySelector('.dropdown'),
      onChange: typeof overrides.onHarnessChange === 'function'
        ? overrides.onHarnessChange
        : handleVariantSelection,
      hideSupportNoteCard: !!overrides.hideSupportNoteCard,
      restoreSelection: !!overrides.restoreSelection,
    });
  }

  /* --- runtime refetch (mandatory — the old universal load re-ran in the
         browser and re-rendered variants/stock/price on every page view) ---- */
  const ready = (async () => {
    const response = await getProduct(config.id);
    const product = response && response.body && response.body.data && response.body.data.product;
    if (!product) {
      console.error('Error fetching product', response);
      return;
    }
    state.product = product;
    const nodes = (product.variants && product.variants.nodes) || [];
    state.variants = config.hideOutOfStockVariants
      ? nodes.filter(variant => variant.availableForSale)
      : nodes;

    // keep the current selection when still present, else first variant
    const ssrSelect = variantSelectorEl.querySelector(':scope > .select select');
    let selectedId = state.selectedVariantId || (ssrSelect ? ssrSelect.value : null);
    if (selectedId && !state.variants.some(variant => variant.id === selectedId)) selectedId = null;
    if (!selectedId && config.autoSelectFirstVariant && state.variants.length > 0) {
      selectedId = state.variants[0].id;
    }
    state.selectedVariantId = selectedId;

    rebuildVariantUI();
    updatePriceAndButton();

    if (harnessSelector) {
      // one fetch serves page + harness stock (the original fired two
      // identical requests via harnesses.js — consolidated on purpose)
      const stockInfo = {};
      for (const variant of nodes) {
        stockInfo[variant.id] = {
          currentlyNotInStock: variant.currentlyNotInStock,
          availableForSale: variant.availableForSale,
        };
      }
      harnessSelector.setStock(stockInfo);
      harnessSelector.setInitialSelection();
    }
  })();

  return {
    config,
    state,
    ready,
    harnessSelector,
    selectedVariant,
    handleVariantSelection,
    updatePriceAndButton,
    setDisableBuyButtonText(text) {
      state.disableBuyButtonText = text;
      updatePriceAndButton();
    },
  };
}
