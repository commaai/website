<script>
  import Grid from "$lib/components/Grid.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import SetupStep from "$lib/components/SetupStep.svelte";

  import { faq } from "$lib/constants/faq.svelte";

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
</script>

<section class="light" id="installation-guide">
  <div class="container">
    <div class="header">
      <Grid columns={2} columnGap="5rem" rowGap="0" templateColumns="1.5fr 0.75fr" size="large">
        <div class="title">
          <hgroup>
            <h1>setup guide</h1>
          </hgroup>
        </div>
      </Grid>
    </div>
  </div>
</section>
 
<section class="light" id="guide">
  <div class="container">
    <SetupStep
      stepNumber={1}
      images={[PowerImage]}
      header="turn off your car"
      body="Ensure your vehicle is powered off before taking any additional steps."
    />
    <SetupStep
      stepNumber={2}
      images={[TrimImage, Trim1Image, Trim2Image, Trim3Image]}
      header="remove the rearview mirror cover trim"
      body="Removal method varies by car. Car trim plastics are often held in place by a mix of clips and hooks, some may require a firm tug to release. Angling the mirror out of the way is recommended. If you'd like to see how it's done, find a comma installation guide for your specific make on <a href='https://www.youtube.com/results?search_query=comma+install' class='highlight'>YouTube</a>.<br><br>This is the hardest part, so take your time!"
    />
    <SetupStep
      stepNumber={3}
      images={[CameraImage, Camera1Image, Camera2Image]}
      header="unplug the car's camera cable"
      body="Each vehicle's connector is slightly different, but all of them are held in place with a clip on the plug. If you feel like the cable isn't easy to pull out, make sure to press down all the way and hold to release the clip while pulling the connector out."
    />
    <SetupStep
      stepNumber={4}
      images={[PlugImage]}
      header="plug the comma harness into the camera port"
      body="Plugs only fit in one way! If you feel unexpected resistance, check to see if you are plugging in the right orientation."
    />
    <SetupStep
      stepNumber={5}
      images={[Plug1Image]}
      header="plug the car’s camera wires into the other end of the harness box"
      body="The other end of the harness box has a corresponding connector for your car to plug into, make sure you hear a click when you plug each wire in. This completes the connection between the car camera and the harness box"
    />
    <SetupStep
      stepNumber={6}
      images={[ObdcImage]}
      header="plug the OBD-C cable into the harness box"
      body="Some car kits include a long OBD-C cable for easier wire routing. Either end can be plugged in, however it is not recommended to use a non-official comma cable or plug a non-comma device into the harness box."
    />
    <SetupStep
      stepNumber={7}
      images={[Power1Image]}
      header="plug the comma power into the harness box"
      body="The comma power allows your comma four to stay powered on if the car is off. This means no boot up time before each drive, and automatic software updates in the background. It is optional for driving functionality, but recommended."
    />
    <SetupStep
      stepNumber={8}
      images={[Obd1Image, ObdImage]}
      header="connect the comma power to your car"
      body="The comma power plugs into your car’s OBD port, usually found in the driver footwell. It includes a thin and flexible cable to make it easy to push underneath trim and liner without first detaching those from your car."
    />
    <SetupStep
      stepNumber={9}
      images={[Trim4Image]}
      header="re-attach the rearview mirror cover trim"
      body="Attach the cover plastic the same way you removed it, just backwards. You can route the OBD-C cable however you like, but leave some slack to make it easier to plug into your comma four next. Some of our cars have the cable wrapped around the mirror arm while others are routed through the trim; clean or messy, it's up to you :)"
    />
    <SetupStep
      stepNumber={10}
      images={[MountImage, Mount5Image]}
      header="attach a mount to your comma four"
      body="Use two thumbs to press the sides down and push up. It should slide on easily with a tight fit."
    />
    <SetupStep
      stepNumber={11}
      images={[Plug2Image]}
      header="plug in your comma four"
      body="Do not peel off the red tape protector until you're ready to mount after the next step."
    />
    <SetupStep
      stepNumber={12}
      images={[Mount1Image, Mount2Image]}
      header="find a good spot for your comma four"
      body="The comma four must be mounted in the center of the windshield and high up. Hold it up to see how it fits with your car's trim.<br><br>Make sure the spot you like leaves enough room above the comma four to make it easy to unplug!"
    />
    <SetupStep
      stepNumber={13}
      images={[Mount3Image]}
      header="stick your comma four to the windshield"
      body="When you're happy with the position, peel the red layer off the mount, and stick your comma four in place. Firmly press it upward to properly stick the mount to the windshield."
    />
    <SetupStep
      stepNumber={14}
      images={[UnmountImage, Unmount1Image]}
      header="unplug your comma four and remove it from the mount"
      body="Slide your comma four up towards your rearview mirror to unmount it."
    />
    <SetupStep
      stepNumber={15}
      images={[AlignImage]}
      header="check your mount alignment"
      body="It's easiest to check your mount's alignment from outside of your car. You want to make sure its centered and level. We recommend doing this before the next step."
    />
    <SetupStep
      stepNumber={16}
      images={[PressImage, Press1Image]}
      header="press your mount on"
      body="Firmly press up on your mount to fully attach the tape. Check for air bubbles from the outside to see which spots need more pressure."
    />
    <SetupStep
      stepNumber={17}
      images={[RemountImage]}
      header="re-place your comma four"
      body="Slide your comma four back on to the mount and plug it in. Almost done, last step is cleanup."
    />
    <SetupStep
      stepNumber={18}
      images={[WiresImage, Wires1Image, Wires2Image]}
      header="tidy up the wires"
      body="The included cable ties can be helpful for wire management, and the harness box has an additional sticky pad if you have room to mount it underneath the trim (some cars are a tight fit, and others have lots of space).<br><br>We find it's usually easy to gently stuff the wires under the trim when everything's attached."
    />
    <SetupStep
      stepNumber={19}
      images={[PowerImage]}
      header="start and set up your comma four"
      body="You just upgraded your car to a whole new experience. Now you can setup your comma four in a few seconds and go for a drive!"
    />
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
      & .title {
        & hgroup {
          & span {
            display: block;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          & h1 {
            margin-top: 0;
            margin-right: 1rem;
          }
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
</style>
