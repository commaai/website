<script>
  import Seo from "$lib/components/Seo.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import Faq from '$lib/components/Faq.svelte';
  import EmailUpdatesForm from '$lib/components/EmailUpdates/EmailUpdatesForm.svelte';

  import { faq } from '$lib/constants/faq.svelte';

  import ConnectHeroImage from "$lib/images/connect-app.png";
  import CommaFourImage from "$lib/images/products/comma-four/four_screen_on.png";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import TwentyFourSevenIcon from "$lib/icons/features/twenty-four-seven.png";
  import MarkerIcon from "$lib/icons/features/marker.png";
  import LivestreamIcon from "$lib/icons/features/livestream.svg?raw";
  import CommandLineIcon from "$lib/icons/features/command-line.svg?raw";
  import CommacareIcon from "$lib/icons/features/commacare.svg?raw";
  import CheckmarkIcon from "$lib/icons/ui/checkmark.svg?raw";
  import CloseIcon from "$lib/icons/ui/close.svg?raw";
  import ArrowRight from "$lib/icons/arrow-right.svg?raw";
</script>

<Seo
  title="comma connect: see your recorded drives online — comma.ai"
  description="comma connect lets you watch your recorded drives online and manage your openpilot experience. Drives are kept for 3 days, or 1 year with a subscription."
/>

<div class="banner">
  <img src={ConnectHeroImage} loading="lazy" alt="comma connect application" />
</div>

