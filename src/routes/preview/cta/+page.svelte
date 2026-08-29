<script>
  import ArrowRight from "$lib/icons/arrow-right.svg?raw";
  import { vehicleCountText } from "$lib/constants/vehicles.js";
  import DeviceImage from "$lib/images/products/comma-four/four_angled.png";

  const facts = [
    `${vehicleCountText} models across 27 brands`,
    "30 days risk-free",
    "no subscription",
  ];

  const variants = [
    { n: "01", name: "what's on the branch now", note: "headline left, both buttons right, facts on a rule underneath." },
    { n: "02", name: "centred", note: "same parts, stacked and centred. reads as an ending rather than a row." },
    { n: "03", name: "one button", note: "buy is the only action. checking your car moves into the small print." },
    { n: "04", name: "check-first", note: "the free step is the loud one, buying is secondary. matches how people actually decide." },
    { n: "05", name: "facts as the frame", note: "the three facts become the headline's supporting columns instead of a footnote." },
    { n: "06", name: "price forward", note: "$999 is the headline. the objection people have is cost, so answer it first." },
    { n: "07", name: "with the device", note: "product shot alongside. the only variant that shows the thing you're buying." },
    { n: "08", name: "full-bleed dark", note: "inverts to close the page on black, like the hero opened it." },
    { n: "09", name: "quiet", note: "no box, no rule, no facts. one line and two links." },
  ];
</script>

<svelte:head><title>closing cta — variants</title></svelte:head>

<section class="light note">
  <div class="container">
    <p>{variants.length} takes on the closing cta</p>
  </div>
</section>

