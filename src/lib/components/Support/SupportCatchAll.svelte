<script>
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
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
      copy: 'support@comma.ai',
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

  const checkIcon = 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z';

  let copied = false;
  let copiedTimeout;

  async function handleClick(event, card) {
    if (!card.copy || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    event.preventDefault();
    try {
      await navigator.clipboard.writeText(card.copy);
    } catch {
      window.location.href = card.href;
      return;
    }

    copied = true;
    clearTimeout(copiedTimeout);
    copiedTimeout = setTimeout(() => (copied = false), 2000);
  }

  onDestroy(() => clearTimeout(copiedTimeout));
</script>

<section aria-labelledby="support-catch-all-title">
  <div class="heading">
    <SectionHeading id="support-catch-all-title" eyebrow="Still have an issue?">We're here to help.</SectionHeading>
  </div>

  <CardGrid>
    {#each cards as card}
      {@const showCopied = card.copy && copied}
      <Card href={card.href} external={card.external} on:click={e => handleClick(e, card)}>
        <div class="content">
          {#key showCopied}
            <svg viewBox="0 0 24 24" aria-hidden="true" in:fly={{ y: 8, duration: 200 }}><path d={showCopied ? checkIcon : card.icon} /></svg>
          {/key}
          <div>
            <span class="label support-label">{card.label}</span>
            {#key showCopied}
              <h3 class="support-heading" in:fly={{ y: 8, duration: 200 }} aria-live="polite">{showCopied ? 'Email copied' : card.title}</h3>
            {/key}
          </div>
        </div>
      </Card>
    {/each}
  </CardGrid>
</section>

<style>
  .heading {
    margin-bottom: 28px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    box-sizing: border-box;
    min-height: 218px;
    padding: 28px;
  }

  .label {
    margin-bottom: 8px;
  }

  svg {
    width: 40px;
    height: 40px;
    fill: currentColor;
  }

  @media (max-width: 768px) {
    .content {
      min-height: 158px;
      padding: 24px;
    }
  }
</style>
