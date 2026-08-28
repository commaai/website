<script>
  import XIcon from "$lib/icons/social/x.svg?raw";
  import { tweets } from "$lib/constants/tweets.js";

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

  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));
</script>

<div class="tweet-wall">
  {#each tweets as thread}
    {@const last = thread[thread.length - 1]}
    <a
      class="tweet"
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
              <span class="handle">@{post.handle}</span>
            </span>
            {#if i === 0}
              <span class="x-icon" aria-hidden="true">{@html XIcon}</span>
            {/if}
          </div>
          <p class="body">{#each segment(post.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
        </div>
      {/each}

      <span class="date">{last.timestamp}</span>
    </a>
  {/each}
</div>

<style>
  .tweet-wall {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
    margin: 2rem 0;
  }

  @media screen and (max-width: 1200px) {
    .tweet-wall {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
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

  .tweet {
    box-sizing: border-box; /* no global border-box reset in app.css */
    background-color: #0d0d0d;
    border: 2px solid #262626;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .tweet:hover {
      border-color: var(--color-accent);
    }

    .tweet:hover .x-icon {
      opacity: 1;
    }
  }

  .head {
    align-items: center;
    display: flex;
    gap: 0.75rem;
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
    background: #262626;
  }

  /* the img is wrapped in a picture, the wrapper holds the width */
  .head picture {
    flex: 0 0 2.25rem;
  }

  .avatar {
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
    color: #ededed;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .handle {
    color: #8a8a8a;
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
    transition: opacity 0.2s ease;
  }

  .body {
    color: #ededed;
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
    white-space: pre-line;
  }

  .mention {
    color: var(--color-accent);
  }

  .date {
    color: #8a8a8a;
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    margin-top: auto;
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    .tweet-wall {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .tweet {
      padding: 1.25rem;
    }

    .frame {
      margin: -1.25rem -1.25rem 0.375rem;
    }
  }

</style>
