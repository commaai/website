<script>
  // C: comma four first. The device, big, with openpilot running live on its screen.
  import { onMount } from "svelte";
  import Hls from "hls.js/light";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import { FOUR_PRICE } from "$lib/constants/prices.js";
  import { vehicleCountText } from "$lib/constants/vehicles.js";
  import { reducedMotion } from "$lib/utils/media.js";

  import DeviceImage from "$lib/images/products/comma-four/four_front.png?w=1600";

  // the same screen recording the home page plays on comma four's display
  const ScreenVideo = "https://3comma.net/screen-video/screen-video.m3u8";
  const ScreenPoster = "https://3comma.net/screen-video/poster.jpg";

  let screenVideo;
  let screenReady = false;

  onMount(() => {
    if ($reducedMotion) {
      return;
    }
    const play = () => screenVideo.play().catch(() => {});
    const ready = () => screenReady = true;
    screenVideo.addEventListener("playing", ready);
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(ScreenVideo);
      hls.attachMedia(screenVideo);
      hls.on(Hls.Events.MANIFEST_PARSED, play);
      return () => {
        screenVideo.removeEventListener("playing", ready);
        hls.destroy();
      };
    }
    if (screenVideo.canPlayType("application/vnd.apple.mpegurl")) {
      screenVideo.src = ScreenVideo;
      screenVideo.addEventListener("loadedmetadata", play, { once: true });
    }
    return () => screenVideo.removeEventListener("playing", ready);
  });
</script>

<section class="light hero-c">
  <div class="container grid">
    <div class="copy">
      <p class="eyebrow">openpilot</p>
      <h1>comma four runs openpilot.</h1>
      <p class="lede">
        Open source driver assistance for {vehicleCountText} cars. comma four mounts on your windshield, plugs into your car
        with a harness made for it, and unplugs back to stock.
      </p>
      <div class="actions">
        <LinkButton href="/shop/comma-four" style="accent">Buy comma four</LinkButton>
        <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="primary">View on GitHub</LinkButton>
      </div>
      <p class="price"><strong>${FOUR_PRICE}</strong> with a 30-day money back trial</p>
    </div>

    <div class="device">
      <img src={DeviceImage} alt="comma four, front view" fetchpriority="high" />
      <video
        bind:this={screenVideo}
        class:ready={screenReady}
        poster={ScreenPoster}
        muted
        loop
        playsinline
        aria-hidden="true"
      ></video>
    </div>
  </div>
</section>

<style>
  .hero-c {
    padding-top: 4rem;
    padding-bottom: 4rem;
    background-color: #f1f1f1;
    color: #000;
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
    gap: 2rem;
    align-items: center;
  }

  .eyebrow {
    margin: 0 0 1.25rem;
    color: #00000099;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.75rem, 4.6vw, 4.5rem);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 1;
    text-wrap: balance;
  }

  .lede {
    max-width: 32rem;
    margin: 1.5rem 0 2.25rem;
    color: #000000b3;
    font-size: 1.25rem;
    line-height: 1.5;
    text-wrap: pretty;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .price {
    margin: 1.25rem 0 0;
    color: #00000099;
    font-size: 1rem;

    & strong {
      color: #000;
      font-weight: 600;
    }
  }

  .device {
    position: relative;

    & img {
      display: block;
      width: 100%;
      height: auto;
    }

    /* the screen's position in four_front.png, as on the home page */
    & video {
      position: absolute;
      left: 23.21%;
      top: 63.97%;
      width: 40.21%;
      height: 25.8%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease-in;
    }

    & video.ready {
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 1.5rem;
    }

    .device {
      order: -1;
      max-width: 34rem;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    .hero-c {
      padding-top: 1.5rem;
      padding-bottom: 3.5rem;
    }

    .lede {
      font-size: 1.1rem;
    }
  }
</style>
