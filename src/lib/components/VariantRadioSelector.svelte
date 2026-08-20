<script>
  import Grid from "$lib/components/Grid.svelte";
  import { formatCurrency } from "$lib/utils/currency";

  export let variants = [];
  export let value = null;
  export let label = "Choose a product variant";
</script>

<fieldset>
  <legend>{label}</legend>
  <Grid
    columns={Math.min(variants.length, 2)}
    alignItems="stretch"
    size="small"
    wrapMode="single"
    columnGap="0.75rem"
    rowGap="0.75rem"
  >
    {#each variants as variant}
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
        </span>
      </label>
    {/each}
  </Grid>
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
</style>
