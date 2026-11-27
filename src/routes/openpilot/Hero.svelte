<script>
  // full-bleed drive: real footage first, the name and the ask over it
  import LinkButton from "$lib/components/LinkButton.svelte";
  import { playInView, reducedMotion } from "$lib/utils/media.js";

  // from comma's own beach-drive clip in the media kit (src/lib/images/products/comma-four/beach-drive.mp4)
  import CoastVideo from "$lib/videos/openpilot/hero-coast-id4.mp4";
  import CoastPoster from "$lib/videos/openpilot/hero-coast-id4.jpg?w=1920&format=jpg&as=url";
</script>

<svelte:head>
  <link rel="preload" as="image" href={CoastPoster} />
</svelte:head>

<section class="hero">
  <video
    src={CoastVideo}
    poster={CoastPoster}
    use:playInView={$reducedMotion}
    muted
    loop
    playsinline
    preload="auto"
    aria-hidden="true"
  ></video>
  <div class="shade" aria-hidden="true"></div>

  <div class="container content">
    <h1>openpilot</h1>
    <p class="lede">Open source driver assistance for the car you already have.</p>
    <div class="actions">
      <LinkButton href="/shop/comma-four" style="accent">Buy comma four</LinkButton>
      <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="secondary">View on GitHub</LinkButton>
    </div>
  </div>
  <p class="credit">openpilot in a Volkswagen ID.4</p>
</section>

<style>
  .hero {
    position: relative;
    display: flex;
    align-items: flex-end;
    height: min(calc(100svh - 8rem), 62rem);
    min-height: 34rem;
    padding: 0;
    overflow: hidden;
    background-color: #000;
    color: #fff;

    & video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 35%;
    }
  }

  .shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #000 0%, #000000d9 22%, #00000066 48%, #00000000 70%);
  }

  .content {
    position: relative;
    padding-bottom: 4.5rem;
  }

  h1 {
    margin: 0;
    color: #fff;
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 0.95;
  }

  .lede {
    max-width: 30rem;
    margin: 1rem 0 2rem;
    color: #e0e0e0;
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
    font-weight: 300;
    line-height: 1.4;
    text-wrap: balance;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .credit {
    position: absolute;
    right: 2rem;
    bottom: 1.5rem;
    margin: 0;
    color: #ffffff99;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
  }

  @media (max-width: 768px) {
    .hero {
      height: calc(100svh - 10.5rem);
      min-height: 32rem;
    }

    .hero video {
      object-position: 30% 40%;
    }

    .shade {
      background: linear-gradient(to top, #000 0%, #000000e6 38%, #00000066 62%, #00000000 80%);
    }

    .content {
      padding-bottom: 3.5rem;
    }

    .credit {
      left: 7.5%;
      right: auto;
      bottom: 1.25rem;
    }
  }
</style>