{#each variants as v}
  <section class="light variant" class:inverted={v.n === "08"}>
    <div class="container">
      <div class="head">
        <span class="num">{v.n}</span>
        <h2>{v.name}</h2>
      </div>
      <p class="desc">{v.note}</p>

      {#if v.n === "01"}
        <div class="grid split">
          <div>
            <h1>ready to make driving chill?</h1>
            <p class="sub">hands free driving for the car you already have</p>
          </div>
          <div class="actions two">
            <a class="homepage-cta dark-cta" href="/vehicles">
              <span>check your car</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
            <a class="homepage-cta accent-cta" href="/shop/comma-four">
              <span>buy now for $999</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
          </div>
        </div>
        <ul class="facts">{#each facts as f}<li>{f}</li>{/each}</ul>
      {/if}

      {#if v.n === "02"}
        <div class="centred">
          <h1>ready to make driving chill?</h1>
          <p class="sub">hands free driving for the car you already have</p>
          <div class="actions two narrow">
            <a class="homepage-cta dark-cta" href="/vehicles">
              <span>check your car</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
            <a class="homepage-cta accent-cta" href="/shop/comma-four">
              <span>buy now for $999</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
          </div>
          <ul class="facts inline">{#each facts as f}<li>{f}</li>{/each}</ul>
        </div>
      {/if}

      {#if v.n === "03"}
        <div class="grid split">
          <div>
            <h1>ready to make driving chill?</h1>
            <p class="sub">hands free driving for the car you already have</p>
          </div>
          <div class="actions">
            <a class="homepage-cta accent-cta" href="/shop/comma-four">
              <span>buy now for $999</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
            <p class="under">or <a class="ul" href="/vehicles">check if your car is supported</a> first</p>
          </div>
        </div>
        <ul class="facts">{#each facts as f}<li>{f}</li>{/each}</ul>
      {/if}

      {#if v.n === "04"}
        <div class="centred">
          <h1>does it work with your car?</h1>
          <p class="sub">{vehicleCountText} models across 27 brands. check in one step.</p>
          <div class="actions narrow">
            <a class="homepage-cta accent-cta" href="/vehicles">
              <span>check your car</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
            <p class="under">already know? <a class="ul" href="/shop/comma-four">buy comma four for $999</a></p>
          </div>
        </div>
      {/if}

      {#if v.n === "05"}
        <div class="centred">
          <h1>ready to make driving chill?</h1>
        </div>
        <ul class="facts columns">
          <li><strong>{vehicleCountText}</strong><span>models across 27 brands</span></li>
          <li><strong>30 days</strong><span>risk-free returns</span></li>
          <li><strong>$0</strong><span>subscription, forever</span></li>
        </ul>
        <div class="actions two narrow centre-block">
          <a class="homepage-cta dark-cta" href="/vehicles">
            <span>check your car</span><span class="cta-arrow">{@html ArrowRight}</span>
          </a>
          <a class="homepage-cta accent-cta" href="/shop/comma-four">
            <span>buy now for $999</span><span class="cta-arrow">{@html ArrowRight}</span>
          </a>
        </div>
      {/if}

      {#if v.n === "06"}
        <div class="grid split">
          <div>
            <p class="eyebrow">comma four</p>
            <h1 class="price">$999</h1>
            <p class="sub">no subscription. 30 days risk-free. {vehicleCountText} models supported.</p>
          </div>
          <div class="actions two">
            <a class="homepage-cta dark-cta" href="/vehicles">
              <span>check your car</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
            <a class="homepage-cta accent-cta" href="/shop/comma-four">
              <span>buy now</span><span class="cta-arrow">{@html ArrowRight}</span>
            </a>
          </div>
        </div>
      {/if}

      {#if v.n === "07"}
        <div class="grid product">
          <img class="device" src={DeviceImage} alt="comma four" loading="lazy" />
          <div>
            <h1>ready to make driving chill?</h1>
            <p class="sub">hands free driving for the car you already have</p>
            <div class="actions two">
              <a class="homepage-cta dark-cta" href="/vehicles">
                <span>check your car</span><span class="cta-arrow">{@html ArrowRight}</span>
              </a>
              <a class="homepage-cta accent-cta" href="/shop/comma-four">
                <span>buy now for $999</span><span class="cta-arrow">{@html ArrowRight}</span>
              </a>
            </div>
            <ul class="facts">{#each facts as f}<li>{f}</li>{/each}</ul>
          </div>
        </div>
      {/if}

      {#if v.n === "08"}
        <div class="bleed">
          <div class="centred">
            <h1>ready to make driving chill?</h1>
            <p class="sub">hands free driving for the car you already have</p>
            <div class="actions two narrow">
              <a class="homepage-cta light-cta" href="/vehicles">
                <span>check your car</span><span class="cta-arrow">{@html ArrowRight}</span>
              </a>
              <a class="homepage-cta accent-cta" href="/shop/comma-four">
                <span>buy now for $999</span><span class="cta-arrow">{@html ArrowRight}</span>
              </a>
            </div>
            <ul class="facts inline">{#each facts as f}<li>{f}</li>{/each}</ul>
          </div>
        </div>
      {/if}

      {#if v.n === "09"}
        <div class="quiet">
          <h1>ready to make driving chill?</h1>
          <p class="links">
            <a class="ul" href="/vehicles">check your car</a>
            <span aria-hidden="true">·</span>
            <a class="ul" href="/shop/comma-four">buy comma four — $999</a>
          </p>
        </div>
      {/if}
    </div>
  </section>
{/each}

<style>
  .note p,
  .desc {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    letter-spacing: normal;
    line-height: 1.5;
    margin: 0;
  }

  .variant {
    border-top: 1px solid #000;
    padding-block: 3rem;
  }

  .head {
    align-items: baseline;
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .num {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    letter-spacing: normal;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1;
    margin: 0;
  }

  .desc {
    margin-bottom: 1.75rem;
  }

  h1 {
    font-size: clamp(2.3rem, 4vw, 4rem);
    margin: 0;
  }

  /* copied from +page.svelte, whose styles are scoped and don't reach this page */
  .homepage-cta {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-size: 1.5rem;
    font-weight: 500;
    gap: 0.75rem;
    justify-content: center;
    letter-spacing: -0.04em;
    min-height: 4.3125rem;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.2s, opacity 0.2s;
    width: 100%;

    /* app.css colours every span, so the button's text needs winning back */
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

  .accent-cta {
    background-color: var(--color-accent);
    color: black;
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

  .sub {
    color: var(--color-muted);
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    letter-spacing: -0.04em;
    line-height: 1.2;
    margin: 1rem 0 0;
  }

  .eyebrow {
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    letter-spacing: normal;
    margin: 0 0 0.5rem;
  }

  .price {
    font-size: clamp(4rem, 12vw, 9rem);
    line-height: 0.85;
  }

  .grid {
    display: grid;
    gap: 2rem 4rem;
  }

  .split {
    align-items: end;
    grid-template-columns: 1fr minmax(0, 40rem);
  }

  .product {
    align-items: center;
    grid-template-columns: minmax(0, 22rem) 1fr;
  }

  .device {
    display: block;
    width: 100%;
  }

  .centred {
    margin: 0 auto;
    max-width: 46rem;
    text-align: center;
  }

  .actions {
    display: grid;
    gap: 1rem;
  }

  .actions.two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .narrow {
    margin: 2rem auto 0;
    max-width: 34rem;
  }

  .centre-block {
    margin-top: 2.5rem;
  }

  .under {
    color: var(--color-muted);
    font-size: 0.9375rem;
    letter-spacing: normal;
    margin: 0.75rem 0 0;
  }

  .actions.two .under {
    grid-column: 1 / -1;
  }

  .ul {
    text-decoration: underline;
  }

  .facts {
    border-top: 1px solid #000;
    display: grid;
    gap: 0 2rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    list-style: none;
    margin: 2.5rem 0 0;
    padding: 1rem 0 0;

    & li {
      color: var(--color-muted);
      letter-spacing: normal;
      line-height: 1.4;
    }
  }

  .facts.inline {
    border-top: 0;
    justify-items: center;
    margin-top: 1.5rem;
    padding-top: 0;
  }

  .facts.columns {
    margin-top: 2.5rem;
    text-align: center;

    & li {
      display: grid;
      gap: 0.25rem;
    }

    & strong {
      color: var(--color-foreground);
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 600;
      letter-spacing: -0.04em;
      line-height: 1;
    }
  }

  .bleed {
    background: #000;
    color: #fff;
    padding: 4rem 2rem;
  }

  .bleed .sub,
  .bleed .facts li {
    color: #9e9e9e;
  }

  .light-cta {
    background: #fff;
    color: #000;
  }

  .quiet {
    & h1 {
      margin-bottom: 1rem;
    }

    & .links {
      display: flex;
      flex-wrap: wrap;
      font-size: 1.25rem;
      gap: 0.75rem;
      margin: 0;
    }
  }

  @media screen and (max-width: 1024px) {
    .split,
    .product {
      grid-template-columns: minmax(0, 1fr);
    }

    .actions.two {
      grid-template-columns: minmax(0, 1fr);
    }

    .facts {
      gap: 0.5rem;
      grid-template-columns: minmax(0, 1fr);
      margin-top: 2rem;
    }

    .facts.columns {
      gap: 1.5rem;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