<section class="light" id="connect">
  <div class="container">
    <div class="header">
      <hgroup>
        <a class="muted type-label" href="https://connect.comma.ai/" target="_blank">connect.comma.ai</a>
        <h1 class="type-h2">See your recorded drives online.</h1>
      </hgroup>
      <p class="type-lead">
        <a href="https://connect.comma.ai/" target="_blank" class="highlight">comma connect</a> is an app that lets you manage your openpilot experience.
        Recordings of your drives will upload to connect where they will be stored for 3 days.
        Subscribe to comma connect to keep your drives accessible for 1 year.
      </p>
      <div class="cta-row">
        <a class="cta dark-cta type-lead" href="/support/pair-your-device" target="_blank">
          <span>How to pair comma device with comma connect</span>
          <span class="cta-arrow" aria-hidden="true">{@html ArrowRight}</span>
        </a>
      </div>
    </div>

    <div class="features-banner">
      <Grid columns={6} wrapMode="double" columnGap="2rem" size="medium">
        <div class="icon">{@html RecordingsIcon}</div>
        <div class="icon"><img src={TwentyFourSevenIcon} loading="lazy" alt=""></div>
        <div class="icon"><img src={MarkerIcon} loading="lazy" alt=""></div>
        <div class="icon">{@html LivestreamIcon}</div>
        <div class="icon">{@html CommandLineIcon}</div>
        <div class="icon">{@html CommacareIcon}</div>
      </Grid>
    </div>

    <span class="badge-prefix muted type-label">connect</span><Badge style="dark" display="inline">subscription</Badge>
    <Grid rowGap="0" templateColumns="1.25fr 1fr">
      <h2 class="type-h2">Access premium features with connect subscription.</h2>
      <p class="type-lead">Get a connect subscription for live car tracking and cloud storage of your drives for 1 year.</p>
    </Grid>

    <div id="features-table">
      <div class="row header">
        <div class="title type-h5">Features</div>
        <div class="content badge">
          <span class="badge-prefix muted type-label">connect</span><Badge style="dark" display="inline">prime & lite subscription</Badge>
        </div>
        <div class="content badge">
          <span class="badge-prefix muted type-label">connect</span><Badge style="dark" display="inline">free</Badge>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon">{@html RecordingsIcon}</div>
          <div>
            <hgroup>
              <div class="type-h5">Cloud storage of drive videos</div>
              <span class="muted">Review your driving history, access routes, and watch videos of past drives.</span>
            </hgroup>
            <div class="mobile-badge"><Badge style="dark" display="inline-flex"><span class="check">{@html CheckmarkIcon}</span> 1 year of storage</Badge></div>
          </div>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
          <div class="type-strong">1 year of storage</div>
        </div>
        <div class="content">
          <div class="check">{@html CheckmarkIcon}</div>
          <div class="type-strong">3 days of storage</div>
        </div>
      </div>
      <div class="row">
        <div class="feature-overview">
          <div class="icon"><img src={TwentyFourSevenIcon} loading="lazy" alt=""></div>
          <hgroup>
            <div class="type-h5">24/7 connectivity</div>
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
          <div class="icon">{@html CommacareIcon}</div>
          <div>
            <hgroup>
              <div class="type-h5">commacare</div>
              <span class="muted">Extend your comma four's standard one year warranty for an additional year. <a class="muted-link" href="#what-is-commacare">See Terms</a></span>
            </hgroup>
          </div>
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
            <div class="type-h5">Live GPS tracking</div>
            <span class="muted">Always know your vehicle's location with a live map view.</span>
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
          <div class="icon">{@html LivestreamIcon}</div>
          <hgroup>
            <div class="type-h5">Livestream your cameras</div>
            <span class="muted">See around your car in real time with HD road-facing and night-vision cabin cameras.</span>
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
            <div class="type-h5">Simple SSH for developers</div>
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
      <h2 class="type-h1">Real time vehicle connectivity.</h2>
      <ul class="checkmark-list type-lead">
        <li>24/7 connectivity</li>
        <li>Live GPS tracking</li>
        <li>Livestream your cameras</li>
        <li>1 year storage of drive videos</li>
        <li>Simple SSH for developers</li>
      </ul>
    </Grid>
    <Grid alignItems="stretch">
      <a class="price-card" href="https://connect.comma.ai/prime" target="_blank">
        <div><Badge style="light" display="inline">Subscription</Badge><Badge style="accent" display="inline">Prime</Badge></div>
        <span class="type-h3 type-regular">$24/mo.</span>
        <div class="muted">includes data</div>
        <div class="muted">*only offered in the U.S.</div>
      </a>
      <a class="price-card" href="https://connect.comma.ai/prime" target="_blank">
        <div><Badge style="light" display="inline">Subscription</Badge><Badge style="dark" display="inline">Lite</Badge></div>
        <span class="type-h3 type-regular">$14/mo.</span>
        <div class="muted">supply your own SIM card<br>(no data included)</div>
        <div class="muted">*works internationally</div>
      </a>
    </Grid>

    <div class="free-trial">
      <Grid alignItems="center" columnGap="3rem">
        <div>
          <h2 class="type-regular">Free 1-month trial with comma four purchase</h2>
          <div class="cta-row">
            <a class="cta light-cta type-lead" href="/shop">
              <span>Shop comma four</span>
              <span class="cta-arrow" aria-hidden="true">{@html ArrowRight}</span>
            </a>
            <a class="cta accent-cta type-lead" href="https://connect.comma.ai/prime" target="_blank">
              <span>Activate trial</span>
              <span class="cta-arrow" aria-hidden="true">{@html ArrowRight}</span>
            </a>
          </div>
        </div>
        <div class="mobile-first">
          <img src={CommaFourImage} loading="lazy" alt="comma four device" />
        </div>
      </Grid>
    </div>
  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <EmailUpdatesForm
      title="See what's new"
      defaultCategory="product"
      margin="2rem 0 4rem"
    >
      <p>
        Get an email when we launch something new.
      </p>
    </EmailUpdatesForm>
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

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }

  .cta {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    min-height: 4.3125rem;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.2s, opacity 0.2s;

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

  .dark-cta {
    background: black;
    color: white;
  }

  .light-cta {
    background: white;
    color: black;
  }

  .accent-cta {
    background-color: var(--color-accent);
    color: black;
  }

  .dark-cta:active,
  .light-cta:active {
    opacity: 0.75;
  }

  .accent-cta:active {
    background-color: var(--color-accent-hover);
  }

  @media (hover: hover) and (pointer: fine) {
    .dark-cta:hover,
    .light-cta:hover {
      opacity: 0.75;
    }

    .accent-cta:hover {
      background-color: var(--color-accent-hover);
    }
  }

  @media screen and (max-width: 768px) {
    .cta {
      justify-content: space-between;
      min-height: 3.6875rem;
      padding: 0.75rem 1.25rem;
      width: 100%;
    }
  }

  #connect {
    & .type-h2 {
      margin-top: 1rem;
    }

    & p {
      text-wrap: balance;
    }

    & .header {
      & hgroup {
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
          display: flex;
          width: 40%;
        }

        & .content {
          text-align: center;
          margin: auto;

          &.badge {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        & .check {
          color: var(--color-accent-hover);
        }

        & .cross {
          color: var(--color-red);
        }

        & .feature-overview {
          display: flex;

          & .icon {
            margin-right: 1rem;
          }

          & hgroup {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          & .mobile-badge {
            display: none;

            & div {
              display: inline-flex;
              align-items: center;
              padding: 0.25rem 0.75rem;
              margin: 0.5rem 0;

              & span {
                margin-right: 0.5rem;
              }
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
    & .type-h1 {
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
      cursor: pointer;

      & span {
        margin-top: 1.5rem;
      }

      & .muted {
        opacity: 0.65;
        margin-top: 0.75rem;
        text-align: center;
      }
    }

    & .free-trial {
      padding: 6rem 0 0;
    }
  }
</style>
