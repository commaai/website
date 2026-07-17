<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js';
  import LinkButton from "$lib/components/LinkButton.svelte";
  import FeaturedArticles from "$lib/components/FeaturedArticles.svelte";
  import SectionHeader from "../lib/components/SectionHeader.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  import HeroImage from "$lib/images/comma-ev6.jpg";
  import CompatBrandsBackground from "$lib/images/compat-brands-bg.png";
  import DeviceImage from "$lib/images/products/comma-four/four_dark.png";
  import LaneCenteringIcon from "$lib/icons/features/lane-centering.svg?raw";
  import AdaptiveCruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import OtaUpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import LocationIcon from "$lib/icons/features/location.svg?raw";
  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import PeopleIcon from "$lib/icons/features/people.svg?raw";

  const CDN_BASE = "https://3comma.net";
  const ScreenVideo = `${CDN_BASE}/screen-video/screen-video.m3u8`;

  let screenVideoElement;
  let screenVideoReady = false;

  function initializeHLS(videoEl, src, onReady) {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (onReady) onReady();
      });
      return hls;
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = src;
      videoEl.addEventListener('loadedmetadata', () => {
        if (onReady) onReady();
      });
      return null;
    }
    return null;
  }

  onMount(async () => {
    // Initialize screen video
    if (screenVideoElement) {
      screenVideoElement.addEventListener('playing', () => {
        screenVideoReady = true;
      });
      initializeHLS(screenVideoElement, ScreenVideo, () => {
        screenVideoElement.play();
      });
    }
  });
</script>

<svelte:head>
  <link rel="preload" as="image" href="{CDN_BASE}/screen-video/poster.jpg" />
</svelte:head>

<section
  id="hero"
  class="hero-image"
  aria-labelledby="hero-heading"
>
  <div class="hero-image-content">
    <h1 id="hero-heading">
      <span class="hero-heading-line"><a href="#product" class="highlight">Hands&#8209;free</a> driving for</span>
      <span class="hero-heading-line">the car you already have</span>
    </h1>
    <LinkButton href="/shop/comma-four" fullWidth={true} style="accent">
      Try it risk free for 30 days
    </LinkButton>
  </div>
  <div class="hero-image-media">
    <img
      src={HeroImage}
      alt="A driver driving hands-free using the comma four on freeway"
      fetchpriority="high"
    />
  </div>
</section>

<section id="featured">
  <div class="container">
    <h2 class="section-heading">Featured in</h2>
    <FeaturedArticles />
  </div>
</section>

<section class="light" id="no-subscription">
  <div class="container">
    <h1><a href="/openpilot" class="highlight">No subscription</a> required.</h1>
    <span class="callout-label">Hands&#8209;free. Rent-free.</span>
  </div>
</section>

<section class="dark" id="proof">
  <div class="container">
    <h2 class="section-heading">Proven on the road</h2>
    <div class="proof-stats">
      <div class="proof-stat">
        <div class="proof-stat-icon">{@html PeopleIcon}</div>
        <strong>20,000+</strong>
        <span>Active Users</span>
      </div>
      <div class="proof-stat">
        <div class="proof-stat-icon">{@html RoadIcon}</div>
        <strong>300M+</strong>
        <span>Miles driven</span>
      </div>
      <div class="proof-stat">
        <div class="proof-stat-icon">{@html SteerIcon}</div>
        <strong>56%</strong>
        <span>Miles driven hands&#8209;free</span>
      </div>
    </div>
  </div>
</section>

<section class="dark" id="product">
  <div class="container">
    <h1>comma four</h1>
    <h2 class="muted">Hands free driving for the car you already have</h2>
    <Grid columns={2} rowGap="3rem" alignItems="center">
      <div class="device-image-container">
        <img
          src={DeviceImage}
          alt="comma four device"
        />
        <video
          bind:this={screenVideoElement}
          class:ready={screenVideoReady}
          poster="{CDN_BASE}/screen-video/poster.jpg"
          autoplay
          muted
          loop
          playsinline
          draggable="false"
          class="screen-video-overlay"
        />
      </div>
      <div>
        <div class="mb-2">
          <Grid columns={2} columnGap="1rem" rowGap="1.25rem" size="small" wrapMode="none">
            <div class="feature-item">
              {@html LaneCenteringIcon}
              <span>Lane<br />centering</span>
            </div>
            <div class="feature-item">
              {@html RecordingsIcon}
              <span>Dashcam<br />recording</span>
            </div>
            <div class="feature-item">
              {@html AdaptiveCruiseIcon}
              <span>Adaptive<br />cruise</span>
            </div>
            <div class="feature-item">
              {@html OtaUpdatesIcon}
              <span>OTA<br />updates</span>
            </div>
            <div class="feature-item">
              {@html LocationIcon}
              <span>Lane<br />changing</span>
            </div>
            <div class="feature-item">
              {@html ThreeSixtyVisionIcon}
              <span>360° vision</span>
            </div>
          </Grid>
        </div>
        <LinkButton href="/shop/comma-four" fullWidth={true} style="accent">
          Try it risk free for 30 days
        </LinkButton>
      </div>
    </Grid>
    <h2 class="mt-4">Make driving chill.</h2>
    <h3 class="muted">
      comma helps control the steering, braking and acceleration of the car you already drive. It's upgraded active driver assistance
      for your Toyota, Hyundai, Ford, and more.
    </h3>
  </div>
