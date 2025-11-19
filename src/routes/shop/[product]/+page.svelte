<script>
  export let data;
  $: ({ component, product } = data);
</script>

<svelte:head>
  <title>{product.title} — comma shop</title>
</svelte:head>

<section class="light" id="product-item">
  <div class="container">
    <svelte:component this={component} {product} />
  </div>
</section>
