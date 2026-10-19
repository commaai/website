<script>
  import { onMount } from 'svelte';
  import { replaceState } from '$app/navigation';
  import { products } from './content';

  const featuredProducts = ['comma-four', 'chestnut', 'car-harness', 'comma-prime'];
  const moreProducts = ['comma-power', 'comma-3x', 'comma-three', 'comma-two', 'comma-body', 'comma-panda'];

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
  <div class="product-grid">
    {#each showAllProducts ? [...featuredProducts, ...moreProducts] : featuredProducts as slug}
      {@const product = products.get(slug)}
      <a class="product-card" href="/support/products/{slug}">
        <div class="product-image">
          <img class={slug} src={product.image} alt={product.imageAlt} loading="lazy" />
        </div>
        <h3>{product.title}</h3>
      </a>
    {/each}
  </div>
  <button class="all-products" type="button" aria-expanded={showAllProducts} on:click={toggleAllProducts}>
    {showAllProducts ? 'show fewer products' : 'show all products'}
  </button>
</section>

<style>
  .product-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(40px, 5vw, 72px); align-items: end; }
  .product-card { padding: 20px 12px; text-align: center; }
  .product-card h3 { margin: 20px 0 0; font-size: 18px; line-height: 1.25; letter-spacing: -.02em; font-weight: 500; }
  .product-card:hover h3 { text-decoration: underline 2px var(--color-accent); text-underline-offset: 5px; }
  .product-image { display: flex; align-items: center; justify-content: center; height: 170px; }
  .product-image img { display: block; height: 145px; object-fit: contain; }
  .product-image img.chestnut { width: min(100%, 210px); object-fit: cover; }
  .product-image img.car-harness { mix-blend-mode: multiply; }
  .all-products { display: block; width: fit-content; margin: 32px auto 0; padding: 0; border: 0; background: none; font: inherit; font-size: 14px; font-weight: 500; text-decoration: underline; text-underline-offset: 4px; cursor: pointer; }
  .all-products:is(:hover, :focus-visible, :active) { text-decoration-color: var(--color-accent); }

  @media (max-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 24px; }
    .product-image { height: 100px; }
    .product-image img { height: 85px; }
    .product-image img.chestnut { width: min(100%, 120px); }
    .product-card h3 { margin-top: 12px; font-size: 14px; }
  }
</style>
