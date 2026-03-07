<script>
  import Countdown from '$lib/components/Countdown.svelte';
</script>

<a href="https://comma.ai/hack" target="_blank" class="banner">
  <div class="wrapper">
    <p class="banner-text"><b>COMMA_HACK is back!</b> March 27-29 @ comma HQ. 30 people, $10k in prizes. <a href="https://comma.ai/hack">Apply here.</a></p>
    <Countdown date="2026-03-27T17:00:00.000Z" let:remaining>
      {#if !remaining.done}
        <strong class="countdown">
          Starts in {remaining.days} days, {remaining.hours.toString().padStart(2, '0')}:{remaining.minutes.toString().padStart(2, '0')}:{remaining.seconds.toString().padStart(2, '0')}
        </strong>
      {/if}
    </Countdown>
  </div>
</a>

<style>
  .banner {
    display: block;
    text-decoration: none;
    color: black;
    position: relative;
    z-index: 1;
    background-color: var(--color-accent);
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

  .banner-text {
    margin: 0 0.5rem;
    font-family: JetBrains Mono, monospace;
    font-size: 1.25rem;
  }

  .banner-text a {
    color: black;
    text-decoration: underline;
  }

  strong {
    display: block;
    margin: 0 0.5rem;
    font-family: JetBrains Mono, monospace;
    text-decoration: none;
  }
</style>
