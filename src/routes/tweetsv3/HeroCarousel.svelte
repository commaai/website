<script>
  import XIcon from "$lib/icons/social/x.svg?raw";

  export let videos;

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

  let index = 0;
  let videoEl;
  let paused = true;
  let started = false;
  let lifted = false;

  $: current = videos[index];

  function togglePlay() {
    if (!videoEl) return;
    if (videoEl.paused) videoEl.play().catch(() => {});
    else videoEl.pause();
  }

  function go(to) {
    index = (to + videos.length) % videos.length;
  }

  // Each clip hands off to the next when it runs out, so the hero is never static
  function onEnded() {
    go(index + 1);
  }

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
</script>

<div class="tweet" class:lifted>
  <div class="frame" style="aspect-ratio: {current.aspect}">
    <!-- keyed so each clip gets a fresh element, rather than reloading one mid-swap -->
    {#key current.clip}
      <video
        bind:this={videoEl}
        use:watch
        src="/videos/tweets/{current.clip}.mp4"
        poster={posterFor(current.poster)}
        autoplay
        muted
        playsinline
        preload="metadata"
        on:ended={onEnded}
        on:click={togglePlay}
        on:play={() => ((paused = false), (started = true))}
        on:pause={() => (paused = true)}
      ></video>
    {/key}

    <!-- a paused marker, not a control surface: it only appears once something has been paused -->
    <button
      class="toggle"
      class:showing={paused && started}
      on:click={togglePlay}
      aria-label={paused ? "Play" : "Pause"}
    >
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
    </button>

    <button class="nav prev" on:click={() => go(index - 1)} aria-label="Previous clip">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button class="nav next" on:click={() => go(index + 1)} aria-label="Next clip">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div class="dots">
      {#each videos as v, i}
        <button
          class="dot"
          class:on={i === index}
          on:click={() => go(i)}
          aria-label="Clip {i + 1}"
        ></button>
      {/each}
    </div>

    <span class="dur">{current.duration}</span>
  </div>

  <!-- the frame owns play/pause, so the tweet link lives on everything below it -->
  <a
    class="meta"
    href="https://x.com/{current.author}/status/{current.id}"
    target="_blank"
    rel="noopener"
    on:mouseenter={() => (lifted = true)}
    on:mouseleave={() => (lifted = false)}
  >
    <div class="head">
      {#if avatarFor(current.author)}
        <img class="avatar" src={avatarFor(current.author)} alt="" width="36" height="36" />
      {:else}
        <span class="avatar initial" aria-hidden="true">{current.author[0].toUpperCase()}</span>
      {/if}
      <span class="who">
        <span class="name">{current.name}</span>
        <span class="handle">@{current.author}</span>
      </span>
      <span class="mark" aria-hidden="true">{@html XIcon}</span>
    </div>
    <p class="body">{#each segment(current.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
    <span class="date">{current.timestamp}</span>
  </a>
</div>

<style>
  .tweet {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    position: relative;
    height: 100%;
    background-color: #0d0d0d;
    border: 1px solid #262626;
    box-shadow: 0 0 0 rgba(81, 255, 0, 0);
    transition:
      box-shadow 0.16s ease-out,
      transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  /* only the text below the video arms it, but the whole card moves */
  @media (hover: hover) and (pointer: fine) {
    .tweet.lifted {
      box-shadow: 5px 5px 0 var(--color-accent);
      transform: translate(-6px, -6px);
      z-index: 1;
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

  .nav {
    position: absolute;
    top: 50%;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    color: #fff;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.55);
    border: 0;
    transform: translateY(-50%);
    transition: background-color 0.2s ease;
  }

  .nav:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .nav svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    padding: 0;
    color: #fff;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.55);
    border: 0;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s ease, background-color 0.2s ease;
  }

  .toggle.showing,
  .toggle:focus-visible {
    opacity: 1;
  }

  .toggle:not(.showing) {
    pointer-events: none;
  }

  .toggle:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .toggle svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .prev {
    left: 0.75rem;
  }

  .next {
    right: 0.75rem;
  }

  .dots {
    position: absolute;
    left: 50%;
    bottom: 0.75rem;
    display: flex;
    gap: 0.4rem;
    padding: 0.35rem 0.5rem;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 999px;
    transform: translateX(-50%);
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.4);
    border: 0;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .dot.on {
    background: var(--color-accent);
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
    position: relative;
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.875rem;
    padding: 1.25rem 1.5rem 1.5rem;
    background-color: #0d0d0d;
    transition: background-color 0.2s ease;
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

  @media (hover: hover) and (pointer: fine) {
    .meta:hover {
      background-color: #131313;
    }
  }

  .meta:hover .mark {
    opacity: 1;
  }

  .mark {
    display: flex;
    margin-left: auto;
    opacity: 0.35;
    transition: opacity 0.2s ease;
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
