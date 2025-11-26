<script>
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";
  import CheckmarkIcon from "$lib/icons/ui/checkmark.svg?raw";

  import { faq } from "$lib/constants/faq.svelte";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import ImmediateIcon from "$lib/icons/features/immediate.svg?raw";

  import CommaFourDeviceImage from "$lib/images/products/comma-four/four_screen_on.png";
  import CarHarnessImage from "$lib/images/products/car-harness/car-harness.jpg";

  import TrimImage from "$lib/images/setup/comma-four/trim.jpg";
  import Trim1Image from "$lib/images/setup/comma-four/trim-1.jpg";
  import Trim2Image from "$lib/images/setup/comma-four/trim-2.jpg";
  import Trim3Image from "$lib/images/setup/comma-four/trim-3.jpg";
  import Trim4Image from "$lib/images/setup/comma-four/trim-4.jpg";
  import WiresImage from "$lib/images/setup/comma-four/wires.jpg";
  import Wires1Image from "$lib/images/setup/comma-four/wires-1.jpg";
  import AlignImage from "$lib/images/setup/comma-four/align.jpg";
  import Mount1Image from "$lib/images/setup/comma-four/mount-1.jpg";
  import PressImage from "$lib/images/setup/comma-four/press.jpg";
  import ObdcImage from "$lib/images/setup/comma-four/obdc.jpg";
  import Plug2Image from "$lib/images/setup/comma-four/plug-2.jpg";
  import RemountImage from "$lib/images/setup/comma-four/remount.jpg";
  import CameraImage from "$lib/images/setup/comma-four/camera.jpg";
  import Camera1Image from "$lib/images/setup/comma-four/camera-1.jpg";
  import Plug1Image from "$lib/images/setup/comma-four/plug-1.jpg";
  import PlugImage from "$lib/images/setup/comma-four/plug.jpg";
  import StepSixImage from "$lib/images/setup/comma-3x/step-6.jpeg";
  import CommaPowerImage from "$lib/images/products/comma-power/comma-power.jpg";

  let selectedVehicle = undefined;
  const handleHarnessSelection = (value) => {
    selectedVehicle = value;
  }

  function getVideoEmbedSrc(videoLink) {
    const url = new URL(videoLink);
    if (url.hostname !== "youtu.be" && url.hostname !== "www.youtube.com") {
      console.warn("Video not supported", videoLink);
      return null;
    }
    const videoId = url.searchParams.get("v") || url.pathname.slice(1);
    return `https://www.youtube.com/embed/${videoId}?rel=0&controls=1&autoplay=0&mute=0`;
  }
</script>

<section class="light" id="installation-guide">
  <div class="container">
    <div class="header">
      <hgroup>
        <span style="font-size: 1.5rem; margin-bottom: 0.5rem;">comma four & comma 3X</span>
        <h2 style="font-size: 3rem; font-weight: 600;">Setup Guide</h2>
      </hgroup>
      <Grid columns={2} columnGap="5rem" rowGap="0" templateColumns="1.5fr 0.75fr" alignItems="start" size="large">
        <div class="title">
          <div class="media-container">
            <iframe
              src="https://www.youtube.com/embed/hrA3czvBo2w?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen=""
              title="setup video"
            ></iframe>
          </div>
          <div class="overview">
            <div>
              {@html RecordingsIcon}
              <span>5 steps</span>
            </div>
            <div class="divider" />
            <div>
              {@html ImmediateIcon}
              <span>15 min</span>
            </div>
          </div>
        </div>
        <div>
          <div class="parts-card">
            <div class="header">Parts:</div>
            <div class="contents">
              <div>
                <Grid rowGap={0} columnGap="1rem" alignItems="center" size="small">
                  <div class="content-header">
                    <img src={CommaFourDeviceImage} loading="lazy" alt="comma four" />
                    <span><a href="/shop/comma-four" target="_blank" class="highlight">comma four</a> or comma 3X</span>
                  </div>
                  <span class="muted">$999</span>
                </Grid>
              </div>
              <ul>
                <li>comma four</li>
                <li>OBD-C cable (1.5 ft)</li>
                <li>2 mounts</li>
              </ul>
            </div>
            <div class="contents">
              <div>
                <div class="content-header">
                  <img src={CarHarnessImage} loading="lazy" alt="car harness" />
                  <a href="/shop/car-harness" target="_blank" class="highlight">car harness</a>
                </div>
              </div>
              <ul>
                <li>car harness (harness box & connector)</li>
                <li>comma power</li>
              </ul>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  </div>
</section>

