<script>
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import Faq from '$lib/components/Faq.svelte';

  import { faq } from '$lib/constants/faq.svelte';

  import ConnectHeroImage from "$lib/images/connect-app.png";
  import Comma3XImage from "$lib/images/device-glow.png";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import TwentyFourSevenIcon from "$lib/icons/features/twenty-four-seven.png";
  import LocationIcon from "$lib/icons/features/location.svg?raw";
  import MarkerIcon from "$lib/icons/features/marker.png";
  import SnapshotIcon from "$lib/icons/features/snapshot.png";
  import CommandLineIcon from "$lib/icons/features/command-line.svg?raw";
  import CheckmarkIcon from "$lib/icons/ui/checkmark.svg?raw";
  import CloseIcon from "$lib/icons/ui/close.svg?raw";
</script>

<div class="banner">
  <img src={ConnectHeroImage} loading="lazy" alt="comma connect application" />
</div>

<section class="light" id="connect">
  <div class="container">
    <div class="header">
      <hgroup>
        <a class="muted" href="https://connect.comma.ai/" target="_blank">connect.comma.ai</a>
        <h1>See your recorded drives online.</h1>
      </hgroup>
      <p>
        <a href="https://connect.comma.ai/" target="_blank" class="highlight">comma connect</a> is an app that lets you manage your openpilot experience.
        Recordings of your drives will upload to connect where they will be stored for 3 days.
        Subscribe to comma connect to keep your drives accessible for 1 year.
      </p>
    </div>

    <div class="features-banner">
      <Grid columns={6} columnGap="2rem" size="medium">
        <div class="icon">{@html RecordingsIcon}</div>
        <div class="icon"><img src={TwentyFourSevenIcon} loading="lazy" alt=""></div>
        <div class="icon">{@html LocationIcon}</div>
        <div class="icon"><img src={MarkerIcon} loading="lazy" alt=""></div>
        <div class="icon"><img src={SnapshotIcon} loading="lazy" alt=""></div>
        <div class="icon">{@html CommandLineIcon}</div>
      </Grid>
    </div>

    <span class="badge-prefix muted">connect</span><Badge style="dark" display="inline">subscription</Badge>
    <Grid rowGap="0" templateColumns="1.25fr 1fr">
      <h1>Access premium features with connect subscription.</h1>
      <p>Get a connect subscription for live car tracking and cloud storage of your drives for 1 year.</p>
    </Grid>

    <div id="features-table">
      <div class="row header">
        <div class="title">Features</div>
        <div class="content badge">
          <span class="badge-prefix muted">connect</span><Badge style="dark" display="inline">prime & lite subscription</Badge>
        </div>
        <div class="content badge">
          <span class="badge-prefix muted">connect</span><Badge style="dark" display="inline">free</Badge>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon">{@html RecordingsIcon}</div>
          <div>
            <hgroup>
              <div>Cloud storage of drive videos</div>
              <span class="muted">Review your driving history, access routes, and watch videos of past drives.</span>
            </hgroup>
            <div class="mobile-badge"><Badge style="dark" display="inline-flex"><span class="check">{@html CheckmarkIcon}</span> 1 year of storage</Badge></div>
          </div>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
          <div>1 year of storage</div>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
          <div>3 days of storage</div>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon"><img src={TwentyFourSevenIcon} loading="lazy" alt=""></div>
          <hgroup>
            <div>24/7 connectivity</div>
            <span class="muted">Always-on. Always LTE connected.</span>
          </hgroup>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
        </div>
        <div class="content">
          <div class="cross">{@html CloseIcon}</div>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon">{@html LocationIcon}</div>
          <hgroup>
            <div>Turn-by-turn navigation</div>
            <span class="muted">Input an address on comma connect and get turn-by-turn directions displayed on your device.</span>
          </hgroup>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
        </div>
        <div class="content">
          <div class="cross">{@html CloseIcon}</div>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon"><img src={MarkerIcon} loading="lazy" alt=""></div>
          <hgroup>
            <div>Live GPS tracking</div>
            <span class="muted">Always know your vehicle’s location with a live map view.</span>
          </hgroup>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
        </div>
        <div class="content">
          <div class="cross">{@html CloseIcon}</div>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon"><img src={SnapshotIcon} loading="lazy" alt=""></div>
          <hgroup>
            <div>Take pictures remotely</div>
            <span class="muted">Know what's going on around your car. comma 3X features HD road-facing and night-vision-enabled cabin cameras.</span>
          </hgroup>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
        </div>
        <div class="content">
          <div class="cross">{@html CloseIcon}</div>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon">{@html CommandLineIcon}</div>
          <hgroup>
            <div>Simple SSH for developers</div>
            <span class="muted">Easy way to connect and deploy code to your comma device.</span>
          </hgroup>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
        </div>
        <div class="content">
          <div class="cross">{@html CloseIcon}</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="dark" id="price">
  <div class="container">
    <Badge style="dark" display="inline">connect</Badge><Badge style="light" display="inline">subscription</Badge>
    <Grid rowGap="0" templateColumns="1.25fr 1fr">
      <h1>Real time vehicle connectivity.</h1>
      <ul class="checkmark-list">
        <li>24/7 connectivity</li>
        <li>Live GPS tracking</li>
        <li>Turn-by-turn navigation</li>
        <li>Take pictures remotely</li>
        <li>1 year storage of drive videos</li>
        <li>Simple SSH for developers</li>
      </ul>
    </Grid>
    <Grid alignItems="stretch">
      <div class="price-card">
        <div><Badge style="light" display="inline">Subscription</Badge><Badge style="accent" display="inline">Prime</Badge></div>
        <span>$24/mo.</span>
        <div class="muted">includes data</div>
        <div class="muted">*only offered in the U.S.</div>
      </div>
      <div class="price-card">
        <div><Badge style="light" display="inline">Subscription</Badge><Badge style="dark" display="inline">Lite</Badge></div>
        <span>$10/mo.</span>
        <div class="muted">supply your own SIM card<br>(no data included)</div>
        <div class="muted">*works internationally</div>
      </div>
    </Grid>

    <div class="centered">
      <LinkButton href="https://connect.comma.ai/" style="accent">Get Started</LinkButton>
    </div>

    <div class="free-trial">
      <Grid alignItems="center" columnGap="3rem">
        <div>
          <h2>Free 1-month trial with comma 3X purchase</h2>
          <LinkButton href="/shop/comma-3x" style="secondary">Buy a comma 3X</LinkButton>
        </div>
        <div class="mobile-first">
          <img src={Comma3XImage} loading="lazy" alt="comma 3X device" />
        </div>
      </Grid>
    </div>
  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.connect} title="Frequently asked questions" />
  </div>
