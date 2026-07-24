<script>
  import { onMount } from "svelte";
  import { vehicleCountText } from "$lib/constants/vehicles.js";

  import ArrowBlack from "$lib/icons/home/hero-arrow-black.svg";
  import ArrowWhite from "$lib/icons/home/hero-arrow-white.svg";
  import ChevroletLogo from "$lib/icons/home/brands/chevrolet.svg";
  import FordLogo from "$lib/icons/home/brands/ford.svg";
  import HondaLogo from "$lib/icons/home/brands/honda.svg";
  import HyundaiLogo from "$lib/icons/home/brands/hyundai.svg";
  import KiaLogo from "$lib/icons/home/brands/kia.svg";
  import LexusLogo from "$lib/icons/home/brands/lexus.svg";
  import NissanLogo from "$lib/icons/home/brands/nissan.svg";
  import SubaruLogo from "$lib/icons/home/brands/subaru.svg";
  import ToyotaLogo from "$lib/icons/home/brands/toyota.svg";
  import VolkswagenLogo from "$lib/icons/home/brands/volkswagen.svg";

  const stats = [
    {
      value: "30,000+",
      label: "cars on the road with a comma",
    },
    {
      value: "381,742,619",
      label: "miles driven",
    },
    {
      value: "#2",
      label: "after Tesla in hands-free miles",
    },
  ];

  const brands = [
    { name: "Toyota", logo: ToyotaLogo },
    { name: "Hyundai", logo: HyundaiLogo },
    { name: "Ford", logo: FordLogo },
    { name: "Kia", logo: KiaLogo },
    { name: "Honda", logo: HondaLogo },
    { name: "Lexus", logo: LexusLogo },
    { name: "Subaru", logo: SubaruLogo },
    { name: "Volkswagen", logo: VolkswagenLogo },
    { name: "Chevrolet", logo: ChevroletLogo },
    { name: "Nissan", logo: NissanLogo },
  ];

  let logoViewportElement;
  let logoGroupCount = 2;
  let logoSequenceWidth = 0;

  function measureLogoMarquee() {
    const logoGroupElement = logoViewportElement?.querySelector(".logo-group");
    const viewportWidth = logoViewportElement?.getBoundingClientRect().width ?? 0;
    const sequenceWidth = logoGroupElement?.getBoundingClientRect().width ?? 0;

    if (viewportWidth === 0 || sequenceWidth === 0) return;

    logoSequenceWidth = sequenceWidth;
    logoGroupCount = Math.max(2, Math.ceil(viewportWidth / sequenceWidth) + 1);
  }

  onMount(() => {
    const resizeObserver = new ResizeObserver(measureLogoMarquee);
    resizeObserver.observe(logoViewportElement);
    resizeObserver.observe(logoViewportElement.querySelector(".logo-group"));
    measureLogoMarquee();

    return () => resizeObserver.disconnect();
  });
</script>

