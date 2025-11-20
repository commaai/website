<script>
  export let image;
  export let title;
</script>

<div class="car-note">
  <div class="header-row">
    {#if image}
      <img src={image} alt={title} class="image" />
    {/if}
    <h3 class="title">{title}</h3>
  </div>
  <div class="body">
    <slot></slot>
  </div>
</div>

<style>
  .car-note {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }

  .header-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;

    & img {
      width: 24px;
      height: 24px;
      object-fit: contain;
      flex-shrink: 0;
      line-height: 1;
    }
  }

  .title {
    font-family: Inter, sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.08em;
    margin: 0;
    line-height: 1.2;
  }

  .body {
    font-family: Inter, sans-serif;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.08em;
    line-height: 1;
    width: 100%;

    & a {
      color: black;
      text-decoration: underline;

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>

