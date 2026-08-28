<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js/light';
  import FeaturedCarsList from "$lib/components/FeaturedCarsList.svelte";
  import FeaturedArticles from "$lib/components/FeaturedArticles.svelte";
  import FeaturedTweets from "$lib/components/FeaturedTweets.svelte";
  import HomeHeroOverlay from "$lib/components/HomeHeroOverlay.svelte";
  import Grid from "$lib/components/Grid.svelte";

  import DeviceImage from "$lib/images/products/comma-four/four_front.png";
  import DeviceScreenOnImage from "$lib/images/products/comma-four/four_screen_on.png";
  import DeviceAngledImage from "$lib/images/products/comma-four/four_angled.png";
  import DeviceBackImage from "$lib/images/products/comma-four/four_back.png";
  import DeviceSideImage from "$lib/images/products/comma-four/four_side.png";
  import SetupVideo from "$lib/images/setup/comma-four/setup-stopmotion.mp4";
  import MapActivity from "$lib/images/home/map-activity-2x.png";
  import ArrowRight from "$lib/icons/arrow-right.svg?raw";
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
  let heroVideoElement;
  let heroVideoReady = false;
  let screenVideoElement;
  let screenVideoReady = false;
  let setupVideoElement;
  let selectedDeviceViewIndex = 0;
  $: selectedDeviceView = deviceViews[selectedDeviceViewIndex];

  function initializeHLS(videoEl, src, onReady) {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, onReady);

      return () => {
        hls.off(Hls.Events.MANIFEST_PARSED, onReady);
        hls.destroy();
      };
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = src;
      videoEl.addEventListener('loadedmetadata', onReady, { once: true });

      return () => {
        videoEl.removeEventListener('loadedmetadata', onReady);
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      };
    }

    return () => {};
  }

  onMount(() => {
    const mobileHeroQuery = window.matchMedia('(max-width: 768px)');
    const handleHeroPlaying = () => heroVideoReady = true;
    const handleScreenPlaying = () => screenVideoReady = true;
    let destroyHeroHLS = () => {};
    let destroyScreenHLS = () => {};
    let setupVideoTimer;

    const playVideo = (videoEl) => {
      videoEl.play().catch(() => {});
    };

    const loadHeroVideo = () => {
      destroyHeroHLS();
      heroVideoReady = false;
      const source = mobileHeroQuery.matches ? HeroPortraitVideo : HeroLandscapeVideo;
      destroyHeroHLS = initializeHLS(heroVideoElement, source, () => playVideo(heroVideoElement));
    };

    heroVideoElement.addEventListener('playing', handleHeroPlaying);
    mobileHeroQuery.addEventListener('change', loadHeroVideo);
    loadHeroVideo();

    if (screenVideoElement) {
      screenVideoElement.addEventListener('playing', handleScreenPlaying);
      destroyScreenHLS = initializeHLS(
        screenVideoElement,
        ScreenVideo,
        () => playVideo(screenVideoElement),
      );
    }

    const loadSetupVideo = () => {
      if (!setupVideoElement) return;
      setupVideoElement.src = SetupVideo;
      playVideo(setupVideoElement);
    };

    if (document.readyState === 'complete') {
      setupVideoTimer = window.setTimeout(loadSetupVideo, 0);
    } else {
      window.addEventListener('load', loadSetupVideo, { once: true });
    }

    return () => {
      mobileHeroQuery.removeEventListener('change', loadHeroVideo);
      heroVideoElement.removeEventListener('playing', handleHeroPlaying);
      screenVideoElement?.removeEventListener('playing', handleScreenPlaying);
      destroyHeroHLS();
      destroyScreenHLS();
      window.removeEventListener('load', loadSetupVideo);
      window.clearTimeout(setupVideoTimer);
      setupVideoElement?.pause();
    };
  });

  function handleDragStart(e) {
    e.preventDefault();
  }
</script>

<svelte:head>
  <link rel="preload" as="image" href="{CDN_BASE}/hero-landscape/poster.jpg" media="(min-width: 769px)" />
  <link rel="preload" as="image" href="{CDN_BASE}/hero-portrait/poster.jpg" media="(max-width: 768px)" />
  <link rel="preload" as="image" href="{CDN_BASE}/screen-video/poster.jpg" />
</svelte:head>

<section
  class="hero-image"
  on:dragstart={handleDragStart}
  aria-label="comma driving highlights"
  style="--hero-landscape-poster: url('{CDN_BASE}/hero-landscape/poster.jpg'); --hero-portrait-poster: url('{CDN_BASE}/hero-portrait/poster.jpg');"
>
  <div class="hero-video">
    <video
      bind:this={heroVideoElement}
      class:ready={heroVideoReady}
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

