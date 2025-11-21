<script>
  import { onMount, tick } from 'svelte';
  import Hls from 'hls.js';
  import { products as productsData } from '$lib/data/products.js';
  import { getProduct } from '$lib/utils/shopify.js';
  import { vehicleHarnesses } from '$lib/utils/harnesses.js';
  import { selectedCar } from '../store';
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  import FourImage from "$lib/images/products/comma-four/four_screen_on.png";
  import FourSide from "$lib/images/products/comma-four/four_side_2.png";
  import FourBack from "$lib/images/products/comma-four/four_back_2.png";
  import ExperimentalIcon from "$lib/images/experimental.svg?raw";
  import WarrantyIcon from "$lib/icons/features/warranty.svg?raw";
  import MoneyBackIcon from "$lib/icons/features/money-back-guarantee.svg?raw";

  const HeroVideo = "/videos/hero/hero.m3u8";
  const storeUrl = import.meta.env.VITE_SHOPIFY_STORE_URL;
  import NHaasGroteskRoman from "$lib/fonts/NHaasGrotesk/NHaasGroteskDSPro-55Rg.otf";
  import NHaasGrotesk75 from "$lib/fonts/NHaasGrotesk/NHaasGroteskTXPro-75Bd.otf";

  let videoElement;
  let videoReady = false;
  let compatPulse = false;
  let compatShake = false;

  // Image carousel state
  let currentFourImage = FourImage;
  const fourImages = [
    { src: FourImage, name: 'screen' },
    { src: FourImage, name: 'front' },
    { src: FourSide, name: 'side' },
    { src: FourBack, name: 'back' }
  ];

  function selectFourImage(imageSrc) {
    currentFourImage = imageSrc;
  }

  onMount(async () => {
    // Initialize HLS.js
    if (videoElement) {
      // Show video once it starts playing
      videoElement.addEventListener('playing', () => {
        videoReady = true;
      });

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(HeroVideo);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play();
        });
      } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoElement.src = HeroVideo;
        videoElement.addEventListener('loadedmetadata', () => {
          videoElement.play();
        });
      }
    }
  });

  function handleDragStart(e) {
    e.preventDefault();
    return false;
  }
</script>

<svelte:head>
  <link rel="preload" as="image" href="/videos/hero/poster.jpg" />
  <link
    rel="preload"
    href={NHaasGroteskRoman}
    as="font"
    type="font/otf"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={NHaasGrotesk75}
    as="font"
    type="font/otf"
    crossorigin="anonymous"
  />
  <style>
    body {
      background-color: #000;
    }
  </style>
</svelte:head>

<div class="gradient-overlay"></div>
<div class="gradient-overlay-top"></div>

