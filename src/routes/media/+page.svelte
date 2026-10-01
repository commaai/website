<script>
  import CommaMarkBlackJPG from "$lib/images/brand/comma-mark-black.jpg?format=jpg&as=url";
  import CommaMarkWhiteJPG from "$lib/images/brand/comma-mark-white.jpg?format=jpg&as=url";
  import CommaWordmarkBlackJPG from "$lib/images/brand/comma-wordmark-black.jpg?format=jpg&as=url";
  import CommaWordmarkWhiteJPG from "$lib/images/brand/comma-wordmark-white.jpg?format=jpg&as=url";
  import Windshield43Image from "$lib/images/products/comma-four/windshield43.png?w=960";
  import Windshield43Download from "$lib/images/products/comma-four/windshield43.png?format=png&as=url";
  import Factory1Image from "$lib/images/manufacturing/factory-1.png?w=960";
  import Factory1Download from "$lib/images/manufacturing/factory-1.png?format=png&as=url";
  import Factory2Image from "$lib/images/manufacturing/factory-2.png?w=960";
  import Factory2Download from "$lib/images/manufacturing/factory-2.png?format=png&as=url";
  import Factory3Image from "$lib/images/manufacturing/factory-3.png?w=960";
  import Factory3Download from "$lib/images/manufacturing/factory-3.png?format=png&as=url";
  import Factory4Image from "$lib/images/manufacturing/factory-4.png?w=960";
  import Factory4Download from "$lib/images/manufacturing/factory-4.png?format=png&as=url";
  import Factory5Image from "$lib/images/manufacturing/factory-5.png?w=960";
  import Factory5Download from "$lib/images/manufacturing/factory-5.png?format=png&as=url";
  import Factory6Image from "$lib/images/manufacturing/factory-6.png?w=960";
  import Factory6Download from "$lib/images/manufacturing/factory-6.png?format=png&as=url";
  import WindshieldImage from "$lib/images/products/comma-four/windshield.jpg?w=1600";
  import WindshieldDownload from "$lib/images/products/comma-four/windshield.jpg?format=jpg&as=url";
  import BoardImage from "$lib/images/products/comma-four/circuit-board.png?w=960";
  import BoardDownload from "$lib/images/products/comma-four/circuit-board.png?format=png&as=url";
  import FrontImage from "$lib/images/products/comma-four/four_front.png?w=960";
  import BackImage from "$lib/images/products/comma-four/four_back.png?w=960";
  import AngledImage from "$lib/images/products/comma-four/four_angled.png?w=960";
  import SideImage from "$lib/images/products/comma-four/four_side.png?w=960";
  import ScreenImage from "$lib/images/products/comma-four/four_screen_on.png?w=960";
  import FrontDownload from "$lib/images/products/comma-four/four_front.png?format=png&as=url";
  import BackDownload from "$lib/images/products/comma-four/four_back.png?format=png&as=url";
  import AngledDownload from "$lib/images/products/comma-four/four_angled.png?format=png&as=url";
  import SideDownload from "$lib/images/products/comma-four/four_side.png?format=png&as=url";
  import ScreenDownload from "$lib/images/products/comma-four/four_screen_on.png?format=png&as=url";
  import DriverMonitoringVideo from "$lib/images/products/comma-four/driver-monitoring-demo.mp4";
  import DrivingVideo from "$lib/images/products/comma-four/driving-landscape.mp4";
  import SetupVideo from "$lib/images/setup/comma-four/setup-stopmotion.mp4";
  import { vehicleCountText } from "$lib/constants/vehicles.js";

  const manufacturingVideoUrl = "https://www.youtube.com/watch?v=bM_tojv4ZDg";
  let videoCopyStatus = "";

  async function copyVideoUrl() {
    try {
      await navigator.clipboard.writeText(manufacturingVideoUrl);
      videoCopyStatus = "copied";
    } catch {
      videoCopyStatus = "error";
    }
  }

  const brandAssets = [
    { title: "comma wordmark — black", src: CommaWordmarkBlackJPG, name: "comma-wordmark-black", dark: false, wordmark: true },
    { title: "comma wordmark — white", src: CommaWordmarkWhiteJPG, name: "comma-wordmark-white", dark: true, wordmark: true },
    { title: "comma mark — black", src: CommaMarkBlackJPG, name: "comma-mark-black", dark: false },
    { title: "comma mark — white", src: CommaMarkWhiteJPG, name: "comma-mark-white", dark: true },
  ];

  const factoryImages = [
    { title: "Circuit board assembly line", image: Factory1Image, download: Factory1Download, name: "comma-factory-1.png" },
    { title: "Device assembly station", image: Factory2Image, download: Factory2Download, name: "comma-factory-2.png" },
    { title: "Screens ready for devices", image: Factory3Image, download: Factory3Download, name: "comma-factory-3.png" },
    { title: "Device testing", image: Factory4Image, download: Factory4Download, name: "comma-factory-4.png" },
    { title: "Component reels", image: Factory5Image, download: Factory5Download, name: "comma-factory-5.png" },
    { title: "Circuit board assembly line", image: Factory6Image, download: Factory6Download, name: "comma-factory-6.png" },
  ];

  const productImages = [
    { title: "Screen on", image: ScreenImage, download: ScreenDownload, name: "comma-four-screen-on.png" },
    { title: "On the windshield", image: Windshield43Image, download: Windshield43Download, name: "comma-four-windshield.png" },
    { title: "Front", image: FrontImage, download: FrontDownload, name: "comma-four-front.png" },
    { title: "Angled view", image: AngledImage, download: AngledDownload, name: "comma-four-angled.png" },
    { title: "Back", image: BackImage, download: BackDownload, name: "comma-four-back.png" },
    { title: "Side profile", image: SideImage, download: SideDownload, name: "comma-four-side.png" },
    { title: "Circuit board", image: BoardImage, download: BoardDownload, name: "comma-four-circuit-board.png" },
  ];
  const videos = [
    { title: "comma four with openpilot", src: DrivingVideo, name: "comma-four-driving.mp4" },
    { title: "Driver monitoring", src: DriverMonitoringVideo, name: "comma-driver-monitoring.mp4" },
    { title: "comma four installation", src: SetupVideo, name: "comma-four-installation.mp4", fill: true },
  ];
