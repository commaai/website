<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let style = "primary";
  export let fullWidth = false;
  export let disabled = false;
</script>

<button
  on:click={!disabled && (event => dispatch('click', event))}
  class:primary={style == "primary"}
  class:secondary={style == "secondary"}
  class:accent={style == "accent"}
  class:full-width={fullWidth}
  class:disabled
>
  <slot></slot>
</button>

<style>
  button {
    background-color: var(--color-accent);
    border: none;
    text-align: left;
    text-transform: lowercase;
    letter-spacing: -0.06em;
    justify-content: left;
    padding: 1rem 1rem 1rem 24px;
    font-size: 24px;
    font-weight: 400;
    display: flex;
    width: fit-content;
    cursor: pointer;
    transition: all 0.2s;

    @media (hover: hover) and (pointer: fine) {
      &.primary:hover:not(.disabled) {
        opacity: 0.75;
      }

      &.secondary:hover:not(.disabled) {
        opacity: 0.8;
      }

      &.accent:hover:not(.disabled) {
        background-color: var(--color-accent-hover);
      }
    }

    &.primary:active:not(.disabled) {
      opacity: 0.75;
    }

    &.secondary:active:not(.disabled) {
      opacity: 0.8;
    }

    &.accent:active:not(.disabled) {
      background-color: var(--color-accent-hover);
    }
  }

  .full-width {
    width: 100%;
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
    color: black;
    opacity: 0.5;
    background-color: #EAEAEA;
  }
</style>
