<script>
  import ArrowRight from "$lib/icons/arrow-right.svg?raw";
  import { reviews, reviewSummary, reviewsUrl } from "$lib/constants/social-proof.js";

  const stars = [1, 2, 3, 4, 5];
</script>

<div class="reviews">
  <div class="summary">
    <span class="score">{reviewSummary.rating.toFixed(1)}</span>
    <div class="score-meta">
      <span class="stars" aria-label="{reviewSummary.rating} out of 5">
        {#each stars as star}
          <span class="star" class:filled={star <= Math.round(reviewSummary.rating)} aria-hidden="true">★</span>
        {/each}
      </span>
      <span class="count">{reviewSummary.count} verified buyer ratings</span>
    </div>
    <a class="all-reviews" href={reviewsUrl} target="_blank" rel="noopener">
      <span>read every review</span>
      <span class="arrow" aria-hidden="true">{@html ArrowRight}</span>
    </a>
  </div>

  <div class="cards">
    {#each reviews as review}
      <figure class="review">
        <span class="stars" aria-label="5 out of 5">
          {#each stars as star}
            <span class="star filled" aria-hidden="true">★</span>
          {/each}
        </span>
        <blockquote>{review.body}</blockquote>
        <figcaption>
          <span class="author">{review.author}</span>
          <span class="date">{review.timestamp}</span>
        </figcaption>
      </figure>
    {/each}
  </div>
</div>

<style>
  .reviews {
    display: grid;
    grid-template-columns: 20rem minmax(0, 1fr);
    gap: 4rem;
  }

  .summary {
    align-self: start;
    display: flex;
    flex-flow: column;
    align-items: start;
    position: sticky;
    top: 6rem;
  }

  .score {
    font-size: 7rem;
    font-weight: 600;
    letter-spacing: -0.05em;
    line-height: 0.85;
  }

  .score-meta {
    display: flex;
    flex-flow: column;
    gap: 0.35rem;
    margin-top: 1.25rem;
  }

  .count {
    color: var(--color-muted);
    font-size: 1rem;
  }

  .stars {
    display: flex;
    gap: 0.15rem;
    font-size: 1.1rem;
    line-height: 1;
  }

  .star {
    color: var(--color-muted);
    opacity: 0.35;
  }

  /* accent green washes out on the light section — full-contrast foreground reads better */
  .star.filled {
    color: var(--color-foreground);
    opacity: 1;
  }

  .all-reviews {
    align-items: center;
    border-bottom: 1px solid var(--color-foreground);
    display: inline-flex;
    gap: 0.5rem;
    margin-top: 2rem;
    padding-bottom: 0.25rem;

    & .arrow {
      display: flex;
      transition: transform 0.2s;
    }

    & .arrow :global(svg) {
      height: 0.85rem;
      width: 0.85rem;
    }

    & .arrow :global(path) {
      fill: currentColor;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover .arrow {
        transform: translateX(0.25rem);
      }
    }
  }

  /* masonry-ish columns so the short reviews don't leave dead space */
  .cards {
    column-count: 2;
    column-gap: 1.25rem;
  }

  /* same card treatment as the /vehicles cards, minus the hover — nothing to click */
  .review {
    background-color: var(--color-card-background);
    border: 1px solid rgba(0, 0, 0, 0.4);
    break-inside: avoid;
    display: flex;
    flex-flow: column;
    gap: 1rem;
    margin: 0 0 1.25rem;
    padding: 1.75rem;
  }

  blockquote {
    border: none;
    font-size: 1.0625rem;
    font-style: normal;
    line-height: 1.45;
    margin: 0;
    padding: 0;
  }

  figcaption {
    align-items: baseline;
    display: flex;
    gap: 0.75rem;
  }

  .author {
    font-weight: 500;
  }

  .date {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
  }

  @media screen and (max-width: 1024px) {
    .reviews {
      gap: 2.5rem;
      grid-template-columns: minmax(0, 1fr);
    }

    .summary {
      position: static;
    }

    .score {
      font-size: 5rem;
    }
  }

  @media screen and (max-width: 768px) {
    .cards {
      column-count: 1;
    }
  }
</style>
