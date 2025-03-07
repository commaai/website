<script>
  import ProductPage from "../[product]/+page.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import Accordion from "$lib/components/Accordion.svelte";
  import Badge from "$lib/components/Badge.svelte";
  import MailingListForm from "$lib/components/MailingListForm.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import SetupGuide from "$lib/components/SetupGuide.svelte";
  import CommunityBanner from "$lib/components/CommunityBanner.svelte";
  import Slideshow from "$lib/components/Slideshow.svelte";

  import CommaBodyImage from "$lib/images/comma-body.png";
  import CommaBodyHeightImage from "$lib/images/comma-body-height.png";
  import CommaBodyWinkImage from "$lib/images/comma-body-wink.gif";
  import CommaBodyScreenImage from "$lib/images/comma-body-screen.jpg";
  import CommaBodyBaseImage from "$lib/images/comma-body-base.jpg";
  import CommaBodyInternalsImage from "$lib/images/comma-body-internals.jpg";
  import CommaBodyAssemblyImage from "$lib/images/comma-body-assembly.jpeg";

  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import DialsIcon from "$lib/icons/features/dials.svg?raw";
  import UbuntuIcon from "$lib/icons/features/ubuntu.svg?raw";
  import CommandLineIcon from "$lib/icons/features/command-line.svg?raw";

  export let data;
</script>

<section class="light" id="overview">
  <div class="container">
    <h1>
      The body is a robotics dev kit that can run <a href="https://github.com/commaai/openpilot" class="highlight">openpilot</a>,
      open source software with over a million hours of usage in the field.
    </h1>
    <img src={CommaBodyHeightImage} loading="lazy" alt="comma body height comparison" width="424px" />
    <h1 style="text-wrap: balance;">
      We believe that in order to solve AI, you must be embedded in the real world.
    </h1>
    <img src={CommaBodyWinkImage} loading="lazy" alt="comma body screen with winking animation" width="70%" />
  </div>
</section>

<section class="dark" id="features">
  <div class="container">
    <div class="features">
      <h1>The body is human scale, and has a human usable development environment.</h1>
      <div class="slideshow">
        <Slideshow images={[CommaBodyScreenImage, CommaBodyBaseImage, CommaBodyInternalsImage]} />
      </div>
      <div class="item">
        <Accordion style="dark">
          <div class="label" slot="label">
            {@html ThreeSixtyVisionIcon}
            <span>Sensorium streaming</span>
          </div>
          <div class="details" slot="content">
            The <a href="http://comma.ai/shop/products/three" target="_blank" class="highlight muted">comma 3X</a> has 3 cameras, broadcast with sub 100 ms latency through an H265 encoder.
            Onboard, it has a Kalman filter running at 100Hz integrating the IMU and camera odometry to determine it's 3-DoF position.
            With the addition of a little <a href="https://www.youtube.com/watch?v=7Hlb8YX2-W8" target="_blank" class="highlight muted">SLAM</a>,
            it will be easy to get 6-DoF that exceeds the precision of VR headsets.
            It also integrates with <a href="https://github.com/commaai/plotjuggler" target="_blank" class="highlight muted">Plotjuggler</a> for plotting and debugging.
            All the tools for openpilot development work on the body.
          </div>
        </Accordion>
      </div>
      <div class="item">
        <Accordion style="dark">
          <div class="label" slot="label">
            {@html DialsIcon}
            <span>Precise motor control</span>
          </div>
          <div class="details" slot="content">
            The body base has <a href="https://github.com/commaai/body" target="_blank" class="highlight muted">open source firmware</a>
            directly controlling two 150W sensored brushless motors, allowing instant torque.
            And since they have hall effect sensors, you have precise wheel odometry without an encoder that can slip.
            It uses an industry standard CAN bus for all communication,
            has an <a href="https://blog.comma.ai/working-with-comma-a-guide-for-car-companies/" target="_blank" class="highlight muted">OBD-C connector</a>,
            and appears to the comma 3X like a car.
        </div>
        </Accordion>
      </div>
      <div class="item">
        <Accordion style="dark">
          <div class="label" slot="label">
            {@html UbuntuIcon}
            <span>Runs Ubuntu 20.04</span>
          </div>
          <div class="details" slot="content">
            The comma 3X runs Ubuntu with a normal SSH server.
            It's responsive enough to develop on, including with VS Code remote.
            No dealing with cross compilation, downloading firmware, and stupid variants of Linux like Yocto that dev kits love to run.
            It's full apt-get ready Ubuntu; git, vim, tmux all included.
          </div>
        </Accordion>
      </div>
      <div class="item">
        <Accordion style="dark">
          <div class="label" slot="label">
            {@html CommandLineIcon}
            <span>Open source software</span>
          </div>
          <div class="details" slot="content">
            The comma body runs our open source software, <a href="https://github.com/commaai/body" target="_blank" class="highlight muted">openpilot</a>.
            From openpilot’s perspective, the comma body is a car.
            It runs the same camera and logging software, so we’ll be able to learn from the fleet of bodies in the same way we learn from our fleet of cars.
          </div>
        </Accordion>
      </div>
    </div>
  </div>
