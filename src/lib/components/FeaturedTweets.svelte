<script>
  import XIcon from "$lib/icons/social/x.svg?raw";
  import { tweets, videoTweets, threadTweet } from "$lib/constants/social-proof.js";

  // profile pictures, named by handle — see scripts/update-tweet-avatars.sh
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

  const byHandle = (handle) => tweets.find((tweet) => tweet.author === handle);
  const quotes = [threadTweet, byHandle("tessadotsh"), byHandle("LivingInKaos")];

  // only the clips on screen decode
  function playWhenVisible(node) {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }

  // @handles become links; everything else renders as plain text
  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));
</script>

<div class="tweet-wall">
  {#each videoTweets as tweet}
    <a
      class="tweet video"
      href="https://x.com/{tweet.author}/status/{tweet.id}"
      target="_blank"
      rel="noopener"
    >
      <div class="frame">
        <video
          use:playWhenVisible
          src="/videos/tweets/{tweet.clip}.mp4"
          poster={posterFor(tweet.poster)}
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        ></video>
        <span class="dur">{tweet.duration}</span>
      </div>

      <div class="meta">
        <div class="head">
          {#if avatarFor(tweet.author)}
            <img class="avatar" src={avatarFor(tweet.author)} alt="" width="36" height="36" loading="lazy" />
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
      </div>
    </a>
  {/each}

  {#each quotes as tweet}
    {@const top = tweet.answers ?? tweet}
    <a
      class="tweet"
      class:thread={tweet.answers}
      href="https://x.com/{tweet.author}/status/{tweet.id}"
      target="_blank"
      rel="noopener"
    >
      <div class="post">
        <div class="head">
          {#if avatarFor(top.author)}
            <img
              class="avatar"
              src={avatarFor(top.author)}
              alt=""
              width="36"
              height="36"
              loading="lazy"
            />
          {:else}
            <span class="avatar initial" aria-hidden="true">{top.author[0].toUpperCase()}</span>
          {/if}
          <span class="who">
            {#if top.name}<span class="name">{top.name}</span>{/if}
            <span class="handle">@{top.author}</span>
          </span>
          <span class="mark" aria-hidden="true">{@html XIcon}</span>
        </div>
        <p class="body">{#each segment(top.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
      </div>

      {#if tweet.answers}
        <div class="post reply">
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
              <span class="name">{tweet.name}</span>
              <span class="handle">@{tweet.author}</span>
            </span>
          </div>
          <p class="body">{#each segment(tweet.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
        </div>
      {/if}

      <span class="date">{tweet.timestamp}</span>
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

  .tweet.video {
    padding: 0;
    gap: 0;
  }

  .frame {
    position: relative;
    aspect-ratio: 16 / 9;
    background: #000;
    overflow: hidden;
  }

  /* overhangs a pixel each side — an exact fit rounds short of the frame at some zooms */
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

  .meta {
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.875rem;
    padding: 1.25rem 1.5rem 1.5rem;
  }

  .tweet {
    box-sizing: border-box; /* no global border-box reset in app.css */
    background-color: #0d0d0d;
    border: 2px solid #262626;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .tweet:hover {
      border-color: var(--color-accent);
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
  }

</style>
