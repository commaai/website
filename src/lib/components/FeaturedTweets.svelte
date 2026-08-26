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

  // Pause on deliberate hover only. A parked cursor shouldn't freeze the wall while
  // the page scrolls under it, so we wait for real pointer movement and treat any
  // scroll as "not reading" — some browsers fire mousemove when content moves under a
  // still cursor, hence the guard rather than a plain :hover.
  let paused = false;
  let lastScroll = 0;

  const onScroll = () => {
    lastScroll = performance.now();
    paused = false;
  };
  const onMove = () => {
    if (performance.now() - lastScroll > 150) paused = true;
  };

  // Seconds for one card to travel its own width. Reading is handled by hover-pause,
  // so this only has to feel alive — turn it up to slow the drift down.
  const SECONDS_PER_CARD = 8;

  // two rows drifting opposite directions, split so neither row repeats itself
  const half = Math.ceil(tweets.length / 2);
  const rows = [tweets.slice(0, half), tweets.slice(half)];

  // @handles become links; everything else renders as plain text
  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));
</script>

<svelte:window on:scroll={onScroll} />

<div
  class="tweet-wall"
  class:paused
  on:mousemove={onMove}
  on:mouseleave={() => (paused = false)}
  role="presentation"
>
  {#each rows as row, i}
    <div class="row" class:reverse={i === 1}>
      <!-- track is duplicated so the loop point is seamless -->
      <div class="track" style="--duration: {row.length * SECONDS_PER_CARD}s">
        {#each [...row, ...row] as tweet, j}
          <a
            class="tweet"
            href="https://x.com/{tweet.author}/status/{tweet.id}"
            target="_blank"
            rel="noopener"
            aria-hidden={j >= row.length ? "true" : null}
            tabindex={j >= row.length ? -1 : null}
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
                <span class="handle-row">
                  <span class="handle">@{tweet.author}</span>
                  <span class="date">{tweet.timestamp}</span>
                </span>
              </span>
              <span class="mark" aria-hidden="true">{@html XIcon}</span>
            </div>
            <p class="body">{#each segment(tweet.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .tweet-wall {
    display: flex;
    flex-flow: column;
    gap: 1rem;

    /* --lift is the room a hovered card needs to rise into without being clipped.
       Both the row clip and the mask below stop at their own box, so each gets
       padding worth --lift and cancels it again with margin to keep the layout put. */
    --lift: 1rem;
    padding: var(--lift) 0;
    margin: calc(2rem - var(--lift)) 0 calc(var(--lift) * -1);

    /* sits outside .container so the cards run edge to edge and fade out */
    mask-image: linear-gradient(
      to right,
      transparent,
      black 8rem,
      black calc(100% - 8rem),
      transparent
    );
  }

  /* clips the track horizontally; the padding keeps it from clipping the lift */
  .row {
    overflow: hidden;
    padding: var(--lift) 0;
    margin: calc(var(--lift) * -1) 0;
  }

  .track {
    display: flex;
    gap: 1rem;
    width: max-content;
    animation: drift var(--duration) linear infinite;
    will-change: transform;
  }

  .row.reverse .track {
    animation-direction: reverse;
  }

  /* the track holds two copies, so one full pass is exactly half of it */
  @keyframes drift {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-50% - 0.5rem));
    }
  }

  .tweet-wall.paused .track,
  .tweet-wall:focus-within .track {
    animation-play-state: paused;
  }

  .tweet {
    background-color: #0d0d0d;
    border: 1px solid #262626;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    position: relative;
    width: 24rem;
    flex: 0 0 24rem;
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
  }

  .mark {
    align-self: flex-start;
    display: flex;
    flex: none;
    opacity: 0.35;

    & :global(svg) {
      height: 1rem;
      width: 1rem;

      & :global(path) {
        fill: white;
      }
    }
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

  /* date shares the handle's line, pushed to the right — saves the card a whole row
     and baseline-aligns to the handle rather than to the taller header row */
  .handle-row {
    align-items: baseline;
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
  }

  .date {
    color: var(--color-muted);
    flex: none;
    font-family: JetBrains Mono, monospace;
    font-size: 0.7rem;
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    .tweet-wall {
      mask-image: linear-gradient(
        to right,
        transparent,
        black 2rem,
        black calc(100% - 2rem),
        transparent
      );
    }

    /* narrower so more than one card is legible at a time on a phone */
    .tweet {
      width: 17rem;
      flex-basis: 17rem;
      padding: 1.25rem;
    }
  }

  /* no drift for anyone who asked for less motion — swipe instead */
  @media (prefers-reduced-motion: reduce) {
    .tweet-wall {
      mask-image: none;
    }

    .row {
      overflow-x: auto;
    }

    .track {
      animation: none;
    }

    /* the second copy only exists to hide the loop seam */
    .track .tweet[aria-hidden="true"] {
      display: none;
    }
  }
</style>
