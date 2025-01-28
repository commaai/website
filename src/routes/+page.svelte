<script>
  import LinkButton from "$lib/components/LinkButton.svelte";
  import FeaturedCarsList from "$lib/components/FeaturedCarsList.svelte";
  import FeaturedArticles from "$lib/components/FeaturedArticles.svelte";
  import FeaturedTweets from "$lib/components/FeaturedTweets.svelte";
  import SectionHeader from "../lib/components/SectionHeader.svelte";
  import Grid from "$lib/components/Grid.svelte";

  import DeviceImage from "$lib/images/device-glow.png";
  import LaneCenteringIcon from "$lib/icons/features/lane-centering.svg?raw";
  import AdaptiveCruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import OtaUpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import LocationIcon from "$lib/icons/features/location.svg?raw";
  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
</script>

<svelte:head>
  <link rel="preload" as="image" href={DeviceImage[0]} />
</svelte:head>

<section class="dark" id="hero">
  <div class="container">
    <h1>comma 3X</h1>
    <h2 class="muted">An AI upgrade for your car</h2>
    <Grid columns={2} rowGap="3rem">
      <img
        src={DeviceImage}
        loading="lazy"
        alt="comma 3X device"
      />
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
        <LinkButton href="shop/comma-3x" fullWidth={true} style="accent">
          Buy now
        </LinkButton>
      </div>
    </Grid>
    <h1 class="mt-4">Buy it, plug it in, and engage.</h1>
    <h3 class="muted">
      comma 3X works with the car you already drive. It's like Tesla Autopilot
      for your Toyota, Honda, and more.
    </h3>
  </div>
</section>

<section class="light" id="compatibility">
  <div class="container">
    <h1 class="mb-7 sm-mb-3">openpilot can drive for hours without driver action.</h1>
    <Grid columns={2} rowGap="3rem">
      <h1>
        It works on 275+ car models
        <span class="muted">from Toyota, Hyundai, Honda, and more.</span>
      </h1>
      <div>
        <FeaturedCarsList />
        <LinkButton href="/vehicles" style="primary" fullWidth={true}>
          View all 275+ cars
        </LinkButton>
      </div>
    </Grid>
  </div>
</section>

<section class="dark" id="social">
  <div class="container">
    <SectionHeader leftLabel="comma" rightLabel="is real" />
    <h1>
      100+ million miles driven and 10k users. Our GitHub repo has
      <a href="https://github.com/commaai/openpilot" target="_blank" class="highlight">40k stars</a>.
    </h1>
    <FeaturedArticles />
    <h1>
      Follow us on 𝕏
      <a href="https://twitter.com/comma_ai" target="_blank" class="highlight">@comma_ai</a>.
    </h1>
    <FeaturedTweets />
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
          href="https://comma.ai/jobs"
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
</style>
