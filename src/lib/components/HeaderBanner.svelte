<script>
  import Countdown from "$lib/components/Countdown.svelte";
</script>

<a href="/shop/comma-3x" class="banner">
  <div class="wrapper">
    <strong class="headline">
      FLASH SALE: TAKE $99 OFF A COMMA 3X WITH CAR HARNESS
    </strong>
    <Countdown date="2025-05-10T07:59:00.000Z" let:remaining>
     <strong>
       Sale ends in {remaining.days} days, {remaining.hours.toString().padStart(2, '0')}:{remaining.minutes.toString().padStart(2, '0')}:{remaining.seconds.toString().padStart(2, '0')}
     </strong>
   </Countdown>
  </div>
</a>

<style>
  .banner {
    display: block;
    text-decoration: none;
    color: black;
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

  strong {
    display: block;
    margin: 0 0.5rem;
    font-family: JetBrains Mono, monospace;
    text-decoration: none;
  }

  .headline {
    font-size: 1.25rem;
  }
</style>
