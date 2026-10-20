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
    font-size: clamp(17px, 1.25vw, 18px);
    line-height: 1.6;
    letter-spacing: -.011em;
  }

  .support :global(section) {
    padding: 0;
  }

  .support :global(:is(a, button, summary):focus-visible) {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  /* Type scale: every support page and component uses these, nothing else */
  .support :global(.support-display) {
    font-size: clamp(48px, 7vw, 88px);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -.05em;
  }

  .support :global(:is(.support-title, .prose h2)) {
    font-size: clamp(28px, 2.6vw, 36px);
    font-weight: 400;
    line-height: 1.15;
    letter-spacing: -.03em;
  }

  .support :global(:is(.support-heading, .prose h3)) {
    font-size: clamp(20px, 1.8vw, 24px);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -.02em;
  }

  .support :global(.support-lead) {
    color: var(--color-muted);
    font-size: clamp(17px, 1.6vw, 20px);
    line-height: 1.4;
  }

  .support :global(.support-small) {
    font-size: 15px;
    line-height: 1.45;
  }

  .support :global(.support-label) {
    display: block;
    color: var(--color-muted);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: .04em;
    text-transform: uppercase;
  }

  /* Shared bordered surface for cards and card links */
  .support :global(.support-card) {
    box-sizing: border-box;
    border: 1px solid var(--support-border);
    background: var(--color-card-background);
  }

  .support :global(.support-card:hover) {
    background: var(--color-card-background-hover);
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
