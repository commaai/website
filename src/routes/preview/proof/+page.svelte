<script>
  import { videos, articles } from "$lib/constants/featured.js";
  import PlayIcon from "$lib/icons/social/youtube.svg?raw";
  import ArrowRight from "$lib/icons/arrow-right.svg?raw";

  // our own frames — the youtube thumbnails carry claim words and eyes-off imagery
  const stills = ["/press-stills/ltt-14-30.jpg", "/press-stills/snazzy-28-00.jpg"];
  const vids = videos.map((v, i) => ({ ...v, still: stills[i] }));
  const all = [...vids, ...articles];
  const cite = (p) => p.quoteSource ?? p.year;

  const groups = [
    {
      label: "no image",
      note: "the quote is the whole thing. logos for attribution, nothing else.",
      variants: [
        { n: "01", name: "quote cards", note: "same grid shape as the owner cards above, so the section reads as one." },
        { n: "02", name: "one hero quote", note: "the strongest line at display size, everyone else reduced to a logo bar." },
        { n: "03", name: "videos lead, articles list", note: "the two reviews get the big type; the four articles run as an even list beside them." },
      ],
    },
    {
      label: "with image",
      note: "stills from the reviews themselves.",
      variants: [
        { n: "04", name: "quote over the still", note: "text sits on the image, so the card is one object." },
      ],
    },
  ];
</script>

<svelte:head><title>press section — variants</title></svelte:head>

<section class="light note">
  <div class="container">
    <p>press only — the owners band stays as it is, above this section. quotes never headlines.</p>
  </div>
</section>

