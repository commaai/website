<script>
  import LinkButton from "$lib/components/LinkButton.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import Space from "$lib/components/Space.svelte";
  import EmailUpdatesForm from "$lib/components/EmailUpdates/EmailUpdatesForm.svelte";

  import DeviceImage from "$lib/images/products/comma-four/four_screen_on.png";

  import RoadIcon from "$lib/icons/features/road.svg?raw";
  import SteerIcon from "$lib/icons/features/steer.svg?raw";
  import CarIcon from "$lib/icons/features/car.svg?raw";
  import PeopleIcon from "$lib/icons/features/people.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import ProcessorIcon from "$lib/icons/features/processor.svg?raw";
  import ConnectivityIcon from "$lib/icons/features/connectivity.svg?raw";
  import DisplayIcon from "$lib/icons/features/display.svg?raw";
  import MemoryIcon from "$lib/icons/features/memory.svg?raw";
  import LocationIcon from "$lib/icons/features/location.svg?raw";

  import { vehicleCountText } from '$lib/constants/vehicles.js';
  import ReleaseNote from "$lib/components/ReleaseNote.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import { faq } from "$lib/constants/faq.svelte";

  import IntersectionVideo from "$lib/images/openpilot/lateral-intersection.mp4";
  import IntersectionPoster from "$lib/images/openpilot/lateral-intersection.jpg";
  import CurveVideo from "$lib/images/openpilot/lateral-curve.mp4";
  import CurvePoster from "$lib/images/openpilot/lateral-curve.jpg";
  import CruisePoster from "$lib/images/openpilot/acc-follow.jpg";
  import MonitoringVideo from "$lib/images/products/comma-four/driver-monitoring-demo.mp4";

  import CruiseVideo from "$lib/images/openpilot/acc-follow.mp4";
  import WarningVideo from "$lib/images/products/comma-four/confidence_ball.mp4";
  import CameraImage from "$lib/images/products/comma-four/four_back.png";

  const contributorsCount = 1000;

  export let data;
</script>

<section class="dark" id="about">
  <div class="container">
    <Grid columns={4}>
      <div class="stats-item">
        <div>{@html RoadIcon}</div>
        <span>300+ million</span>
        <span>Miles driven</span>
      </div>
      <div class="stats-item">
        <div>{@html SteerIcon}</div>
        <span>56%</span>
        <span>Miles driven are engaged</span>
      </div>
      <div class="stats-item">
        <div>{@html CarIcon}</div>
        <span>20,000+</span>
        <span>Active users</span>
      </div>
      <div class="stats-item">
        <div>{@html PeopleIcon}</div>
        <span>{Math.floor(contributorsCount / 10) * 10}+</span>
        <span>Contributors</span>
      </div>
    </Grid>
    <div class="headline">
      <h1>
        openpilot is an
        <a class="highlight" href="https://github.com/commaai/openpilot" target="_blank">open source</a>
        advanced driver assistance system that works on {vehicleCountText} car models of Toyota,
        Hyundai, Honda, and many other brands.
      </h1>
      <ul>
        <li><a href="#lane-centering">Automated Lane Centering</a></li>
        <li><a href="#adaptive-cruise-control">Adaptive Cruise Control</a></li>
        <li>Lane Change Assist</li>
        <li><a href="#driver-monitoring">Driver Monitoring (no wheel nags)</a></li>
        <li>Can drive for hours without intervention</li>
        <li>Open source and developed on GitHub</li>
      </ul>
    </div>
  </div>
</section>

