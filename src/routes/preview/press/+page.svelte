<script>
  import { videos, articles } from "$lib/constants/featured.js";
  import PlayIcon from "$lib/icons/social/youtube.svg?raw";
  import ArrowRight from "$lib/icons/arrow-right.svg?raw";
  import DeviceImage from "$lib/images/products/comma-four/four_angled.png";
  import ScreenImage from "$lib/images/products/comma-four/four_screen_on.png";

  const CDN = "https://3comma.net";
  const roadStill = `${CDN}/hero-landscape/poster.jpg`;
  const screenStill = `${CDN}/screen-video/poster.jpg`;

  const q = (p) => `“${p.quote}”`;

  const creatorStills = ["/press-stills/ltt-14-30.jpg", "/press-stills/snazzy-29-15.jpg"];

  const vids = videos.map((v, i) => ({
    ...v,
    still: creatorStills[i],
    commaStill: i === 0 ? roadStill : screenStill,
    product: i === 0 ? DeviceImage : ScreenImage,
  }));

  const arts = articles.map((a) => ({ ...a }));
  const first2 = arts.slice(0, 2);

  const variants = [
    { n: "01", name: "logo strip (what's live today)", note: "the baseline. nothing but a logo and a link." },
    { n: "02", name: "logo + duration", note: "logo plus how long the piece is." },
    { n: "03", name: "pull quote, no image", note: "the review speaks; you pick which sentence." },
    { n: "04", name: "big quote typography", note: "quote as the design. no cards, no images." },
    { n: "05", name: "video still + quote below", note: "the card shape you have now, with a frame from the review itself." },
    { n: "06", name: "video still + quote over image", note: "the quote over the frame." },
    { n: "07", name: "video still + channel badge", note: "attribution sits on the image so it reads as a review." },
    { n: "08", name: "comma's own imagery", note: "product renders instead, for comparison." },
    { n: "09", name: "hairline rows", note: "no boxes at all. six pieces in a short list." },
    { n: "10", name: "numbered index", note: "editorial index, borrows /01 from the old jobs cards." },
    { n: "11", name: "matches the owner cards", note: "channel avatar + quote, same shape as the tweets above." },
    { n: "12", name: "outlet wall, quotes on hover", note: "logos at rest; the quote replaces them on hover." },
    { n: "13", name: "creator thumbnail, unaltered", note: "what the section does right now." },
    { n: "14", name: "creator thumbnail, cropped + overlay", note: "same thumbnail, cropped, with our own text over it." },
  ];
</script>

<svelte:head><title>press section — solution variants</title></svelte:head>

<section class="light note">
  <div class="container">
    <p>{variants.length} takes on the press cards</p>
  </div>
</section>

