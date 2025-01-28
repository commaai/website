<script>
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import Faq from "$lib/components/Faq.svelte";

  import { faq } from "$lib/constants/faq.svelte";

  import StepOneAImage from "$lib/images/setup/comma-body/step-1a.jpeg";
  import StepOneBImage from "$lib/images/setup/comma-body/step-1b.jpeg";
  import StepOneCImage from "$lib/images/setup/comma-body/step-1c.jpeg";
  import StepTwoAImage from "$lib/images/setup/comma-body/step-2a.jpeg";
  import StepTwoBImage from "$lib/images/setup/comma-body/step-2b.jpeg";
  import StepTwoCImage from "$lib/images/setup/comma-body/step-2c.jpeg";
  import StepTwoDImage from "$lib/images/setup/comma-body/step-2d.jpeg";
  import StepThreeAImage from "$lib/images/setup/comma-body/step-3a.jpeg";
  import StepThreeBImage from "$lib/images/setup/comma-body/step-3b.jpeg";
  import StepThreeCImage from "$lib/images/setup/comma-body/step-3c.jpeg";
  import StepFourAImage from "$lib/images/setup/comma-body/step-4a.jpeg";
  import StepFourBImage from "$lib/images/setup/comma-body/step-4b.jpeg";
  import StepFourCImage from "$lib/images/setup/comma-body/step-4c.jpeg";
  import StepFourDImage from "$lib/images/setup/comma-body/step-4d.jpeg";
  import StepFourEImage from "$lib/images/setup/comma-body/step-4e.jpeg";
  import StepFourFImage from "$lib/images/setup/comma-body/step-4f.jpeg";
  import StepFourGImage from "$lib/images/setup/comma-body/step-4g.jpeg";
  import StepFiveAImage from "$lib/images/setup/comma-body/step-5a.jpeg";
  import StepFiveBImage from "$lib/images/setup/comma-body/step-5b.jpeg";
  import StepFiveCImage from "$lib/images/setup/comma-body/step-5c.jpeg";
  import StepSixAImage from "$lib/images/setup/comma-body/step-6a.jpeg";
  import StepSixBImage from "$lib/images/setup/comma-body/step-6b.jpeg";
  import StepSixCImage from "$lib/images/setup/comma-body/step-6c.jpeg";
  import StepSixDImage from "$lib/images/setup/comma-body/step-6d.jpeg";
  import StepSixEImage from "$lib/images/setup/comma-body/step-6e.jpeg";
  import StepSixFImage from "$lib/images/setup/comma-body/step-6f.jpeg";
  import StepSevenAImage from "$lib/images/setup/comma-body/step-7a.jpeg";
  import StepSevenBImage from "$lib/images/setup/comma-body/step-7b.jpeg";
  import StepSevenCImage from "$lib/images/setup/comma-body/step-7c.jpeg";
  import StepSevenDImage from "$lib/images/setup/comma-body/step-7d.jpeg";
  import StepSevenEImage from "$lib/images/setup/comma-body/step-7e.jpeg";
  import StepEightImage from "$lib/images/setup/comma-body/step-8.jpeg";
</script>