</section>

<section class="light" id="installation">
  <div class="container">
    <h1>
      Plug it in yourself in <a href="/setup" class="highlight">15 minutes</a>.
    </h1>
  </div>
</section>

<section class="dark" id="compatibility" aria-labelledby="compatibility-heading">
  <img class="compatibility-background" src={CompatBrandsBackground} alt="" loading="lazy" />
  <div class="container compatibility-content">
    <h1 id="compatibility-heading">Supports {vehicleCountText} car models from 27 brands.</h1>
    <LinkButton href="/vehicles" style="accent">
      See if your car is supported
    </LinkButton>
  </div>
</section>

<section class="light" id="recruit">
  <div class="container">
    <SectionHeader leftLabel="Careers" rightLabel="We are hiring" />
    <h1 class="mb-5 sm-mb-3">Join us in building the future.</h1>
    <Grid columns={2} columnGap="6rem" size="large">
      <Grid columns={2}>
        <div class="recruiting-card">
          <span class="muted">/01</span>
          <span>product</span>
        </div>
        <div class="recruiting-card">
          <span class="muted">/02</span>
          <span>autonomy</span>
        </div>
        <div class="recruiting-card">
          <span class="muted">/03</span>
          <span>operations</span>
        </div>
      </Grid>
      <div>
        <h4>
          We're looking for talented individuals, able to work independently,
          and ready to make a meaningful impact.
        </h4>
        <LinkButton
          href="/jobs"
          style="primary"
          fullWidth={true}
        >
          See open positions
        </LinkButton>
      </div>
    </Grid>
  </div>
</section>

