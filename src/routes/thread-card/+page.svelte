<script>
  import XIcon from "$lib/icons/social/x.svg?raw";
  import { threadTweet } from "$lib/constants/social-proof.js";

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

  const top = threadTweet.answers;
  const reply = threadTweet;

  const VARIANTS = [
    { key: "rule", title: "Rule", note: "Full-width divider between the two posts. What's on the wall now." },
    { key: "bare", title: "Nothing", note: "No divider at all — the gap between them does the work." },
    { key: "connector", title: "Connector", note: "A line down the avatar column joining the two, the way a thread renders on X. Text stays flush." },
    { key: "caption", title: "Caption", note: "A muted line naming what happened, so the card explains itself without any graphic." },
    { key: "panel", title: "Panel", note: "The reply sits on a lighter slab that bleeds to the card edges." },
    { key: "accent", title: "Accent bar", note: "A short green bar marks the reply. The only variant that puts brand colour on the card." },
    { key: "arrow", title: "Reply arrow", note: "A corner glyph in front of the avatar. Smallest possible signal.", glyph: "↳" },
    { key: "gap", title: "Wide gap", note: "No graphic, just twice the breathing room. The quietest option." },
    { key: "arrow", title: "Hook", note: "Rounder than the corner, and reads as “in reply to” rather than “below”.", glyph: "↪" },
    { key: "arrow", title: "Heavy corner", note: "The same shape drawn with a thicker stroke, so it holds up next to the avatar.", glyph: "⤷" },
    { key: "arrow", title: "Plain", note: "No turn at all. The most neutral mark that still points.", glyph: "→" },
    { key: "arrow", title: "Curve down", note: "Turns the other way — across, then down into the reply.", glyph: "⤵" },
    { key: "arrow", title: "Corner in green", note: "The first glyph in comma green, so the eye lands on it before the avatar.", glyph: "↳", accent: true },

    { key: "big", title: "Big corner", note: "The same glyph at double size in white. Bolder with nothing new added.", glyph: "↳" },
    { key: "svg", title: "Drawn arrow", note: "Not a font glyph — a stroked path, so the weight is ours to set rather than the typeface's.", svg: true },
    { key: "chip", title: "Green chip", note: "The arrow knocked out of a solid green square, the way the numbered badges on this page work.", glyph: "↳" },
    { key: "chipline", title: "Outlined chip", note: "The same square, drawn rather than filled. Loud shape, quiet colour.", glyph: "↳" },

    { key: "indent", title: "Indent only", note: "No mark at all — the reply body lines up under the name instead, so the offset carries it.", indent: true },
    { key: "ruleindent", title: "Rule, indented", note: "Divider plus the indent. Two quiet signals instead of one loud one.", indent: true },
    { key: "bigindent", title: "Big corner, indented", note: "Double-size glyph and the body indented to clear it.", glyph: "↳", indent: true },
    { key: "chipindent", title: "Green chip, indented", note: "The loudest mark and the indent together. Nothing subtle about it.", glyph: "↳", indent: true },

    { key: "connectorflush", title: "Connector, reply flush", note: "3, but only the first body clears the gutter — the line still runs pfp to pfp, and Quinn's text sits back at the card edge.", indent: true },
  ];
</script>

<svelte:head><title>Thread card — variants</title></svelte:head>