<section class="light" id="driving-features">
  <div class="container">
    <header class="features-intro">
      <p class="eyebrow">Learned from real life</p>
      <h2>A better feel<br />for the road.</h2>
      <p>Stock driver assistance follows painted lines and fixed rules. openpilot learns from millions of miles of real human driving, so it drives where a person would — even when the lines don’t tell it what to do.</p>
      <p class="how-it-works">How it works: one neural network learns what the cameras see and how a person would steer, brake, and accelerate.</p>
    </header>
    <article class="lane-feature dark" id="lane-centering">
      <hgroup>
        <p>01 / Lane centering assist</p>
        <h2>Read the road.<br />Not just the lines.</h2>
      </hgroup>
      <p class="lane-intro">A natural line through the everyday moments that make driving feel human.</p>
      <div class="scenarios">
        <div class="scenario">
          <video src={IntersectionVideo} poster={IntersectionPoster} autoplay muted loop playsinline preload="metadata" aria-label="Through intersections"></video>
          <div class="scenario-copy">
            <h3>Through intersections</h3>
            <p><span>Stock systems</span> Painted lines disappear.</p>
            <p><strong>openpilot</strong> Keeps a natural path through.</p>
          </div>
        </div>
        <div class="scenario">
          <video src={CurveVideo} poster={CurvePoster} autoplay muted loop playsinline preload="metadata" aria-label="On curvy roads"></video>
          <div class="scenario-copy">
            <h3>On curvy roads</h3>
            <p><span>Stock systems</span> Fixed rules can feel rigid.</p>
            <p><strong>openpilot</strong> Follows the bend smoothly.</p>
          </div>
        </div>
        <div class="scenario">
          <svg viewBox="0 0 640 360" role="img" aria-label="Room for parked cars: illustrated driving path">
              <rect width="640" height="360" fill="#171b19" />
              <path d="M180 0V360 M460 0V360" stroke="#66706a" stroke-width="3" />
              <path d="M320 0V360" stroke="#89918c" stroke-width="3" stroke-dasharray="20 20" /><rect x="393" y="90" width="48" height="88" rx="8" fill="#818a84" /><rect x="400" y="110" width="34" height="40" fill="#222b25" />
              <path d="M390 380 C390 260 335 240 335 175 S390 70 390 -20" fill="none" stroke="#51ff00" stroke-width="5" />
              <rect x="367" y="270" width="46" height="78" rx="7" fill="#ecf1ed" />
              <text x="24" y="32" fill="#aab4ad" font-size="13" font-family="monospace">ILLUSTRATED SCENARIO</text>
            </svg>
          <div class="scenario-copy">
            <h3>Room for parked cars</h3>
            <p><span>Stock systems</span> Lane lines leave little room.</p>
            <p><strong>openpilot</strong> Makes space as you pass.</p>
          </div>
        </div>
        <div class="scenario">
          <svg viewBox="0 0 640 360" role="img" aria-label="No lines? Still a road.: illustrated driving path">
              <rect width="640" height="360" fill="#171b19" />
              <path d="M180 0V360 M460 0V360" stroke="#66706a" stroke-width="3" />
              
              <path d="M320 380V-20" fill="none" stroke="#51ff00" stroke-width="5" />
              <rect x="297" y="270" width="46" height="78" rx="7" fill="#ecf1ed" />
              <text x="24" y="32" fill="#aab4ad" font-size="13" font-family="monospace">ILLUSTRATED SCENARIO</text>
            </svg>
          <div class="scenario-copy">
            <h3>No lines? Still a road.</h3>
            <p><span>Stock systems</span> No lines to follow.</p>
            <p><strong>openpilot</strong> Finds the way you would.</p>
          </div>
        </div>
      </div>
    </article>
    <article class="driving-feature" id="adaptive-cruise-control">
      <div>
        <hgroup>
          <p>02</p>
          <h2>Adaptive cruise control</h2>
        </hgroup>
        <p>
          Brakes and accelerates the way a person would. openpilot eases off early and follows traffic smoothly. On supported cars, it also stops for traffic lights and stop signs.
        </p>
      </div>
      <video src={CruiseVideo} poster={CruisePoster} autoplay muted loop playsinline preload="metadata" aria-label="Driving with openpilot"></video>
    </article>
    <article class="driving-feature" id="driver-monitoring">
      <div>
        <hgroup>
          <p>03</p>
          <h2>Driver monitoring</h2>
        </hgroup>
        <p>
          Camera-based attention checks keep you engaged with the road. If you look away, openpilot alerts you. No wheel nagging.
        </p>
      </div>
      <video src={MonitoringVideo} autoplay muted loop playsinline preload="metadata" aria-label="Driver monitoring"></video>
    </article>
    <article class="driving-feature" id="forward-collision-warning">
      <div>
        <hgroup>
          <p>04</p>
          <h2>Forward collision warning</h2>
        </hgroup>
        <p>
          The same model predicts when the car ahead is about to brake hard and warns you early. Works on every supported car.
        </p>
      </div>
      <video src={WarningVideo} autoplay muted loop playsinline preload="metadata" aria-label="openpilot driving model visualization"></video>
    </article>
    <article class="driving-feature" id="dashcam">
      <div>
        <hgroup>
          <p>05</p>
          <h2>360° dashcam</h2>
        </hgroup>
        <p>
          Three cameras. One complete picture. Record what happens on the road and inside your car.
        </p>
      </div>
      <img src={CameraImage} loading="lazy" alt="Road-facing cameras on comma four" />
    </article>
  </div>
</section>

