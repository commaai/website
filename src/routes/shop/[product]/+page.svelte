<script>
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  export let data;
  $: ({ product, descriptionComponent } = data);
</script>

<svelte:head>
  <title>{product.title} — comma shop</title>
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
