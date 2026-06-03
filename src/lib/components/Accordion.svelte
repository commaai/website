<script>
  import IconChevron from '$lib/icons/icon-chevron.svg?raw';

  export let id = (Math.random() * 10e15).toString(16);
  export let type = "checkbox"; // or "radio"
  export let checked = false;
  export let style = "light"; // or "dark"
  export let foregroundColor = null;
  export let backgroundColor = null;
</script>

<div
  class="tab"
  style="
    --foreground-color: {foregroundColor ?? (style === 'light' ? 'black' : 'white')};
    --background-color: {backgroundColor ?? (style === 'light' ? 'white' : 'black')};
  "
>
  <input {type} name={id} {id} {checked} on:click />
  <label for={id}>
    <slot name="label"></slot>
    <span class="chevron">{@html IconChevron}</span>
  </label>
  <div class="content">
    <slot name="content"></slot>
  </div>
</div>

<style>
  .tab input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  .content {
    display: none;
    overflow: hidden;
    color: var(--foreground-color);
  }

  .tab input:checked ~ .content {
    display: block;
    overflow: visible;
  }

  label {
    cursor: pointer;
    display: grid;
    align-items: center;
    position: relative;
    background-color: var(--background-color);
    padding-right: 4rem;

    & > * {
      color: var(--foreground-color);
    }
  }

  .chevron {
    position: absolute;
    right: 2rem;
    color: var(--foreground-color);
    & > svg {
      color: var(--foreground-color);
      width: 18px;
      height: 12px;
    }
  }

  input:checked + label .chevron {
    transform: rotate(180deg);
  }

</style>
