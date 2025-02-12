<script>
  import ProductPage from "../[product]/+page.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import SetupGuide from "$lib/components/SetupGuide.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Space from "$lib/components/Space.svelte";

  import { faq } from "$lib/constants/faq.svelte";

  import DeviceVideoWebm from "$lib/videos/comma-3x.webm";
  import DeviceVideoMp4 from "$lib/videos/comma-3x.mp4";

  import Comma3XImage from "$lib/images/device.png";
  import Comma3XGlowImage from "$lib/images/device-glow.png";
  import Comma3XProductImage from "$lib/images/products/comma-3x/comma-3x-promo.jpg";
  import OBDCCableImage from "$lib/images/products/obd-c-cable/obd-c-right-cable.jpg";
  import ReplacementMountsImage from "$lib/images/products/replacement-mounts/replacement-mounts-3x.png";
  import CarBrandCollageImage from "$lib/images/car-brand-collage.jpg";

  import MemoryIcon from "$lib/icons/features/memory.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import ProcessorIcon from "$lib/icons/features/processor.svg?raw";
  import ConnectivityIcon from "$lib/icons/features/connectivity.svg?raw";
  import MoonIcon from "$lib/icons/features/moon.svg?raw";
  import DisplayIcon from "$lib/icons/features/display.svg?raw";
  import CableIcon from "$lib/icons/features/cable.svg?raw";

  export let data;
</script>

<ProductPage {data} />

<section class="light" id="description">
  <div class="container">
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Meet the comma 3X</h2>
      <div class="description">
        <p>
          The comma 3X is custom hardware designed to live in your car, and purpose built to run openpilot. The comma 3X has three beautiful HDR cameras, two cameras to watch the road and one night-vision camera to see inside the car.
        </p>
        <p>
          Besides cameras, the comma 3X has a suite of connectivity and sensors including cellular LTE, Wi-Fi, an IMU, high-precision GPS, and microphones.
        </p>
      </div>
    </Grid>
    <div class="mobile-hero">
      <video autoplay muted loop webkit-playsinline playsinline disableRemotePlayback>
        <source src={DeviceVideoWebm} type="video/webm" />
        <source src={DeviceVideoMp4} type="video/mp4" />
      </video>
      <hgroup>
        <h1>comma 3X</h1>
        <h2>Make driving chill</h2>
      </hgroup>
    </div>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>In the Box</h2>
      <div class="box-contents">
        <div>
          <img src={Comma3XProductImage} loading="lazy" alt="comma 3X device">
          <p>comma 3X</p>
        </div>
        <div>
          <img src={OBDCCableImage} loading="lazy" alt="1.5ft right-angle OBD-C cable">
          <p>1.5 ft right-angle OBD-C cable</p>
        </div>
        <div>
          <img src={ReplacementMountsImage} loading="lazy" alt="mount">
          <p>2 standard mounts (some cars ship with 8 degree mounts. Details
            <a
              href="https://github.com/commaai/openpilot/blob/master/docs/CARS.md#supported-cars"
              target="_blank" class="highlight">here</a
            >.)
          </p>
        </div>
      </div>
    </Grid>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>On-device Storage</h2>
      <div>
        <p>comma 3X includes on-board storage to store your drives.</p>
        <div class="spec-card">
          <div class="header">
            <div>{@html MemoryIcon}</div>
            <span>Storage</span>
          </div>
          <div class="contents">
            <hgroup>
              <strong>128<span class="unit">GB</span></strong>
              <span>built in storage</span>
            </hgroup>
            <div>~4.5 hours of footage</div>
          </div>
        </div>
        <p>
          Want your video footage saved for longer? – Sign up for <a href="/connect" class="highlight">comma prime</a> for 1 year of cloud video storage.
        </p>
        <p>
          comma 3X includes one free month of comma prime.
          To claim your free prime trial, log into <a href="https://connect.comma.ai/" target="_blank" class="highlight">comma connect</a>.
          Once paired, you can see your recorded drives, SSH into your device from anywhere, and more.
        </p>
      </div>
    </Grid>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Tech Specs</h2>
      <div>
        <div class="spec-card">
          <div class="header">
            <div>{@html ThreeSixtyVisionIcon}</div>
            <span>Cameras</span>
          </div>
          <div class="contents">
            Three 1080p cameras w/ 140 dB of dynamic range: dual-cam 360° vision and a narrow cam to see far-away objects
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html ProcessorIcon}</div>
            <span>Processor</span>
          </div>
          <div class="contents">
            Qualcomm Snapdragon 845
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html MemoryIcon}</div>
            <span>Can FD Enabled</span>
          </div>
          <div class="contents">
            Supports CAN FD vehicles without extra hardware
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html MemoryIcon}</div>
            <span>Storage</span>
          </div>
          <div class="contents">
            128GB built in storage
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html ConnectivityIcon}</div>
            <span>Connectivity</span>
          </div>
          <div class="contents">
            <ul>
              <li>LTE</li>
              <li>Wi-Fi</li>
              <li>High-Precision GPS</li>
            </ul>
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html MoonIcon}</div>
            <span>Night-Vision</span>
          </div>
          <div class="contents">
            IR LEDs for interior night-vision monitoring
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html DisplayIcon}</div>
            <span>Display</span>
          </div>
          <div class="contents">
            2160x1080 Beautiful OLED display
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html CableIcon}</div>
            <span>Ports</span>
          </div>
          <div class="contents">
            <ul>
              <li>OBD-C port (USB-C w/ CAN)</li>
              <li>USB 3.1 Gen 2 port</li>
            </ul>
          </div>
        </div>
      </div>
    </Grid>
    <hr />
    <SetupGuide
      productName="comma 3X"
      title="Setup Guide"
      stepCount={7}
      estimatedMinutes={15}
      link="/setup/comma-3x"
      image={Comma3XImage}
    />
  </div>
