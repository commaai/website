<script>
  export let id;
  export let eyebrow = '';
</script>

{#if eyebrow}<span class="type-caps type-small">{eyebrow}</span>{/if}
<h2 class="type-regular" {id}><slot /></h2>

<style>
  span {
    display: block;
    color: var(--color-muted);
  }

  h2 {
    margin: 0 0 20px;
  }
</style>