</script>

<svelte:head>
  <title>Media — comma.ai</title>
  <meta name="description" content="Company background, product images, and videos for press coverage of comma.ai, comma four, and openpilot." />
  <link rel="canonical" href="https://comma.ai/media" />
</svelte:head>

<section class="light">
  <div class="container">
    <h1>Media</h1>
    <a class="asset header-image" href={WindshieldDownload} download="comma-four-windshield.jpg">
      <img src={WindshieldImage} alt="comma four mounted beneath the rearview mirror during a highway drive" fetchpriority="high" />
      <span class="asset-caption">comma four on the road<span class="asset-action">Download full-resolution JPG ↓</span></span>
    </a>
    <div class="copy">
      <h2>We're solving self driving cars while delivering shippable intermediaries.</h2>
      <p>We make the <a class="release-link" href="/shop/comma-four">comma four</a> and develop <a class="release-link" href="/openpilot">openpilot</a>, an open source advanced driver assistance system. We're bringing driver assistance to cars on the road today like Hyundais, Toyotas, Fords, and more ({vehicleCountText} supported models).</p>
    </div>
  </div>
</section>

<section class="light">
  <div class="container">
    <h2>Introducing the comma four</h2>
    <div class="copy">
      <p>comma four brings the compute, cameras, and functionality of comma 3X into a device one-fifth the size. Its three-camera system fits within the footprint of a 1.9-inch display, with the compute tucked behind the rearview mirror.</p>
      <p>A new mechanical and thermal design, an OLED touchscreen, and a simplified installation make comma four our next generation hardware for openpilot. Designed, manufactured, and assembled on-site in San Diego.</p>
    </div>
    <a class="release-link" href="https://blog.comma.ai/comma-four/">comma four announcement →</a>
  </div>
</section>

