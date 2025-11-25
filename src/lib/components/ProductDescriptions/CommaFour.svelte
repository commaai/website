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

  import { FOUR_PRICE } from '$lib/constants/prices.js';
  import { NO_HARNESS_OPTION } from '$lib/constants/vehicles.js';
</script>

<script>
  import { onMount } from 'svelte';
  import { getProduct } from '$lib/utils/shopify';
  import { products as productsData } from '$lib/data/products.js';
  import { formatCurrency } from "$lib/utils/currency";

  export let product;
  let additionalProductIds = [];
  let disableBuyButtonText = "SELECT YOUR CAR";

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

  // Trade-in and discount configuration
  const discountAmount = 50;
  const tradeInCredit = 250;
  $: showDiscount = selectedHarness === NO_HARNESS_OPTION;

  // Price calculations
  $: priceDueToday = showDiscount ? FOUR_PRICE - discountAmount : FOUR_PRICE;
  $: priceAfterTradeIn = tradeInChecked ? priceDueToday - tradeInCredit : priceDueToday;

  const updateAdditionalProductIds = () => {
    additionalProductIds = [];
    if (selectedHarness && selectedHarness !== NO_HARNESS_OPTION) {
      additionalProductIds.push(selectedHarness.id);
    }
    if (tradeInChecked && tradeInVariantId) {
      additionalProductIds.push(tradeInVariantId);
    }
  }

  const handleHarnessSelection = (value) => {
    selectedHarness = value;
    updateAdditionalProductIds();
    if (value === NO_HARNESS_OPTION) {
      backordered = null;
      disableBuyButtonText = null;
    } else if (value) {
      backordered = value.currentlyNotInStock ? `ships in ${(value.backordered || '1-12 weeks')}` : null;
      disableBuyButtonText = null;
    } else {
      backordered = null;
      disableBuyButtonText = "SELECT YOUR CAR";
    }
    backordered = '1-12 weeks';
  }

  const handleTradeInToggle = () => {
    tradeInChecked = !tradeInChecked;
    updateAdditionalProductIds();
  }

  onMount(async () => {
    // Autofill trade-in checkbox
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('trade-in') === '1') {
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
         disableBuyButtonText={disableBuyButtonText}>
  <div slot="shipping"></div>

  <div slot="price" class="price">
    {#if tradeInChecked && tradeInCredit > 0}
      <span>{formatCurrency({ amount: priceAfterTradeIn, currencyCode: 'USD' }, 0)} after trade-in received</span>
      <span class="price-due-today">({formatCurrency({ amount: priceDueToday, currencyCode: 'USD' }, 0)} due today)</span>
    {:else if showDiscount && discountAmount > 0}
      {formatCurrency({ amount: priceDueToday, currencyCode: 'USD' }, 0)}
    {:else}
      {formatCurrency({ amount: FOUR_PRICE, currencyCode: 'USD' }, 0)}
    {/if}
  </div>

  <span slot="price-accessory">
    <div class="badge">
      <Badge style="dark">Free rush shipping</Badge>
    </div>

    <hr />

    <strong>Select a harness to connect the comma four to your car.</strong>
    <HarnessSelector
      label="Select your car"
      onChange={handleHarnessSelection}
      showNoHarnessOption={true}
    >
    </HarnessSelector>
    <CheckboxCard title="$250 credit with trade-in" checked={tradeInChecked} onToggle={handleTradeInToggle}>
      Get $250 credit when you trade in your old comma device. Any comma device, in any condition.
      <a href="/shop/comma-four-trade-in">Instructions and Terms</a>
    </CheckboxCard>
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
          1-year limited warranty against hardware defects.
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
  {#if backordered}
    <p class="disclaimer warning">
      The comma four is expected to ship out in 1-12 weeks.
      By adding this item to your cart you acknowledge that your order will be delayed.
    </p>
  {/if}
</Modal>

<style>
  .item {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .badge {
    margin: 1rem 0;
  }

  .harness-price {
    display: flex;
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

  .highlight {
    background-color: rgba(134, 255, 78, 0.15);
    border-bottom: 2px solid #86ff4e;
    padding: 0 2px;
  }

  .price-due-today {
    font-size: 1rem;
    color: rgb(81, 81, 81);
  }
</style>
