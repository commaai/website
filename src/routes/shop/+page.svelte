<script>
  import LinkButton from "$lib/components/LinkButton.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import Accordion from "$lib/components/Accordion.svelte";
  import Button from "$lib/components/Button.svelte";

  import DeviceImage from "$lib/images/device.png";
  import BodyImage from "$lib/images/comma-body.png";
  import CircuitImage from "$lib/images/circuit.png";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import CalendarIcon from "$lib/icons/features/calendar.svg?raw";
  import CurrencyIcon from "$lib/icons/features/currency.svg?raw";
  import ArrowRightIcon from "$lib/icons/arrow-right.svg?raw";
  import BusinessIcon from "$lib/icons/features/business.svg?raw";
  import ContactIcon from "$lib/icons/features/contact.svg?raw";
  import ImmediateIcon from "$lib/icons/features/immediate.svg?raw";
  import AdaptiveCruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import LaneCenteringIcon from "$lib/icons/features/lane-centering.svg?raw";

  import InfoIcon from "$lib/icons/ui/info.svg?raw";

  import { THREEX_PRICE, THREEX_AFFIRM_PRICE, THREEX_SALE, THREEX_STRIKETHROUGH_PRICE } from '$lib/constants/prices.js';
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  import { addToCart } from "../../store";
  import { accessoriesList } from "./productsList";

  $: accessoryProducts = accessoriesList.map((product) => product.productInfo);
</script>

