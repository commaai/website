<script>
  import Slideshow from "$lib/components/Slideshow.svelte";

  import CloseIcon from "$lib/icons/ui/close.svg?raw";

  export let images = [];
  export let selectedIndex = 0;

  export let onClose = () => {};

  function keydownOnClose(e) {
    if (e.key === "Escape") {
      onClose();
    }
  }
</script>

<div class="lightbox" role="dialog" aria-modal="true" aria-label="product preview">
  <div class="lightbox-content">
    <Slideshow images={images} selectedIndex={selectedIndex} />
    <div class="images">
      {#each images as image, i}
        <button
          class="variant"
          role="tab"
          aria-selected={false}
          aria-label={`View image ${i}`}
          on:click={() => selectedIndex = i}
        >
          <img src={image} alt="variant" />
        </button>
      {/each}
    </div>
  </div>
  <div class="close" role="button" tabindex="0" on:click={onClose} on:keydown={keydownOnClose}>
    {@html CloseIcon}
  </div>
</div>

<style>
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
    display: flex;
    align-items: center;
  }

  .lightbox-content {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  .close {
    position: absolute;
    top: 3rem;
    right: 5rem;
    cursor: pointer;

    & svg {
      width: 2.5rem !important;
      height: 2.5rem !important;
    }
  }

  .images {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    height: 120px;
    margin-bottom: 3rem;
    margin-right: 0.5rem;
  }

  .variant {
    height: 120px;
    cursor: pointer;
    background-color: transparent;
    border: none;

    & img {
      height: 100%;
      object-fit: contain;
    }
  }

  @media screen and (max-width: 768px) {
    .close {
      top: 1rem;
      right: 1rem;
    }

    .variant {
      height: 100px;
    }
  }

</style>
