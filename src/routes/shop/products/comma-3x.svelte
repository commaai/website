<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import Accordion from "$lib/components/Accordion.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";
  import Modal from "$lib/components/Modal.svelte";

  import Comma3XImage from "$lib/images/products/comma-3x/comma-3x.jpg";
  import Comma3XBackImage from "$lib/images/products/comma-3x/comma-3x-back.jpg";
  import Comma3XPromoImage from "$lib/images/products/comma-3x/comma-3x-promo.jpg";
  import Comma3XIncludesImage from "$lib/images/products/comma-3x/comma-3x-includes.jpg";

  import ShippingIcon from "$lib/icons/features/shipping.svg?raw";
  import MoneyBackGuaranteeIcon from "$lib/icons/features/money-back-guarantee.svg?raw";
  import WarrantyIcon from "$lib/icons/features/warranty.svg?raw";

  import { THREEX_PRICE, THREEX_AFFIRM_PRICE, THREEX_SALE, THREEX_STRIKETHROUGH_PRICE, CAR_HARNESS_PRICE, CAR_HARNESS_SALE, CAR_HARNESS_STRIKETHROUGH_PRICE } from '$lib/constants/prices.js';

  export const productInfo = {
    title: "comma 3X",
    id: "gid://shopify/Product/7203374006335",
    route: "/shop/comma-3x",
    category: "device",
    price: `$${THREEX_PRICE}`,
    images: [Comma3XImage, Comma3XBackImage, Comma3XPromoImage, Comma3XIncludesImage],
  };
</script>

<script>
  export let product;
  let additionalProductIds = [];

  let showDisclaimerModal = false;
  let onProceed;
  let beforeAddToCart = (addToCart) => {
    onProceed = () => {
      addToCart();
      showDisclaimerModal = false;
    }
    if (additionalProductIds.length === 0 || backordered) {
      showDisclaimerModal = true;
    } else {
      addToCart();
    }
  }

  let getCartNote = () => {
    if (selectedHarness?.car) {
      // TODO: support car harness and harness connector page (latter won't have a car attribute)
      const vehicle_note = `Vehicle: ${selectedHarness.car}`;
      const backordered_note = backordered ? `${backordered} backordered` : 'in stock';
      const mount_note = selectedHarness.angledMount ? '8 degree mount' : 'standard mount';

      return `${vehicle_note} (${backordered_note}, ${mount_note})`;
    }
    return '';
  }

  let selectedHarness = null;

  let backordered = null;
  const handleHarnessSelection = (value) => {
    selectedHarness = value;
    if (value) {
      additionalProductIds = [value?.id]
      backordered = value.currentlyNotInStock ? `ships in ${(value.backordered || '1-4 weeks')}` : null;
    } else {
      additionalProductIds = [];
      backordered = null;
    }
  }
</script>

<Product {product} {additionalProductIds} {backordered} {beforeAddToCart} {getCartNote} previousPrice={THREEX_STRIKETHROUGH_PRICE} sale={THREEX_SALE}>
  <div slot="shipping"></div>

  <span slot="price-accessory">
    <div class="financing">
      or ${THREEX_AFFIRM_PRICE}/mo with Affirm.
      <a
        href="https://www.affirm.com/apps/prequal/?public_api_key=EE7S5PMJUQ8H98C5&amp;device_id=063366d6-31b6-4e41-adcb-79f608745058&amp;referring_url=https%253A%252F%252Fcomma.ai%252Fshop%252Fcomma-three&amp;unit_price={THREEX_PRICE}00&amp;page_type=product&amp;use_promo=true&amp;locale=en_US"
        target="_blank"
        class="highlight"
      >
        Prequalify now
      </a>
    </div>
    <div class="badge">
      <Badge style="dark">Free shipping</Badge>
    </div>
    <span class="muted">
      Payment options through Affirm are subject to an eligibility check and are provided by these
      <a href="http://affirm.com/lenders" target="_blank" class="muted" style="border-bottom: 1px solid #000;">lending partners</a>.
    </span>

    <hr />

    <strong>Select a harness to connect the comma 3X to your car.</strong>
    <HarnessSelector
      label="Add harness for your vehicle"
      onChange={handleHarnessSelection}
    >
      <div slot="accessoryLabel" class="harness-price">
        <div class="strikethrough-price">
          +${CAR_HARNESS_STRIKETHROUGH_PRICE}
        </div>
        <div style="width: 0.75rem;"/>
        <div class:sale-price={CAR_HARNESS_SALE}>
          {CAR_HARNESS_PRICE}
        </div>
      </div>
    </HarnessSelector>
    <NoteCard title="Upgrading from another comma device?">
      You do not need a new car harness.
    </NoteCard>
    <NoteCard title="Shipping">
      Use rush shipping for next business day fulfillment.
      Otherwise, orders ship within 5 business days unless otherwise noted.
    </NoteCard>
  </span>

  <div slot="notes"></div>

  <div slot="description">
    <div class="item">
      <Accordion>
        <div class="label" slot="label">
          <div>{@html ShippingIcon}</div>
          <span>Upgrade to UPS 2-day Air for $25</span>
        </div>
        <div class="details" slot="content">
          US only. Rush orders are fulfilled on the next business day.
          <br><br>
          Free ground shipping on all US orders. International shipping is $30 flat rate.
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
          <a href="https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf">top ADAS system</a>.
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
      A car harness is required to connect the comma 3X to your vehicle.
      You currently have no car harness selected.
    </p>
  {/if}
  {#if backordered}
    <p class="disclaimer warning">
      The car harness you have selected is currently backordered.
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

  .financing {
    text-wrap: pretty;
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
</style>
