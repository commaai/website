<script>
  import Card from './Card.svelte';
  import CardGrid from './CardGrid.svelte';
  import SectionHeading from './SectionHeading.svelte';

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
      label: 'comma discord',
      title: 'Ask the community',
      href: 'https://discord.comma.ai/',
      external: true,
      icon: 'M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z'
    }
  ];
</script>

<section aria-labelledby="support-catch-all-title">
  <div class="heading">
    <SectionHeading id="support-catch-all-title" eyebrow="Still have an issue?">We're here to help.</SectionHeading>
  </div>

  <CardGrid>
    {#each cards as card}
      <Card href={card.href} external={card.external}>
        <div class="content">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={card.icon} /></svg>
          <div>
            <span class="label">{card.label}</span>
            <h3>{card.title}</h3>
          </div>
        </div>
      </Card>
    {/each}
  </CardGrid>
</section>

<style>
  .heading { margin-bottom: 28px; }
  .content { flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 32px; box-sizing: border-box; min-height: 218px; padding: 28px; }
  .label { display: block; margin-bottom: 8px; color: var(--color-muted); font-size: 14px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
  svg { width: 40px; height: 40px; fill: currentColor; }

  @media (max-width: 768px) {
    .content { min-height: 158px; padding: 24px; }
  }
</style>
