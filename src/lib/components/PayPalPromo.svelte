<script>
  import { onMount } from 'svelte';
  import FlipCountdown from './FlipCountdown.svelte';
  import ChevronIcon from '$lib/icons/icon-chevron.svg?raw';

  export let endDate = new Date();
  export let amount = 0;
  export let finePrintAnchor = '#fine-print';

  function isExpired() {
    return Date.now() >= endDate.getTime();
  }

  // Initialize visibility synchronously to avoid layout shift
  let visible = !isExpired();

  onMount(() => {
    if (!visible) return;

    const intervalId = setInterval(() => {
      if (isExpired()) {
        visible = false;
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  });
</script>

{#if visible}
  <div class="paypal-promo">
    <div class="header">
      <div class="value-container">
        <span class="label">Limited time</span>
        <span class="value">20% cash back</span>
      </div>
      <FlipCountdown {endDate} />
    </div>
    <div class="body">
      <p>Pay with <strong>PayPal Pay Later</strong> and earn 20% cash back. Ends Dec 8. Subject to eligibility and change. <a href={finePrintAnchor}>Learn more</a></p>
      <div
        class="message"
        data-pp-message
        data-pp-style-layout="text"
        data-pp-style-logo-type="inline"
        data-pp-style-text-color="black"
        data-pp-amount={amount}
        data-pp-language="">
      </div>
    </div>
    <a href="https://www.paypal.com/us/digital-wallet/ways-to-pay/buy-now-pay-later" target="_blank" class="cta">
      Save offer to your account <span class="chevron">{@html ChevronIcon}</span>
    </a>
  </div>
{/if}

<style>
  .paypal-promo {
    border: 1px solid #000;
    overflow: hidden;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.75rem;
    background: #000;
    padding: .75rem;
  }

  .value-container {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    flex: 1;
    min-width: 0;
  }

  .label {
    font-family: JetBrains Mono, monospace;
    font-size: 0.625rem;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .value {
    font-family: JetBrains Mono, monospace;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  .body {
    padding: 1rem;
  }

  .body p {
    margin: 0 0 1rem 0;
    font-size: 0.9375rem;
    line-height: 1.5;
    color: #333;
  }

  .body a {
    color: #0070ba;
    text-decoration: underline;
  }

  .message {
    padding-top: 0.5rem;
    border-top: 1px solid #e8e8e8;
  }

  .cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.875rem 1rem;
    background: transparent;
    border-top: 1px solid #000;
    color: #1a1a1a;
    font-weight: 600;
    font-size: 0.9375rem;
    text-decoration: none;
    transition: background 0.15s ease;
  }

  .cta:hover {
    background: var(--color-accent);
  }

  .chevron {
    display: flex;
    align-items: center;
  }

  .chevron :global(svg) {
    width: 16px;
    height: 16px;
    transform: rotate(-90deg);
  }
</style>

