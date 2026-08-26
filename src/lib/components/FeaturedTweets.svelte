<script>
  import XIcon from "$lib/icons/social/x.svg?raw";
  import { tweets } from "$lib/constants/social-proof.js";

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

<div class="tweet-wall">
  {#each rows as row, i}
    <div class="row" class:reverse={i === 1}>
      <!-- track is duplicated so the loop point is seamless -->
      <div class="track" style="--duration: {row.length * 11}s">
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
              <span class="avatar" aria-hidden="true">{tweet.author[0].toUpperCase()}</span>
              <span class="who">
                {#if tweet.name}<span class="name">{tweet.name}</span>{/if}
                <span class="handle">@{tweet.author}</span>
              </span>
              <span class="mark" aria-hidden="true">{@html XIcon}</span>
            </div>
            <p class="body">{#each segment(tweet.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
            <span class="date">{tweet.timestamp}</span>
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
    margin: 4rem 0 2rem;

    /* sits outside .container so the cards run edge to edge and fade out */
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 8rem,
      black calc(100% - 8rem),
      transparent
    );
  }

  .row {
    overflow: hidden;
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

  .tweet-wall:hover .track,
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
    transition:
      border-color 0.25s,
      background-color 0.25s,
      transform 0.25s;
  }

  /* accent sweep, parked off-card until hover */
  .tweet::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 40%,
      rgba(81, 255, 0, 0.09) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .tweet:hover {
      background-color: #131313;
      border-color: var(--color-accent);
      transform: translateY(-2px);
    }

    .tweet:hover::after {
      transform: translateX(100%);
    }
  }

  .head {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  .avatar {
    align-items: center;
    background-color: #1c1c1c;
    border: 1px solid #333;
    color: var(--color-accent);
    display: flex;
    flex: 0 0 2.25rem;
    font-family: JetBrains Mono, monospace;
    font-size: 0.9rem;
    height: 2.25rem;
    justify-content: center;
    border-radius: 50%;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .handle {
    color: var(--color-muted);
    font-size: 0.875rem;
  }

  .mark {
    display: flex;
    margin-left: auto;
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

  .date {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
  }

  @media screen and (max-width: 768px) {
    .tweet-wall {
      margin: 3rem 0 1rem;
      mask-image: linear-gradient(
        to right,
        transparent,
        black 2rem,
        black calc(100% - 2rem),
        transparent
      );
    }

    .tweet {
      width: 19rem;
      flex-basis: 19rem;
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