{#each groups as group}
  <section class="light group-head">
    <div class="container">
      <h2 class="group-label">{group.label}</h2>
      <p class="desc">{group.note}</p>
    </div>
  </section>

  {#each group.variants as v}
    <section class="light variant">
      <div class="container">
        <div class="head">
          <span class="num">{v.n}</span>
          <h3>{v.name}</h3>
        </div>
        <p class="desc">{v.note}</p>

        {#if v.n === "01"}
          <div class="grid3">
            {#each all as p}
              <a class="card" href={p.url} target="_blank" rel="noopener">
                <div class="card-head">
                  <img class="logo" src={p.logo} alt="Logo of {p.outlet}" />
                  <!-- the article logos are wordmarks; these two are a monogram and an icon -->
                  {#if p.still}
                    <span class="outlet">{p.outlet}</span>
                    <span class="yt" aria-hidden="true">{@html PlayIcon}</span>
                  {/if}
                </div>
                <p class="q">{p.quote}</p>
                <span class="mono muted foot">
                  {p.still ? "watch" : "read"}
                  <span class="arrow" aria-hidden="true">{@html ArrowRight}</span>
                </span>
              </a>
            {/each}
          </div>
        {/if}

        {#if v.n === "02"}
          <blockquote class="hero">
            {videos[0].quote}
            <footer>
              <img class="logo tall" src={videos[0].logo} alt="Logo of {videos[0].outlet}" />
              <span class="mono muted">{videos[0].outlet} · {cite(videos[0])}</span>
            </footer>
          </blockquote>
          <div class="bar">
            {#each all.slice(1) as p}
              <a href={p.url} target="_blank" rel="noopener">
                <img class="logo" src={p.logo} alt="Logo of {p.outlet}" />
              </a>
            {/each}
          </div>
        {/if}

        {#if v.n === "03"}
          <div class="pair">
            <div class="major">
              {#each vids as p}
                <a class="major-item" href={p.url} target="_blank" rel="noopener">
                  <img class="logo tall" src={p.logo} alt="Logo of {p.outlet}" />
                  <p class="q big">{p.quote}</p>
                  <span class="mono muted">{p.outlet} · {cite(p)}</span>
                </a>
              {/each}
            </div>
            <div class="minor">
              {#each articles as p}
                <a class="minor-item" href={p.url} target="_blank" rel="noopener">
                  <img class="logo" src={p.logo} alt="Logo of {p.outlet}" />
                  <p class="q">{p.quote}</p>
                  <span class="mono muted">{cite(p)}</span>
                </a>
              {/each}
            </div>
          </div>
        {/if}

        {#if v.n === "04"}
          <div class="grid2">
            {#each vids as p}
              <a class="over-card" href={p.url} target="_blank" rel="noopener">
                <img src={p.still} alt="" loading="lazy" />
                <span class="play big">{@html PlayIcon}</span>
                <div class="over">
                  <p class="q big light-text">{p.quote}</p>
                  <span class="mono light-text">{p.outlet} · {cite(p)}</span>
                </div>
              </a>
            {/each}
          </div>
          <div class="bar">
            {#each articles as p}
              <a href={p.url} target="_blank" rel="noopener">
                <img class="logo" src={p.logo} alt="Logo of {p.outlet}" />
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </section>
  {/each}
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

  .group-head {
    border-top: 2px solid #000;
    padding-block: 2.5rem 1rem;
  }

  .group-label {
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1;
    margin: 0 0 0.5rem;
  }

  .variant {
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    padding-block: 2.5rem;
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

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    margin: 0;
  }

  .desc {
    margin-bottom: 1.75rem;
  }

  .mono {
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    letter-spacing: normal;
  }

  .muted {
    color: var(--color-muted);
  }

  .light-text {
    color: #fff;
  }

  /* fixed height, and never lazy: an auto-sized lazy image has no box, so it
     never enters the viewport and never loads */
  .logo {
    display: block;
    filter: brightness(0);
    height: 1.5rem;
    object-fit: contain;
    object-position: left;
    width: auto;
  }

  .logo.tall {
    height: 2rem;
  }

  .q {
    font-size: 1.0625rem;
    line-height: 1.35;
    margin: 0;
  }

  .q.big {
    font-size: clamp(1.25rem, 2vw, 1.75rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .play :global(svg) {
    display: block;
    height: auto;
    width: 100%;
  }

  .grid3 {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .grid2 {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    transition: background-color 0.2s, border-color 0.2s;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      background-color: var(--color-card-background-hover);
      border-color: #000;
    }

    .card:hover .yt {
      opacity: 1;
    }

    .card:hover .foot {
      color: var(--color-foreground);
    }
  }

  .card-head {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  .yt {
    display: flex;
    margin-left: auto;
    opacity: 0.35;
    transition: opacity 0.2s;
    width: 1.25rem;
  }

  .yt :global(svg) {
    display: block;
    height: auto;
    width: 100%;
  }

  .outlet {
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: normal;
    white-space: nowrap;
  }

  .foot {
    align-items: center;
    display: flex;
    gap: 0.4rem;
    margin-top: auto;
    transition: color 0.2s;
  }

  .arrow {
    color: inherit;
    display: block;
    width: 0.875rem;
  }

  .arrow :global(svg) {
    display: block;
    height: auto;
    width: 100%;
  }

  .hero {
    font-size: clamp(1.75rem, 4vw, 3rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 0;
    max-width: 42rem;
  }

  .hero footer {
    align-items: center;
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .bar {
    align-items: center;
    border-block: 1px solid rgba(0, 0, 0, 0.25);
    display: grid;
    gap: 2.5rem;
    grid-auto-flow: column;
    justify-content: start;
    margin-top: 2rem;
    padding-block: 1.25rem;
  }

  /* 05 — one rule style, one alignment, even spacing in both columns */
  .pair {
    display: grid;
    gap: 3rem;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  }

  .major,
  .minor {
    display: grid;
    align-content: start;
  }

  .major-item,
  .minor-item {
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    display: grid;
    justify-items: start;
    padding-block: 1.5rem;
  }

  .major-item {
    gap: 1rem;
  }

  .minor-item {
    gap: 0.5rem;
  }

  .over-card {
    aspect-ratio: 16 / 9;
    display: block;
    overflow: hidden;
    position: relative;
  }

  .over-card img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .play {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
  }

  .play.big {
    width: 4.5rem;
  }

  .over {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
    bottom: 0;
    display: grid;
    gap: 0.5rem;
    left: 0;
    padding: 4rem 1.75rem 1.5rem;
    position: absolute;
    right: 0;
  }

  @media screen and (max-width: 1024px) {
    .grid3 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .pair {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    .grid3,
    .grid2 {
      grid-template-columns: minmax(0, 1fr);
    }

    .bar {
      gap: 1.5rem;
      grid-auto-flow: row;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      justify-content: stretch;
    }
  }
</style>
