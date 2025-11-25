<script>
  import ProductPage from "../[product]/+page.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import SetupGuide from "$lib/components/SetupGuide.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import Space from "$lib/components/Space.svelte";

  import { faq } from "$lib/constants/faq.svelte";

  import FourImage from "$lib/images/products/comma-four/four_screen_on.png";
  import OBDCCableImage from "$lib/images/products/obd-c-cable/obd-c-cable-four.png";
  import ReplacementMountsImage from "$lib/images/products/replacement-mounts/replacement-mounts-four.png";
  import CarBrandCollageImage from "$lib/images/car-brand-collage.jpg";
  import CoolingImage from "$lib/images/products/comma-four/cooling.png";
  import DeviceFrameImage from "$lib/images/products/comma-four/four_front.png";

  import SettingsVideo from "$lib/images/products/comma-four/settings.mp4";
  import EngageDisengageVideo from "$lib/images/products/comma-four/engage_disengage.mp4";
  import SteeringArcVideo from "$lib/images/products/comma-four/steering_arc.mp4";
  import ConfidenceBallVideo from "$lib/images/products/comma-four/confidence_ball.mp4";

  import MemoryIcon from "$lib/icons/features/memory.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import ProcessorIcon from "$lib/icons/features/processor.svg?raw";
  import ConnectivityIcon from "$lib/icons/features/connectivity.svg?raw";
  import MoonIcon from "$lib/icons/features/moon.svg?raw";
  import DisplayIcon from "$lib/icons/features/display.svg?raw";
  import CableIcon from "$lib/icons/features/cable.svg?raw";
  import LocationIcon from "$lib/icons/features/location.svg?raw";
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  export let data;
</script>

<ProductPage {data} />

