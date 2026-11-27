<script>
  import { tick } from "svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import EmailUpdatesForm from "$lib/components/EmailUpdates/EmailUpdatesForm.svelte";
  import ReleaseNote from "$lib/components/ReleaseNote.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import { faq } from "$lib/constants/faq.svelte";
  import { vehicleCountText } from "$lib/constants/vehicles.js";
  import vehicles from "$lib/vehicles.json";
  import { playInView, reducedMotion } from "$lib/utils/media.js";
  import DriveDiagram from "./DriveDiagram.svelte";

  import Hero from "./Hero.svelte";

  import WindshieldImage from "$lib/images/products/comma-four/windshield43.png?w=1200";
  import MonitoringVideo from "$lib/images/products/comma-four/driver-monitoring-demo.mp4";

  import RedLightVideo from "$lib/videos/openpilot/red-light-corolla.mp4";
  import RedLightPoster from "$lib/videos/openpilot/red-light-corolla.jpg?format=jpg&as=url";
  import StopSignVideo from "$lib/videos/openpilot/stop-sign-ev6.mp4";
  import StopSignPoster from "$lib/videos/openpilot/stop-sign-ev6.jpg?format=jpg&as=url";
  import NoLanesVideo from "$lib/videos/openpilot/no-lanes-id4.mp4";
  import NoLanesPoster from "$lib/videos/openpilot/no-lanes-id4.jpg?format=jpg&as=url";
  import CurvyVideo from "$lib/videos/openpilot/curvy-crosstrek.mp4";
  import CurvyPoster from "$lib/videos/openpilot/curvy-crosstrek.jpg?format=jpg&as=url";
  import CutInVideo from "$lib/videos/openpilot/cut-in-corolla.mp4";
  import CutInPoster from "$lib/videos/openpilot/cut-in-corolla.jpg?format=jpg&as=url";
  import GolfCartVideo from "$lib/videos/openpilot/golf-cart-id4.mp4";
  import GolfCartPoster from "$lib/videos/openpilot/golf-cart-id4.jpg?format=jpg&as=url";

  export let data;

  // comma's own drives, at real speed (sources in the commit message)
  const clips = [
    {
      src: RedLightVideo,
      poster: RedLightPoster,
      tab: "Red lights",
      title: "Stops for the red. Goes on green.",
      text: "First in line at a red light: openpilot slows to a stop, waits, and pulls away when the light turns green. (We cut most of the wait.)",
      car: "Toyota Corolla",
    },
    {
      src: StopSignVideo,
      poster: StopSignPoster,
      tab: "Stop signs",
      title: "Stops at stop signs.",
      text: "Comes to a stop at the sign, then carries on. There's no stop sign detector in there, just what drivers do at one.",
      car: "Kia EV6",
    },
    {
      src: NoLanesVideo,
      poster: NoLanesPoster,
      tab: "No lane lines",
      title: "No lines, no problem.",
      text: "A narrow alley between parked cars and garages. There's no paint to center between, so openpilot follows the road.",
      car: "Volkswagen ID.4",
    },
    {
      src: CurvyVideo,
      poster: CurvyPoster,
      tab: "Curves",
      title: "Follows the curves.",
      text: "A winding road, taken one bend at a time.",
      car: "Subaru Crosstrek",
    },
    {
      src: CutInVideo,
      poster: CutInPoster,
      tab: "Cut-ins",
      title: "Lets them in.",
      text: "An SUV merges in ahead on the freeway, and openpilot lets it in.",
      car: "Toyota Corolla",
    },
    {
      src: GolfCartVideo,
      poster: GolfCartPoster,
      tab: "Golf carts",
      title: "Golf carts, too.",
      text: "Follows a golf cart up the street at its pace, then carries on once it pulls over.",
      car: "Volkswagen ID.4",
    },
  ];

  const comparison = [
    ["Your set speed", "Holds it.", "Treats it as a maximum, and drives like a human would below it."],
    ["The car ahead", "Keeps a set gap.", "Slows for what a human would slow for: the car ahead, a curve, a red light, a stop sign."],
    ["Lane lines", "Centers between them, when it can see them.", "Follows the road, with or without lane lines."],
    ["Something new", "No rule for it, so it does nothing useful or hands control back.", "Still does what a human driver would plausibly do."],
  ];

  // the same make logos and anchors as /vehicles
  const brandIcons = import.meta.glob("$lib/images/vehicles/brand-icons/*.png", { eager: true, import: "default" });
  const makes = Object.entries(vehicles)
    .filter(([make, cars]) => cars.length > 0 && make !== "comma")
    .map(([make]) => ({ make, logo: brandIcons[`/src/lib/images/vehicles/brand-icons/Logo-${make}.png`] }));

  const layers = [
    { name: "You", text: "Step on the brake and openpilot lets go immediately. Press the gas or turn the wheel and you override it." },
    { name: "Your car's safety systems", text: "AEB, blind spot warning, and the car's other safety features keep working." },
    { name: "Your car's driver assistance interface", text: "The manufacturer's own interface for steering, gas, and brake commands, with the same bounds as the stock system." },
    { name: "openpilot", text: "Decides where to steer and how fast to go, and sends it through that interface." },
  ];

  const stats = [
    ["750+", "Contributors"],
    ["102", "Releases"],
    ["400M+", "Miles driven"],
    ["56%", "Of miles engaged"],
    ["30,000", "Drivers"],
    ["80+", "Countries"],
  ];

  const videos = [
    { id: "OD_iY7-Ojf0", title: "99% hands-free in a Rivian", subtitle: "An R1T owner runs the numbers." },
    { id: "xdmxM-v4KQg", title: "Linus installs openpilot", subtitle: "A five-year-old Corolla, upgraded." },
    { id: "kaNSXMDUqUA", title: "100 miles hands-free", subtitle: "A hyperlapse on openpilot 0.10." },
    { id: "GY8ruVimG8M", start: 1465, title: "Snazzy Labs tries openpilot", subtitle: "Up against Tesla, Kia, and Rivian." },
    { id: "238plqqlRGo", title: "Utah to Washington", subtitle: "15 hours in a Lexus." },
    { id: "ou_qa8sHfns", title: "2,600-mile road trip", subtitle: "Colorado to Michigan and back." },
    { id: "Hc8G5U0p1sA", title: "A Tesla owner tries openpilot", subtitle: "Andy Slye swaps cars for a day." },
    { id: "6ikxBWUAjmI", title: "openpilot in a rental car", subtitle: "Plug and play, even in a rental." },
    { id: "LhT5VzJVfNI", title: "700 miles, day and night", subtitle: "Buffalo to Baltimore and back." },
    { id: "U8oH0cJgqGQ", title: "Red lights and stop signs", subtitle: "End-to-end longitudinal, in town." },
    { id: "JgN-P60vFC8", title: "Linus lives with openpilot", subtitle: "Weeks of daily driving, logged." },
    { id: "0qB5LMTdD6E", title: "Rivian gets speed control", subtitle: "openpilot longitudinal on the R1T." },
  ];

  let playingVideo = null;

  // featured clips: advance through them in order until someone picks one
  let current = 0;
  let picked = false;
  let clipVideo;

  async function pickClip(index) {
    picked = true;
    current = index;
    await tick();
    if (clipVideo && !$reducedMotion) {
      clipVideo.play().catch(() => {});
    }
  }

  function nextClip() {
    if (!picked) {
      current = (current + 1) % clips.length;
    }
  }

  $: clip = clips[current];
