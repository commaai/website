<script>
  import XIcon from "$lib/icons/social/x.svg?raw";
  import FeaturedTweets from "$lib/components/FeaturedTweets.svelte";
  import Card from "./Card.svelte";
  import { tweets, statTweets } from "$lib/constants/social-proof.js";

  let carouselIdx = 0;

  // one-line excerpt for the ticker
  const excerpt = (body) => {
    const flat = body.replace(/\s+/g, " ").trim();
    return flat.length > 82 ? `${flat.slice(0, 82)}…` : flat;
  };

  const avatars = import.meta.glob("$lib/images/featured-tweets/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const avatarFor = (author) =>
    avatars[`/src/lib/images/featured-tweets/${author}.jpg`];

  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));

  const href = (t) => `https://x.com/${t.author}/status/${t.id}`;

  // vertical marquee: three columns, each drifting at its own speed
  const columns = [0, 1, 2].map((c) => tweets.filter((_, i) => i % 3 === c));
  const speeds = [42, 52, 36];

  const featured = tweets[1]; // ANSR42 — longest, most substantive
  const rest = tweets.filter((t) => t !== featured);

  // Every figure below is quoted verbatim from the tweet, never inferred.
  const pool = [...tweets, ...statTweets];
  const STATS = [
    { author: "mattvaru", value: "$999", unit: "", label: "no subscription, installed in an hour" },
    { author: "gerrylum2", value: "99.2", unit: "%", label: "of a commute hands off, measured" },
    { author: "tessadotsh", value: "24k", unit: "miles", label: "driven with it so far" },
    { author: "__tython3__", value: "1,500", unit: "miles", label: "Minnesota to Florida, one trip" },
  ].map((s) => ({ ...s, tweet: pool.find((t) => t.author === s.author) }));

  const VARIANTS = [
    {
      n: 1,
      title: "Staggered scroll rows",
      note: "What's on the homepage now. Two offset rows in one scroller, drag or swipe sideways. Dense, but half the tweets are off-screen until you interact.",
    },
    {
      n: 2,
      title: "Static grid",
      note: "No scrolling, no interaction — every tweet visible at once. What Linear, Stripe and Vercel do. Costs the most vertical space.",
    },
    {
      n: 4,
      title: "Drifting columns",
      note: "Three columns creeping upward at different speeds, pausing on hover. Ambient texture rather than something you're meant to read exhaustively.",
    },
    {
      n: 5,
      title: "Big quotes",
      note: "No cards at all. Typographic, closest to the rest of the site's voice. Shows the fewest tweets but the words actually get read.",
    },
    {
      n: 7,
      title: "Featured + grid",
      note: "One tweet carries the section, the rest are supporting evidence at a glance. Good if there's a single quote worth leading with.",
    },
  ];
</script>

<svelte:head><title>Tweet wall — variants</title></svelte:head>

<section class="light" id="intro">
  <div class="container">
    <h1>Tweet wall variants</h1>
    <p class="intro">
      Fourteen ways to show the same eight tweets. Same data, same avatars — only the
      presentation changes. Each is labelled with what it trades away, and the light
      variants sit directly under the dark original they're a version of.
    </p>
  </div>
</section>

<!-- 1. current -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/0{VARIANTS[0].n} — {VARIANTS[0].title}</span>
    <p class="note">{VARIANTS[0].note}</p>
  </div>
  <FeaturedTweets />
</section>