<style>
  .section-heading {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 600;
    margin-bottom: 2.5rem;

    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background-color: var(--color-foreground);
      opacity: 0.5;
    }
  }

  #proof,
  #product,
  #recruit {
    padding-block: 5rem;
  }

  #featured {
    /* Keeps section slightly visible above the fold. */
    padding-top: 2rem;
    padding-bottom: 5rem;
  }

  #product {
    padding-top: 0;
  }

  #compatibility {
    position: relative;
    isolation: isolate;
    box-sizing: border-box;
    aspect-ratio: 3 / 1;
    overflow: hidden;
    padding: 0;
    display: flex;
    align-items: center;

    & .compatibility-background {
      position: absolute;
      inset: 0;
      z-index: -2;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .compatibility-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    & h1 {
      max-width: 60rem;
      margin-bottom: 2.5rem;
      font-size: clamp(1.75rem, 5vw, 3.5rem);
      line-height: 1.05;
      text-wrap: balance;
    }

    @media screen and (max-width: 1170px) {
      & h1 {
        margin-bottom: 1.25rem;
      }
    }

    @media screen and (min-width: 769px) and (max-width: 1170px) {
      aspect-ratio: 5 / 2;
      --link-button-font-size: 0.875rem;
      --link-button-padding: 1rem 2rem;
    }

    @media screen and (max-width: 768px) {
      --link-button-font-size: 0.75rem;
      --link-button-padding: 0.875rem 1rem;
      aspect-ratio: 4 / 3;
      padding-block: 2rem;

      & .compatibility-background {
        transform: scale(1.2);
      }

      & h1 {
        max-width: 36rem;
      }
    }
  }

  .hero-image {
    position: relative;
    /* Match the 66px navbar height so the image sits behind it. */
    margin: -66px 0 0;
    width: 100%;
    height: 90vh;
    overflow: hidden;
    padding: 0;

    & .hero-image-media {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    & .hero-image-media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 78%;
    }

    & .hero-image-content {
      position: absolute;
      right: clamp(1.5rem, 6vw, 7rem);
      bottom: clamp(2rem, 7vh, 5rem);
      z-index: 3;
      width: min(36rem, calc(100% - 3rem));
    }

    & h1 {
      margin: 0 0 1.5rem;
      font-size: clamp(2.25rem, 4vw, 4rem);
      line-height: 1.05;
      text-wrap: balance;
      text-shadow: 0 2px 24px rgba(0, 0, 0, 0.65);
    }

    @media screen and (min-width: 1920px) {
      & .hero-image-media img {
        object-position: center 50%;
      }

      & .hero-image-content {
        /* Keep hero copy from going too far right on ultrawide screens. */
        right: max(7rem, calc((100vw - 130rem) / 2));
      }
    }

    @media screen and (max-width: 1170px) {
      margin-top: 0;
      height: auto;
      display: flex;
      flex-direction: column;

      & .hero-image-media {
        position: relative;
        flex: none;
        height: auto;
      }

      & .hero-image-media img {
        object-position: center 80%;
      }

      & .hero-image-content {
        position: relative;
        right: auto;
        bottom: auto;
        width: auto;
        padding: 2rem clamp(1.5rem, 5vw, 4rem);
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.55fr);
        align-items: center;
        gap: 2rem;
      }

      & h1 {
        margin: 0;
        font-size: clamp(2rem, 4vw, 3rem);
      }

      &::after {
        display: none;
      }
    }

    @media screen and (min-width: 769px) and (max-width: 1170px) {
      & .hero-image-media {
        aspect-ratio: 2 / 1;
      }

      & .hero-image-content {
        --link-button-padding: 1rem;
        --link-button-font-size: 1rem;
      }
    }

    @media screen and (max-width: 768px) {
      & .hero-image-media {
        aspect-ratio: 6 / 5;
      }

      & .hero-image-media img {
        /* Tuned to keep the device and driver's arms in frame. */
        object-position: 10% center;
        transform: scale(1.26);
        transform-origin: 30% 85%;
      }

      & .hero-image-content {
        display: block;
        padding: 1.5rem;
        /* Keep the hero CTA compact on mobile. */
        --link-button-font-size: 0.75rem;
        --link-button-padding: 1rem;
      }

      & h1 {
        margin-bottom: 1rem;
        font-size: clamp(1.25rem, 5.5vw, 2rem);
      }

      & .hero-heading-line {
        display: block;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 180px;
      background: linear-gradient(to bottom, transparent, black);
      z-index: 2;
      pointer-events: none;
    }
  }

  #proof {
    & .proof-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    }

    & .proof-stat {
      min-width: 0;
      padding: 1.5rem;
      border: 1px solid #333;
      display: flex;
      flex-direction: column;

      & .proof-stat-icon {
        width: 2rem;
        height: 2rem;
        margin-bottom: 1.25rem;
        color: var(--color-foreground);

        & :global(svg) {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      & strong {
        color: var(--color-foreground);
        font-size: clamp(2rem, 4vw, 4rem);
        line-height: 1;
      }

      & span {
        margin-top: 0.75rem;
        color: var(--color-muted);
        font-family: JetBrains Mono, monospace;
        font-size: 0.875rem;
        text-transform: uppercase;
      }
    }

    @media screen and (max-width: 768px) {
      & .proof-stats {
        grid-template-columns: repeat(2, 1fr);
      }

      & .proof-stat {
        padding: 1rem;
      }

      & .proof-stat:first-child {
        grid-column: 1 / -1;
      }
    }
  }

  #product {
    & > .container > h1 {
      font-family: "Monument Extended Black", sans-serif;
      text-transform: uppercase;
    }

    & .feature-item {
      align-items: center;
      display: flex;
      color: white;

      & img {
        border: 1px solid #000;
        width: 52px;
        margin-right: 0.5rem;
        padding: 0.375rem;
        display: inline-block;
      }

      & span {
        color: var(--color-muted);
        text-transform: uppercase;
        flex: 1;
        font-family: JetBrains Mono, monospace;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.25;
        margin-left: 1rem;
      }
    }

    & h3 {
      line-height: 1.4;
    }

    @media screen and (max-width: 375px) {
      & .feature-item span {
        font-size: 0.75rem;
      }
    }
  }

  #no-subscription,
  #installation {
    padding-block: 5rem;

    & > .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      text-align: center;
    }

    & .callout-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-muted);
      font-family: JetBrains Mono, monospace;
      font-size: 0.8125rem;
      letter-spacing: 0.03em;
      line-height: 1.4;
      text-transform: uppercase;

      &::before {
        content: "[ ";
      }

      &::after {
        content: " ]";
      }

      &::before,
      &::after {
        color: var(--color-foreground);
        font-weight: 600;
      }
    }

    & h1 {
      margin: 0;
      font-size: clamp(2.25rem, 3.5vw, 3.5rem);
      letter-spacing: -0.03em;
      line-height: 1.05;
      text-wrap: balance;
    }

    @media screen and (max-width: 768px) {
      padding-block: 2.25rem;

      & h1 {
        font-size: clamp(2rem, 8vw, 2.5rem);
      }

      & .callout-label {
        justify-content: center;
        font-size: 0.75rem;
      }
    }
  }

  #recruit {
    & .recruiting-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem;
      border: 1px solid #000;

      & span {
        display: block;
      }

      & span:first-child {
        font-family: JetBrains Mono, monospace;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1;
        margin-bottom: 0.375rem;
      }

      & span:last-child {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1;
      }
    }

    @media screen and (max-width: 768px) {
      & h4 {
        margin-bottom: 2rem;
      }
    }
  }

  .device-image-container {
    position: relative;
    display: inline-block;
    transform: scale(1.1);

    & img {
      display: block;
      width: 100%;
      height: auto;
    }

    & .screen-video-overlay {
      position: absolute;
      left: 23.21%; /* 780 / 3360 */
      top: 63.97%; /* 1433 / 2240 */
      width: 40.21%; /* 1351 / 3360 */
      height: 25.80%; /* 578 / 2240 */
      mix-blend-mode: screen;
      opacity: 0;
      transition: opacity 0.3s ease-in;

      &.ready {
        opacity: 1;
      }
    }
  }
</style>
