<script>
  import { onMount, tick } from "svelte";
  import vehicles from "$lib/vehicles.json";
  import { vehicleCountText } from "$lib/constants/vehicles.js";

  import ArrowRight from "$lib/icons/arrow-right.svg?raw";
  import AcuraLogo from "$lib/icons/home/brands/acura.svg";
  import AudiLogo from "$lib/icons/home/brands/audi.svg";
  import ChevroletLogo from "$lib/icons/home/brands/chevrolet.svg";
  import CupraLogo from "$lib/icons/home/brands/cupra.svg";
  import FordLogo from "$lib/icons/home/brands/ford.svg";
  import GmcLogo from "$lib/icons/home/brands/gmc.svg";
  import HondaLogo from "$lib/icons/home/brands/honda.svg";
  import HyundaiLogo from "$lib/icons/home/brands/hyundai.svg";
  import JeepLogo from "$lib/icons/home/brands/jeep.svg";
  import KiaLogo from "$lib/icons/home/brands/kia.svg";
  import LexusLogo from "$lib/icons/home/brands/lexus.svg";
  import LincolnLogo from "$lib/icons/home/brands/lincoln.svg";
  import ManLogo from "$lib/icons/home/brands/man.svg";
  import MazdaLogo from "$lib/icons/home/brands/mazda.svg";
  import NissanLogo from "$lib/icons/home/brands/nissan.svg";
  import RamLogo from "$lib/icons/home/brands/ram.svg";
  import RivianLogo from "$lib/icons/home/brands/rivian.svg";
  import SeatLogo from "$lib/icons/home/brands/seat.svg";
  import SkodaLogo from "$lib/icons/home/brands/skoda.svg";
  import SubaruLogo from "$lib/icons/home/brands/subaru.svg";
  import TeslaLogo from "$lib/icons/home/brands/tesla.svg";
  import ToyotaLogo from "$lib/icons/home/brands/toyota.svg";
  import VolkswagenLogo from "$lib/icons/home/brands/volkswagen.svg";

  const MILES_ANCHOR_VALUE = 381_742_619;
  const MILES_ANCHOR_TIME = Date.parse("2026-07-24T19:18:54Z");
  // Rounded from the last 30 completed days in orm_routes5 (346,251 miles/day).
  const MILES_PER_DAY = 346_000;
  const MILES_PER_MILLISECOND = MILES_PER_DAY / 86_400_000;

  const brands = [
    AcuraLogo, AudiLogo, ChevroletLogo, CupraLogo, FordLogo, GmcLogo, HondaLogo,
    HyundaiLogo, JeepLogo, KiaLogo, LexusLogo, LincolnLogo, ManLogo, MazdaLogo,
    NissanLogo, RamLogo, RivianLogo, SeatLogo, SkodaLogo, SubaruLogo, TeslaLogo,
    ToyotaLogo, VolkswagenLogo,
  ];

  // vehicles.json already ships to this page for the "325+" count, so searching it
  // costs nothing extra. Flattened once at module scope, never rendered in bulk.
  const ALL_CARS = Object.entries(vehicles).flatMap(([make, list]) =>
    list.map((car) => ({
      make,
      name: car.name,
      model: car.model,
      years: car.years,
      detail: car.detail_sentence,
      video: car.video,
      search: car.name.toLowerCase(),
    })),
  );

  const MAX_RESULTS = 6;

  let query = "";
  let activeIndex = 0;
  let picked = null;
  let inputEl;
  let finderEl;
  let listboxOpen = false;
  let videoPlaying = false;

  function onWindowPointerDown(event) {
    if (finderEl && finderEl.contains(event.target)) return;
    if (picked) picked = null;
    listboxOpen = false;
  }

  function onWindowKeydown(event) {
    if (event.key === "Escape" && picked) picked = null;
  }

  $: trimmed = query.trim().toLowerCase();
  $: results =
    trimmed.length < 2
      ? []
      : ALL_CARS.filter((car) => car.search.includes(trimmed)).slice(0, MAX_RESULTS);
  $: if (results.length && activeIndex >= results.length) activeIndex = 0;

  // 57 of the 332 cars already carry a community video URL in vehicles.json.
  function youtubeId(url) {
    const match = /(?:youtu\.be\/|[?&]v=)([A-Za-z0-9_-]{11})/.exec(url || "");
    return match ? match[1] : null;
  }

  $: pickedVideo = picked ? youtubeId(picked.video) : null;
  // /vehicles links as ?harness=<car name>; HarnessSelector decodeURIComponent()s it.
  $: buyHref = picked
    ? `/shop/comma-four?harness=${encodeURIComponent(picked.name)}`
    : "/shop/comma-four";
  $: videoThumb = pickedVideo ? `https://i.ytimg.com/vi/${pickedVideo}/hqdefault.jpg` : null;
  // Click-to-play, so the click is a user gesture and audio is allowed.
  $: videoEmbed = pickedVideo ? `https://www.youtube.com/embed/${pickedVideo}?autoplay=1` : null;

  // --- AUTOPLAY VARIANT (swap in by commenting out the two lines above) ---------------
  // Loads the player immediately on select instead of on click. Costs ~1MB of YouTube
  // player JS per selection. Muted because Chrome blocks audible autoplay.
  // $: videoEmbed = pickedVideo
  //   ? `https://www.youtube.com/embed/${pickedVideo}?autoplay=1&mute=1&playsinline=1&rel=0`
  //   : null;
  // ------------------------------------------------------------------------------------

  function pick(car) {
    picked = car;
    videoPlaying = false;
    listboxOpen = false;
    query = "";
  }

  async function reset() {
    picked = null;
    await tick();
    inputEl?.focus();
  }

  function onKeydown(event) {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % results.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + results.length) % results.length;
    } else if (event.key === "Enter") {
      event.preventDefault();
      pick(results[activeIndex]);
    } else if (event.key === "Escape") {
      listboxOpen = false;
    }
  }

  function estimateMilesDriven(now = Date.now()) {
    const elapsed = Math.max(0, now - MILES_ANCHOR_TIME);
    return Math.floor(MILES_ANCHOR_VALUE + elapsed * MILES_PER_MILLISECOND);
  }

  let milesDriven = estimateMilesDriven();
  $: milesChars = milesDriven.toLocaleString("en-US").split("");

  // Prerendered, so the value above is baked at build time and would visibly jump when
  // hydration corrects it. This runs during parsing, so the first paint is already right.
  const PREPAINT_MILES = `<script>(function(){` +
    `var e=document.getElementById('miles-odometer');if(!e)return;` +
    `var v=Math.floor(${MILES_ANCHOR_VALUE}+Math.max(0,Date.now()-${MILES_ANCHOR_TIME})*${MILES_PER_MILLISECOND});` +
    `var d=String(v).split(''),c=e.querySelectorAll('.odo-col');` +
    `for(var i=0;i<c.length&&i<d.length;i++){c[i].style.transform='translateY(-'+(d[i]*(100/20))+'%)'}` +
    `})()<\/script>`;

  const ODO_CELLS = 20; // 0-9 twice
  const ODO_STEP = 100 / ODO_CELLS;

  // Always rolls upward. The column carries 0-9 twice, so a wrap advances into the second
  // copy rather than running the column backwards, and the rebase happens lazily on the
  // following tick — both copies show the same glyph, so snapping between them is invisible.
  //
  // Deliberately not driven by transitionend. That fired unreliably (ticks coalesce, and the
  // event bubbles up from the digit spans), and a missed one left the column parked on the
  // duplicate zero, so the next tick rolled backwards through every digit to get to 1.
  // Two copies also absorb a multi-step jump: from 9 the furthest target is index 18.
  function roll(node, digit) {
    let idx = digit;
    node.style.transform = `translateY(-${idx * ODO_STEP}%)`;
    return {
      update(next) {
        if (idx >= 10) {
          node.style.transition = "none";
          idx -= 10;
          node.style.transform = `translateY(-${idx * ODO_STEP}%)`;
          void node.offsetHeight; // commit the rebase before transitioning again
          node.style.transition = "";
        }
        const steps = (next - idx + 10) % 10;
        if (!steps) return;
        idx += steps;
        node.style.transform = `translateY(-${idx * ODO_STEP}%)`;
      },
    };
  }

  // Cycles real supported models through the empty field — doubles as a hint that the
  // list is broad, rather than being decoration.
  const EXAMPLES = ["corolla", "sonata", "niro ev", "rav4", "palisade", "lexus es"];
  let exampleIndex = 0;

  onMount(() => {
    const update = () => (milesDriven = estimateMilesDriven());
    update();
    const timer = window.setInterval(update, 250);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cycle;
    if (!reduced.matches) {
      cycle = window.setInterval(() => {
        exampleIndex = (exampleIndex + 1) % EXAMPLES.length;
      }, 2600);
    }

    return () => {
      window.clearInterval(timer);
      window.clearInterval(cycle);
    };
  });
