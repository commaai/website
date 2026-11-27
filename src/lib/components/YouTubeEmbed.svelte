<script>
  import { tick } from "svelte";

  // A YouTube video that costs one thumbnail until it's played: the player (about 1MB of
  // YouTube scripts) loads only after a click. Fills its parent, which sets the 16:9 box.
  export let id;
  export let title;
  // "maxresdefault" (1280x720) is not generated for every upload; "hqdefault" always is
  export let thumbnail = "hqdefault";
  // "high" when the video is the first thing on the page
  export let priority = "auto";

  let playing = false;
  let iframe;

  // keep keyboard focus on the video when the thumbnail button is swapped for the player
  async function play() {
    playing = true;
    await tick();
    iframe?.focus();
  }

  // a single expression: scripts/optimize-image-preprocessor.js reads only the first part of src
  $: thumbnailSrc = `https://i.ytimg.com/vi_webp/${id}/${thumbnail}.webp`;
</script>

{#if playing}
  <iframe
    bind:this={iframe}
    class="youtube"
    src="https://www.youtube.com/embed/{id}?rel=0&controls=1&autoplay=1"
    {title}
    frameborder="0"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowfullscreen
  ></iframe>
{:else}
  <button
    class="youtube"
    type="button"
    aria-label="Play video: {title}"
    on:click={play}
  >
    <img
      src={thumbnailSrc}
      alt=""
      width="1280"
      height="720"
      fetchpriority={priority}
    />
    <svg class="play" viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
      <path d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6C4 2.3 2.3 4.8 1.5 7.7.1 13 0 24 0 24s.1 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24s-.1-11-1.5-16.3z" fill="#f00" />
      <path d="M45 24 27 14v20" fill="#fff" />
    </svg>
  </button>
{/if}

<style>
  .youtube {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  button.youtube {
    display: block;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: #000;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* centred on its own: the image preprocessor wraps <img> in a <picture>, so the button
     can't lay out its children as a single-cell grid */
  .play {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    opacity: 0.85;
    transition: opacity 0.2s;
  }

  button.youtube:hover .play,
  button.youtube:focus-visible .play {
    opacity: 1;
  }

  button.youtube:focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: -3px;
  }
</style>