</section>

<section class="light" id="technical-specs">
  <div class="container">
    <div class="technical-specs">
      <h1>Technical Specs</h1>
      <div class="chart">
        <Grid columns={3} wrapMode="single"> 
          <div class="body-assembly">
            <img src={CommaBodyAssemblyImage} loading="lazy" alt="comma body assembly" width="70%" />
          </div>
          <div>
            <div class="header">
              <Badge style="dark">Dimensions</Badge>
            </div>
            <div class="spec">
              <div>dimensions</div>
              <span class="muted">6.5" L x 1' 3.5" W x 4' 8" H</span>
              <span class="muted">(16.5cm x 39.5cm x 142.3cm)</span>
            </div>
            <div class="spec">
              <div>weight</div>
              <span class="muted">18lbs / 8.16kg</span>
            </div>
            <div class="spec">
              <div>maximum speed</div>
              <span class="muted">1 m/s</span>
            </div>
            <div class="spec">
              <div>motors</div>
              <span class="muted">2 x 150W</span>
            </div>
          </div>
          <div>
            <div class="header">
              <Badge style="dark">Power</Badge>
            </div>
            <div class="spec">
              <div>battery capacity</div>
              <span class="muted">100Wh (Li-ion)</span>
            </div>
            <div class="spec">
              <div>nominal battery voltage</div>
              <span class="muted">25.2V</span>
            </div>
            <div class="spec">
              <div>typical runtime (joystick control)</div>
              <span class="muted">~2 hours</span>
            </div>
            <div class="spec">
              <div>standby time (balancing)</div>
              <span class="muted">~6-7 hours</span>
            </div>
            <div class="spec">
              <div>charger</div>
              <span class="muted">29.4V 2A</span>
            </div>
            <div class="spec">
              <div>time to charge</div>
              <span class="muted">~2 hours</span>
              <br />
              <span class="muted">Can be charged while powered on and balancing.</span>
            </div>
          </div>
        </Grid>
      </div>
      <div class="mailing-list">
        <Badge style="dark">Follow along</Badge>
        <h1>Get body updates</h1>
        <div class="form">
          <MailingListForm label="Email" />
        </div>
      </div>
    </div>
  </div>
</section>

<ProductPage {data} />

<section class="light" id="description">
  <div class="container">
    <Grid templateColumns="0.5fr 1.25fr" rowGap="0">
      <h2>Overview</h2>
      <div class="description">
        <h3>What is the comma body?</h3>
        <p>
          comma body is “the future of people.” You buy a comma body, buy a comma 3X (the head), attach the comma 3X to the body, and watch it come to life.
        </p>
        <p>
          We believe that in order to solve AI, for most peoples’ definition, you must be embedded in the real world.
          We define AI as a machine that can do every task at least as well as a human.
          And in order to do human tasks, it helps a lot to have a human-like body.
          The comma body is the beginning of that journey.
        </p>
        <p>
          Today, it’s a mobile platform for the comma 3X, but we will be building a knee and arms for it.
          Like everything we do, we try to distill the problem down to its essence, so unlike some companies, we aren’t focused on the humanoid shape.
          Wheels are a fine form of locomotion for cooking and cleaning, the dream tasks of the comma body.
          Two arms, a knee, and a comma 3X should complete a comma person (sold separately, the knee and arm may come in the future).
        </p>
        <h3>What software does it run?</h3>
        <p>
          The comma body runs openpilot! From openpilot’s perspective, the comma body is a car.
          It runs the same camera and logging software, so we’ll be able to learn from the fleet of bodies in the same way we learn from our fleet of cars.
        </p>
        <p>
          At launch, the software will balance the body (using the same localizer as the car!) and allow you to drive it around via web interface.
          Shortly we’ll add video streaming to that web interface, allowing you to drive your body outside line of sight.
          We’d also like to add a VR app to drive the body from a first person view, this will be needed by the time we ship the arms.
        </p>
        <p>
          Once we start getting data back from our body fleet, we can train models.
          The first model we will train (jointly with the driving model!) is a posenet, allowing inside out position tracking.
          When this model is shipped, the localizer will change from 3-DoF to 6-DoF.
          And once the dead reckoning is similar quality to what we have on the cars, adding a SLAM system will be very simple to allow drift free localization in your environment.
        </p>
        <p>
          Read more: <a href="https://blog.comma.ai/commabody/" target="_blank" class="highlight">Launching the comma body</a>
        </p>
        <p>
          We recommend purchasing a <a href="/shop/comma-3x" target="_blank" class="highlight">comma 3X</a> from the comma Shop to operate the body.
        </p>
        <p>
          comma body software: <a href="https://github.com/commaai/body" target="_blank" class="highlight">GitHub</a>
        </p>
        <NoteCard title="Note">
          comma body shouldn’t go anywhere you couldn’t go on a hoverboard, so no stairs, etc.
        </NoteCard>
      </div>
    </Grid>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>In the Box</h2>
      <div>
        <ul>
          <li>comma body kit (base, rails, and hardware)</li>
          <li>1 29.4V 2A charger</li>
          <li>1 mount [compatible with the comma 3X (not included)]</li>
          <li>1 USB-C 6.6ft 90 deg cable</li>
          <li>1 set of wheels</li>
          <li>1 helmet</li>
        </ul>
      </div>
    </Grid>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Tech Specs</h2>
      <div>
        <ul>
          <li>
            <strong>Dimensions:</strong>
            6.5" L x 1' 3.5" W x 4' 8" H (16.5cm x 39.5cm x 142.3cm)
          </li>
          <li>
            <strong>Weight:</strong>
            Device: 18 lbs (8 kg), Charger: 1 lb (0.5 kg)
          </li>
          <li>
            <strong>Motors:</strong>
            2 x 150W
          </li>
          <li>
            <strong>Battery charge time:</strong>
            Device charges in approximately 2 hours when powered off using the included charger. Can be charged while powered on and balancing.
          </li>
          <li>
            <strong>Battery type:</strong>
            Lithium-Ion rechargeable battery, 25.2V 100Wh
          </li>
          <li>
            <strong>Height when assembled:</strong>
            4' 8”(142.24cm)
          </li>
        </ul>
      </div>
    </Grid>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Fine Print</h2>
      <div class="fine-print-copy">
        <strong>30-Day Return</strong>
        <p>
          If for any reason you are dissatisfied with anything purchased at the comma.ai shop, ship it back within 30 days for a full refund.
          <a target="_blank" href="https://shop.comma.ai/a/returns" class="highlight">comma.ai/returns</a>
        </p>
        <strong>Shipping</strong>
        <p>
          Free US shipping; we ship with UPS and signature confirmation.
          This item cannot be shipped internationally, but hopefully this will change in the near future.
          We do not currently offer expedited shipping. – Orders are typically fulfilled during the week of purchase.
        </p>
        <strong>Warranty</strong>
        <p>1-year limited warranty against hardware defects.</p>
      </div>
    </Grid>
    <hr />
    <SetupGuide
      productName="comma body"
      title="Assembly Instructions"
      stepCount={8}
      estimatedMinutes={40}
      link="/setup/comma-body"
      image={CommaBodyImage}
    />
  </div>
