<script>
  import '$lib/components/Support/support.css';
  import { page } from '$app/stores';
  import { afterUpdate } from 'svelte';

  // Open and scroll to the dropdown or FAQ named by the URL hash once it has rendered.
  let revealed = '';
  afterUpdate(() => {
    const { pathname, hash } = $page.url;
    if (!hash) return (revealed = '');
    if (revealed === pathname + hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    revealed = pathname + hash;
    if (target instanceof HTMLDetailsElement) target.open = true;
    if (target instanceof HTMLInputElement) target.checked = true;
    (target.labels?.[0] ?? target).scrollIntoView();
  });
</script>

<div class="support-type light">
  <div class="shell">
    <slot />
  </div>
</div>

<style>
  .shell { display: flex; flex-direction: column; width: 85%; max-width: 90rem; margin: auto; padding-bottom: 48px; }
  @media (max-width: 760px) { .shell { padding-bottom: 40px; } }
</style>
