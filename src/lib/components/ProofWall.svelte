<script>
  import { videos, articles } from "$lib/constants/featured.js";
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
  const clipFor = (post) => `${post.handle}-${post.id}`;
  const posterFor = (post) =>
    posters[`/src/lib/images/tweets/posters/${clipFor(post)}.jpg`]?.img?.src;

  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));

</script>

<div class="wall" class:owners={show === "owners"}>
  {#if show !== "owners"}
  {#each videos as video}
    <a class="card wide media" href={video.url} target="_blank" rel="noopener">
      <div class="frame">
        <img src={video.thumbnail} alt="" loading="lazy" />
        <span class="play" aria-hidden="true">{@html PlayIcon}</span>
        <span class="dur">{video.duration}</span>
      </div>
      <div class="head">
        <img class="logo" src={video.logo} alt="Logo of {video.outlet}" loading="lazy" />
        <span class="meta">{video.outlet}</span>
      </div>
      <p class="title">{video.title}</p>
      <span class="foot">
        watch
        <span class="arrow" aria-hidden="true">{@html ArrowRight}</span>
      </span>
    </a>
  {/each}

  {#each articles as article}
    <a class="card" href={article.url} target="_blank" rel="noopener">
      <div class="head">
        <img class="logo" src={article.logo} alt="Logo of {article.outlet}" loading="lazy" />
      </div>
      <p class="title small">{article.title}</p>
      <span class="foot">
        read the article
        <span class="arrow" aria-hidden="true">{@html ArrowRight}</span>
      </span>
    </a>
    {/each}
  {/if}

  {#if show !== "press"}
  {#each tweets as thread}
    {@const last = thread[thread.length - 1]}
    <a
      class="card tweet"
      class:thread={thread.length > 1}
      class:media={thread[0].video}
      href="https://x.com/{last.handle}/status/{last.id}"
      target="_blank"
      rel="noopener"
    >
      {#if thread[0].video}
        <div class="frame">
          <video
            src="{VIDEO_BASE}/{clipFor(thread[0])}.mp4"
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
              <span class="x-icon" aria-hidden="true">{@html XIcon}</span>
            {/if}
          </div>
          <p class="body">{#each segment(post.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
        </div>
      {/each}

      <span class="foot mono">{last.timestamp}</span>
    </a>
  {/each}
  {/if}
</div>

<style>
  .wall {
    --card-bg: var(--color-card-background);
    --card-border: #000;
    --card-text: #000;
    --card-meta: #00000080;
    --card-hover: var(--color-card-background-hover);
    --card-rule: #d0d2d4;

    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .owners {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

  .wide {
    grid-column: span 2 / span 2;
  }

  .frame {
    position: relative;
    margin: -1.5rem -1.5rem 0.375rem;
    aspect-ratio: 16 / 9;
    background: #000;
    overflow: hidden;
  }

  .frame :global(picture) {
    display: block;
    height: 100%;
  }

  .frame img,
  .frame video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .frame img {
    transition: transform 0.4s ease;
  }

  .play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    opacity: 0.9;
    transition: transform 0.2s ease;
  }

  .play :global(svg) {
    width: 3.5rem;
    height: 3.5rem;
    filter: drop-shadow(0 0 1.5rem rgba(0, 0, 0, 0.6));
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
    min-height: 1.75rem;
  }

  .logo {
    height: 1.625rem;
    width: auto;
    max-width: 9rem;
    object-fit: contain;
    filter: grayscale(100%) brightness(20%);
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

  /* the img is wrapped in a picture, the wrapper holds the width */
  .head :global(picture) {
    flex: 0 0 2.25rem;
  }

  .who {
    display: flex;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
  }

  .name {
    color: var(--card-text);
    font-size: 1rem;
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

  .x-icon {
    display: flex;
    margin-left: auto;
    opacity: 0.35;
    transition: opacity 0.2s;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
  }

  .title.small {
    font-size: 1.25rem;
    line-height: 1.25;
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
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
    white-space: pre-line;
  }

  .mention {
    color: var(--color-accent-hover);
  }

  .foot {
    align-items: center;
    color: var(--card-meta);
    display: flex;
    font-size: 0.875rem;
    gap: 0.5rem;
    letter-spacing: normal;
    margin-top: auto;
    transition: color 0.2s;
  }

  .mono {
    color: var(--card-meta);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
  }

  .arrow :global(svg) {
    display: block;
    height: 0.75rem;
    width: auto;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      background-color: var(--card-hover);
    }

    .card:hover .foot {
      color: var(--card-text);
    }

    .card:hover .frame img {
      transform: scale(1.03);
    }

    .card:hover .play {
      transform: scale(1.08);
    }

    .card:hover .x-icon {
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
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .wide {
      grid-column: span 1 / span 1;
    }

    .card {
      padding: 1.25rem;
    }

    .frame {
      margin: -1.25rem -1.25rem 0.375rem;
    }

    .title {
      font-size: 1.25rem;
    }
  }
</style>
