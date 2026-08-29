<script>
  import { press } from "$lib/constants/press.js";
  import { tweets } from "$lib/constants/tweets.js";
  import PlayIcon from "$lib/icons/social/youtube.svg?raw";
  import XIcon from "$lib/icons/social/x.svg?raw";
  import ArrowRight from "$lib/icons/arrow-right.svg?raw";

  export let show = "all";

  const VIDEO_BASE = "https://3comma.net/tweets";

  const avatars = import.meta.glob("$lib/images/tweets/avatars/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const avatarFor = (handle) =>
    avatars[`/src/lib/images/tweets/avatars/${handle}.jpg`];

  const posters = import.meta.glob("$lib/images/tweets/posters/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const videoFor = (post) => `${post.handle}-${post.id}`;
  const posterFor = (post) =>
    posters[`/src/lib/images/tweets/posters/${videoFor(post)}.jpg`]?.img?.src;

  const quoted = (text) => text.startsWith("“");

  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));
</script>

<div class="wall">
  {#if show !== "owners"}
  {#each press as item}
    <a class="card" href={item.url} target="_blank" rel="noopener">
      <div class="head">
        <img class="logo" src={item.logo} alt="Logo of {item.outlet}" />
        {#if item.video}
          <span class="outlet">{item.outlet}</span>
          <span class="source-icon" aria-hidden="true">{@html PlayIcon}</span>
        {/if}
      </div>
      <p class="quote" class:quoted={quoted(item.quote)}>{item.quote}</p>
      <span class="foot">
        {item.video ? "watch" : "read"}
        <span class="arrow" aria-hidden="true">{@html ArrowRight}</span>
      </span>
    </a>
  {/each}
  {/if}

  {#if show !== "press"}
  {#each tweets as thread}
    {@const last = thread[thread.length - 1]}
    <a
      class="card"
      class:thread={thread.length > 1}
      href="https://x.com/{last.handle}/status/{last.id}"
      target="_blank"
      rel="noopener"
    >
      {#if thread[0].video}
        <div class="frame">
          <video
            src="{VIDEO_BASE}/{videoFor(thread[0])}.mp4"
            poster={posterFor(thread[0])}
            autoplay
            muted
            loop
            playsinline
          ></video>
          <span class="dur">{thread[0].duration}</span>
        </div>
      {/if}

      {#each thread as post, i}
        <div class="post" class:reply={i > 0}>
          <div class="head">
            <img class="avatar" src={avatarFor(post.handle)} alt="" loading="lazy" />
            <span class="who">
              <span class="name">{post.name}</span>
              <span class="meta">@{post.handle}</span>
            </span>
            {#if i === 0}
              <span class="source-icon" aria-hidden="true">{@html XIcon}</span>
            {/if}
          </div>
          <p class="body">{#each segment(post.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
        </div>
      {/each}

      <span class="foot date">{last.timestamp}</span>
    </a>
  {/each}
  {/if}
</div>

<style>
  .wall {
    --card-bg: var(--color-card-background);
    --card-border: #000;
    --card-text: #121212;
    --card-meta: #00000080;
    --card-hover: var(--color-card-background-hover);
    --card-rule: #d0d2d4;

    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .card {
    box-sizing: border-box;
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    color: var(--card-text);
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    overflow: hidden;
    padding: 1.5rem;
    transition: background-color 0.2s;
  }

  .frame {
    position: relative;
    margin: -1.5rem -1.5rem 0.375rem;
    aspect-ratio: 16 / 9;
    background: #000;
    overflow: hidden;
  }

  /* exact fit has black border at some zooms */
  .frame video {
    position: absolute;
    top: -1px;
    left: -1px;
    display: block;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
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

  /* brightness(0) rather than grayscale, which only makes the marks gray */
  .logo {
    display: block;
    filter: brightness(0);
    height: 1.5rem;
    object-fit: contain;
    object-position: left;
    width: auto;
  }

  .outlet {
    color: #000;
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: normal;
    white-space: nowrap;
  }

  .avatar {
    background-color: var(--card-hover);
    border: 1px solid var(--card-rule);
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    flex: 0 0 2.25rem;
    height: 2.25rem;
    width: 2.25rem;
    object-fit: cover;
  }

  /* the img is wrapped in a picture, so the wrapper is the flex item */
  .head :global(picture) {
    flex: none;
  }

  .who {
    display: flex;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
  }

  .name {
    color: var(--card-text);
    font-weight: 700;
    letter-spacing: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .meta {
    color: var(--card-meta);
    font-size: 0.875rem;
    letter-spacing: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .source-icon {
    display: flex;
    margin-left: auto;
    opacity: 0.35;
    transition: opacity 0.2s;
  }

  .quote {
    margin: 0;
  }

  .quoted {
    font-style: italic;
  }

  .post {
    position: relative;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
  }

  .reply {
    padding-top: 0.875rem;
  }

  /* indented to leave a gutter for the line running down to the reply's picture */
  .thread .post:first-child .body {
    padding-left: 3rem;
  }

  .thread .post:first-child::after {
    content: "";
    position: absolute;
    left: 1.0625rem;
    top: 2.625rem;
    bottom: -1.75rem;
    width: 2px;
    background: var(--card-rule);
  }

  .body {
    margin: 0;
    white-space: pre-line;
  }

  .mention {
    color: inherit;
    font-weight: 700;
  }

  .foot {
    align-items: center;
    color: var(--card-meta);
    display: flex;
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    gap: 0.4rem;
    letter-spacing: normal;
    margin-top: auto;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .date {
    font-size: 0.75rem;
  }

  /* app.css colors every span, so this has to take the foot's color back */
  .arrow {
    color: inherit;
  }

  .arrow :global(svg) {
    display: block;
    height: auto;
    width: 0.875rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      background-color: var(--card-hover);
    }

    .card:hover .foot {
      color: var(--card-text);
    }

    .card:hover .source-icon {
      opacity: 1;
    }
  }

  .card:active {
    background-color: var(--card-hover);
  }

  @media screen and (max-width: 1200px) {
    .wall {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 768px) {
    .wall {
      gap: 1rem;
    }

    .card {
      padding: 1.25rem;
    }

    .frame {
      margin: -1.25rem -1.25rem 0.375rem;
    }
  }

  @media screen and (max-width: 599px) {
    .wall {
      grid-template-columns: 1fr;
    }
  }
</style>
