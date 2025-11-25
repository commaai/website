<script>
  import Grid from "$lib/components/Grid.svelte";
  import Button from "$lib/components/Button.svelte";
  import Select from "$lib/components/Select.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import ShippingIcon from "$lib/icons/features/shipping.svg?raw";

  import { formatCurrency } from "$lib/utils/currency";
  import { addToCart } from "../../store.js";

  export let product;
  export let additionalProductIds = [];
  export let autoSelectFirstVariant = true;
  export let beforeAddToCart = null;
  export let getCartNote = null;
  export let backordered = null;
  export let forceOutOfStock = false;
  export let disableBuyButtonText = null;
  export let hideOutOfStockVariants = false;
  export let priceOverride = null;
  export let showDiscount = false;
  export let discountAmount = 0;
  export let tradeInCredit = 0;
  export let tradeInSelected = false;

  export let VariantSelector = null;
  function handleVariantSelection(variant) {
    selectedVariantId = variant?.id || null;
    backordered = variant?.currentlyNotInStock ? 'backordered' : null;
  }

  let currentImageIndex = 0;

  $: variants = hideOutOfStockVariants
    ? product?.variants?.nodes.filter(v => v.availableForSale) || []
    : product?.variants?.nodes || [];

  let selectedVariantId = null;
  $: if (autoSelectFirstVariant && variants.length > 0 && !selectedVariantId) {
    selectedVariantId = variants[0].id;
  }

  $: selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  $: highlightedImageSrc = product?.images[currentImageIndex];
  $: priceLabel = getPriceLabel(selectedVariant);
  $: originalPrice = priceOverride || (selectedVariant?.price?.amount || product?.priceRange?.minVariantPrice?.amount || 0);
  $: priceDueToday = showDiscount ? originalPrice - discountAmount : originalPrice;
  $: priceAfterTradeIn = tradeInSelected ? priceDueToday - tradeInCredit : priceDueToday;

  async function addItem() {
    let note = "";
    if (typeof getCartNote === 'function') {
      note = getCartNote();
    }

    const itemId = selectedVariant.id;
    if (typeof beforeAddToCart === 'function') {
      beforeAddToCart(() => addToCart(itemId, additionalProductIds, note));
    } else {
      addToCart(itemId, additionalProductIds, note);
    }
  }

  function getPriceLabel(_) {
    if (priceOverride !== null) {
      return formatCurrency({ amount: priceOverride, currencyCode: 'USD' }, 0);
    }
    if (selectedVariant) {
      return formatCurrency(selectedVariant.price, 0);
    } else if (product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount) {
      return `from ${formatCurrency(product.priceRange.minVariantPrice, 0)}`;
    } else {
      return formatCurrency(product.priceRange.minVariantPrice, 0);
    }
  }

  let addToCartLabel;
  $: {
    if (disableBuyButtonText) {
      addToCartLabel = disableBuyButtonText;
    } else if (forceOutOfStock || (selectedVariant && !selectedVariant.availableForSale)) {
      addToCartLabel = "Out of stock";
      if (backordered) {
        addToCartLabel += ` (${backordered})`;
      }
    } else if (backordered) {
      addToCartLabel = `Add to cart (${backordered})`;
    } else {
      addToCartLabel = "Add to cart";
    }
  }
</script>

{#if product}
  <Grid columns={2} rowGap="0" columnGap="6rem" templateColumns="1.25fr 0.75fr" lgTemplateColumns="1fr 1fr" lgColumnGap="2rem">
    <div>
      <div class="preview">
        <img src={highlightedImageSrc} alt="product preview" />
      </div>
      {#if product?.images?.length > 1}
        <div class="product-images">
          {#each product?.images as image, i}
            <button
              on:click={() => {
                currentImageIndex = i;
              }}
              class="variant"
              role="tab"
              aria-selected={currentImageIndex === i}
              aria-label={`View product variant ${i}`}
            >
              <img src={image} alt="product preview {i + 1}" />
            </button>
          {/each}
        </div>
      {/if}
    </div>
    <div>
      <div>
        <div class="variant-selector">
          <h1>{product?.title}</h1>
          <div class="price">
            {#if tradeInSelected && tradeInCredit > 0}
              <span class="price-after-tradein">{formatCurrency({ amount: priceAfterTradeIn, currencyCode: 'USD' }, 0)} after trade-in received</span>
              <span class="price-due-today">({formatCurrency({ amount: priceDueToday, currencyCode: 'USD' }, 0)} due today)</span>
            {:else if showDiscount && discountAmount > 0}
              {formatCurrency({ amount: priceDueToday, currencyCode: 'USD' }, 0)}
            {:else}
              {priceLabel}
            {/if}
          </div>
          <slot name="price-accessory"></slot>
          {#if VariantSelector}
            <svelte:component this={VariantSelector} onChange={handleVariantSelection} />
          {:else}
            {#if variants.length > 1}
              <img src={selectedVariant.image.url} alt="" />
              <Select bind:value={selectedVariantId}>
                {#each variants as option}
                  <option value={option.id}>
                    {option.title}
                  </option>
                {/each}
              </Select>
            {/if}
          {/if}
        </div>
        <Button
          style="accent"
          fullWidth={true}
          on:click={addItem}
          disabled={forceOutOfStock || !selectedVariant || selectedVariant?.availableForSale === false || disableBuyButtonText !== null}
        >
          {addToCartLabel}
        </Button>
        <slot name="shipping">
          <NoteCard title="Shipping" icon={ShippingIcon}>
          {#if product?.freeRush}
            Free Rush (UPS 2nd Day Air) shipping. $30 flat rate internationally.
          {:else}
            Free US shipping, $30 flat rate internationally.
          {/if}
          </NoteCard>
        </slot>
        <slot name="notes"></slot>
        <hr />
        <div class="description">
          <slot name="description"></slot>
        </div>
      </div>
    </div>
  </Grid>
{/if}

<style>
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
  }

  .preview {
    & img {
      display: block;
      margin: 0 auto;
    }
  }

  .product-images {
    display: flex;
    flex-wrap: wrap;
  }

  .variant {
    width: 120px;
    max-width: 25%;
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin-top: 1rem;

    & img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }

  .variant-selector {
    margin: 1rem 0;

    & h1 {
      margin-bottom: 1rem;
    }

    & .price {
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    & .price-after-tradein {
      font-size: 1.5rem;
      font-weight: 400;
    }

    & .price-due-today {
      font-size: 1rem;
      color: rgb(81, 81, 81);
    }

    & img {
      width: 120px;
      height: 120px;
      object-fit: scale-down;
    }
  }

  .description {
    & strong {
      font-size: 1.25rem;
    }

    & hr {
      margin: 2rem 0;
    }

    & hgroup {
      display: flex;
      align-items: center;

      & img {
        border: 1px solid rgba(0, 0, 0, 0.12);
        margin-right: 1rem;
        max-width: 150px;
      }

      & div {
        display: flex;
        flex-direction: column;

        & span {
          font-size: 0.875rem;
          text-transform: uppercase;
          font-family: JetBrains Mono, monospace;
        }

        & strong {
          font-size: 1.25rem;
          font-weight: 600;
        }
      }
    }

    & li {
      font-size: 1rem;
    }

    & a {
      color: #000;
      border-bottom: 2px solid #86ff4e;
      background-color: rgba(134, 255, 78, 0.15);
    }

    & .video-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      height: 0;

      & iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  hr {
    margin: 2rem 0;
  }
</style>