<div class="hero-overlay">
  <div class="hero-content">
    <h1>
      hands free driving<span class="desktop-tail">&nbsp;for</span><br />
      <span class="mobile-prefix">for </span>the car you already have
    </h1>

    <div class="hero-stats">
      {#each stats as stat}
        <div class="stat">
          <span class="stat-value">{stat.value}</span>
          <span class="stat-label">{stat.label}</span>
        </div>
      {/each}
    </div>

    <div class="hero-actions">
      <a class="hero-action primary" href="/vehicles">
        <span>check your car</span>
        <img class="action-arrow" src={ArrowBlack} alt="" width="22" height="15" />
      </a>
      <a class="hero-action secondary" href="/shop/comma-four">
        <span>try risk-free for 30 days</span>
        <span class="action-detail">
          <!-- TODO: Show after we have $0 down. -->
          <!-- <span>$0 due today</span> -->
          <img class="action-arrow" src={ArrowWhite} alt="" width="22" height="15" />
        </span>
      </a>
    </div>

    <div class="hero-compatibility">
      <p>works with {vehicleCountText} models across 27 brands</p>
      <div class="logo-viewport" aria-hidden="true" bind:this={logoViewportElement}>
        <div
          class="logo-track"
          class:ready={logoSequenceWidth > 0}
          style:--logo-sequence-width={`${logoSequenceWidth}px`}
        >
          {#each Array(logoGroupCount) as _, duplicate}
            <div class="logo-group">
              {#each brands as brand}
                <img
                  src={brand.logo}
                  alt=""
                  title={duplicate === 0 ? brand.name : undefined}
                />
              {/each}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hero-overlay {
    align-items: flex-end;
    color: white;
    display: flex;
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 3;
  }

  .hero-content {
    --hero-gutter: clamp(1.25rem, 2.3vw, 3rem);

    box-sizing: border-box;
    padding: 0 var(--hero-gutter) var(--hero-gutter);
    pointer-events: auto;
    width: 100%;
  }

  h1 {
    color: white;
    font-size: clamp(3rem, 4vw, 4rem);
    letter-spacing: -0.04em;
    line-height: 1;
    margin: 0;
    max-width: 44rem;
    text-shadow: 0 0 12px rgba(0, 0, 0, 0.8);
  }

  .mobile-prefix {
    display: none;
  }

  .hero-stats {
    display: grid;
    gap: 3.5625rem;
    grid-template-columns: 14rem 16rem 8.5rem;
    margin-top: 2.5rem;
    width: 45.625rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
  }

  .stat-value,
  .stat-label {
    color: white;
    text-shadow: 0 0 12px rgba(0, 0, 0, 0.8);
  }

  .stat-value {
    font-size: 3rem;
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1.2;
    margin-top: 0.9375rem;
  }

  .hero-actions {
    display: flex;
    gap: 2.5rem;
    margin-top: 1.6875rem;
    width: 45.75rem;
  }

  .hero-action {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: -0.04em;
    min-height: 4.3125rem;
    padding: 1.25rem;
    transition: background-color 0.2s;
  }

  .hero-action > span,
  .action-detail > span {
    color: inherit;
  }

  .action-arrow {
    display: block;
    flex: 0 0 1.375rem;
    height: 0.9375rem;
    width: 1.375rem;
  }

  .hero-action.primary {
    background: var(--color-accent);
    color: black;
    gap: 0.75rem;
    justify-content: center;
    width: 14.3125rem;
  }

  .hero-action.secondary {
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    color: white;
    justify-content: space-between;
    width: 28.9375rem;
  }

  .action-detail {
    align-items: center;
    color: white;
    display: flex;
    flex: 0 0 auto;
    font-size: 0.75rem;
    gap: 0.625rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .hero-action.primary:hover {
      background: var(--color-accent-hover);
    }

    .hero-action.secondary:hover {
      background: rgba(0, 0, 0, 0.72);
    }
  }

  .hero-action.primary:active {
    background: var(--color-accent-hover);
  }

  .hero-action.secondary:active {
    background: rgba(0, 0, 0, 0.72);
  }

  .hero-compatibility {
    align-items: center;
    display: flex;
    gap: 2.25rem;
    margin-top: 2.125rem;
    min-width: 0;
  }

  .hero-compatibility p {
    color: white;
    flex: 0 0 27.8125rem;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 1;
    margin: 0;
    text-shadow: 0 0 12px rgba(0, 0, 0, 0.8);
  }

  .logo-viewport {
    flex: 1;
    height: 2.1875rem;
    mask-image: linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent);
    min-width: 0;
    overflow: hidden;
  }

  .logo-track {
    display: flex;
    width: max-content;
  }

  .logo-track.ready {
    animation: logo-scroll 24s linear infinite;
  }

  .logo-group {
    align-items: center;
    display: flex;
    gap: 1.875rem;
    padding-right: 1.875rem;
  }

  .logo-group img {
    display: block;
    flex: 0 0 auto;
    height: auto;
    max-height: 2.1875rem;
    max-width: 3.25rem;
    width: auto;
  }

  @keyframes logo-scroll {
    to {
      transform: translateX(calc(-1 * var(--logo-sequence-width)));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .logo-track.ready {
      animation: none;
    }
  }

  @media screen and (min-width: 769px) {
    h1,
    .hero-action > span {
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 768px) {
    .hero-overlay {
      display: flex;
      flex: 1;
      inset: auto;
      margin-top: -8.9375rem;
      position: relative;
    }

    .hero-content {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    h1 {
      font-size: 1.75rem;
      line-height: 1;
      max-width: none;
    }

    .desktop-tail {
      display: none;
    }

    .mobile-prefix {
      display: inline;
    }

    .hero-stats {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      margin-top: 1rem;
      width: auto;
    }

    .stat-value {
      font-size: 1.75rem;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 400;
      margin-top: 0.375rem;
    }

    .hero-actions {
      flex-direction: column;
      gap: 0.625rem;
      margin-top: 1rem;
      width: auto;
    }

    .hero-action {
      font-size: 1rem;
      justify-content: space-between;
      min-height: 3.6875rem;
      padding: 1.25rem;
      width: 100%;
    }

    .hero-action.primary,
    .hero-action.secondary {
      justify-content: space-between;
      width: 100%;
    }

    .action-detail {
      font-size: 1rem;
    }

    .hero-compatibility {
      flex-direction: column;
      gap: 1.0625rem;
      margin-top: auto;
      padding-top: 1.25rem;
    }

    .hero-compatibility p {
      flex-basis: auto;
      font-size: 1rem;
      text-align: center;
      width: 100%;
    }

    .logo-viewport {
      flex: none;
      margin-left: calc(0rem - var(--hero-gutter));
      width: calc(100% + var(--hero-gutter));
    }
  }
</style>
