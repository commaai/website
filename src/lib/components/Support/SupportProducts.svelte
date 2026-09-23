<script>
  import CommaFourImage from '$lib/images/products/comma-four/four_screen_on.png?w=900';
  import ChestnutImage from '$lib/images/products/chestnut/bnut_34.png?w=900';
  import CarHarnessImage from '$lib/images/products/car-harness/car-harness.jpg?w=900';
  import CommaIcon from '$lib/icons/comma.svg?raw';
</script>

<section class="support-products" aria-label="Product support">
  <div class="product-grid">
    <a class="product-card" href="/support/troubleshooting/hardware">
      <div class="product-image"><img class="comma-four-image" src={CommaFourImage} alt="comma four" loading="lazy" /></div>
      <h3>comma four</h3>
    </a>

    <a class="product-card" href="/shop/chestnut">
      <div class="product-image"><img class="chestnut-image" src={ChestnutImage} alt="Chestnut GPU interface" loading="lazy" /></div>
      <h3>Chestnut</h3>
    </a>

    <a class="product-card" href="/support/get-started/installation">
      <div class="product-image"><img class="harness-image" src={CarHarnessImage} alt="Car harness" loading="lazy" /></div>
      <h3>Car harness</h3>
    </a>

    <a class="product-card" href="/support/prime-connect">
      <div class="product-image"><span class="connect-icon" aria-hidden="true">{@html CommaIcon}</span></div>
      <h3>comma prime</h3>
    </a>
  </div>
</section>

<style>
  .support-products { margin-bottom: 32px; }
  .product-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(24px, 4vw, 60px); align-items: end; }
  .product-card { min-width: 0; color: var(--support-text); text-align: center; text-decoration: none; }
  .product-card:hover h3 { text-decoration: underline; text-decoration-color: var(--support-accent); text-decoration-thickness: 2px; text-underline-offset: 5px; }
  .product-image { height: 210px; display: flex; align-items: center; justify-content: center; }
  .product-image img { display: block; width: auto; max-width: 100%; height: 180px; object-fit: contain; }
  .connect-icon { box-sizing: border-box; display: flex; align-items: center; justify-content: center; width: 180px; height: 180px; border-radius: 24%; background: #171717; color: #fff; }
  .connect-icon :global(svg) { width: 51px; height: 89px; }
  .harness-image { mix-blend-mode: multiply; }
  .product-card h3 { margin: 20px 0 0; font-size: 18px; line-height: 1.25; letter-spacing: -.02em; font-weight: 500; }

  @media (max-width: 760px) {
    .support-products { margin-bottom: 24px; }
    .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
    .product-image { height: 120px; }
    .product-image img { max-width: 100%; height: 100px; }
    .connect-icon { width: 100px; height: 100px; }
    .connect-icon :global(svg) { width: 29px; height: 51px; }
    .product-card h3 { margin-top: 12px; font-size: 14px; }
  }
</style>
