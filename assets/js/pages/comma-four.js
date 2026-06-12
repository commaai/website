import '../main.js';
/**
 * /shop/comma-four — CommaFour.svelte buy-box state machine over the
 * shared product-page controller.
 *
 * Runtime fetches (same three Storefront calls as the original page,
 * besides the layout's cart load):
 *   1. comma four product   — initProductPage's universal-load re-run
 *   2. car harness product  — harness stock map (src/lib/utils/harnesses.js)
 *   3. trade-in product     — first variant id for the extra cart line
 *
 * State (CommaFour.svelte): selectedHarness / tradeInChecked /
 * tradeInVariantId / backordered, FOUR_PRICE=999, discountAmount=50,
 * tradeInCredit=250. The price slot and the "$xxx due today" badge are
 * painted here (they only depend on local state, never on the product
 * fetch); the buy-button label/disabled class goes through the controller
 * so it keeps its prerendered disabled state until the product refetch
 * resolves, like the original universal load gating hydration.
 */
import { initProductPage } from '../lib/product-page.js';
import { NO_HARNESS_OPTION } from '../lib/harness-selector.js';
import { openModal } from '../lib/modal.js';
import { getProduct } from '../lib/shopify.js';
import { formatCurrency } from '../lib/currency.js';
import { initFaq } from '../lib/faq.js';

// src/lib/constants/prices.js + CommaFour.svelte:57-58
const FOUR_PRICE = 999;
const discountAmount = 50;
const tradeInCredit = 250;

// src/lib/utils/harnesses.js:8 / src/lib/data/products.js
const CAR_HARNESS_PRODUCT_ID = 'gid://shopify/Product/4447447908415';
const TRADE_IN_PRODUCT_ID = 'gid://shopify/Product/7966994202687';

/* CommaFour state */
let selectedHarness = null;
let tradeInVariantId = null;
let tradeInChecked = false;
let backordered = null;

const section = document.getElementById('product-item');
// the inner <div slot="price" class="price"> (the outer .price is Product's wrapper)
const priceSlot = section.querySelector('.variant-selector .price .price');
const badgesEl = section.querySelector('.badges');
const checkboxLabel = section.querySelector('label.checkbox-card');
const checkboxInput = checkboxLabel.querySelector('input[type="checkbox"]');

let dueTodayEl = null; // <span class="price-due-today svelte-1qobqhj">

const getAdditionalProductIds = () => {
  const ids = [];
  if (selectedHarness && selectedHarness !== NO_HARNESS_OPTION) {
    ids.push(selectedHarness.id);
  }
  if (tradeInChecked && tradeInVariantId) {
    ids.push(tradeInVariantId);
  }
  return ids;
};

const getCartNote = () => {
  if (selectedHarness && selectedHarness.car) {
    const vehicle_note = `Vehicle: ${selectedHarness.car}`;
    const backordered_note = backordered ? `${backordered} backordered` : 'in stock';
    return `${vehicle_note} (${backordered_note})`;
  }
  return '';
};

/* Disclaimer modal (Modal.svelte; paragraph strings verbatim from the
   compiled CommaFour chunk, incl. the embedded newlines) */
let modal = null;
const beforeAddToCart = (proceed) => {
  let contentHTML = '';
  if (getAdditionalProductIds().length === 0) {
    contentHTML += '<p class="disclaimer svelte-1qobqhj">A car harness is required to connect the comma four to your vehicle.\n      You currently have no car harness selected.</p> ';
  }
  contentHTML += '<p class="disclaimer svelte-1qobqhj">The comma four does not ship with any software.\n    Once you have the device you will be able to install any software you choose at your own risk.</p> '
    + '<p class="disclaimer svelte-1qobqhj">Regardless of what software you choose to install, this device in no way substitutes for a licensed, sober, and attentive driver in the drivers seat.\n    <b>If you are not going to always pay careful attention while driving, do not buy this product.</b></p>';
  modal = openModal({
    title: 'Disclaimer',
    contentHTML,
    primaryButtonText: backordered ? `Add to cart (ships in ${backordered})` : 'Add to cart',
    // onProceed = () => { addToCart(); showDisclaimerModal = false }
    onPrimaryClick: () => {
      proceed();
      modal.close();
    },
    // "Go back" / backdrop click / Escape
    onClose: () => {
      modal.close();
    },
  });
};

/* CommaFour.svelte:76-94 */
const handleHarnessSelection = (value) => {
  selectedHarness = value;
  if (value === NO_HARNESS_OPTION) {
    backordered = null;
    controller.state.disableBuyButtonText = null;
  } else if (value) {
    backordered = value.currentlyNotInStock ? (value.backordered || '1-12 weeks') : null;
    controller.state.disableBuyButtonText = null;
  } else {
    backordered = null;
    controller.state.disableBuyButtonText = 'SELECT YOUR CAR';
  }

  // Reset trade-in checkbox
  if (!value) {
    setChecked(false);
    tradeInChecked = false;
  }
  render();
};

