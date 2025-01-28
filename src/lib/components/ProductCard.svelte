<script>
  export let product;
</script>

<a class="product-card" href={product.route}>
  <img src={product.images[0]} loading="lazy" alt="{product.title} product" />
  <div>
    <hgroup>
      <h2>{product.title}</h2>
      <span>{product.price ?? 0}</span>
    </hgroup>
    <span>Buy</span>
  </div>
</a>

<style>
  .product-card {
    border: 1px solid #000;
    background-color: var(--color-card-background);
    padding-top: 1rem;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-card-background-hover);
        transform: scale(1.02);
      }
    }
    &:active {
      background-color: var(--color-card-background-hover);
      transform: scale(1.02);
    }

    & img {
      display: inline-block;
      mix-blend-mode: multiply;
    }

    & div {
      display: flex;
      gap: 1rem;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.25rem;

      & hgroup {
        & h2 {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 0.375rem;
          overflow: hidden;
          text-wrap: balance;
          text-overflow: ellipsis;
        }
      }

      & > span {
        color: #fff;
        background-color: #000;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
      }
    }
  }

  @media screen and (max-width: 1500px) {
    .product-card div {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media screen and (max-width: 768px) {
    .product-card div {
      flex-direction: row;
    }
  }
</style>
