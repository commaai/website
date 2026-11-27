<script>
  // D: split. The name on the left, the live end-to-end diagram on the right, so the first thing you see is it driving.
  import LinkButton from "$lib/components/LinkButton.svelte";
  import DriveDiagram from "../DriveDiagram.svelte";
</script>

<section class="hero-d">
  <div class="container grid">
    <div class="copy">
      <h1>openpilot</h1>
      <p class="lede">Open source driver assistance for the car you already have.</p>
      <p class="note">
        On the right, it's driving: road camera video goes in, and where to steer and how fast to go come out, frame by frame.
      </p>
      <div class="actions">
        <LinkButton href="/shop/comma-four" style="accent">Buy comma four</LinkButton>
        <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="secondary">View on GitHub</LinkButton>
      </div>
    </div>
    <div class="diagram">
      <DriveDiagram stacked />
    </div>
  </div>
</section>

<style>
  .hero-d {
    padding-top: 4.5rem;
    padding-bottom: 5rem;
    background-color: #000;
    color: #fff;
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
    gap: 4rem;
    align-items: center;
  }

  h1 {
    margin: 0;
    color: #fff;
    font-size: clamp(3.25rem, 6vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 0.95;
  }

  .lede {
    margin: 1.25rem 0 0;
    color: #e0e0e0;
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
    font-weight: 300;
    line-height: 1.4;
    text-wrap: balance;
  }

  .note {
    margin: 1.25rem 0 2.25rem;
    color: #9e9e9e;
    font-size: 1.05rem;
    line-height: 1.55;
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 3rem;
    }
  }

  @media (max-width: 768px) {
    .hero-d {
      padding-top: 2.5rem;
      padding-bottom: 3.5rem;
    }

    .note {
      display: none;
    }

    .lede {
      margin-bottom: 2rem;
    }
  }
</style>
