<script>
  import Grid from "$lib/components/Grid.svelte";
  import { DEFAULT_BACKORDER_ESTIMATE } from "$lib/constants/shipping.js";
  import { formatCurrency } from "$lib/utils/currency";

  export let variants = [];
  export let value = null;
  export let label = "Choose a product variant";
  export let size = "big";

  let showAll = false;
  $: maxColumns = size === "small" ? 3 : 2;
  $: visibleLimit = maxColumns * 2;
  $: visibleVariants = showAll ? variants : variants.slice(0, visibleLimit);
  $: columns = Math.min(variants.length, maxColumns);

  function getStockStatus(variant) {
    if (!variant.availableForSale) {
      return { label: "Out of stock", style: "out-of-stock" };
    }
    if (variant.currentlyNotInStock) {
      return {
        label: `Ships in ${variant.backordered || DEFAULT_BACKORDER_ESTIMATE}`,
        style: "backordered"
      };
    }
    return { label: "In stock", style: "in-stock" };
  }
</script>

<fieldset class:small={size === "small"}>
  <legend>{label}</legend>
  <div id="variant-options">
    <Grid
      {columns}
      alignItems="stretch"
      size="small"
      wrapMode={size === "small" ? "double" : "single"}
      columnGap="0.75rem"
      rowGap="0.75rem"
    >
      {#each visibleVariants as variant}
        {@const stockStatus = getStockStatus(variant)}
        <label class:selected={value === variant.id}>
          <input
            type="radio"
            name="product-variant"
            value={variant.id}
            bind:group={value}
          />
          <span class="option-content">
            <span class="option-heading">
              <strong>{variant.title.trim()}</strong>
              <span class="option-price">{formatCurrency(variant.price, 0)}</span>
            </span>
            {#if variant.subtitle}
              <span class="option-subtitle">{variant.subtitle}</span>
            {/if}
            <span class="option-status {stockStatus.style}">{stockStatus.label}</span>
          </span>
        </label>
      {/each}
    </Grid>
  </div>

  {#if !showAll && variants.length > visibleLimit}
    <button
      type="button"
      class="show-more"
      aria-expanded="false"
      aria-controls="variant-options"
      on:click={() => showAll = true}
    >
      Show {variants.length - visibleLimit} more
    </button>
  {/if}
</fieldset>

<style>
  fieldset {
    min-width: 0;
    margin: 1.25rem 0 0;
    padding: 0;
    border: 0;
  }

  legend {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  label {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 5rem;
    padding: 1rem;
    cursor: pointer;
    background-color: #eee;
    transition: border-color 0.2s, background-color 0.2s;
  }

  label:hover,
  label:focus-within {
    border-color: #000;
  }

  label.selected {
    /*background-color: var(--color-card-background);*/
    border-color: #000;
    box-shadow: inset 0 0 0 2px #000;
  }

  .show-more {
    box-sizing: border-box;
    width: 100%;
    margin-top: 0.75rem;
    padding: 1rem;
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #000;
  }

  .show-more:hover,
  .show-more:focus-visible {
    background-color: #eee;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .option-content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
  }

  .option-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
  }

  strong,
  .option-price {
    min-width: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
  }

  strong {
    text-wrap: balance;
  }

  .option-price {
    flex: 0 0 auto;
    font-weight: 400;
  }

  .option-subtitle {
    display: block;
    margin-top: auto;
    padding-top: 0.5rem;
    color: var(--color-muted);
    font-size: 0.875rem;
    line-height: 1.35;
  }

  .option-status {
    display: block;
    padding-top: 0.5rem;
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .option-heading + .option-status {
    margin-top: auto;
  }

  .option-status.in-stock {
    color: #198038;
  }

  .option-status.backordered {
    color: #9a6700;
  }

  .option-status.out-of-stock {
    color: #b42318;
  }

  fieldset.small label {
    min-height: 5rem;
    padding: 0.75rem;
  }

  fieldset.small .option-heading {
    flex-direction: column;
    gap: 0.25rem;
  }

  fieldset.small .option-status {
    overflow-wrap: anywhere;
  }
</style>