<section class="dark">
  <div class="container">
    <h1>Thread card treatments</h1>
    <p class="intro">
      Eight ways to show that the second post answers the first, all keeping both posts
      flush at the same left edge. Shown at the width the card gets on the home page.
    </p>

    <div class="grid">
      {#each VARIANTS as v, i}
        <div class="variant">
          <header>
            <span class="n">{i + 1}</span>
            <div>
              <h2>{v.title}</h2>
              <p>{v.note}</p>
            </div>
          </header>

          <a
            class="tweet fx-{v.key}"
            href="https://x.com/{reply.author}/status/{reply.id}"
            target="_blank"
            rel="noopener"
          >
            <div class="post">
              <div class="head">
                <img class="avatar" src={avatarFor(top.author)} alt="" width="36" height="36" loading="lazy" />
                <span class="who">
                  <span class="name">{top.name}</span>
                  <span class="handle">@{top.author}</span>
                </span>
                <span class="mark" aria-hidden="true">{@html XIcon}</span>
              </div>
              <p class="body">{#each segment(top.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
            </div>

            {#if v.key === "caption"}
              <span class="caption">{reply.name} replied</span>
            {/if}

            <div class="post reply">
              <div class="head">
                {#if v.svg}
                  <span class="glyph drawn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4v8a3 3 0 0 0 3 3h11" />
                      <path d="M14 11l4 4-4 4" />
                    </svg>
                  </span>
                {:else if v.glyph}
                  <span class="glyph" class:accent={v.accent} aria-hidden="true">{v.glyph}</span>
                {/if}
                <img class="avatar" src={avatarFor(reply.author)} alt="" width="36" height="36" loading="lazy" />
                <span class="who">
                  <span class="name">{reply.name}</span>
                  <span class="handle">@{reply.author}</span>
                </span>
              </div>
              <p class="body">{#each segment(reply.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
            </div>

            <span class="date">{reply.timestamp}</span>
          </a>
        </div>
      {/each}
    </div>
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
    margin-bottom: 3rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(29rem, 1fr));
    gap: 3rem 1.5rem;
    align-items: start;
  }

  header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
    margin-bottom: 1rem;
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
    font-size: 0.875rem;
    line-height: 1.35;
    color: var(--color-muted);
  }

  .tweet {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    background-color: #0d0d0d;
    border: 2px solid #262626;
    transition: border-color 0.2s ease;
  }

  .tweet:hover {
    border-color: var(--color-accent);
  }

  .post {
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
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

  /* 1 */
  .fx-rule .reply {
    padding-top: 1.25rem;
    border-top: 2px solid #262626;
  }

  /* 2 — nothing added */

  /* 3 — the body clears the avatar column so the line has a gutter to run down,
     unbroken from the bottom of one picture to the top of the next */
  .fx-connector .post,
  .fx-connectorflush .post {
    position: relative;
  }

  /* only the post the line runs past needs the gutter */
  .fx-connector .body,
  .fx-connectorflush .post:first-child .body {
    padding-left: 3rem;
  }

  .fx-connector .reply,
  .fx-connectorflush .reply {
    padding-top: 0.875rem;
  }

  .fx-connector .post:first-child::after,
  .fx-connectorflush .post:first-child::after {
    content: "";
    position: absolute;
    left: 1.0625rem;
    top: 2.625rem;
    bottom: -1.75rem;
    width: 2px;
    background: #262626;
  }

  /* 4 */
  .caption {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* 5 — bleeds past the card padding to the border on both sides */
  .fx-panel .reply {
    margin: 0 -1.5rem -1.5rem;
    padding: 1.25rem 1.5rem;
    background: #141414;
  }

  .fx-panel .date {
    display: none;
  }

  /* 6 */
  .fx-accent .reply {
    padding-top: 1.25rem;
    border-top: 2px solid #262626;
  }

  .fx-accent .reply .head::before {
    content: "";
    align-self: stretch;
    width: 3px;
    margin-right: 0.25rem;
    background: var(--color-accent);
  }

  /* 7, and the arrow set at the end */
  .glyph {
    color: var(--color-muted);
    font-size: 1.25rem;
    line-height: 1;
  }

  .glyph.accent {
    color: var(--color-accent);
  }

  .fx-big .glyph,
  .fx-bigindent .glyph {
    color: #fff;
    font-size: 2rem;
  }

  .glyph.drawn {
    color: #fff;
  }

  .glyph.drawn svg {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
  }

  .fx-chip .glyph,
  .fx-chipindent .glyph,
  .fx-chipline .glyph {
    display: grid;
    place-items: center;
    box-sizing: border-box;
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1.125rem;
  }

  .fx-chip .glyph,
  .fx-chipindent .glyph {
    color: #000;
    background: var(--color-accent);
  }

  .fx-chipline .glyph {
    border: 2px solid var(--color-accent);
  }

  /* the reply body clears the head's leading art so it lands under the name */
  .fx-indent .reply .body,
  .fx-ruleindent .reply .body {
    padding-left: 3rem;
  }

  .fx-bigindent .reply .body {
    padding-left: 4.9375rem;
  }

  .fx-chipindent .reply .body {
    padding-left: 5.5rem;
  }

  .fx-ruleindent .reply {
    padding-top: 1.25rem;
    border-top: 2px solid #262626;
  }

  /* 8 */
  .fx-gap .reply {
    padding-top: 1rem;
  }
</style>
