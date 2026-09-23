<script>
  import CommaFourImage from '$lib/images/products/comma-four/four_front.png?w=900';
  import ChestnutImage from '$lib/images/products/chestnut/bnut_34.png?w=900';
  import CarHarnessImage from '$lib/images/products/car-harness/car-harness.jpg?w=900';
</script>

<section class="support-products" aria-labelledby="support-products-title">
  <h2 id="support-products-title">products</h2>
  <div class="product-grid">
    <a class="product-card" href="/support/troubleshooting/hardware">
      <div class="product-image"><img class="comma-four-image" src={CommaFourImage} alt="comma four" loading="lazy" /></div>
      <h3>comma four</h3>
    </a>

    <a class="product-card" href="/shop/chestnut">
      <div class="product-image"><img class="chestnut-image" src={ChestnutImage} alt="chestnut GPU interface" loading="lazy" /></div>
      <h3>chestnut</h3>
    </a>

    <a class="product-card" href="/support/get-started/installation">
      <div class="product-image"><img class="harness-image" src={CarHarnessImage} alt="car harness" loading="lazy" /></div>
      <h3>car harness</h3>
    </a>
  </div>
</section>

<style>
  .support-products { margin-bottom: 72px; }
  .support-products h2 { margin: 0 0 24px; font-family: Inter, sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 400; line-height: 1; letter-spacing: -.04em; }
  .product-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(32px, 6vw, 80px); align-items: end; }
  .product-card { min-width: 0; color: var(--support-text); text-align: center; text-decoration: none; }
  .product-card:hover h3 { text-decoration: underline; text-decoration-color: var(--support-accent); text-decoration-thickness: 2px; text-underline-offset: 5px; }
  .product-image { height: 210px; display: flex; align-items: center; justify-content: center; }
  .product-image img { display: block; width: auto; max-width: 100%; height: 180px; object-fit: contain; }
  .harness-image { mix-blend-mode: multiply; }
  .product-card h3 { margin: 20px 0 0; font-size: 18px; line-height: 1.25; letter-spacing: -.02em; font-weight: 500; }

  @media (max-width: 760px) {
    .support-products { margin-bottom: 48px; }
    .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
    .product-image { height: 120px; }
    .product-image img { max-width: 100%; height: 100px; }
    .product-card h3 { margin-top: 12px; font-size: 14px; }
  }
</style>
