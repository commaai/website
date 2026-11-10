<script>
  const rows = [
    {
      stock: "makes you tug the wheel every 15 seconds, or it shuts off",
      comma: "a camera watches your eyes instead, so your hands can rest in your lap",
    },
    {
      stock: "follows the painted lines, and gives up when they fade",
      comma: "learned to drive by watching people, so faded lines and no lines are both fine",
    },
    {
      stock: "highway only, and only when the lane is obvious",
      comma: "highways, back roads, construction, traffic, rain, dark",
    },
    {
      stock: "ping-pongs between the lines and straightens out your curves",
      comma: "holds the middle and takes the curve the way you would",
    },
    {
      stock: "exactly the same car five years from now",
      comma: "a new version every couple of months, free, over your wifi",
    },
  ];
</script>

<section class="light" id="difference">
  <div class="container">
    <h1>“but my car already has that”</h1>
    <p class="lede">
      we hear it a lot. lane keeping and cruise control have been on the window sticker for years.
      here is what the sticker doesn't tell you.
    </p>

    <div class="table">
      <div class="heads" aria-hidden="true">
        <span>what came with your car</span>
        <span>what you get with a comma four</span>
      </div>

      {#each rows as row}
        <div class="row">
          <p class="stock">{row.stock}</p>
          <p class="comma">{row.comma}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  #difference {
    padding-block: 5rem;
  }

  h1 {
    font-size: clamp(2.3rem, 4vw, 4rem);
    margin-bottom: 1.5rem;
  }

  .lede {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    line-height: 1.2;
    margin: 0 0 3.5rem;
    max-width: 44rem;
    opacity: 0.6;
  }

  .heads,
  .row {
    display: grid;
    gap: 1rem 4rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .heads {
    padding-bottom: 1rem;

    & span {
      color: var(--color-muted);
      font-family: JetBrains Mono, monospace;
      font-size: 0.8125rem;
      letter-spacing: normal;
      text-transform: uppercase;
    }
  }

  .row {
    align-items: baseline;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    padding: 1.75rem 0;
  }

  .row p {
    font-size: clamp(1.0625rem, 1.6vw, 1.375rem);
    line-height: 1.25;
    margin: 0;
  }

  .stock {
    opacity: 0.45;
  }

  .comma {
    font-weight: 500;
  }

  @media screen and (max-width: 768px) {
    #difference {
      padding-block: 1.25rem;
    }

    #difference > .container {
      width: calc(100% - 2.5rem);
    }

    .lede {
      margin-bottom: 2rem;
    }

    .heads {
      display: none;
    }

    .row {
      gap: 0.5rem;
      grid-template-columns: minmax(0, 1fr);
      padding: 1.25rem 0;
    }

    /* the label has to come back once the columns stack */
    .stock::before,
    .comma::before {
      color: var(--color-muted);
      display: block;
      font-family: JetBrains Mono, monospace;
      font-size: 0.6875rem;
      font-weight: 400;
      letter-spacing: normal;
      margin-bottom: 0.25rem;
      text-transform: uppercase;
    }

    .stock::before {
      content: "your car";
    }

    .comma::before {
      content: "comma four";
    }
  }
</style>
