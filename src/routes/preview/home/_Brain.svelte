<script>
  const stats = [
    { value: "380M+", label: "miles of human driving it learned from" },
    { value: "30,000+", label: "cars still teaching it today" },
    { value: "free", label: "new version every couple of months" },
  ];
</script>

<section class="dark" id="brain">
  <div class="container">
    <div class="split">
      <h1>nobody told it how to drive</h1>

      <div class="body">
        <p>
          the lane keeping in your car is a rulebook. find the left line, find the right line,
          stay in between. when the paint is worn, or wet, or buried under snow, there is nothing
          left for it to follow, so it hands the wheel back to you.
        </p>
        <p>
          openpilot has no rulebook. it watched hundreds of millions of miles of regular people
          driving and picked up how they do it. then it drives that way.
        </p>
        <p class="kicker">
          so it goes straight through an intersection. it takes the curve instead of flattening
          it. it holds the middle of a back road that never had a line painted on it. at night,
          in the rain, on a road you'd call bad, because that is where a lot of those miles came
          from.
        </p>
      </div>
    </div>

    <div class="stats">
      {#each stats as stat}
        <div class="stat">
          <span class="value">{stat.value}</span>
          <span class="label">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  #brain {
    padding-block: 5rem;
  }

  .split {
    column-gap: clamp(3rem, 7vw, 8rem);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  h1 {
    font-size: clamp(2.3rem, 4vw, 4rem);
    margin: 0;
  }

  .body {
    display: flex;
    flex-flow: column;
    gap: 1.5rem;
    max-width: 34rem;
  }

  p {
    color: var(--color-foreground);
    font-size: clamp(1.0625rem, 1.6vw, 1.375rem);
    line-height: 1.35;
    margin: 0;
    opacity: 0.6;
  }

  .kicker {
    opacity: 1;
  }

  .stats {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 4rem;
    padding-top: 2.5rem;
  }

  .stat {
    display: flex;
    flex-flow: column;
    gap: 0.625rem;
  }

  .value {
    font-size: clamp(2rem, 3.5vw, 3rem);
    line-height: 1;
  }

  .label {
    color: var(--color-muted);
    font-size: 1rem;
    line-height: 1.2;
    max-width: 14rem;
  }

  @media screen and (max-width: 900px) {
    .split {
      grid-template-columns: minmax(0, 1fr);
      row-gap: 1.5rem;
    }

    .body {
      max-width: none;
    }

    .stats {
      grid-template-columns: minmax(0, 1fr);
      margin-top: 2.5rem;
      padding-top: 1.75rem;
    }

    .stat {
      align-items: baseline;
      display: grid;
      gap: 1rem;
      grid-template-columns: 6rem minmax(0, 1fr);
    }

    .value {
      font-size: 1.75rem;
    }

    .label {
      max-width: none;
    }
  }

  @media screen and (max-width: 768px) {
    #brain {
      padding-block: 1.25rem;
    }

    #brain > .container {
      width: calc(100% - 2.5rem);
    }
  }
</style>
