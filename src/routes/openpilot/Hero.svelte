<script>
  // type-led: the name, what it is, and where the code lives
  import LinkButton from "$lib/components/LinkButton.svelte";

  // a nod to the path openpilot draws over the road in its UI: a lane-wide strip that bends right,
  // in perspective (width shrinks toward the horizon, the bend grows with distance)
  const HORIZON = 150;
  const BEND = 22000;
  const WIDTH = 600;
  const CENTER = 540;
  const left = [];
  const right = [];
  for (let y = 1000; y >= 270; y -= 20) {
    const offset = BEND / (y - HORIZON) - BEND / (1000 - HORIZON);
    const half = ((WIDTH / (1000 - HORIZON)) * (y - HORIZON)) / 2;
    left.push(`${Math.round(CENTER + offset - half)} ${y}`);
    right.unshift(`${Math.round(CENTER + offset + half)} ${y}`);
  }
  const pathD = `M ${[...left, ...right].join(" L ")} Z`;
</script>

<section class="hero light">
  <svg class="path" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="hero-path-fill" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#51ff00" stop-opacity="0.9" />
        <stop offset="0.55" stop-color="#51ff00" stop-opacity="0.35" />
        <stop offset="1" stop-color="#51ff00" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path d={pathD} fill="url(#hero-path-fill)" />
  </svg>

  <div class="container content">
    <p class="eyebrow">Open source driver assistance</p>
    <h1>openpilot</h1>
    <p class="lede">A driver assistance system that upgrades the one your car came with.</p>
    <p class="sub">
      MIT licensed and developed in public on GitHub, by comma and by the people who use it.
    </p>
    <div class="actions">
      <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="accent">View on GitHub</LinkButton>
      <LinkButton href="/vehicles" style="primary">Check your car</LinkButton>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    min-height: min(calc(100svh - 8rem), 42rem);
    padding: 3rem 0 4rem;
    overflow: hidden;
    border-bottom: 1px solid #0000001a;
    background-color: #fff;
  }

  .path {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 55%;
    height: 100%;
    pointer-events: none;
  }

  .content {
    position: relative;
  }

  .eyebrow {
    margin: 0 0 1.25rem;
    color: #00000099;
    text-transform: uppercase;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    letter-spacing: 0.12em;
  }

  h1 {
    margin: 0 0 0 -0.04em;
    color: #000;
    font-size: clamp(4.5rem, 13vw, 12rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 0.9;
  }

  .lede {
    max-width: 38rem;
    margin: 2rem 0 0;
    color: #000;
    font-size: clamp(1.5rem, 2.6vw, 2.25rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.2;
    text-wrap: balance;
  }

  .sub {
    max-width: 34rem;
    margin: 1.25rem 0 2.5rem;
    color: #000000a6;
    font-size: clamp(1.1rem, 1.5vw, 1.3rem);
    font-weight: 300;
    line-height: 1.5;
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .hero {
      align-items: flex-start;
      min-height: 0;
      padding: 3.5rem 0 4rem;
    }

    .path {
      width: 100%;
      opacity: 0.6;
    }

    .lede {
      margin-top: 1.5rem;
    }

    .sub {
      margin-bottom: 2rem;
    }
  }
</style>
