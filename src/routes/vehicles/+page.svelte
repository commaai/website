<script>
  import Seo from "$lib/components/Seo.svelte";
  import vehicles from '$lib/vehicles.json'
  import compatibilityMeta from '$lib/compatibility-meta.json'
  import Grid from '$lib/components/Grid.svelte';
  import CommunityBanner from '$lib/components/CommunityBanner.svelte';
  import Faq from '$lib/components/Faq.svelte';
  import LinkButton from '$lib/components/LinkButton.svelte';
  import EmailUpdatesForm from '$lib/components/EmailUpdates/EmailUpdatesForm.svelte';

  import { faq } from '$lib/constants/faq.svelte';

  import YoutubeIcon from '$lib/icons/social/youtube.svg?raw';

  // shown at 64px, so a small copy instead of the 3360px original
  import CommaFourImage from '$lib/images/products/comma-four/four_screen_on.png?w=128';

  import { FOUR_PRICE, FOUR_STRIKETHROUGH_PRICE, FOUR_SALE } from '$lib/constants/prices.js';
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  import ShopPayInstallments from '$lib/components/ShopPayInstallments.svelte';
  import { goto } from '$app/navigation';

  const brand_images = import.meta.glob('$lib/images/vehicles/brand-icons/*.png', { eager: true });

  // the buy box (price, installments, trial) is only built for cars that were opened
  let opened = {};
</script>

<Seo
  title="vehicle compatibility: {vehicleCountText} supported cars — comma.ai"
  description="Check if your car works with comma four and openpilot. {vehicleCountText} supported car models from Toyota, Hyundai, Honda, Ford, and more."
/>

<div class="vehicles-cover-image"></div>

<section id="vehicles" class="light">
  <div class="container">
    <Grid columnGap="4rem" rowGap="2rem" templateColumns="1.25fr 1fr">
      <h1 class="title type-display type-h3">
        <span translate="no">openpilot</span> supports {vehicleCountText} vehicles
      </h1>
      <div class="description type-large">
        A supported vehicle is one that just works when you install a <span translate="no">comma four</span>.
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
          <div class="compatibility-make-name type-strong">{brand}</div>
        </div>
        {/if}
      {/each}
    </div>

    <EmailUpdatesForm
      title="Don't see your car?"
      defaultCategory="compatibility"
      askForCar
    >
      <p>
        New cars are added with each <span translate="no">openpilot</span> release. Get an email when compatibility changes.
      </p>
      <p>
        If you have a modern car and some programming skills, you can likely add support for your car.
        Watch <a href="https://youtu.be/XxPS5TpTUnI" target="_blank" class="highlight">this talk</a> and check out the
        <a href="https://github.com/commaai/openpilot/blob/master/docs/CARS.md#dont-see-your-car-here" target="_blank" class="highlight">docs</a>
        to learn more.
      </p>
    </EmailUpdatesForm>

    <div class="recommended-cars">
      <hgroup>
        <h2>Our favorite <span translate="no">openpilot</span> cars</h2>
      </hgroup>
      <div class="recommended-car-columns">
        <Grid columns="4" size="large" wrapMode="single">
          <div class="recommended-car-stack type-large">
            <strong>EV</strong>
            <div>Kia EV6</div>
            <div>Hyundai Ioniq 5</div>
            <div>Toyota Prius 2021&#8209;22</div>
          </div>
          <div class="recommended-car-stack type-large">
            <strong>SUV</strong>
            <div>Volkswagen ID.4 2021&#8209;25</div>
            <div>Toyota Highlander 2020&#8209;23</div>
            <div>Hyundai Palisade 2020&#8209;22</div>
            <div>Tesla Model Y</div>
          </div>
          <div class="recommended-car-stack type-large">
            <strong>Sedan</strong>
            <div>Toyota Corolla 2020&#8209;22</div>
            <div>Hyundai Sonata 2020&#8209;23</div>
            <div>Tesla Model 3</div>
          </div>
          <div class="recommended-car-stack type-large">
            <strong>Truck</strong>
            <div>Ram 1500 2019&#8209;24</div>
            <div>Chevrolet Silverado 1500 2020&#8209;21</div>
          </div>
        </Grid>
      </div>
    </div>
  </div>
</section>

