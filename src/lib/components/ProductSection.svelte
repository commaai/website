<script>
  import Grid from "$lib/components/Grid.svelte";

  // Title in the left column; use the "title" slot for rich titles
  export let title = "";
  export let id = null;
</script>

<!-- The default slot is the right column; pass a single element -->
<div class="product-section" {id}>
  <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
    <h2><slot name="title">{title}</slot></h2>
    <slot></slot>
  </Grid>
</div>

<style>
  /* Consecutive sections are separated by a divider */
  .product-section + :global(.product-section) {
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid #333;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 600;
  }
</style>
