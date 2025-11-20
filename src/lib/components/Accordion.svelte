<script>
  // import IconChevron from '$lib/icons/icon-chevron.svg?raw';
  import IconChevron from "$lib/icons/link_arrow.svg?raw";
  import { onMount } from 'svelte';

  export let id = (Math.random() * 10e15).toString(16);
  export let type = "checkbox"; // or "radio"
  export let checked = false;
  export let style = "light"; // or "dark"
  export let foregroundColor = null;
  export let backgroundColor = null;
  export let alternateBackground = false;

  let contentEl, inputEl;
  onMount(() => {
    contentEl.style.display = inputEl.checked ? 'block' : 'none';
  });

  function toggleContent() {
    if (inputEl.checked) {
      contentEl.style.display = 'block';
      contentEl.style.maxHeight = '0px';
      requestAnimationFrame(() => {
        contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
      });
    } else {
      contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
      requestAnimationFrame(() => {
        contentEl.style.maxHeight = '0px';
      });
    }
  }

  function onTransitionEnd() {
    if (!inputEl.checked) {
      contentEl.style.display = 'none';
    }
    contentEl.style.maxHeight = null;
  }
</script>

<div
  class="tab"
  class:alternate={alternateBackground}
  style="
    --foreground-color: {foregroundColor ?? (style === 'light' ? 'black' : 'white')};
    --background-color: {backgroundColor ?? (style === 'light' ? 'white' : 'black')};
  "
>
  <input {type} name={id} {id} {checked} on:click={toggleContent} bind:this={inputEl} />
  <label for={id}>
    <slot name="label"></slot>
    <span class="chevron">{@html IconChevron}</span>
  </label>
  <div class="content" on:transitionend={onTransitionEnd} bind:this={contentEl}>
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
    max-height: 0;
    overflow: hidden;
    color: var(--foreground-color);
    transition: max-height 0.6s cubic-bezier(0, 1, 0, 1);
  }

  .tab input:checked ~ .content {
    max-height: 10000px;
    transition: max-height 0.6s ease-in-out;
    animation: allow-overflow 0.6s forwards;
  }

  @keyframes allow-overflow {
    0% {
      overflow: hidden;
    }
    99% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }

  label {
    cursor: pointer;
    display: grid;
    align-items: center;
    position: relative;
    /*background-color: #EAEAEA;*/
    padding-right: 4rem;

    & > * {
      color: var(--foreground-color);
    }
  }

  .tab.alternate label {
    padding: 0.5rem 4rem 0.5rem 2rem;
  }

  .tab.alternate:nth-child(odd) label,
  .tab.alternate:nth-child(odd) .content {
    background-color: #D9D9D9;
  }

  .chevron {
    position: absolute;
    right: 2rem;
    transition: transform 0.6s;
    color: var(--foreground-color);
    transform: rotate(180deg);
    & > svg {
      color: var(--foreground-color);
      width: 20px;
      height: 20px;
    }
  }

  input:checked + label .chevron {
    transform: rotate(0deg);
  }

</style>
