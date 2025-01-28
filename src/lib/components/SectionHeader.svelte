<script>
  export let leftLabel = "";
  export let rightLabel = "";
  export let rightIcon = null;
</script>

<div class="wrapper">
  <div class="label">{leftLabel}</div>
  <div class="line"></div>
  {#if rightIcon}
    <div class="label">{@html rightIcon}</div>
  {:else}
    <div class="label">{rightLabel}</div>
  {/if}
</div>

<style>
  .wrapper {
    justify-content: space-around;
    align-items: center;
    display: flex;
    margin-bottom: 4rem;

    @media screen and (max-width: 512px) {
      margin-bottom: 3rem;
    }
  }

  .label {
    color: var(--color-foreground);
    flex: none;
    font-size: 1.25rem;
    line-height: 1;
  }

  .line {
    background-color: var(--color-foreground);
    width: 100%;
    height: 1px;
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
