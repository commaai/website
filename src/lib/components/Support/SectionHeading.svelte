<script>
  export let id;
  export let eyebrow = '';
</script>

{#if eyebrow}<span class="support-label">{eyebrow}</span>{/if}
<h2 class="support-title" {id}><slot /></h2>

<style>
  h2 {
    margin: 0 0 20px;
  }
</style>
