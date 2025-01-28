<script>
  import Button from "./Button.svelte";
  import { clickOutside } from '$lib/utils/clickOutside';

  export let show = false;
  export let title = "";
  export let primaryButtonText = "Add to cart";

  export let onPrimaryClick = () => {};
  export let onClose = () => {};
</script>

{#if show}
  <div class="backdrop">
    <div class="modal-container">
      <div tabindex="-1" class="modal" use:clickOutside on:clickOutside={onClose}>
        <span>{title}</span>
        <slot />
        <Button on:click={onPrimaryClick} style="accent" fullWidth>{primaryButtonText}</Button>
        <Button on:click={onClose} style="primary" fullWidth>Go back</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    display: block;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.4);
    animation: 0.5s ease-in-out fade-in
  }

  .modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .modal {
    z-index: 1000;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    padding: 48px;
    max-width: 600px;
    max-height: 100%;
    overflow: auto;
    border-radius: 8px;

    text-align: center;
    background-color: rgb(255, 255, 255);
  }

  @media screen and (max-width: 768px) {
    .modal {
      margin: 1.25rem;
      padding: 1rem;
    }
  }

  span {
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>
