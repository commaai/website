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
              <span class="mark" aria-hidden="true">{@html XIcon}</span>
            </div>
            <p class="body">{#each segment(tweet.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
            <span class="date">{tweet.timestamp}</span>
          </a>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .tweet-wall {
    /* --lift is hover clearance: the scroller clip and the mask each stop at their
       own box, so both pad by --lift and cancel it with margin */
    --lift: 1rem;
    --gap: 1rem;
    --fade: 4rem;
    --stagger: 5rem;

    /* 280px is what the four cards can't use: both fades, three gaps, the stagger,
       and the scrollbar 100vw includes. Scrolls below roughly 1600px. */
    --card: clamp(21rem, calc((100vw - 280px) / 4), 26rem);

    padding: var(--lift) 0;
    margin: calc(2rem - var(--lift)) 0 calc(var(--lift) * -1);

    mask-image: linear-gradient(
      to right,
      transparent,
      black var(--fade),
      black calc(100% - var(--fade)),
      transparent
    );
  }

  .scroller {
    overflow-x: auto;
    overflow-y: hidden;
    padding: var(--lift) 0;
    margin: calc(var(--lift) * -1) 0;

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
    padding: 0 var(--fade);

    /* centres when it fits; goes over-constrained to 0 when it doesn't, so it still
       scrolls from the left — justify-content: center would strand content */
    margin-inline: auto;
  }

  .row {
    display: flex;
    gap: var(--gap);
  }

  /* offset from each other, same usable width, so the cards stay equal */
  .row.staggered {
    margin-left: var(--stagger);
  }

  .row:not(.staggered) {
    margin-right: var(--stagger);
  }

  .tweet {
    box-sizing: border-box; /* no global border-box reset in app.css */
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

    transition:
      background-color 0.2s ease,
      box-shadow 0.16s ease-out,
      transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    /* box-shadow rather than a thicker border so nothing reflows */
    .tweet:hover {
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mark {
    display: flex;
    flex: none;
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
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    .tweet-wall {
      --card: 17rem;
      --fade: 1.5rem;
      --stagger: 3rem;
    }

    .tweet {
      padding: 1.25rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tweet {
      transition: background-color 0.2s ease, box-shadow 0.16s ease-out;
    }

    .tweet:hover {
      transform: none;
    }
  }
</style>
