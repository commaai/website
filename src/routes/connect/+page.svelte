<script>
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
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

<div class="banner">
  <img src={ConnectHeroImage} loading="lazy" alt="comma connect application" />
</div>

<section class="dark" id="connect">
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
      <a class="card-link" href="/support/pair-your-device" target="_blank">Learn how to pair your device with comma connect<span class="card-link-arrow" aria-hidden="true">{@html ArrowRight}</span></a>
    </div>
  </div>
</section>

<section class="light" id="price">
  <div class="container">
    <span class="badge-prefix muted">connect</span><Badge style="dark" display="inline">subscription</Badge>
    <h1>Access premium features with connect subscription.</h1>

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
          <div class="icon">{@html CommacareIcon}</div>
          <div>
            <hgroup>
              <div>commacare</div>
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
            <div>Live GPS tracking</div>
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
            <div>Livestream your cameras</div>
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

    <Grid alignItems="stretch">
      <div class="price-card">
        <div><span class="badge-prefix muted">subscription</span><Badge style="accent" display="inline">Prime</Badge></div>
        <span>$24/mo.</span>
        <div class="muted">includes data</div>
        <div class="muted">*only offered in the U.S.</div>
      </div>
      <div class="price-card">
        <div><span class="badge-prefix muted">subscription</span><Badge style="dark" display="inline">Lite</Badge></div>
        <span>$14/mo.</span>
        <div class="muted">supply your own SIM card<br>(no data included)</div>
        <div class="muted">*works internationally</div>
      </div>
    </Grid>

    <div class="button-pair">
      <LinkButton href="https://connect.comma.ai/prime" style="accent" target="_blank">Get Started</LinkButton>
      <LinkButton href="/support/activate-prime" style="primary" target="_blank">Learn how to activate prime</LinkButton>
    </div>
  </div>
</section>

<section class="light" id="free-trial">
  <div class="container">
    <div class="green-banner">
      <div class="copy">
        <h2>Get a free 1-month trial with your purchase of comma four</h2>
        <div class="button-pair">
          <LinkButton href="/shop" style="primary" target="_blank">Shop comma four</LinkButton>
          <LinkButton href="https://connect.comma.ai/prime" style="accent" target="_blank">Activate trial</LinkButton>
        </div>
      </div>
      <div class="image">
        <img src={CommaFourImage} loading="lazy" alt="comma four device" />
      </div>
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

  #connect h1, #price h1 {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-top: 1rem;
  }

  #connect {
    padding-bottom: 3rem;
    color: var(--color-foreground);

    & p {
      font-size: 1.5rem;
      text-wrap: balance;
    }

    & .header hgroup a {
      text-transform: uppercase;
      font-family: var(--font-mono);
      border-bottom: 1px solid var(--color-foreground);
    }
  }

  /* matches card links in support articles */
  .card-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    box-sizing: border-box;
    min-height: 64px;
    margin-top: 2rem;
    padding: 16px 20px;
    border: 1px solid #ddd;
    background: var(--color-card-background);
    color: var(--color-black);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.25;

    &:hover {
      background: var(--color-card-background-hover);
    }
  }

  .card-link-arrow {
    /* app.css colors every span, so take the link's color back */
    color: inherit;
    display: flex;
    flex: 0 0 28px;
    justify-content: center;
  }

  /* :global() only works in top-level selectors in Svelte 4, not inside nested rules */
  .card-link-arrow :global(svg) {
    width: 24px;
    height: 24px;
  }

  #price {
    padding-top: 3rem;

    & h1 {
      margin-top: 1.75rem;
    }

    & .badge-prefix {
      font-family: var(--font-mono);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
    }

    & #features-table {
      padding-top: 2rem;
      margin-bottom: 3rem;

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

    & .price-card {
      display: flex;
      flex-direction: column;
      padding: 3rem;
      margin-top: 1rem;
      align-items: center;
      justify-content: center;
      color: var(--color-foreground);
      border: 1px solid;

      & > span {
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

    & .button-pair {
      margin: 2rem auto 0;
    }
  }

  /* buttons side by side, both as wide as the longer one */
  .button-pair {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 1rem;
    width: fit-content;
    max-width: 100%;

    /* phones: stack them, still the same width */
    @media screen and (max-width: 600px) {
      grid-auto-flow: row;
    }
  }

  .button-pair > :global(a) {
    width: 100%;
    box-sizing: border-box;
  }

  #free-trial {
    /* section padding; the image reaches into it, leaving 2rem of green */
    --pad: 5rem;
    /* gradient centered on the image column: 50% + 23.5rem (44rem text + 3rem gap),
       or 13.5rem in from the 85%-wide container once the column hits its 27rem min */
    background-image: radial-gradient(circle at calc(50% + min(23.5rem, 42.5% - 13.5rem)) 50%, #f8fff5, #ccffb4);
    padding-block: var(--pad);

    @media screen and (min-width: 1440px) {
      --pad: 7rem;
    }

    /* text sets the row height and the image fills it; the image column's 27rem min
       makes the text shrink first, then the layout stacks */
    & .green-banner {
      display: grid;
      grid-template-columns: minmax(0, 44rem) minmax(27rem, 1fr);
      gap: 3rem;
    }

    & .copy h2 {
      margin-bottom: 2rem;
    }

    /* contain: size keeps the image out of the row height */
    & .image {
      contain: size;
      margin-block: calc(2rem - var(--pad));

      & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        /* the png has 100px more transparent space above the device than below */
        transform: translateY(-2.2%);
      }
    }

    /* stacked: image on top, heading and button row centered */
    @media screen and (max-width: 1200px) {
      background-image: radial-gradient(circle at 50% 25%, #f8fff5, #ccffb4);

      & .green-banner {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      & .copy {
        text-align: center;

        & .button-pair {
          margin: 0 auto;
        }
      }

      & .image {
        contain: none;
        margin: 0;
        order: -1;

        & img {
          max-width: 20rem;
          height: auto;
          margin: 0 auto;
        }
      }
    }
  }

  /* app.css trims padding to 1rem between two light sections */
  #faq {
    padding-top: 3rem;
  }
</style>
