<script>
  import ArrowRight from '$lib/icons/arrow-right.svg?raw';

  export let href = undefined;
  export let target = undefined;
  export let id = undefined;
  export let style = "primary"; // or "secondary", "accent"
  export let fullWidth = false;
  export let thin = false;
  export let disabled = false;
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  {target}
  {id}
  class={style}
  class:full-width={fullWidth}
  class:thin
  class:disabled
  disabled={!href && disabled ? true : undefined}
  on:click
>
  <slot></slot>
  {#if href}<span class="arrow" aria-hidden="true">{@html ArrowRight}</span>{/if}
</svelte:element>

<style>
  a, button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: fit-content;
    padding: 1.25rem 3rem;
    border: none;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-align: center;
    text-transform: uppercase;
    text-wrap: balance;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s, opacity 0.2s;

    @media (hover: hover) and (pointer: fine) {
      &:is(.primary, .secondary):hover:not(.disabled) {
        opacity: 0.75;
      }

      &.accent:hover:not(.disabled) {
        background-color: var(--color-accent-hover);
      }
    }

    &:is(.primary, .secondary):active:not(.disabled) {
      opacity: 0.75;
    }

    &.accent:active:not(.disabled) {
      background-color: var(--color-accent-hover);
    }

    @media screen and (max-width: 768px) {
      & {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
  }

  .primary {
    background-color: black;
    color: white;
  }

  .secondary {
    background-color: white;
    color: black;
  }

  .accent {
    background-color: var(--color-accent);
    color: black;
  }

  .disabled {
    cursor: not-allowed;
    color: white;
    background-color: var(--color-muted);
  }

  .full-width {
    width: 100%;
  }

  .thin {
    padding: 0.25rem 1rem;
    font-size: 1rem;
  }

  .arrow {
    display: flex;
    margin-left: 0.75rem;
    color: inherit;
  }

  .arrow :global(svg) {
    width: 24px;
    height: 24px;
  }
</style>