</section>

<section class="dark" id="compatibility">
  <div class="container">
    <div class="compatibility">
      <Grid>
        <div>
          <hgroup>
            <span>Car harness</span>
            <h2>comma 3X is compatible with 275+ cars</h2>
          </hgroup>
          <p>
            A supported vehicle is one that just works when you install a comma device.
            All supported cars provide a better experience than any stock system.
          </p>
          <LinkButton href="/vehicles" style="secondary" fullWidth={false}>View all 275+ cars</LinkButton>
        </div>
        <img src={CarBrandCollageImage} loading="lazy" alt="collage of some supported car brands" />
      </Grid>
    </div>
    <div class="compatibility">
      <Grid>
        <img src={Comma3XGlowImage} loading="lazy" alt="comma 3X device" />
        <div>
          <hgroup>
            <span>Software</span>
            <h2>Works with openpilot</h2>
          </hgroup>
          <p>
            comma 3X ships without software installed, so you need to install software.
            It is compatible with <a href="/openpilot" class="highlight">openpilot</a> and works with a wide variety of community supported forks.
          </p>
          <LinkButton href="/openpilot" style="secondary" fullWidth={false}>Openpilot</LinkButton>
        </div>
      </Grid>
    </div>
    <h2 class="guarantee">
      Try our 30-day money-back trial and see why 92% of buyers keep their comma 3X and why Consumer Reports rated us as the
      <a href="https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf" class="highlight">top ADAS system.</a>
    </h2>
  </div>
</section>

<section class="light" id="fine-print">
  <div class="container">
    <Grid templateColumns="0.5fr 1.25fr">
      <h2>Fine Print</h2>
      <div class="fine-print-copy">
          <strong>30-Day Return</strong>
          <p>
            If for any reason you are dissatisfied with anything purchased at the <a target="_blank" href="/" class="highlight">comma.ai</a> shop,
            ship it back within 30 days for a full refund. <a target="_blank" href="https://shop.comma.ai/a/returns" class="highlight">comma.ai/returns</a>
          </p>
          <p>
            If you intend to upstream support for a new car model, we may approve an extended return window.
            Open a ticket request at <a target="_blank" href="https://shop.comma.ai/a/returns" class="highlight">comma.ai/support</a>.
          </p>
          <strong>Shipping</strong>
          <p>
            Free shipping via UPS (US only); signature confirmation required.
            International shipping is a $30 flat rate; customs/duties/taxes are between you and your country.
            Please see FAQ for more information.
          </p>
          <strong>Affirm</strong>
          <p>
            Your rate will be based on credit, and is subject to an eligibility check.
            Payment options through Affirm are provided by these lending partners: <a href="http://affirm.com/lenders" target="_blank" class="highlight">affirm.com/lenders</a>.
            Options depend on your purchase amount, and a down payment may be required.
          </p>
          <strong>Warranty</strong>
          <p>
            1-year limited warranty against hardware defects. Open and repair the comma 3X at your own risk.
            comma is not responsible for damages that may occur while repairing devices. We cannot provide shipping return labels for international devices.
            Any damage on arrival must be reported to comma support within 14 days of delivery.
          </p>
          <strong>Software</strong>
          <p>
            The comma 3X does not ship with software capable of controlling a car.
            Open source software can be installed separately.
          </p>
          <strong>Windshield installation</strong>
          <p>
            Before using the device on your windshield, check the state and local laws and ordinances where you drive.
            Some state laws prohibit or restrict the placement of objects on the windshield of a motor vehicle.
            IT IS THE USER'S RESPONSIBILITY TO MOUNT THE DEVICE IN COMPLIANCE WITH ALL APPLICABLE LAWS AND ORDINANCES.
            Always mount your device in a location that does not obstruct the driver's view of the road.
            comma does not assume any responsibility for any fines, penalties, or damages that may be incurred as a result
            of any state or local law or ordinance relating to the use of your comma device.
          </p>
      </div>
    </Grid>
    <Faq topic={faq.devices} title="comma 3X FAQ" />
    <Space multiplier={3} />
    <Faq topic={faq.trial} />
  </div>
