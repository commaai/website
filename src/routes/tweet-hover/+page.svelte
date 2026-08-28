<script>
  import XIcon from "$lib/icons/social/x.svg?raw";
  import { tweets, videoTweets } from "$lib/constants/social-proof.js";

  const avatars = import.meta.glob("$lib/images/featured-tweets/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const avatarFor = (author) =>
    avatars[`/src/lib/images/featured-tweets/${author}.jpg`];

  const posters = import.meta.glob("$lib/images/featured-tweets/video/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const posterFor = (file) =>
    posters[`/src/lib/images/featured-tweets/video/${file}.jpg`];

  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));

  // one video and two quotes per row, so each effect is judged on both card types
  const sample = [videoTweets[0], tweets[0], tweets[1]];

  const VARIANTS = [
    { key: "current", title: "Shipping now", note: "Green offset shadow plus a diagonal push. What the wall uses today." },
    { key: "scale", title: "Scale", note: "scale(1.02) and a lighter background — what the brand tiles on /vehicles and the cards on /support already do." },
    { key: "border", title: "Border brighten", note: "Border goes from #262626 to comma green. Nothing moves at all." },
    { key: "underline", title: "Accent underline", note: "A 4px green rule fades in along the bottom edge, borrowed from the .highlight links. No motion." },
    { key: "wash", title: "Green wash", note: "The .highlight gradient over the whole card. Same treatment as a highlighted link, scaled up." },
    { key: "lift", title: "Soft lift", note: "Rises 4px with a black drop shadow. The most conventional card hover on the web." },
    { key: "outline", title: "Inset outline", note: "A green rule draws inside the border. Nothing reflows because it is an inset shadow." },
    { key: "corner", title: "Corner brackets", note: "Two green brackets snap to opposite corners. Reads as a viewfinder locking on." },
    { key: "tilt", title: "Tilt", note: "Rotates a degree and lifts. Deliberately the most playful one here." },
    { key: "glitch", title: "Chromatic split", note: "Green and white shadows offset in opposite directions for a split-print feel. The loudest option." },
  ];
</script>

<svelte:head><title>Tweet card hovers — variants</title></svelte:head>