</section>

<style>
  .banner {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url("$lib/images/vehicles/cover-vehicles-v2-3x-optimized_1.jpg");
    background-position: 50% 38%;
    background-size: cover;
    background-attachment: scroll;

    & img {
      width: 90%;
      max-width: 1360px;
      margin: 0 auto;
      padding: 5rem 1rem 0;
      display: block;
    }
  }

  .icon {
    max-width: 65px;
    min-width: 65px;
    max-height: 65px;

    & svg, & img {
      background-color: black;
      color: white;
    }

    & svg {
      padding: 0.5rem;
    }
  }

  #connect {
    & h1 {
      font-size: 2.5rem;
      font-weight: 600;
      line-height: 1.2;
      margin-top: 1rem;
    }

    & p {
      font-size: 1.5rem;
      text-wrap: balance;
    }

    & .header {
      & hgroup {
        & a {
          text-transform: uppercase;
          font-family: JetBrains Mono, monospace;
        }

        & a {
          border-bottom: 1px solid #000;
        }
      }
    }

    & .features-banner {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      margin: 6rem 0;
      padding: 8.25rem 0rem;

      background-image: radial-gradient(circle, #f8fff5, #ccffb4);

      @media screen and (max-width: 768px) {
        & {
          margin: 3rem 0;
        }
      }
    }

    & .badge-prefix {
      font-family: JetBrains Mono, monospace;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
    }

    & #features-table {
      padding-top: 2rem;

      @media screen and (max-width: 768px) {
        & {
          padding-top: 1rem;
        }
      }

      & .row {
        display: flex;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, .25);

        @media screen and (max-width: 768px) {
          & > div:not(:first-child) {
            display: none !important;
          }
        }

        & .title {
          font-size: 1.25rem;
          font-weight: 600;
          display: flex;
          width: 40%;
        }

        & .content {
          font-weight: 600;
          text-align: center;
          margin: auto;

          &.badge {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        & .check { color: var(--color-accent-hover); }
        & .cross { color: var(--color-red); }

        & .feature-overview {
          display: flex;

          & .icon {
            margin-right: 1rem;
          }

          & hgroup {
            display: flex;
            flex-direction: column;
            justify-content: center;

            & div {
              font-size: 1.25rem;
              font-weight: 600;
              line-height: 1.25;
            }
          }

          & .mobile-badge {
            display: none;

            & div {
              display: inline-flex;
              align-items: center;
              padding: 0.25rem 0.75rem;
              margin: 0.5rem 0;

              & span { margin-right: 0.5rem; }
            }

            @media screen and (max-width: 768px) {
              display: initial;
            }
          }
        }

        & > div {
          flex: 1;
        }
      }
    }
  }

  #price {
    & h1 {
      margin-top: 2rem;
    }

    & .checkmark-list {
      & li {
        list-style-image:  url("$lib/icons/ui/checkmark.svg?raw");
        margin: 1rem 0;
      }
    }

    & .price-card {
      display: flex;
      flex-direction: column;
      padding: 3rem;
      margin-top: 1rem;
      align-items: center;
      justify-content: center;
      color: white;
      border: 1px solid #fff;

      & span {
        font-size: 2rem;
        margin-top: 1.5rem;
      }

      & .muted {
        opacity: 0.65;
        margin-top: 0.75rem;
        line-height: 1.5;
        text-align: center;
      }
    }

    & .centered {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    & .free-trial {
      padding: 6rem 0 0;
    }

    @media screen and (max-width: 480px) {
      & .centered a, & .free-trial a {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
</style>