<section class="light" id="benefits">
  <div class="container">
    <article>
      <hgroup>
        <p>01</p>
        <h2>Makes driving chill</h2>
      </hgroup>
      <p>
        Currently, openpilot performs the functions of Adaptive Cruise Control
        (ACC) and Automated Lane Centering (ALC). openpilot can accelerate,
        brake automatically for other vehicles, and steer to follow the
        road/lane.
      </p>
      <p>
        Like other ACC and ALC systems, openpilot requires the driver to be alert,
        pay attention, and be ready to take over at all times.
        To assist the driver in maintaining alertness, openpilot includes a driver
        monitoring system that alerts when it detects driver distraction.
      </p>
      <p />
      <p>
        When used correctly, these features reduce your workload as a driver,
        and can make long drives relaxing instead of tedious.
      </p>
    </article>
    <article>
      <hgroup>
        <p>02</p>
        <h2>Connects to your car</h2>
      </hgroup>
      <p>
        openpilot works by connecting to your car's CAN network. Modern cars
        accept electronic steering, gas, and brake commands to allow for ADAS
        features. openpilot can use these commands to provide much better ADAS
        features than the car manufacturers can provide.
      </p>
    </article>
    <article>
      <hgroup>
        <p>03</p>
        <h2>Modern machine learning</h2>
      </hgroup>
      <p>
        openpilot contains a state-of-the-art neural network that understands
        the road scene and predicts where to drive. This neural network has
        learned to drive by watching the millions of miles of driving data
        openpilot has recorded. This makes openpilot exceptionally good at
        nuanced situations such as driving in areas with faded lanelines,
        different countries, and more.
      </p>
    </article>
    <article>
      <hgroup>
        <p>04</p>
        <h2>Open source and community supported</h2>
      </hgroup>
      <p>
        openpilot is developed by comma and by users like you. We welcome both
        pull requests and issues on
        <a class="highlight" href="https://github.com/commaai/openpilot" target="_blank">GitHub</a>.
        Bug fixes and new car ports are strongly encouraged. Check out the
        <a class="highlight" href="https://github.com/commaai/openpilot/blob/master/docs/CONTRIBUTING.md" target="_blank">contributing docs</a>.
      </p>
      <LinkButton href="https://github.com/commaai/openpilot">
        View on GitHub
      </LinkButton>
      <div class="release-notes">
        <h3>Latest Release Notes</h3>
        {#each data.releaseNotes as release}
          <ReleaseNote releaseNote={release} />
        {/each}
      </div>
    </article>
    <article>
      <hgroup>
        <p>05</p>
        <h2>Try openpilot on the comma four</h2>
      </hgroup>
      <p>
        Love it or return it. Every comma four comes with a 30-day money back
        trial.
      </p>
      <Grid columns={2} alignItems="center">
        <img src={DeviceImage} loading="lazy" alt="comma four device" />
        <div>
          <Grid columns={2}>
            <div class="feature-item">
              <div>{@html ThreeSixtyVisionIcon}</div>
              <span>360° vision<br />W/ 3 cameras</span>
            </div>
            <div class="feature-item">
              <div>{@html ProcessorIcon}</div>
              <span>Qualcomm snapdragon 845 MAX</span>
            </div>
            <div class="feature-item">
              <div>{@html ConnectivityIcon}</div>
              <span>LTE & WiFi</span>
            </div>
            <div class="feature-item">
              <div>{@html DisplayIcon}</div>
              <span>BEAUTIFUL<br />OLED display</span>
            </div>
            <div class="feature-item">
              <div>{@html MemoryIcon}</div>
              <span>CAN FD ENABLED</span>
            </div>
            <div class="feature-item">
              <div>{@html LocationIcon}</div>
              <span>High-precision GPS</span>
            </div>
          </Grid>
          <Space multiplier={3} />
          <LinkButton href="/shop/comma-four" fullWidth={true} style="primary">
            Buy now
          </LinkButton>
        </div>
      </Grid>
    </article>
    <article>
      <hgroup>
        <p>06</p>
        <h2>Proven on the road</h2>
      </hgroup>
      <p>
        Our 20,000+ users have driven over 300 million miles with a device
        running openpilot. Over 56% of those miles were driven by openpilot,
        with the driver supervising.
      </p>
    </article>
    <EmailUpdatesForm
      title="Keep up with openpilot"
      defaultCategory="releases"
    >
      <p>
        Get an email when a new version of openpilot is released.
      </p>
    </EmailUpdatesForm>
  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.openpilot} title="openpilot FAQ" />
  </div>
</section>

