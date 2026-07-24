<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js';
  import LinkButton from "$lib/components/LinkButton.svelte";
  import FeaturedCarsList from "$lib/components/FeaturedCarsList.svelte";
  import FeaturedArticles from "$lib/components/FeaturedArticles.svelte";
  import HomeHeroOverlay from "$lib/components/HomeHeroOverlay.svelte";
  import SectionHeader from "../lib/components/SectionHeader.svelte";
  import Grid from "$lib/components/Grid.svelte";

  import DeviceImage from "$lib/images/products/comma-four/four_front.png";
  import DeviceScreenOnImage from "$lib/images/products/comma-four/four_screen_on.png";
  import DeviceAngledImage from "$lib/images/products/comma-four/four_angled.png";
  import DeviceBackImage from "$lib/images/products/comma-four/four_back.png";
  import DeviceSideImage from "$lib/images/products/comma-four/four_side.png";
  import SetupVideo from "$lib/images/setup/comma-four/setup-boomerang.mp4";
  import MapDesktop from "$lib/images/home/map-desktop.svg";
  import MapMobile from "$lib/images/home/map-mobile.svg";
  import LaneCenteringIcon from "$lib/icons/features/lane-centering.svg?raw";
  import AdaptiveCruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import ReducedFatigueIcon from "$lib/icons/features/moon.svg?raw";
  import CloudDashcamIcon from "$lib/icons/features/recordings.svg?raw";

  const CDN_BASE = "https://3comma.net";
  const HeroLandscapeVideo = `${CDN_BASE}/hero-landscape/hero-landscape.m3u8`;
  const HeroPortraitVideo = `${CDN_BASE}/hero-portrait/hero-portrait.m3u8`;
  const ScreenVideo = `${CDN_BASE}/screen-video/screen-video.m3u8`;
  const commaFourFeatures = [
    {
      icon: LaneCenteringIcon,
      label: "lane centering",
    },
    {
      icon: AdaptiveCruiseIcon,
      label: "adaptive cruise",
    },
    {
      icon: ReducedFatigueIcon,
      label: "reduced fatigue",
    },
    {
      icon: CloudDashcamIcon,
      label: "cloud dashcam",
    },
  ];
  const deviceViews = [
    {
      image: DeviceImage,
      thumbnail: DeviceScreenOnImage,
      label: "front view",
      hasLiveScreen: true,
    },
    {
      image: DeviceAngledImage,
      thumbnail: DeviceAngledImage,
      label: "three-quarter view",
    },
    {
      image: DeviceSideImage,
      thumbnail: DeviceSideImage,
      label: "side view",
    },
    {
      image: DeviceBackImage,
      thumbnail: DeviceBackImage,
      label: "rear view",
    },
  ];

  let videoLandscapeElement;
  let videoLandscapeReady = false;
  let videoPortraitElement;
  let videoPortraitReady = false;
  let screenVideoElement;
  let screenVideoReady = false;
  let selectedDeviceViewIndex = 0;
  $: selectedDeviceView = deviceViews[selectedDeviceViewIndex];

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

<section class="hero-image desktop" on:dragstart={handleDragStart} aria-label="comma driving highlights">
  <div class="hero-video" style="background-image: url('{CDN_BASE}/hero-landscape/poster.jpg');">
    <video
      bind:this={videoLandscapeElement}
      class:ready={videoLandscapeReady}
      poster="{CDN_BASE}/hero-landscape/poster.jpg"
      autoplay
      muted
      loop
      playsinline
      draggable="false"
      aria-hidden="true"
    />
  </div>
  <HomeHeroOverlay />
</section>


<section class="hero-image mobile" on:dragstart={handleDragStart} aria-label="comma driving highlights">
  <div class="hero-video" style="background-image: url('{CDN_BASE}/hero-portrait/poster.jpg');">
    <video
      bind:this={videoPortraitElement}
      class:ready={videoPortraitReady}
      poster="{CDN_BASE}/hero-portrait/poster.jpg"
      autoplay
      muted
      loop
      playsinline
      draggable="false"
      aria-hidden="true"
    />
  </div>
  <HomeHeroOverlay />
</section>

