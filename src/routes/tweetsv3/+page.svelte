<script>
  import { tweets } from "$lib/constants/social-proof.js";
  import VideoCard from "./VideoCard.svelte";
  import TextCard from "./TextCard.svelte";

  // Real video posts. duration is the full clip on X — we'd loop a trimmed cut, not all of it.
  const VIDEOS = {
    rain: {
      clip: "rain",
      id: "2056852397578658244",
      author: "gerrylum2",
      name: "Gerry Valentine",
      timestamp: "May 19, 2026",
      poster: "gerrylum2-rain",
      aspect: "16 / 9",
      duration: "1:04",
      device: "comma four",
      body: "Rainy days hit different when @comma_ai Openpilot is doing the work. Just vibing, watching the rain, sipping coffee while it handles the road like a champ.",
    },
    miles: {
      clip: "miles",
      id: "2082165228184522857",
      author: "ANSR42",
      name: "Mike LaBarbera",
      timestamp: "Jul 28, 2026",
      poster: "ANSR42-miles",
      aspect: "16 / 9",
      duration: "0:37",
      device: "comma four",
      body: "Total comma four engagement has passed 9,000 miles now. Hands-free through beautiful rural Wisconsin backroads. My @comma_ai device engagement has come close to 93% since I installed it back in February.",
    },
    ui: {
      clip: "ui",
      id: "1987320767185625568",
      author: "gerrylum2",
      name: "Gerry Valentine",
      timestamp: "Nov 8, 2025",
      poster: "gerrylum2-ui",
      aspect: "16 / 9",
      duration: "0:39",
      device: "comma four",
      body: "Using the interface on the new Comma 4 from @comma_ai",
    },
    arches: {
      clip: "arches",
      id: "2067378850716336354",
      author: "TopherScottJ",
      name: "Topher Scott",
      timestamp: "Jun 17, 2026",
      poster: "TopherScottJ-arches",
      aspect: "2 / 1",
      duration: "0:59",
      device: "sped up 5x",
      body: "Letting @comma_ai drive us through Arches National Park! (Speed increased 5x)",
    },
  };

  const VARIANTS = [
    { n: 1, title: "Two wide, text below", note: "Both videos span two columns on the top row, the six text cards fill in beneath. The size difference is paid for by the video." },
    { n: 2, title: "One hero, text beside", note: "A single clip takes a 2x2 block with text cards stacked next to it. One focal point, and only one video to clear rights on." },
    { n: 3, title: "Video band, text band", note: "Videos get their own row across the top, text sits underneath as a separate register. Reads as two sections rather than one mixed grid." },
    { n: 4, title: "No size difference", note: "Videos sized exactly like the text cards. Tests whether the clips need a bigger slot at all, or whether motion alone is enough to draw the eye." },
  ];
</script>

<svelte:head><title>Tweets with video — variants</title></svelte:head>

<section class="dark">
  <div class="container">
    <h1>Tweets with video</h1>
    <p class="intro">
      Four ways to mix video posts into the wall. The clips are real, trimmed to ten
      seconds and muted — they loop while on screen and pause when they scroll off.
      Text cards are the six live on the homepage now.
    </p>

    <div class="notes">
      <strong>Clips in play</strong>
      <ul>
        {#each Object.values(VIDEOS) as v}
          <li>
            <a href="https://x.com/{v.author}/status/{v.id}" target="_blank" rel="noopener">@{v.author}</a>
            &middot; {v.duration} &middot; {v.aspect.replace(" / ", ":")} &middot; {v.device}
          </li>
        {/each}
      </ul>
    </div>

    {#each VARIANTS as v}
      <div class="variant">
        <header>
          <span class="n">{v.n}</span>
          <div>
            <h2>{v.title}</h2>
            <p>{v.note}</p>
          </div>
        </header>

        {#if v.n === 1}
          <div class="wall">
            <div class="wide"><VideoCard video={VIDEOS.rain} /></div>
            <div class="wide"><VideoCard video={VIDEOS.miles} /></div>
            {#each tweets as t}<div><TextCard tweet={t} /></div>{/each}
          </div>

        {:else if v.n === 2}
          <div class="wall">
            <div class="hero"><VideoCard video={VIDEOS.rain} /></div>
            {#each tweets.slice(0, 4) as t}<div><TextCard tweet={t} /></div>{/each}
          </div>

        {:else if v.n === 3}
          <div class="band">
            <div><VideoCard video={VIDEOS.rain} /></div>
            <div><VideoCard video={VIDEOS.miles} /></div>
            <div><VideoCard video={VIDEOS.arches} /></div>
          </div>
          <div class="band">
            {#each tweets.slice(0, 3) as t}<div><TextCard tweet={t} /></div>{/each}
          </div>

        {:else}
          <div class="band">
            <div><VideoCard video={VIDEOS.rain} /></div>
            <div><VideoCard video={VIDEOS.arches} /></div>
            {#each tweets.slice(0, 4) as t}<div><TextCard tweet={t} /></div>{/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  h1 {
    margin-bottom: 1rem;
  }

  .intro {
    max-width: 46rem;
    font-size: 1.125rem;
    line-height: 1.4;
  }

  .notes {
    margin: 2rem 0 1rem;
    padding: 1.25rem 1.5rem;
    background: #0d0d0d;
    border: 1px solid #262626;
  }

  .notes strong {
    color: #fff;
  }

  .notes ul {
    margin: 0.5rem 0 0;
    padding-left: 1.1rem;
  }

  .notes li {
    color: var(--color-muted);
    font-size: 0.875rem;
    margin-bottom: 0.2rem;
  }

  .variant {
    margin: 3.5rem 0;
  }

  header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
    margin-bottom: 1.25rem;
  }

  .n {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    color: #000;
    font-size: 0.875rem;
    font-weight: 700;
    background: var(--color-accent);
  }

  h2 {
    margin: 0;
    color: #fff;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.75rem;
  }

  header p {
    margin: 0.25rem 0 0;
    max-width: 46rem;
    font-size: 0.875rem;
    line-height: 1.35;
    color: var(--color-muted);
  }

  .wall {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
    align-items: stretch;
  }

  .band {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
    align-items: stretch;
    margin-bottom: 1.25rem;
  }

  .wide {
    grid-column: span 2;
  }

  .hero {
    grid-column: span 2;
    grid-row: span 2;
  }

  .tall {
    grid-row: span 2;
  }

  @media screen and (max-width: 1200px) {
    .wall,
    .band {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 768px) {
    .wall,
    .band {
      grid-template-columns: 1fr;
    }

    .wide,
    .hero,
    .tall {
      grid-column: auto;
      grid-row: auto;
    }
  }
</style>
