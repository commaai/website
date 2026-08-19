<script>
  import Grid from "$lib/components/Grid.svelte";
  import Button from "$lib/components/Button.svelte";
  import Select from "$lib/components/Select.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import ShippingIcon from "$lib/icons/features/shipping.svg?raw";

  import { DEFAULT_BACKORDER_ESTIMATE } from "$lib/constants/shipping.js";
  import { formatCurrency } from "$lib/utils/currency";
  import { addToCart } from "../../store.js";

  export let product;
  export let additionalProductIds = [];
  export let autoSelectFirstVariant = true;
  export let beforeAddToCart = null;
  export let getCartNote = null;
  export let backordered = null;
  export let backorderedPrefix = "ships in ";
  // TODO: remove when all stock in Shopify is updated
  export let useVariantBackorderStatus = false;
  export let forceOutOfStock = false;
  export let disableBuyButtonText = null;
  export let hideOutOfStockVariants = false;
  export let hideVariantImage = false;
  export let scrollProductImages = false;
  export let inlineMobileTitlePrice = false;
  export let previousPrice = null;
  export let priceOverride = null;
  export let sale = false;
  export let showVariantCards = false;
  export let getVariantDescription = null;

  export let VariantSelector = null;
  function handleVariantSelection(variant) {
    selectedVariantId = variant?.id || null;
    backordered = variant?.currentlyNotInStock ? (variant.backordered || DEFAULT_BACKORDER_ESTIMATE) : null;
  }

  let currentImageIndex = 0;
  let previousSelectedVariantId = null;

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

  $: selectedVariantBackordered = useVariantBackorderStatus && selectedVariant?.currentlyNotInStock
    ? (selectedVariant.backordered || DEFAULT_BACKORDER_ESTIMATE)
    : null;
  $: effectiveBackordered = backordered || (!forceOutOfStock && selectedVariantBackordered);

  $: if (selectedVariantId !== previousSelectedVariantId) {
    previousSelectedVariantId = selectedVariantId;
    currentImageIndex = 0;
  }

  $: displayImages = selectedVariant?.images?.length
    ? selectedVariant.images
    : product?.images || [];

  $: highlightedImageSrc = displayImages[currentImageIndex] || displayImages[0];
  $: priceLabel = getPriceLabel(selectedVariant);

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
    } else if (selectedVariant) {
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
      if (effectiveBackordered) {
        addToCartLabel += ` (${backorderedPrefix}${effectiveBackordered})`;
      }
    } else if (effectiveBackordered) {
      addToCartLabel = `Add to cart (${backorderedPrefix}${effectiveBackordered})`;
    } else {
      addToCartLabel = "Add to cart";
    }
  }
</script>

