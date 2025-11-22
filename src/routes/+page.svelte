<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js';
  import LinkButton from "$lib/components/LinkButton.svelte";
  import FeaturedCarsList from "$lib/components/FeaturedCarsList.svelte";
  import FeaturedArticles from "$lib/components/FeaturedArticles.svelte";
  import SectionHeader from "../lib/components/SectionHeader.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  import DeviceImage from "$lib/images/products/comma-four/four_dark.png";
  import LaneCenteringIcon from "$lib/icons/features/lane-centering.svg?raw";
  import AdaptiveCruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import OtaUpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import LocationIcon from "$lib/icons/features/location.svg?raw";
  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";

  const HeroLandscapeVideo = "/videos/hero-landscape/hero-landscape.m3u8";
  const HeroPortraitVideo = "/videos/hero-portrait/hero-portrait.m3u8";
  const ScreenVideo = "/videos/screen-video/screen-video.m3u8";

  let videoLandscapeElement;
  let videoLandscapeReady = false;
  let videoPortraitElement;
  let videoPortraitReady = false;
  let screenVideoElement;
  let screenVideoReady = false;

  // Hardcode GitHub star count (similar to contributors on openpilot page)
  const githubStars = 50000;

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

  // TODO: don't load both mobile and desktop videos on initial load
  onMount(async () => {
    // const isMobile = typeof window !== 'undefined' && window.innerWidth < 769;

    // Initialize landscape video
    if (videoLandscapeElement) {
      videoLandscapeElement.addEventListener('playing', () => {
        videoLandscapeReady = true;
      });
      initializeHLS(videoLandscapeElement, HeroLandscapeVideo, () => {
        videoLandscapeElement.play();
      });
    }

    // Initialize portrait video
    if (videoPortraitElement) {
      videoPortraitElement.addEventListener('playing', () => {
        videoPortraitReady = true;
      });
      initializeHLS(videoPortraitElement, HeroPortraitVideo, () => {
        videoPortraitElement.play();
      });
    }

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

  function handleDragStart(e) {
    e.preventDefault();
    return false;
  }
</script>

<svelte:head>
  <link rel="preload" as="image" href="/videos/hero-landscape/poster.jpg" />
  <link rel="preload" as="image" href="/videos/hero-portrait/poster.jpg" />
  <link rel="preload" as="image" href="/videos/screen-video/poster.jpg" />
</svelte:head>

<section class="hero-image desktop" style="background-image: url('/videos/hero-landscape/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">
  <video
    bind:this={videoLandscapeElement}
    class:ready={videoLandscapeReady}
    poster="/videos/hero-landscape/poster.jpg"
    autoplay
    muted
    loop
    playsinline
    draggable="false"
  />
</section>


<section class="hero-image mobile" style="background-image: url('/videos/hero-portrait/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">
  <video
    bind:this={videoPortraitElement}
    class:ready={videoPortraitReady}
    poster="/videos/hero-portrait/poster.jpg"
    autoplay
    muted
    loop
    playsinline
    draggable="false"
  />
</section>

<section class="dark" id="hero">
  <div class="container">
    <h1>comma four</h1>
    <h2 class="muted">An AI upgrade for your car</h2>
    <Grid columns={2} rowGap="3rem">
      <div class="device-image-container">
        <img
          src={DeviceImage}
          alt="comma four device"
        />
        <video
          bind:this={screenVideoElement}
          class:ready={screenVideoReady}
          poster="/videos/screen-video/poster.jpg"
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
        <LinkButton href="shop/comma-four" fullWidth={true} style="accent">
          Buy now
        </LinkButton>
      </div>
    </Grid>
    <h1 class="mt-4">Buy it, plug it in, and engage.</h1>
    <h3 class="muted">
      comma four works with the car you already drive. It's active driver assistance
      for your Toyota, Honda, and more.
    </h3>
  </div>
</section>

<section class="light" id="compatibility">
  <div class="container">
    <h1 class="mb-7 sm-mb-3">openpilot can drive for hours without driver action.</h1>
    <Grid columns={2} rowGap="3rem">
      <h1>
        It works on {vehicleCountText} car models from 27 brands.
        <span class="muted">Is your car supported?</span>
      </h1>
      <div>
        <FeaturedCarsList />
        <LinkButton href="/vehicles" style="primary" fullWidth={true}>
          View all {vehicleCountText} cars
        </LinkButton>
      </div>
    </Grid>
  </div>
</section>

<section class="dark" id="social">
  <div class="container">
    <SectionHeader leftLabel="comma" rightLabel="is real" />
    <h1>
      300+ million miles driven and 20k users. Our GitHub repo has
      <a href="https://github.com/commaai/openpilot" target="_blank" class="highlight">{Math.floor(githubStars / 10000) * 10}k stars</a>.
    </h1>
    <FeaturedArticles />
    <h1>
      Follow us on 𝕏
      <a href="https://twitter.com/comma_ai" target="_blank" class="highlight">@comma_ai</a>.
    </h1>
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
  .hero-image {
    position: relative;
    /* Behind nav bar */
    margin: -66px 0 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 0;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &.desktop {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    &.mobile {
      height: unset;
      aspect-ratio: 3 / 4;
      @media screen and (min-width: 769px) {
        display: none;
      }
    }

    & video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      opacity: 0;
      transition: opacity 0.3s ease-in;

      &.ready {
        opacity: 1;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
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

  #hero {
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