</section>

<section class="dark" id="links">
  <div class="container">
    <CommunityBanner />
  </div>
</section>

<style>
  p {
    font-size: 1.25rem;
  }

  hr {
    margin: 3rem 0;
  }

  h1 {
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.4;

    @media screen and (max-width: 768px) {
      font-size:2rem;
    }
  }

  #overview {
    text-align: center;

    & img {
      display: block;
      margin: 6rem auto;

      @media screen and (max-width: 768px) {
        margin: 3rem auto;
      }
    }
  }

  .features {
    & h1 {
      text-align: center;
    }

    & .slideshow {
      margin-bottom: 5rem;
      color: white;
      height: 570px;

      @media screen and (max-width: 480px) {
        & {
          height: 200px;
        }
      }

      @media screen and (max-width: 1024px) {
        & {
          height: 350px;
        }
      }
    }

    & .item {
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.85);

      & .label {
        font-size: 1.2rem;
        font-family: JetBrains Mono, monospace;
        font-weight: 400;
        text-transform: uppercase;
        padding: 1rem 0;
        display: flex;
        align-items: center;

        & span {
          margin-left: 1rem;
        }
      }

      & .details {
        max-width: 90%;
        font-size: 1.2rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
    }
  }

  #technical-specs {
    border-bottom: 1px solid #000;
    margin-bottom: 3rem;

    & .technical-specs {
      & h1 {
        text-align: center;
      }

      & img {
        display: block;
      }

      & .chart {
        margin: 4rem auto;

        & .body-assembly img {
          margin: 0 auto 2rem;
          max-width: 50%;
        }
      }

      & .header {
        margin-bottom: 1rem;
      }

      & .spec {
        padding-bottom: 1.5rem;

        & span {
          display: block;
        }
      }
    }

    & .mailing-list {
      display: flex;
      flex-direction: column;
      align-items: center;

      & .form {
        width: 45ch;
        color: black;
      }

      @media screen and (max-width: 480px) {
        & .form {
          width: 100%;
        }
      }
    }
  }

  #description {
    & h3 {
      font-weight: 600;
    }

    & h3:first-of-type {
      margin-top: 1rem;
    }

    & li {
      font-size: 1.25rem;
    }

    @media screen and (max-width: 1024px) {
      & {
        margin-bottom: 3rem;
      }
    }

    & .fine-print-copy {
      padding: 1rem 3rem;
      background-color: #fafafa;

      & strong + p {
        margin-top: 0.5rem;
      }
    }
  }
</style>