<section class="light">
  <div class="container">
    <div class="media-section">
      <h3>comma four</h3>
      <div class="asset-grid">
        {#each productImages as asset}
          <a class="asset" href={asset.download} download={asset.name}>
            <div class="image-preview"><img src={asset.image} alt="comma four — {asset.title}" loading="lazy" /></div>
            <span class="asset-caption">{asset.title}<span class="asset-action">Download {asset.format || "PNG"} ↓</span></span>
          </a>
        {/each}
      </div>
    </div>

    <div class="media-section">
      <h3>Videos</h3>
      <div class="video-grid">
        {#each videos as video}
          <div class="asset video-asset">
            <video class:fill-preview={video.fill} controls playsinline preload="metadata" aria-label={video.title} src={video.src}></video>
            <a class="asset-caption" href={video.src} download={video.name}>{video.title}<span class="asset-action">Download MP4 ↓</span></a>
          </div>
        {/each}
      </div>
    </div>

    <div class="media-section" id="built-in-america">
      <h3>Designed &amp; Built in America</h3>
      <div class="asset video-asset">
        <iframe
          class="manufacturing-video"
          src="https://www.youtube.com/embed/bM_tojv4ZDg?playsinline=1"
          title="comma four - Built in America"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div class="asset-caption">
          comma four — Built in America
          <button class="asset-action copy-video-url" type="button" on:click={copyVideoUrl} aria-live="polite">
            {videoCopyStatus === "copied" ? "Copied!" : "Copy video URL"}
          </button>
        </div>
        {#if videoCopyStatus === "error"}
          <div class="copy-fallback" role="status">
            Couldn't copy automatically. Select and copy the URL:
            <input aria-label="Video URL" readonly value={manufacturingVideoUrl} on:focus={(event) => event.currentTarget.select()} />
          </div>
        {/if}
      </div>
      <div class="copy">
        <p>We assemble, provision, test, and ship comma four from our San Diego factory. Circuit board assembly happens in-house, on machines we own and operate.</p>
        <p>Our two surface-mount production lines handle solder paste printing, component placement, reflow, and automated 3D inspection. Our Ultimate Provisioning fixture brings software flashing, provisioning, and overnight stress testing together.</p>
      </div>
      <div class="asset-grid factory-grid">
        {#each factoryImages as asset}
          <a class="asset" href={asset.download} download={asset.name}>
            <div class="image-preview"><img src={asset.image} alt={asset.title} loading="lazy" /></div>
            <span class="asset-caption">{asset.title}<span class="asset-action">Download PNG ↓</span></span>
          </a>
        {/each}
      </div>

    </div>

    <div class="media-section" id="brand-assets">
      <h3>Brand assets</h3>
      <div class="asset-grid">
        {#each brandAssets as asset}
          <a class="asset" href={asset.src} download="{asset.name}.jpg">
            <div class="image-preview brand-preview" class:dark-preview={asset.dark} class:wordmark-preview={asset.wordmark}>
              <img src={asset.src} alt={asset.title} loading="lazy" />
            </div>
            <span class="asset-caption">{asset.title}<span class="asset-action">Download JPG ↓</span></span>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  section.light {
    --section-gap: 4rem;
    --grid-gap: 1.5rem;
    --preview-height: 18rem;
    --asset-border: #ccc;
  }
  section.light, section.light + section.light { padding: 0 0 var(--section-gap); }
  section.light:first-of-type { padding-top: 2rem; }
  .copy { font-size: 1.125rem; line-height: 1.6; }
  .copy > p { margin: 0 0 1rem; }
  .copy > :last-child { margin-bottom: 0; }
  .copy + .release-link { display: inline-block; margin-top: 1rem; }
  h2, h3 { font-weight: 400; line-height: 1.25; margin: 0 0 1.5rem; }
  h2 { font-size: 2rem; }
  h3 { border-bottom: 1px solid var(--asset-border); font-size: 1.5rem; padding-bottom: 1rem; }
  .header-image { margin-bottom: var(--section-gap); }
  .header-image :global(img) { display: block; width: 100%; height: auto; }
  .release-link { text-decoration: underline; text-underline-offset: 0.2em; }
  .media-section + .media-section { margin-top: var(--section-gap); }
  .factory-grid { margin-top: 2rem; }
  #built-in-america > .video-asset { margin-bottom: 2rem; }
  .asset-grid, .video-grid { display: grid; gap: var(--grid-gap); align-items: stretch; }
  .asset-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .video-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .asset { display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--asset-border); background: #fff; }
  .asset:hover, .asset:focus-within { border-color: #000; }
  .asset:focus-visible, .copy-video-url:focus-visible, .release-link:focus-visible { outline: 2px solid #000; outline-offset: 3px; }
  .image-preview { position: relative; height: var(--preview-height); flex-shrink: 0; background: #f8f9fa; }
  .image-preview :global(img) { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: block; width: calc(100% - 3rem); height: calc(100% - 3rem); margin: 0; object-fit: contain; }
  .brand-preview { background: #fff; }
  .brand-preview :global(img) { width: 64px; height: 112px; }
  .wordmark-preview :global(img) { width: calc(100% - 3rem); max-width: 300px; height: 112px; }
  .dark-preview { background: #111; }
  .asset-caption { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; flex: 1; gap: 0.75rem; padding: 1rem; font-size: 1rem; line-height: 1.4; }
  .asset-action { flex-shrink: 0; margin-left: auto; font: inherit; font-size: 0.875rem; letter-spacing: inherit; text-decoration: underline; text-underline-offset: 0.2em; white-space: nowrap; }
  .copy-video-url { border: 0; padding: 0; background: transparent; color: inherit; cursor: pointer; }
  video, .manufacturing-video { display: block; width: 100%; aspect-ratio: 16 / 9; flex-shrink: 0; border: 0; background: #111; }
  video { object-fit: contain; }
  video.fill-preview { object-fit: cover; }
  .copy-fallback { padding: 0 1rem 1rem; font-size: 0.875rem; }
  .copy-fallback input { box-sizing: border-box; display: block; width: 100%; margin-top: 0.5rem; padding: 0.5rem; border: 1px solid var(--asset-border); color: inherit; background: #fff; font: inherit; letter-spacing: inherit; }
  @media (max-width: 1024px) {
    .asset-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 768px) {
    section.light { --section-gap: 3rem; --preview-height: 16.75rem; }
    h2 { font-size: 1.75rem; }
    .asset-grid, .video-grid { grid-template-columns: 1fr; }
  }
</style>
