<script>
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  export let data;
  $: ({ product, descriptionComponent, productId } = data);
  $: ogImage = productId ? `https://comma.ai/og-products/${productId}.png` : null;
</script>

<svelte:head>
  <title>{product.title} — comma shop</title>
  {#if ogImage}
    <!-- Open Graph / Facebook -->
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="628" />
    <!-- Twitter -->
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content={product.title} />
  {/if}
</svelte:head>

<section class="light" id="product-item">
  <div class="container">
    {#if descriptionComponent}
      <svelte:component this={descriptionComponent} {product}/>
    {:else}
      <Product
        {product}
        backordered={product.backordered || null}
        forceOutOfStock={product.forceOutOfStock || false}
        hideOutOfStockVariants={product.hideOutOfStockVariants || false}
      >
        <div slot="notes">
          {#each product.notes || [] as note}
            <NoteCard title={note.title}>
              {@html note.content}
            </NoteCard>
          {/each}
        </div>
        <div slot="description">
          {#if product.description}
            {@html product.description}
          {/if}
        </div>
      </Product>
    {/if}
  </div>
</section>
