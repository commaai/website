<script>
  import { onMount } from 'svelte';
  import { replaceState } from '$app/navigation';
  import { products } from './content';

  const featuredProducts = ['comma-four', 'chestnut', 'car-harness', 'comma-prime'];
  const moreProducts = ['comma-power', 'comma-3x', 'comma-three', 'comma-two', 'comma-body', 'comma-panda', 'comma-jungle'];

  let showAllProducts = false;

  onMount(() => {
    showAllProducts = location.search === '?all';
  });

  function toggleAllProducts() {
    showAllProducts = !showAllProducts;
    replaceState(showAllProducts ? '?all' : location.pathname, {});
  }
</script>

<section aria-label="Product support">
  {#each showAllProducts ? [featuredProducts, moreProducts] : [featuredProducts] as slugs, index}
    <div class="product-grid" class:more-products={index > 0}>
      {#each slugs as slug}
        {@const product = products.get(slug)}
        <a class="product-card" href="/support/products/{slug}">
          <div class="product-image">
            {#if product.icon}
              <span class="product-icon" aria-hidden="true">{@html product.icon}</span>
            {:else}
              <img class={slug} src={product.image} alt={product.imageAlt} loading="lazy" />
            {/if}
          </div>
          <h3>{product.title}</h3>
        </a>
      {/each}
    </div>
  {/each}
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
  .product-image img.chestnut { width: min(100%, 210px); object-fit: cover; }
  .product-icon { box-sizing: border-box; display: flex; align-items: center; justify-content: center; width: 145px; height: 145px; border-radius: 24%; background: #171717; color: #fff; }
  .product-icon :global(svg) { width: 41px; height: 72px; }
  .car-harness { mix-blend-mode: multiply; }
  .product-card h3 { margin: 20px 0 0; font-size: 18px; line-height: 1.25; letter-spacing: -.02em; font-weight: 500; }
  .more-products { margin-top: clamp(40px, 5vw, 72px); }
  .all-products { display: block; width: fit-content; margin: 32px auto 0; padding: 0; border: 0; background: transparent; color: var(--support-text); font: inherit; font-size: 14px; font-weight: 500; text-decoration: underline; text-decoration-color: #000; text-underline-offset: 4px; cursor: pointer; }
  .all-products:hover, .all-products:focus-visible, .all-products:active { text-decoration-color: var(--support-accent); }
  .all-products:focus-visible { outline: 2px solid var(--support-accent); outline-offset: 3px; }

  @media (max-width: 760px) {
    .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 24px; }
    .product-image { height: 100px; }
    .product-image img { max-width: 100%; height: 85px; }
    .product-image img.chestnut { width: min(100%, 120px); }
    .product-icon { width: 85px; height: 85px; }
    .product-icon :global(svg) { width: 24px; height: 42px; }
    .product-card h3 { margin-top: 12px; font-size: 14px; }
  }
</style>
