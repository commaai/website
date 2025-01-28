<script>
  export let value;
  export let selected = false;
  export let accessoryLabel = null;
</script>

<div class="dropdown-item" role="option" aria-selected={selected} on:click on:keydown tabindex="0">
  <div class="item-info">
    <div class="title">
      {value?.car}
    </div>
    {#if value?.title}
      <div class="subtitle">
        Harness: {value.title}
      </div>
    {/if}
  </div>
  {#if accessoryLabel}
    <div class="accessory-label">
      {accessoryLabel}
    </div>
  {/if}
</div>

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
    font-size: 1rem;
    font-weight: 600;
    margin-right: 0.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
    font-weight: 400;
    color: rgb(81, 81, 81);
    margin-right: 0.5rem;
  }

  .accessory-label {
    font-size: 1.25rem;
    font-weight: 600;
    text-wrap: nowrap;
  }
</style>