<section class="dark" id="devices">
  <div class="container">
    <article>
      <div class="product-display scenic-background">
        <Grid columns={2} alignItems="center" size="large">
          <div class="product-content">
            <Badge style="accent">4TH OF JULY SALE</Badge>
            <hgroup>
              <h1>comma 3X</h1>
              <span>
                {#if THREEX_STRIKETHROUGH_PRICE}
                  <span class="strikethrough-price">${THREEX_STRIKETHROUGH_PRICE}</span>
                {/if}
                <span class:sale-price={THREEX_SALE}>${THREEX_PRICE}</span>
              </span>
              <span class="muted">or ${THREEX_AFFIRM_PRICE}/month with Affirm.</span>
            </hgroup>
            <LinkButton href="shop/comma-3x" style="secondary" fullWidth>
              Buy now
            </LinkButton>
            <p>
              Works with {vehicleCountText} cars.
              <a class="highlight muted" href="/vehicles" target="_blank">Check compatibility</a>.
            </p>
          </div>
          <div class="mobile-first">
            <img src={DeviceImage} loading="lazy" alt="comma 3X device" />
          </div>
        </Grid>
      </div>
      <div class="traits light">
        <Grid columns={3} alignItems="stretch" columnGap="0" rowGap="0">
          <div class="trait">
            <div>{@html RecordingsIcon}</div>
            <hgroup>
              <h2>Easy to plug in</h2>
              <div>
                Watch our step-by-step videos. Get set up in your car in 15 minutes.
              </div>
            </hgroup>
          </div>
          <div class="trait">
            <div>{@html CalendarIcon}</div>
            <hgroup>
              <h2>30-day money-back trial</h2>
              <div>
                See for yourself why Consumer Reports rated us as the
                <a class="highlight" href="https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf" target="_blank">top ADAS system</a>.
              </div>
            </hgroup>
          </div>
          <div class="trait">
            <div>{@html CurrencyIcon}</div>
            <hgroup>
              <h2>Pay over time</h2>
              <div>
                Split your purchase into 3, 6, or 12 monthly payments. On a
                ${THREEX_PRICE} purchase, you may pay ${THREEX_AFFIRM_PRICE} for 12 months with a 15% APR.
              </div>
            </hgroup>
          </div>
        </Grid>
      </div>
    </article>

    <article>
      <div class="product-display">
        <Grid columns={2} alignItems="center" size="large">
          <div class="product-content">
            <Badge style="dark">Robotics Development Kit</Badge>
            <hgroup>
              <h1>body</h1>
              <span>$999</span>
              <span class="muted">or $91/month with Affirm.</span>
            </hgroup>
            <LinkButton href="/shop/body" style="secondary">Buy now</LinkButton>
            <p>
              "the future of people" –
              <a class="highlight muted" href="https://blog.comma.ai/commabody/">Read blog post.</a>
            </p>
          </div>
          <div class="mobile-first">
            <img src={BodyImage} loading="lazy" alt="comma body device" />
          </div>
        </Grid>
      </div>
    </article>
  </div>
</section>

<section class="light" id="accessories">
  <div class="container">
    <hr />
    <h1>Accessories</h1>
    <div class="products-list">
      <Grid columns={3} alignItems="stretch">
        {#each accessoryProducts.slice(0, 6) as product}
          <ProductCard {product} />
        {/each}
      </Grid>
    </div>
    <Accordion style="dark">
      <h2 class="shop-accessories-label" slot="label">Shop all accessories</h2>
      <div class="shop-accessories-list" slot="content">
        <Grid columns={3} alignItems="stretch">
          {#each accessoryProducts.slice(6) as product}
            <ProductCard {product} />
          {/each}
        </Grid>
      </div>
    </Accordion>
  </div>
</section>

<section class="light" id="services">
  <div class="container">
    <hr />
    <h1>Services</h1>
    <div class="service-item">
      <Accordion style="dark">
        <div class="service-label" slot="label">
          <hgroup>
            <h2>Meetings with comma</h2>
            <p>
              Schedule a 30 minute phone call with comma's VP of Business
              Development.
            </p>
            <span>$1000</span>
          </hgroup>
        </div>
        <div class="service-details" slot="content">
          <Grid columns={2}>
            <div>
              <h3>Overview</h3>
              <p>
                Schedule a 30 minute phone call with comma's VP of Business
                Development to discuss potential partnerships, collaborations,
                or questions about the comma ecosystem. For comma related
                inquiries only. Total cost for the meeting is $1000.
              </p>
              <blockquote>
                "The only way you're going to get me for a meeting is if you're
                writing me a check."
              </blockquote>
              <cite>- Mark Cuban</cite>
              <hr />
              <span class="price">$1,000.00</span>
              <Button
                style="accent"
                on:click={() => {
                  addToCart("gid://shopify/ProductVariant/31864968314943");
                }}
              >
                Add to cart
              </Button>
            </div>
            <div>
              <div class="side-by-side">
                {@html BusinessIcon}
                <hgroup>
                  <h4>Partnerships</h4>
                  <p>
                    Pitch ideas for potential collaboration with comma and our
                    ecosystem.
                  </p>
                </hgroup>
              </div>
              <hr />
              <div class="side-by-side">
                {@html ContactIcon}
                <hgroup>
                  <h4>Inquiries</h4>
                  <p>
                    Get a better understanding of comma services, products, and
                    limitations.
                  </p>
                </hgroup>
              </div>
              <hr />
              <div class="side-by-side">
                {@html ImmediateIcon}
                <hgroup>
                  <h4>Prompt Scheduling</h4>
                  <p>
                    Order today and get a response in days for immediate
                    scheduling.
                  </p>
                </hgroup>
              </div>
            </div>
          </Grid>
        </div>
      </Accordion>
    </div>

    <div class="service-item">
      <Accordion style="dark">
        <div class="service-label" slot="label">
          <hgroup>
            <h2>Custom car ports</h2>
            <p>
              Hire the openpilot team to add support for additional car brands
              and models.
            </p>
            <span>See pricing</span>
          </hgroup>
        </div>
        <div class="service-details" slot="content">
          <Grid columns={2}>
            <div>
              <h3>Overview</h3>
              <p>
                comma openpilot is an open source driver-assistance system.
                Currently, openpilot performs the functions of Adaptive Cruise
                Control (ACC) and Automated Lane Centering (ALC) and Lane Change
                Assist for <a class="highlight" href="/vehicles" tabindex="0">compatible vehicles</a>.
                It performs similarly to Tesla Autopilot and GM Super Cruise.
                openpilot can steer, accelerate, and brake automatically for other vehicles within its lane.
              </p>
              <p>
                Hire the comma openpilot team to add dedicated support for a new
                make or model vehicle that has electronically controllable gas,
                brake, and steering. We will work until the port is upstreamed,
                or on a branch for non production cars.<br />
              </p>
              <p>
                A car must be provided to comma prior to beginning the project.
                The porting fee includes an installed working comma 3X when the
                car is returned and open sourcing of the required interface
                hardware.<br />
              </p>
              <p>
                This service is intended for pre/non production vehicles. For
                production vehicles on the market today, we will likely do the
                port much cheaper, perhaps as cheap as the cost of the car.
              </p>
              <strong>Included</strong>
              <ul>
                <li>Fully working port for openpilot</li>
                <li>comma 3X installed in returned car</li>
                <li>Completed in 12 weeks</li>
              </ul>
              <strong>Pricing</strong>
              <ul>
                <li>$50,000 Down Payment (immediate)</li>
                <li>$500,000 Total (due at start of project)</li>
              </ul>
              <hr />
              <span class="price">$50,000.00</span>
              <Button
                style="accent"
                on:click={() => {
                  addToCart("gid://shopify/ProductVariant/31864934662207");
                }}
              >
                Add to cart
              </Button>
            </div>
            <div>
              <div class="side-by-side">
                {@html AdaptiveCruiseIcon}
                <hgroup>
                  <h4>Adaptive Cruise</h4>
                  <p>
                    Adjusts speed to maintain a safe distance from vehicles
                    ahead.
                  </p>
                </hgroup>
              </div>
              <hr />
              <div class="side-by-side">
                {@html LaneCenteringIcon}
                <hgroup>
                  <h4>Auto Lane Centering</h4>
                  <p>
                    Steers and brakes to continually center the vehicle in its
                    lane.
                  </p>
                </hgroup>
              </div>
              <hr />
              <div class="side-by-side">
                {@html ImmediateIcon}
                <hgroup>
                  <h4>Completed in 12 Weeks</h4>
                  <p>Get the fully working port for openpilot upstreamed.</p>
                </hgroup>
              </div>
            </div>
          </Grid>
        </div>
      </Accordion>
    </div>
  </div>
</section>

<style>
  section {
    background-color: unset;
  }

  #devices {
    padding: 4rem 0 0;

    & article {
      border: 1px solid #000;

      &:first-of-type {
        margin-bottom: 4rem;
      }
    }

    & .scenic-background {
      background-image: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.8),
          rgba(255, 255, 255, 0) 72%
        ), url("$lib/images/device-backdrop.jpg"),
        linear-gradient(145deg, rgba(81, 255, 0, 0), rgba(81, 255, 0, 0.25));
    }

    & .product-display {
      padding: 6rem;
      background-color: black;

      background-position:
        0 0,
        40% 42%,
        40% 30%,
        0 0;
      background-size: auto, 3200px, 3000px, auto;

      & hgroup {
        margin-bottom: 2rem;

        & h1 {
          font-size: 2.5rem;
        }

        & span {
          display: block;

          &:first-of-type {
            font-size: 1.5rem;
          }
        }

        & .strikethrough-price {
          text-decoration: line-through;
        }

        & .sale-price {
          font-weight: 700;
          color: var(--color-red);
        }

      }

      & p {
        font-size: 1.125rem;
        color: white;
      }

      & .muted {
        color: white;
        opacity: 0.75;
      }
    }

    & .traits {
      align-items: stretch;

      & .trait {
        display: flex;
        align-content: flex-start;
        padding: 1.5rem;

        & svg {
          margin-right: 1rem;
        }

        & h2 {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        border-right: 1px solid #000;

        &:last-of-type {
          border-right: none;
        }
      }
    }

    @media only screen and (max-width: 1024px) {
      & {
        padding: 2.5rem 0 0;
      }

      & .scenic-background {
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, .8) 20%,
          rgba(0, 0, 0, 0) 82%
        ), url("$lib/images/device-backdrop.jpg");
        background-position: 0 0, 50% 47% !important;
        background-size: auto, 2700px !important;
        padding: 2rem;
      }

      & .product-display {
        padding: 2rem;
        text-align: center;

        & .product-content {
          display: flex;
          flex-direction: column;
          align-items: center;

          & > a {
            width: 100%;
            box-sizing: border-box;
          }
        }
      }

      & .trait {
        flex-wrap: wrap;

        & svg {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    }

    @media only screen and (max-width: 768px) {
      & .trait {
        flex-wrap: nowrap;

        border-right: none !important;
        border-bottom: 1px solid #000;
      }

      & .trait:last-of-type {
        border-bottom: none;
      }
    }
  }

  section .container > hr {
    margin-top: 0rem;
    margin-bottom: 2rem;

    & + h1 {
      margin-bottom: 3rem;
    }
  }

  .products-list {
    margin: 2rem 0;
  }

  #accessories {
    & .shop-accessories-label {
      text-align: center;
      padding: 2rem 0;
      margin-bottom: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    & .shop-accessories-list {
      margin-top: 2rem;
    }
  }

  .service-item {
    margin-bottom: 3rem;

    & .service-label {
      color: white;
      background-color: black;
      padding: 2rem;

      & hgroup {
        & * {
          color: white;
          line-height: 1.25;
        }

        & h2 {
          margin-bottom: 0.25rem;
          font-size: 1.75rem;
          font-weight: 600;
        }

        & p {
          opacity: 0.65;
          font-size: 1.25rem;
          margin-top: 0;
        }

        & span {
          margin-top: 0.875rem;
          font-size: 1.25rem;
        }
      }
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }

    & .service-details {
      border: 1px solid #000;
      padding: 3rem 2rem;
      color: black;

      & h3 {
        margin-top: 0;
      }

      & span {
        font-weight: 700;
      }

      & hr {
        margin: 1.5rem 0;
      }

      & .side-by-side {
        display: flex;
        align-items: center;
        color: black;

        & hgroup {
          margin-left: 1rem;

          & * {
            margin: 0;
          }
          & h4 {
            font-weight: 600;
          }
        }
      }

      & .price {
        display: block;
        margin-bottom: 1rem;
        color: #4a4a4a;
      }
    }
  }
</style>
