<script>
  export let value;
  export let selected = false;
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
  <div class="accessory-label">
    <slot/>
  </div>
</div>

<style>
  .dropdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #222222;
    background-color: rgb(217, 217, 217);
    padding: 14px 52px 14px 24px;
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
    font-size: 20px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 16px;
    font-weight: 400;
    margin-right: 0.5rem;
    color: black;
  }

  .accessory-label {
    font-size: 1.25rem;
    font-weight: 600;
    text-wrap: nowrap;
  }
</style>
