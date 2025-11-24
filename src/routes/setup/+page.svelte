<script>
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";
  import CheckmarkIcon from "$lib/icons/ui/checkmark.svg?raw";

  import { faq } from "$lib/constants/faq.svelte";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import ImmediateIcon from "$lib/icons/features/immediate.svg?raw";

  import CommaFourDeviceImage from "$lib/images/products/comma-four/four_screen_on.png";
  import CarHarnessImage from "$lib/images/products/car-harness/car-harness.jpg";

  import PowerImage from "$lib/images/setup/comma-four/power.jpg";
  import TrimImage from "$lib/images/setup/comma-four/trim.jpg";
  import AlignImage from "$lib/images/setup/comma-four/align.jpg";
  import CameraImage from "$lib/images/setup/comma-four/camera.jpg";
  import Camera1Image from "$lib/images/setup/comma-four/camera-1.jpg";
  import Camera2Image from "$lib/images/setup/comma-four/camera-2.jpg";
  import MountImage from "$lib/images/setup/comma-four/mount.jpg";
  import Mount1Image from "$lib/images/setup/comma-four/mount-1.jpg";
  import Mount2Image from "$lib/images/setup/comma-four/mount-2.jpg";
  import Mount3Image from "$lib/images/setup/comma-four/mount-3.jpg";
  import Mount5Image from "$lib/images/setup/comma-four/mount-5.jpg";
  import ObdImage from "$lib/images/setup/comma-four/obd.jpg";
  import Obd1Image from "$lib/images/setup/comma-four/obd-1.jpg";
  import ObdcImage from "$lib/images/setup/comma-four/obdc.jpg";
  import PlugImage from "$lib/images/setup/comma-four/plug.jpg";
  import Plug1Image from "$lib/images/setup/comma-four/plug-1.jpg";
  import Plug2Image from "$lib/images/setup/comma-four/plug-2.jpg";
  import Power1Image from "$lib/images/setup/comma-four/power-1.jpg";
  import PressImage from "$lib/images/setup/comma-four/press.jpg";
  import Press1Image from "$lib/images/setup/comma-four/press-1.jpg";
  import RemountImage from "$lib/images/setup/comma-four/remount.jpg";
  import Trim1Image from "$lib/images/setup/comma-four/trim-1.jpg";
  import Trim2Image from "$lib/images/setup/comma-four/trim-2.jpg";
  import Trim3Image from "$lib/images/setup/comma-four/trim-3.jpg";
  import Trim4Image from "$lib/images/setup/comma-four/trim-4.jpg";
  import UnmountImage from "$lib/images/setup/comma-four/unmount.jpg";
  import Unmount1Image from "$lib/images/setup/comma-four/unmount-1.jpg";
  import WiresImage from "$lib/images/setup/comma-four/wires.jpg";
  import Wires1Image from "$lib/images/setup/comma-four/wires-1.jpg";
  import Wires2Image from "$lib/images/setup/comma-four/wires-2.jpg";

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
              <span>19 steps</span>
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
                <Grid rowGap={0} columnGap="1rem" alignItems="center" size="small" wrapMode="none">
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
      <Badge style="dark">Step 1 <span class="muted">of 19</span></Badge>
      <h2>turn off your car</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={PowerImage} loading="lazy" alt="turn off your car" />
        <p>Ensure your vehicle is powered off before taking any additional steps.</p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-2">
      <Badge style="dark">Step 2 <span class="muted">of 19</span></Badge>
      <h2>remove the rearview mirror cover trim</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={TrimImage} loading="lazy" alt="remove the rearview mirror cover trim" />
          <img src={Trim1Image} loading="lazy" alt="removal step 1" />
          <img src={Trim2Image} loading="lazy" alt="removal step 2" />
          <img src={Trim3Image} loading="lazy" alt="removal step 3" />
        </div>
        <p>
          Removal method varies by car. Car trim plastics are often held in place by a mix of clips and hooks, some may require a firm tug to release. Angling the mirror out of the way is recommended. If you'd like to see how it's done, find a comma installation guide for your specific make on <a href="https://www.youtube.com/results?search_query=comma+install" class="highlight">YouTube</a>.<br><br>This is the hardest part, so take your time!
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-3">
      <Badge style="dark">Step 3 <span class="muted">of 19</span></Badge>
      <h2>unplug the car's camera cable</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={CameraImage} loading="lazy" alt="unplug the car's camera cable" />
          <img src={Camera1Image} loading="lazy" alt="camera unplug step 1" />
          <img src={Camera2Image} loading="lazy" alt="camera unplug step 2" />
        </div>
        <p>
          Each vehicle's connector is slightly different, but all of them are held in place with a clip on the plug. If you feel like the cable isn't easy to pull out, make sure to press down all the way and hold to release the clip while pulling the connector out.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-4">
      <Badge style="dark">Step 4 <span class="muted">of 19</span></Badge>
      <h2>plug the comma harness into the camera port</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={PlugImage} loading="lazy" alt="plug the comma harness into the camera port" />
        <p>
          Plugs only fit in one way! If you feel unexpected resistance, check to see if you are plugging in the right orientation.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-5">
      <Badge style="dark">Step 5 <span class="muted">of 19</span></Badge>
      <h2>plug the car's camera wires into the other end of the harness box</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={Plug1Image} loading="lazy" alt="plug the car's camera wires" />
        <p>
          The other end of the harness box has a corresponding connector for your car to plug into, make sure you hear a click when you plug each wire in. This completes the connection between the car camera and the harness box
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-6">
      <Badge style="dark">Step 6 <span class="muted">of 19</span></Badge>
      <h2>plug the OBD-C cable into the harness box</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={ObdcImage} loading="lazy" alt="plug the OBD-C cable" />
        <p>
          Some car kits include a long OBD-C cable for easier wire routing. Either end can be plugged in, however it is not recommended to use a non-official comma cable or plug a non-comma device into the harness box.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-7">
      <Badge style="dark">Step 7 <span class="muted">of 19</span></Badge>
      <h2>plug the comma power into the harness box</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={Power1Image} loading="lazy" alt="plug the comma power" />
        <p>
          The comma power allows your comma four to stay powered on if the car is off. This means no boot up time before each drive, and automatic software updates in the background. It is optional for driving functionality, but recommended.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-8">
      <Badge style="dark">Step 8 <span class="muted">of 19</span></Badge>
      <h2>connect the comma power to your car</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={Obd1Image} loading="lazy" alt="connect the comma power" />
          <img src={ObdImage} loading="lazy" alt="OBD port connection" />
        </div>
        <p>
          The comma power plugs into your car's OBD port, usually found in the driver footwell. It includes a thin and flexible cable to make it easy to push underneath trim and liner without first detaching those from your car.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-9">
      <Badge style="dark">Step 9 <span class="muted">of 19</span></Badge>
      <h2>re-attach the rearview mirror cover trim</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={Trim4Image} loading="lazy" alt="re-attach the cover trim" />
        <p>
          Attach the cover plastic the same way you removed it, just backwards. You can route the OBD-C cable however you like, but leave some slack to make it easier to plug into your comma four next. Some of our cars have the cable wrapped around the mirror arm while others are routed through the trim; clean or messy, it's up to you :)
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-10">
      <Badge style="dark">Step 10 <span class="muted">of 19</span></Badge>
      <h2>attach a mount to your comma four</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={MountImage} loading="lazy" alt="attach a mount" />
          <img src={Mount5Image} loading="lazy" alt="mount attachment" />
        </div>
        <p>Use two thumbs to press the sides down and push up. It should slide on easily with a tight fit.</p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-11">
      <Badge style="dark">Step 11 <span class="muted">of 19</span></Badge>
      <h2>plug in your comma four</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={Plug2Image} loading="lazy" alt="plug in your comma four" />
        <p>Do not peel off the red tape protector until you're ready to mount after the next step.</p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-12">
      <Badge style="dark">Step 12 <span class="muted">of 19</span></Badge>
      <h2>find a good spot for your comma four</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={Mount1Image} loading="lazy" alt="find a good spot" />
          <img src={Mount2Image} loading="lazy" alt="positioning" />
        </div>
        <p>
          The comma four must be mounted in the center of the windshield and high up. Hold it up to see how it fits with your car's trim.<br><br>Make sure the spot you like leaves enough room above the comma four to make it easy to unplug!
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-13">
      <Badge style="dark">Step 13 <span class="muted">of 19</span></Badge>
      <h2>stick your comma four to the windshield</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={Mount3Image} loading="lazy" alt="stick to windshield" />
        <p>
          When you're happy with the position, peel the red layer off the mount, and stick your comma four in place. Firmly press it upward to properly stick the mount to the windshield.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-14">
      <Badge style="dark">Step 14 <span class="muted">of 19</span></Badge>
      <h2>unplug your comma four and remove it from the mount</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={UnmountImage} loading="lazy" alt="unplug comma four" />
          <img src={Unmount1Image} loading="lazy" alt="remove from mount" />
        </div>
        <p>Slide your comma four up towards your rearview mirror to unmount it.</p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-15">
      <Badge style="dark">Step 15 <span class="muted">of 19</span></Badge>
      <h2>check your mount alignment</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={AlignImage} loading="lazy" alt="check mount alignment" />
        <p>
          It's easiest to check your mount's alignment from outside of your car. You want to make sure its centered and level. We recommend doing this before the next step.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-16">
      <Badge style="dark">Step 16 <span class="muted">of 19</span></Badge>
      <h2>press your mount on</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={PressImage} loading="lazy" alt="press your mount on" />
          <img src={Press1Image} loading="lazy" alt="pressing mount" />
        </div>
        <p>
          Firmly press up on your mount to fully attach the tape. Check for air bubbles from the outside to see which spots need more pressure.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-17">
      <Badge style="dark">Step 17 <span class="muted">of 19</span></Badge>
      <h2>re-place your comma four</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={RemountImage} loading="lazy" alt="re-place your comma four" />
        <p>Slide your comma four back on to the mount and plug it in. Almost done, last step is cleanup.</p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-18">
      <Badge style="dark">Step 18 <span class="muted">of 19</span></Badge>
      <h2>tidy up the wires</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={WiresImage} loading="lazy" alt="tidy up the wires" />
          <img src={Wires1Image} loading="lazy" alt="wire management 1" />
          <img src={Wires2Image} loading="lazy" alt="wire management 2" />
        </div>
        <p>
          The included cable ties can be helpful for wire management, and the harness box has an additional sticky pad if you have room to mount it underneath the trim (some cars are a tight fit, and others have lots of space).<br><br>We find it's usually easy to gently stuff the wires under the trim when everything's attached.
        </p>
      </Grid>
    </div>
    <hr />

    <div class="step" id="step-19">
      <Badge style="dark">Step 19 <span class="muted">of 19</span></Badge>
      <h2>start and set up your comma four</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={PowerImage} loading="lazy" alt="start and set up" />
        <p>You just upgraded your car to a whole new experience. Now you can setup your comma four in a few seconds and go for a drive!</p>
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

      & .title {
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
