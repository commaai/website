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
  import { onMount, tick } from 'svelte';
  import { getProduct } from '$lib/utils/shopify';
  import { products as productsData } from '$lib/data/products.js';
  import { DEFAULT_BACKORDER_ESTIMATE } from '$lib/constants/shipping.js';
  import { formatCurrency } from "$lib/utils/currency";
  import { applyReferralDiscount, cartReferralCode, removeReferralDiscount } from '../../../store.js';
  import { createEmailUpdatesForm } from '$lib/email-updates.js';

  export let product;
  let disableBuyButtonText = "SELECT YOUR CAR";

  let harnessSelectorRef;
  let checkboxCardRef;

  const { email: notifyEmail, car: notifyCar, status: notifyStatus, errorMessage: notifyError, submit: notifySubmit } = createEmailUpdatesForm(['compatibility']);
  let notifyOpen = false;

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
  let installmentsTimedOut = false;

  $: referralCode = $cartReferralCode;

  // Trade-in and discount configuration
  $: showDiscount = selectedHarness === NO_HARNESS_OPTION;

  // Price calculations
  $: priceDueToday = showDiscount ? FOUR_PRICE - NO_HARNESS_DISCOUNT : FOUR_PRICE;
  $: showTradeInNote = tradeInChecked && FOUR_TRADE_IN_CREDIT > 0;
  $: priceAfterTradeIn = showTradeInNote ? priceDueToday - FOUR_TRADE_IN_CREDIT : priceDueToday;
  // with a trade-in the sale doesn't lower the price, so there's no "was"
  $: wasPrice = FOUR_STRIKETHROUGH_PRICE && !showTradeInNote ? FOUR_STRIKETHROUGH_PRICE - (showDiscount ? NO_HARNESS_DISCOUNT : 0) : null;
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

  const handleDisabledBuyClick = () => {
    if (!selectedHarness) harnessSelectorRef?.open();
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
      // the selector reports its selection during its own update, so let that settle before checking the box
      harnessSelectorRef?.setSelection(NO_HARNESS_OPTION);
      await tick();
      checkboxCardRef?.setChecked(true);
      tradeInChecked = true;
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
         sale={FOUR_SALE}
         disableBuyButtonText={disableBuyButtonText}
         on:disabledclick={handleDisabledBuyClick}>
  <div slot="shipping"></div>

  <div slot="price"></div>

  <span slot="price-accessory">
    <div class="payment-options">
      <div class="option-wrap">
        <span class="option-label type-label">Buy now</span>
        <span class="option pay-now-price" class:sale-price={FOUR_SALE} class:type-strong={FOUR_SALE}>
          {usd(priceAfterTradeIn)}
          {#if wasPrice}
            <span class="was-price type-small type-regular">was <s>{usd(wasPrice)}</s></span>
          {:else if showTradeInNote}
            <span class="was-price type-small type-regular">after trade-in, {usd(priceDueToday)} due today</span>
          {/if}
        </span>
      </div>
      {#if !installmentsTimedOut}
        <div class="option-wrap">
          <span class="option-label type-label">Finance</span>
          <span class="option finance-price">
            <ShopPayInstallments
              split
              variantId={product.variants.nodes[0]?.id}
              amount={priceDueToday}
              onCheckout={handleInstallmentsCheckout}
              bind:timedOut={installmentsTimedOut}
            />
          </span>
        </div>
      {/if}
    </div>

    <hr />

    <strong>Select a harness to connect the comma four to your car.</strong>
    <HarnessSelector
      bind:this={harnessSelectorRef}
      label="Find your car"
      sublabel="325+ cars · harness included"
      prominent
      onChange={handleHarnessSelection}
      showNoHarnessOption={true}
    >
    </HarnessSelector>
    <div class="missing-car type-small">
      {#if $notifyStatus === 'success'}
        <span>Thanks, we'll email you when it's supported.</span>
      {:else if !notifyOpen}
        <button type="button" on:click={() => (notifyOpen = true)}>Don't see your car? <u>Email me when it's supported</u></button>
      {:else}
        <form on:submit|preventDefault={notifySubmit}>
          <input class="type-body" type="text" placeholder="Your car, e.g. 2021 Mazda 3" bind:value={$notifyCar} data-1p-ignore>
          <div class="row">
            <input class="type-body" type="email" placeholder="Email" required bind:value={$notifyEmail} autocomplete="email">
            <button class="type-label" type="submit" disabled={$notifyStatus === 'submitting'}>Notify me</button>
          </div>
          {#if $notifyError}<span class="error">{$notifyError}</span>{/if}
        </form>
      {/if}
    </div>
    <CheckboxCard bind:this={checkboxCardRef} title={FOUR_SALE ? `$${FOUR_PRICE - FOUR_TRADE_IN_CREDIT} with trade-in` : `$${FOUR_TRADE_IN_CREDIT} credit with trade-in`} checked={tradeInChecked} onToggle={handleTradeInToggle}
                  disabled={disableBuyButtonText !== null || referralCode} strikethroughTitle={Boolean(referralCode)}>
      {#if referralCode}
        Trade in credit is <b>not available</b> when using a referral code.
      {:else if FOUR_SALE}
        Trade in any comma device, in any condition, and pay ${FOUR_PRICE - FOUR_TRADE_IN_CREDIT}. That's the usual ${FOUR_TRADE_IN_CREDIT + FOUR_STRIKETHROUGH_PRICE - FOUR_PRICE} off ${FOUR_STRIKETHROUGH_PRICE}; it doesn't stack with the sale price.
        <a href="/shop/comma-four-trade-in">Instructions and Terms</a>
      {:else}
        Get ${FOUR_TRADE_IN_CREDIT} credit when you trade in your old comma device. Any comma device, in any condition.
        <a href="/shop/comma-four-trade-in">Instructions and Terms</a>
      {/if}
    </CheckboxCard>
    {#if referralCode || removedReferralCode}
      <NoteCard
        title={removedReferralCode ? 'Referral removed' : `Referral: ${referralCode}`}
        icon={GiftIcon}
      >
        <button
          slot="actions"
          class="remove-referral"
          class:undo-referral={removedReferralCode}
          class:type-label={removedReferralCode}
          aria-label={removedReferralCode ? 'Undo referral removal' : 'Remove referral'}
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
      See <a href="/shop/comma-four#fine-print">fine print</a> and <a href="/support/orders-returns" target="_blank">orders and shipping</a> for more details.
    </NoteCard>
  </span>

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
  .missing-car {
    margin-top: 0.5rem;
    color: rgba(0, 0, 0, 0.6);

    & > button {
      padding: 0;
      border: 0;
      background: none;
      color: inherit;
      cursor: pointer;

      & u {
        color: black;
      }
    }

    & form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.15);
      background-color: var(--color-card-background);
    }

    & .row {
      display: flex;
      gap: 0.5rem;
    }

    & input {
      flex: 1;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      padding: 0.625rem 0.75rem;
      border: 1px solid #616161;
      background: white;
    }

    & button[type="submit"] {
      padding: 0 1rem;
      border: 0;
      background: black;
      color: white;
      cursor: pointer;
    }

    & .error {
      color: var(--color-sale-red);
    }
  }

  .item {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
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
    color: var(--color-sale-red);

    & span {
      color: var(--color-sale-red);
    }
  }

  .payment-options {
    display: flex;
    gap: 0.75rem;
    margin: 0.5rem 0 0;
  }

  .option-wrap {
    flex: 1;
    container-type: inline-size;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .option-label {
    color: black;
  }

  .option {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    font-size: min(var(--text-lead), 10.5cqw); /* type deviation: D2, fits the price to the card via container query */
    --installments-rest-font-size: min(var(--text-sm), 6.8cqw); /* type deviation: D2, D3, container-query fit fed through ShopPay's size API */
  }

  .sale-price .was-price {
    margin-top: 0.1em;
    color: rgba(0, 0, 0, 0.5);
  }

  .pay-now-price {
    font-size: min(var(--text-h2), 20.5cqw); /* type deviation: D2, fits the price to the card via container query */
  }
</style>
