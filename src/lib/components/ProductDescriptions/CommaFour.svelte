<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import CheckboxCard from "$lib/components/CheckboxCard.svelte";
  import Accordion from "$lib/components/Accordion.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import ShopPayInstallments from "$lib/components/ShopPayInstallments.svelte";

  import ShippingIcon from "$lib/icons/features/shipping.svg?raw";
  import MoneyBackGuaranteeIcon from "$lib/icons/features/money-back-guarantee.svg?raw";
  import WarrantyIcon from "$lib/icons/features/warranty.svg?raw";
  import GiftIcon from "$lib/icons/features/gift.svg?raw";
  import CloseIcon from "$lib/icons/ui/close.svg?raw";

  import { FOUR_PRICE, FOUR_SALE, FOUR_STRIKETHROUGH_PRICE, FOUR_TRADE_IN_CREDIT, NO_HARNESS_DISCOUNT } from '$lib/constants/prices.js';
  import { NO_HARNESS_OPTION } from '$lib/constants/vehicles.js';
</script>

<script>
  import { onMount } from 'svelte';
  import { getProduct } from '$lib/utils/shopify';
  import { products as productsData } from '$lib/data/products.js';
  import { DEFAULT_BACKORDER_ESTIMATE } from '$lib/constants/shipping.js';
  import { formatCurrency } from "$lib/utils/currency";
  import { applyReferralDiscount, cartReferralCode, removeReferralDiscount } from '../../../store.js';
  import { REFERRAL_DISCOUNT } from '$lib/utils/referral.js';

  export let product;
  let disableBuyButtonText = "SELECT YOUR CAR";

  let harnessSelectorRef;
  let checkboxCardRef;

  let showDisclaimerModal = false;
  let onProceed;
  let beforeAddToCart = (addToCart) => {
    onProceed = () => {
      addToCart();
      showDisclaimerModal = false;
    }
    showDisclaimerModal = true;
  }

  let getCartNote = () => {
    if (selectedHarness?.car) {
      // TODO: support car harness and harness connector page (latter won't have a car attribute)
      const vehicle_note = `Vehicle: ${selectedHarness.car}`;
      const backordered_note = backordered ? `${backordered} backordered` : 'in stock';

      return `${vehicle_note} (${backordered_note})`;
    }
    return '';
  }

  let selectedHarness = null;
  let tradeInVariantId = null;
  let tradeInChecked = false;
  let backordered = null;
  let removedReferralCode = null;
  let updatingReferral = false;

  $: referralCode = $cartReferralCode;

  // Trade-in and discount configuration
  $: showDiscount = selectedHarness === NO_HARNESS_OPTION;

  // Price calculations
  $: priceDueToday = showDiscount ? FOUR_PRICE - NO_HARNESS_DISCOUNT : FOUR_PRICE;
  $: discountedPriceDueToday = referralCode ? priceDueToday - REFERRAL_DISCOUNT : priceDueToday;
  $: showTradeInNote = tradeInChecked && FOUR_TRADE_IN_CREDIT > 0;
  $: priceAfterTradeIn = showTradeInNote ? priceDueToday - FOUR_TRADE_IN_CREDIT : priceDueToday;
  const usd = (amount) => formatCurrency({ amount, currencyCode: 'USD' }, 0);

  $: additionalProductIds = (() => {
    const ids = [];
    if (selectedHarness && selectedHarness !== NO_HARNESS_OPTION) {
      ids.push(selectedHarness.id);
    }
    if (tradeInChecked && tradeInVariantId && !referralCode) {
      ids.push(tradeInVariantId);
    }
    return ids;
  })();

  const handleInstallmentsCheckout = () => {
    if (selectedHarness) document.getElementById('add-to-cart')?.click();
    else showDisclaimerModal = true;
  };

  const handleHarnessSelection = (value) => {
    selectedHarness = value;
    if (value === NO_HARNESS_OPTION) {
      backordered = null;
      disableBuyButtonText = null;
    } else if (value) {
      backordered = value.currentlyNotInStock ? (value.backordered || DEFAULT_BACKORDER_ESTIMATE) : null;
      disableBuyButtonText = null;
    } else {
      backordered = null;
      disableBuyButtonText = "SELECT YOUR CAR";
    }

    // Reset trade-in checkbox
    if (!value && checkboxCardRef) {
      checkboxCardRef.setChecked(false);
      tradeInChecked = false;
    }
  }

  const handleTradeInToggle = () => {
    tradeInChecked = !tradeInChecked;
  }

  const handleRemoveReferral = async () => {
    updatingReferral = true;
    removedReferralCode = referralCode;
    await removeReferralDiscount();
    updatingReferral = false;
  }

  const handleUndoReferral = async () => {
    updatingReferral = true;
    await applyReferralDiscount(removedReferralCode);
    checkboxCardRef?.setChecked(false);
    tradeInChecked = false;
    removedReferralCode = null;
    updatingReferral = false;
  }

  onMount(async () => {
    // Autofill trade-in checkbox
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('trade-in') === '1' && !urlParams.has('ref')) {
      if (checkboxCardRef) {
        checkboxCardRef.setChecked(true);
        tradeInChecked = true;
      }
      if (harnessSelectorRef) {
        harnessSelectorRef.setSelection(NO_HARNESS_OPTION);
      }
    }

    // Fetch trade-in product variant ID
    try {
      const tradeInProductId = productsData["comma-four-trade-in"]?.id;
      if (!tradeInProductId) return;
      const response = await getProduct(tradeInProductId);
      if (response.status === 200) {
        const tradeInProduct = response.body?.data?.product;
        if (tradeInProduct?.variants?.nodes?.length > 0) {
          tradeInVariantId = tradeInProduct.variants.nodes[0].id;
        }
      }
    } catch (error) {
      console.error('Failed to fetch trade-in product:', error);
    }
  });