<section class="light" id="description">
  <div class="container">
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Meet the comma four</h2>
      <div class="description">
        <p>
          comma four is our next generation hardware. It packs the same compute, sensor suite, and functionality as comma 3X into a package one-fifth the size, making it the ideal form factor for your windshield.
        </p>
        <p>
          It runs <a class="highlight" href="/openpilot">openpilot</a>, which can drive for hours without driver action.
        </p>
      </div>
    </Grid>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>In the Box</h2>
      <div class="box-contents">
        <div>
          <img src={FourImage} loading="lazy" alt="comma four device">
          <p>comma four</p>
        </div>
        <div>
          <img src={OBDCCableImage} loading="lazy" alt="2ft OBD-C cable">
          <p>2ft OBD-C cable</p>
        </div>
        <div>
          <img src={ReplacementMountsImage} loading="lazy" alt="mount">
          <p>2 mounts</p>
        </div>
      </div>
    </Grid>
    <hr />
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>On-device Storage</h2>
      <div>
        <p>comma four includes on-board storage to store your drives.</p>
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
            <div>10 hours of footage</div>
          </div>
        </div>
        <p>
          Want your video footage saved for longer? – Sign up for comma prime for 1 year of cloud video storage.
        </p>
        <p>
          comma four includes one free month of comma prime.
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
            Dual-cam 360° vision and a narrow cam to see far-away objects
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html ProcessorIcon}</div>
            <span>Processor</span>
          </div>
          <div class="contents">
            <span>Qualcomm Snapdragon 845 <span class="max-gradient">MAX</span><br><br>Max cooling for quiet sustained peak performance.</span>
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html LocationIcon}</div>
            <span>Sensors</span>
          </div>
          <div class="contents">
            <ul>
              <li>3D Accelerometer</li>
              <li>3D Gyroscope</li>
              <li>High-precision GPS</li>
              <li>Microphone</li>
            </ul>
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
            </ul>
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html MoonIcon}</div>
            <span>Night-Vision</span>
          </div>
          <div class="contents">
            IR LED for interior night-vision monitoring
          </div>
        </div>
        <div class="spec-card">
          <div class="header">
            <div>{@html DisplayIcon}</div>
            <span>Display</span>
          </div>
          <div class="contents">
            300 PPI OLED display
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
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Snapdragon 845 <span class="max-gradient">MAX</span></h2>
      <div class="cooling-section">
        <img src={CoolingImage} loading="lazy" alt="comma four cooling system">
      </div>
    </Grid>
    <hr />
    <div style="width: 0; height: 0;" id="ui"/>
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Expressive New Interface</h2>
      <div class="ui-grid">
        <div class="ui-card">
          <div class="device-container">
            <img src={DeviceFrameImage} alt="comma four device" class="device-frame" />
            <video loop autoplay muted playsinline class="screen-overlay" src={SettingsVideo}></video>
          </div>
          <p>Configure comma four entirely on the device. No app, subscription, or account required.</p>
        </div>
        <div class="ui-card">
          <div class="device-container">
            <img src={DeviceFrameImage} alt="comma four device" class="device-frame" />
            <video loop autoplay muted playsinline class="screen-overlay" src={EngageDisengageVideo}></video>
          </div>
          <p>comma four wakes up when you engage, and hibernates when you disengage.</p>
        </div>
        <div class="ui-card">
          <div class="device-container">
            <img src={DeviceFrameImage} alt="comma four device" class="device-frame" />
            <video loop autoplay muted playsinline class="screen-overlay" src={SteeringArcVideo}></video>
          </div>
          <p>As openpilot approaches its steering limits, the steering arc grows to warn you.</p>
        </div>
        <div class="ui-card">
          <div class="device-container">
            <img src={DeviceFrameImage} alt="comma four device" class="device-frame" />
            <video loop autoplay muted playsinline class="screen-overlay" src={ConfidenceBallVideo}></video>
          </div>
          <p>As openpilot's confidence in its ability to understand the scene goes up, the confidence ball rises and turns green.</p>
        </div>
      </div>
    </Grid>
    <hr />
    <SetupGuide
      productName="comma four"
      title="Setup Guide"
      estimatedMinutes={15}
      link="/setup"
      image={FourImage}
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
            <h2>comma four is compatible with {vehicleCountText} cars</h2>
          </hgroup>
          <p>
            A supported vehicle is one that just works when you install a comma device.
            All supported cars provide a better experience than any stock system.
          </p>
          <LinkButton href="/vehicles" style="secondary" fullWidth={false}>View all {vehicleCountText} cars</LinkButton>
        </div>
        <img src={CarBrandCollageImage} loading="lazy" alt="collage of some supported car brands" />
      </Grid>
    </div>
    <div class="compatibility">
      <Grid>
        <img src={FourImage} loading="lazy" alt="comma four device" />
        <div>
          <hgroup>
            <span>Software</span>
            <h2>Works with openpilot</h2>
          </hgroup>
          <p>
            comma four ships without software installed, so you need to install software.
            It is compatible with <a href="/openpilot" class="highlight">openpilot</a> and a wide variety of community forks.
          </p>
          <LinkButton href="/openpilot" style="secondary" fullWidth={false}>openpilot</LinkButton>
        </div>
      </Grid>
    </div>
    <h2 class="guarantee">
      Try our 30-day money-back trial and see why 92% of buyers keep their comma four and why Consumer Reports rated us as the
      <a href="https://data.consumerreports.org/wp-content/uploads/2020/11/consumer-reports-active-driving-assistance-systems-november-16-2020.pdf" class="highlight">top driver assistance system.</a>
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
          <strong>PayPal Pay Later</strong>
          <p>
            Save offer within PayPal account prior to purchase here: <a href="https://www.paypal.com/us/digital-wallet/ways-to-pay/buy-now-pay-later" target="_blank" class="highlight">https://www.paypal.com/us/digital-wallet/ways-to-pay/buy-now-pay-later</a>. Expires 12/8/25. 20% on up to max $1,250 spend per transaction (max 25K points or $250). 1.5B points available in total for this promo. See <a href="https://www.paypal.com/promoterms" target="_blank" class="highlight">paypal.com/promoterms</a>. Points can be redeemed for cash and more. Terms and exclusions apply. See <a href="https://www.paypal.com/rewardsterms" target="_blank" class="highlight">paypal.com/rewardsterms</a>.
          </p>
          <p>
            Pay in 4 is available to consumers upon approval for purchases of $30 to $1,500. Pay in 4 is currently not available to residents of MO. Offer availability depends on the merchant and also may not be available for certain recurring, subscription services. When applying, a soft credit check may be needed, but will not affect your credit score. You must be 18 years old or older to apply: PayPal, Inc.: Loans to CA residents are made or arranged pursuant to a CA Financing Law License. GA Installment Lender Licensee, NMLS #910457. RI Small Loan Lender Licensee. NM residents: Find more disclosures related to Pay in 4.
          </p>
          <p>
            Pay Monthly is subject to consumer credit approval and eligibility. In store single-use card is valid for one purchase and must be used within 24 hours of loan approval. Fixed APR is 9.99-35.99%. Terms and rates vary based on purchase amount and your credit. For example, a $200 purchase can be paid at 26% APR in 3 monthly payments ($69.56/mo.; $8.68 interest; $208.68 total of payments). A $600 purchase can be paid at 26% APR in 6 monthly payments ($107.76/mo.; $46.57 interest; $646.57 total of payments) or 12 monthly payments ($57.33/mo.; $88.01 interest; $688.01 total of payments). A $1,500 purchase can be paid at 26% APR in 24 monthly payments ($80.77/mo; $438.47 interest; $1,938.47 total of payments). Payments may change based on shipping, taxes, updates to your purchase, or missed payments. Availability depends on the merchant and may not be available for subscriptions or recurring payments. Pay Monthly is currently not available to residents of AK, CT, HI or WA. You must be 18 years old or older to apply. Missed payments may have an impact on your credit score. The lender for Pay Monthly is WebBank. PayPal, Inc. (NMLS #910457): RI Loan Broker Licensee. VT Loan Solicitation Licensee. VT residents: THIS IS A LOAN SOLICITATION ONLY. PAYPAL, INC. IS NOT THE LENDER. INFORMATION RECEIVED WILL BE SHARED WITH ONE OR MORE THIRD PARTIES IN CONNECTION WITH YOUR LOAN INQUIRY. THE LENDER MAY NOT BE SUBJECT TO ALL VERMONT LENDING LAWS. THE LENDER MAY BE SUBJECT TO FEDERAL LENDING LAWS.
          </p>
      </div>
    </Grid>
    <Faq topic={faq.devices} title="comma four FAQ" />
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

  .max-gradient {
    background: linear-gradient(to bottom left, #8027FC, #CFA9FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: bold;
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

  .ui-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .ui-card {
    & .device-container {
      position: relative;
      display: inline-block;
      width: 100%;
      margin-bottom: 1rem;
    }

    & .device-frame {
      display: block;
      width: 100%;
      height: auto;
    }

    & .screen-overlay {
      position: absolute;
      left: 23.21%;
      top: 63.97%;
      width: 40.21%;
      height: 25.80%;
      mix-blend-mode: screen;
      z-index: 2;
    }

    & p {
      margin: 0;
      font-size: 1.25rem;
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

    .ui-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