<section class="light" id="compatibility-chart">
  <div class="container" style="width:85%; max-width: 60rem">
    <p class="last-updated type-italic">Last updated: {compatibilityMeta.last_updated}</p>

    {#each Object.entries(vehicles) as [make, cars]}
      {#if cars.length !== 0}
      {@const brand_img_path = `/src/lib/images/vehicles/brand-icons/Logo-${make}.png`}
      <div id={make.toLowerCase()} class="car-make-header">
        {#if brand_images[brand_img_path]}
          <img src={brand_images[brand_img_path].default} loading="lazy" alt="{make} car brand" />
        {/if}
        <h3 class="type-h4">{make} <span class="muted">({cars.length})</span></h3>
      </div>

      <!-- every car's details stay in the HTML for search engines, so each row is kept light:
           native <details>, icons from the stylesheet, and the buy box only built when opened -->
      {#each cars as car_info}
        <details class="car-row">
          <summary on:click={() => (opened[car_info.name] = true)}>
            <span class="car-details">
              <strong class="model">{car_info.model}</strong>
              <span class="year">{car_info.year_list}</span>
            </span>
            <span class="video-icon-wrapper">
              {#if car_info.video !== ""}
                <a href={car_info.video} target="_blank" aria-label="{car_info.name} video">{@html YoutubeIcon}</a>
              {/if}
            </span>
          </summary>
          <div class="car-detail-content-wrapper">
            <div>
              <div class="car-detail-tier type-large">{@html car_info.detail_sentence }</div>
              <div class="cards">
                <div class="note support-note">
                  <div>
                    <span class="type-label">Support</span>
                    <div class="type-small">
                      {#if car_info.package !== 'All'}
                        <span translate="no">openpilot</span> requires the car to come equipped with <b>{car_info.package}</b>.
                      {:else}
                        <span translate="no">openpilot</span> will work with <b>all packages and trims</b> of this car.
                      {/if}
                    </div>
                  </div>
                </div>
                {#each car_info.footnotes as footnote}
                  <div class="note">
                    <div>
                      <span class="type-label">Note</span>
                      <div class="type-small">{@html footnote}</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
            <div class="device-promotion-card">
              {#if opened[car_info.name]}
                <div class="product-wrapper">
                  <img src={CommaFourImage} loading="lazy" alt="comma four device" />
                  <hgroup>
                    <strong translate="no">comma four</strong>
                    {#if FOUR_SALE}
                      <div style="display: flex; align-items: center;">
                        {#if FOUR_STRIKETHROUGH_PRICE}
                          <div class="understated-price strikethrough-price type-small">${FOUR_STRIKETHROUGH_PRICE}</div>
                        {/if}
                        <div class="red-price type-small type-strong">${FOUR_PRICE}</div>
                      </div>
                    {:else}
                      <div class="understated-price type-small">${FOUR_PRICE}</div>
                    {/if}
                    {#if car_info.harness_connector !== "" }
                      <strong>car harness: { car_info.harness_connector }</strong>
                      <div class="understated-price type-small">included</div>
                    {/if}
                  </hgroup>
                </div>
                <div class="installments type-small">
                  <span class="label type-label">Pay over time</span>
                  <ShopPayInstallments split inline amount={FOUR_PRICE} onCheckout={() => goto(`/shop/comma-four?harness=${car_info.name}`)} />
                </div>
              {:else if car_info.harness_connector !== ""}
                <p class="harness-connector"><strong>car harness: { car_info.harness_connector }</strong></p>
              {/if}
              <LinkButton
                href={`/shop/comma-four?harness=${car_info.name}`}
                style="primary"
                fullWidth
                thin
              >
                Buy now
              </LinkButton>
              {#if opened[car_info.name]}
                <div class="description">
                  <strong>30-day money-back trial</strong>
                  <div>Don't love it? It's easy to return your device within <strong>30 days</strong> after receiving it for a full refund.</div>
                </div>
              {/if}
            </div>
          </div>
        </details>
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
    background-image: url("/videos/hero-landscape/poster.jpg");
    background-position: 50% 30%;
    background-size: cover;
    background-attachment: scroll;
    height: 287px;
  }

  #vehicles {
    padding-bottom: 0;

    & h1.title {
      margin: 0;
    }

    & .compatibility-make-links {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fit, 105px);
      justify-content: space-between;
      margin: 2rem 0 3rem;

      @media screen and (min-width: 769px) {
        margin-top: 4rem;
      }
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
      border: 1px solid rgba(0, 0, 0, .4);
      background-color: var(--color-card-background);
      padding: 4px;
      transition: all 0.2s;
      display: block;

      & img {
        width: 100%;
        aspect-ratio: 105 / 107;
        mix-blend-mode: multiply;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          transform: scale(1.02);
          border: 1px solid rgba(0, 0, 0, .8);
          background-color: var(--color-card-background-hover);
        }
      }

      &:active {
        transform: scale(1.02);
        border: 1px solid rgba(0, 0, 0, .8);
        background-color: var(--color-card-background-hover);
      }
    }


    & .compatibility-make-name {
      text-align: center;
      margin-top: .5rem;
    }
  }

  .last-updated {
    text-align: center;
    margin-bottom: 1rem;
  }

  /* TODO: extract shared card class */
  .recommended-cars {
    margin: 3rem 0;
    background-color: var(--color-card-background);
    border: 1px solid rgba(0, 0, 0, .4);
    padding: 3rem;

    & .recommended-car-columns {
      margin-top: 3rem;

      & .recommended-car-stack {
        display: grid;
        gap: 0.5em;
      }
    }

    @media screen and (max-width: 768px) {
      padding: 2rem 1rem;
    }
  }

  .recommended-cars hgroup {
    & h2 {
      margin: 0 0 0.75rem;
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
      margin: 0;

      & .muted {
        color: #fff;
        opacity: .65;
      }
    }
  }

  .car-row {
    background-color: var(--color-card-background);
    border-bottom: 1px solid rgba(0, 0, 0, .4);
    color: black;
  }

  .car-row summary {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px calc(4rem + 16px) 14px 16px;
    cursor: pointer;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      right: 2rem;
      width: 18px;
      height: 12px;
      background-color: currentColor;
      -webkit-mask: url("../../lib/icons/icon-chevron.svg") center / contain no-repeat;
      mask: url("../../lib/icons/icon-chevron.svg") center / contain no-repeat;
    }

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

  .car-row[open] summary::after {
    transform: rotate(180deg);
  }

  .car-detail-content-wrapper {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-auto-columns: 1fr;
    column-gap: 2rem;
    align-items: flex-start;
    padding: 12px 16px 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .car-detail-tier {
    margin-bottom: 1rem;
  }

  /* same look as <NoteCard style="elevated">, without a component and an inline icon per car */
  .note {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem;
    color: black;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: rgba(68, 65, 58, .12);

    &::before {
      content: "";
      flex: 0 0 2rem;
      align-self: stretch;
      min-height: 2rem;
      margin-right: 1rem;
      background-color: currentColor;
      -webkit-mask: url("../../lib/icons/ui/info.svg") left center / 24px 24px no-repeat;
      mask: url("../../lib/icons/ui/info.svg") left center / 24px 24px no-repeat;
    }

    &.support-note::before {
      -webkit-mask-image: url("../../lib/icons/features/car.svg");
      mask-image: url("../../lib/icons/features/car.svg");
      -webkit-mask-size: 32px 32px;
      mask-size: 32px 32px;
    }

    & .type-small {
      color: #000000A6;
    }
  }

  .cards {
    @media screen and (min-width: 768px) {
      & .note:last-child {
        margin-bottom: 0;
      }
    }
  }

  .harness-connector {
    margin: 0 0 0.75rem;
  }

  .device-promotion-card {
    background-color: rgba(68, 65, 58, .12);
    border: 1px solid rgba(117, 93, 36, .25);
    padding: .75rem;

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
        color: var(--color-sale-red);
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

        & .understated-price {
          opacity: .65;
        }
      }
    }

    & .installments {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: .25rem 1rem;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: .5rem .75rem;
      margin-bottom: .75rem;
      --installments-rest-font-size: var(--text-sm); /* type deviation: D3, ShopPay's size API into its shadow root */

      & .label {
        opacity: .65;
      }
    }

    & .description {
      border-top: 1px solid rgba(117, 93, 36, .25);
      margin: .5rem 0;
      padding-top: .75rem;
    }
  }

  #faq {
    margin-bottom: 3rem;
  }
</style>