<div style="background-color: black;">
  <section class="hero-image" style="background-image: url('/videos/hero/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">
    <!-- <img src={HeroImage} alt="Hero" draggable="false" /> -->
    <video
      bind:this={videoElement}
      class:ready={videoReady}
      poster="/videos/hero/poster.jpg"
      autoplay
      muted
      loop
      playsinline
      draggable="false"
    />
  </section>

  <section class="black-spacer"></section>

  <section id="four" class="dark comma-four-section">
    <img src={currentFourImage} alt="comma four" class="four-image" />
    <div class="four-content">
      <div class="four-text">
        comma four works on <a href="/vehicles" style="text-decoration: underline;">{vehicleCountText} car models</a>. It adds the best driver assistance in the world to your existing car.<br><br>
        It runs <a href="https://github.com/commaai/openpilot?tab=readme-ov-file#openpilot" target="_blank" style="text-decoration: underline;">openpilot</a>, which can drive for hours without driver action.
      </div>
      <ul class="four-features">
        <li>
          <span class="feature-icon">{@html ExperimentalIcon}</span>
          <span>Install it yourself in 15 minutes</span>
        </li>
        <li>
          <span class="feature-icon">{@html WarrantyIcon}</span>
          <span>1 year warranty</span>
        </li>
        <li>
          <span class="feature-icon">{@html MoneyBackIcon}</span>
          <span>30 day free return period</span>
        </li>
      </ul>
      <div class="four-thumbnails">
        {#each fourImages.slice(1) as image}
          <button
            class="four-thumbnail"
            class:active={currentFourImage === image.src}
            on:click={() => selectFourImage(image.src)}
            aria-label={`View ${image.name} view`}
          >
            <img src={image.src} alt={`comma four ${image.name}`} />
          </button>
        {/each}
      </div>
    </div>
  </section>

  <div class="hero-content-wrapper">
    <div class="buy-now-container">
      <a href="/shop/comma-four" class="buy-now-button">
        <span class="buy-now-text">Buy now</span>
        <span class="buy-now-price"><span class="dollar-sign">$</span>999</span>
      </a>
      <a href="/vehicles" class="check-compatibility">check compatibility</a>
    </div>
  </div>

  <!--This somehow pushes up hero overlays earlier-->
  <div class="sticky-bottom-spacer"></div>
</div>

<style>
  .gradient-overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to bottom, transparent, black);
    z-index: 5;
    pointer-events: none;
  }

  .gradient-overlay-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to bottom, black, transparent);
    z-index: 5;
    pointer-events: none;
  }

  .sticky-bottom-spacer {
    height: 4rem;
    color: black;
  }

  .hero-content-wrapper {
    left: 0;
    right: 0;
    bottom: 60px;
    pointer-events: none;
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;

    @media screen and (max-width: 1080px) {
      bottom: 30px;
      gap: 0;
    }

    @media screen and (max-width: 698px) {
      bottom: calc(30px);
      padding: 0 2rem;
      gap: 0.5rem;
    }
  }

  .hero-overlays {
    pointer-events: none;
  }

  .hero-text {
    line-height: 1;
    font-family: "NHaasGrotesk Roman", sans-serif;
    font-size: 112px;
    font-weight: normal;
    color: #EAEAEA;
    text-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
    pointer-events: none;
    user-select: none;

    @media screen and (max-width: 1200px) {
      font-size: 86px;
    }

    @media screen and (max-width: 698px) {
      font-size: 48px;
    }
  }

  .buy-now-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    pointer-events: auto;
  }

  .buy-now-button {
    pointer-events: auto;
    background: rgba(0, 255, 64, 0.35);
    color: #00FF40;
    border: 2px solid rgba(0, 255, 64, 0.35);
    border-radius: 30px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 24px 24px 24px 24px;
    font-size: 1.5rem;
    font-weight: 600;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 200px;
    min-width: 300px;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    font-family: "NHaasGrotesk Roman", sans-serif;

    &:hover {
      background-color: rgba(69, 160, 73, 0.4);
      border-color: #45a049;
    }

    &:active {
      background-color: rgba(61, 139, 64, 0.5);
      border-color: #3d8b40;
    }

    & .buy-now-text {
      flex: 1;
      text-align: left;
      font-size: 32px;
      color: #00FF40;
      text-shadow: 0 0 24px rgba(0, 255, 64, 0.75);
      line-height: 1;
    }

    & .buy-now-price {
      flex: 0 0 auto;
      font-weight: 700;
      font-size: 48px;
      font-family: "NHaasGrotesk 75", sans-serif;
      color: #00FF40;
      text-shadow: 0 0 24px rgba(0, 255, 64, 0.75);
      line-height: 1;

      & .dollar-sign {
        font-size: 32px;
        color: #00FF40;
        text-shadow: 0 0 24px rgba(0, 255, 64, 0.75);
      }
    }

    @media screen and (max-width: 698px) {
      min-width: auto;
      width: 100%;
      padding: 1.25rem 2rem;
      font-size: 1.25rem;
      gap: 2rem;
      box-sizing: border-box;
    }

  }

  @keyframes shake-x {
    0%, 100% { transform: translate3d(0,0,0); }
    10%, 30%, 50%, 70%, 90% { transform: translate3d(-8px,0,0); }
    20%, 40%, 60%, 80% { transform: translate3d(8px,0,0); }
  }

  /* Ensure animation applies even if nested selector processing is unavailable */
  .check-compatibility.shake {
    animation: shake-x 750ms cubic-bezier(.36,.07,.19,.97) both;
    transform-origin: center left;
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* When flashing and shaking at the same time, run both animations */
  .check-compatibility.flash.shake {
    animation: shake-x 750ms cubic-bezier(.36,.07,.19,.97) both, compat-flash 2500ms ease-in-out;
  }

  .check-compatibility {
    font-size: 24px;
    color: rgb(155, 155, 155);
    text-shadow: 0 0 12px rgba(40, 40, 40, 1);
    font-family: Inter, sans-serif;
    background: transparent;
    border: none;
    padding: 0;
    text-align: center;
    cursor: pointer;
    user-select: none;
    max-width: 483px;
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
    transition: color 0.8s ease;

    &:hover, &:active {
      color: #EAEAEA;
    }

    @media screen and (max-width: 698px) {
      max-width: 100%;
      font-size: 20px;
    }
  }

  .check-compatibility.flash {
    animation: compat-flash 2500ms ease-in-out;
  }

  @keyframes compat-flash {
    0%   { color: rgb(155,155,155); }
    10%  { color: #ffffff; }
    60%  { color: #ffffff; }
    100% { color: rgb(155,155,155); }
  }


  .hero-image {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    & img,
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
    }

    & video {
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
      height: 420px;
      background: linear-gradient(to bottom, transparent, black);
      z-index: 2;
      pointer-events: none;
    }
  }

  @font-face {
    font-display: block;
    font-family: "NHaasGrotesk Roman";
    font-style: normal;
    font-weight: normal;
    src: url("$lib/fonts/NHaasGrotesk/NHaasGroteskDSPro-55Rg.otf");
  }

  @font-face {
    font-display: block;
    font-family: "NHaasGrotesk 75";
    font-style: normal;
    font-weight: bold;
    src: url("$lib/fonts/NHaasGrotesk/NHaasGroteskTXPro-75Bd.otf");
  }

  .black-spacer {
    height: 15vh;
    background-color: #000;
    width: 100%;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .comma-four-section {
    position: relative;
    overflow: hidden;
    height: 100vh;
    background-color: #000;
    z-index: 0;
    /*border: 2px solid red;*/

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      z-index: 2;
      pointer-events: none;
    }

    /* Mobile layout: use flexbox */
    @media screen and (max-width: 1500px) {
      min-height: 100vh;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 2rem;
    }

    & .four-image {
      width: 50vw;
      max-width: 1200px;
      min-width: 400px;
      position: absolute;
      top: -200px;
      left: 100px;
      z-index: 0;

      @media screen and (max-width: 1500px) {
        position: relative;
        top: 0;
        left: auto;
        width: 50vw;
        max-width: 1200px;
      }

      @media screen and (max-width: 450px) {
        min-width: 90vw;
        width: 90vw;
      }
    }

    & .four-content {
      position: absolute;
      left: calc(100px + 50vw + 2rem);
      top: 22vh;
      z-index: 4;
      max-width: 550px;
      width: 550px;
      display: flex;
      flex-direction: column;
      gap: 3rem;

      @media screen and (max-width: 1500px) {
        position: relative;
        left: auto;
        top: auto;
        width: calc(100% - 4rem);
        max-width: 550px;
        align-items: center;
        margin-top: 3rem;
      }
    }

    & .four-text {
      font-size: 24px;
      color: #EAEAEA;
      line-height: 1.5;
      margin: 0;

      @media screen and (max-width: 1500px) {
        order: 2;
      }

      @media screen and (max-width: 698px) {
        font-size: 18px;
      }
    }

    & .four-features {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media screen and (max-width: 1500px) {
        order: 2;
      }

      & span {
        color: rgb(200, 200, 200);
        align-self: center;
      }

      & li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #EAEAEA;
        font-size: 20px;
        line-height: 1.5;

        @media screen and (max-width: 698px) {
          font-size: 18px;
        }
      }

      & .feature-icon {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;

        & :global(svg) {
          width: 100%;
          height: 100%;
        }
      }
    }

    & .four-thumbnails {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: 1500px) {
        order: 1;
      }

      @media screen and (max-width: 698px) {
        gap: 0.5rem;
      }
    }

    & .four-thumbnail {
      background: transparent;
      border: none;
      border-radius: 8px;
      padding: 4px;
      cursor: pointer;
      width: 120px;
      height: 90px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      &.active {
        transform: scale(1.1);
      }

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      @media screen and (max-width: 500px) {
        width: 100px;
        height: 80px;
        padding: 2px;
      }
    }
  }

  #hero-content {
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
</style>
