<script>
  export let stepNumber;
  export let images = [];
  export let header;
  export let body;
</script>

<div class="setup-step">
  <div class="step-title">step {stepNumber}</div>
  <div class="step-content">
    {#if images.length > 0}
      <div class="step-images-grid" class:single-image={images.length === 1}>
        {#if images.length > 0}
          <img src={images[0]} alt={header || `Step ${stepNumber}`} class="step-image step-image-first" />
        {/if}
        {#each images.slice(1) as img}
          <img src={img} alt={header || `Step ${stepNumber}`} class="step-image" />
        {/each}
      </div>
    {/if}
    <div class="step-text">
      {#if header}
        <div class="step-header">{header}</div>
      {/if}
      {#if body}
        <div class="step-body">{@html body}</div>
      {/if}
    </div>
    {#if images.length > 1}
      <div class="step-images-rest">
        {#each images.slice(1) as img}
          <img src={img} alt={header || `Step ${stepNumber}`} class="step-image" />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .setup-step {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2.5rem;
  }

  .step-title {
    font-size: 48px;
    color: #000;
    font-weight: 400;
    margin-bottom: 1rem;
    line-height: 1;
  }

  .step-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
  }

  .step-images-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    width: 50%;
    flex-shrink: 0;
  }

  .step-images-grid.single-image {
    grid-template-columns: repeat(1, 1fr);
  }

  .step-images-rest {
    display: none;
  }

  .step-image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  .step-text {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .step-header {
    font-size: 32px;
    color: #000;
    font-weight: 400;
    margin-bottom: 1rem;
    line-height: 1;
  }

  .step-body {
    font-size: 16px;
    color: #000;
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1024px) {
    .setup-step {
      margin-bottom: 1.5rem;
    }

    .step-content {
      flex-direction: column;
      gap: 0.75rem;
    }

    .step-images-grid {
      display: block;
      width: 100%;
    }

    .step-images-grid .step-image:not(.step-image-first) {
      display: none;
    }

    .step-images-rest {
      display: block;
      width: 100%;
    }

    .step-image {
      margin-bottom: 0.5rem;
    }

    .step-title {
      font-size: 3rem;
    }

    .step-header {
      font-size: 2.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    .step-title {
      font-size: 2.3rem;
    }

    .step-header {
      font-size: 1.75rem;
    }
  }
</style>

