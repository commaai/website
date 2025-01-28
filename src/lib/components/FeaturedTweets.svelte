<script>
  import TwitterCard from "./TwitterCard.svelte";
  import tweets from "$lib/featured-tweets/tweets.json";

  const images = import.meta.glob("$lib/featured-tweets/*.jpg", { eager: true });
</script>

<div class="masonry">
  {#each tweets as tweet}
    <div>
      <TwitterCard
        id={tweet.id}
        authorImage={images[`/src/lib/featured-tweets/${tweet.id}.jpg`].default}
        authorUsername={tweet.author}
        body={tweet.body}
        timestamp={tweet.timestamp}
      />
    </div>
  {/each}
</div>

<style>
  .masonry {
    margin-top: 4rem;

    --masonry-gap: 1rem;
    --masonry-brick-width: 350px;
    column-gap: var(--masonry-gap);
    column-fill: initial;
    column-width: var(--masonry-brick-width);

    @media screen and (max-width: 512px) {
      margin-top: 3rem;
    }
  }

  .masonry > * {
    break-inside: avoid;
    margin-bottom: var(--masonry-gap);
  }

  @supports (grid-template-rows: masonry) {
    .masonry {
      display: grid;
      gap: var(--masonry-gap);
      grid-template-rows: masonry;
      grid-template-columns: repeat(
        auto-fill,
        minmax(var(--masonry-brick-width), 1fr)
      );
      align-tracks: stretch;
    }

    .masonry > * {
      margin-bottom: initial;
    }
  }
</style>
