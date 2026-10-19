<script>
  const cards = [
    {
      label: 'Support',
      title: 'Open a support ticket',
      href: 'https://commasupport.zendesk.com/hc/en-us/requests/new',
      external: true,
      icon: 'M12 1C6.48 1 2 5.48 2 11v5c0 1.66 1.34 3 3 3h1v-8H4c0-4.42 3.58-8 8-8s8 3.58 8 8v9h-9v2h8c1.66 0 3-1.34 3-3v-8c0-5.52-4.48-10-10-10z'
    },
    {
      label: 'Email support@comma.ai',
      title: 'Send us an email',
      href: 'mailto:support@comma.ai',
      icon: 'M2 4h20v16H2V4zm2 2v1.2l8 6 8-6V6H4zm16 12V9.7l-8 6-8-6V18h16z'
    },
    {
      label: 'Community',
      title: 'Ask the community',
      href: 'https://discord.comma.ai/',
      external: true,
      icon: 'M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z'
    }
  ];
</script>

<section class="support-catch-all" aria-labelledby="support-catch-all-title">
  <div class="support-catch-all-heading">
    <span>Still have an issue?</span>
    <h2 id="support-catch-all-title">We're here to help.</h2>
  </div>

  <div class="support-card-grid">
    {#each cards as card}
      <a class="support-card support-catch-all-card" href={card.href} target={card.external ? '_blank' : undefined} rel={card.external ? 'noopener noreferrer' : undefined}>
        <svg class="support-catch-all-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={card.icon} /></svg>
        <div>
          <span class="support-catch-all-label">{card.label}</span>
          <h3 class="support-card-title">{card.title}</h3>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  .support-catch-all-heading { margin-bottom: 28px; }
  .support-catch-all-heading span, .support-catch-all-label { display: block; color: var(--color-muted); font-size: 14px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
  .support-catch-all-label { margin-bottom: 8px; }
  .support-catch-all-card { display: flex; flex-direction: column; justify-content: space-between; gap: 32px; min-height: 220px; padding: 28px; }
  .support-catch-all-icon { width: 40px; height: 40px; fill: currentColor; }

  @media (max-width: 760px) {
    .support-catch-all-card { min-height: 160px; padding: 24px; }
  }
</style>
