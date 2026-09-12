<script>
  import Countdown from '$lib/components/Countdown.svelte';

  const units = [
    { key: 'days', short: 'd' },
    { key: 'hours', short: 'h' },
    { key: 'minutes', short: 'm' },
    { key: 'seconds', short: 's' },
  ];
  const pad = (value) => String(value).padStart(2, '0');
</script>

<div class="banner">
  <div class="wrapper">
    <a href="/shop/comma-four" class="headline">
      <strong>LABOR DAY SALE!</strong>
      <span><span class="discount">$100&nbsp;OFF</span> A COMMA&nbsp;FOUR</span>
    </a>
  </div>
  <Countdown date="2026-09-12T00:00:00-07:00" let:remaining>
    <div class="countdown">
      {#if remaining.done}
        <span class="label">SALE ENDED</span>
      {:else}
        <span class="label">SALE ENDS IN</span>
        <span class="timer" role="timer">
          {#each units as unit}
            <span class="unit">
              <span class="value">{pad(remaining[unit.key])}</span>
              <span class="unit-label">{unit.short}</span>
            </span>
          {/each}
        </span>
      {/if}
    </div>
  </Countdown>
</div>

<style>
  .banner {
    color: white;
    position: relative;
    z-index: 4;
    background-color: black;
  }

  .wrapper {
    padding: 1rem 0;
    margin-left: auto;
    margin-right: auto;
    width: 85%;
    max-width: 90rem;
    font-size: 0.875rem;
    line-height: 1.2;
    text-align: center;

    display: flex;
    flex-direction: column;
    grid-row-gap: 0.5rem;
  }

  .headline {
    color: white;
    font-family: "Monument Extended Black", sans-serif;
    font-size: 1.55rem;
    margin: 0 0.5rem;
    text-decoration: none;
  }

  .headline span {
    color: white;
    margin-left: 0.35em;
    font-weight: 700;
  }

  .headline .discount {
    color: var(--color-sale-red);
    margin-left: 0;
    text-decoration: underline;
    text-decoration-thickness: 0.13em;
    text-underline-offset: 0.15em;
  }

  @media screen and (max-width: 550px) {
    .headline {
      font-size: 1.25rem;
    }
  }

  .countdown {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px 18px;
    padding: 11px 16px;
    background: var(--color-sale-red);
    color: #000;
    letter-spacing: 0;
  }

  .label {
    color: #000;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
  }

  .timer {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
    font-variant-numeric: tabular-nums;
  }

  .unit { display: inline-flex; align-items: baseline; gap: 3px; }

  .value {
    color: #000;
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
  }

  .unit-label { color: #000; font-size: 14px; }

</style>
