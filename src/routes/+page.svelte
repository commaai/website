<script>
  import { onMount, tick } from 'svelte';
  import Hls from 'hls.js';
  import { vehicleCountText } from '$lib/constants/vehicles.js';
  import Grid from "$lib/components/Grid.svelte";

  import FourFront from "$lib/images/products/comma-four/four_screen_on.png";
  import AdeebDm from "$lib/images/home/adeeb-dm.png";

  import PlugImage from "$lib/images/home/plug-n-play/plug.png";
  import StickImage from "$lib/images/home/plug-n-play/stick.png";
  import PowerImage from "$lib/images/home/plug-n-play/power.png";
  import RemountImage from "$lib/images/home/plug-n-play/remount.png";

  import Map from "$lib/images/home/map.png";
  import LinkArrow from "$lib/icons/link_arrow.svg?raw";
  import NextIcon from "$lib/icons/ui/next.svg?raw";
  import PlayIcon from "$lib/icons/ui/play-new.svg?raw";
  import ToyotaLogo from "$lib/icons/brands/toyota.svg?raw";
  import HyundaiLogo from "$lib/icons/brands/hyundai.svg?raw";
  import HondaLogo from "$lib/icons/brands/honda.svg?raw";
  import ChevroletLogo from "$lib/icons/brands/chevrolet.svg?raw";
  import ChryslerLogo from "$lib/icons/brands/chrysler.svg?raw";

  const LandscapeVideo = "/videos/hero-landscape/hero-landscape.m3u8";
  const PortraitVideoHLS = "/videos/hero-portrait/hero-portrait.m3u8";

  let landscapeVideoElement;
  let landscapeVideoReady = false;
  let portraitVideoElement;
  let portraitVideoReady = false;
  let carouselVideoReady = [false, false, false];

  // Video carousel state
  let currentVideoIndex = 0;
  let videoElements = [];
  const videos = [
    { src: "/videos/keeps-left/keeps-left.m3u8", poster: "/videos/keeps-left/poster.jpg", label: "scenic", subtitle: "experimental mode" },
    { src: "/videos/offramp/offramp.m3u8", poster: "/videos/offramp/poster.jpg", label: "offramp", subtitle: "experimental mode" },
    { src: "/videos/low-speed/low-speed.m3u8", poster: "/videos/low-speed/poster.jpg", label: "local", subtitle: "experimental mode" }
  ];

  function switchToVideo(index) {
    currentVideoIndex = index;
  }

  function playNextVideo() {
    if (currentVideoIndex < videos.length - 1) {
      switchToVideo(currentVideoIndex + 1);
    } else {
      switchToVideo(0); // Loop back to first
    }
  }


  // Pause inactive videos and play active one
  $: {
    videoElements.forEach((videoEl, index) => {
      if (videoEl) {
        if (index === currentVideoIndex) {
          // Lazy-load video if not initialized yet (for videos other than the first)
          if (index !== 0 && !hlsInstances[index] && !videoEl.src) {
            initializeVideo(videoEl, index);
          }
          if (videoEl.paused) {
            videoEl.currentTime = 0;
            videoEl.play().catch(() => {
              // Ignore play() errors (e.g., autoplay restrictions)
            });
          }
        } else {
          videoEl.pause();
        }
      }
    });
  }

  let hlsInstances = [];

  // HLS configuration optimized for short clips (1 minute max)
  const hlsConfig = {
    maxBufferLength: 5, // Maximum buffer length in seconds (clips are ~1min max)
    maxMaxBufferLength: 10, // Maximum buffer length when buffer is low
    maxBufferSize: 5 * 1000 * 1000, // Maximum buffer size in bytes (5MB, sufficient for short clips)
    startLevel: -1, // Start at lowest quality, auto-switch up
    capLevelToPlayerSize: true, // Cap quality to player size
  };

  function initializeHLS(videoEl, src, onReady) {
    if (Hls.isSupported()) {
      const hls = new Hls(hlsConfig);
      hls.loadSource(src);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (onReady) onReady();
      });
      return hls;
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      videoEl.src = src;
      videoEl.addEventListener('loadedmetadata', () => {
        if (onReady) onReady();
      });
      return null;
    }
    return null;
  }

  function initializeVideo(videoEl, index) {
    if (!videoEl) return;

    // Don't initialize if already initialized
    if (hlsInstances[index]) return;

    const handleEnded = () => {
      playNextVideo();
    };

    videoEl.addEventListener('ended', handleEnded);
    videoEl.loop = false;
    videoEl.muted = true;
    videoEl.playsInline = true;

    // Show video once it starts playing
    videoEl.addEventListener('playing', () => {
      carouselVideoReady[index] = true;
    });

    const hls = initializeHLS(videoEl, videos[index].src, () => {
      if (index === 0) {
        videoEl.play();
      }
    });
    if (hls) {
      hlsInstances[index] = hls;
    }
  }

  onMount(async () => {
    // Initialize landscape video
    if (landscapeVideoElement) {
      // Show video once it starts playing
      landscapeVideoElement.addEventListener('playing', () => {
        landscapeVideoReady = true;
      });

      initializeHLS(landscapeVideoElement, LandscapeVideo, () => {
        landscapeVideoElement.play();
      });
    }

    // Initialize portrait video for mobile
    if (portraitVideoElement) {
      // Show video once it starts playing
      portraitVideoElement.addEventListener('playing', () => {
        portraitVideoReady = true;
      });

      initializeHLS(portraitVideoElement, PortraitVideoHLS, () => {
        portraitVideoElement.play();
      });
    }

    // Initialize video carousel - only initialize first video immediately
    await tick();
    if (videoElements[0]) {
      initializeVideo(videoElements[0], 0);
    }
  });

  function handleDragStart(e) {
    e.preventDefault();
    return false;
  }
