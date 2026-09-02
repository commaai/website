<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import CheckboxCard from "$lib/components/CheckboxCard.svelte";
  import Accordion from "$lib/components/Accordion.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";
  import Modal from "$lib/components/Modal.svelte";

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
  $: priceAfterTradeIn = tradeInChecked ? priceDueToday - FOUR_TRADE_IN_CREDIT : priceDueToday;
  $: displayedPrice = tradeInChecked ? priceAfterTradeIn : priceDueToday;

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

  <div slot="price" class="price" class:sale-price={FOUR_SALE}>
    {#if referralCode}
      <div class="referral-prices">
        <s class="original-price">{formatCurrency({ amount: displayedPrice, currencyCode: 'USD' }, 0)}</s>
        <span>
          {formatCurrency({ amount: displayedPrice - REFERRAL_DISCOUNT, currencyCode: 'USD' }, 0)}
          {tradeInChecked && FOUR_TRADE_IN_CREDIT > 0 ? ' after trade-in received' : ''}
        </span>
      </div>
    {:else if tradeInChecked && FOUR_TRADE_IN_CREDIT > 0}
      <span>{formatCurrency({ amount: priceAfterTradeIn, currencyCode: 'USD' }, 0)} after trade-in received</span>
    {:else if showDiscount && NO_HARNESS_DISCOUNT > 0}
      {formatCurrency({ amount: priceDueToday, currencyCode: 'USD' }, 0)}
    {:else}
      {formatCurrency({ amount: FOUR_PRICE, currencyCode: 'USD' }, 0)}
    {/if}
  </div>

  <span slot="price-accessory">
    <div class="badges">
      {#if referralCode}
        <Badge style="accent">Referral code added</Badge>
      {/if}
      <Badge style="dark">Free rush shipping</Badge>
      {#if tradeInChecked && FOUR_TRADE_IN_CREDIT > 0}
        <span class="price-due-today">{formatCurrency({ amount: discountedPriceDueToday, currencyCode: 'USD' }, 0)} due today</span>
      {/if}
    </div>

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
          <div>{@html ShippingIcon}</div>
          <span>Free Rush (UPS 2nd Day Air) shipping</span>
        </div>
        <div class="details" slot="content">
          US only. Rush orders are fulfilled on the next business day.
          <br><br>
          International shipping is $30 flat rate.
          See fine print below for details. Common shipping questions are answered on
          <a href="/support#shipping--returns" target="_blank">the FAQ</a>.
        </div>
      </Accordion>
    </div>
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
  onPrimaryClick={onProceed}
  onClose={() => showDisclaimerModal = false}
  bind:show={showDisclaimerModal}
  primaryButtonText={backordered ? `Add to cart (ships in ${backordered})` : "Add to cart"}
>
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
</Modal>

<style>
  .item {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin: 1rem 0;

  }

  .referral-prices {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .original-price {
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

    &.warning {
      color: #c53e3e;
      font-weight: 600;
    }
  }

  hr {
    margin: 2rem 0;
  }

  .price-due-today {
    font-size: 1rem;
    color: rgb(81, 81, 81);
  }

  .sale-price {
    font-weight: 700;
    color: var(--color-red);

    & span {
      color: var(--color-red);
    }
  }
</style>
