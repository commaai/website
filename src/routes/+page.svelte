<script>
  import { onMount, tick } from 'svelte';
  import Hls from 'hls.js';
  import { products as productsData } from '$lib/data/products.js';
  import { getProduct } from '$lib/utils/shopify.js';
  import { vehicleHarnesses } from '$lib/utils/harnesses.js';
  import { selectedCar } from '../store';
  import { vehicleCountText } from '$lib/constants/vehicles.js';
  import Grid from "$lib/components/Grid.svelte";

  // import FourImage from "$lib/images/products/comma-four/four_screen_on.png";
  // import FourSide from "$lib/images/products/comma-four/four_side_2.png";
  // import FourBack from "$lib/images/products/comma-four/four_back_2.png";
  import FourFront from "$lib/images/home/hero/four_front.png";
  import FourBack from "$lib/images/home/hero/four_back.png";
  import FourSide from "$lib/images/home/hero/four_side.png";
  import FourAngled from "$lib/images/home/hero/four_angled.png";
  import AdeebDm from "$lib/images/home/adeeb-dm.png";

  import PlugImage from "$lib/images/home/plug-n-play/plug.png";
  import StickImage from "$lib/images/home/plug-n-play/stick.png";
  import PowerImage from "$lib/images/home/plug-n-play/power.png";
  import RemountImage from "$lib/images/home/plug-n-play/remount.png";

  import FourPov from "$lib/images/home/four_pov.png";
  import Sonata from "$lib/images/home/sonata.png";
  import SonataLandscape from "$lib/images/home/sonata_landscape.png";
  import Map from "$lib/images/home/map.png";
  import FourZoom from "$lib/images/home/four_zoom.png";
  import LinkArrow from "$lib/icons/link_arrow.svg?raw";
  import WarrantyIcon from "$lib/icons/features/warranty.svg?raw";
  import MoneyBackIcon from "$lib/icons/features/money-back-guarantee.svg?raw";
  import ToyotaLogo from "$lib/icons/brands/toyota.svg?raw";
  import HyundaiLogo from "$lib/icons/brands/hyundai.svg?raw";
  import HondaLogo from "$lib/icons/brands/honda.svg?raw";
  import ChevroletLogo from "$lib/icons/brands/chevrolet.svg?raw";
  import ChryslerLogo from "$lib/icons/brands/chrysler.svg?raw";

  const HeroVideo = "/videos/hero/hero.m3u8";
  const storeUrl = import.meta.env.VITE_SHOPIFY_STORE_URL;

  let videoElement;
  let videoReady = false;
  let compatPulse = false;
  let compatShake = false;

  // Image carousel state
  let currentFourImage = FourFront;
  const allFourImages = [
    { src: FourFront, name: 'front' },
    { src: FourAngled, name: 'angled' },
    { src: FourBack, name: 'back' },
    { src: FourSide, name: 'side' },
  ];
  const fourImages = [
    { src: FourAngled, name: 'angled' },
    { src: FourBack, name: 'back' },
    { src: FourSide, name: 'side' },
  ];

  function selectFourImage(imageSrc) {
    currentFourImage = imageSrc;
    // swap out
    if (imageSrc === FourAngled) {
      fourImages[0] = { src: FourFront, name: 'front' };
    } else {
      fourImages[0] = { src: FourAngled, name: 'angled' };
    }
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
  <!--  TODO: why do we need this again? -->
  <style>
    body {
      background-color: var(--color-light); <!-- !important;-->
      letter-spacing: -0.08em;
      line-height: 1.2;
    }
  </style>
</svelte:head>

<!--<div class="gradient-overlay"></div>-->
<!--<div class="gradient-overlay-top"></div>-->

<div>
  <section class="light hero-video hero-section">
    <div class="left-section">
      <img src={FourFront} class="hide-mobile" alt="comma four zoom"/>
      <div class="hero-image-container hide-desktop">
<!--        <div class="hero-image-text-container">-->
<!--          <img src={FourPov} alt="comma four pov"/>-->
<!--          <div class="bottom-right">i8 East, San Diego</div>-->
<!--        </div>-->
        <div class="hero-image-text-container">
          <img src={Sonata} alt="comma four zoom"/>
          <div class="bottom-left">comma 4</div>
          <div class="bottom-left-2">plugged into a Hyundai Sonata</div>
        </div>
      </div>
    </div>
    <!-- Buy now should be pushed down a bit -->
    <div class="right-section">
      <div>
        <div class="hero-title">Your car can do more.</div>
<!--        comma her image-->
        <img src={FourFront} class="four-image hide-desktop" />
        <div class="hero-description" style="padding-top: 0; padding-bottom: 8rem;">
          <div class="title">Meet comma 4.<br><br></div>
          Your car already has the right hardware, now it can have the right software.<br><br>
          It only takes <a href="/setup">15 minutes</a> to upgrade your car to the best advanced driving assistance system in the world.<br><br>
          comma 4 works with <a href="/vehicles">{vehicleCountText} car models</a>.
        </div>
      </div>
<!--      <div class="hero-bottom" style="margin-top: 8rem;">-->
      <div class="hero-bottom">
        <div class="brand-icon-section">
          {@html ToyotaLogo}
          {@html HyundaiLogo}
          {@html HondaLogo}
          {@html ChevroletLogo}
          {@html ChryslerLogo}
        </div>
<!--        <div class="hero-price">-->
<!--          <span class="hero-dollar">$</span><span class="hero-amount">999</span>-->
<!--        </div>-->
<!--        <a href="/shop/comma-four" class="hero-buy-now">-->
<!--          buy now-->
<!--          {@html LinkArrow}-->
<!--        </a>-->
      </div>

<!--      &lt;!&ndash; On mobile, four thumbnails will go vertically down the page, spanning all sections starting from "comma four" &ndash;&gt;-->
<!--      <div class="four-thumbnails mobile">-->
<!--        {#each allFourImages as image}-->
<!--          <button-->
<!--            class="four-thumbnail"-->
<!--            class:active={currentFourImage === image.src}-->
<!--            on:click={() => selectFourImage(image.src)}-->
<!--            aria-label={`View ${image.name} view`}-->
<!--          >-->
<!--            <img src={image.src} alt={`comma four ${image.name}`}/>-->
<!--          </button>-->
<!--        {/each}-->
<!--      </div>-->
    </div>
  </section>

<!--  <section class="light hero-section">-->
<!--    <div class="left-section">-->
  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr">
    <div>
      <div class="hero-image-container">
<!--        <div class="hero-image-text-container">-->
<!--          <img src={FourPov} alt="comma four pov"/>-->
<!--          <div class="bottom-right">i8 East, San Diego</div>-->
<!--        </div>-->
        <div class="hero-image-text-container">
          <div style="line-height: 0;">
            <img src={SonataLandscape} class="hide-mobile" alt="comma four zoom"/>
          </div>
<!--          <img src={FourFront} class="hide-desktop" alt="comma four zoom"/>-->
          <div class="bottom-left">comma 4</div>
          <div class="bottom-left-2">plugged into a Hyundai Sonata</div>
        </div>
      </div>
    </div>

    <div class="right-section-v2">
<!--      <div class="hero-title">tiny enough to forget</div>-->
      <div class="hero-description">
        The most AI per square inch, all running in complete silence.<br><br>
        <ul>
          <li>modern AI trained on over 300 million miles of driving data</li>
          <li>360° onboard sensor suite</li>
          <li>100% local compute, no internet required</li>
          <li>310 ppi high resolution OLED display</li>
        </ul>
        <a href="/shop/comma-four" class="link-away">
          tech specs
          {@html LinkArrow}
        </a>
      </div>

      <div class="hero-description">
        works <i>with</i> you, not without you.<br><br>

<!--        now $999 and buy now:-->

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
<!--  </section>-->
  </Grid>

  <hr/>

<!--  <section class="light hero-section">-->
  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr">
    <div class="plug-n-play-container">

<!--     left and right sections.-->
<!--     right is full height square image-->
<!--     left is three vertical bars with image on left and text on right. 2px black vertical bars separating them-->

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

      <div class="plug-hero-image">
        <img src={RemountImage} alt="mount it"/>
      </div>

   </div>

    <div class="right-section-v2">
      <div class="hero-title">Plug & play.</div>
      <div class="hero-description">
        comma 4 is designed to fit in your car like it was always meant to be there. So it’s easy to add on, and just as easy to remove.<br><br>
        Send it back to us any time within 30 days for a full refund, no questions asked.
        <a href="/shop/comma-four" class="link-away">
          no-risk trial
          {@html LinkArrow}
        </a>
      </div>
    </div>
<!--  </section>-->
  </Grid>

  <hr/>

  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr">
    <div>
    </div>

    <div class="right-section-v2">
      <div class="hero-title">See openpilot in action.</div>
      <div class="hero-description">
        comma 4 is powered by the openpilot ADAS software developed by comma. It learns how well your car drives and adapts to drive your car well.
        <a href="/" class="link-away">
          autonomy
          {@html LinkArrow}
        </a>
      </div>
    </div>
  </Grid>

  <hr/>

<!--  <section class="light hero-section">-->
  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr">
    <div class="left-section-v2">
<!--      TODO v2: black on top and bottom -->
      <div class="hero-image-v2">
        <img src={AdeebDm} alt="driver monitoring in action"/>
      </div>
    </div>

    <div class="right-section-v2">
      <div class="hero-title">Works <i>with</i> you, not without you.</div>
      <div class="hero-description">
        comma 4 makes sure you’re at your best behind the wheel.
        <a href="/shop/comma-four" class="link-away">
          tech specs?
          {@html LinkArrow}
        </a>
      </div>
    </div>
    </Grid>

  <hr/>

<!--  <section class="light hero-section">-->
<!--    <div class="left-section">-->
<!--      <div class="hero-carousel">-->
<!--        <div class="main-image-container">-->
<!--          <img src={currentFourImage} alt="comma four" class="four-image"/>-->
<!--        </div>-->
<!--        <div class="four-thumbnails">-->
<!--          {#each fourImages as image}-->
<!--            <button-->
<!--              class="four-thumbnail"-->
<!--              class:active={currentFourImage === image.src}-->
<!--              on:click={() => selectFourImage(image.src)}-->
<!--              aria-label={`View ${image.name} view`}-->
<!--            >-->
<!--              <img src={image.src} alt={`comma four ${image.name}`}/>-->
<!--            </button>-->
<!--          {/each}-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

<!--    <div class="right-section">-->
<!--      <div class="hero-title">tiny enough to forget</div>-->
<!--      <div class="hero-description">-->
<!--        comma 4 offers the most AI per square inch, all running in complete silence.<br><br>-->
<!--        There when you need it, gone when you don't.<br><br>-->
<!--        <a href="/shop/comma-four" class="link-away">-->
<!--          tech specs-->
<!--          {@html LinkArrow}-->
<!--        </a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->

<!--  <section class="light hero-section mobile-direction-flip">-->
  <Grid rowGap="0" columnGap="0" templateColumns="2fr 1fr">

<!--    <div class="left-section" style="background-color: black; align-items: center;">-->
<!--    <div style="background-color: black; align-items: center;">-->
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
<!--  </section>-->
  </Grid>

  <!--  <section class="hero-image" style="background-image: url('/videos/hero/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">-->
<!--    &lt;!&ndash; <img src={HeroImage} alt="Hero" draggable="false" /> &ndash;&gt;-->
<!--    <video-->
<!--      bind:this={videoElement}-->
<!--      class:ready={videoReady}-->
<!--      poster="/videos/hero/poster.jpg"-->
<!--      autoplay-->
<!--      muted-->
<!--      loop-->
<!--      playsinline-->
<!--      draggable="false"-->
<!--    />-->
<!--  </section>-->

<!--  <section class="black-spacer"></section>-->

<!--  <section id="four" class="dark comma-four-section">-->
<!--    <img src={currentFourImage} alt="comma four" class="four-image" />-->
<!--    <div class="four-content">-->
<!--      <div class="four-text">-->
<!--        comma four works on <a href="/vehicles" style="text-decoration: underline;">{vehicleCountText} car models</a>. It adds the best ADAS in the world to your existing car.<br><br>-->
<!--        It runs <a href="https://github.com/commaai/openpilot?tab=readme-ov-file#openpilot" target="_blank" style="text-decoration: underline;">openpilot</a>, which can drive for hours without driver action.-->
<!--      </div>-->
<!--      <ul class="four-features">-->
<!--        <li>-->
<!--          <span class="feature-icon">{@html ExperimentalIcon}</span>-->
<!--          <span>Install it yourself in 15 minutes</span>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span class="feature-icon">{@html WarrantyIcon}</span>-->
<!--          <span>1 year warranty</span>-->
<!--        </li>-->
<!--        <li>-->
<!--          <span class="feature-icon">{@html MoneyBackIcon}</span>-->
<!--          <span>30 day free return period</span>-->
<!--        </li>-->
<!--      </ul>-->
<!--      <div class="four-thumbnails">-->
<!--        {#each fourImages.slice(1) as image}-->
<!--          <button-->
<!--            class="four-thumbnail"-->
<!--            class:active={currentFourImage === image.src}-->
<!--            on:click={() => selectFourImage(image.src)}-->
<!--            aria-label={`View ${image.name} view`}-->
<!--          >-->
<!--            <img src={image.src} alt={`comma four ${image.name}`} />-->
<!--          </button>-->
<!--        {/each}-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->

<!--  <div class="hero-content-wrapper">-->
<!--    <div class="buy-now-container">-->
<!--      <a href="/shop/comma-four" class="buy-now-button">-->
<!--        <span class="buy-now-text">Buy now</span>-->
<!--        <span class="buy-now-price"><span class="dollar-sign">$</span>999</span>-->
<!--      </a>-->
<!--      <a href="/vehicles" class="check-compatibility">check compatibility</a>-->
<!--    </div>-->
<!--  </div>-->

  <!--This somehow pushes up hero overlays earlier-->
<!--  <div class="sticky-bottom-spacer"></div>-->
</div>

<style>
  /*
    Large screen layout:
    1300px and up: left section 2/3, right section 1/3

    Medium screen layout:
    Below 1300px: left section 100%, right section 50% below

    Small screen layout:
    Below 950px: left section 100%, right section 100% below
  */

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

  .hide-desktop {
    @media screen and (min-width: 951px) {
      display: none !important;
    }
  }

  .hide-mobile {
    @media screen and (max-width: 950px) {
      display: none;
    }
  }

  hr {
    border: none;
    height: 2px;
    background-color: black;
    margin: 0;
  }

  .hero-section {
    display: flex;
    padding-bottom: 4rem;
    border-bottom: 2px solid black;

    @media screen and (max-width: 1300px) {
      flex-direction: column;
      padding-bottom: 1rem;
    }

    /*@media screen and (max-width: 950px) {*/
    /*  !*padding-bottom: 1rem;*!*/
    /*  padding-left: 0;*/
    /*  padding-right: 1rem;*/
    /*}*/

    &.mobile-direction-flip {
      @media screen and (max-width: 1300px) {
        flex-direction: column-reverse;
      }

      @media screen and (max-width: 950px) {
        flex-direction: column;
      }
    }
  }

  .hero-section:first-child {
    padding-top: 104px;

    @media screen and (max-width: 950px) {
      padding-top: 0;
    }
  }

  .hero-section:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .hero-video {
    display: flex;
  }

  .hero-video img,
  .hero-video picture {
    /*aspect-ratio: 1;*/
    /*object-fit: cover;*/
    /*flex: 1 1 0;*/
    width: 100%;
    /*height: auto;*/
  }

  .map-image {
    line-height: 0;
  }

  .left-section {
    width: 66%;
    display: flex;
    align-items: flex-end;

    @media screen and (max-width: 1300px) {
      width: 100%;
    }

    @media screen and (max-width: 950px) {
      justify-content: center;
    }
  }

  .hero-image-container {
  /*  lay out vertically now*/
    display: flex;
    width: 100%;

    @media screen and (max-width: 950px) {
      flex-direction: column;
    }
  }

  .hero-image-text-container {
    width: 100%;
    display: flex;
    align-items: flex-end;
    position: relative;
    color: #EAEAEA;

    & .bottom-left {
      position: absolute;
      bottom: 37px;
      left: 20px;
      font-size: 32px;
      letter-spacing: -0.06em;
      line-height: 1;

      @media screen and (max-width: 1300px) {
        font-size: 32px;
      }
    }

    & .bottom-left-2 {
      position: absolute;
      bottom: 20px;
      left: 20px;
      font-size: 14px;
      letter-spacing: -0.06em;
      line-height: 1;
      color: rgba(234, 234, 234, 0.65);

      @media screen and (max-width: 1300px) {
        font-size: 14px;
      }
    }

    & .bottom-right {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 20px;
      letter-spacing: -0.06em;
    }
  }

  .right-section {
    display: flex;
    width: 33%;
    padding-left: 40px;
    padding-right: 40px;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (max-width: 1300px) {
      width: 50%;
      /*min-height: 8rem;*/
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 2rem;
    }

    @media screen and (max-width: 950px) {
      width: auto;
      /*padding-right: 10px; WHY NO WORK?*/
    }

  }

  .plug-n-play-container {
    display: flex;
    flex-direction: row;
    align-items: stretch
  }

  .plug-instructions {
    display: flex;
    flex-direction: column;
    width: 50%;
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
    /*flex: 1;*/
    display: flex;

    font-size: 64px;
    align-items: center;
    gap: 1rem;
    line-height: 0.9;
    letter-spacing: -0.06em;
    /*text-align: center;*/
    /*padding: 1rem;*/

    & img {
      width: 200px;
      height: 200px;
      object-fit: contain;
      display: block;
    }
  }

  .plug-hero-image {
    /*flex: 1;*/
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

    & img {
      /*width: 400px;*/
      /*height: 400px;*/
      object-fit: contain;
      display: block;
    }
  }

  .left-section-v2 {
    height: 100%;
    background-color: black;
    display: flex;
    align-items: center;
  }

  .right-section-v2 {
    display: flex;
    height: 100%;
    /*width: 33%;*/
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 40px;
    padding-bottom: 40px;

    & li {
      color: black;
    }

    /*@media screen and (max-width: 1300px) {*/
    /*  width: 50%;*/
    /*  !*min-height: 8rem;*!*/
    /*  padding-left: 20px;*/
    /*  padding-right: 20px;*/
    /*  padding-top: 2rem;*/
    /*}*/

    /*@media screen and (max-width: 950px) {*/
    /*  width: auto;*/
    /*  !*padding-right: 10px; WHY NO WORK?*!*/
    /*}*/

  }

  .hero-section:last-child .right-section {
    margin-bottom: 4rem;

    @media screen and (max-width: 950px) {
      margin-bottom: 2rem;
    }
  }

  .hero-carousel {
    display: flex;

    @media screen and (max-width: 1300px) {
      display: none;
    }

    @media screen and (max-width: 950px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .main-image-container {
    width: 960px;
    height: auto;

    @media screen and (max-width: 2000px) {
      width: 800px;
    }

    @media screen and (max-width: 1600px) {
      width: 700px;
    }

    @media screen and (max-width: 950px) {
      width: 402px;
    }
  }

  .four-thumbnails {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1500px) {
      order: 1;
    }

    /*@media screen and (max-width: 698px) {*/
    /*  gap: 0.5rem;*/
    /*}*/

    @media screen and (max-width: 950px) {
      flex-direction: row;
      gap: 0;
    }
  }

  /*BETTER NAME*/
  .four-thumbnails.mobile {
    display: none;
    position: absolute;
    right: 10%;

    @media screen and (max-width: 1300px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    @media screen and (max-width: 950px) {
      /* Switch back to carousel */
      display: none;
    }
  }

  .four-thumbnail {
    background: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 200px;
    height: 200px;
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

    /*@media screen and (max-width: 500px) {*/
    /*  width: 100px;*/
    /*  height: 80px;*/
    /*  padding: 2px;*/
    /*}*/

    @media screen and (max-width: 2000px) {
      width: 175px;
      height: 175px;
    }

    /* Images are vertically laid out on right */
    @media screen and (max-width: 1300px) {
      width: 402px;
      height: 402px;
      margin-bottom: -7rem;
      cursor: default;

      &.active {
        transform: scale(1);
      }
    }

    @media screen and (max-width: 950px) {
      width: 134px;
      height: 134px;
      margin-bottom: 0;

      &.active {
        transform: scale(1.1);
      }

    }

    /*@media screen and (max-width: 1600px) {*/
    /*  width: 150px;*/
    /*  height: 150px;*/
    /*}*/
  }

  .hero-title {
    font-size: 96px;
    line-height: 1;
    letter-spacing: -0.08em;
    padding-bottom: 1rem;

    @media screen and (max-width: 1300px) {
      font-size: 64px;
    }
  }

  .hero-description {
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.06em;

    & li {
      color: black;
    }

    @media screen and (max-width: 1300px) {
      padding-top: 8rem;
    }

    @media screen and (max-width: 950px) {
      padding-top: 4rem;
    }

    & .title {
      font-size: 40px;

      @media screen and (max-width: 1300px) {
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

    & .brand-icon-section {
      display: flex;
      gap: 10px;

      & svg {
        width: 48px;
        height: 48px;
      }
    }
  }

  .bottom-section {
    display: flex;
    flex-direction: column;
  }

  .hero-price {
    display: flex;
    align-items: flex-end;
  }

  .hero-dollar {
    font-size: 20px;
    color: black;
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
    font-size: 36px;
    text-decoration: underline;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 12px;

    @media screen and (max-width: 1300px) {
      font-size: 20px;
    }
  }

  .link-away :global(svg) {
    width: 36px;
    height: 36px;

    @media screen and (max-width: 1300px) {
      width: 20px;
      height: 20px;
    }
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

  .buy-now-container-v2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
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

  .hero-image-v2 {
    /*display: block;*/
    line-height: 0;
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


  .black-spacer {
    height: 15vh;
    background-color: var(--color-light);
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
    background-color: var(--color-light);
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

      @media screen and (max-width: 950px) {
        gap: 0;
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
