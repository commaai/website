<script>
  export let href;
  export let external = false;
</script>

<a class="card support-card" {href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} on:click>
  <slot />
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
  }

  .card :global(:is(h2, h3)) {
    margin: 0;
  }
</style>
