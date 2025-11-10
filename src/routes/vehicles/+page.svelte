<script>
  import vehicles from '$lib/vehicles.json'
  import compatibilityMeta from '$lib/compatibility-meta.json'
  import Grid from '$lib/components/Grid.svelte';
  import Accordion from '$lib/components/Accordion.svelte';
  import CommunityBanner from '$lib/components/CommunityBanner.svelte';
  import Faq from '$lib/components/Faq.svelte';
  import LinkButton from '$lib/components/LinkButton.svelte';
  import NoteCard from '$lib/components/NoteCard.svelte';

  import { faq } from '$lib/constants/faq.svelte';

  import YoutubeIcon from '$lib/icons/social/youtube.svg?raw';
  import InfoIcon from '$lib/icons/ui/info.svg?raw';
  import CarIcon from '$lib/icons/features/car.svg?raw';

  import CommaFourImage from '$lib/images/products/comma-four/four_screen_on.png';

  import { FOUR_PRICE } from '$lib/constants/prices.js';
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  const brand_images = import.meta.glob('$lib/images/vehicles/brand-icons/*.png', { eager: true });
</script>

<div class="vehicles-cover-image"></div>

<section id="vehicles" class="light">
  <div class="container">
    <Grid columnGap="4rem" rowGap="2rem" templateColumns="1.25fr 1fr">
      <div class="title">
        openpilot supports {vehicleCountText} vehicles
      </div>
      <div class="description">
        A supported vehicle is one that just works when you install a comma four.
        All supported cars provide a better experience than any stock system.
        Supported vehicles reference the US market unless otherwise specified.
      </div>
    </Grid>

    <div class="compatibility-make-links">
      {#each Object.entries(vehicles) as [brand, cars]}
        {#if cars.length !== 0}
        {@const brand_img_path = `/src/lib/images/vehicles/brand-icons/Logo-${brand}.png`}
        <div class="compatibility-make-element">
          <a href="#{brand.toLowerCase()}" class="compatibility-make-anchor-link">
            {#if brand_images[brand_img_path]}
              <img src={brand_images[brand_img_path].default} loading="eager" alt="{brand} car brand" />
            {/if}
          </a>
          <div class="compatibility-make-name">{brand}</div>
        </div>
        {/if}
      {/each}
    </div>

    <hgroup class="headline">
      <span>Don't see your car?</span>
      <p>
        If you don't see your car, it means that it is not currently supported.
      </p>
      <p>
        If you have a modern car and some programming skills, you can likely add support for your car.
      </p>
      <p>
        Watch
        <a href="https://youtu.be/XxPS5TpTUnI" class="highlight">this talk</a>
        and check out the
        <a href="https://github.com/commaai/openpilot/blob/master/docs/CARS.md#dont-see-your-car-here" class="highlight">docs</a>
        to learn more.
      </p>
    </hgroup>

    <p class="last-updated">Last updated: {compatibilityMeta.last_updated}</p>

    <div class="recommended-cars">
      <hgroup>
        <span>Our favorite openpilot cars</span>
        <p>Generally, newer Hyundai and Toyota models are great choices. These are some of our favorites:</p>
      </hgroup>
      <div class="recommended-car-columns">
        <Grid columns="4" size="large" wrapMode="single">
          <div class="recommended-car-stack">
            <strong>EV</strong>
            <div>Kia EV6</div>
            <div>Hyundai Ioniq 5</div>
            <div>Toyota Prius 2021–22</div>
          </div>
          <div class="recommended-car-stack">
            <strong>SUV</strong>
            <div>Toyota Highlander 2020–23</div>
            <div>Hyundai Palisade 2020–22</div>
          </div>
          <div class="recommended-car-stack">
            <strong>Sedan</strong>
            <div>Toyota Corolla 2020–22</div>
            <div>Hyundai Sonata 2020–23</div>
          </div>
          <div class="recommended-car-stack">
            <strong>Truck</strong>
            <div>Ram 1500 2019–24</div>
            <div>Chevrolet Silverado 1500 2020–⁠21</div>
          </div>
        </Grid>
      </div>
    </div>
  </div>
</section>

<section class="light" id="compatibility-chart">
  <div class="container" style="width:85%; max-width: 60rem">
    {#each Object.entries(vehicles) as [make, cars]}
      {#if cars.length !== 0}
      {@const brand_img_path = `/src/lib/images/vehicles/brand-icons/Logo-${make}.png`}
      <div id={make.toLowerCase()} class="car-make-header">
        {#if brand_images[brand_img_path]}
          <img src={brand_images[brand_img_path].default} alt="{make} car brand" />
        {/if}
        <h3>{make} <span class="muted">({cars.length})</span></h3>
      </div>

      {#each cars as car_info}
        <div class="car-row">
          <Accordion backgroundColor="var(--color-card-background)">
            <div slot="label">
              <div class="car-details-wrapper">
                <div class="car-details">
                  <div class="model"><strong>{car_info.model}</strong></div>
                  <div class="year">{car_info.year_list}</div>
                </div>
                <div class="video-icon-wrapper">
                  {#if car_info.video !== ""}
                    <a href={car_info.video} target="_blank">{@html YoutubeIcon}</a>
                  {/if}
                </div>
              </div>
            </div>
            <div class="detail-content" slot="content">
              <div class="car-detail-content-wrapper">
                <Grid columns={2} rowGap="0" columnGap="2rem" templateColumns="3fr 2fr">
                  <div>
                    <div class="car-detail-tier">{@html car_info.detail_sentence }</div>
                    <div class="cards">
                      <NoteCard title="Support" icon={CarIcon} style="elevated">
                        {#if car_info.package !== 'All'}
                          openpilot requires the car to come equipped with <b>{car_info.package}</b>.
                        {:else}
                          openpilot will work with <b>all packages and trims</b> of this car.
                        {/if}
                      </NoteCard>
                      {#each car_info.footnotes as footnote}
                        <NoteCard title="Note" icon={InfoIcon} style="elevated">
                          {@html footnote}
                        </NoteCard>
                      {/each}
                    </div>
                  </div>
                  <div class="device-promotion-card">
                    <div class="product-wrapper">
                      <img src={CommaFourImage} loading="lazy" alt="comma four device" />
                      <hgroup>
                        <strong>comma four</strong>
                        <div class="understated-price">${FOUR_PRICE}</div>
                        {#if car_info.harness_connector !== "" }
                          <strong>car harness: { car_info.harness_connector }</strong>
                          <div class="understated-price">included</div>
                        {/if}
                      </hgroup>
                    </div>
                    <LinkButton
                      href={`/shop/comma-four?harness=${car_info.name}`}
                      style="primary"
                      fullWidth
                      thin
                    >
                      Buy now
                    </LinkButton>
                    <div class="description">
                      <strong>30-day money-back trial</strong>
                      <div>Don't love it? It's easy to return your device within <strong>30 days</strong> after receiving it for a full refund.</div>
                    </div>
                  </div>
                </Grid>
              </div>
            </div>
          </Accordion>
        </div>
      {/each}
      {/if}
    {/each}
  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.openpilot} title="openpilot FAQ" />
  </div>
</section>

<section class="dark" id="community">
  <div class="container">
    <CommunityBanner />
  </div>
</section>

<style>
  section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .vehicles-cover-image {
    background-image: url("/videos/hero/poster.jpg");
    background-position: 50% 30%;
    background-size: cover;
    background-attachment: scroll;
    height: 287px;
  }

  #vehicles {
    padding-bottom: 0;

    & .title {
      text-transform: uppercase;
      font-family: Monument Extended Black, sans-serif;
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.2;

      @media screen and (max-width: 512px) {
        font-size: 1.5rem;
      }
    }

    & .description {
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.3;
    }

    & .headline {
      margin: 3rem auto 0;

      & span {
        margin-bottom: 0.5rem;
      }

      & p {
        margin: 0;
        text-wrap: balance;
      }
    }

    & hgroup {
      text-align: center;
      font-size: 1.25rem;

      & span {
        font-size: 1.5rem;
        font-weight: 700;
        display: block;
      }

      & p {
        margin-top: 0.5rem;
      }
    }

    & .compatibility-make-links {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fit, 105px);
      justify-content: space-between;
      margin: 2rem 0 3rem;
    }

    & .compatibility-make-element {
      width: 105px;
      margin-bottom: 1.5rem;
    }

    @media screen and (max-width: 480px) {
      & .compatibility-make-links {
        grid-template-columns: repeat(auto-fit, 85px);
      }
      & .compatibility-make-element {
        width: 85px;
      }
    }

    & .compatibility-make-anchor-link {
      border: 1px solid rgba(0, 0, 0, .12);
      padding: 4px;
      transition: all 0.2s;
      display: block;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          transform: scale(1.02);
          border: 1px solid rgba(0, 0, 0, .5);
        }
      }
      &:active {
        transform: scale(1.02);
        border: 1px solid rgba(0, 0, 0, .5);
      }
    }


    & .compatibility-make-name {
      text-align: center;
      margin-top: .5rem;
      line-height: 1.2;
    }
  }

  .last-updated {
    text-align: center;
    font-style: italic;
    margin-bottom: 1rem;
  }

  .recommended-cars {
    width: 85%;
    margin: 2rem auto;
    background-color: var(--color-card-background);
    border: 1px solid rgba(0, 0, 0, .4);
    padding: 2rem 1rem;

    & .recommended-car-columns {
      margin-top: 3rem;

      & .recommended-car-stack {
        text-align: center;
        font-size: 1.25rem;

        & strong {
          margin-bottom: .5rem;
          font-weight: 700;
        }
      }
    }
  }

  .car-make-header {
    background-color: #000;
    justify-content: flex-start;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 0;
    padding: 1rem;
    display: flex;

    & img {
      width: 48px;
      margin-right: 1rem;
    }

    & h3 {
      color: #fff;
      font-weight: 700;
      font-size: 1.5em;
      margin: 0;

      & .muted {
        color: #fff;
        font-weight: 700;
        opacity: .65;
      }
    }
  }

  .car-row {
    background-color: var(--color-card-background);
    border-bottom: 1px solid rgba(0, 0, 0, .4);
  }

  .car-details-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;

    & .car-details {
      display: flex;
      flex: 1;

      @media screen and (max-width: 768px) {
        & {
          flex-flow: column wrap;
        }
      }

      & .model {
        flex: 1;
        margin-right: 8px;
        font-weight: 600;
        padding-right: 20px;
      }

      & .year {
        flex: 2;
      }
    }

    & .video-icon-wrapper {
      width: 20px;
      height: 20px;
      margin-left: 2rem;

      & svg {
        color: #ff0000;
      }
    }
  }

  .detail-content {
    width: 100%!important;
  }

  .car-detail-content-wrapper {
    padding: 12px 16px 16px;
    display: block;
  }

  .car-detail-tier {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  .cards {
    @media screen and (min-width: 768px) {
      & div:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .device-promotion-card {
    background-color: rgba(68, 65, 58, .12);
    border: 1px solid rgba(117, 93, 36, .25);
    padding: .75rem;
    font-size: 14px;

    & .product-wrapper {
      justify-content: space-between;
      align-items: center;
      display: flex;
      margin-bottom: 0.75rem;

      & .strikethrough-price {
        text-decoration: line-through;
        margin-right: .5rem;
      }

      & .red-price {
        color: var(--color-red);
        font-weight: 700;
      }

      & img {
        width: 64px;
        height: 64px;
        padding: 0.25rem;
        margin-right: .75rem;
        background-color: #fff;
        border: 1px solid #ccc;
        object-fit: contain;
      }

      & hgroup {
        flex: 1;
        margin-right: .75rem;

        & strong {
          font-size: 1rem;
          font-weight: 600;
        }

        & .understated-price {
          opacity: .65;
        }

        & div {
          font-size: .875rem;
        }
      }
    }

    & .description {
      border-top: 1px solid rgba(117, 93, 36, .25);
      margin: .5rem 0;
      padding-top: .75rem;
      font-size: 1rem;
    }
  }

  #faq {
    margin-bottom: 3rem;
  }
</style>
