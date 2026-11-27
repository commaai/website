<script>
  import Seo from "$lib/components/Seo.svelte";
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import { page } from "$app/stores";
  import { summarize } from "$lib/seo/text.js";
  import { seoFor } from "$lib/seo/pages.js";
  import { breadcrumbJsonLd, productJsonLd } from "$lib/seo/structured-data.js";

  export let data;
  // set by routes that wrap this page (shop/comma-four, shop/body):
  // { title?, description?, price?, strikethroughPrice? } (prices: what the page shows when it
  // overrides Shopify's), or null on a second copy of this page so the head tags render once
  export let seo = {};
  // heading level of the product title; "h2" on a second copy of this page
  export let titleTag = "h1";
  $: ({ product, descriptionComponent } = data);

  $: path = $page.url.pathname;
  $: description = seo && (seo.description ?? summarize(product.description));
  $: jsonLd = seo && [
    productJsonLd({
      product,
      path,
      description: seoFor(path).description ?? description,
      price: seo.price,
      strikethroughPrice: seo.strikethroughPrice,
    }),
    breadcrumbJsonLd([
      { name: 'comma.ai', path: '/' },
      { name: 'shop', path: '/shop' },
      { name: product.title, path },
    ]),
  ];
</script>

{#if seo}
  <Seo
    title={seo.title ?? `${product.title} — comma shop`}
    {description}
    type="product"
    {jsonLd}
  />
{/if}

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
        useVariantRadioSelector={product.useVariantRadioSelector || false}
        useVariantBackorderStatus={product.useVariantBackorderStatus || false}
        variantSelectorSize={product.variantSelectorSize || "big"}
        {titleTag}
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
