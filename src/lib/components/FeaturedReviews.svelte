<script>
  const reviews = [
    {
      quote: "I'll never own a car that doesn't support the Comma again…it's that good.",
      highlight: "it's that good",
      name: "ceaton12",
      car: "2024 Ford Mustang Mach-E",
      href: "https://www.reddit.com/r/Comma_ai/comments/1r0lv9v/comment/o4uofmc/",
    },
    {
      quote: "This is a game changer… I drove it about 150 miles yesterday… and it was perfect.",
      highlight: "perfect",
      name: "CDC_73",
      car: "2023 Rivian R1T Quad",
      href: "https://www.rivianforums.com/forum/threads/comma-ai-owner-demo-drive-connect-thread.54059/post-920551",
    },
    {
      quote: "It's completely transformed driving for me.",
      highlight: "completely transformed",
      name: "jirlboss",
      car: "2023 Volkswagen ID.3",
      href: "https://www.reddit.com/r/Comma_ai/comments/1s36mbp/i_finally_have_a_comma/",
    },
    {
      quote: "My wife and I share a Comma 4, and it's been a total game changer.",
      highlight: "game changer",
      name: "SnooKiwis1688",
      car: "2019 Mazda6",
      href: "https://www.reddit.com/r/Comma_ai/comments/1s79tao/sharing_a_comma_4_between_two_vehicles_mazda_and/",
    },
    {
      quote: "Wow! It really shines on the highway.",
      highlight: "shines on the highway",
      name: "fwilljr",
      car: "2021 Honda CR-V",
      href: "https://www.reddit.com/r/Comma_ai/comments/1pnqac4/comment/o5lhdzy/",
    },
    {
      quote: "I basically drove all the way across Texas with mine without touching my steering wheel.",
      highlight: "without touching my steering wheel",
      name: "gcurtis24",
      car: "Toyota RAV4 XSE Hybrid",
      href: "https://www.reddit.com/r/rav4club/comments/1t5trun/rav4_20192025_comma_4/",
    },
  ];

  function quoteParts(quote, highlight) {
    const index = quote.indexOf(highlight);
    if (index === -1) return [{ text: quote }];

    return [
      { text: quote.slice(0, index) },
      { text: highlight, highlight: true },
      { text: quote.slice(index + highlight.length) },
    ].filter((part) => part.text);
  }
</script>

<div class="featured-reviews">
  <span>❤️ from our community</span>
  <div class="reviews">
    {#each reviews as review}
      <a class="review" href={review.href} target="_blank" rel="noreferrer">
        <blockquote>
          {#each quoteParts(review.quote, review.highlight) as part}
            {#if part.highlight}<span class="highlight">{part.text}</span>{:else}{part.text}{/if}
          {/each}
        </blockquote>
        <cite>
          <span>{review.name}</span>
          <span>{review.car}</span>
        </cite>
      </a>
    {/each}
  </div>
</div>

<style>
  .featured-reviews {
    margin: 0 0 5rem;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    .featured-reviews {
      margin: 0 0 2.5rem;
    }
  }

  .featured-reviews > span {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 1.5rem;
    opacity: 0.65;
    display: block;
    text-align: center;
  }

  .reviews {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    width: 100%;
  }

  .review {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0;
    padding: 1.5rem;
    color: white;
    min-width: 0;
    text-decoration: none;
    transition: background-color 0.2s;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: rgba(255, 255, 255, 0.06);
      }
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.06);
    }
  }

  blockquote {
    border: none;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.04em;
    line-height: 1.25;
    margin: 0;
    padding: 0;
    color: inherit;
  }

  blockquote::before {
    content: "“";
    display: block;
    font-size: 4rem;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 0.8;
    margin-bottom: 0.2rem;
  }

  cite {
    display: block;
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.3;
    margin-top: 1.5rem;
  }

  cite span:last-child {
    color: var(--color-muted);
  }

  cite span:last-child::before {
    content: " · ";
    color: var(--color-muted);
  }

  @media screen and (max-width: 1024px) {
    .reviews {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 768px) {
    .reviews {
      grid-template-columns: minmax(0, 1fr);
    }

    blockquote {
      font-size: 1rem;
    }
  }
</style>