</script>

<svelte:head>
  <title>openpilot — comma.ai</title>
  <meta name="description" content="openpilot is open source driver assistance that upgrades the car you already have. One end-to-end driving model for steering and speed, learned from human driving." />
</svelte:head>

<Hero />

<section class="op dark drives-section">
  <div class="container drives">
    <h2 class="giant">Drives like you do.</h2>
    <p class="drives-copy">
      openpilot drives like you do because it learned from you. Steering, gas, and brakes all come from one driving model,
      learned end-to-end from 10 million minutes of human driving.
    </p>
    <DriveDiagram />
  </div>
</section>

<section class="op light explain">
  <div class="container">
    <article>
      <hgroup>
        <p>01</p>
        <h2>One question</h2>
      </hgroup>
      <p>
        In training, we ask one question: “Given this video, how would a human steer and accelerate?” We don't ask where
        the lane lines are, where the lead car is, or anything like that. There's no lane line detector, no lead car tracker,
        and no traffic light classifier wired up to a rule. Video goes in, and where to steer and how fast to go come out.
      </p>
      <p>
        The model learned from 10 million minutes of human driving from around the world, and it's trained inside a
        <a class="highlight" href="https://blog.comma.ai/mlsim/" target="_blank">learned world model</a>.
        Nobody wrote a rule for stopping at a red light, slowing for a curve, or giving a parked car room. openpilot picks
        those up on its own, just by watching people do them.
      </p>
    </article>

    <article>
      <hgroup>
        <p>02</p>
        <h2>No rules to run out of</h2>
      </hgroup>
      <p>
        Conventional driver assistance, like the system your car probably came with, Ford BlueCruise, or GM Super Cruise,
        runs on hand-written rules: hold the set speed, keep the gap, stay between the lane lines. Rules work until the road
        does something nobody wrote one for. The paint wears off, a light turns red, a car is stopped half in your lane.
      </p>
      <p>
        openpilot has no driving rules to run out of. It treats your set speed as a maximum and drives like it thinks a
        human would within that limit.
      </p>
      <div class="compare-wrap">
        <table class="compare">
          <thead>
            <tr>
              <th scope="col"><span class="visually-hidden">Situation</span></th>
              <th scope="col">Rules-based driver assistance</th>
              <th scope="col">openpilot</th>
            </tr>
          </thead>
          <tbody>
            {#each comparison as [situation, rules, learned]}
              <tr>
                <th scope="row">{situation}</th>
                <td>{rules}</td>
                <td>{learned}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </article>

    <article>
      <hgroup>
        <p>03</p>
        <h2>Always something a human would do</h2>
      </hgroup>
      <p>
        Every output is an imitation of human driving. So what openpilot does is always something a human driver would
        plausibly do in that spot. When it meets a situation it hasn't seen exactly, it doesn't fall off the end of a rule;
        it does the human-ish thing.
      </p>
      <p>
        That doesn't make it always right. openpilot is driver assistance, not a self-driving car. You supervise it, and you
        take over when it's wrong.
      </p>
    </article>
  </div>
</section>

<section class="op dark clips">
  <div class="container">
    <h2 class="title">Things nobody wrote a rule for.</h2>
    <p class="intro">
      Because openpilot is end-to-end, none of these needed a rule of its own. It picked them up from human driving, like
      everything else it does. Clips from our own drives, at real speed.
    </p>

    <div class="featured">
      <div class="player-frame">
        <video
          bind:this={clipVideo}
          src={clip.src}
          poster={clip.poster}
          use:playInView={$reducedMotion}
          on:ended={nextClip}
          loop={picked}
          muted
          playsinline
          preload="none"
          aria-label="{clip.title} {clip.text}"
        ></video>
        <span class="car">{clip.car}</span>
      </div>
      <!-- every caption sits in the same grid cell, so the tallest one sets the height and switching clips never moves the page -->
      <div class="featured-copy">
        {#each clips as item, i}
          <div class="caption" class:shown={i === current} aria-hidden={i !== current}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        {/each}
        <p class="visually-hidden" aria-live="polite">{clip.title} {clip.text}</p>
      </div>
    </div>

    <div class="tabs" role="group" aria-label="Choose a clip">
      {#each clips as item, i}
        <button type="button" class:active={i === current} aria-pressed={i === current} on:click={() => pickClip(i)}>
          <img src={item.poster} alt="" loading="lazy" />
          <span>{item.tab}</span>
        </button>
      {/each}
    </div>
  </div>
</section>

<section class="op light cars">
  <div class="container">
    <h2 class="title">Works on {vehicleCountText} cars.</h2>
    <p class="intro">From these brands, with new cars added in each openpilot release.</p>

    <ul class="makes">
      {#each makes as { make, logo }}
        <li>
          <a href="/vehicles#{make.toLowerCase()}">
            {#if logo}
              <img src={logo} alt="" loading="lazy" />
            {/if}
            <span>{make}</span>
          </a>
        </li>
      {/each}
    </ul>
    <div class="cars-cta">
      <LinkButton href="/vehicles" style="primary">Check your car</LinkButton>
    </div>

    <div class="how">
      <div class="how-copy">
        <h3>How it works on so many cars</h3>
        <p>
          openpilot doesn't replace your car's driver assistance. It builds on it. openpilot sends steering, gas, and brake
          commands through the manufacturer's own driver assistance interface, the same one the stock system uses, and
          within the same bounds.
        </p>
        <p>
          So the car's safety hierarchy stays intact, and supporting a new car means teaching openpilot to speak its
          interface. Unplug the harness and the car is fully back to stock.
        </p>
      </div>
      <div>
        <p class="eyebrow">Who's in charge</p>
        <ol class="layers">
          {#each layers as layer, i}
            <li class:openpilot={i === layers.length - 1}>
              <span class="rank">{i + 1}</span>
              <div>
                <h4>{layer.name}</h4>
                <p>{layer.text}</p>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    </div>

    <div class="monitoring">
      <video src={MonitoringVideo} use:playInView={$reducedMotion} muted loop playsinline preload="metadata" aria-label="openpilot driver monitoring demonstration"></video>
      <div>
        <h3>Hands off. Eyes on.</h3>
        <p>
          openpilot works together with an attentive driver, not without one. Since 2018, openpilot has shipped vision-based
          driver monitoring to help you stay attentive while it's engaged. For 96% of supported cars, that's driver monitoring
          the car didn't come with.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="op dark device">
  <div class="container device-grid">
    <img src={WindshieldImage} loading="lazy" alt="comma four mounted behind a rearview mirror, its screen showing openpilot" />
    <div>
      <h2>It runs on comma four.</h2>
      <p>
        comma four is the device we make for openpilot. It mounts behind your rearview mirror, plugs into your car, and gets
        new openpilot releases over the air.
      </p>
      <LinkButton href="/shop/comma-four" style="secondary">comma four</LinkButton>
    </div>
  </div>
</section>

<section class="op light open">
  <div class="container">
    <h2 class="title">Developed in public.</h2>
    <p class="intro">
      openpilot is MIT licensed and lives on GitHub, where comma and its users build it together. Bug fixes and new car
      ports are strongly encouraged: start with the
      <a class="highlight" href="https://github.com/commaai/openpilot/blob/master/docs/CONTRIBUTING.md" target="_blank">contributing docs</a>.
    </p>
    <ul class="stats">
      {#each stats as [value, label]}
        <li>
          <span class="value">{value}</span>
          <span class="label">{label}</span>
        </li>
      {/each}
    </ul>
    <div class="open-cta">
      <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="primary">View on GitHub</LinkButton>
    </div>
  </div>
</section>

<section class="op dark watch">
  <div class="container">
    <h2 class="title">Watch it drive.</h2>
    <p class="intro">
      Real experiences by real users over the last 10 years. These videos were recorded on earlier openpilot releases and comma hardware.
    </p>
    <div class="video-grid">
      {#each videos as video}
        <article>
          <div class="player">
            {#if playingVideo === video.id}
              <iframe
                src="https://www.youtube-nocookie.com/embed/{video.id}?start={video.start || 0}&autoplay=1&playsinline=1"
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            {:else}
              <button type="button" on:click={() => playingVideo = video.id} aria-label="Play: {video.title}">
                <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
                <span class="play" aria-hidden="true"></span>
              </button>
            {/if}
          </div>
          <h3>{video.title}</h3>
          <p>{video.subtitle}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="op light notes">
  <div class="container">
    <div class="release-notes">
      <h2>Latest release notes</h2>
      {#each data.releaseNotes as release}
        <ReleaseNote releaseNote={release} />
      {/each}
    </div>
    <EmailUpdatesForm title="Keep up with openpilot" defaultCategory="releases">
      <p>Get an email when a new version of openpilot is released.</p>
    </EmailUpdatesForm>
  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.openpilot} title="openpilot FAQ" />
  </div>
</section>

<style>
  .op {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .op.dark {
    background-color: #000;
    color: #fff;
  }

  .op .title {
    max-width: 60rem;
    margin: 0 auto 1.5rem;
    text-align: center;
    font-size: clamp(2.25rem, 5vw, 4rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.05;
    text-wrap: balance;
  }

  .op .intro {
    max-width: 46rem;
    margin: 0 auto;
    text-align: center;
    color: var(--color-muted);
    font-size: 1.3rem;
    font-weight: 300;
    line-height: 1.6;
    text-wrap: pretty;
  }

  .eyebrow {
    margin: 0;
    text-transform: uppercase;
    color: var(--color-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    line-height: 1.6;
  }

  /* drives like you do */

  .drives-section {
    padding-bottom: 8rem;
    text-align: center;
  }

  .giant {
    margin: 0 auto 2rem;
    font-size: clamp(3.25rem, 10.5vw, 10rem);
    font-weight: 700;
    letter-spacing: -0.055em;
    line-height: 0.95;
    text-wrap: balance;
  }

  .drives-copy {
    max-width: 44rem;
    margin: 0 auto;
    color: #cfcfcf;
    font-size: clamp(1.15rem, 1.8vw, 1.45rem);
    font-weight: 300;
    line-height: 1.55;
    text-wrap: pretty;
  }

  /* explanation, in the original page's numbered-article style */

  .explain article {
    max-width: 58rem;
    margin-bottom: 6rem;

    &:last-child {
      margin-bottom: 0;
    }

    & hgroup p {
      margin: 0 0 0.5rem;
      opacity: 0.5;
      font-family: var(--font-mono);
      font-size: 1.5rem;
    }

    & h2 {
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-weight: 600;
      text-transform: lowercase;
      line-height: 1.2;
    }

    & > p {
      font-size: 1.5rem;
      line-height: 1.4;
    }
  }

  .compare-wrap {
    margin-top: 2.5rem;
  }

  .compare {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.1rem;
    line-height: 1.45;

    & th,
    & td {
      padding: 1.1rem 1.5rem 1.1rem 0;
      border-bottom: 1px solid #00000020;
      text-align: left;
      vertical-align: top;
    }

    & thead th {
      padding-top: 0;
      color: #00000080;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-bottom-color: #000;
    }

    & tbody th {
      width: 22%;
      font-weight: 600;
    }

    & tbody td:last-child {
      font-weight: 500;
    }

    & thead th:last-child {
      color: #000;
    }
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  /* featured clips */

  .featured {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
    gap: 2.5rem;
    align-items: end;
    margin-top: 4rem;
  }

  .player-frame {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: #151515;
    border-radius: 0.25rem;

    & video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .car {
      position: absolute;
      left: 1rem;
      bottom: 1rem;
      padding: 0.25rem 0.6rem;
      background-color: #000000b3;
      border-radius: 0.2rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.04em;
    }
  }

  .featured-copy {
    display: grid;
    padding-bottom: 0.5rem;

    & .caption {
      grid-area: 1 / 1;
      align-self: start;
      visibility: hidden;
    }

    & .caption.shown {
      visibility: visible;
    }

    & h3 {
      margin: 0 0 1rem;
      font-size: clamp(1.75rem, 2.5vw, 2.25rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }

    & p {
      margin: 0;
      color: #bdbdbd;
      font-size: 1.15rem;
      font-weight: 300;
      line-height: 1.55;
    }
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;

    & button {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      padding: 0 0 0.75rem;
      border: 0;
      border-bottom: 2px solid #333;
      background: none;
      color: #9e9e9e;
      text-align: left;
      font-size: 1rem;
      cursor: pointer;
      transition: color 0.2s, border-color 0.2s;
    }

    & button:hover {
      color: #fff;
    }

    & button.active {
      color: #fff;
      border-bottom-color: var(--color-accent);
    }

    & button:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 4px;
    }

    & img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 0.2rem;
      opacity: 0.55;
      transition: opacity 0.2s;
    }

    & button:hover img,
    & button.active img {
      opacity: 1;
    }
  }

  /* cars */

  .makes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    max-width: 75rem;
    margin: 4rem auto 0;
    padding: 0;
    list-style: none;

    & li {
      display: flex;
      flex: 0 0 7.5rem;
    }

    & a {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.5rem 0.75rem 1.25rem;
      border: 1px solid #0000001a;
      border-radius: 0.25rem;
      background-color: #fff;
      font-size: 0.95rem;
      font-weight: 500;
      transition: border-color 0.2s;
    }

    & a:hover {
      border-color: #000;
    }

    & a:focus-visible {
      outline: 2px solid #000;
      outline-offset: 2px;
    }

    & img {
      display: block;
      width: 3.5rem;
      height: 3.5rem;
      object-fit: contain;
    }
  }

  .cars-cta {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
  }

  .how {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4rem;
    margin-top: 6rem;
    padding-top: 4rem;
    border-top: 1px solid #00000020;
  }

  .how-copy {
    & h3 {
      margin: 0 0 1.25rem;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }

    & p {
      margin: 0 0 1.25rem;
      font-size: 1.2rem;
      line-height: 1.55;
    }
  }

  .layers {
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;

    & li {
      display: flex;
      gap: 1.25rem;
      margin-top: 0.75rem;
      padding: 1.25rem 1.5rem;
      border: 1px solid #00000026;
      border-radius: 0.25rem;
      background-color: #fff;
    }

    & li:first-child {
      margin-top: 0;
      background-color: #000;
      color: #fff;
      border-color: #000;
    }

    & li:first-child h4,
    & li:first-child .rank {
      color: #fff;
    }

    & li:first-child p {
      color: #ffffffb3;
    }

    & li.openpilot {
      border-color: #2a9e00;
      box-shadow: inset 4px 0 0 var(--color-accent);
    }

    & .rank {
      flex: none;
      width: 1.5rem;
      opacity: 0.5;
      font-family: var(--font-mono);
      font-size: 1rem;
      line-height: 1.6;
    }

    & h4 {
      margin: 0 0 0.3rem;
      font-size: 1.15rem;
      font-weight: 600;
      line-height: 1.3;
    }

    & p {
      margin: 0;
      color: #00000099;
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  .monitoring {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: center;
    margin-top: 5rem;
    padding-top: 4rem;
    border-top: 1px solid #00000020;

    & video {
      display: block;
      width: 100%;
      border-radius: 0.25rem;
    }

    & h3 {
      margin: 0 0 1.25rem;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    & p {
      margin: 0;
      font-size: 1.2rem;
      line-height: 1.55;
    }
  }

  /* comma four */

  .device-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4rem;
    align-items: center;

    & img {
      display: block;
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      border-radius: 0.25rem;
    }

    & h2 {
      margin: 0 0 1.25rem;
      font-size: clamp(2rem, 3.5vw, 3rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1.05;
    }

    & p {
      max-width: 30rem;
      margin: 0 0 2rem;
      color: #cfcfcf;
      font-size: 1.25rem;
      font-weight: 300;
      line-height: 1.55;
    }
  }

  /* developed in public */

  .open .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3rem 2rem;
    max-width: 60rem;
    margin: 4rem auto 0;
    padding: 2rem 0 0;
    list-style: none;
    border-top: 1px solid #000;

    & li {
      display: flex;
      flex-direction: column;
    }

    & .value {
      font-size: clamp(2.25rem, 3.6vw, 3.25rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    & .label {
      margin-top: 0.6rem;
      color: #00000099;
      text-transform: uppercase;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.06em;
    }
  }

  .open-cta {
    display: flex;
    justify-content: center;
    margin-top: 3.5rem;
  }

  /* watch it drive */

  .video-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3rem 1.5rem;
    margin-top: 4rem;

    & article {
      min-width: 0;
    }

    & h3 {
      margin: 1rem 0 0.4rem;
      font-size: 1.15rem;
      font-weight: 600;
      line-height: 1.3;
    }

    & p {
      margin: 0;
      color: #9e9e9e;
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  .player {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: #151515;
    border-radius: 0.25rem;

    & button,
    & iframe {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 0;
      background: transparent;
    }

    & button {
      cursor: pointer;
    }

    & button:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 4px;
    }

    & img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: opacity 0.2s;
    }

    & button:hover img {
      opacity: 1;
    }
  }

  .play {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3.5rem;
    height: 3.5rem;
    background-color: #000000b3;
    border: 1px solid #ffffff80;
    border-radius: 50%;
    transform: translate(-50%, -50%);

    &::after {
      content: "";
      position: absolute;
      left: 55%;
      top: 50%;
      border-style: solid;
      border-width: 0.6rem 0 0.6rem 1rem;
      border-color: transparent transparent transparent #fff;
      transform: translate(-50%, -50%);
    }
  }

  /* release notes */

  .notes {
    padding-bottom: 3rem;
  }

  .release-notes {
    width: 80%;
    margin-bottom: 5rem;

    & h2 {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 1024px) {
    .featured {
      grid-template-columns: minmax(0, 1fr);
      gap: 1.5rem;
    }

    .tabs {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .how,
    .monitoring {
      grid-template-columns: minmax(0, 1fr);
      gap: 2.5rem;
    }


    .video-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    .op {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }

    .drives-section {
      padding-bottom: 5rem;
    }

    .op .intro {
      font-size: 1.1rem;
    }

    .explain article {
      margin-bottom: 4rem;
    }

    .explain article h2 {
      font-size: 2rem;
    }

    .explain article > p {
      font-size: 1.25rem;
    }

    .compare {
      font-size: 1rem;
    }

    .compare thead {
      display: none;
    }

    .compare tr {
      display: block;
      padding: 1rem 0;
      border-bottom: 1px solid #00000020;
    }

    .compare th,
    .compare td {
      display: block;
      padding: 0;
      border: 0;
    }

    .compare tbody th {
      width: auto;
      margin-bottom: 0.5rem;
    }

    .compare td::before {
      display: block;
      color: #00000080;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .compare td:nth-of-type(1)::before {
      content: "Rules-based";
    }

    .compare td:nth-of-type(2) {
      margin-top: 0.6rem;
    }

    .compare td:nth-of-type(2)::before {
      content: "openpilot";
    }

    .featured {
      margin-top: 2.5rem;
    }

    .tabs {
      gap: 0.75rem;
    }

    .tabs button {
      font-size: 0.9rem;
    }

    .layers li {
      padding: 1rem;
    }

    .makes {
      gap: 0.5rem;
      margin-top: 2.5rem;
    }

    .makes li {
      flex-basis: calc((100% - 1.5rem) / 4);
    }

    .makes a {
      gap: 0.5rem;
      padding: 0.75rem 0.25rem 0.7rem;
      font-size: 0.75rem;
    }

    .makes img {
      width: 2.5rem;
      height: 2.5rem;
    }

    .how {
      margin-top: 4rem;
      padding-top: 3rem;
    }

    .how-copy h3,
    .monitoring h3 {
      font-size: 1.6rem;
    }

    .how-copy p,
    .monitoring p {
      font-size: 1.1rem;
    }

    .monitoring {
      margin-top: 3rem;
      padding-top: 3rem;
    }

    .device-grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 2rem;
    }

    .device-grid p {
      font-size: 1.1rem;
    }

    .open .stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2rem 1rem;
      margin-top: 2.5rem;
    }

    .open-cta {
      margin-top: 2.5rem;
    }

    .video-grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 2.5rem;
      margin-top: 2.5rem;
    }

    .release-notes {
      width: 100%;
    }
  }
</style>
