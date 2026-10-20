<script>
  const questions = [
    {
      q: "my car already has lane keeping.",
      a: "it makes you tug the wheel every 15 seconds and it quits when the lines fade. openpilot watches your eyes instead, and keeps driving when the lines are gone.",
    },
    {
      q: "so i don't have to hold the wheel?",
      a: "no. you do have to watch the road. there's a camera pointed at you that makes sure you are.",
    },
    {
      q: "what about rain, or at night, or a road with no lines?",
      a: "it learned to drive from people driving in exactly that. it doesn't need a perfect road.",
    },
    {
      q: "does it stop at red lights?",
      a: "there's an experimental mode that does. it still gets it wrong sometimes, so it's a switch you flip, not the default.",
    },
    {
      q: "is there a subscription?",
      a: "no. $999 once. the software is free and open source, and a new version shows up every couple of months.",
    },
    {
      q: "will it work on my car?",
      a: "300+ models across 27 brands. it plugs in behind the mirror in about 15 minutes, no cutting anything.",
    },
    {
      q: "and if i hate it?",
      a: "put it back in the box and send it back within 30 days.",
    },
  ];
</script>

<section class="light" id="questions">
  <div class="container">
    <h1>the questions everyone asks</h1>

    <dl>
      {#each questions as item}
        <div class="qa">
          <dt>{item.q}</dt>
          <dd>{item.a}</dd>
        </div>
      {/each}
    </dl>
  </div>
</section>

<style>
  #questions {
    padding-block: 5rem;
  }

  h1 {
    font-size: clamp(2.3rem, 4vw, 4rem);
    margin-bottom: 3rem;
  }

  dl {
    margin: 0;
  }

  .qa {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    display: grid;
    gap: 1rem 4rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 2rem 0;
  }

  dt {
    font-size: clamp(1.375rem, 2.4vw, 2rem);
    font-weight: 500;
    line-height: 1.1;
  }

  dd {
    font-size: clamp(1.0625rem, 1.6vw, 1.375rem);
    line-height: 1.3;
    margin: 0;
    max-width: 32rem;
    opacity: 0.6;
  }

  @media screen and (max-width: 768px) {
    #questions {
      padding-block: 1.25rem;
    }

    #questions > .container {
      width: calc(100% - 2.5rem);
    }

    h1 {
      margin-bottom: 2rem;
    }

    .qa {
      gap: 0.625rem;
      grid-template-columns: minmax(0, 1fr);
      padding: 1.5rem 0;
    }

    dd {
      max-width: none;
    }
  }
</style>
