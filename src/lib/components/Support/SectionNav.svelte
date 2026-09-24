<script>
  export let title = 'Topics';
  export let items = [];
  export let activeId = '';
  export let onSelect = () => {};
</script>

<nav class="topics" aria-label={title}>
  <h2>{title}</h2>
  {#each items as item}
    <a href={item.href || `#${item.id}`} class:nested={item.nested} aria-current={activeId === item.id ? 'location' : undefined} on:click={(event) => onSelect(event, item)}>{item.label}</a>
  {/each}
</nav>

<style>
  .topics { margin: 20px 0 32px; }
  .topics h2 { margin: 0 0 18px; font-size: 16px; font-weight: 600; }
  .topics a { display: block; padding: 12px 16px; border-left: 2px solid var(--support-border); color: var(--support-muted); font-size: 15px; line-height: 1.4; text-decoration: none; }
  .topics a.nested { padding-left: 28px; font-size: 14px; }
  .topics a:hover { background: var(--support-hover); }
  .topics a[aria-current] { border-color: var(--support-accent); color: var(--support-text); background: #e5ffd9; }
  .topics a:focus-visible { outline: 2px solid var(--support-accent); outline-offset: -2px; }
  @media (min-width: 1440px) { .topics h2 { font-size: 18px; } .topics a { font-size: 17px; padding: 14px 18px; } .topics a.nested { padding-left: 30px; font-size: 15px; } }
</style>