<style>
  .features-intro {
    padding: 4rem 0;
    max-width: 850px;
  }

  .features-intro h2,
  .lane-feature hgroup h2 {
    font-family: "Monument Extended", Inter, sans-serif;
    font-size: clamp(2.2rem, 4.5vw, 4rem);
    letter-spacing: -0.05em;
    line-height: 1.12;
    text-transform: none;
  }

  .features-intro > p {
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .features-intro .eyebrow,
  .lane-feature hgroup p {
    font-family: JetBrains Mono, monospace;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    opacity: 1;
  }

  .features-intro .how-it-works {
    font-size: 1rem;
    color: #666;
    max-width: 650px;
  }

  .lane-feature {
    background: #080a09;
    color: white;
    padding: 3.5rem;
    scroll-margin-top: 7rem;
  }

  .lane-feature hgroup p {
    color: #51ff00;
    margin-bottom: 1.5rem;
  }

  .lane-feature .lane-intro {
    color: #adb3af;
    font-size: 1.25rem;
    max-width: 560px;
    margin-bottom: 3rem;
  }

  .scenarios {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }

  .scenario {
    background: #151816;
    overflow: hidden;
  }

  .scenario video,
  .scenario svg {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .scenario-copy {
    padding: 1.5rem;
  }

  .scenario-copy h3 {
    font-size: 1.4rem;
    margin: 0 0 1.25rem;
    line-height: 1.2;
  }

  .scenario-copy p {
    font-size: 0.95rem;
    color: #c1c7c3;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .scenario-copy span,
  .scenario-copy strong {
    display: block;
    font-family: JetBrains Mono, monospace;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #929b95;
  }

  .scenario-copy strong {
    color: #51ff00;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .lane-feature {
      padding: 2rem 1.25rem;
      margin-left: -1.25rem;
      margin-right: -1.25rem;
    }

    .scenarios {
      grid-template-columns: 1fr;
    }

    .features-intro {
      padding: 2rem 0;
    }
  }

  #driving-features > .container > h2 {
    font-size: 2.5rem;
    margin-bottom: 4rem;
  }

  .driving-feature {
    scroll-margin-top: 7rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 3rem;
  }

  .driving-feature video,
  .driving-feature img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: contain;
    background: #f3f3f3;
  }

  .driving-feature:nth-of-type(even) > div {
    order: 2;
  }

  .headline a {
    color: inherit;
    text-underline-offset: 0.2em;
  }

  @media screen and (max-width: 768px) {
    .driving-feature {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .driving-feature:nth-of-type(even) > div {
      order: 0;
    }
  }

  .stats-item {
    display: flex;
    align-items: flex-start;
    flex-flow: column;
    color: white;

    & span:first-of-type {
      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
      font-size: 2rem;
      font-weight: 600;
    }

    & span:last-of-type {
      color: var(--color-muted);
      text-transform: uppercase;
      font-family: JetBrains Mono, monospace;
      font-size: 1rem;
      font-weight: 400;
    }

    @media screen and (max-width: 1024px) {
      & span:first-of-type {
        font-size: 1.5rem;
      }

      & span:last-of-type {
        font-size: 0.875rem;
      }
    }
  }

  .feature-item {
    display: flex;
    align-items: center;
    flex-flow: row;

    & div {
      border: 1px solid #000;
      width: 48px;
      padding: 0.375rem;
      display: inline-block;
      color: black;
    }

    & span {
      color: var(--color-muted);
      text-transform: uppercase;
      font-family: JetBrains Mono, monospace;
      font-size: 1rem;
      font-weight: 400;
      margin-left: 1rem;
    }
  }

  .headline {
    margin-top: 4rem;
    margin-bottom: 6rem;

    @media screen and (max-width: 768px) {
      & {
        margin-bottom: 4rem;
      }
    }

    & h1 {
      font-size: 2.5rem;
      line-height: 1.2;
    }

    & ul {
      padding-left: 0;
      list-style: none;

      & li {
        margin-bottom: 0.5rem;
        padding-left: 2rem;
        background: url("$lib/icons/ui/checkmark.svg?raw") left center no-repeat;
      }
    }

    @media screen and (max-width: 512px) {
      & h1 {
        font-size: 2rem;
      }

      & ul {
        padding-top: 1rem;

        & li {
          font-size: 1.25rem;
        }
      }
    }
  }

  article {
    margin-bottom: 6rem;

    & hgroup {
      & p {
        opacity: 0.5;
        font-family: JetBrains Mono, monospace;
        margin: 0 0 0.5rem;
        font-size: 1.5rem;
      }

      & h2 {
        font-weight: 600;
        font-size: 2.5rem;
        text-transform: lowercase;
        line-height: 1.2;
        margin-bottom: 1rem;
      }
    }

    & p {
      font-size: 1.5rem;
    }

    & h3 {
      margin-top: 4rem;
      margin-bottom: 1rem;
    }

    @media screen and (max-width: 512px) {
      margin-bottom: 4rem;

      & hgroup {
        & h2 {
          font-size: 2rem;
        }
      }

      & p {
        font-size: 1.25rem;
      }

      & .release-notes {
        width: 100%;
      }
    }
  }

  .release-notes {
    width: 80%;
  }
</style>