<section class="light" id="guide">
  <div class="container">
    <div class="step" id="step-1">
      <Badge style="dark">Step 1 <span class="muted">of 8</span></Badge>
      <h2>Attaching the rail: removing the plastic cover</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepOneAImage} loading="lazy" alt="" />
        <p>Turn the comma body upside down to locate lid tabs.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepOneBImage} loading="lazy" alt="" />
        <div>
          <p>Turn the comma body upright.</p>
          <p>Push the plastic cover tabs from the bottom up.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepOneCImage} loading="lazy" alt="" />
        <div>
          <p>Remove the second plastic cover by pulling it upwards.</p>
          <p>Proceed with care as the power button and charging connector are wired to the cover, and are connected to the main board.</p>
        </div>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-2">
      <Badge style="dark">Step 2 <span class="muted">of 8</span></Badge>
      <h2>Attaching 1st rail to the comma body base</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepTwoAImage} loading="lazy" alt="" />
        <div>
          <p>Take the threaded four slot rail with the flanged screw.</p>
          <p>Remove the silver screw.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepTwoBImage} loading="lazy" alt="" />
        <div>
          <p>Make sure 2 spring-tab nuts are inserted in the slots, one from the opposite side. Place them 3 inches from the end of the rail.</p>
          <p>Insert the rail into the slot located in the center of the comma body aluminum base.</p>
          <p>Press the rail in firmly with both hands applying high downward force.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepTwoCImage} loading="lazy" alt="" />
        <div>
          <p>Use the flanged screw from the bottom side to align the rail with the base.</p>
          <p>Use included 5mm allen key to tighten the screw.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepTwoDImage} loading="lazy" alt="" />
        <div>
          <p>Use a 4mm allen key to push the spring-tab nut in place.</p>
          <p>Screw in screws in the angle blocks.</p>
        </div>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-3">
      <Badge style="dark">Step 3 <span class="muted">of 8</span></Badge>
      <h2>Attaching standing legs</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepThreeAImage} loading="lazy" alt="" />
        <p>Get two stands and a small bag with two short and two long M6 screws.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepThreeBImage} loading="lazy" alt="" />
        <p>Attach both stands to the base first with the short screws and then with the long ones. DO NOT make it tight.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepThreeCImage} loading="lazy" alt="" />
        <p>Align both stands to each other and tighten the screws. Use the long side of the allen key and two fingers to not over-tighten the screws!</p>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-4">
      <Badge style="dark">Step 4 <span class="muted">of 8</span></Badge>
      <h2>Attaching 2nd part of the railing</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFourAImage} loading="lazy" alt="" />
        <div>
          <span>Parts:</span>
          <ul>
            <li>2x long connection plate</li>
            <li>1x short connection plate</li>
            <li>10x M6 screws</li>
            <li>10x spring-tab nuts</li>
          </ul>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFourBImage} loading="lazy" alt="" />
        <div>
          <p>Attach two spring-tab nuts with the provided M6 screws but DO NOT tighten.</p>
          <p>Insert one end of the bracket into the right side slot, while pushing on the spring tabs.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFourCImage} loading="lazy" alt="" />
        <div>
          <p>Repeat for the left side bracket.</p>
          <p>DO NOT tighten the screws yet!</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFourDImage} loading="lazy" alt="" />
        <p>Place spring tab nuts in corresponding slots of the top rail. Two for the left and the right rail, and one for the back rail.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFourEImage} loading="lazy" alt="" />
        <p>Place top rail onto the bottom rail.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFourFImage} loading="lazy" alt="" />
        <p>Attach with M6 long screws but DO NOT make it tight.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFourGImage} loading="lazy" alt="" />
        <div>
          <p>Align the left bracket visually in the middle of both rails.</p>
          <p>Tighten the two bottom screws.</p>
          <p>Repeat the same procedure for the right and center(only 1 bottom screw) brackets.</p>
          <p>Align the top rail and make the top screw of the center short rail tight.</p>
          <p>Tighten 2 top screws on the left and right brackets.</p>
        </div>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-5">
      <Badge style="dark">Step 5 <span class="muted">of 8</span></Badge>
      <h2>Attaching the comma three mount</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFiveAImage} loading="lazy" alt="" />
        <div>
          <p>Take comma three mount with the screw and spring-tab nut.</p>
          <p>Slide in the spring-tab nut into the left rail, move 3 in away from the rail end.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFiveBImage} loading="lazy" alt="" />
        <p>Locate the hole on the mount, it should face the left side. Press in mount on the rail with both hands.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepFiveCImage} loading="lazy" alt="" />
        <div>
          <p>Use the allen key to position the spring-tab nut.</p>
          <p>Tighten the screw with the long side of the allen key.</p>
        </div>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-6">
      <Badge style="dark">Step 6 <span class="muted">of 8</span></Badge>
      <h2>Attaching a comma three device</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSixAImage} loading="lazy" alt="" />
        <ol>
          <li>Slide-in comma three <strong>halfway</strong> by pushing it with two fingers into the mount.</li>
          <li>Push slightly on the edge of the camera bump to move it in place.</li>
          <li>Push in comma three <strong>all the way</strong> into the mount.</li>
        </ol>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSixBImage} loading="lazy" alt="" />
        <div>
          <p>Remove cable wrap, discard.</p>
          <p>Plug in the USB-C cable to the comma three.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSixCImage} loading="lazy" alt="" />
        <div>
          <p>Take the long dust cover.</p>
          <p>Place the USB-C cable into the slot and press in the dust cover.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSixDImage} loading="lazy" alt="" />
        <p>Take the short dust cover and continue through the bottom rail.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSixEImage} loading="lazy" alt="" />
        <div>
          <p>Wrap the USB-C cable around the railing 3 times.</p>
          <p>Plug in the end of the USB-C cable into the OBD-C port marked “HEAD”.</p>
        </div>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSixFImage} loading="lazy" alt="" />
        <p>Plug in the yellow XT60 battery connector.</p>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-7">
      <Badge style="dark">Step 7 <span class="muted">of 8</span></Badge>
      <h2>Attaching plastic cover to the comma body base</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSevenAImage} loading="lazy" alt="" />
        <p>Place covers on top of the body base and press them in.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSevenBImage} loading="lazy" alt="" />
        <p>Move covers into each other with your fingers to close the gap between them.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepSevenCImage} loading="lazy" alt="" />
        <p>Put the body on a side.</p>
      </Grid>
      <Grid templateColumns="1.25fr 0.75fr">
        <div>
          <img src={StepSevenDImage} loading="lazy" alt="" />
          <img src={StepSevenEImage} loading="lazy" alt="" />
        </div>
        <p>Use 4 mm allen key to lock the tabs of both covers.</p>
      </Grid>
    </div>
    <hr />
    <div class="step" id="step-8">
      <Badge style="dark">Step 8 <span class="muted">of 8</span></Badge>
      <h2>Initial boot</h2>
      <Grid templateColumns="1.25fr 0.75fr">
        <img src={StepEightImage} loading="lazy" alt="" />
        <div>
          <p>Press the button to turn the body on, the comma three will be powered on and ignition will be enabled (green LED).</p>
          <p>To switch ignition on/off press the button. You will hear audible confirmation, and the green LED will turn on or off depending on the ignition state.</p>
          <p>To turn the body off press and hold the button for 2 seconds. You will hear audible confirmation.</p>
          <p>Blue LED means that the body receives CAN messages from a comma three.</p>
        </div>
      </Grid>
    </div>
  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.body} title="Frequently asked questions" />
  </div>
</section>

<style>
  .step {
    & h2 {
      margin-top: 1rem;
    }

    & p, & li, & span:not(.muted) {
      font-size: 1.5rem;

      @media screen and (max-width: 1024px) {
        font-size: 1.25rem;
      }
    }

    & li {
      margin-bottom: 1rem;
    }
  }

  #faq {
    margin-bottom: 4rem;
  }

  hr {
    margin: 2rem 0 3rem;
  }
</style>
