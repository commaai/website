<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js';

  import FeaturedCarsList from '$lib/components/FeaturedCarsList.svelte';
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  import DeviceImage from '$lib/images/products/comma-four/four_dark.png';
  import LaneCenteringIcon from '$lib/icons/features/lane-centering.svg?raw';
  import AdaptiveCruiseIcon from '$lib/icons/features/adaptive-cruise.svg?raw';
  import OtaUpdatesIcon from '$lib/icons/features/ota-updates.svg?raw';
  import VisionIcon from '$lib/icons/features/360-vision.svg?raw';

  import ToyotaLogo from '$lib/icons/brands/toyota.svg?raw';
  import HyundaiLogo from '$lib/icons/brands/hyundai.svg?raw';
  import KiaLogo from '$lib/icons/brands/kia.svg?raw';
  import LexusLogo from '$lib/icons/brands/lexus.svg?raw';

  import LinusTechTipsLogo from '$lib/images/featured-articles/linus-tech-tips.svg';
  import SnazzyLabsLogo from '$lib/images/featured-articles/snazzy-labs.png';
  import TheVergeLogo from '$lib/images/featured-articles/the-verge.svg';
  import CarAndDriverLogo from '$lib/images/featured-articles/car-and-driver.png';
  import ConsumerReportsLogo from '$lib/images/featured-articles/consumer-reports.png';
  import RoadShowLogo from '$lib/images/featured-articles/road-show.png';

  const HeroLandscapeVideo = '/videos/hero-landscape/hero-landscape.m3u8';
  const HeroPortraitVideo = '/videos/hero-portrait/hero-portrait.m3u8';
  const ScreenVideo = '/videos/screen-video/screen-video.m3u8';
  const WorldMap = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Equirectangular_projection_world_map_without_borders.svg';

  const brands = [
    { name: 'Toyota', logo: ToyotaLogo },
    { name: 'Hyundai', logo: HyundaiLogo },
    { name: 'Kia', logo: KiaLogo },
    { name: 'Lexus', logo: LexusLogo },
    { name: 'Ford' },
    { name: 'Honda' },
    { name: 'Subaru' },
    { name: 'Volkswagen' },
    { name: 'Mazda' },
    { name: 'Nissan' },
    { name: 'Acura' },
    { name: 'Chevrolet' },
  ];
  const features = [
    { icon: LaneCenteringIcon, label: 'lane centering' },
    { icon: AdaptiveCruiseIcon, label: 'adaptive cruise' },
    { icon: VisionIcon, label: 'reduced fatigue' },
    { icon: OtaUpdatesIcon, label: 'cloud dashcam' },
  ];
  const press = [
    { logo: LinusTechTipsLogo, alt: 'Linus Tech Tips', href: 'https://youtu.be/xdmxM-v4KQg', greyscale: true },
    { logo: SnazzyLabsLogo, alt: 'Snazzy Labs', href: 'https://www.youtube.com/watch?v=GY8ruVimG8M', greyscale: true },
    { logo: TheVergeLogo, alt: 'The Verge', href: 'https://www.theverge.com/23548094/george-hotz-comma-3-driver-assist-hands-free-demo' },
    { logo: CarAndDriverLogo, alt: 'Car and Driver', href: 'https://www.caranddriver.com/features/a30341053/self-driving-technology-comparison/' },
    { logo: ConsumerReportsLogo, alt: 'Consumer Reports', href: 'https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf' },
    { logo: RoadShowLogo, alt: 'Road Show', href: 'https://www.cnet.com/roadshow/news/comma-ai-assisted-driving-george-hotz-ces-2020/' },
  ];
  const mapDots = [
    [12, 37], [17, 34], [20, 39], [23, 36], [25, 43], [28, 38], [30, 34], [31, 47], [35, 41],
    [39, 31], [42, 35], [45, 31], [47, 39], [49, 34], [51, 43], [53, 31], [55, 36], [57, 41],
    [44, 55], [48, 60], [52, 69], [58, 77], [63, 72], [67, 66], [72, 49], [76, 45], [81, 42],
    [84, 38], [87, 34], [89, 67], [93, 62], [35, 70], [31, 62], [22, 54], [18, 47],
  ];

  let heroLandscapeElement;
  let heroPortraitElement;
  let screenVideoElement;

  function initializeHLS(videoElement, source) {
    if (!videoElement) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ startLevel: 0 });
      hls.loadSource(source);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoElement.play().catch(() => {}));
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = source;
      videoElement.addEventListener('loadedmetadata', () => videoElement.play().catch(() => {}), { once: true });
    }
  }

  onMount(() => {
    initializeHLS(heroLandscapeElement, HeroLandscapeVideo);
    initializeHLS(heroPortraitElement, HeroPortraitVideo);
    initializeHLS(screenVideoElement, ScreenVideo);
  });
