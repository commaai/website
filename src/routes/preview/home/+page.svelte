<script>
  const variants = [
    {
      href: "/preview/home/01",
      name: "01 — my car already has that",
      strategy: "meets the objection head on with a side by side against factory lane keeping",
      section: "“but my car already has that”",
    },
    {
      href: "/preview/home/02",
      name: "02 — what a drive looks like",
      strategy: "walks through one drive, beat by beat, and ends on arriving less tired",
      section: "what a drive actually looks like",
    },
    {
      href: "/preview/home/03",
      name: "03 — it learned from people",
      strategy: "explains the end to end model in plain words: a rulebook versus watching people",
      section: "nobody told it how to drive",
    },
    {
      href: "/preview/home/04",
      name: "04 — more than driving",
      strategy: "surfaces the phone half: live cameras, location, recordings, clips",
      section: "half of what you get isn't driving",
    },
    {
      href: "/preview/home/05",
      name: "05 — the questions",
      strategy: "blunt Q&A in the voice we use on X, placed just before the testimonials",
      section: "the questions everyone asks",
    },
  ];
</script>

<section class="light">
  <div class="container">
    <h1>home page variants</h1>
    <p class="lede">
      every variant keeps the hero, the setup section, the map, the testimonials and the closing
      cta. what changes is the meet comma four copy, the four feature callouts, and one new
      section that argues the product.
    </p>

    <ul>
      {#each variants as variant}
        <li>
          <a href={variant.href}>
            <span class="name">{variant.name}</span>
            <span class="strategy">{variant.strategy}</span>
            <span class="section">new section: {variant.section}</span>
          </a>
        </li>
      {/each}
    </ul>

    <p class="foot">
      <a class="highlight" href="/">the current home page</a>
    </p>
  </div>
</section>

<style>
  section {
    padding-block: 5rem;
  }

  .lede {
    font-size: 1.25rem;
    line-height: 1.3;
    margin: 0 0 3rem;
    max-width: 44rem;
    opacity: 0.6;
  }

  ul {
    display: grid;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    border: 1px solid #000;
    display: flex;
    flex-flow: column;
    gap: 0.375rem;
    padding: 1.5rem;
    transition: background-color 0.2s;
  }

  .name {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .strategy {
    opacity: 0.6;
  }

  .section {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    letter-spacing: normal;
  }

  .foot {
    margin-top: 3rem;
  }

  @media (hover: hover) and (pointer: fine) {
    a:hover {
      background-color: var(--color-card-background-hover);
    }
  }
</style>
