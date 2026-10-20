<script>
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { tick } from 'svelte';

  let revealedHref;
  $: if (browser && $page.url.href !== revealedHref) reveal($page.url);

  async function reveal({ href, hash }) {
    revealedHref = href;
    if (!hash) return;
    await tick();
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    if (target instanceof HTMLDetailsElement) target.open = true;
    if (target instanceof HTMLInputElement) target.checked = true;
    (target.labels?.[0] ?? target).scrollIntoView();
  }
</script>

<div class="support light">
  <div class="shell">
    <slot />
  </div>
</div>

<style>
  .support {
    --support-border: #ddd;
    --support-rule: #333;
    --support-accent-soft: color-mix(in srgb, var(--color-accent) 15%, transparent);
    --support-space: 64px;
    background: var(--color-background);
    color: var(--color-foreground);
    color-scheme: light;
    line-height: 1.6;
  }

  .support :global(section) {
    padding: 0;
  }

  .support :global(:is(a, button, summary):focus-visible) {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  .shell {
    display: flex;
    flex-direction: column;
    gap: var(--support-space);
    width: 85%;
    max-width: 90rem;
    margin: auto;
    padding: var(--support-space) 0 48px;
  }

  .shell > :global(hr) {
    margin: 0;
    background: var(--support-border);
  }

  @media (max-width: 768px) { .shell { padding-bottom: 40px; } }
</style>
