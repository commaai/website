<script>
  // E: lead with "Drives like you do." The claim is the hero, and the live diagram right under it is the proof.
  import LinkButton from "$lib/components/LinkButton.svelte";
</script>

<section class="hero-e">
  <div class="container">
    <p class="eyebrow">openpilot <span>·</span> open source driver assistance</p>
    <h1>Drives like you do.</h1>
    <p class="copy">
      openpilot drives like you do because it learned from you. Steering, gas, and brakes all come from one driving model,
      learned end-to-end from 10 million minutes of human driving.
    </p>
    <div class="actions">
      <LinkButton href="/shop/comma-four" style="accent">Buy comma four</LinkButton>
      <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="secondary">View on GitHub</LinkButton>
    </div>
  </div>
</section>

<style>
  .hero-e {
    padding-top: 4rem;
    padding-bottom: 0;
    background-color: #000;
    color: #fff;
    text-align: center;
  }

  .eyebrow {
    margin: 0 0 1.5rem;
    color: #9e9e9e;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;

    & span {
      color: var(--color-accent);
    }
  }

  h1 {
    margin: 0 auto 2rem;
    color: #fff;
    font-size: clamp(3.25rem, 10.5vw, 10rem);
    font-weight: 700;
    letter-spacing: -0.055em;
    line-height: 0.95;
    text-wrap: balance;
  }

  .copy {
    max-width: 44rem;
    margin: 0 auto 2.5rem;
    color: #cfcfcf;
    font-size: clamp(1.15rem, 1.8vw, 1.45rem);
    font-weight: 300;
    line-height: 1.55;
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .hero-e {
      padding-top: 2.5rem;
    }
  }
</style>
