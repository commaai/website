<script>
  const beats = [
    {
      beat: "you get on the highway and press set",
      detail: "your hands come off the wheel. they stay off, for the whole drive.",
    },
    {
      beat: "traffic stacks up",
      detail: "it slows down, comes to a stop, and pulls away again with everybody else.",
    },
    {
      beat: "construction, and the lines vanish under fresh asphalt",
      detail: "it keeps driving. it never needed the lines in the first place.",
    },
    {
      beat: "you flip the blinker and nudge the wheel",
      detail: "it moves over a lane, then settles back into the middle.",
    },
    {
      beat: "the sun goes down and it starts raining",
      detail: "nothing changes. it learned to drive in this too.",
    },
    {
      beat: "you get off at your exit onto a two lane road",
      detail: "still driving. this is the part where your car would have handed it back.",
    },
    {
      beat: "you pull into the driveway two hours later",
      detail: "and you're not wiped out. that's the whole thing, really.",
    },
  ];
</script>

<section class="light" id="drive">
  <div class="container">
    <h1>what a drive actually looks like</h1>

    <ol class="beats">
      {#each beats as item, index}
        <li>
          <span class="num">{String(index + 1).padStart(2, "0")}</span>
          <span class="copy">
            <span class="beat">{item.beat}</span>
            <span class="detail">{item.detail}</span>
          </span>
        </li>
      {/each}
    </ol>

    <p class="foot">
      openpilot does the steering, the gas and the brake. you watch the road, and the camera
      pointed at you makes sure of it.
    </p>
  </div>
</section>

<style>
  #drive {
    padding-block: 5rem;
  }

  h1 {
    font-size: clamp(2.3rem, 4vw, 4rem);
    margin-bottom: 3rem;
  }

  .beats {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    align-items: baseline;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    display: grid;
    gap: 0 2rem;
    grid-template-columns: 3.5rem minmax(0, 1fr);
    padding: 1.75rem 0;
  }

  .num {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    letter-spacing: normal;
  }

  .copy {
    display: flex;
    flex-flow: column;
    gap: 0.375rem;
    max-width: 46rem;
  }

  .beat {
    font-size: clamp(1.375rem, 2.6vw, 2.25rem);
    font-weight: 500;
    line-height: 1.1;
  }

  .detail {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.3;
    opacity: 0.55;
  }

  .foot {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.3;
    margin: 3rem 0 0;
    max-width: 36rem;
    opacity: 0.55;
  }

  @media screen and (max-width: 768px) {
    #drive {
      padding-block: 1.25rem;
    }

    #drive > .container {
      width: calc(100% - 2.5rem);
    }

    h1 {
      margin-bottom: 2rem;
    }

    li {
      gap: 0 1rem;
      grid-template-columns: 2rem minmax(0, 1fr);
      padding: 1.25rem 0;
    }

    .num {
      font-size: 0.75rem;
    }

    .foot {
      margin-top: 2rem;
    }
  }
</style>