</section>

<style>
  h2 {
    font-size: 1.875rem;
    font-weight: 600;
  }

  p {
    font-size: 1.25rem;
  }

  a {
    color: #000;
  }


  hr {
    margin: 3rem 0;
  }

  #description {
    & .description {
      & p:first-of-type {
        margin-top: 0;
      }

      & p:last-of-type {
        margin-bottom: 0;
      }
    }

    @media screen and (max-width: 1024px) {
      & {
        margin-bottom: 3rem;
      }
    }

    & .box-contents {
      display: flex;
      flex-wrap: wrap;
      text-align: center;

      & > div {
        width: 300px;
        margin-bottom: 2rem;

        & img {
          max-height: 150px;
        }

        & p {
          margin: 0 2rem;
        }
      }
    }

    & .spec-card {
      border: 1px solid #000;
      margin-bottom: 1.5rem;

      & .header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #000;

        & div {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: black;
          color: white;
          width: 48px;
          height: 48px;

          & svg {
            width: 36px;
            height: 36px;
            color: white;
          }
        }

        & span {
          font-family: JetBrains Mono, monospace;
          font-size: 0.875rem;
          font-weight: 400;
          text-transform: uppercase;
          margin-left: 1rem;
        }
      }

      & .contents {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.875rem 1rem;

        & hgroup {
          & strong {
            display: block;
            font-size: 1.25rem;
            font-weight: 600;
          }

          & .unit {
            font-size: 0.875rem;
            text-transform: uppercase;
          }
        }

        & li {
          font-size: 1rem;
        }
      }
    }
  }

  hgroup {
    & span {
      font-family: JetBrains Mono, monospace;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    & h2 {
      font-size: 2.5rem;
      font-weight: 600;
      line-height: 1.2;
    }
  }

  .compatibility {
    margin-bottom: 5rem;

    @media screen and (max-width: 768px) {
      & {
        margin-bottom: 5rem;
      }
    }

    & hgroup {
      & h2 {
        text-wrap: balance;
      }

      & span {
        text-transform: uppercase;
      }
    }

    & p, & p > a {
      color: white;
    }
  }

  .guarantee {
    font-size: 3rem;
    line-height: 1.25;

    & a {
      color: white;
    }
  }

  .fine-print-copy {
    padding: 1.5rem;
    background-color: #fafafa;

    & strong, & p {
      color: #545458;
      font-size: 0.875rem;
      line-height: 1.25;
    }

    & strong + p {
      margin-top: 0.25rem;
    }
  }

  .mobile-hero {
    display: none;
    position: relative;
    color: white;

    & hgroup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;

      text-align: center;
      text-transform: uppercase;

      & h1 {
        color: white;
        text-transform: uppercase;
        font-family:
          Monument Extended Black,
          sans-serif;
        margin-bottom: 1rem;
      }

      & h2 {
        color: white;
        font-family: JetBrains Mono, monospace;
        font-weight: 400;
        font-size: 1rem;
      }
    }

    & video {
      width: 100%;
      height: 40vh;
      object-fit: cover;
      margin: 2rem 0;
    }
  }

  @media screen and (max-width: 768px) {
    .mobile-hero {
      display: block;
    }

    .guarantee {
      font-size: 2rem;
    }
  }
</style>
