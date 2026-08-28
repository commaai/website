<script>
  import XIcon from "$lib/icons/social/x.svg?raw";

  export let video;

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

  let el;
  let playing = false;

  // Only the clips actually on screen decode, so a wall of them costs one video's worth
  function watch(node) {
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

  // Autoplay is refused on some setups (low power mode, reduced motion) — let a tap start it
  function toggle(event) {
    if (playing) return;
    event.preventDefault();
    el?.play().catch(() => {});
  }
</script>

<a
  class="tweet"
  href="https://x.com/{video.author}/status/{video.id}"
  target="_blank"
  rel="noopener"
>
  <div class="frame" style="aspect-ratio: {video.aspect}">
    <video
      bind:this={el}
      use:watch
      src="/videos/tweets/{video.clip}.mp4"
      poster={posterFor(video.poster)}
      muted
      loop
      playsinline
      preload="none"
      on:playing={() => (playing = true)}
      on:pause={() => (playing = false)}
      on:click={toggle}
    ></video>
    {#if !playing}
      <span class="play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    {/if}
    <span class="dur">{video.duration}</span>
  </div>

  <div class="meta">
    <div class="head">
      {#if avatarFor(video.author)}
        <img class="avatar" src={avatarFor(video.author)} alt="" width="36" height="36" loading="lazy" />
      {:else}
        <span class="avatar initial" aria-hidden="true">{video.author[0].toUpperCase()}</span>
      {/if}
      <span class="who">
        <span class="name">{video.name}</span>
        <span class="handle">@{video.author}</span>
      </span>
      <span class="mark" aria-hidden="true">{@html XIcon}</span>
    </div>
    <p class="body">{#each segment(video.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
    <span class="date">{video.timestamp}</span>
  </div>
</a>

<style>
  .tweet {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: #0d0d0d;
    border: 1px solid #262626;
    overflow: hidden;
    transition:
      background-color 0.2s ease,
      box-shadow 0.16s ease-out,
      transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .tweet:hover {
      background-color: #131313;
      box-shadow: 5px 5px 0 var(--color-accent);
      transform: translate(-6px, -6px);
      z-index: 1;
    }

    .tweet:hover .play {
      background: var(--color-accent);
    }
  }

  .frame {
    position: relative;
    background: #000;
    overflow: hidden;
  }

  .frame video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    color: #000;
    background: rgba(255, 255, 255, 0.92);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.2s ease;
  }

  .play svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 2px;
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
</style>