{#if product}
  <Grid columns={2} rowGap="0" columnGap="6rem" templateColumns="1.25fr 0.75fr" lgTemplateColumns="1fr 1fr" lgColumnGap="2rem">
    <div class="product-gallery">
      <div class="preview">
        <img src={highlightedImageSrc} alt="{product.title} product preview" />
      </div>
      {#if displayImages.length > 1}
        <div class="product-images" class:scrolling={scrollProductImages}>
          {#each displayImages as image, i}
            <button
              on:click={() => {
                currentImageIndex = i;
              }}
              class="variant"
              aria-pressed={currentImageIndex === i}
              aria-label={`View ${product.title} image ${i + 1}`}
            >
              <img src={image} alt="" />
            </button>
          {/each}
        </div>
      {/if}
    </div>
    <div>
      <div>
        <div class="variant-selector">
          <div class="title-price" class:inline-mobile={inlineMobileTitlePrice}>
            <h1>{product?.title}</h1>
            {#if !showVariantCards}
              <div class="price">
                {#if previousPrice}
                  <div class="strikethrough-price">${previousPrice}</div>
                {/if}
                <slot name="price">
                  <div class:sale-price={sale}>{priceLabel}</div>
                </slot>
              </div>
            {/if}
          </div>
          <slot name="price-accessory"></slot>
          {#if VariantSelector}
            <svelte:component this={VariantSelector} onChange={handleVariantSelection} />
          {:else}
            {#if variants.length > 1}
              {#if showVariantCards}
                <div class="variant-cards" role="radiogroup" aria-label={`${product.title} options`}>
                  {#each variants as option}
                    <label class="variant-card" class:selected={selectedVariantId === option.id}>
                      <input type="radio" bind:group={selectedVariantId} value={option.id} />
                      <img src={option.images?.[0] || option.image?.url} alt="" />
                      <span class="variant-card-copy">
                        <strong>{option.title}</strong>
                        {#if getVariantDescription}
                          <span>{getVariantDescription(option)}</span>
                        {/if}
                        <span class:out-of-stock={!option.availableForSale} class:backordered={option.availableForSale && option.currentlyNotInStock} class="stock-status">
                          {#if !option.availableForSale}
                            Out of stock
                          {:else if option.currentlyNotInStock}
                            Ships in {option.backordered || DEFAULT_BACKORDER_ESTIMATE}
                          {:else}
                            In stock
                          {/if}
                        </span>
                      </span>
                      <strong class="variant-card-price">{formatCurrency(option.price, 0)}</strong>
                    </label>
                  {/each}
                </div>
              {:else}
                {#if !hideVariantImage}
                  <img src={selectedVariant.image.url} alt="" />
                {/if}
                <Select bind:value={selectedVariantId}>
                  {#each variants as option}
                    <option value={option.id}>
                      {option.title}
                    </option>
                  {/each}
                </Select>
              {/if}
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

  .product-gallery {
    min-width: 0;
    max-width: 100%;
  }

  .product-images {
    display: flex;
    flex-wrap: wrap;
  }

  .product-images.scrolling {
    @media only screen and (max-width: 768px) {
      & {
        width: 100%;
        max-width: 100%;
        flex-wrap: nowrap;
        gap: 0.5rem;
        overflow-x: auto;
        overflow-y: hidden;
        overscroll-behavior-x: contain;
        scrollbar-width: thin;
        -webkit-overflow-scrolling: touch;
      }

      & .variant {
        flex: 0 0 120px;
        max-width: none;
      }
    }
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

    & .strikethrough-price {
      text-decoration: line-through;
    }

    & .sale-price {
      font-weight: 700;
      color: var(--color-red);
    }

    & img {
      width: 120px;
      height: 120px;
      object-fit: scale-down;
    }
  }

  .variant-cards {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }

  .variant-card {
    position: relative;
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.75rem;
    min-height: 88px;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-black);
    background-color: var(--color-card-background);
    cursor: pointer;
    transition: background-color 0.2s;
  }

  @media (hover: hover) and (pointer: fine) {
    .variant-card:hover {
      background-color: var(--color-card-background-hover);
    }
  }

  .variant-card.selected {
    padding: calc(0.5rem - 2px) calc(0.75rem - 2px);
    border-width: 3px;
  }

  .variant-card:has(input:focus-visible) {
    outline: 2px solid var(--color-black);
    outline-offset: 2px;
  }

  .variant-card input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .variant-selector .variant-card img {
    width: 72px;
    height: 72px;
    mix-blend-mode: multiply;
  }

  .variant-card-copy {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    color: var(--color-foreground);
  }

  .variant-card-copy > span:not(.stock-status) {
    color: var(--color-muted);
    font-size: 0.875rem;
  }

  .stock-status {
    color: #24820f;
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: normal;
    text-transform: uppercase;
  }

  .stock-status.out-of-stock {
    color: var(--color-red);
  }

  .stock-status.backordered {
    color: #9a6700;
  }

  .variant-card-price {
    align-self: start;
    font-family: JetBrains Mono, monospace;
    font-weight: 400;
    white-space: nowrap;
  }

  @media only screen and (max-width: 768px) {
    .variant-card {
      grid-template-columns: 56px minmax(0, 1fr) auto;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    .variant-card.selected {
      padding: calc(0.5rem - 2px);
    }

    .variant-selector .variant-card img {
      width: 56px;
      height: 56px;
    }

    .title-price.inline-mobile {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: 0.5rem 1rem;
    }

    .title-price.inline-mobile h1 {
      margin-right: auto;
    }

    .title-price.inline-mobile .price {
      text-align: right;
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