const controller = initProductPage({
  getCartNote,
  getAdditionalProductIds,
  beforeAddToCart,
  onHarnessChange: handleHarnessSelection,
});

/* CheckboxCard.svelte — checked/disabled both mirror the label class and the
   real input props; setChecked is the parent-facing API (resets / autofill) */
function setChecked(value) {
  checkboxInput.checked = value;
  checkboxLabel.classList.toggle('checked', value);
}

checkboxInput.addEventListener('change', () => {
  if (checkboxInput.disabled) return; // () => !disabled && onToggle()
  tradeInChecked = !tradeInChecked;
  setChecked(tradeInChecked);
  render();
});

/* price slot + badges + checkbox-disabled painter (everything reactive in
   CommaFour that does not depend on the product fetch) */
function render() {
  const showDiscount = selectedHarness === NO_HARNESS_OPTION;
  const priceDueToday = showDiscount ? FOUR_PRICE - discountAmount : FOUR_PRICE;
  const priceAfterTradeIn = tradeInChecked ? priceDueToday - tradeInCredit : priceDueToday;

  // <div slot="price" class="price"> (CommaFour.svelte:134-142)
  if (tradeInChecked && tradeInCredit > 0) {
    const span = document.createElement('span');
    span.textContent = `${formatCurrency({ amount: priceAfterTradeIn, currencyCode: 'USD' }, 0)} after trade-in received`;
    priceSlot.textContent = '';
    priceSlot.appendChild(span);
  } else if (showDiscount && discountAmount > 0) {
    priceSlot.textContent = formatCurrency({ amount: priceDueToday, currencyCode: 'USD' }, 0);
  } else {
    priceSlot.textContent = formatCurrency({ amount: FOUR_PRICE, currencyCode: 'USD' }, 0);
  }

  // "$xxx due today" badge (moved into .badges by commit b22beb3)
  if (tradeInChecked && tradeInCredit > 0) {
    if (!dueTodayEl) {
      dueTodayEl = document.createElement('span');
      dueTodayEl.className = 'price-due-today svelte-1qobqhj';
      badgesEl.appendChild(dueTodayEl);
    }
    dueTodayEl.textContent = `${formatCurrency({ amount: priceDueToday, currencyCode: 'USD' }, 0)} due today`;
  } else if (dueTodayEl) {
    dueTodayEl.remove();
    dueTodayEl = null;
  }

  // CheckboxCard disabled={disableBuyButtonText !== null}
  const disabled = controller.state.disableBuyButtonText !== null;
  checkboxInput.disabled = disabled;
  checkboxLabel.classList.toggle('disabled', disabled);

  // buy button label/disabled — no-op until the product refetch resolves
  controller.state.backordered = backordered;
  controller.updatePriceAndButton();
}

/* onMount: ?trade-in=1 autofill (CommaFour.svelte:100-112) — pure DOM, runs
   before any fetch; setSelection rewrites the URL to ?harness=… (the
   trade-in param is dropped, exactly like the original) */
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('trade-in') === '1') {
  setChecked(true);
  tradeInChecked = true;
  render();
  controller.harnessSelector.setSelection(NO_HARNESS_OPTION);
}

/* onMount: trade-in product fetch (CommaFour.svelte:114-127) */
(async () => {
  try {
    const response = await getProduct(TRADE_IN_PRODUCT_ID);
    if (response.status === 200) {
      const tradeInProduct = response.body && response.body.data && response.body.data.product;
      if (tradeInProduct && tradeInProduct.variants && tradeInProduct.variants.nodes
          && tradeInProduct.variants.nodes.length > 0) {
        tradeInVariantId = tradeInProduct.variants.nodes[0].id;
      }
    }
  } catch (error) {
    console.error('Failed to fetch trade-in product:', error);
  }
})();

/* harness stock map (src/lib/utils/harnesses.js fetchHarnessVariants) —
   merged into the dropdown items, then the ?harness= restore runs with
   stock flags attached ($harnesses-filled timing) */
(async () => {
  const harnessResponse = await getProduct(CAR_HARNESS_PRODUCT_ID);
  const harnesses = (harnessResponse.body && harnessResponse.body.data
    && harnessResponse.body.data.product && harnessResponse.body.data.product.variants
    && harnessResponse.body.data.product.variants.nodes) || [];
  const harnessInfo = {};
  for (const harness of harnesses) {
    harnessInfo[harness.id] = {
      currentlyNotInStock: harness.currentlyNotInStock,
      availableForSale: harness.availableForSale,
    };
  }
  controller.harnessSelector.setStock(harnessInfo);
  controller.harnessSelector.setInitialSelection();
})();

/* FAQ hash-sync for #comma-four-faq and #moneyback-trial */
initFaq();