</script>

<svelte:head>
  <link rel="preload" as="image" href="/videos/hero-portrait/poster.jpg" />
  <link rel="preload" as="image" href="/videos/hero-landscape/poster.jpg" />
  <link rel="preload" as="image" href="/videos/keeps-left/poster.jpg" />
  <link rel="preload" as="image" href="/videos/offramp/poster.jpg" />
  <link rel="preload" as="image" href="/videos/low-speed/poster.jpg" />
  <!--  TODO: why do we need this again? -->
  <style>
    body {
      background-color: var(--color-light); <!-- !important;-->
      letter-spacing: -0.08em;
      line-height: 1.2;
    }
  </style>
</svelte:head>

<div>
   <div class="mobile-portrait-video hide-desktop">
     <div class="portrait-video-container">
       <video
         bind:this={portraitVideoElement}
         class="portrait-video"
         class:ready={portraitVideoReady}
         poster="/videos/hero-portrait/poster.jpg"
         muted
         playsinline
         loop
       >
       </video>
       <div class="portrait-video-text-overlay">
         <div class="portrait-video-title">comma 4</div>
         <div class="portrait-video-subtitle">plugged into a Hyundai Sonata</div>
       </div>
     </div>
   </div>
   <div class="hero-section-top-padding">
     <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr" size="large">

      <div class="left-section-v2 light no-reorder">
        <div class="desktop-four-hero-image">
          <img src={FourFront} alt="comma 4 zoom"/>
        </div>
      </div>
      <div class="right-section-v2 no-bottom-border">
        <div>
          <div class="hero-title">Your car can do more.</div>
          <img src={FourFront} class="four-image hide-desktop" />
          <div class="hero-description">
            <div class="title">Meet comma 4.<br><br></div>
            Your car already has the right hardware, now it can have the right software.<br><br>
            It only takes <a href="/setup">15 minutes</a> to upgrade your car to the best advanced driving assistance system in the world.<br><br>
            comma 4 works with <a href="/vehicles">{vehicleCountText} car models</a>.
          </div>
        </div>
        <div class="hero-bottom">
          <div class="brand-icon-section">
            {@html ToyotaLogo}
            {@html HyundaiLogo}
            {@html HondaLogo}
            {@html ChevroletLogo}
            {@html ChryslerLogo}
          </div>
        </div>
      </div>
    </Grid>
  </div>

  <hr/>

  <div class="remount-image-mobile">
    <img src={RemountImage} alt="mount it"/>
    <div class="remount-buy-overlay">
      <div class="buy-now-container-v2">
        <div class="hero-price">
          <span class="hero-dollar">$</span><span class="hero-amount">999</span>
        </div>
        <a href="/shop/comma-four" class="hero-buy-now">
          buy now
          {@html LinkArrow}
        </a>
      </div>
    </div>
  </div>
  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr" size="xlarge">
    <div class="left-section-v2 large hide-mobile">
      <div class="landscape-video-container">
      <video
        bind:this={landscapeVideoElement}
        class="landscape-video"
        class:ready={landscapeVideoReady}
        poster="/videos/hero-landscape/poster.jpg"
        muted
        playsinline
        loop
      >
      </video>
        <div class="landscape-video-text-overlay">
          <div class="landscape-video-title">comma 4</div>
          <div class="landscape-video-subtitle">plugged into a Hyundai Sonata</div>
        </div>
      </div>
    </div>

    <div class="right-section-v2">
      <div class="hero-description">
        The most AI per square inch, all running in complete silence.<br><br>
        <ul>
          <li>modern AI trained on over 300 million miles of driving data</li>
          <li>360° onboard sensor suite</li>
          <li>100% local compute, no internet required</li>
          <li>310 ppi high resolution OLED display</li>
        </ul>
        <a href="/shop/comma-four#tech-specs" class="link-away" style="padding-top: 0;">
          tech specs
          {@html LinkArrow}
        </a>
      </div>

      <div class="hero-description">
        <div class="buy-now-container-v2 hide-mobile-buy" style="margin-top: 2rem;">
          <div class="hero-price">
            <span class="hero-dollar">$</span><span class="hero-amount">999</span>
          </div>
          <a href="/shop/comma-four" class="hero-buy-now">
            buy now
            {@html LinkArrow}
          </a>
        </div>
      </div>
    </div>
  </Grid>

  <hr class="hide-mobile"/>

  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr" size="xlarge">
    <div class="left-section-v2 light block">
      <Grid rowGap="0" columnGap="0" templateColumns="1fr 1fr" size="medium">
        <div class="plug-instructions">
          <div class="plug-step">
            <img src={PlugImage} alt="plug it in"/>
            plug it in
          </div>
          <hr/>
          <div class="plug-step">
            <img src={StickImage} alt="stick it on"/>
            stick it on
          </div>
          <hr/>
          <div class="plug-step">
            <img src={PowerImage} alt="power it up"/>
            start it up
          </div>
        </div>

        <div class="plug-hero-image hide-mobile-remount">
          <img src={RemountImage} alt="mount it"/>
        </div>

      </Grid>
    </div>

    <div class="right-section-v2">
      <div class="hero-description">
        <div class="hero-title">Plug & play.</div>
        comma 4 is designed to fit in your car like it was always meant to be there. So it’s easy to add on, and just as easy to remove.
      </div>
      <div class="hero-description">
        Send it back to us any time within 30 days for a full refund, no questions asked.
        <a href="/shop/comma-four" class="link-away">
          no-risk trial
          {@html LinkArrow}
        </a>
      </div>
    </div>
  </Grid>

  <hr/>

  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr" size="xlarge">
    <div class="left-section-v2">
      <div class="video-carousel">
        {#each videos as video, index}
          <div class="video-container" class:active={currentVideoIndex === index} on:click={() => switchToVideo(index)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && switchToVideo(index)} style="background-image: url('{video.poster}');">
            <video
              bind:this={videoElements[index]}
              class:ready={carouselVideoReady[index]}
              poster={video.poster}
              muted
              playsinline
              class="carousel-video"
            >
            </video>
            {#if currentVideoIndex !== index}
              <div class="video-overlay">
                <div class="video-play-icon">{@html PlayIcon}</div>
              </div>
            {/if}
            <div class="video-text-overlay">
              <div class="video-title">{video.label}</div>
            </div>
          </div>
        {/each}
        <button class="video-next-button" on:click={playNextVideo} aria-label="Next video">
          {@html NextIcon}
        </button>
      </div>
    </div>

    <div class="right-section-v2">
      <div class="hero-title">See openpilot in action.</div>
      <div class="hero-description">
        comma 4 is powered by the openpilot ADAS software developed by comma. It learns how well your car drives and adapts to drive your car well.
        <a href="https://blog.comma.ai" class="link-away">
          autonomy
          {@html LinkArrow}
        </a>
      </div>
    </div>
  </Grid>

  <hr/>

  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr" size="xlarge">
    <div class="left-section-v2">
      <div class="hero-image-v2">
        <img src={AdeebDm} alt="driver monitoring in action"/>
      </div>
    </div>

    <div class="right-section-v2">
      <div class="hero-title">Works <i>with</i> you, not without you.</div>
      <div class="hero-description">
        comma 4 makes sure you’re at your best behind the wheel.
        <a href="https://github.com/commaai/openpilot" class="link-away">
          openpilot
          {@html LinkArrow}
        </a>
      </div>
    </div>
    </Grid>

  <hr/>

  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr" size="xlarge">
    <div class="left-section-v2">
      <div class="map-image">
        <img src={Map} alt="openpilot map"/>
      </div>
    </div>

    <div class="right-section-v2">
      <div class="hero-title">better with every drive</div>
      <div class="hero-description">
        openpilot has driven over 150 million miles around the globe. It learns how well your car drives and adapts to drive your car well.<br><br>
        See openpilot in action on YouTube and contribute to the largest open-source robotics project in the world.<br><br>
        <a href="https://github.com/commaai/openpilot" class="link-away">
          github
          {@html LinkArrow}
        </a>
      </div>
    </div>
  </Grid>
</div>

<style>
  /*
    Large screen layout:
    1350px and up: left section 2/3, right section 1/3

    Medium screen layout:
    Below 1350px: left section 100%, right section 50% below

    Small screen layout:
    Below 950px: left section 100%, right section 100% below
  */

  .hero-section-top-padding {
    padding-top: 4rem;

    @media screen and (max-width: 1024px) {
      padding-top: 0;
    }
  }

  .hide-desktop {
    @media screen and (min-width: 1025px) {
      display: none !important;
    }
  }

  .hide-mobile {
    @media screen and (max-width: 1024px) {
      display: none !important;
    }
  }

  .mobile-portrait-video {
    width: 100%;
    line-height: 0;
    padding-top: 104px;
  }

  .portrait-video-container {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    background-image: url('/videos/hero-portrait/poster.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .portrait-video {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    opacity: 0;
    transition: opacity 0.3s ease-in;

    &.ready {
      opacity: 1;
    }
  }

  .portrait-video-text-overlay {
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 2;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .portrait-video-title {
    font-size: 36px;
    color: #eaeaea;
    line-height: 1.2;
    letter-spacing: -0.06em;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.65);

    @media screen and (max-width: 950px) {
      font-size: 32px;
    }
  }

  .portrait-video-subtitle {
    font-size: 36px;
    color: rgba(234, 234, 234, 0.65);
    line-height: 1.2;
    letter-spacing: -0.06em;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.65);

    @media screen and (max-width: 950px) {
      font-size: 14px;
    }
  }

  hr {
    border: none;
    height: 2px;
    background-color: black;
    margin: 0;

    &.hide-mobile {
      @media screen and (max-width: 1350px) {
        display: none;
      }
    }
  }

  .map-image {
    line-height: 0;
  }

  .plug-instructions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    & hr {
      width: 100%;
      height: 2px;
      border: none;
      background-color: black;
      margin: 0;
    }
  }

  .plug-step {
    display: flex;

    font-size: 64px;
    align-items: center;
    gap: 1rem;
    line-height: 0.9;
    letter-spacing: -0.06em;

    @media screen and (max-width: 1350px) {
      font-size: 48px;
    }

    & img {
      width: 11vw;
      height: auto;
      min-width: 100px;
      object-fit: contain;
      display: block;
    }
  }

  .plug-hero-image {
    width: 100%;
    height: 100%;

    &.hide-mobile-remount {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    & img {
      width: 100%;
      line-height: 0;
      object-fit: contain;
      display: block;

      @media screen and (max-width: 650px) {
        display: block;
      }
    }
  }

  .desktop-four-hero-image {
    width: 50%;
    max-width: 1000px;
    top: -5%;
    left: 10%;
    position: absolute;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  .left-section-v2 {
    height: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1450px) {
      order: 2;
    }

    &.large {
      @media screen and (max-width: 1450px) {
        order: initial; /* Remove general rule */
      }

      @media screen and (max-width: 1024px) {
        order: 2;
      }
    }

    &.no-reorder {
      @media screen and (max-width: 1450px) {
        order: initial;
      }

      &.large {
        @media screen and (max-width: 1024px) {
          order: initial;
        }
      }
    }

    &.light {
      background-color: transparent;
    }

    &.block {
      display: block;
    }
  }

  .right-section-v2 {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px;

    & li {
      color: black;
    }

    @media screen and (max-width: 1350px) {
      padding: 20px;
      border-bottom: 2px solid black;
      &.no-bottom-border {
        border-bottom: none;
      }
    }
  }

  .hero-title {
    font-size: 96px;
    line-height: 1;
    letter-spacing: -0.08em;
    padding-bottom: 40px;

    @media screen and (max-width: 1350px) {
      font-size: 64px;
    }
  }

  .hero-description {
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.06em;

    & li {
      color: black;
      padding-bottom: 20px;
      font-size: 20px;
    }

    & .title {
      font-size: 40px;

      @media screen and (max-width: 1024px) {
        font-size: 20px;
      }
    }
  }

  .hero-description a {
    color: inherit;
    text-decoration: underline;
  }

  .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 4rem;

    & .brand-icon-section {
      display: flex;
      gap: 10px;

      & svg {
        width: 48px;
        height: 48px;
      }
    }
  }

  .hero-price {
    display: flex;
    align-items: baseline;
  }

  .hero-dollar {
    font-size: 20px;
    color: black;
    line-height: 1;
    padding-bottom: 0.1em;
  }

  .hero-amount {
    font-size: 48px;
    line-height: 0.9;
    letter-spacing: -0.08em;
    color: black;
  }

  .hero-buy-now {
    font-size: 48px;
    line-height: 1;
    letter-spacing: -0.08em;
    text-decoration: underline;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 20px;
    text-align: right;
  }

  .hero-buy-now :global(svg) {
    width: 40px;
    height: 40px;
  }

  .link-away {
    font-size: 32px;
    text-decoration: underline;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 40px;

    @media screen and (max-width: 1350px) {
      font-size: 24px;
      padding-top: 16px;
    }
  }

  .link-away :global(svg) {
    width: 32px;
    height: 32px;

    @media screen and (max-width: 1350px) {
      width: 24px;
      height: 24px;
    }
  }

  .buy-now-container-v2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    pointer-events: auto;

    &.hide-mobile-buy {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }

  .hero-image-v2 {
    line-height: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right;
    }
  }

  .landscape-video-container {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    background-image: url('/videos/hero-landscape/poster.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .landscape-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    line-height: 0;
    opacity: 0;
    transition: opacity 0.3s ease-in;

    &.ready {
      opacity: 1;
    }
  }

  .landscape-video-text-overlay {
    position: absolute;
    bottom: 24px;
    right: 24px;
    z-index: 2;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .landscape-video-title {
    font-size: 36px;
    color: #eaeaea;
    line-height: 1.2;
    letter-spacing: -0.06em;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.65);

    @media screen and (max-width: 950px) {
      font-size: 32px;
    }
  }

  .landscape-video-subtitle {
    font-size: 36px;
    color: rgba(234, 234, 234, 0.65);
    line-height: 1.2;
    letter-spacing: -0.06em;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.65);

    @media screen and (max-width: 950px) {
      font-size: 14px;
    }
  }

  .video-carousel {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
  }

  .video-container {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @media screen and (max-width: 1450px) {
      /* Not needed on desktop */
      aspect-ratio: 3 / 4;
    }

    @media screen and (max-width: 698px) {
      display: none;
      width: 100%;
      flex: none;
      cursor: default;

      &.active {
        display: flex;
      }
    }
  }

  .carousel-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0;
    transition: opacity 0.3s ease-in;

    &.ready {
      opacity: 1;
    }
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(234, 234, 234, 0.8);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 2;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-play-icon {
    width: 48px;
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      width: 48px;
      height: 84px;
    }
  }

  .video-container.active .video-overlay {
    opacity: 0;
  }

  .video-text-overlay {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    z-index: 3;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 24px;
    padding-right: 24px;
  }

  .video-title {
    font-size: 36px;
    color: #eaeaea;
    line-height: 1.2;
    letter-spacing: -0.06em;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.65);

    @media screen and (max-width: 950px) {
      font-size: 32px;
    }
  }

  .video-container:not(.active) .video-title {
    color: black;
    text-shadow: none;
  }

  .remount-image-mobile {
    position: relative;
    width: 100%;
    line-height: 0;

    @media screen and (min-width: 769px) {
      display: none;
    }

    & img {
      width: 100%;
      height: auto;
      display: block;
      line-height: 0;
      border-bottom: 2px solid black;
    }
  }

  .remount-buy-overlay {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    z-index: 2;
    pointer-events: auto;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;

    & .buy-now-container-v2 {
      width: 100%;
    }
  }

  .video-next-button {
    position: absolute;
    bottom: 24px;
    right: 24px;
    width: 64px;
    height: 64px;
    background-color: rgba(234, 234, 234, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 4;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(234, 234, 234, 0.6);
    }

    & svg {
      width: 12px;
      height: 24px;
      color: black;
      filter: invert(100%);
    }

    @media screen and (max-width: 698px) {
      display: flex;
    }
  }

  .four-image {
    padding-bottom: 1.5rem;
    width: 80%;
    margin: 0 auto;
    display: block;
  }
</style>