{#each variants as v}
  <section class="light variant">
    <div class="container">
      <div class="head">
        <span class="num">{v.n}</span>
        <h2>{v.name}</h2>
      </div>
      <p class="desc">{v.note}</p>

      {#if v.n === "01"}
        <div class="strip">
          {#each [...vids, ...arts] as p}
            <a class="strip-cell" href={p.url} target="_blank" rel="noopener">
              <img src={p.logo} alt="Logo of {p.outlet}" />
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "02"}
        <div class="grid-3">
          {#each [...vids, ...arts.slice(0, 1)] as p}
            <a class="plain" href={p.url} target="_blank" rel="noopener">
              <img class="logo" src={p.logo} alt="Logo of {p.outlet}" />
              <span class="mono">{p.duration ? `video · ${p.duration}` : "article"}</span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "03"}
        <div class="grid-3">
          {#each [...vids, ...first2.slice(0, 1)] as p}
            <a class="plain quote-card" href={p.url} target="_blank" rel="noopener">
              <img class="logo" src={p.logo} alt="Logo of {p.outlet}" />
              <p class="quote">{q(p)}</p>
              <span class="foot">{p.duration ? "watch" : "read the article"} <span class="arr">{@html ArrowRight}</span></span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "04"}
        <div class="big-quotes">
          {#each vids as p}
            <a class="big-quote" href={p.url} target="_blank" rel="noopener">
              <p>{q(p)}</p>
              <span class="attr"><img class="logo sm" src={p.logo} alt="" />{p.outlet}</span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "05"}
        <div class="grid-2">
          {#each vids as p}
            <a class="plain media-card" href={p.url} target="_blank" rel="noopener">
              <span class="frame">
                <img src={p.still} alt="" />
                <span class="play">{@html PlayIcon}</span>
                <span class="dur">{p.duration}</span>
              </span>
              <span class="row"><img class="logo sm" src={p.logo} alt="" /><span class="mono muted">{p.outlet}</span></span>
              <p class="quote">{q(p)}</p>
              <span class="foot">watch <span class="arr">{@html ArrowRight}</span></span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "06"}
        <div class="grid-2">
          {#each vids as p}
            <a class="plain overlay-card" href={p.url} target="_blank" rel="noopener">
              <span class="frame tall">
                <img src={p.still} alt="" />
                <span class="scrim"></span>
                <span class="over">
                  <span class="quote light-text">{q(p)}</span>
                  <span class="attr light-text mono">{p.outlet} · {p.duration}</span>
                </span>
                <span class="play">{@html PlayIcon}</span>
              </span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "07"}
        <div class="grid-2">
          {#each vids as p}
            <a class="plain media-card" href={p.url} target="_blank" rel="noopener">
              <span class="frame">
                <img src={p.still} alt="" />
                <span class="badge"><img class="logo sm invert" src={p.logo} alt="" /> review by {p.outlet}</span>
                <span class="play">{@html PlayIcon}</span>
                <span class="dur">{p.duration}</span>
              </span>
              <p class="quote">{q(p)}</p>
              <span class="foot">watch <span class="arr">{@html ArrowRight}</span></span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "08"}
        <div class="grid-2">
          {#each vids as p}
            <a class="plain media-card" href={p.url} target="_blank" rel="noopener">
              <span class="frame product">
                <img src={p.product} alt="" />
                <span class="play">{@html PlayIcon}</span>
                <span class="dur">{p.duration}</span>
              </span>
              <span class="row"><img class="logo sm" src={p.logo} alt="" /><span class="mono muted">{p.outlet}</span></span>
              <p class="quote">{q(p)}</p>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "09"}
        <div class="rows">
          {#each [...vids, ...arts] as p}
            <a class="row-item" href={p.url} target="_blank" rel="noopener">
              <img class="logo sm" src={p.logo} alt="Logo of {p.outlet}" />
              <span class="row-quote">{q(p)}</span>
              <span class="mono muted">{p.duration ?? "article"}</span>
              <span class="arr">{@html ArrowRight}</span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "10"}
        <div class="rows">
          {#each [...vids, ...arts] as p, i}
            <a class="row-item indexed" href={p.url} target="_blank" rel="noopener">
              <span class="mono muted">/{String(i + 1).padStart(2, "0")}</span>
              <span class="outlet-name">{p.outlet}</span>
              <span class="row-quote">{q(p)}</span>
              <span class="arr">{@html ArrowRight}</span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "11"}
        <div class="grid-3">
          {#each [...vids, ...first2.slice(0, 1)] as p}
            <a class="plain tweet-like" href={p.url} target="_blank" rel="noopener">
              <span class="row">
                <span class="avatar"><img src={p.logo} alt="" /></span>
                <span class="who"><span class="name">{p.outlet}</span><span class="mono muted">{p.duration ? "video review" : "article"}</span></span>
              </span>
              <p class="quote">{q(p)}</p>
              <span class="mono muted">{p.duration ?? ""}</span>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "12"}
        <div class="grid-3 swap">
          {#each [...vids, ...first2.slice(0, 1)] as p}
            <a class="plain swap-card" href={p.url} target="_blank" rel="noopener">
              <img class="logo swap-logo" src={p.logo} alt="Logo of {p.outlet}" />
              <span class="swap-quote">{q(p)}</span>
            </a>
          {/each}
        </div>
        <p class="desc">hover a card</p>
      {/if}

      {#if v.n === "13"}
        <div class="grid-2">
          {#each videos as p}
            <a class="plain media-card" href={p.url} target="_blank" rel="noopener">
              <span class="frame">
                <img src={p.thumbnail} alt="" />
                <span class="play">{@html PlayIcon}</span>
                <span class="dur">{p.duration}</span>
              </span>
              <span class="row"><img class="logo sm" src={p.logo} alt="" /><span class="mono muted">{p.outlet}</span></span>
              <p class="quote">{q(p)}</p>
            </a>
          {/each}
        </div>
      {/if}

      {#if v.n === "14"}
        <div class="grid-2">
          {#each videos as p}
            <a class="plain overlay-card" href={p.url} target="_blank" rel="noopener">
              <span class="frame tall">
                <img class="cropped" src={p.thumbnail} alt="" />
                <span class="scrim"></span>
                <span class="over">
                  <span class="quote light-text">{q(p)}</span>
                  <span class="attr light-text mono">{p.outlet} · {p.duration}</span>
                </span>
              </span>
            </a>
          {/each}
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

  .grid-2,
  .grid-3,
  .strip {
    display: grid;
    gap: 1.25rem;
  }

  .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .strip { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.5rem; }

  .strip-cell {
    align-items: center;
    background: #fff;
    border: 1px solid #000;
    display: flex;
    height: 40px;
    justify-content: center;
    padding: 1.25rem;
  }

  .strip-cell img { height: 45px; object-fit: contain; }

  .plain {
    background: var(--color-card-background);
    border: 1px solid #000;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    overflow: hidden;
    padding: 1.5rem;
    transition: background-color 0.2s;
  }

  .plain:hover { background: var(--color-card-background-hover); }

  .logo {
    filter: grayscale(100%) brightness(20%);
    height: 1.625rem;
    max-width: 9rem;
    object-fit: contain;
    width: auto;
  }

  .logo.sm { height: 1.25rem; max-width: 6.5rem; }
  .logo.invert { filter: grayscale(100%) brightness(0) invert(1); }

  .row { align-items: center; display: flex; gap: 0.75rem; }

  .mono {
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    letter-spacing: normal;
  }

  .muted { color: var(--color-muted); }

  .quote {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.3;
    margin: 0;
  }

  .foot {
    align-items: center;
    color: var(--color-muted);
    display: flex;
    font-size: 0.875rem;
    gap: 0.5rem;
    letter-spacing: normal;
    margin-top: auto;
  }

  .arr :global(svg) { display: block; height: 0.75rem; width: auto; }

  .frame {
    aspect-ratio: 16 / 9;
    background: #000;
    display: block;
    margin: -1.5rem -1.5rem 0.375rem;
    overflow: hidden;
    position: relative;
  }

  .frame.tall { aspect-ratio: 4 / 3; margin: -1.5rem; }
  .frame.product { background: #000; }

  .frame :global(picture) { display: block; height: 100%; }

  .frame img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  .frame img.cropped { object-position: 50% 22%; transform: scale(1.35); }

  .play {
    align-items: center;
    color: #fff;
    display: flex;
    inset: 0;
    justify-content: center;
    opacity: 0.9;
    position: absolute;
  }

  .play :global(svg) {
    filter: drop-shadow(0 0 1.5rem rgba(0, 0, 0, 0.6));
    height: 3rem;
    width: 3rem;
  }

  .dur {
    background: rgba(0, 0, 0, 0.75);
    bottom: 0.6rem;
    color: #fff;
    font-family: JetBrains Mono, monospace;
    font-size: 0.6875rem;
    padding: 0.1rem 0.4rem;
    position: absolute;
    right: 0.6rem;
  }

  .badge {
    align-items: center;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    display: flex;
    font-size: 0.8125rem;
    gap: 0.5rem;
    left: 0;
    letter-spacing: normal;
    padding: 0.5rem 0.75rem;
    position: absolute;
    top: 0;
  }

  .scrim {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.15) 60%);
    inset: 0;
    position: absolute;
  }

  .over {
    bottom: 0;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    left: 0;
    padding: 1.5rem;
    position: absolute;
    right: 0;
  }

  .over .quote { color: #fff; font-size: 1.375rem; }
  .over .attr { color: rgba(255, 255, 255, 0.75); }

  .big-quotes { display: grid; gap: 3rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }

  .big-quote p {
    font-size: clamp(1.5rem, 2.5vw, 2.25rem);
    font-weight: 600;
    line-height: 1.15;
    margin: 0 0 1rem;
  }

  .attr { align-items: center; color: var(--color-muted); display: flex; gap: 0.625rem; font-size: 0.875rem; letter-spacing: normal; }

  .rows { display: flex; flex-flow: column; }

  .row-item {
    align-items: center;
    border-bottom: 1px solid #d0d2d4;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 9rem 1fr auto auto;
    padding: 1.125rem 0;
    transition: background-color 0.2s;
  }

  .row-item:first-child { border-top: 1px solid #d0d2d4; }
  .row-item:hover { background: var(--color-card-background); }
  .row-item.indexed { grid-template-columns: 3rem 12rem 1fr auto; }
  .outlet-name { font-weight: 600; }
  .row-quote { color: var(--color-muted); }

  .tweet-like .avatar {
    align-items: center;
    background: #fff;
    border: 1px solid #d0d2d4;
    border-radius: 50%;
    display: flex;
    flex: 0 0 2.25rem;
    height: 2.25rem;
    justify-content: center;
    overflow: hidden;
    width: 2.25rem;
  }

  .tweet-like .avatar img { filter: grayscale(100%) brightness(20%); height: 1rem; object-fit: contain; width: 1.25rem; }
  .who { display: flex; flex-flow: column; line-height: 1.2; }
  .name { font-weight: 700; }

  .swap-card { justify-content: center; min-height: 9rem; position: relative; }
  .swap-logo { margin: auto; transition: opacity 0.2s; }
  .swap-quote {
    font-size: 1.125rem;
    font-weight: 500;
    inset: 1.5rem;
    line-height: 1.3;
    opacity: 0;
    position: absolute;
    transition: opacity 0.2s;
  }
  .swap-card:hover .swap-logo { opacity: 0; }
  .swap-card:hover .swap-quote { opacity: 1; }

  @media screen and (max-width: 1024px) {
    .strip { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media screen and (max-width: 768px) {
    .grid-2, .grid-3, .big-quotes { grid-template-columns: minmax(0, 1fr); }
    .row-item, .row-item.indexed { grid-template-columns: 1fr auto; gap: 0.75rem; }
    .row-quote { display: none; }
  }
</style>