<section class="light" id="guide">
  <div class="container">
    <div class="card vehicle-notes">
      <div class="header">Customize Your Guide</div>
      <div class="contents">
        <p>Select your vehicle to get customized installation notes:</p>
        <HarnessSelector
          label="Select your vehicle"
          placeholder="Search for your vehicle"
          onChange={handleHarnessSelection}
          showGenericHarnesses={false}
          hideSupportNoteCard={true}
        />

        {#if selectedVehicle}
          <div class="setup-notes">
            <Grid templateColumns="1.25fr 0.75fr">
              {#if selectedVehicle.setupVideo}
                <div>
                  <p class="note-heading">Setup Video:</p>
                  <div class="media-container">
                    <iframe
                      src={getVideoEmbedSrc(selectedVehicle.setupVideo)}
                      frameborder="0"
                      allow="autoplay; encrypted-media"
                      title="{selectedVehicle.car} setup guide"
                    ></iframe>
                  </div>
                </div>
              {/if}
              {#if selectedVehicle.setupNotes.length > 0}
                <div>
                  <p class="note-heading">Setup Notes:</p>
                  <ul>
                    {#each selectedVehicle.setupNotes as note}
                      <li>{@html note}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
              {#if (selectedVehicle.setupNotes.length === 0) && !selectedVehicle.setupVideo}
                <div style="display: flex; align-items: center">
                  <div style="display: flex;">{@html CheckmarkIcon}</div>
                  <div style="margin-right: 0.5rem"/>
                  <p>Follow the guide below. There are no specific setup notes for your vehicle.</p>
                </div>
              {/if}
            </Grid>
          </div>
        {/if}
      </div>
    </div>

        <div class="step" id="step-1">
      <Badge style="dark">Step 1 <span class="muted">of 5</span></Badge>
      <h2>Remove the rearview mirror cover trim</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div class="image-grid">
          <img src={TrimImage} loading="lazy" alt="remove the rearview mirror cover trim" />
          <img src={Trim1Image} loading="lazy" alt="remove trim step 1" />
          <img src={Trim2Image} loading="lazy" alt="remove trim step 2" />
          <img src={Trim3Image} loading="lazy" alt="remove trim step 3" />
        </div>
        <p>
          Removal method varies by car.
          The durable plastic often requires a strong tug to pop it off on Hondas.
          Toyotas often need a slide outward.
          If you'd like to see how it's done, find a comma installation guide for your specific make on <a href="https://www.youtube.com/results?search_query=comma+install" class="highlight">YouTube</a>.
        </p>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-2">
      <Badge style="dark">Step 2 <span class="muted">of 5</span></Badge>
      <h2>Connect car harness into the camera</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div class="image-grid">
          <img src={CameraImage} loading="lazy" alt="unplug car's camera cable" />
          <img src={Camera1Image} loading="lazy" alt="release camera connector clip" />
          <img src={Plug1Image} loading="lazy" alt="plug car camera into harness" />
          <img src={PlugImage} loading="lazy" alt="plug harness into camera port" />
        </div>
        <ul>
          <li>Unplug the existing LKAS camera connector and plug it into the harness.</li>
          <li>Connect the other end of the harness back into the LKAS camera.</li>
          <li>
            Secure the harness – Find a spot for the harness box so the trim can still be installed over it.
            Peel off the adhesive sticker and attach the harness in place.
          </li>
        </ul>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-3">
      <Badge style="dark">Step 3 <span class="muted">of 5</span></Badge>
      <h2>Place mount high and centered on the windshield</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div class="image-grid">
          <div class="crop-wrapper">
            <img src={AlignImage} loading="lazy" alt="check mount alignment" />
          </div>
          <img src={Mount1Image} loading="lazy" alt="find a good spot for mount" />
          <img src={PressImage} loading="lazy" alt="press mount on windshield" />
        </div>
        <div>
          <ul>
            <li>Mounting prep – Clean the mounting area with the included alcohol wipe and let it dry.</li>
            <li>Vertical Positioning – Ensure there is enough room for the cable when the device is mounted, and that you can see the screen from a seated position.</li>
            <li>Horizontal Positioning – Ensure the mount is centered horizontally, otherwise it will not properly center in the lane.</li>
            <li>Adhere mount – Peel off the 3M tape's cover on the mount. Press firmly in the center of the mount, then the edges. Ensure no bubbles form.</li>
          </ul>
        </div>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-4">
      <Badge style="dark">Step 4 <span class="muted">of 5</span></Badge>
      <h2>Plug in OBD-C and mount the device</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div class="image-grid">
          <img src={ObdcImage} loading="lazy" alt="plug OBD-C cable into harness box" />
          <img src={Plug2Image} loading="lazy" alt="plug in comma four" />
          <img src={RemountImage} loading="lazy" alt="mount the device" />
        </div>
        <ul>
          <li>Plug the OBD-C cable into the harness box – Ensure the cable is fully seated.</li>
          <li>Plug the OBD-C cable into the comma four. Make sure the cable is all the way in.</li>
          <li>Mount the device – Ensure the device is fully seated into the mount.</li>
        </ul>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-5">
      <Badge style="dark">Step 5 <span class="muted">of 5</span></Badge>
      <h2>Reinstall the rearview mirror cover trim</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div class="image-grid">
          <img src={Wires1Image} loading="lazy" alt="tidy up wires" />
          <img src={Trim4Image} loading="lazy" alt="re-attach trim" />
          <img src={WiresImage} loading="lazy" alt="wire management" />
          <img src={TrimImage} loading="lazy" alt="reinstall trim" />
        </div>
        <ul>
          <li>Ensure the car harness fully fits inside the trim.</li>
          <li>Generally, it's best to have the OBD-C cable come out of the top.</li>
        </ul>
      </Grid>
    </div>

    <hr />
    <div class="step">
      <Badge style="dark">OPTIONAL STEP</Badge>
      <h2>Pair your device with comma connect</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div>
          <img src={StepSixImage} loading="lazy" alt="comma connect application logo" />
        </div>
        <div>
          <p>
            Pair your comma four with <a href="https://connect.comma.ai/" target="_blank" class="highlight">connect.comma.ai</a> on your phone to see your recorded drives.
          </p>
          <br />
          <LinkButton href="https://connect.comma.ai/" target="_blank" style="primary" fullWidth={true}>comma Connect</LinkButton>
        </div>
      </Grid>
    </div>

    <hr />
    <div class="step">
      <Badge style="dark">OPTIONAL STEP</Badge>
      <h2>Add the comma power</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div>
          <img src={CommaPowerImage} loading="lazy" alt="comma power" />
        </div>
        <div>
          <p>
            Installing the comma power is entirely optional and can be done at any time.
            Simply connect one end to your car's OBD-II port and the other to the harness box.
          </p>
          <p>
            With a comma power:
          </p>
          <ul>
            <li>The start and end of every drive are recorded.</li>
            <li>Your comma four remains powered and online while the car is off.</li>
            <li>Your comma four downloads updates while the car is off.</li>
          </ul>
        </div>
      </Grid>
    </div>

  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.devices} title="Frequently asked questions" />
  </div>
</section>

<style>
  #installation-guide {
    padding-bottom: 2rem;

    & .header {
      & hgroup {
        margin-bottom: 2rem;

        & h1 {
          margin: 0;
          font-size: 3rem;
        }

        & h2 {
          margin: 0.5rem 0 0 0;
          font-size: 2rem;
          font-weight: normal;
        }
      }

      & .media-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;

        & iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      & .overview {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin: 2rem 0;

        & div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        & span {
          margin-left: 1rem;
        }

        & .divider {
          width: 1px;
          height: 3rem;
          background-color: rgba(0, 0, 0, 0.2);
          margin: 0 2.5rem;
        }
      }

      & .parts-card {
        border: 1px solid #000;
        border-bottom: 0;
        margin-bottom: 1.5rem;

        & .header {
          font-size: 0.875rem;
          font-family: JetBrains Mono, monospace;
          text-transform: uppercase;
          color: #fff;
          background-color: #000;
          padding: 0.75rem 1rem;
        }

        & .contents {
          display: flex;
          flex-flow: column;
          align-items: start;
          justify-content: space-between;
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #000;

          & div {
            width: 100%;

            & .content-header {
              display: flex;
              align-items: center;
              justify-content: start;
              gap: 1rem;

              & img {
                min-width: 45px;
                max-width: 60px;
                object-fit: contain;
                border: 1px solid rgba(0, 0, 0, 0.12);
                padding: 0.5rem;
              }

              & span {
                white-space: nowrap;

                @media screen and (max-width: 480px) {
                  white-space: normal;
                }
              }
            }
          }

          & span {
            text-align: end;
          }

          & li {
            font-size: 1rem;
            text-wrap: balance;
          }
        }
      }
    }
  }

  .card {
    border: 1px solid #000;
    border-bottom: 0;
    margin-bottom: 4rem;

    & .header {
      font-size: 0.875rem;
      font-family: JetBrains Mono, monospace;
      text-transform: uppercase;
      color: #fff;
      background-color: #000;
      padding: 0.75rem 1rem;
    }

    & .contents {
      display: flex;
      flex-flow: column;
      align-items: start;
      justify-content: space-between;
      padding: 0.875rem 1rem;
      border-bottom: 1px solid #000;
    }
  }

  .step {
    & h2 {
      margin-top: 1rem;
    }

    & p, & li {
      font-size: 1.5rem;

      @media screen and (max-width: 1024px) {
        font-size: 1.25rem;
      }
    }

    & li {
      margin-bottom: 1rem;
    }

    & .card {
      margin-bottom: 1rem;
    }

    & .image-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.7rem;
      align-items: start;

      & img {
        width: 100%;
        height: auto;
      }

      & .crop-wrapper {
        overflow: hidden;
        position: relative;
        aspect-ratio: 1 / 1;

        & img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: top;
        }
      }
    }
  }

  #faq {
    margin-bottom: 2rem;
  }

  hr {
    margin: 2rem 0 3rem;
  }

  .vehicle-notes {
    margin-top: 1rem;
    font-size: 1.25rem;

    & p {
      margin: 0.25rem 0 0;
    }

    & .setup-notes {
      width: 100%;
      margin: 1rem 0 0.5rem;

      & .note-heading {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      & ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      & li {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
      }

      & a {
        color: #000;
        border-bottom: 2px solid #86ff4e;
        background-color: rgba(134, 255, 78, 0.15);
      }

      & .media-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */

        & iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