<!-- 2. static grid -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/0{VARIANTS[1].n} — {VARIANTS[1].title}</span>
    <p class="note">{VARIANTS[1].note}</p>

    <div class="grid">
      {#each tweets as tweet}
        <a class="card" href={href(tweet)} target="_blank" rel="noopener">
          <div class="head">
            <img class="avatar" src={avatarFor(tweet.author)} alt="" width="36" height="36" loading="lazy" />
            <span class="who">
              <span class="name">{tweet.name}</span>
              <span class="handle">@{tweet.author}</span>
            </span>
            <span class="mark" aria-hidden="true">{@html XIcon}</span>
          </div>
          <p class="body">{#each segment(tweet.body) as p}{#if p.handle}<span class="mention">{p.text}</span>{:else}{p.text}{/if}{/each}</p>
          <span class="date">{tweet.timestamp}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 3. static grid, light -->
<section class="light variant">
  <div class="container">
    <span class="tag">/03 — Static grid, light</span>
    <p class="note">
      Variant 02 on white, with the bordered card treatment from /vehicles. Sits
      next to the "featured in" logos without a colour break.
    </p>
    <div class="grid-6">
      {#each tweets as tweet}
        <Card {tweet} showDate />
      {/each}
    </div>
  </div>
</section>

<!-- 4. drifting columns -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/0{VARIANTS[2].n} — {VARIANTS[2].title}</span>
    <p class="note">{VARIANTS[2].note}</p>
  </div>

  <div class="drift-wall">
    {#each columns as column, i}
      <div class="drift-col" style="--speed: {speeds[i]}s">
        <div class="drift-track">
          {#each [...column, ...column] as tweet, j}
            <a
              class="card"
              href={href(tweet)}
              target="_blank"
              rel="noopener"
              aria-hidden={j >= column.length ? "true" : null}
              tabindex={j >= column.length ? -1 : null}
            >
              <div class="head">
                <img class="avatar" src={avatarFor(tweet.author)} alt="" width="36" height="36" loading="lazy" />
                <span class="who">
                  <span class="name">{tweet.name}</span>
                  <span class="handle">@{tweet.author}</span>
                </span>
                <span class="mark" aria-hidden="true">{@html XIcon}</span>
              </div>
              <p class="body">{#each segment(tweet.body) as p}{#if p.handle}<span class="mention">{p.text}</span>{:else}{p.text}{/if}{/each}</p>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- 5. big quotes -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/0{VARIANTS[3].n} — {VARIANTS[3].title}</span>
    <p class="note">{VARIANTS[3].note}</p>

    <div class="quotes">
      {#each tweets.slice(0, 4) as tweet}
        <a class="quote" href={href(tweet)} target="_blank" rel="noopener">
          <blockquote>{tweet.body.replace(/\s+/g, " ")}</blockquote>
          <div class="attribution">
            <img class="avatar" src={avatarFor(tweet.author)} alt="" width="36" height="36" loading="lazy" />
            <span class="who">
              <span class="name">{tweet.name}</span>
              <span class="handle">@{tweet.author} · {tweet.timestamp}</span>
            </span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 6. big quotes, light -->
<section class="light variant">
  <div class="container">
    <span class="tag">/06 — Big quotes, light</span>
    <p class="note">
      Variant 05 on white. Reads like the rest of the marketing copy rather than an
      embedded widget.
    </p>
    <div class="quotes-7">
      {#each tweets.slice(0, 4) as tweet}
        <a class="quote-7" href="https://x.com/{tweet.author}/status/{tweet.id}" target="_blank" rel="noopener">
          <blockquote>{tweet.body.replace(/\s+/g, " ")}</blockquote>
          <div class="attribution">
            <img class="avatar" src={avatarFor(tweet.author)} alt="" width="36" height="36" loading="lazy" />
            <span class="who">
              <span class="name">{tweet.name}</span>
              <span class="handle">@{tweet.author} · {tweet.timestamp}</span>
            </span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 7. featured + grid -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/0{VARIANTS[4].n} — {VARIANTS[4].title}</span>
    <p class="note">{VARIANTS[4].note}</p>

    <div class="featured-layout">
      <a class="card hero" href={href(featured)} target="_blank" rel="noopener">
        <div class="head">
          <img class="avatar" src={avatarFor(featured.author)} alt="" width="36" height="36" loading="lazy" />
          <span class="who">
            <span class="name">{featured.name}</span>
            <span class="handle">@{featured.author}</span>
          </span>
          <span class="mark" aria-hidden="true">{@html XIcon}</span>
        </div>
        <p class="body">{#each segment(featured.body) as p}{#if p.handle}<span class="mention">{p.text}</span>{:else}{p.text}{/if}{/each}</p>
        <span class="date">{featured.timestamp}</span>
      </a>

      <div class="supporting">
        {#each rest.slice(0, 4) as tweet}
          <a class="card compact" href={href(tweet)} target="_blank" rel="noopener">
            <div class="head">
              <img class="avatar small" src={avatarFor(tweet.author)} alt="" width="28" height="28" loading="lazy" />
              <span class="who">
                <span class="handle">@{tweet.author}</span>
              </span>
            </div>
            <p class="body">{#each segment(tweet.body) as p}{#if p.handle}<span class="mention">{p.text}</span>{:else}{p.text}{/if}{/each}</p>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- 8. hairline list, dark -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/08 — Hairline list</span>
    <p class="note">
      No cards, no fills — just rules between entries. The most restrained option and
      the cheapest in vertical space per tweet.
    </p>
    <div class="list">
      {#each tweets as tweet}
        <a class="list-item" href="https://x.com/{tweet.author}/status/{tweet.id}" target="_blank" rel="noopener">
          <span class="li-who">
            <span class="li-name">{tweet.name}</span>
            <span class="li-handle">@{tweet.author}</span>
          </span>
          <span class="li-body">{tweet.body.replace(/\s+/g, " ")}</span>
          <span class="li-date">{tweet.timestamp}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 9. hairline list, light -->
<section class="light variant">
  <div class="container">
    <span class="tag">/09 — Hairline list, light</span>
    <p class="note">Same as 08 inverted, closer to a press-quotes page.</p>
    <div class="list light-list">
      {#each tweets as tweet}
        <a class="list-item" href="https://x.com/{tweet.author}/status/{tweet.id}" target="_blank" rel="noopener">
          <span class="li-who">
            <span class="li-name">{tweet.name}</span>
            <span class="li-handle">@{tweet.author}</span>
          </span>
          <span class="li-body">{tweet.body.replace(/\s+/g, " ")}</span>
          <span class="li-date">{tweet.timestamp}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 10. ticker -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/10 — Ticker</span>
    <p class="note">
      One compact line, always moving. Buys almost no vertical space and reads as a
      signal that people are talking, rather than something to read.
    </p>
  </div>
  <div class="ticker">
    <div class="ticker-track">
      {#each [...tweets, ...tweets] as tweet, j}
        <a
          class="ticker-item"
          href="https://x.com/{tweet.author}/status/{tweet.id}"
          target="_blank"
          rel="noopener"
          aria-hidden={j >= tweets.length ? "true" : null}
          tabindex={j >= tweets.length ? -1 : null}
        >
          <span class="t-handle">@{tweet.author}</span>
          <span class="t-body">{excerpt(tweet.body)}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 11. dense grid -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/11 — Dense grid</span>
    <p class="note">
      Four narrow columns, smaller type, handles only. Maximum tweets per square inch —
      volume as the proof rather than any single quote.
    </p>
    <div class="dense">
      {#each tweets as tweet}
        <Card {tweet} handleOnly showMark={false} />
      {/each}
    </div>
  </div>
</section>

<!-- 12. zigzag -->
<section class="light variant">
  <div class="container">
    <span class="tag">/12 — Zigzag quotes</span>
    <p class="note">
      Alternating left and right with generous space. Slows the page down deliberately —
      good if this section is meant to be a beat, not a band.
    </p>
    <div class="zigzag">
      {#each tweets.slice(0, 4) as tweet, i}
        <a class="zig-item" class:right={i % 2 === 1} href="https://x.com/{tweet.author}/status/{tweet.id}" target="_blank" rel="noopener">
          <blockquote>{tweet.body.replace(/\s+/g, " ")}</blockquote>
          <span class="zig-attr">{tweet.name} · @{tweet.author}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 13. avatar carousel -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/13 — Avatar carousel</span>
    <p class="note">
      One quote at a time, pick a face to switch. Shows every tweet without spending
      the space, at the cost of requiring a click.
    </p>
    <div class="carousel">
      <div class="carousel-nav">
        {#each tweets as tweet, i}
          <button
            class="c-nav-btn"
            class:active={i === carouselIdx}
            on:click={() => (carouselIdx = i)}
            aria-label="Show tweet from {tweet.name}"
          >
            <img src={avatarFor(tweet.author)} alt="" width="44" height="44" loading="lazy" />
          </button>
        {/each}
      </div>
      {#key carouselIdx}
        <a class="carousel-quote" href="https://x.com/{tweets[carouselIdx].author}/status/{tweets[carouselIdx].id}" target="_blank" rel="noopener">
          <blockquote>{tweets[carouselIdx].body.replace(/\s+/g, " ")}</blockquote>
          <span class="c-attr">
            {tweets[carouselIdx].name} · @{tweets[carouselIdx].author} · {tweets[carouselIdx].timestamp}
          </span>
        </a>
      {/key}
    </div>
  </div>
</section>

<!-- 14. collage -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/14 — Tilted collage</span>
    <p class="note">
      Cards pinned at slight angles, straightening on hover. Loosest of the set —
      more personality, less order.
    </p>
    <div class="collage">
      {#each tweets.slice(0, 6) as tweet}
        <div class="collage-item">
          <Card {tweet} />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- 15. terminal log -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/15 — Mentions log</span>
    <p class="note">
      Tweets as a tailed log file. Leans all the way into the engineering voice the
      rest of the site already has — mono type, accent green, no decoration. Scroll it
      like a terminal.
    </p>

    <div class="terminal">
      <div class="term-bar">
        <span class="term-dot" aria-hidden="true"></span>
        <span class="term-title">comma@x — tail -f mentions.log</span>
      </div>
      <div class="term-body">
        {#each tweets as tweet}
          <a class="log-line" href={href(tweet)} target="_blank" rel="noopener">
            <span class="log-meta">[{tweet.timestamp}]</span>
            <span class="log-handle">@{tweet.author}</span>
            <span class="log-text">{tweet.body.replace(/\s+/g, " ")}</span>
          </a>
        {/each}
        <div class="log-line prompt" aria-hidden="true">
          <span class="log-meta">[live]</span>
          <span class="log-handle">$</span>
          <span class="cursor"></span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 16. display band -->
<section class="dark variant band-variant">
  <div class="container">
    <span class="tag">/16 — Display band</span>
    <p class="note">
      The quotes themselves at headline size, running edge to edge. No cards, no
      avatars — the words are the graphic. Loudest option here.
    </p>
  </div>

  <div class="band">
    <div class="band-track">
      {#each [...tweets.slice(0, 5), ...tweets.slice(0, 5)] as tweet, j}
        <a
          class="band-item"
          href={href(tweet)}
          target="_blank"
          rel="noopener"
          aria-hidden={j >= 5 ? "true" : null}
          tabindex={j >= 5 ? -1 : null}
        >
          <span class="band-star" aria-hidden="true">✦</span>
          <span class="band-text">{excerpt(tweet.body)}</span>
          <span class="band-handle">@{tweet.author}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- 17. stat led -->
<section class="dark variant">
  <div class="container">
    <span class="tag">/17 — Numbers first</span>
    <p class="note">
      Leads with the figure each owner actually stated, quote underneath as the
      receipt. Pulls from a few extra tweets that name a number — the wall above is
      unchanged.
    </p>

    <div class="stats">
      {#each STATS as stat}
        <a class="stat" href={href(stat.tweet)} target="_blank" rel="noopener">
          <span class="stat-value">
            {stat.value}{#if stat.unit}<span class="stat-unit">{stat.unit}</span>{/if}
          </span>
          <span class="stat-label">{stat.label}</span>
          <p class="stat-quote">{stat.tweet.body.replace(/\s+/g, " ")}</p>
          <span class="stat-attr">
            <img src={avatarFor(stat.author)} alt="" width="28" height="28" loading="lazy" />
            {stat.tweet.name} · @{stat.author}
          </span>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  #intro .intro {
    font-size: 1.25rem;
    max-width: 44rem;
  }

  .variant {
    padding-top: 4rem;
    padding-bottom: 5rem;
  }

  .tag {
    color: var(--color-accent);
    display: block;
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .note {
    color: var(--color-muted);
    font-size: 1rem;
    margin: 0 0 2.5rem;
    max-width: 42rem;
  }

  /* shared card styling, matching the live component */
  .card {
    background-color: #0d0d0d;
    border: 1px solid #262626;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    box-shadow: 0 0 0 rgba(81, 255, 0, 0);
    transition:
      background-color 0.2s ease,
      box-shadow 0.16s ease-out,
      transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      background-color: #131313;
      box-shadow: 5px 5px 0 var(--color-accent);
      transform: translate(-6px, -6px);
      z-index: 1;
    }
  }

  .head {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  .avatar {
    background-color: #1c1c1c;
    border: 1px solid #333;
    border-radius: 50%;
    box-sizing: border-box;
    flex: 0 0 2.25rem;
    height: 2.25rem;
    width: 2.25rem;
    object-fit: cover;
  }

  .avatar.small {
    flex-basis: 1.75rem;
    height: 1.75rem;
    width: 1.75rem;
  }

  .who {
    display: flex;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
  }

  .name,
  .handle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .name {
    color: white;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .handle {
    color: var(--color-muted);
    font-size: 0.875rem;
  }

  .mark {
    display: flex;
    margin-left: auto;
    opacity: 0.35;
  }

  .body {
    color: white;
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
    white-space: pre-line;
  }

  .mention {
    color: var(--color-accent);
  }

  .date {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    margin-top: auto;
  }

  /* 2 — static grid */
  .grid {
    column-count: 3;
    column-gap: 1rem;
  }

  .grid .card {
    break-inside: avoid;
    margin-bottom: 1rem;
  }

  /* 3 — drifting columns */
  .drift-wall {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    height: 34rem;
    overflow: hidden;
    padding: 0 max(2rem, 7.5vw);
    mask-image: linear-gradient(
      to bottom,
      transparent,
      black 5rem,
      black calc(100% - 5rem),
      transparent
    );
  }

  .drift-track {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    animation: drift var(--speed) linear infinite;
  }

  @keyframes drift {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-50% - 0.5rem));
    }
  }

  .drift-wall:hover .drift-track {
    animation-play-state: paused;
  }

  /* 4 — big quotes */
  .quotes {
    display: grid;
    gap: 4rem 5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quote blockquote {
    border: none;
    color: white;
    font-size: 1.75rem;
    font-style: normal;
    letter-spacing: -0.03em;
    line-height: 1.25;
    margin: 0 0 1.5rem;
    padding: 0;
    text-wrap: balance;
  }

  .quote .attribution {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .quote:hover blockquote {
      color: var(--color-accent);
    }
  }

  /* 5 — featured + grid */
  .featured-layout {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1.15fr 1fr;
  }

  .hero .body {
    font-size: 1.5rem;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  .supporting {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .compact {
    padding: 1.25rem;
  }

  .compact .body {
    font-size: 0.9375rem;
  }

  @media screen and (max-width: 1024px) {
    .grid {
      column-count: 2;
    }

    .quotes,
    .featured-layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .drift-wall {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 768px) {
    .grid {
      column-count: 1;
    }

    .drift-wall {
      grid-template-columns: minmax(0, 1fr);
      height: 28rem;
      padding: 0 1.5rem;
    }

    .supporting {
      grid-template-columns: minmax(0, 1fr);
    }

    .quote blockquote {
      font-size: 1.375rem;
    }
  }

  /* 15 — mentions log */
  .terminal {
    border: 1px solid #262626;
    background-color: #070707;
  }

  .term-bar {
    align-items: center;
    border-bottom: 1px solid #262626;
    display: flex;
    gap: 0.625rem;
    padding: 0.75rem 1rem;
  }

  .term-dot {
    background-color: var(--color-accent);
    border-radius: 50%;
    height: 0.5rem;
    width: 0.5rem;
  }

  .term-title {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
  }

  .term-body {
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    line-height: 1.7;
    max-height: 26rem;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-width: thin;
    scrollbar-color: #333 transparent;
  }

  .log-line {
    display: block;
    padding: 0.25rem 0.5rem;
    margin: 0 -0.5rem;
    text-indent: -3rem;
    padding-left: 3.5rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .log-line:hover {
      background-color: #101010;
    }

    .log-line:hover .log-text {
      color: white;
    }
  }

  .log-meta {
    color: #4a4a4a;
  }

  .log-handle {
    color: var(--color-accent);
    margin: 0 0.5rem;
  }

  .log-text {
    color: #b8b8b8;
    transition: color 0.2s;
  }

  .prompt {
    text-indent: 0;
    padding-left: 0.5rem;
  }

  .cursor {
    background-color: var(--color-accent);
    display: inline-block;
    height: 0.9rem;
    vertical-align: text-bottom;
    width: 0.5rem;
    animation: blink 1.1s steps(1) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  /* 16 — display band */
  .band-variant {
    padding-bottom: 6rem;
  }

  .band {
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 5rem,
      black calc(100% - 5rem),
      transparent
    );
  }

  .band-track {
    display: flex;
    width: max-content;
    animation: band 55s linear infinite;
  }

  @keyframes band {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .band:hover .band-track {
    animation-play-state: paused;
  }

  .band-item {
    align-items: baseline;
    display: flex;
    gap: 1.5rem;
    padding-right: 3rem;
    white-space: nowrap;
  }

  .band-star {
    color: var(--color-accent);
    font-size: 1.5rem;
  }

  .band-text {
    color: white;
    font-size: clamp(1.75rem, 3.2vw, 3rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1.1;
  }

  .band-handle {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .band-item:hover .band-text {
      color: var(--color-accent);
    }
  }

  /* 17 — numbers first */
  .stats {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .stat {
    border-top: 2px solid var(--color-accent);
    display: flex;
    flex-flow: column;
    padding-top: 1.25rem;
  }

  .stat-value {
    color: white;
    font-size: clamp(2.5rem, 4vw, 3.75rem);
    font-weight: 600;
    letter-spacing: -0.05em;
    line-height: 0.95;
  }

  .stat-unit {
    color: var(--color-muted);
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: -0.02em;
    margin-left: 0.4rem;
  }

  .stat-label {
    color: var(--color-accent);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    margin-top: 0.75rem;
  }

  /* clamped visually, never edited — the full text is in the DOM and the card links
     to the original, so nothing is quoted out of context */
  .stat-quote {
    color: #b8b8b8;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    line-clamp: 7;
    font-size: 0.9375rem;
    line-height: 1.45;
    margin: 1.25rem 0 1.5rem;
    overflow: hidden;
    white-space: pre-line;
  }

  .stat-attr {
    align-items: center;
    color: var(--color-muted);
    display: flex;
    font-size: 0.8125rem;
    gap: 0.5rem;
    margin-top: auto;
  }

  .stat-attr img {
    border-radius: 50%;
    height: 1.75rem;
    object-fit: cover;
    width: 1.75rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .stat:hover .stat-quote {
      color: white;
    }
  }

  @media screen and (max-width: 1024px) {
    .stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 768px) {
    .stats {
      grid-template-columns: minmax(0, 1fr);
    }

    .term-body {
      font-size: 0.75rem;
      max-height: 20rem;
    }

    .log-line {
      text-indent: 0;
      padding-left: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .drift-track,
    .ticker-track,
    .band-track,
    .cursor {
      animation: none;
    }

    .card:hover,
    .collage-item:hover {
      transform: none;
    }
  }

  /* ---- light-section theming for the shared Card ---- */
  .light .tag {
    color: black;
  }

  .light :global(.c-card) {
    --card-bg: var(--color-card-background);
    --card-bg-hover: var(--color-card-background-hover);
    --card-border: rgba(0, 0, 0, 0.4);
    --card-fg: black;
    --mention-color: #2f8f00;
  }

  /* 6 — static grid, light */
  .grid-6 {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  /* 7 — big quotes, light */
  .quotes-7 {
    display: grid;
    gap: 4rem 5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .quote-7 blockquote {
    border: none;
    color: black;
    font-size: 1.75rem;
    font-style: normal;
    letter-spacing: -0.03em;
    line-height: 1.25;
    margin: 0 0 1.5rem;
    padding: 0;
    text-wrap: balance;
  }

  .quote-7 .attribution {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  /* 8 / 9 — hairline list */
  .list {
    border-top: 1px solid #262626;
  }

  .list-item {
    align-items: baseline;
    border-bottom: 1px solid #262626;
    display: grid;
    gap: 0 2rem;
    grid-template-columns: 12rem minmax(0, 1fr) 7rem;
    padding: 1.5rem 0;
    transition: background-color 0.2s;
  }

  .li-who {
    display: flex;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
  }

  .li-name {
    color: white;
    font-weight: 500;
  }

  .li-handle {
    color: var(--color-muted);
    font-size: 0.875rem;
  }

  .li-body {
    color: white;
    line-height: 1.45;
  }

  .li-date {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    text-align: right;
  }

  @media (hover: hover) and (pointer: fine) {
    .list-item:hover {
      background-color: #101010;
    }

    .light-list .list-item:hover {
      background-color: var(--color-card-background);
    }
  }

  .light-list,
  .light-list .list-item {
    border-color: rgba(0, 0, 0, 0.25);
  }

  .light-list .li-name,
  .light-list .li-body {
    color: black;
  }

  /* 10 — ticker */
  .ticker {
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 6rem,
      black calc(100% - 6rem),
      transparent
    );
  }

  .ticker-track {
    display: flex;
    gap: 0.75rem;
    width: max-content;
    animation: ticker 60s linear infinite;
  }

  @keyframes ticker {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-50% - 0.375rem));
    }
  }

  .ticker:hover .ticker-track {
    animation-play-state: paused;
  }

  .ticker-item {
    align-items: baseline;
    background-color: #0d0d0d;
    border: 1px solid #262626;
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    white-space: nowrap;
    transition: border-color 0.2s;
  }

  @media (hover: hover) and (pointer: fine) {
    .ticker-item:hover {
      border-color: var(--color-accent);
    }
  }

  .t-handle {
    color: var(--color-accent);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
  }

  .t-body {
    color: white;
    font-size: 0.9375rem;
  }

  /* 11 — dense grid */
  .dense {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    --card-padding: 1rem;
    --card-font: 0.875rem;
    --avatar-size: 1.75rem;
  }

  /* 12 — zigzag */
  .zigzag {
    display: flex;
    flex-flow: column;
    gap: 4rem;
  }

  .zig-item {
    display: block;
    max-width: 34rem;
  }

  .zig-item.right {
    margin-left: auto;
    text-align: right;
  }

  .zig-item blockquote {
    border: none;
    color: black;
    font-size: 1.5rem;
    font-style: normal;
    letter-spacing: -0.03em;
    line-height: 1.3;
    margin: 0 0 1rem;
    padding: 0;
  }

  .zig-attr {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
  }

  /* 13 — avatar carousel */
  .carousel {
    display: flex;
    flex-flow: column;
    gap: 2.5rem;
  }

  .carousel-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .c-nav-btn {
    background: none;
    border: 2px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    line-height: 0;
    padding: 2px;
    transition: border-color 0.2s, opacity 0.2s;
    opacity: 0.4;
  }

  .c-nav-btn img {
    border-radius: 50%;
    display: block;
    height: 2.75rem;
    object-fit: cover;
    width: 2.75rem;
  }

  .c-nav-btn.active {
    border-color: var(--color-accent);
    opacity: 1;
  }

  @media (hover: hover) and (pointer: fine) {
    .c-nav-btn:hover {
      opacity: 1;
    }
  }

  .carousel-quote {
    display: block;
    max-width: 52rem;
  }

  .carousel-quote blockquote {
    animation: fade 0.35s ease;
    border: none;
    color: white;
    font-size: 2rem;
    font-style: normal;
    letter-spacing: -0.03em;
    line-height: 1.25;
    margin: 0 0 1.25rem;
    padding: 0;
    text-wrap: balance;
  }

  @keyframes fade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .c-attr {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
  }

  /* 14 — collage */
  .collage {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .collage-item {
    transition: transform 0.3s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  .collage-item:nth-child(3n + 1) {
    transform: rotate(-1.4deg);
  }

  .collage-item:nth-child(3n + 2) {
    transform: rotate(0.8deg);
  }

  .collage-item:nth-child(3n + 3) {
    transform: rotate(-0.5deg) translateY(0.75rem);
  }

  @media (hover: hover) and (pointer: fine) {
    .collage-item:hover {
      transform: rotate(0deg);
    }
  }

  @media screen and (max-width: 1024px) {
    .grid-6,
    .dense {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .quotes-7 {
      grid-template-columns: minmax(0, 1fr);
    }

    .collage {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .list-item {
      grid-template-columns: 10rem minmax(0, 1fr);
      gap: 0 1.5rem;
    }

    .li-date {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .grid-6,
    .dense,
    .collage {
      grid-template-columns: minmax(0, 1fr);
    }

    .list-item {
      gap: 0.5rem;
      grid-template-columns: minmax(0, 1fr);
    }

    .zig-item.right {
      margin-left: 0;
      text-align: left;
    }

    .quote-7 blockquote,
    .carousel-quote blockquote {
      font-size: 1.375rem;
    }

    .collage-item {
      transform: none !important;
    }
  }
</style>
