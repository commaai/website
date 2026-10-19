<script>
  import '$lib/components/Support/support.css';
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

<div class="support-type light">
  <div class="shell">
    <slot />
  </div>
</div>

<style>
  .shell { display: flex; flex-direction: column; gap: var(--support-space); width: 85%; max-width: 90rem; margin: auto; padding: var(--support-space) 0 48px; }
  @media (max-width: 760px) { .shell { padding-bottom: 40px; } }
</style>
