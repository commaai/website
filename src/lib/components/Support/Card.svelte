<script>
  export let href;
  export let external = false;
</script>

<a class="card" {href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} on:click>
  <slot />
</a>

<style>
  .card { display: flex; flex-direction: column; box-sizing: border-box; border: 1px solid var(--support-border); background: var(--color-card-background); }
  .card:hover { background: var(--color-card-background-hover); }
  .card :global(:is(h2, h3)) { margin: 0; font-size: clamp(20px, 2.4vw, 28px); font-weight: 600; line-height: 1.15; letter-spacing: -.035em; }
</style>
