<script>
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";
  import Modal from "$lib/components/Modal.svelte";


  export let product;
  let additionalProductIds = [];

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
      backordered = value.currentlyNotInStock ? `ships in ${(value.backordered || '1-12 weeks')}` : null;
    } else {
      additionalProductIds = [];
      backordered = null;
    }
  }
</script>

<Product {product} {additionalProductIds} {backordered} {beforeAddToCart} {getCartNote}>
  <div slot="shipping"></div>

  <span slot="price-accessory">
    <strong>Select a harness to connect the comma four to your car.</strong>
    <HarnessSelector
      label="Add harness for your vehicle"
      onChange={handleHarnessSelection}
    >
      <div slot="accessoryLabel" class="harness-price">
        <div style="width: 0.75rem;"/>
        <div>
          +$99
        </div>
      </div>
    </HarnessSelector>
    <NoteCard title="Upgrading from another comma device?">
      You do not need a new car harness.
    </NoteCard>
  </span>

  <div slot="notes"></div>

  <div slot="description">
    {#if product.description}
      {@html product.description}
    {/if}
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
      The car harness you have selected is currently backordered.
      By adding this item to your cart you acknowledge that your order will be delayed.
    </p>
  {/if}
</Modal>

<style>
  .harness-price {
    display: flex;
  }

  .strikethrough-price {
    text-decoration: line-through;
  }

  .sale-price {
    font-weight: 700;
    color: var(--color-red);
  }

  .disclaimer {
    margin: 0;

    &.warning {
      color: #c53e3e;
      font-weight: 600;
    }
  }
</style>
