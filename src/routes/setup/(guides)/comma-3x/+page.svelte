<script>
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import Faq from "$lib/components/Faq.svelte";

  import { faq } from "$lib/constants/faq.svelte";

  import InstallationDiagram from "$lib/images/setup/comma-3x/installation-diagram.png";
  import StepOneImage from "$lib/images/setup/comma-3x/step-1.jpeg";
  import StepTwoAImage from "$lib/images/setup/comma-3x/step-2a.jpeg";
  import StepTwoBImage from "$lib/images/setup/comma-3x/step-2b.jpeg";
  import StepThreeAImage from "$lib/images/setup/comma-3x/step-3a.jpeg";
  import StepThreeBImage from "$lib/images/setup/comma-3x/step-3b.jpeg";
  import StepThreeCImage from "$lib/images/setup/comma-3x/step-3c.jpeg";
  import StepFourAImage from "$lib/images/setup/comma-3x/step-4a.jpg";
  import StepFourBImage from "$lib/images/setup/comma-3x/step-4b.png";
  import StepFourCImage from "$lib/images/setup/comma-3x/step-4c.jpeg";
  import StepFiveAImage from "$lib/images/setup/comma-3x/step-5a.jpeg";
  import StepFiveBImage from "$lib/images/setup/comma-3x/step-5b.jpg";
  import StepFiveCImage from "$lib/images/setup/comma-3x/step-5c.jpeg";
  import StepSixImage from "$lib/images/setup/comma-3x/step-6.jpeg";
  import StepSevenImage from "$lib/images/setup/comma-3x/step-7.jpeg";
  import CommaPowerImage from "$lib/images/products/comma-power/comma-power.jpg";
</script>

<section class="light" id="guide">
  <div class="container">
    <div class="card">
      <div class="header">Setup Diagram:</div>
      <div class="contents">
        <img src={InstallationDiagram} loading="lazy" alt="installation diagram" />
      </div>
    </div>

    <div class="step" id="step-1">
      <Badge style="dark">Step 1 <span class="muted">of 5</span></Badge>
      <h2>Remove the rearview mirror cover trim</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepOneImage} loading="lazy" alt="remove the rearview mirror cover trim" />
        <p>
          Removal method varies by car.
          The durable plastic often requires a strong tug to pop it off on Hondas.
          Toyotas often need a slide outward.
          If you’d like to see how it’s done, find a comma installation guide for your specific make on <a href="https://www.youtube.com/results?search_query=comma+install" class="highlight">YouTube</a>.
        </p>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-2">
      <Badge style="dark">Step 2 <span class="muted">of 5</span></Badge>
      <h2>Connect car harness into the camera</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={StepTwoAImage} loading="lazy" alt="unplug existing LKAS camera connector and plug it into the harness" />
          <img src={StepTwoBImage} loading="lazy" alt="connector harness into LKAS camera connector and adhere harness box to the car" />
        </div>
        <ul>
          <li>Unplug the existing LKAS camera connector and plug it into the harness.</li>
          <li>Connect the other end of the harness back into the LKAS camera.</li>
          <li>
            Secure the harness – Find a place to place the harness box so the trim can still be installed over it.
            Peel off adhesive sticker and attach the harness in place.
          </li>
        </ul>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-3">
      <Badge style="dark">Step 3 <span class="muted">of 5</span></Badge>
      <h2>Place mount high and centered on the windshield</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={StepFourAImage} loading="lazy" alt="approximate position on windshield to mount the comma device" />
          <img src={StepFourBImage} loading="lazy" alt="preparation and instructions to adhere the mount to the windshield" />
          <img src={StepFourCImage} loading="lazy" alt="emphasis to let mount adhesive cure for 48 hours before attaching the comma device" />
        </div>
        <div>
          <ul>
            <li>Mounting prep – Clean the mounting area with the included alcohol wipe and let it dry.</li>
            <li>Vertical Positioning – Ensure the top of the mount is fully visible from the driver's seat.</li>
            <li>Horizontal Positioning – Ensure the mount is centered horizontally, otherwise it will not properly center in the lane.</li>
            <li>Adhere mount – Peel off the 3M tape's cover on the mount. Press firmly in the center of the mount, then the edges. Ensure no bubbles form.</li>
            <li>Let the mount cure – The mount must cure for 48 hours before installing the comma device. Skipping this step will compromise the integrity of the mount.</li>
          </ul>
          <br />
          <div class="card">
            <div class="header">Notes</div>
            <div class="contents">
              <ul>
                <li>The mount may be difficult to slide onto the device before it's installed on the windshield. This is expected and will be easier to do once the mount is installed and fully cured.</li>
                <li>Some force may be necessary to initially slide the device on the mount. Before applying any force, ensure the device's mount is parallel to the mount on the windshield.</li>
              </ul>
            </div>
          </div>
        </div>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-4">
      <Badge style="dark">Step 4 <span class="muted">of 5</span></Badge>
      <h2>Plug in OBD-C and mount the device</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={StepFiveAImage} loading="lazy" alt="plug in right-angle OBD-C cable into the harness box" />
          <img src={StepFiveBImage} loading="lazy" alt="clean all three lenses with a microfiber cloth" />
          <img src={StepFiveCImage} loading="lazy" alt="plug in OBD-C to back of the comma device and mount the device" />
        </div>
        <ul>
          <li>Plug the right-angle OBD-C cable into the harness box – Ensure the cable is fully seated. Ensure the straight end is connected to the harness box.</li>
          <li>Clean all three lenses with a microfiber cloth.</li>
          <li>Plug in OBD-C and mount the device – Plug the OBD-C cable into the upper port on the back of the comma device. Make sure the cable is all the way in.</li>
        </ul>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-5">
      <Badge style="dark">Step 5 <span class="muted">of 5</span></Badge>
      <h2>Reinstall the rearview mirror cover trim</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSevenImage} loading="lazy" alt="comma connect application logo" />
        <ul><li>Ensure the car harness fully fits inside the trim. Have the OBD-C cable come out of the top.</li></ul>
      </Grid>
    </div>

    <hr />
    <div class="step">
      <Badge style="dark">OPTIONAL STEP</Badge>
      <h2>Pair your device with comma connect</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={StepSixImage} loading="lazy" alt="comma connect application logo" />
        </div>
        <div>
          <p>
            Pair your comma 3X with <a href="https://connect.comma.ai/" target="_blank" class="highlight">connect.comma.ai</a> on your phone to see your recorded drives
          </p>
          <br />
          <LinkButton href="https://connect.comma.ai/" target="_blank" style="primary" fullWidth={true}>comma Connect</LinkButton>
        </div>
      </Grid>
    </div>

    <hr />
    <div class="step">
      <Badge style="dark">OPTIONAL STEP</Badge>
      <h2>Install the comma power</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={CommaPowerImage} loading="lazy" />
        </div>
        <div>
          <p>
            Installing the comma power is entirely optional and can be done at any time.
            Simply connect one end to your car's OBD-II port and the other to the harness box.
          </p>
          <p>
            With a comma power:
          </p>
          <li>The start and end of every drive are recorded.</li>
          <li>Your comma 3X remains powered and online while the car is off.</li>
          <li>Your comma 3X downloads updates while the car is off.</li>
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
</style>
