<script>
  const groups = [
    {
      title: "on the road",
      items: [
        "your hands come off the wheel, and stay off",
        "it keeps driving where the lines are worn out, at night, in the rain",
        "flip the blinker, nudge the wheel, and it moves over a lane",
        "turn on experimental mode and it stops for red lights and stop signs",
      ],
    },
    {
      title: "on your phone",
      items: [
        "see where the car is parked, right now",
        "watch its cameras live while somebody else is driving it",
        "every drive is recorded, so the footage is there when you need it",
        "cut a clip out of any drive and send it to somebody",
      ],
    },
  ];
</script>

<section class="light" id="more">
  <div class="container">
    <h1>half of what you get isn't driving</h1>
    <p class="lede">
      three cameras, a cell connection and a computer live behind your mirror. steering is just
      the part you notice first.
    </p>

    <div class="groups">
      {#each groups as group}
        <div class="group">
          <h2>{group.title}</h2>
          <ul>
            {#each group.items as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <p class="foot">
      driving never needs a subscription. the live camera and the remote check-ins need the car
      to be online, and every comma four comes with a month of comma prime to try it out.
    </p>
  </div>
</section>

<style>
  #more {
    padding-block: 5rem;
  }

  h1 {
    font-size: clamp(2.3rem, 4vw, 4rem);
    margin-bottom: 1.5rem;
  }

  .lede {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    line-height: 1.2;
    margin: 0 0 4rem;
    max-width: 40rem;
    opacity: 0.6;
  }

  .groups {
    display: grid;
    gap: 3rem clamp(3rem, 7vw, 8rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  h2 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    letter-spacing: normal;
    margin: 0 0 1.75rem;
    padding-bottom: 1rem;
    text-transform: uppercase;
  }

  ul {
    display: flex;
    flex-flow: column;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: clamp(1.0625rem, 1.6vw, 1.375rem);
    line-height: 1.25;
    padding-left: 1.75rem;
    position: relative;
  }

  li::before {
    background: var(--color-accent);
    content: "";
    height: 0.5rem;
    left: 0;
    position: absolute;
    top: 0.5em;
    width: 0.75rem;
  }

  .foot {
    font-size: 1rem;
    line-height: 1.3;
    margin: 3.5rem 0 0;
    max-width: 34rem;
    opacity: 0.5;
  }

  @media screen and (max-width: 768px) {
    #more {
      padding-block: 1.25rem;
    }

    #more > .container {
      width: calc(100% - 2.5rem);
    }

    .lede {
      margin-bottom: 2.5rem;
    }

    .groups {
      grid-template-columns: minmax(0, 1fr);
    }

    .foot {
      margin-top: 2.5rem;
    }
  }
</style>
