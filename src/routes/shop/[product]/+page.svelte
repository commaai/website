<script>
  import { onMount } from "svelte";
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import CarHarness from "$lib/components/ProductDescriptions/CarHarness.svelte";
  import CommaFour from "$lib/components/ProductDescriptions/CommaFour.svelte";
  import { getProduct } from "$lib/utils/shopify";
  import { products as productsData } from "$lib/data/products.js";

  const descriptionComponents = {
    "car-harness": CarHarness,
    "comma-four": CommaFour,
  };

  export let data;
  $: ({ product } = data);
  $: descriptionComponent = product.hasCustomComponent ? descriptionComponents[product.slug] : null;

  // Refresh stock/price from Shopify on every page view, like SvelteKit's
  // universal load re-running in the browser (prerendered data goes stale).
  // Same precedence as the load: shopify data, overridden by products.js
  // info, keeping the build-resolved images and slug.
  onMount(async () => {
    try {
      const response = await getProduct(data.product.id);
      const fresh = response.body?.data?.product;
      if (fresh) {
        data = {
          ...data,
          product: {
            ...data.product,
            ...fresh,
            ...productsData[data.product.slug],
            slug: data.product.slug,
            images: data.product.images,
          },
        };
      }
    } catch (e) {
      console.error(e);
    }
  });
</script>

<section class="light" id="product-item">
  <div class="container">
    {#if descriptionComponent}
      <svelte:component this={descriptionComponent} {product}/>
    {:else}
      <Product
        {product}
        backordered={product.backordered || null}
        backorderedPrefix={product.backorderedPrefix ?? "ships in "}
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
