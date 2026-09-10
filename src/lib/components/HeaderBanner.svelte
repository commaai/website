<script>
  import Countdown from '$lib/components/Countdown.svelte';
</script>

<div class="banner">
  <div class="wrapper">
    <a href="/shop/comma-four" class="headline">
      <strong>LABOR DAY SALE!</strong>
      <span><span class="discount">$100&nbsp;OFF</span> A COMMA&nbsp;FOUR</span>
    </a>
    <Countdown date="2026-09-11T23:59:00-08:00" let:remaining>
      {#if !remaining.done}
        <strong class="countdown">
          Sale ends in {remaining.days} days, {remaining.hours.toString().padStart(2, '0')}:{remaining.minutes.toString().padStart(2, '0')}:{remaining.seconds.toString().padStart(2, '0')}
        </strong>
      {:else}
        <strong class="countdown">SALE ENDED</strong>
      {/if}
    </Countdown>
  </div>
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

  .countdown {
    font-variant-numeric: tabular-nums;
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
</style>
