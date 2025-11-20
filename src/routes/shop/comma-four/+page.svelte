<script>
  import ProductPage from "../[product]/+page.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import SetupGuide from "$lib/components/SetupGuide.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Space from "$lib/components/Space.svelte";

  import { faq } from "$lib/constants/faq.svelte";

  import FourImage from "$lib/images/products/comma-four/four_screen_on.png";
  import FourExploded from "$lib/images/products/comma-four/four-exploded.png";
  import OBDCCableImage from "$lib/images/products/obd-c-cable/obd-c-cable-four.png";
  import ReplacementMountsImage from "$lib/images/products/replacement-mounts/replacement-mounts-four.png";
  import CarBrandCollageImage from "$lib/images/car-brand-collage.jpg";

  import FourRemount from "$lib/images/products/comma-four/remount.jpg";
  import MemoryIcon from "$lib/icons/features/memory.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import ProcessorIcon from "$lib/icons/features/processor.svg?raw";
  import ConnectivityIcon from "$lib/icons/features/connectivity.svg?raw";
  import MoonIcon from "$lib/icons/features/moon.svg?raw";
  import DisplayIcon from "$lib/icons/features/display.svg?raw";
  import CableIcon from "$lib/icons/features/cable.svg?raw";
  import { vehicleCountText } from '$lib/constants/vehicles.js';
  import LinkArrow from "$lib/icons/link_arrow.svg?raw";

  export let data;
</script>

<ProductPage {data} />

<section class="light" id="description">
  <div class="container">

    <hr />

    <Grid rowGap="0" templateColumns="0.5fr 0.5fr">
      <img src={FourRemount} loading="lazy" alt="comma four device remounted on windshield">
      <div class="description">
        <h1>how it looks</h1>
          <p>
            comma 4 lives on your windshield, barely peeking out under the rearview mirror. It’s designed to fit seamlessly into any car, like it was always meant to be there.
          </p>

        <div class="bottom">
          <a href="#tech-specs" class="link-away down">
            tech specs
            {@html LinkArrow}
          </a>
            <a href="/setup" class="link-away">
            setup guide
            {@html LinkArrow}
          </a>
        </div>
      </div>
    </Grid>

    <hr />

    <div class="description">
      <h1>Get more with Prime.</h1>
      <p>
        comma connect is an app that lets you manage your openpilot experience. Recordings of your drives can be uploaded and stored for 3 days. Subscribe to connect Prime to keep your drives accessible for 1 year.
      </p>
      <div class="bottom">
        <a href="https://connect.comma.ai" class="link-away">
          learn more
          {@html LinkArrow}
        </a>
      </div>
    </div>

    <hr />

    <Grid rowGap="0" templateColumns="0.5fr 0.5fr">
        <img src={FourExploded} loading="lazy" alt="comma four exploded view">
<!--      <img src={FourRemount} loading="lazy" alt="comma four device remounted on windshield">-->
      <div class="description" id="tech-specs">
        <h1>tech specs</h1>
        <div class="specs">
<!--        Case-->
<!--        -->
<!--        164 grams-->
<!--        2.9 inches wide-->
<!--        High temp PC-ABS automotive plastic-->
<!--        -->
<!--        -->
<!--        -->
<!--        -->
<!--        Cameras-->
<!--        -->
<!--        4mp FCAM (idk fov)-->
<!--        4mp wide angles (idk fov) x2-->
<!--        IR LED for attention monitoring at night-->
<!--        -->
<!--        -->
<!--        -->
<!--        -->
<!--        Components-->
<!--         Qualcomm Snapdragon 845 MAX-->
<!--        CAN FD integrated, STM32H7-->
<!--        anodized aluminum heatsink-->
<!--        noctua a4x10 fan-->
<!--        -->
<!--        -->
<!--        -->
<!--        -->
<!--        Storage-->
<!--        -->
<!--        128 GB Sandisk SSD (idk)-->
<!--        -->
<!--        -->
<!--        -->
<!--        -->
<!--        Screen-->
<!--        -->
<!--        300 ppi OLED, 536 x 240 resolution-->
<!--        -->
<!--        -->
<!--        -->
<!--        -->
<!--        Connectivity-->
<!--        -->
<!--        Quectel (idk)-->
<!--        lte-->
<!--        wi-fi-->
<!--        high-precision gps-->
<!--        -->
<!--        -->
<!--        -->
<!--        -->
<!--        Ports-->
<!--        -->
<!--        OBD-C port (usb-C w/ CAN)-->
<!--        USB 3.1 Gen 2 port, VID 0x3801-->

          <div class="title">Case</div>
          <div class="content">
            164 grams<br>
            2.9 inches wide<br>
            High temp PC-ABS automotive plastic
          </div>

          <div class="title">Cameras</div>
          <div class="content">
            4mp FCAM (idk fov)<br>
            4mp wide angles (idk fov) x2<br>
            IR LED for attention monitoring at night
          </div>

          <div class="title">Components</div>
          <div class="content">
            Qualcomm Snapdragon 845 MAX<br>
            CAN FD integrated, STM32H7<br>
            anodized aluminum heatsink<br>
            noctua a4x10 fan
          </div>

          <div class="title">Storage</div>
          <div class="content">
            128 GB Sandisk SSD (idk)
          </div>

          <div class="title">Screen</div>
          <div class="content">
            300 ppi OLED, 536 x 240 resolution
          </div>

          <div class="title">Connectivity</div>
          <div class="content">
            Quectel (idk)<br>
            lte<br>
            wi-fi<br>
            high-precision gps
          </div>

          <div class="title">Ports</div>
          <div class="content">
            OBD-C port (usb-C w/ CAN)<br>
            USB 3.1 Gen 2 port, VID 0x3801
          </div>


        </div>
      </div>
    </Grid>