</script>

<svelte:window on:pointerdown={onWindowPointerDown} on:keydown={onWindowKeydown} />

<div class="hero-overlay">
  <!-- #7 focus state: dims the footage behind the answer card. -->
  <div class="hero-dim" class:on={picked} aria-hidden="true"></div>
  <div class="hero-content">
    <h1>
      hands free driving<span class="desktop-tail">&nbsp;for</span><br />
      <span class="mobile-prefix">for </span>the car you already own
    </h1>

    <div class="hero-stats">
      <div class="stat">
        <span class="stat-value">30,000+</span>
        <span class="stat-label">cars on the road with a comma</span>
      </div>
      <div class="stat stat-miles">
        <span class="stat-value odometer" id="miles-odometer" aria-label="{milesDriven.toLocaleString('en-US')} miles driven">
          {#each milesChars as char, i (i)}
            {#if char === ","}
              <span class="odo-sep">,</span>
            {:else}
              <span class="odo-slot" aria-hidden="true">
                <span class="odo-col" use:roll={Number(char)}>
                  <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                  <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                  <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                  <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                </span>
              </span>
            {/if}
          {/each}
        </span>{@html PREPAINT_MILES}
        <span class="stat-label">
          <span class="live-dot" aria-label="live estimate"></span>
          miles driven
        </span>
      </div>
      <div class="stat">
        <span class="stat-value">#2</span>
        <span class="stat-label">after Tesla in hands-free miles</span>
      </div>
    </div>

    <!-- The whole promise is "the car you already have", so the hero answers that here
         instead of linking away to /vehicles. -->
    <div class="finder" class:answered={picked} bind:this={finderEl}>
      {#if !picked}
        <div class="finder-field">
          <span class="finder-input-wrap">
          <input
            bind:this={inputEl}
            bind:value={query}
            on:focus={() => (listboxOpen = true)}
            on:input={() => (listboxOpen = true)}
            on:keydown={onKeydown}
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder=""
            aria-label="Search supported cars"
            aria-expanded={listboxOpen && results.length > 0}
            aria-controls="car-results"
            role="combobox"
          />
          {#if !query}
            <span class="finder-ghost" aria-hidden="true"
              >check your car — {#key exampleIndex}<span class="ghost-word"
                  >{EXAMPLES[exampleIndex]}</span
                >{/key}</span
            >
          {/if}
          </span>
        </div>

        {#if listboxOpen && results.length}
          <ul class="finder-results" id="car-results" role="listbox">
            {#each results as car, index (car.name)}
              <li role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  class:active={index === activeIndex}
                  on:mouseenter={() => (activeIndex = index)}
                  on:click={() => pick(car)}
                >
                  <span class="result-name">{car.make} {car.model}</span>
                  <span class="result-years">{car.years}</span>
                </button>
              </li>
            {/each}
          </ul>
        {:else if trimmed.length >= 2}
          <p class="finder-empty">
            no match for “{query.trim()}” — <a href="/vehicles">browse all {vehicleCountText} models</a>
          </p>
        {/if}

      {:else}
        <div class="answer">
          <p class="answer-head">
            <span class="answer-check" aria-hidden="true">✓</span>
            <span class="answer-head-text">
              your <strong>{picked.make} {picked.model} {picked.years}</strong> works
            </span>
          </p>
          <p class="answer-detail">{@html picked.detail}</p>

          {#if pickedVideo}
            <div class="answer-video">
              {#if videoPlaying}
                <iframe
                  src={videoEmbed}
                  title="{picked.make} {picked.model} driving on openpilot"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              {:else}
                <!-- Facade: the thumbnail costs one image, the iframe only loads on click. -->
                <button type="button" class="video-facade" on:click={() => (videoPlaying = true)}>
                  <img
                    src={videoThumb}
                    alt=""
                    loading="lazy"
                  />
                  <span class="video-play" aria-hidden="true"></span>
                  <span class="video-caption">
                    watch {picked.make} {picked.model} driving on openpilot
                  </span>
                </button>
              {/if}
            </div>
          {/if}

          <!-- AUTOPLAY VARIANT — swap in by replacing the block above with this, and
               switch the .video-caption rule in <style> to its autoplay version.
          {#if pickedVideo}
            <div class="answer-video">
              <iframe
                src={videoEmbed}
                title="{picked.make} {picked.model} driving on openpilot"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <p class="video-caption">{picked.make} {picked.model} driving on openpilot</p>
          {/if}
          -->

          <div class="answer-actions">
            <a class="hero-action primary" href={buyHref}>
              <span>get comma four</span>
              <span class="action-arrow" aria-hidden="true">{@html ArrowRight}</span>
            </a>
            <button type="button" class="answer-reset" on:click={reset}>check another car</button>
          </div>
        </div>
      {/if}
    </div>

    <div class="hero-compatibility">
      <p>works with {vehicleCountText} models across 27 brands</p>
      <div class="logo-viewport" aria-hidden="true">
        <div class="logo-track">
          {#each Array(4) as _}
            <div class="logo-group">
              {#each brands as logo}
                <img src={logo} alt="" />
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

  /* z-index is required, not cosmetic: .odo-col has a transform, which creates a
     stacking context, so the odometer painted straight through an unlayered dim. */
  .hero-dim {
    background: rgba(0, 0, 0, 0.55);
    inset: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }

  .hero-dim.on {
    opacity: 1;
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
    text-shadow:
      0 0 3px rgba(0, 0, 0, 0.85),
      0 0 10px rgba(0, 0, 0, 0.8),
      0 0 30px rgba(0, 0, 0, 0.7),
      0 0 60px rgba(0, 0, 0, 0.55);
  }

  .mobile-prefix {
    display: none;
  }

  /* ---- car finder ---- */

  .finder {
    margin-top: 2.25rem;
    max-width: 45.75rem;
    position: relative;
    z-index: 3;
  }

  .finder-field {
    align-items: center;
    backdrop-filter: blur(14px);
    background: rgba(0, 0, 0, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.55);
    display: flex;
    gap: 1rem;
    padding: 0 1.25rem;
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  }

  .finder-field:focus-within {
    background: rgba(0, 0, 0, 0.7);
    border-color: var(--color-accent);
    box-shadow: 0 0 0 1px var(--color-accent), 0 0 34px rgba(81, 255, 0, 0.35);
  }


  .finder-field input {
    background: none;
    border: none;
    color: white;
    display: block;
    width: 100%;
    font-family: inherit;
    font-size: 1.375rem;
    letter-spacing: -0.04em;
    min-width: 0;
    outline: none;
    padding: 1.25rem 0;
  }

  .finder-field input::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }

  .finder-input-wrap {
    display: block;
    flex: 1;
    min-width: 0;
    position: relative;
  }

  .finder-ghost {
    align-items: baseline;
    color: rgba(255, 255, 255, 0.45);
    display: flex;
    font-size: 1.375rem;
    gap: 0.4ch;
    left: 0;
    letter-spacing: -0.04em;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
  }

  .ghost-word {
    animation: ghost-in 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    color: rgba(255, 255, 255, 0.72);
    display: inline-block;
  }

  @keyframes ghost-in {
    from {
      filter: blur(3px);
      opacity: 0;
      transform: translateY(0.45em);
    }
  }


  /* Opens upward: the hero content is bottom-aligned, so a downward list runs off the
     viewport and covers the stats. */
  .finder-results {
    backdrop-filter: blur(14px);
    background: rgba(0, 0, 0, 0.86);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: none;
    bottom: calc(100% - 1px);
    list-style: none;
    margin: 0;
    max-height: min(20rem, 40vh);
    overflow-y: auto;
    padding: 0;
    position: absolute;
    width: 100%;
    z-index: 4;
  }

  .finder-results button {
    align-items: baseline;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    font-family: inherit;
    gap: 0.75rem;
    justify-content: space-between;
    padding: 0.875rem 1.25rem;
    text-align: left;
    width: 100%;
  }

  .finder-results button span {
    color: inherit;
  }

  .finder-results button.active {
    background: var(--color-accent);
    color: black;
  }

  .result-name {
    font-size: 1.0625rem;
    letter-spacing: -0.04em;
  }

  .result-years {
    font-family: JetBrains Mono, monospace;
    font-size: 0.9rem;
    opacity: 0.7;
  }

  .finder-empty {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    margin: 0.75rem 0 0;
  }

  .finder-empty a {
    border-bottom: 1px solid var(--color-accent);
  }


  /* ---- answer state ---- */

  .answer {
    backdrop-filter: blur(14px);
    background: rgba(0, 0, 0, 0.62);
    border: 1px solid var(--color-accent);
    box-shadow: 0 0 40px rgba(81, 255, 0, 0.2);
    padding: 1.5rem;
  }

  /* Two flex items only — badge and one text span. All the words live in that span so
     the sentence still wraps as a sentence; the badge is nudged to sit centred on the
     first line box rather than relying on a vertical-align guess. */
  .answer-head {
    align-items: flex-start;
    display: flex;
    font-size: 1.5rem;
    letter-spacing: -0.04em;
    line-height: 1.25;
    margin: 0;
  }

  .answer-head-text {
    min-width: 0;
  }

  .answer-check {
    align-items: center;
    background: var(--color-accent);
    border-radius: 50%;
    color: black;
    display: inline-flex;
    flex: none;
    font-size: 1.0625rem;
    font-weight: 600;
    height: 1.625rem;
    justify-content: center;
    line-height: 1;
    /* (line box 1.875rem - badge 1.625rem) / 2 */
    margin-right: 0.5rem;
    margin-top: 0.125rem;
    width: 1.625rem;
  }

  .answer-detail {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
    line-height: 1.45;
    margin: 0.875rem 0 1.25rem;
  }

  .answer-video {
    aspect-ratio: 16 / 9;
    margin: 0 0 1.25rem;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .answer-video iframe,
  .video-facade {
    border: none;
    display: block;
    height: 100%;
    width: 100%;
  }

  .video-facade {
    background: none;
    cursor: pointer;
    padding: 0;
    position: relative;
  }

  .video-facade img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .video-play {
    background: var(--color-accent);
    border-radius: 50%;
    height: 3.5rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    width: 3.5rem;
  }

  .video-play::after {
    border-left: 0.9rem solid black;
    border-top: 0.55rem solid transparent;
    border-bottom: 0.55rem solid transparent;
    content: "";
    left: 54%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .video-facade:hover .video-play {
    transform: translate(-50%, -50%) scale(1.08);
  }

  /* Caption sits over the thumbnail in the facade version. */
  .video-caption {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
    bottom: 0;
    color: white;
    font-size: 1rem;
    left: 0;
    letter-spacing: -0.02em;
    padding: 2rem 1rem 0.75rem;
    position: absolute;
    right: 0;
    text-align: left;
  }

  /* AUTOPLAY VARIANT — the caption becomes a line under the player instead.
  .video-caption {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
    letter-spacing: -0.02em;
    margin: 0.625rem 0 1.25rem;
  }
  */

  .answer-actions {
    align-items: flex-end;
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  .answer-reset {
    background: none;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1;
    padding: 0 0 0.5rem;
  }

  .hero-action {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: -0.04em;
    min-height: 3.25rem;
    padding: 0 1.25rem;
    transition: background-color 0.2s;
  }

  .hero-action > span {
    color: inherit;
  }

  .hero-action.primary {
    background: var(--color-accent);
    color: black;
    gap: 0.75rem;
    justify-content: center;
  }

  .action-arrow {
    display: block;
    flex: 0 0 1.25rem;
    height: 1.25rem;
    width: 1.25rem;
  }

  .action-arrow :global(svg) {
    display: block;
    height: 100%;
    width: 100%;
  }

  /* ---- stats ---- */

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
    text-shadow:
      0 0 3px rgba(0, 0, 0, 0.85),
      0 0 10px rgba(0, 0, 0, 0.8),
      0 0 30px rgba(0, 0, 0, 0.7),
      0 0 60px rgba(0, 0, 0, 0.55);
  }

  .stat-value {
    font-size: 3rem;
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  /* Odometer: each digit is a 20-deep column (0-9 twice) shifted by -idx*5%, so a change
     rolls rather than snapping and a wrap can keep going upward. */
  .odometer {
    display: inline-flex;
  }

  .odo-slot {
    display: inline-block;
    height: 1em;
    overflow: hidden;
    vertical-align: top;
  }

  .odo-col {
    display: flex;
    flex-direction: column;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .odo-col > span {
    height: 1em;
    line-height: 1;
  }

  .odo-sep {
    display: inline-block;
  }

  .stat-label {
    align-items: center;
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    gap: 0.375rem;
    letter-spacing: -0.04em;
    line-height: 1.2;
    margin-top: 1rem;
  }

  .live-dot {
    animation: live-pulse 2s ease-out infinite;
    aspect-ratio: 1;
    background: var(--color-accent);
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(81, 255, 0, 0.65);
    flex: 0 0 auto;
    height: 8px;
    min-width: 8px;
    width: 8px;
  }

  /* ---- brand marquee ---- */

  .hero-compatibility {
    align-items: center;
    display: flex;
    gap: 2.25rem;
    margin-top: 2.125rem;
    min-width: 0;
  }

  .hero-compatibility p {
    color: white;
    flex: none;
    font-size: 1.125rem;
    letter-spacing: -0.04em;
    margin: 0;
    text-shadow:
      0 0 3px rgba(0, 0, 0, 0.85),
      0 0 10px rgba(0, 0, 0, 0.8),
      0 0 30px rgba(0, 0, 0, 0.7);
  }

  .logo-viewport {
    flex: 1;
    height: 2.1875rem;
    mask-image: linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent);
    min-width: 0;
    overflow: hidden;
  }

  .logo-track {
    animation: logo-scroll 62.5s linear infinite;
    display: flex;
    opacity: 0.5;
    width: max-content;
  }

  .logo-group {
    align-items: center;
    display: flex;
    flex: none;
    gap: 1.875rem;
    padding-right: 1.875rem;
  }

  .logo-group img {
    display: block;
    flex: 0 0 auto;
    height: 2.1875rem;
    object-fit: contain;
    width: 3.25rem;
  }

  @keyframes logo-scroll {
    to {
      transform: translateX(-25%);
    }
  }

  @keyframes live-pulse {
    70%,
    100% {
      box-shadow: 0 0 0 0.3rem rgba(81, 255, 0, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .live-dot,
    .logo-track,
    .odo-col {
      animation: none;
      transition: none;
    }
  }

  @media screen and (min-width: 769px) {
    h1 {
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 1024px) {
    .hero-stats {
      gap: 2rem;
      grid-template-columns: repeat(3, auto);
      width: auto;
    }
  }

  @media screen and (max-width: 768px) {
    .desktop-tail {
      display: none;
    }

    .mobile-prefix {
      display: inline;
    }

    .finder {
      margin-top: 1.5rem;
      max-width: none;
    }

    .finder-field {
      padding: 0 1rem;
    }

    .finder-field input {
      font-size: 1.0625rem;
      padding: 1rem 0;
    }

    .hero-stats {
      gap: 1.25rem;
      grid-template-columns: 1fr;
      margin-top: 1.75rem;
    }

    .stat-value {
      font-size: 2rem;
    }

    .stat-label {
      font-size: 0.875rem;
      margin-top: 0.375rem;
    }

    .hero-compatibility {
      margin-top: 1.5rem;
    }
  }
</style>
