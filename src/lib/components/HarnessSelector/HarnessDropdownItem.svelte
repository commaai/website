<script>
  export let value;
  export let selected = false;
  export let href = undefined;
</script>

<svelte:element
  this={href ? 'a' : 'div'}
  {href}
  class="dropdown-item"
  role="option"
  aria-selected={selected}
  on:click
  on:keydown
  tabindex="0"
>
  <div class="item-info">
    <div class="title type-strong">
      {value?.car}
    </div>
    {#if $$slots.subtitle || value?.subtitle || value?.title}
      <div class="subtitle type-small">
        <slot name="subtitle">{value.subtitle ?? `Harness: ${value.title}`}</slot>
      </div>
    {/if}
  </div>
  <div class="accessory-label">
    <slot/>
  </div>
</svelte:element>

<style>
  .dropdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #222222;
    background-color: #fff;
    border: 1px solid #a0a0a0;
    padding: 1.25rem 3rem;
    box-sizing: border-box;
    min-height: 84px;
    transition: border-color 0.2s;

    &:hover {
      border-color: #464646;
    }
  }

  .item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    margin-right: 0.5rem;
  }

  .subtitle {
    color: rgb(81, 81, 81);
    margin-right: 0.5rem;
  }

  .accessory-label {
    text-wrap: nowrap;
  }
</style>
