<script>
  import XIcon from "$lib/icons/social/x.svg?raw";
  import { tweets } from "$lib/constants/social-proof.js";

  // profile pictures, named by handle — see scripts/update-tweet-avatars.sh
  const avatars = import.meta.glob("$lib/images/featured-tweets/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const avatarFor = (author) =>
    avatars[`/src/lib/images/featured-tweets/${author}.jpg`];

  // two rows, each scrolled sideways by the reader — the Netflix/App Store shelf
  const half = Math.ceil(tweets.length / 2);
  const rows = [tweets.slice(0, half), tweets.slice(half)];

  // @handles become links; everything else renders as plain text
  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));
</script>

<div class="tweet-wall">
  <!-- one scroll container holding both rows, so they move in lockstep for free -->
  <div class="scroller">
    <div class="rows">
      {#each rows as row, i}
        <div class="row" class:staggered={i === 1}>
          {#each row as tweet}
          <a
            class="tweet"
            href="https://x.com/{tweet.author}/status/{tweet.id}"
            target="_blank"
            rel="noopener"
          >
            <div class="head">
              {#if avatarFor(tweet.author)}
                <img
                  class="avatar"
                  src={avatarFor(tweet.author)}
                  alt=""
                  width="36"
                  height="36"
                  loading="lazy"
                />
              {:else}
                <span class="avatar initial" aria-hidden="true">{tweet.author[0].toUpperCase()}</span>
              {/if}
              <span class="who">
                {#if tweet.name}<span class="name">{tweet.name}</span>{/if}
                <span class="handle">@{tweet.author}</span>
              </span>
              <span class="head-right">
                <span class="date">{tweet.timestamp}</span>
                <span class="mark" aria-hidden="true">{@html XIcon}</span>
              </span>
            </div>
            <p class="body">{#each segment(tweet.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
          </a>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .tweet-wall {
    /* --lift is the room a hovered card needs to rise into without being clipped.
       Both the scroller clip and the mask stop at their own box, so each gets
       padding worth --lift and cancels it again with margin to keep the layout put. */
    --lift: 1rem;
    --gap: 1rem;
    --fade: 4rem;
    --stagger: 5rem;

    /* Cards share the width until they'd get too narrow — the floor is where the
       date starts crowding the handle — and past that they hold their size and the
       row scrolls instead. The 280px is the fixed furniture the four cards can't
       use: both fades, three gaps, the stagger, and the page's own scrollbar
       (100vw includes it). Works out to scrolling below roughly 1600px. */
    --card: clamp(21rem, calc((100vw - 280px) / 4), 26rem);

    padding: var(--lift) 0;
    margin: calc(2rem - var(--lift)) 0 calc(var(--lift) * -1);

    /* sits outside .container so the cards run edge to edge and fade out */
    mask-image: linear-gradient(
      to right,
      transparent,
      black var(--fade),
      black calc(100% - var(--fade)),
      transparent
    );
  }

  /* the single scroll container — both rows live inside it, so one gesture
     moves them together and the stagger between them never drifts */
  .scroller {
    overflow-x: auto;
    overflow-y: hidden;
    padding: var(--lift) 0;
    margin: calc(var(--lift) * -1) 0;

    /* don't let a sideways flick trigger the browser's back-swipe */
    overscroll-behavior-x: contain;

    scrollbar-width: thin;
    scrollbar-color: #333 transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #333;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  .rows {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: var(--gap);
    width: max-content;
    /* keeps the first and last cards clear of the mask instead of under it */
    padding: 0 var(--fade);

    /* Centres the block when it fits. Auto margins go over-constrained and resolve
       to 0 once it's wider than the scroller, so it still scrolls from the left —
       which justify-content: center would break by stranding content off-screen. */
    margin-inline: auto;
  }

  .row {
    display: flex;
    gap: var(--gap);
  }

  /* The two rows are offset from each other but keep the same usable width, so
     their cards stay the same size once the widths go fluid below. */
  .row.staggered {
    margin-left: var(--stagger);
  }

  .row:not(.staggered) {
    margin-right: var(--stagger);
  }


  .tweet {
    /* no global border-box reset in app.css — without this, --card is the *text*
       width and each card is really 3rem+2px wider than it claims */
    box-sizing: border-box;
    background-color: #0d0d0d;
    border: 1px solid #262626;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    position: relative;
    width: var(--card);
    flex: 0 0 var(--card);
    overflow: hidden;
    box-shadow: 0 0 0 rgba(81, 255, 0, 0);

    /* the lift carries a touch of overshoot so it settles rather than stops dead;
       the accent edge arrives faster so it's already there as the card rises */
    transition:
      background-color 0.2s ease,
      box-shadow 0.16s ease-out,
      transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    /* Lifts toward the top-left off a solid accent edge on the bottom-right.
       Drawn as a box-shadow rather than a thicker border so nothing reflows. */
    .tweet:hover {
      background-color: #131313;
      box-shadow: 5px 5px 0 var(--color-accent);
      transform: translate(-6px, -6px);
      z-index: 1; /* lift over the neighbouring card, not under it */
    }

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

  /* fallback when a handle has no downloaded profile picture */
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
    flex: 1;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
  }

  .name {
    color: white;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .handle {
    color: var(--color-muted);
    font-size: 0.875rem;
    /* same truncation as .name — without it the handle runs under the date */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mark {
    display: flex;
    flex: none;
    opacity: 0.35;
  }

  /* :global() must sit at the top level here: nested inside .mark it gets emitted
     literally and the browser drops the rule, while a plain `.mark svg` is pruned
     as unused because the svg comes from {@html}. Same pattern as #hero .feature-icon. */
  /* 1.5rem matches the size it always rendered at: the source svg is width="24"
     height="48", so the glyph fitted to the 24 and sat centred in a 48-tall box.
     Sizing both axes makes the box hug the glyph, which is what lets the date
     bottom-align to the mark instead of to that dead space. */
  .mark :global(svg) {
    display: block;
    height: 1.5rem;
    width: 1.5rem;
  }

  .mark :global(svg path) {
    fill: white;
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

  /* The X sits vertically centred in the header (the .head default), and the date
     hangs off its bottom edge — line-height 1 so the date's box bottom is the text
     bottom rather than a descender gap below it. */
  .head-right {
    align-items: flex-end;
    display: flex;
    flex: none;
    gap: 0.5rem;
    margin-left: auto;
    padding-left: 0.5rem;
  }

  .date {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.7rem;
    /* under 1 so the box crops to the glyphs themselves — mono fonts carry a lot of
       descender room the date never uses, which floated it above the X's bottom */
    line-height: 0.6;
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    /* narrower cards and a shorter fade so more is legible at a time on a phone */
    .tweet-wall {
      --card: 17rem;
      --fade: 1.5rem;
      --stagger: 3rem;
    }

    .tweet {
      padding: 1.25rem;
    }
  }

  /* the hover lift is the only motion left, so it's the only thing to stand down */
  @media (prefers-reduced-motion: reduce) {
    .tweet {
      transition: background-color 0.2s ease, box-shadow 0.16s ease-out;
    }

    .tweet:hover {
      transform: none;
    }
  }
</style>
