<script>
  // [{ image, alt, label }]
  export let items = [];
</script>

<div class="box-contents">
  {#each items as item}
    <div>
      <img src={item.image} loading="lazy" alt={item.alt} />
      <p>{item.label}</p>
    </div>
  {/each}
</div>

<style>
  .box-contents {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem 1rem;
    text-align: center;
  }

  .box-contents > div {
    min-width: 0;
  }

  img {
    width: 100%;
    max-height: 150px;
    object-fit: contain;
  }

  p {
    margin: 0 2rem;
    font-size: 1.25rem;
  }

  @media screen and (max-width: 768px) {
    .box-contents {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem 0.75rem;
    }

    p {
      margin: 0;
      font-size: 1rem;
    }
  }
</style>