<section class="dark" id="hero">
  <div class="container">
    <div class="two-column-layout meet-grid">
      <div class="comma-four-content">
        <h1>meet comma four</h1>
        <h2>make driving chill with a hands-off, eyes-on driving experience</h2>
      </div>

      <div class="device-gallery">
        <div class="device-image-container">
          <img
            class="device-main-image"
            src={selectedDeviceView.image}
            alt={`comma four ${selectedDeviceView.label}`}
            loading="lazy"
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
            <button
              type="button"
              class:selected={index === selectedDeviceViewIndex}
              on:click={() => selectedDeviceViewIndex = index}
              aria-label={`Show comma four ${view.label}`}
              aria-pressed={index === selectedDeviceViewIndex}
            >
              <img src={view.thumbnail} alt="" loading="lazy" />
            </button>
          {/each}
        </div>
      </div>

      <div class="feature-grid">
        {#each commaFourFeatures as feature}
          <div class="feature-item">
            <span class="feature-icon">
              {@html feature.icon}
            </span>
            <span>{feature.label}</span>
          </div>
        {/each}
      </div>

      <a class="homepage-cta comma-four-cta" href="/shop/comma-four">
        <span>buy now for $999</span>
        <span class="cta-arrow" aria-hidden="true">{@html ArrowRight}</span>
      </a>
    </div>
  </div>
</section>

<section class="light" id="compatibility">
  <div class="container">
    <div class="two-column-layout setup-grid">
      <h1 class="setup-heading">
        <span>plug it in & hit the</span>
        <span>road in 15 minutes</span>
      </h1>
      <div class="setup-media">
        <video
          bind:this={setupVideoElement}
          aria-label="A stop-motion demonstration of installing a comma device"
          muted
          loop
          playsinline
          preload="none"
        ></video>
      </div>
      <div class="compatibility-list">
        <FeaturedCarsList />
      </div>
      <div class="setup-cta">
        <a class="homepage-cta dark-cta" href="/vehicles">
          <span>see all supported cars</span>
          <span class="cta-arrow" aria-hidden="true">{@html ArrowRight}</span>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="dark" id="social">
  <div class="container">
    <h1 class="map-headline">
      comma runs <a href="/openpilot" class="highlight">open source software,</a>&nbsp;driving all over the world with no subscription needed
    </h1>
    <figure class="activity-map">
      <div class="map-preview">
        <img
          src={MapActivity}
          alt="Map showing comma driving activity around the world"
          width="2240"
          height="1098"
          loading="lazy"
        />
      </div>
    </figure>
    <FeaturedArticles />
    <h1>
      follow us on 𝕏
      <a href="https://twitter.com/comma_ai" target="_blank" class="highlight">@comma_ai</a>
    </h1>
    <FeaturedTweets />
  </div>
</section>


<section class="light" id="recruit">
  <div class="container">
    <h1 class="mb-5 sm-mb-3">join us in building the future</h1>
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
        <a class="homepage-cta dark-cta" href="/jobs">
          <span>see open positions</span>
          <span class="cta-arrow" aria-hidden="true">{@html ArrowRight}</span>
        </a>
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
    -webkit-user-drag: none;
    background: black;

    & .hero-video {
      background-image: var(--hero-landscape-poster);
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
      display: flex;
      flex-direction: column;
      height: auto;
      min-height: 100vh;
      min-height: 100svh;

      & .hero-video {
        aspect-ratio: 402 / 465;
        background-image: var(--hero-portrait-poster);
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

  section:not(.hero-image) {
    padding-block: 5rem;
  }

  .two-column-layout {
    column-gap: clamp(3rem, 7vw, 8rem);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  .homepage-cta {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-size: 1.5rem;
    font-weight: 500;
    gap: 0.75rem;
    justify-content: center;
    letter-spacing: -0.04em;
    min-height: 4.3125rem;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.2s, opacity 0.2s;
    width: 100%;

    & span {
      color: inherit;
    }

    & .cta-arrow {
      display: block;
      flex: 0 0 auto;
      height: 1.5rem;
      width: 1.5rem;
    }

  }

  .cta-arrow :global(svg) {
    display: block;
    height: 100%;
    width: 100%;
  }

  :is(
    #hero .comma-four-content h1,
    #compatibility .setup-heading,
    #social h1,
    #recruit > .container > h1
  ) {
    font-size: clamp(2.3rem, 4vw, 4rem);
  }

  .dark-cta {
    background: black;
    color: white;
  }

  @media (hover: hover) and (pointer: fine) {
    .dark-cta:hover {
      opacity: 0.75;
    }
  }

  .dark-cta:active {
    opacity: 0.75;
  }

  @media screen and (max-width: 768px) {
    section:not(.hero-image) {
      padding-block: 1.25rem;
    }

    section:not(.hero-image) > .container {
      width: calc(100% - 2.5rem);
    }

    .two-column-layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .homepage-cta {
      font-size: 1rem;
      justify-content: space-between;
      min-height: 3.6875rem;
      padding: 0.75rem 1.25rem;
    }
  }

  #hero {
    & .meet-grid {
      align-items: start;
      grid-template-areas:
        "copy gallery"
        "features gallery"
        "cta gallery";
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    & .comma-four-content {
      grid-area: copy;
      min-width: 0;
      width: 100%;
    }

    & .comma-four-content h1 {
      letter-spacing: -0.04em;
      line-height: 1;
      margin-bottom: 1rem;
    }

    & .comma-four-content h2 {
      font-size: clamp(1.125rem, 2vw, 1.5rem);
      font-weight: 400;
      letter-spacing: -0.04em;
      line-height: 1.2;
      margin: 0;
      max-width: 37rem;
      opacity: 0.65;
    }

    & .feature-grid {
      display: grid;
      gap: clamp(0.875rem, 2.5vw, 2.25rem) clamp(1rem, 2.75vw, 2.5rem);
      grid-area: features;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, max(16rem, 45%)), 1fr));
      margin: clamp(1.5rem, 4vw, 3.5rem) 0;
      width: 100%;
    }

    & .feature-item {
      align-items: center;
      color: white;
      display: flex;
      gap: clamp(0.75rem, 1.5vw, 1.25rem);
      justify-self: start;
      min-width: 0;

      & .feature-icon {
        align-items: center;
        display: flex;
        flex: 0 0 clamp(2.5rem, 5vw, 4.5rem);
        height: clamp(2.25rem, 4.5vw, 4.125rem);
        justify-content: center;
      }

      & > span:last-child {
        color: white;
        font-size: clamp(1rem, 2vw, 1.5rem);
        font-weight: 400;
        letter-spacing: -0.04em;
        line-height: 1.1;
        white-space: nowrap;
      }
    }

    & .comma-four-cta {
      background-color: var(--color-accent);
      color: black;
      grid-area: cta;
    }

    @media (hover: hover) and (pointer: fine) {
      & .comma-four-cta:hover {
        background-color: var(--color-accent-hover);
      }
    }

    & .comma-four-cta:active {
      background-color: var(--color-accent-hover);
    }

    @media screen and (max-width: 599px) {
      & .meet-grid {
        grid-template-areas:
          "copy"
          "gallery"
          "features"
          "cta";
        grid-template-columns: minmax(0, 1fr);
        row-gap: 2rem;
      }

      & .feature-grid {
        gap: 1.5rem 1rem;
        margin: 0;
      }
    }
  }

  #hero .feature-icon :global(svg) {
    display: block;
    height: clamp(2rem, 3.3vw, 3rem);
    width: clamp(2rem, 3.3vw, 3rem);
  }

  #compatibility {
    & .setup-heading,
    & .compatibility-list,
    & .setup-cta {
      min-width: 0;
      width: 100%;
    }

    & .setup-grid {
      grid-template-areas:
        "heading cars"
        "media cars"
        "media cta";
      grid-template-rows: auto minmax(0, 1fr) auto;
    }

    & .setup-heading {
      grid-area: heading;
      margin-bottom: 3.75rem;

      & span {
        display: block;
      }
    }

    & .setup-media {
      aspect-ratio: 16 / 9;
      grid-area: media;
      overflow: hidden;
      width: 100%;

      & video {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
      }
    }

    & .compatibility-list {
      contain: size;
      grid-area: cars;
      min-height: 0;
      overflow: hidden;
    }

    & .setup-cta {
      align-self: end;
      grid-area: cta;
      margin-top: 1rem;
    }

    @media screen and (max-width: 1100px) {
      & .setup-media {
        aspect-ratio: 1;
      }
    }

    @media screen and (max-width: 768px) {
      & .setup-grid {
        grid-template-areas:
          "heading"
          "media"
          "cars"
          "cta";
        grid-template-rows: auto;
        row-gap: 2rem;
      }

      & .setup-heading {
        margin-bottom: -0.5rem;
      }

      & .compatibility-list {
        contain: none;
        overflow: visible;
      }

      & .setup-cta {
        margin-top: -1rem;
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

      & .map-preview,
      & img {
        display: block;
        width: 100%;
      }

      & .map-preview {
        aspect-ratio: 1120 / 549;
      }

      & img {
        height: auto;
      }
    }

    @media screen and (max-width: 768px) {
      & .activity-map {
        margin-top: 2.5rem;
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
    align-self: center;
    grid-area: gallery;
    min-width: 0;
    width: 100%;
  }

  .device-image-container {
    position: relative;
    width: 100%;
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
    margin: 0.25rem auto 0;
    position: relative;
    z-index: 1;
  }

  .device-thumbnails button {
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    height: clamp(4rem, 6vw, 6.9375rem);
    opacity: 0.7;
    padding: 0;
    transition: opacity 0.2s;
    width: clamp(4rem, 6vw, 6.9375rem);
  }

  .device-thumbnails button:hover,
  .device-thumbnails button:focus-visible,
  .device-thumbnails button.selected {
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
      margin-top: -0.25rem;
    }

    .device-thumbnails button {
      height: clamp(4rem, 20vw, 5.5625rem);
      width: clamp(4rem, 20vw, 5.5625rem);
    }
  }

</style>
