<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js';
  import LinkButton from "$lib/components/LinkButton.svelte";
  import FeaturedCarsList from "$lib/components/FeaturedCarsList.svelte";
  import FeaturedArticles from "$lib/components/FeaturedArticles.svelte";
  import SectionHeader from "../lib/components/SectionHeader.svelte";
  import Grid from "$lib/components/Grid.svelte";

  import DeviceImage from "$lib/images/products/comma-four/four_dark.png";
  import SetupVideo from "$lib/images/setup/comma-four/setup-boomerang.mp4";
  import MapDesktop from "$lib/images/home/map-desktop.svg";
  import MapMobile from "$lib/images/home/map-mobile.svg";
  import LaneCenteringIcon from "$lib/icons/features/lane-centering.svg?raw";
  import AdaptiveCruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import OtaUpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import LocationIcon from "$lib/icons/features/location.svg?raw";
  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";

  const CDN_BASE = "https://3comma.net";
  const HeroLandscapeVideo = `${CDN_BASE}/hero-landscape/hero-landscape.m3u8`;
  const HeroPortraitVideo = `${CDN_BASE}/hero-portrait/hero-portrait.m3u8`;
  const ScreenVideo = `${CDN_BASE}/screen-video/screen-video.m3u8`;

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
  <link rel="preload" as="image" href="{CDN_BASE}/hero-landscape/poster.jpg" />
  <link rel="preload" as="image" href="{CDN_BASE}/hero-portrait/poster.jpg" />
  <link rel="preload" as="image" href="{CDN_BASE}/screen-video/poster.jpg" />
</svelte:head>

<section class="hero-image desktop" style="background-image: url('{CDN_BASE}/hero-landscape/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">
  <video
    bind:this={videoLandscapeElement}
    class:ready={videoLandscapeReady}
    poster="{CDN_BASE}/hero-landscape/poster.jpg"
    autoplay
    muted
    loop
    playsinline
    draggable="false"
  />
</section>


<section class="hero-image mobile" style="background-image: url('{CDN_BASE}/hero-portrait/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">
  <video
    bind:this={videoPortraitElement}
    class:ready={videoPortraitReady}
    poster="{CDN_BASE}/hero-portrait/poster.jpg"
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
    <h2 class="muted">Hands free driving for the car you already have</h2>
    <Grid columns={2} rowGap="3rem">
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
    <h1 class="mt-4">Make driving chill.</h1>
    <h3 class="muted">
      comma helps control the steering, braking and acceleration of the car you already drive. It's upgraded active driver assistance
      for your Toyota, Hyundai, Ford, and more.
    </h3>
  </div>
</section>

<section class="light" id="compatibility">
  <div class="container">
    <div class="setup-grid">
      <div class="setup-overview">
        <h1>plug it in yourself,<br />hit the road in 15 mins.</h1>
        <div class="setup-media">
          <video
            src={SetupVideo}
            aria-label="A stop-motion demonstration of installing a comma device"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
        </div>
      </div>
      <div class="compatibility-content">
        <div class="featured-cars">
          <FeaturedCarsList />
        </div>
        <div class="setup-cta">
          <LinkButton href="/vehicles" style="primary" fullWidth={true}>
            see all supported cars
          </LinkButton>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="dark" id="social">
  <div class="container">
    <h1 class="map-headline">
      comma runs <a href="/openpilot" class="highlight">open source software</a>, driving all over the world with no subscription needed
    </h1>
    <figure class="activity-map">
      <figcaption>daily active users</figcaption>
      <picture>
        <source media="(max-width: 768px)" srcset={MapMobile} />
        <img
          src={MapDesktop}
          alt="Map showing daily active comma users around the world"
          width="1120"
          height="549"
        />
      </picture>
    </figure>
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

  #compatibility {
    padding-top: 3rem;

    & .setup-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.12fr) minmax(22rem, 1fr);
      column-gap: clamp(4rem, 10vw, 14rem);
      align-items: start;
    }

    & .setup-overview h1 {
      margin-bottom: 3.75rem;
    }

    & .setup-media {
      aspect-ratio: 16 / 9;
      overflow: hidden;
      width: 100%;

      & video {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }

    & .compatibility-content {
      display: flex;
      flex-direction: column;
    }

    & .setup-cta {
      margin-top: 1rem;

      & :global(a) {
        font-weight: 500;
        letter-spacing: -0.04em;
        text-transform: none;
      }
    }

    @media screen and (max-width: 1024px) {
      & .setup-grid {
        column-gap: 4rem;
      }
    }

    @media screen and (max-width: 768px) {
      padding-top: 1.5rem;
      padding-bottom: 0.5rem;

      & .container {
        width: calc(100% - 2.5rem);
      }

      & .setup-grid {
        display: flex;
        flex-direction: column;
      }

      & .setup-overview h1 {
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
      }

      & .compatibility-content {
        width: 100%;
      }

      & .setup-cta {
        margin-bottom: 1rem;
        margin-top: 1.5rem;
        order: -1;

        & :global(a) {
          min-height: 3.6875rem;
          padding: 1rem 1.25rem;
        }
      }
    }
  }

  #social {
    & .map-headline {
      font-weight: 700;
      letter-spacing: -0.04em;
      margin-bottom: 0;
    }

    & .activity-map {
      margin: 5rem auto 0;
      max-width: 70rem;
      width: 100%;

      & figcaption {
        color: var(--color-foreground);
        font-size: 1.5rem;
        font-weight: 400;
        letter-spacing: -0.04em;
        line-height: 1;
        margin-bottom: 1.5rem;
        opacity: 0.65;
        text-align: center;
      }

      & picture,
      & img {
        display: block;
        width: 100%;
      }

      & img {
        height: auto;
      }
    }

    @media screen and (max-width: 768px) {
      & .container {
        width: calc(100% - 2.5rem);
      }

      & .map-headline {
        font-size: 1.75rem;
      }

      & .activity-map {
        margin-top: 2.5rem;
        max-width: 21.1875rem;

        & figcaption {
          display: none;
        }
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