</script>

<svelte:head>
  <title>comma — make driving chill</title>
  <meta name="description" content="Hands-free driving for the car you already have." />
  <link rel="preload" as="image" href="/videos/hero-landscape/poster.jpg" />
  <link rel="preload" as="image" href="/videos/hero-portrait/poster.jpg" />
</svelte:head>

<section class="home-hero dark" aria-label="Hands-free driving with comma">
  <div class="hero-media hero-landscape">
    <video bind:this={heroLandscapeElement} poster="/videos/hero-landscape/poster.jpg" autoplay muted loop playsinline></video>
  </div>
  <div class="hero-media hero-portrait">
    <video bind:this={heroPortraitElement} poster="/videos/hero-portrait/poster.jpg" autoplay muted loop playsinline></video>
  </div>
  <div class="hero-shade"></div>

  <div class="hero-content">
    <h1>hands free driving for<br />the car you already have</h1>
    <div class="hero-stats">
      <div><strong>30,000+</strong><span>cars on the road with a comma</span></div>
      <div><strong>381,742,619</strong><span>miles driven</span></div>
      <div><strong>#2</strong><span>after Tesla in hands-free miles</span></div>
    </div>
    <div class="hero-actions">
      <a class="cta cta-accent" href="/vehicles">check your car <span aria-hidden="true">→</span></a>
      <a class="cta cta-dark" href="/shop/comma-four">try risk-free for 30 days <small>$0 due today</small> <span aria-hidden="true">→</span></a>
    </div>
  </div>

  <div class="brand-strip">
    <span>works with {vehicleCountText} models across 27 brands</span>
    <div class="brand-logos">
      {#each brands as brand}
        {#if brand.logo}
          <span class="brand-logo" role="img" aria-label={brand.name}>{@html brand.logo}</span>
        {:else}
          <strong>{brand.name}</strong>
        {/if}
      {/each}
    </div>
  </div>
</section>

<section class="product-section dark" id="comma-four">
  <div class="home-container product-grid">
    <div class="product-copy">
      <div class="product-intro">
        <h2>meet comma four</h2>
        <p>make driving chill with a hands-off, eyes-on driving experience</p>
      </div>
      <div class="feature-grid">
        {#each features as feature}
          <div class="feature">
            <span class="feature-icon">{@html feature.icon}</span>
            <span>{feature.label}</span>
          </div>
        {/each}
      </div>
      <a class="cta cta-accent buy-button" href="/shop/comma-four">buy now for $999 risk-free <span aria-hidden="true">→</span></a>
    </div>

    <div class="device-wrap">
      <img src={DeviceImage} alt="comma four device" />
      <video bind:this={screenVideoElement} poster="/videos/screen-video/poster.jpg" autoplay muted loop playsinline></video>
    </div>
  </div>
</section>

<section class="install-section light" id="compatibility">
  <div class="home-container install-grid">
    <div class="install-media">
      <h2>plug it in yourself,<br />hit the road in 15 mins.</h2>
      <img src="/videos/hero-landscape/poster.jpg" alt="comma installed beneath a car rear-view mirror" />
    </div>
    <div class="compatibility-list">
      <FeaturedCarsList />
      <a class="cta cta-black" href="/vehicles">see all supported cars <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="community-section dark" id="community">
  <div class="home-container">
    <h2>comma runs open source software, driving all over<br class="desktop-break" /> the world with no subscription needed</h2>

    <div class="map-wrap">
      <span class="map-label">daily active users</span>
      <img src={WorldMap} alt="World map showing comma users" />
      <div class="map-dots" aria-hidden="true">
        {#each mapDots as dot}
          <i style={`left:${dot[0]}%;top:${dot[1]}%`}></i>
        {/each}
      </div>
      <a class="map-credit" href="https://commons.wikimedia.org/wiki/File:Equirectangular_projection_world_map_without_borders.svg" target="_blank" rel="noreferrer">map: Ebrahim, CC BY-SA 4.0</a>
    </div>

    <div class="press-wrap">
      <span>Featured in</span>
      <div class="press-grid">
        {#each press as outlet}
          <a href={outlet.href} target="_blank" rel="noreferrer">
            <img class={outlet.greyscale ? 'greyscale' : ''} src={outlet.logo} alt={outlet.alt} />
          </a>
        {/each}
      </div>
    </div>

    <h2 class="follow-heading">Follow us on 𝕏 <a href="https://twitter.com/comma_ai" target="_blank" rel="noreferrer">@comma_ai</a>.</h2>
  </div>
</section>

<section class="careers-section light" id="careers">
  <div class="home-container">
    <h2>Join us in building the future.</h2>
    <div class="careers-grid">
      <div class="career-cards">
        <a href="/jobs"><small>/01</small><strong>product</strong></a>
        <a href="/jobs"><small>/02</small><strong>autonomy</strong></a>
        <a href="/jobs"><small>/03</small><strong>operations</strong></a>
      </div>
      <div class="career-copy">
        <p>We're looking for talented individuals, able to work independently, and ready to make a meaningful impact.</p>
        <a class="cta cta-black" href="/jobs">see open positions <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
</section>

<style>
  :global(main) {
    background: #000;
  }

  .home-container {
    width: min(72rem, calc(100% - 3rem));
    margin: 0 auto;
  }

  .home-hero {
    position: relative;
    height: calc(100svh - 65px);
    min-height: 40rem;
    overflow: hidden;
    padding: 0;
    color: #fff;
  }

  .hero-media,
  .hero-media video,
  .hero-shade {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .hero-media video {
    object-fit: cover;
    object-position: center;
  }

  .hero-portrait {
    display: none;
  }

  .hero-shade {
    z-index: 1;
    background: linear-gradient(90deg, rgba(0, 0, 0, .76) 0%, rgba(0, 0, 0, .18) 48%, transparent 72%),
      linear-gradient(0deg, #000 0%, rgba(0, 0, 0, .78) 10%, transparent 42%);
  }

  .hero-content {
    position: absolute;
    z-index: 2;
    left: max(2rem, calc((100vw - 90rem) / 2));
    bottom: 7.5rem;
    width: min(40rem, calc(100% - 4rem));
  }

  .hero-content h1,
  .product-section h2,
  .install-section h2,
  .community-section h2,
  .careers-section h2 {
    font-size: clamp(2rem, 3.2vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -.055em;
    line-height: .98;
    margin: 0;
  }

  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: 2.75rem;
    margin: 1.5rem 0 1.25rem;
  }

  .hero-stats div {
    display: flex;
    flex-direction: column;
    max-width: 10rem;
  }

  .hero-stats strong {
    font-size: 1.65rem;
    line-height: 1;
    font-weight: 400;
  }

  .hero-stats span {
    margin-top: .45rem;
    font-size: .72rem;
    letter-spacing: -.02em;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
  }

  .cta {
    min-height: 3.1rem;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .65rem;
    padding: .75rem 1.15rem;
    font-size: .9rem;
    font-weight: 600;
    letter-spacing: -.03em;
    transition: background-color .2s, color .2s, opacity .2s;
  }

  .cta span {
    margin-left: auto;
    font-size: 1.25rem;
    line-height: 1;
  }

  .cta small {
    margin-left: 1rem;
    font-size: .65rem;
    font-weight: 400;
  }

  .cta-accent {
    background: var(--color-accent);
    color: #000;
  }

  .cta-dark,
  .cta-black {
    color: #fff;
    background: #050505;
    border: 1px solid rgba(255, 255, 255, .65);
  }

  .cta-black {
    border: 0;
    background: #000;
  }

  .brand-strip {
    position: absolute;
    z-index: 2;
    left: max(2rem, calc((100vw - 90rem) / 2));
    right: 0;
    bottom: .75rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    min-width: 0;
  }

  .brand-strip > span {
    flex: 0 0 auto;
    font-size: .8rem;
    color: rgba(255,255,255,.76);
  }

  .brand-logos {
    min-width: 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: .5rem;
    overflow: hidden;
  }

  .brand-logo {
    width: 2.5rem;
    height: 2.5rem;
    flex: 0 0 auto;
    opacity: .58;
  }

  .brand-logo :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  .brand-logos strong {
    flex: 0 0 auto;
    color: rgba(255,255,255,.52);
    font-size: .78rem;
    letter-spacing: -.04em;
    text-transform: uppercase;
  }

  .product-section {
    padding: 4.5rem 0 5rem;
  }

  .product-grid {
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    align-items: center;
    gap: 4rem;
  }

  .product-intro > p {
    color: #9b9b9b;
    margin: .7rem 0 2.25rem;
    font-size: .95rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 2.5rem;
    margin-bottom: 2.5rem;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    font-size: .9rem;
  }

  .feature-icon {
    width: 2rem;
    height: 2rem;
    flex: 0 0 auto;
    color: #fff;
  }

  .feature-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .buy-button {
    width: 100%;
  }

  .device-wrap {
    position: relative;
    min-width: 0;
  }

  .device-wrap :global(picture),
  .device-wrap :global(picture img) {
    display: block;
    width: 100%;
  }

  .device-wrap video {
    position: absolute;
    left: 23.21%;
    top: 63.97%;
    width: 40.21%;
    height: 25.8%;
    mix-blend-mode: screen;
  }

  .install-section {
    padding: 4.5rem 0 4rem;
  }

  .install-grid {
    display: grid;
    grid-template-columns: 1.08fr .92fr;
    gap: 5rem;
    align-items: end;
  }

  .install-media h2 {
    margin-bottom: 2rem;
  }

  .install-media img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 8.5;
    object-fit: cover;
  }

  .compatibility-list .cta {
    display: flex;
    width: 100%;
    margin-top: 1rem;
  }

  .community-section {
    padding: 6rem 0 5rem;
  }

  .community-section h2 {
    max-width: 65rem;
  }

  .map-wrap {
    position: relative;
    width: min(52rem, 88%);
    margin: 4rem auto 2.5rem;
  }

  .map-label {
    display: block;
    color: rgba(255,255,255,.45);
    text-align: center;
    font-size: .8rem;
    margin-bottom: .25rem;
  }

  .map-wrap :global(picture),
  .map-wrap :global(picture img) {
    display: block;
    width: 100%;
  }

  .map-wrap :global(picture img) {
    filter: invert(1);
    opacity: .15;
  }

  .map-dots {
    position: absolute;
    inset: 1.5rem 0 0;
  }

  .map-dots i {
    position: absolute;
    width: .45rem;
    height: .45rem;
    border-radius: 50%;
    background: #00ff9c;
    box-shadow: 0 0 .45rem rgba(0,255,156,.55);
    transform: translate(-50%, -50%);
  }

  .map-credit {
    position: absolute;
    right: 0;
    bottom: -.8rem;
    color: rgba(255,255,255,.28);
    font-size: .5rem;
    letter-spacing: 0;
  }

  .press-wrap {
    margin: 1rem 0 5rem;
  }

  .press-wrap > span {
    display: block;
    color: rgba(255,255,255,.42);
    text-align: center;
    font-size: .8rem;
    margin-bottom: .75rem;
  }

  .press-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: .5rem;
  }

  .press-grid a {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem .85rem;
    background: #fff;
  }

  .press-grid img {
    width: 100%;
    max-height: 2.4rem;
    object-fit: contain;
  }

  .press-grid img.greyscale {
    filter: grayscale(1) brightness(.2);
  }

  .follow-heading a {
    border-bottom: .22rem solid var(--color-accent);
    background: linear-gradient(160deg, transparent 55%, rgba(81,255,0,.28));
  }

  .careers-section {
    padding: 5rem 0 6rem;
  }

  .careers-section h2 {
    margin-bottom: 3rem;
  }

  .careers-grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: 5rem;
    align-items: center;
  }

  .career-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .career-cards a {
    min-height: 5.8rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 1.25rem;
    border: 1px solid #000;
  }

  .career-cards small {
    font-family: 'JetBrains Mono', monospace;
    color: #777;
    font-size: .68rem;
  }

  .career-cards strong {
    color: #000;
    font-size: 1.25rem;
  }

  .career-copy p {
    margin: 0 0 1.2rem;
    font-size: 1rem;
    line-height: 1.2;
  }

  .career-copy .cta {
    width: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
    .cta-accent:hover { background: var(--color-accent-hover); }
    .cta-dark:hover, .cta-black:hover { opacity: .78; }
    .press-grid a:hover { background: #e8e8e8; }
    .career-cards a:hover { background: #f0f0f0; }
  }

  @media (max-width: 1024px) {
    .hero-content h1,
    .product-section h2,
    .install-section h2,
    .community-section h2,
    .careers-section h2 {
      font-size: 2.35rem;
    }

    .product-grid,
    .install-grid,
    .careers-grid {
      gap: 2.5rem;
    }

    .home-container {
      width: min(62rem, calc(100% - 2.5rem));
    }

    .press-grid a {
      height: 3.25rem;
      padding: .35rem .55rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .brand-logos > :nth-child(n + 9) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .home-container {
      width: calc(100% - 2rem);
    }

    .home-hero {
      height: calc(100svh - 65px);
      min-height: 43.5rem;
    }

    .hero-landscape { display: none; }
    .hero-portrait { display: block; }

    .hero-media video {
      object-position: center top;
    }

    .hero-shade {
      background: linear-gradient(0deg, #000 0%, #000 38%, rgba(0,0,0,.78) 48%, transparent 72%);
    }

    .hero-content {
      left: 1rem;
      right: 1rem;
      bottom: 7.25rem;
      width: auto;
    }

    .hero-content h1,
    .product-section h2,
    .install-section h2,
    .community-section h2,
    .careers-section h2 {
      font-size: 1.75rem;
      line-height: .98;
    }

    .hero-content h1 br {
      display: none;
    }

    .hero-stats {
      grid-template-columns: 1fr;
      gap: .55rem;
      margin: .8rem 0 1rem;
    }

    .hero-stats div {
      max-width: none;
    }

    .hero-stats strong {
      font-size: 1.2rem;
    }

    .hero-stats span {
      margin-top: .12rem;
      font-size: .62rem;
    }

    .hero-actions {
      flex-direction: column;
      gap: .55rem;
    }

    .hero-actions .cta {
      width: 100%;
      min-height: 2.75rem;
      justify-content: flex-start;
      font-size: .72rem;
    }

    .brand-strip {
      left: 0;
      right: 0;
      bottom: .25rem;
      display: block;
    }

    .brand-strip > span {
      display: block;
      padding: 0 1rem .3rem;
      font-size: .62rem;
    }

    .brand-logos {
      justify-content: flex-start;
      gap: .8rem;
      padding: 0 .3rem;
    }

    .brand-logo {
      flex: 0 0 2.2rem;
      width: 2.2rem;
      height: 2.2rem;
    }

    .brand-logos strong {
      font-size: .62rem;
    }

    .product-section {
      padding: 2.5rem 0 2rem;
    }

    .product-grid,
    .install-grid,
    .careers-grid {
      grid-template-columns: 1fr;
    }

    .product-grid {
      gap: 1.25rem;
    }

    .product-copy {
      display: contents;
    }

    .product-intro {
      grid-row: 1;
    }

    .product-intro > p {
      margin: .45rem 0 1rem;
      max-width: 20rem;
      font-size: .72rem;
      line-height: 1.05;
    }

    .device-wrap {
      grid-row: 2;
      width: min(100%, 25rem);
      margin: 0 auto;
    }

    .feature-grid {
      grid-row: 3;
      gap: 1rem .75rem;
      margin: 0 0 1.25rem;
    }

    .feature {
      gap: .65rem;
      font-size: .7rem;
    }

    .feature-icon {
      width: 1.55rem;
      height: 1.55rem;
    }

    .buy-button {
      grid-row: 4;
      min-height: 2.8rem;
      font-size: .72rem;
    }

    .install-section {
      padding: 2.5rem 0 2rem;
    }

    .install-grid {
      gap: 1rem;
    }

    .install-media h2 {
      margin-bottom: 1.25rem;
    }

    .install-media img {
      aspect-ratio: 16 / 9;
    }

    .compatibility-list {
      display: flex;
      flex-direction: column-reverse;
    }

    .compatibility-list .cta {
      margin: 0 0 1rem;
      min-height: 3rem;
      font-size: .72rem;
    }

    .community-section {
      padding: 2.75rem 0 3rem;
    }

    .desktop-break { display: none; }

    .map-wrap {
      width: 100%;
      margin: 2.25rem auto 1.75rem;
    }

    .map-label {
      font-size: .6rem;
    }

    .map-dots i {
      width: .3rem;
      height: .3rem;
    }

    .press-wrap {
      margin: 1rem 0 2.75rem;
    }

    .press-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: .45rem;
    }

    .press-grid a {
      height: 2.6rem;
      padding: .3rem .45rem;
    }

    .press-grid img {
      max-height: 1.75rem;
    }

    .follow-heading {
      font-size: 1.25rem !important;
    }

    .careers-section {
      padding: 3rem 0 3.5rem;
    }

    .careers-section h2 {
      margin-bottom: 2rem;
    }

    .careers-grid {
      gap: 1.5rem;
    }

    .career-cards {
      grid-template-columns: 1fr;
      gap: .75rem;
    }

    .career-cards a {
      min-height: 4.6rem;
    }

    .career-copy p {
      font-size: .75rem;
      margin-bottom: 1rem;
    }

    .career-copy .cta {
      min-height: 3rem;
      font-size: .72rem;
    }
  }

  @media (max-width: 390px) {
    .hero-content { bottom: 7rem; }
    .hero-content h1 { font-size: 1.55rem; }
    .hero-stats { gap: .45rem; }
  }
</style>
