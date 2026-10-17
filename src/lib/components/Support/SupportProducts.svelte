<script>
  import { onMount } from 'svelte';
  import { replaceState } from '$app/navigation';
  import { productImages } from './content';
  import CommaIcon from '$lib/icons/comma.svg?raw';

  let showAllProducts = false;

  onMount(() => {
    showAllProducts = location.search === '?all';
  });

  function toggleAllProducts() {
    showAllProducts = !showAllProducts;
    replaceState(showAllProducts ? '?all' : location.pathname, {});
  }

  const moreProducts = [
    { slug: 'comma-power', name: 'comma power' },
    { slug: 'comma-3x', name: 'comma threeX' },
    { slug: 'comma-three', name: 'comma three' },
    { slug: 'comma-two', name: 'comma 2' },
    { slug: 'comma-body', name: 'comma body' },
    { slug: 'comma-panda', name: 'comma panda' },
    { slug: 'comma-jungle', name: 'comma jungle' }
  ];
</script>

<section aria-label="Product support">
  <div class="product-grid">
    <a class="product-card" href="/support/products/comma-four">
      <div class="product-image"><img class="comma-four-image" src={productImages['comma-four']} alt="comma four" loading="lazy" /></div>
      <h3>comma four</h3>
    </a>

    <a class="product-card" href="/support/products/chestnut">
      <div class="product-image"><div class="chestnut-crop"><img class="chestnut-image" src={productImages.chestnut} alt="chestnut GPU interface" loading="lazy" /></div></div>
      <h3>chestnut</h3>
    </a>

    <a class="product-card" href="/support/products/car-harness">
      <div class="product-image"><img class="harness-image" src={productImages['car-harness']} alt="car harness" loading="lazy" /></div>
      <h3>car harness</h3>
    </a>

    <a class="product-card" href="/support/products/comma-prime">
      <div class="product-image"><span class="connect-icon" aria-hidden="true">{@html CommaIcon}</span></div>
      <h3>comma prime</h3>
    </a>
  </div>
  {#if showAllProducts}
    <div class="product-grid more-products" id="more-support-products">
      {#each moreProducts as product}
        <a class="product-card" href="/support/products/{product.slug}">
          <div class="product-image"><img src={productImages[product.slug]} alt={product.name} loading="lazy" /></div>
          <h3>{product.name}</h3>
        </a>
      {/each}
    </div>
  {/if}
  <button class="all-products" type="button" aria-expanded={showAllProducts} on:click={toggleAllProducts}>
    {showAllProducts ? 'show fewer products' : 'show all products'}
  </button>
</section>

<style>
  .product-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(40px, 5vw, 72px); align-items: end; }
  .product-card { min-width: 0; padding: 20px 12px; color: var(--support-text); text-align: center; text-decoration: none; }
  .product-card:hover h3 { text-decoration: underline; text-decoration-color: var(--support-accent); text-decoration-thickness: 2px; text-underline-offset: 5px; }
  .product-image { height: 170px; display: flex; align-items: center; justify-content: center; }
  .product-image img { display: block; width: auto; max-width: 100%; height: 145px; object-fit: contain; }
  .chestnut-crop { width: min(100%, 210px); height: 145px; overflow: hidden; }
  .chestnut-crop .chestnut-image { width: 100%; max-width: none; height: 100%; object-fit: cover; }
  .connect-icon { box-sizing: border-box; display: flex; align-items: center; justify-content: center; width: 145px; height: 145px; border-radius: 24%; background: #171717; color: #fff; }
  .connect-icon :global(svg) { width: 41px; height: 72px; }
  .harness-image { mix-blend-mode: multiply; }
  .product-card h3 { margin: 20px 0 0; font-size: 18px; line-height: 1.25; letter-spacing: -.02em; font-weight: 500; }
  .more-products { margin-top: clamp(40px, 5vw, 72px); }
  .all-products { display: block; width: fit-content; margin: 32px auto 0; padding: 0; border: 0; background: transparent; color: var(--support-text); font: inherit; font-size: 14px; font-weight: 500; text-decoration: underline; text-decoration-color: #000; text-underline-offset: 4px; cursor: pointer; }
  .all-products:hover, .all-products:focus-visible, .all-products:active { text-decoration-color: var(--support-accent); }
  .all-products:focus-visible { outline: 2px solid var(--support-accent); outline-offset: 3px; }

  @media (max-width: 760px) {
    .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 24px; }
    .product-image { height: 100px; }
    .product-image img { max-width: 100%; height: 85px; }
    .chestnut-crop { width: min(100%, 120px); height: 85px; }
    .connect-icon { width: 85px; height: 85px; }
    .connect-icon :global(svg) { width: 24px; height: 42px; }
    .product-card h3 { margin-top: 12px; font-size: 14px; }
  }
</style>