</script>

<Product {product} {additionalProductIds} {backordered} {beforeAddToCart} {getCartNote} priceOverride={FOUR_PRICE}
         previousPrice={FOUR_STRIKETHROUGH_PRICE} sale={FOUR_SALE}
         disableBuyButtonText={disableBuyButtonText}>
  <div slot="shipping"></div>

  <div slot="price"></div>

  <span slot="price-accessory">
    <div class="payment-options">
      <div class="option-wrap">
        <span class="option-label">Buy now</span>
        <span class="option pay-now-price" class:sale-price={FOUR_SALE}>
          {#if referralCode}
            <span class="referral-prices">
              <s class="original-price">{usd(priceAfterTradeIn)}</s>
              <span>{usd(priceAfterTradeIn - REFERRAL_DISCOUNT)}</span>
            </span>
          {:else}
            {usd(priceAfterTradeIn)}
          {/if}
        </span>
      </div>
      <div class="option-wrap">
        <span class="option-label">Finance</span>
        <span class="option finance-price">
          <ShopPayInstallments
            split
            variantId={product.variants.nodes[0]?.id}
            amount={discountedPriceDueToday}
            onCheckout={handleInstallmentsCheckout}
          />
        </span>
      </div>
    </div>
    <p class="trade-in-note" class:invisible={!showTradeInNote}>
      {usd(discountedPriceDueToday)} due today,
      ${FOUR_TRADE_IN_CREDIT} trade-in credit when old device is received
    </p>

    <hr />

    <strong>Select a harness to connect the comma four to your car.</strong>
    <HarnessSelector
      bind:this={harnessSelectorRef}
      label="Select your car"
      onChange={handleHarnessSelection}
      showNoHarnessOption={true}
    >
    </HarnessSelector>
    <CheckboxCard bind:this={checkboxCardRef} title="${FOUR_TRADE_IN_CREDIT} credit with trade-in" checked={tradeInChecked} onToggle={handleTradeInToggle}
                  disabled={disableBuyButtonText !== null || referralCode} strikethroughTitle={Boolean(referralCode)}>
      {#if referralCode}
        Trade in credit is <b>not available</b> when using a referral code.
      {:else}
        Get ${FOUR_TRADE_IN_CREDIT} credit when you trade in your old comma device. Any comma device, in any condition.
        <a href="/shop/comma-four-trade-in">Instructions and Terms</a>
      {/if}
    </CheckboxCard>
    {#if referralCode || removedReferralCode}
      <NoteCard
        title={removedReferralCode ? 'Referral discount removed' : `$${REFERRAL_DISCOUNT} referral discount applied`}
        icon={GiftIcon}
        highlightTitle={!removedReferralCode}
      >
        {#if !removedReferralCode}
          <div class="referral-message">
            Your referral discount will be applied to this order at checkout.
            <a href="https://comma.ai/terms#referral-terms" target="_blank" rel="noopener noreferrer">Terms and conditions</a> apply.
          </div>
        {/if}
        <button
          slot="actions"
          class="remove-referral"
          class:undo-referral={removedReferralCode}
          aria-label={removedReferralCode ? 'Undo referral discount removal' : 'Remove referral discount'}
          disabled={updatingReferral}
          on:click={removedReferralCode ? handleUndoReferral : handleRemoveReferral}
        >
          {#if removedReferralCode}
            Undo
          {:else}
            {@html CloseIcon}
          {/if}
        </button>
      </NoteCard>
    {/if}
    <NoteCard title="Free rush shipping" icon={ShippingIcon} highlightTitle>
      UPS 2nd Day Air in the US, fulfilled the next business day. International shipping is $30 flat rate.
      Visit <a href="/support/orders-returns" target="_blank">Orders and Shipping</a> to learn more.
    </NoteCard>
  </span>

  <div slot="notes">
    <NoteCard title="Upgrading from another comma device?">
      You do not need a new car harness. All comma devices use the same harness.
    </NoteCard>
  </div>

  <div slot="description">
    <div class="item">
      <Accordion>
        <div class="label" slot="label">
          <div>{@html MoneyBackGuaranteeIcon}</div>
          <span>Try our 30-day money-back trial</span>
        </div>
        <div class="details" slot="content">
          See for yourself why Consumer Reports rated us as the
          <a href="https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf">top driver assistance system</a>.
          We think you’ll love it, but if you’re not satisfied, send it back for a full refund.
        </div>
      </Accordion>
    </div>
    <div class="item">
      <Accordion>
        <div class="label" slot="label">
          <div>{@html WarrantyIcon}</div>
          <span>1-year hardware warranty</span>
        </div>
        <div class="details" slot="content">
          1-year limited warranty against hardware defects. Extend it with <a href="/connect#what-is-commacare">commacare</a>.
        </div>
      </Accordion>
    </div>
  </div>
</Product>

<Modal
  title="Disclaimer"
  primaryButtonId="popup-add-to-cart"
  onPrimaryClick={onProceed}
  onClose={() => showDisclaimerModal = false}
  bind:show={showDisclaimerModal}
  primaryButtonText={backordered ? `Add to cart (ships in ${backordered})` : "Add to cart"}
  showPrimaryButton={Boolean(selectedHarness)}
>
  {#if !selectedHarness}
    <p class="disclaimer">You need to select a harness first.</p>
  {:else}
    {#if additionalProductIds.length === 0}
      <p class="disclaimer">
        A car harness is required to connect the comma four to your vehicle.
        You currently have no car harness selected.
      </p>
    {/if}
    <p class="disclaimer">
      The comma four does not ship with any software.
      Once you have the device you will be able to install any software you choose at your own risk.
    </p>
    <p class="disclaimer">
      Regardless of what software you choose to install, this device in no way substitutes for a licensed, sober, and attentive driver in the drivers seat.
      <b>If you are not going to always pay careful attention while driving, do not buy this product.</b>
    </p>
  {/if}
</Modal>

<style>
  .item {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .referral-prices {
    position: relative;
    display: inline-block;
    padding: 0.2em 0;
    line-height: 1;
  }

  .original-price {
    position: absolute;
    top: 0.4em;
    right: 100%;
    margin-right: 0.25em;
    font-size: 0.5em;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.5);
  }

  .remove-referral {
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:disabled {
      cursor: wait;
      opacity: 0.5;
    }
  }

  .undo-referral {
    width: auto;
    padding: 0.25rem 0.5rem;
    color: black;
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.1;
    text-transform: uppercase;
  }

  .label {
    display: flex;
    align-items: center;
    color: black;

    & div {
      height: 24px;
      width: 2.5rem;
    }

    & span {
      vertical-align: middle;
      margin-right: 1rem;
      color: black;
    }
  }

  .details {
    max-width: 80%;
    margin-left: 2.5rem;
    margin-top: 0.875rem;
  }

  .disclaimer {
    margin: 0;
  }

  hr {
    margin: 1.25rem 0 1.5rem;
  }

  .sale-price {
    font-weight: 700;
    color: var(--color-sale-red);

    & span {
      color: var(--color-sale-red);
    }
  }

  .payment-options {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 0.75rem;
    min-width: 0;
    margin: 0.5rem 0 0;
  }

  .option-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  .option-label {
    align-self: flex-start;
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    line-height: 1.1;
    text-transform: uppercase;
    color: black;
  }

  .option {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 0;
    padding: 1rem;
    text-align: center;
    color: black;
    border: 1px solid #616161;

    @media only screen and (max-width: 768px) {
      & {
        padding: 1rem 0.5rem;
      }
    }
  }

  .finance-price {
    font-size: 1.5rem;

    @media only screen and (max-width: 768px) {
      & {
        font-size: 1.125rem;
        --installments-rest-font-size: 0.75rem;
        --installments-rest-white-space: nowrap;
      }
    }
  }

  .pay-now-price {
    font-size: 2.5rem;
    line-height: 1.4;

    &:has(.referral-prices) {
      font-size: 2rem;
    }

    @media only screen and (max-width: 768px) {
      & {
        font-size: 2rem;
      }

      &:has(.referral-prices) {
        font-size: 1.5rem;
      }
    }
  }

  .trade-in-note {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);

    &.invisible {
      visibility: hidden;
    }
  }
</style>