<!--    <Grid rowGap="0" templateColumns="0.5fr 0.5fr">-->
<!--      <div></div>-->
<!--      <a href="/setup" class="link-away">-->
<!--          setup guide-->
<!--          {@html LinkArrow}-->
<!--        </a>-->
<!--    </Grid>-->

  </div>
</section>

<section class="light" id="fine-print">
  <div class="container">
    <Faq topic={faq.devices} title="comma four FAQ" />
    <Space multiplier={3} />
    <Faq topic={faq.trial} />

<!--    <Grid templateColumns="0.5fr 1.25fr">-->
    <br>
      <div class="fine-print-copy">
        <h2>fine print</h2>
        <strong>30-Day Return</strong>
        <p>
          If for any reason you are dissatisfied with anything purchased at the <a target="_blank" href="/" class="highlight">comma.ai</a> shop,
          ship it back within 30 days for a full refund. <a target="_blank" href="https://shop.comma.ai/a/returns" class="highlight">comma.ai/returns</a>
          <br>
          If you intend to upstream support for a new car model, we may approve an extended return window.
          Open a ticket request at <a target="_blank" href="https://shop.comma.ai/a/returns" class="highlight">comma.ai/support</a>.
        </p>
        <strong>Shipping</strong>
        <p>
          Free Rush (UPS 2nd Day Air) shipping (US only); signature confirmation required.
          International shipping is a $30 flat rate; customs/duties/taxes are between you and your country.
          Please see FAQ for more information.
        </p>
        <strong>Warranty</strong>
        <p>
          1-year limited warranty against hardware defects. Open and repair the comma four at your own risk.
          comma is not responsible for damages that may occur while repairing devices. We cannot provide shipping return labels for international devices.
          Any damage on arrival must be reported to comma support within 14 days of delivery.
        </p>
        <strong>Software</strong>
        <p>
          The comma four does not ship with software capable of controlling a car.
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
<!--    </Grid>-->

  </div>
</section>

<style>
  h1 {
    font-size: 96px;
    font-weight: 400;
  }

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
    margin: 3rem calc(-50vw + 50%);
    width: 100vw;
    height: 2px;
  }

  .link-away {
    font-size: 48px;
    text-decoration: underline;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 12px;

    @media screen and (max-width: 1300px) {
      font-size: 20px;
    }
  }

  .link-away :global(svg) {
    /*width: 48px;*/
    /*height: 48px;*/

    @media screen and (max-width: 1300px) {
      width: 20px;
      height: 20px;
    }
  }

  .link-away.down :global(svg) {
    transform: rotate(180deg);
  }

  .max-gradient {
    background: linear-gradient(to bottom left, #8027FC, #CFA9FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: bold;
  }

  #description {
    & .description {
      display: flex;
      flex-direction: column;
      height: 100%;

      & .specs {
      /*  jet brains mono 20px. everything is uppercase styling*/
        font-family: JetBrains Mono, monospace;
        font-size: 20px;
        text-transform: uppercase;

        & .title {
          font-weight: bold;
          margin-bottom: 1rem;
        }

        & .content {
          margin-bottom: 4rem;
        }
      }

      & .bottom {
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        margin-top: auto;

        @media screen and (max-width: 1300px) {
          gap: 1rem;
        }
      }

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
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    /*background-color: #fafafa;*/

    & h2 {
      font-size: 48px;
      font-weight: 400;
      letter-spacing: -0.06em;
    }

    & strong, & p {
      color: black;
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