<section class="dark" id="hero">
  <div class="container">
    <Grid
      columns={2}
      columnGap="clamp(3rem, 7vw, 8rem)"
      rowGap="3rem"
      alignItems="center"
      size="large"
      wrapMode="single"
    >
      <div class="comma-four-content">
        <h1>meet comma four</h1>
        <h2>make driving chill with a hands-off, eyes-on driving experience</h2>

        <div class="feature-grid desktop-features">
          {#each commaFourFeatures as feature}
            <div class="feature-item">
              <span class="feature-icon">
                {@html feature.icon}
              </span>
              <span>{feature.label}</span>
            </div>
          {/each}
        </div>

        <a class="comma-four-cta desktop-cta" href="/shop/comma-four">
          <span>buy now for $999 risk-free</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M15 19L13.59 17.59L18.17 13L2 13V11L18.17 11L13.58 6.41L15 5L22 12L15 19Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>

      <div class="device-gallery">
        <div class="device-image-container">
          <img
            class="device-main-image"
            src={selectedDeviceView.image}
            alt={`comma four ${selectedDeviceView.label}`}
          />
          <video
            bind:this={screenVideoElement}
            class:ready={screenVideoReady}
            class:selected={selectedDeviceView.hasLiveScreen}
            poster="{CDN_BASE}/screen-video/poster.jpg"
            autoplay
            muted
            loop
            playsinline
            draggable="false"
            class="screen-video-overlay"
            aria-hidden="true"
          />
        </div>

        <div class="device-thumbnails" role="group" aria-label="Choose a comma four view">
          {#each deviceViews as view, index}
            {#if index !== selectedDeviceViewIndex}
              <button
                type="button"
                on:click={() => selectedDeviceViewIndex = index}
                aria-label={`Show comma four ${view.label}`}
              >
                <img src={view.thumbnail} alt="" />
              </button>
            {/if}
          {/each}
        </div>
      </div>

      <div class="feature-grid mobile-features">
        {#each commaFourFeatures as feature}
          <div class="feature-item">
            <span class="feature-icon">
              {@html feature.icon}
            </span>
            <span>{feature.label}</span>
          </div>
        {/each}
      </div>

      <a class="comma-four-cta mobile-cta" href="/shop/comma-four">
        <span>buy now for $999 risk-free</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 19L13.59 17.59L18.17 13L2 13V11L18.17 11L13.58 6.41L15 5L22 12L15 19Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </Grid>
  </div>
</section>

<section class="light" id="compatibility">
  <div class="container">
    <div class="setup-grid">
      <div class="setup-overview">
        <h1>
          <span>plug it in yourself,</span>
          <span>hit the road in 15 minutes.</span>
        </h1>
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
    background: black;

    &.desktop {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    &.mobile {
      display: flex;
      flex-direction: column;
      height: auto;
      min-height: 100vh;
      min-height: 100dvh;

      @media screen and (min-width: 769px) {
        display: none;
      }
    }

    & .hero-video {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      inset: 0;
      position: absolute;

      & video {
        display: block;
        height: 100%;
        object-fit: cover;
        object-position: center;
        opacity: 0;
        transition: opacity 0.3s ease-in;
        user-select: none;
        width: 100%;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;

        &.ready {
          opacity: 1;
        }
      }

      &::before,
      &::after {
        content: '';
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      &::before {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.9), transparent);
        bottom: 0;
        left: 0;
        top: 0;
        width: min(52rem, 42%);
      }

      &::after {
        background: linear-gradient(to bottom, transparent, black);
        bottom: 0;
        height: 11.25rem;
        left: 0;
        right: 0;
      }
    }

    @media screen and (max-width: 768px) {
      & .hero-video {
        aspect-ratio: 402 / 465;
        flex: none;
        inset: auto;
        min-height: 0;
        overflow: hidden;
        position: relative;
        width: 100%;

        &::before {
          display: none;
        }

        &::after {
          height: 4.4375rem;
        }
      }
    }
  }

  #hero {
    padding-bottom: 5rem;
    padding-top: 2rem;

    & .comma-four-content {
      min-width: 0;
    }

    & .comma-four-content h1 {
      font-size: clamp(3rem, 4vw, 4rem);
      letter-spacing: -0.04em;
      line-height: 1;
      margin-bottom: 1rem;
    }

    & .comma-four-content h2 {
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: -0.04em;
      line-height: 1.2;
      margin: 0;
      max-width: 37rem;
      opacity: 0.65;
    }

    & .feature-grid {
      display: grid;
      gap: 2.25rem 2.5rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin: 3.5rem 0;
    }

    & .mobile-features {
      display: none;
    }

    & .feature-item {
      align-items: center;
      color: white;
      display: flex;
      gap: 1.25rem;
      min-width: 0;

      & .feature-icon {
        align-items: center;
        display: flex;
        flex: 0 0 4.5rem;
        height: 4.125rem;
        justify-content: center;
      }

      & .feature-icon :global(svg) {
        display: block;
        height: 3rem;
        width: 3rem;
      }

      & > span:last-child {
        color: white;
        font-size: 1.5rem;
        font-weight: 400;
        letter-spacing: -0.04em;
        line-height: 1.1;
      }
    }

    & .comma-four-cta {
      align-items: center;
      background-color: var(--color-accent);
      box-sizing: border-box;
      color: black;
      display: flex;
      font-size: 1.5rem;
      font-weight: 500;
      gap: 0.75rem;
      justify-content: center;
      letter-spacing: -0.04em;
      max-width: 36.875rem;
      min-height: 4.3125rem;
      padding: 0.75rem 1.5rem;
      transition: background-color 0.2s;
      width: 100%;

      & span {
        color: black;
      }

      & svg {
        flex: 0 0 auto;
      }
    }

    & .mobile-cta {
      display: none;
    }

    @media (hover: hover) and (pointer: fine) {
      & .comma-four-cta:hover {
        background-color: var(--color-accent-hover);
      }
    }

    & .comma-four-cta:active {
      background-color: var(--color-accent-hover);
    }

    @media screen and (max-width: 1024px) {
      & .device-gallery {
        margin: 0 auto;
        max-width: 48rem;
      }
    }

    @media screen and (max-width: 768px) {
      padding-bottom: 2.5rem;
      padding-top: 2.5rem;

      & .container {
        width: calc(100% - 2.5rem);
      }

      & .comma-four-content h1 {
        font-size: 2.3rem;
        margin-bottom: 0.75rem;
      }

      & .comma-four-content h2 {
        font-size: 1.125rem;
        line-height: 1.25;
      }

      & .feature-grid {
        gap: 1.5rem 1rem;
        margin: 2.25rem 0;
      }

      & .desktop-features {
        display: none;
      }

      & .mobile-features {
        display: grid;
        margin: 0;
      }

      & .feature-item {
        gap: 0.75rem;

        & .feature-icon {
          flex-basis: 2.5rem;
          height: 2.25rem;
        }

        & .feature-icon :global(svg) {
          height: 2rem;
          width: 2rem;
        }

        & > span:last-child {
          font-size: 1rem;
        }
      }

      & .comma-four-cta {
        font-size: 1rem;
        justify-content: space-between;
        min-height: 3.6875rem;
        padding: 0.75rem 1.25rem;
      }

      & .desktop-cta {
        display: none;
      }

      & .mobile-cta {
        display: flex;
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
      font-size: clamp(2rem, 3.3vw, 3.5rem);
      margin-bottom: 3.75rem;

      & span {
        display: block;
        white-space: nowrap;
      }
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

    @media screen and (min-width: 769px) and (max-width: 1024px) {
      & .setup-overview h1 {
        font-size: 2.6vw;
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

    @media screen and (max-width: 360px) {
      & .setup-overview h1 {
        font-size: 1.5rem;
      }
    }
  }

  #social {
    & .map-headline {
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

  .device-gallery {
    min-width: 0;
    width: 100%;
  }

  .device-image-container {
    position: relative;
    width: 100%;
    transform: scale(1.1);
  }

  .device-main-image {
    display: block;
    width: 100%;
    height: auto;
  }

  .device-image-container .screen-video-overlay {
    position: absolute;
    left: 23.21%; /* 780 / 3360 */
    top: 63.97%; /* 1433 / 2240 */
    width: 40.21%; /* 1351 / 3360 */
    height: 25.80%; /* 578 / 2240 */
    mix-blend-mode: screen;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in;
    visibility: hidden;
  }

  .device-image-container .screen-video-overlay.ready.selected {
    opacity: 1;
    visibility: visible;
  }

  .device-thumbnails {
    align-items: center;
    display: flex;
    gap: 0.125rem;
    justify-content: center;
    margin: -0.5rem auto 0;
    position: relative;
    z-index: 1;
  }

  .device-thumbnails button {
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    height: clamp(5rem, 6vw, 6.9375rem);
    opacity: 0.7;
    padding: 0;
    transition: border-color 0.2s, opacity 0.2s;
    width: clamp(5rem, 6vw, 6.9375rem);
  }

  .device-thumbnails button:hover,
  .device-thumbnails button:focus-visible {
    opacity: 1;
  }

  .device-thumbnails button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .device-thumbnails img {
    display: block;
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .device-thumbnails {
      margin-top: -1rem;
    }

    .device-thumbnails button {
      height: 5.5625rem;
      width: 5.5625rem;
    }
  }
</style>
