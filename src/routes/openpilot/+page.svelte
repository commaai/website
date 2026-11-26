<script>
  import { onMount, tick } from "svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import EmailUpdatesForm from "$lib/components/EmailUpdates/EmailUpdatesForm.svelte";
  import ReleaseNote from "$lib/components/ReleaseNote.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import { faq } from "$lib/constants/faq.svelte";
  import { vehicleCountText } from "$lib/constants/vehicles.js";

  import DeviceImage from "$lib/images/products/comma-four/four_screen_on.png?w=1600";
  import MapImage from "$lib/images/home/map-activity-2x.png?w=1600";
  import MonitoringVideo from "$lib/images/products/comma-four/driver-monitoring-demo.mp4";

  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import CarIcon from "$lib/icons/features/car.svg?raw";
  import PeopleIcon from "$lib/icons/features/people.svg?raw";

  // a real openpilot drive with its logs: road camera video, plus the driving
  // model's outputs and the car's speed for every frame (see the commit for the route)
  import DriveVideo from "$lib/videos/openpilot/drive-ramp.mp4";
  import DrivePoster from "$lib/videos/openpilot/drive-ramp.jpg?format=jpg&as=url";
  import drive from "$lib/videos/openpilot/drive-ramp.json";

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

  const layers = [
    { name: "You", text: "Step on the brake and openpilot lets go immediately. Press the gas or turn the wheel and you override it." },
    { name: "Your car's safety systems", text: "AEB, blind spot warning, and the car's other safety features keep working." },
    { name: "Your car's driver assistance interface", text: "The manufacturer's own interface for steering, gas, and brake commands, with the same bounds as the stock system." },
    { name: "openpilot", text: "Decides where to steer and how fast to go, and sends it through that interface." },
  ];

  const stats = [
    { icon: RoadIcon, value: "400M+", label: "Miles driven" },
    { icon: SteerIcon, value: "56%", label: "Of miles engaged" },
    { icon: CarIcon, value: "30,000", label: "Drivers" },
    { icon: PeopleIcon, value: "750+", label: "Contributors" },
  ];

  const moreStats = [
    [vehicleCountText, "cars supported"],
    ["102", "releases"],
    ["80+", "countries"],
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

  // loops play only while on screen, and not at all with reduced motion (the poster shows instead)
  let reduceMotion = true;
  onMount(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion = query.matches;
    query.addEventListener("change", (event) => reduceMotion = event.matches);
  });

  function playInView(video, reduced) {
    let visible = false;
    const sync = () => {
      if (visible && !reduced) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.25 });
    observer.observe(video);
    video.addEventListener("loadstart", sync);
    return {
      update(value) {
        reduced = value;
        sync();
      },
      destroy() {
        observer.disconnect();
        video.removeEventListener("loadstart", sync);
      },
    };
  }

  // the diagram's outputs follow the video frame by frame, interpolated between logged frames
  let driveVideo;
  let frame = 0;
  let rafId = null;

  function sample(values, position) {
    const count = values.length;
    const i = Math.floor(position) % count;
    const next = (i + 1) % count;
    const t = position - Math.floor(position);
    return values[i] + (values[next] - values[i]) * t;
  }

  function followVideo() {
    if (driveVideo) {
      frame = driveVideo.currentTime * drive.fps;
    }
    rafId = requestAnimationFrame(followVideo);
  }

  function startFollowing() {
    if (rafId === null) {
      rafId = requestAnimationFrame(followVideo);
    }
  }

  function stopFollowing() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (driveVideo) {
      frame = driveVideo.currentTime * drive.fps;
    }
  }

  onMount(() => stopFollowing);

  $: steer = sample(drive.steer, frame);
  $: accel = sample(drive.accel, frame);
  $: mph = sample(drive.mph, frame);
  $: steerText = Math.abs(steer) < 0.5 ? "straight" : `${Math.abs(steer).toFixed(0)}° ${steer > 0 ? "right" : "left"}`;
  $: accelText = `${accel >= 0 ? "+" : "−"}${Math.abs(accel).toFixed(1)} m/s²`;
  $: accelWidth = Math.min(Math.abs(accel) / 1.5, 1) * 50;

  // featured clips: advance through them in order until someone picks one
  let current = 0;
  let picked = false;
  let clipVideo;

  async function pickClip(index) {
    picked = true;
    current = index;
    await tick();
    if (clipVideo && !reduceMotion) {
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

<section class="op dark hero">
  <div class="container">
    <h1>openpilot</h1>
    <p class="lede">Open source driver assistance that upgrades the car you already have.</p>
    <div class="hero-device">
      <img src={DeviceImage} alt="comma four running openpilot, with its screen on" fetchpriority="high" />
    </div>
    <div class="actions">
      <LinkButton href="/shop/comma-four" style="accent">Buy comma four</LinkButton>
      <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="secondary">View on GitHub</LinkButton>
    </div>
  </div>

  <div class="container drives">
    <h2 class="giant">Drives like you do.</h2>
    <p class="drives-copy">
      openpilot drives like you do because it learned from you. Steering, gas, and brakes all come from one driving model,
      learned end-to-end from 10 million minutes of human driving.
    </p>

    <figure class="e2e">
      <div class="label label-in">
        <span class="word">end</span>
        <span class="sub">Video in</span>
      </div>
      <div class="cell cell-in">
        <video
          bind:this={driveVideo}
          src={DriveVideo}
          poster={DrivePoster}
          use:playInView={reduceMotion}
          on:play={startFollowing}
          on:pause={stopFollowing}
          on:seeked={stopFollowing}
          muted
          loop
          playsinline
          preload="none"
          aria-label="Road camera video from openpilot driving a freeway exit ramp"
        ></video>
      </div>
      <span class="arrow arrow-1" aria-hidden="true"></span>
      <div class="label label-model">
        <span class="word">to</span>
        <span class="sub">One neural network</span>
      </div>
      <div class="cell cell-model">
        <div class="model">openpilot's<br />end-to-end<br />driving model</div>
      </div>
      <span class="arrow arrow-2" aria-hidden="true"></span>
      <div class="label label-out">
        <span class="word">end</span>
        <span class="sub">Driving actions out</span>
      </div>
      <div class="cell cell-out">
        <dl class="outputs">
          <div class="output">
            <svg class="wheel" viewBox="0 0 100 100" style="transform: rotate({steer}deg)" aria-hidden="true">
              <circle cx="50" cy="50" r="42" />
              <path d="M8 50 H36 M64 50 H92 M50 64 V92" />
              <circle cx="50" cy="50" r="14" />
              <path class="mark" d="M50 4 V16" />
            </svg>
            <div>
              <dt>Curvature</dt>
              <dd>where to steer</dd>
              <dd class="value">{steerText}</dd>
            </div>
          </div>
          <div class="output">
            <div class="accel" aria-hidden="true">
              <span class="track"></span>
              <span class="fill" class:braking={accel < 0} style="width: {accelWidth}%"></span>
              <span class="zero"></span>
            </div>
            <div>
              <dt>Acceleration</dt>
              <dd>how fast to go</dd>
              <dd class="value">{accelText}</dd>
            </div>
          </div>
        </dl>
        <p class="speed"><span>{mph.toFixed(0)}</span> mph</p>
      </div>
      <figcaption>
        A real openpilot drive in a Ford Bronco Sport, at real speed. The wheel and the bar are
        the driving model's own output for each video frame (curvature is drawn as a steering wheel angle); the speed is the car's.
      </figcaption>
    </figure>
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
    <p class="intro">Clips from our own drives with openpilot, at real speed.</p>

    <div class="featured">
      <div class="player-frame">
        <video
          bind:this={clipVideo}
          src={clip.src}
          poster={clip.poster}
          use:playInView={reduceMotion}
          on:ended={nextClip}
          loop={picked}
          muted
          playsinline
          preload="none"
          aria-label="{clip.title} {clip.text}"
        ></video>
        <span class="car">{clip.car}</span>
      </div>
      <div class="featured-copy" aria-live="polite">
        <h3>{clip.title}</h3>
        <p>{clip.text}</p>
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

<section class="op light safety">
  <div class="container">
    <h2 class="title">Built on the car you already have.</h2>
    <p class="intro">
      openpilot doesn't replace your car's systems. It builds on the driver assistance your car already has, and fits into
      its safety hierarchy instead of going around it.
    </p>

    <div class="safety-grid">
      <div>
        <p class="eyebrow">Who's in charge</p>
        <ol class="layers">
          {#each layers as layer, i}
            <li class:openpilot={i === layers.length - 1}>
              <span class="rank">{i + 1}</span>
              <div>
                <h3>{layer.name}</h3>
                <p>{layer.text}</p>
              </div>
            </li>
          {/each}
        </ol>
      </div>

      <div class="points">
        <article>
          <h3>Plugs in. Unplugs.</h3>
          <p>
            comma four connects with a harness made for your car, usually at the camera behind the rearview mirror. It speaks
            your car's language, and when you unplug it, the car is fully back to stock.
          </p>
        </article>
        <article>
          <h3>The car's own interface</h3>
          <p>
            openpilot sends steering, gas, and brake commands through the manufacturer's own driver assistance interface, the
            same one the stock system uses, and within the same bounds. Your car's safety hierarchy stays intact.
          </p>
        </article>
        <article>
          <h3>Limits, enforced in code</h3>
          <p>
            What openpilot is allowed to send is checked by its safety code, written to MISRA C guidelines and tested before
            every release. It keeps the car from changing its path faster than a driver can react.
            <a class="highlight" href="https://github.com/commaai/openpilot/blob/master/docs/SAFETY.md" target="_blank">Read how it works</a>.
          </p>
        </article>
      </div>
    </div>

    <div class="monitoring">
      <video src={MonitoringVideo} use:playInView={reduceMotion} muted loop playsinline preload="metadata" aria-label="comma four driver monitoring demonstration"></video>
      <div>
        <h3>Hands off. Eyes on.</h3>
        <p class="eyebrow accent">New: always-on sleep detection</p>
        <p>
          openpilot works together with an attentive driver, not without one. Since 2018, openpilot has shipped vision-based
          driver monitoring to help you stay attentive while it's engaged. For 96% of supported cars, that's driver monitoring
          the car didn't come with.
        </p>
        <p>
          Sleep detection is always on, even when openpilot isn't engaged. comma four's infrared driver camera works day
          and night.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="op dark proof">
  <div class="container">
    <h2 class="title">Proven on the road.</h2>
    <p class="intro">
      Our 30,000 drivers have driven over 400 million miles with openpilot. Over 56% of those miles were driven by openpilot,
      with the driver supervising.
    </p>
    <div class="stats-panel">
      <img class="map" src={MapImage} alt="" loading="lazy" />
      <ul class="stats">
        {#each stats as stat}
          <li>
            <div class="icon">{@html stat.icon}</div>
            <span class="value">{stat.value}</span>
            <span class="label">{stat.label}</span>
          </li>
        {/each}
      </ul>
      <ul class="more-stats">
        {#each moreStats as [value, label]}
          <li>
            <span class="value">{value}</span>
            <span class="label">{label}</span>
          </li>
        {/each}
      </ul>
    </div>
    <div class="open-source">
      <p>
        openpilot is open source, MIT licensed, and developed on GitHub by comma and by users like you. Bug fixes and new car
        ports are strongly encouraged: check out the
        <a href="https://github.com/commaai/openpilot/blob/master/docs/CONTRIBUTING.md" target="_blank">contributing docs</a>.
      </p>
      <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="secondary">View on GitHub</LinkButton>
    </div>
  </div>
</section>

<section class="op light buy">
  <div class="container">
    <div class="buy-grid">
      <img src={DeviceImage} loading="lazy" alt="comma four device" />
      <div>
        <h2>Try openpilot on the comma four</h2>
        <p>Love it or return it. Every comma four comes with a 30-day money back trial.</p>
        <p class="supported">
          Works with <a class="highlight" href="/vehicles">{vehicleCountText} supported cars</a>, and growing.
        </p>
        <LinkButton href="/shop/comma-four" style="primary">Buy now</LinkButton>
      </div>
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

  .eyebrow.accent {
    color: #2a9e00;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  /* hero */

  .hero {
    padding-top: 4rem;
    padding-bottom: 8rem;
    overflow: hidden;
    text-align: center;

    & h1 {
      margin: 0 0 1rem;
      font-size: clamp(2.75rem, 6vw, 5rem);
      font-weight: 700;
      letter-spacing: -0.04em;
    }
  }

  .lede {
    max-width: 36rem;
    margin: 0 auto;
    color: #cfcfcf;
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    font-weight: 300;
    line-height: 1.45;
    text-wrap: balance;
  }

  .hero-device {
    display: flex;
    justify-content: center;
    margin: 2.5rem auto 2.5rem;

    & img {
      display: block;
      width: auto;
      max-width: 100%;
      max-height: 20rem;
      object-fit: contain;
    }
  }

  /* drives like you do */

  .drives {
    margin-top: 9rem;
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

  .e2e {
    display: grid;
    grid-template-columns: minmax(0, 2.3fr) 3.5rem minmax(0, 0.75fr) 3.5rem minmax(0, 0.95fr);
    grid-template-rows: auto auto auto;
    align-items: center;
    row-gap: 1.5rem;
    width: min(100vw - 4rem, 96rem);
    margin: 6rem 0 0 50%;
    transform: translateX(-50%);
    text-align: left;

    & .label {
      grid-row: 1;
      align-self: end;
    }

    & .cell {
      grid-row: 2;
      min-width: 0;
    }

    & .arrow {
      grid-row: 2;
    }

    & .label-in,
    & .cell-in {
      grid-column: 1;
    }

    & .arrow-1 {
      grid-column: 2;
    }

    & .label-model,
    & .cell-model {
      grid-column: 3;
    }

    & .arrow-2 {
      grid-column: 4;
    }

    & .label-out,
    & .cell-out {
      grid-column: 5;
    }

    & figcaption {
      grid-row: 3;
      grid-column: 1 / -1;
      max-width: 52rem;
      margin: 1.5rem auto 0;
      text-align: center;
      color: #8a8a8a;
      font-size: 0.95rem;
      line-height: 1.55;
      text-wrap: pretty;
    }
  }

  .label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & .word {
      font-size: clamp(3rem, 7vw, 6.5rem);
      font-weight: 700;
      letter-spacing: -0.05em;
      line-height: 0.9;
    }

    & .sub {
      text-transform: uppercase;
      color: #9e9e9e;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.12em;
    }
  }

  .label-model {
    align-items: center;
    text-align: center;

    & .word {
      color: var(--color-accent);
    }
  }

  .cell-in video {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 8 / 3;
    background-color: #151515;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }

  .model {
    padding: 2.5rem 1rem;
    border: 1px solid var(--color-accent);
    border-radius: 0.25rem;
    box-shadow: 0 0 3rem #51ff0022;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;
  }

  .arrow {
    position: relative;
    justify-self: center;
    width: 2.75rem;
    height: 1px;
    background-color: var(--color-accent);

    &::after {
      content: "";
      position: absolute;
      right: -1px;
      top: -4px;
      width: 8px;
      height: 8px;
      border-top: 1px solid var(--color-accent);
      border-right: 1px solid var(--color-accent);
      transform: rotate(45deg);
    }
  }

  .outputs {
    margin: 0;
    border-top: 1px solid #333;
  }

  .output {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 1rem 0;
    border-bottom: 1px solid #333;

    & dt {
      font-size: 1.25rem;
      font-weight: 600;
    }

    & dd {
      margin: 0.15rem 0 0;
      color: #9e9e9e;
      font-size: 0.95rem;
    }

    & dd.value {
      margin-top: 0.4rem;
      color: #fff;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
    }
  }

  .wheel {
    flex: none;
    width: 4.5rem;
    height: 4.5rem;
    fill: none;
    stroke: #fff;
    stroke-width: 6;
    stroke-linecap: round;

    & .mark {
      stroke: var(--color-accent);
    }
  }

  .accel {
    position: relative;
    flex: none;
    width: 4.5rem;
    height: 4.5rem;

    & .track {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(50% - 0.4rem);
      height: 0.8rem;
      background-color: #222;
      border-radius: 0.4rem;
    }

    & .fill {
      position: absolute;
      left: 50%;
      top: calc(50% - 0.4rem);
      height: 0.8rem;
      background-color: var(--color-accent);
      border-radius: 0 0.4rem 0.4rem 0;
    }

    & .fill.braking {
      left: auto;
      right: 50%;
      background-color: #fff;
      border-radius: 0.4rem 0 0 0.4rem;
    }

    & .zero {
      position: absolute;
      left: calc(50% - 1px);
      top: calc(50% - 1rem);
      width: 2px;
      height: 2rem;
      background-color: #666;
    }
  }

  .speed {
    margin: 1rem 0 0;
    color: #9e9e9e;
    font-family: var(--font-mono);
    font-size: 0.95rem;
    letter-spacing: 0;

    & span {
      color: #fff;
      font-family: var(--font-sans);
      font-size: 2rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.03em;
    }
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
    padding-bottom: 0.5rem;

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

  /* safety */

  .safety-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4rem;
    margin-top: 4rem;
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

    & li:first-child h3,
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

    & h3 {
      margin: 0 0 0.3rem;
      font-size: 1.25rem;
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

  .points {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
    padding-top: 2.25rem;

    & h3 {
      margin: 0 0 0.6rem;
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 1.2;
    }

    & p {
      margin: 0;
      font-size: 1.2rem;
      line-height: 1.5;
    }
  }

  .monitoring {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 3rem;
    align-items: center;
    margin-top: 6rem;
    padding-top: 4rem;
    border-top: 1px solid #00000020;

    & video {
      display: block;
      width: 100%;
      border-radius: 0.25rem;
    }

    & h3 {
      margin: 0 0 0.5rem;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    & .eyebrow {
      margin-bottom: 1.25rem;
    }

    & p {
      font-size: 1.15rem;
      line-height: 1.55;
    }
  }

  /* stats */

  .stats-panel {
    position: relative;
    margin-top: 4rem;
    padding: 4rem 3rem 3rem;
    overflow: hidden;
    border: 1px solid #262626;
    border-radius: 0.25rem;
    background-color: #0a0a0a;

    & .map {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.35;
      pointer-events: none;
    }
  }

  .stats {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 1rem;
    }

    & .icon {
      width: 2.5rem;
      color: var(--color-accent);
    }

    & .value {
      margin-top: 1rem;
      font-size: clamp(2.5rem, 4.2vw, 3.75rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    & .label {
      margin-top: 0.6rem;
      color: #9e9e9e;
      text-transform: uppercase;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      letter-spacing: 0.06em;
    }
  }

  .more-stats {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
    margin: 3.5rem 0 0;
    padding: 1.5rem 0 0;
    list-style: none;
    border-top: 1px solid #333;

    & li {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      font-size: 1rem;
    }

    & .value {
      font-size: 1.75rem;
      font-weight: 600;
      letter-spacing: -0.03em;
    }

    & .label {
      color: #9e9e9e;
      text-transform: uppercase;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      letter-spacing: 0.06em;
    }
  }

  .open-source {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-top: 3rem;

    & p {
      max-width: 44rem;
      margin: 0;
      color: #bdbdbd;
      font-size: 1.15rem;
      font-weight: 300;
      line-height: 1.55;
    }

    & a {
      text-decoration: underline;
      text-decoration-color: #ffffff66;
      text-underline-offset: 0.2em;
    }

    & a:hover {
      text-decoration-color: var(--color-accent);
    }
  }

  /* comma four */

  .buy-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 4rem;
    align-items: center;

    & img {
      display: block;
      width: 100%;
      max-height: 26rem;
      object-fit: contain;
    }

    & h2 {
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-weight: 600;
      text-transform: lowercase;
      line-height: 1.2;
    }

    & p {
      margin: 0 0 1.5rem;
      font-size: 1.5rem;
      line-height: 1.4;
    }

    & .supported {
      margin-bottom: 2.5rem;
      color: #00000099;
      font-size: 1.2rem;
    }
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
    .e2e {
      grid-template-columns: minmax(0, 1.5fr) 3rem minmax(0, 0.9fr) 3rem minmax(0, 1.1fr);
    }

    .model {
      font-size: 1rem;
    }

    .featured {
      grid-template-columns: minmax(0, 1fr);
      gap: 1.5rem;
    }

    .tabs {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .safety-grid,
    .monitoring {
      grid-template-columns: minmax(0, 1fr);
      gap: 2.5rem;
    }

    .points {
      padding-top: 0;
    }

    .stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 3rem;
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

    .hero {
      padding-top: 2.5rem;
      padding-bottom: 5rem;
    }

    .hero-device img {
      max-height: 13rem;
    }

    .drives {
      margin-top: 6rem;
    }

    .op .intro {
      font-size: 1.1rem;
    }

    .e2e {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: none;
      row-gap: 1rem;
      max-width: 30rem;
      margin-top: 3.5rem;
    }

    .e2e .label,
    .e2e .cell,
    .e2e .arrow,
    .e2e figcaption {
      grid-row: auto;
      grid-column: 1;
    }

    .e2e figcaption {
      margin-top: 1rem;
    }

    .label {
      align-items: center;
      text-align: center;
    }

    .label .word {
      font-size: 3.5rem;
    }

    .label-model,
    .label-out {
      margin-top: 0.5rem;
    }

    .arrow {
      width: 1px;
      height: 2.5rem;
      margin: 0.5rem 0;
    }

    .arrow::after {
      left: -4px;
      right: auto;
      top: auto;
      bottom: -1px;
      transform: rotate(135deg);
    }

    .model {
      padding: 1.75rem 1rem;
    }

    .outputs {
      max-width: 20rem;
      margin: 0 auto;
    }

    .speed {
      text-align: center;
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

    .monitoring {
      margin-top: 4rem;
      padding-top: 3rem;
    }

    .stats-panel {
      padding: 2.5rem 1.25rem 2rem;
    }

    .stats {
      gap: 2.5rem 1rem;
    }

    .more-stats {
      grid-template-columns: minmax(0, 1fr);
      gap: 0.75rem;
      margin-top: 2.5rem;
    }

    .open-source {
      flex-direction: column;
      align-items: flex-start;
    }

    .buy-grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 2rem;
    }

    .buy-grid img {
      max-height: 16rem;
    }

    .buy-grid h2 {
      font-size: 2rem;
    }

    .buy-grid p {
      font-size: 1.25rem;
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