<section class="dark">
  <div class="container">
    <h1>Card hover treatments</h1>
    <p class="intro">
      Ten ways the tweet cards could respond to a cursor, from what ships today to
      considerably louder. Each row shows one video card and two quote cards, since an
      effect that works on text can fall apart over footage. Hover anything.
    </p>

    {#each VARIANTS as v, i}
      <div class="variant">
        <header>
          <span class="n">{i + 1}</span>
          <div>
            <h2>{v.title}</h2>
            <p>{v.note}</p>
          </div>
        </header>

        <div class="row fx-{v.key}">
          {#each sample as t}
            <a
              class="tweet"
              class:video={t.clip}
              href="https://x.com/{t.author}/status/{t.id}"
              target="_blank"
              rel="noopener"
            >
              {#if t.clip}
                <div class="frame">
                  <img src={posterFor(t.poster)} alt="" loading="lazy" />
                  <span class="dur">{t.duration}</span>
                </div>
              {/if}

              <div class="meta">
                <div class="head">
                  {#if avatarFor(t.author)}
                    <img class="avatar" src={avatarFor(t.author)} alt="" width="36" height="36" loading="lazy" />
                  {:else}
                    <span class="avatar initial" aria-hidden="true">{t.author[0].toUpperCase()}</span>
                  {/if}
                  <span class="who">
                    {#if t.name}<span class="name">{t.name}</span>{/if}
                    <span class="handle">@{t.author}</span>
                  </span>
                  <span class="mark" aria-hidden="true">{@html XIcon}</span>
                </div>
                <p class="body">{#each segment(t.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
                <span class="date">{t.timestamp}</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  h1 {
    margin-bottom: 1rem;
  }

  .intro {
    max-width: 46rem;
    font-size: 1.125rem;
    line-height: 1.4;
  }

  .variant {
    margin: 3.5rem 0;
  }

  header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
    margin-bottom: 1.25rem;
  }

  .n {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    color: #000;
    font-size: 0.875rem;
    font-weight: 700;
    background: var(--color-accent);
  }

  h2 {
    margin: 0;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.75rem;
  }

  header p {
    margin: 0.25rem 0 0;
    max-width: 46rem;
    font-size: 0.875rem;
    line-height: 1.35;
    color: var(--color-muted);
  }

  .row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
    align-items: start;
  }

  .tweet {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    background-color: #0d0d0d;
    border: 1px solid #262626;
    overflow: hidden;
  }

  .tweet.video {
    padding: 0;
    gap: 0;
  }

  .meta {
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.875rem;
  }

  .tweet.video .meta {
    padding: 1.25rem 1.5rem 1.5rem;
  }

  .frame {
    position: relative;
    aspect-ratio: 16 / 9;
    background: #000;
    overflow: hidden;
  }

  .frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dur {
    position: absolute;
    right: 0.6rem;
    bottom: 0.6rem;
    padding: 0.1rem 0.4rem;
    color: #fff;
    font-family: JetBrains Mono, monospace;
    font-size: 0.6875rem;
    background: rgba(0, 0, 0, 0.75);
  }

  .head {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  .avatar {
    align-self: center;
    background-color: #1c1c1c;
    border: 1px solid #333;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    flex: 0 0 2.25rem;
    height: 2.25rem;
    width: 2.25rem;
    object-fit: cover;
  }

  .avatar.initial {
    align-items: center;
    color: var(--color-accent);
    display: flex;
    font-family: JetBrains Mono, monospace;
    font-size: 0.9rem;
    justify-content: center;
  }

  .who {
    display: flex;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
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
    transition: opacity 0.2s ease;
  }

  .tweet:hover .mark {
    opacity: 1;
  }

  .body {
    color: white;
    font-size: 1rem;
    line-height: 1.5;
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

  @media (hover: hover) and (pointer: fine) {
    /* 1 — what ships today */
    .fx-current .tweet {
      box-shadow: 5px 5px 0 rgba(81, 255, 0, 0);
      transition:
        background-color 0.2s ease,
        box-shadow 0.16s ease-out,
        transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
    }

    .fx-current .tweet:hover {
      background-color: #131313;
      box-shadow: 5px 5px 0 var(--color-accent);
      transform: translate(-6px, -6px);
      z-index: 1;
    }

    /* 2 — the /vehicles and /support card hover */
    .fx-scale .tweet {
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .fx-scale .tweet:hover {
      background-color: #161616;
      transform: scale(1.02);
      z-index: 1;
    }

    /* 3 */
    .fx-border .tweet {
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    .fx-border .tweet:hover {
      background-color: #131313;
      border-color: var(--color-accent);
    }

    /* 4 — the .highlight rule, grown from the left */
    .fx-underline .tweet::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4px;
      background: var(--color-accent);
      opacity: 0;
      z-index: 1;
      transition: opacity 0.1s ease;
    }

    .fx-underline .tweet:hover::after {
      opacity: 1;
    }

    /* 5 — the .highlight gradient at card scale */
    .fx-wash .tweet::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: linear-gradient(145deg, rgba(81, 255, 0, 0), rgba(81, 255, 0, 0.4));
      opacity: 0;
      pointer-events: none;
      /* the video frame is a later sibling, so overlays need lifting above it */
      z-index: 1;
      transition: opacity 0.24s ease;
    }

    .fx-wash .tweet:hover {
      border-color: var(--color-accent);
    }

    .fx-wash .tweet:hover::after {
      opacity: 1;
    }

    /* 6 */
    .fx-lift .tweet {
      transition: transform 0.24s ease-out, box-shadow 0.24s ease-out;
    }

    .fx-lift .tweet:hover {
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.7);
      transform: translateY(-4px);
      z-index: 1;
    }

    /* 7 */
    .fx-outline .tweet {
      transition: box-shadow 0.2s ease;
    }

    .fx-outline .tweet:hover {
      box-shadow: inset 0 0 0 3px var(--color-accent);
    }

    /* 8 */
    .fx-corner .tweet::before,
    .fx-corner .tweet::after {
      content: "";
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      opacity: 0;
      pointer-events: none;
      z-index: 1;
      transition: opacity 0.2s ease, transform 0.24s ease-out;
    }

    .fx-corner .tweet::before {
      top: 0.5rem;
      left: 0.5rem;
      border-top: 3px solid var(--color-accent);
      border-left: 3px solid var(--color-accent);
      transform: translate(6px, 6px);
    }

    .fx-corner .tweet::after {
      right: 0.5rem;
      bottom: 0.5rem;
      border-right: 3px solid var(--color-accent);
      border-bottom: 3px solid var(--color-accent);
      transform: translate(-6px, -6px);
    }

    .fx-corner .tweet:hover::before,
    .fx-corner .tweet:hover::after {
      opacity: 1;
      transform: translate(0, 0);
    }

    /* 9 */
    .fx-tilt .tweet {
      transition: transform 0.28s cubic-bezier(0.22, 1.2, 0.36, 1), box-shadow 0.2s ease;
    }

    .fx-tilt .tweet:hover {
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.65);
      transform: rotate(-1deg) translateY(-6px) scale(1.01);
      z-index: 1;
    }

    /* 10 */
    .fx-glitch .tweet {
      transition: box-shadow 0.14s ease-out, transform 0.14s ease-out;
    }

    .fx-glitch .tweet:hover {
      box-shadow:
        -5px 0 0 var(--color-accent),
        5px 0 0 rgba(255, 255, 255, 0.85);
      transform: translateY(-2px);
      z-index: 1;
    }
  }

  @media screen and (max-width: 1000px) {
    .row {
      grid-template-columns: 1fr;
    }
  }

</style>
