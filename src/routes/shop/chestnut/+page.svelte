<script>
  import Product from "$lib/components/Product.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import Accordion from "$lib/components/Accordion.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import Badge from "$lib/components/Badge.svelte";

  import CarIcon from "$lib/icons/features/car.svg?raw";
  import MoneyBackGuaranteeIcon from "$lib/icons/features/money-back-guarantee.svg?raw";
  import WarrantyIcon from "$lib/icons/features/warranty.svg?raw";

  import ReadyToDrive34 from "$lib/images/products/chestnut/bnut_34.png";
  import ReadyToDriveFront from "$lib/images/products/chestnut/bnut_front.png";
  import ReadyToDriveBack from "$lib/images/products/chestnut/bnut_back.png";
  import ReadyToDriveLeft from "$lib/images/products/chestnut/bnut_left.png";
  import ReadyToDriveRight from "$lib/images/products/chestnut/bnut_right.png";
  import TinyChestnut34 from "$lib/images/products/chestnut/cnut_34.png";
  import TinyChestnutFront from "$lib/images/products/chestnut/cnut_front.png";
  import TinyChestnutBack from "$lib/images/products/chestnut/cnut_back.png";
  import TinyChestnutRight from "$lib/images/products/chestnut/cnut_right.png";
  import TinyChestnutTop from "$lib/images/products/chestnut/cnut_top.png";
  import ChestnutProductImage from "$lib/images/products/chestnut/chestnut.png";
  import StandoffsImage from "$lib/images/products/chestnut/standoffs.png";
  import UsbCable1m from "$lib/images/products/chestnut/c1m.png";
  import UsbCable3m from "$lib/images/products/chestnut/c3m.png";
  import AtxPowerAdapter from "$lib/images/products/chestnut/24pin.png";
  import GpuPowerCable from "$lib/images/products/chestnut/8pin.png";
  import RadeonGpu from "$lib/images/products/chestnut/9060.png";
  import CarPowerCable from "$lib/images/products/chestnut/cig.png";
  import MountingStrips from "$lib/images/products/chestnut/dlock.png";
  import InstallStandoffs from "$lib/images/products/chestnut/ins1.png";
  import InstallChestnutPower from "$lib/images/products/chestnut/ins2.png";
  import InstallGpu from "$lib/images/products/chestnut/ins3.png";
  import InstallGpuPower from "$lib/images/products/chestnut/ins4.png";
  import SecureGpu from "$lib/images/products/chestnut/ins6.png";
  import InstallFootwell from "$lib/images/products/chestnut/install_footwell.png";
  import InstallUnderSeat from "$lib/images/products/chestnut/install_under_seat.png";
  import PluginCommaFour from "$lib/images/products/chestnut/plugin_90.png";
  import PluginVehiclePower from "$lib/images/products/chestnut/plugin_cig.png";
  import TechSpecsImage from "$lib/images/products/chestnut/techspecs.png";

  export let data;

  const tinyChestnutImages = [
    TinyChestnutTop,
    TinyChestnutFront,
    TinyChestnutRight,
    TinyChestnutBack,
    TinyChestnut34,
  ];

  const readyToDriveImages = [
    ReadyToDrive34,
    ReadyToDriveLeft,
    ReadyToDriveFront,
    ReadyToDriveRight,
    ReadyToDriveBack,
  ];

  function imagesForVariant(variant) {
    return variant.title.toLowerCase().includes("ready to drive")
      ? readyToDriveImages
      : tinyChestnutImages;
  }

  function descriptionForVariant(variant) {
    return variant.title.toLowerCase().includes("ready to drive")
      ? "Everything you need to use chestnut with comma four."
      : "Use chestnut with your own GPU and power supply.";
  }

  const product = {
    ...data.product,
    variants: {
      ...data.product.variants,
      nodes: data.product.variants.nodes.map((variant) => ({
        ...variant,
        backordered: "4-12 weeks",
        images: imagesForVariant(variant),
      })),
    },
  };
</script>

<svelte:head>
  <title>chestnut — comma shop</title>
  <meta
    name="description"
    content="chestnut upgrades comma four with desktop GPU compute to run openpilot’s biggest driving models."
  />
</svelte:head>

<section class="light" id="product-item">
  <div class="container">
    <Product
      {product}
      useVariantBackorderStatus={true}
      scrollProductImages={true}
      inlineMobileTitlePrice={true}
      getVariantDescription={descriptionForVariant}
    >
      <div slot="notes">
        <NoteCard title="Using chestnut with openpilot?" icon={CarIcon}>
          Choose ready to drive for everything you need to add desktop-class
          GPU compute to your comma four.
        </NoteCard>
      </div>
      <div slot="description">
        <div class="purchase-detail">
          <Accordion>
            <div class="purchase-detail-label" slot="label">
              <div>{@html MoneyBackGuaranteeIcon}</div>
              <span>Try our 30-day money-back trial</span>
            </div>
            <div class="purchase-detail-copy" slot="content">
              We think you’ll love chestnut, but if you’re not satisfied, send
              it back within 30 days for a full refund.
            </div>
          </Accordion>
        </div>
        <div class="purchase-detail">
          <Accordion>
            <div class="purchase-detail-label" slot="label">
              <div>{@html WarrantyIcon}</div>
              <span>1-year hardware warranty</span>
            </div>
            <div class="purchase-detail-copy" slot="content">
              1-year limited warranty against hardware defects.
            </div>
          </Accordion>
        </div>
      </div>
    </Product>
  </div>
</section>

<section class="light" id="description">
  <div class="container">
    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Meet chestnut</h2>
      <div class="description">
        <p>
          chestnut is a compute upgrade for
          <a class="highlight" href="/shop/comma-four">comma four</a>, built for
          bigger models. It connects a desktop GPU directly to your comma four,
          giving openpilot the compute to run its biggest driving models. The
          first chestnut-class model has 30x more parameters and uses 100x more
          FLOPs than the latest on-device model.
        </p>
        <p>
          The ready to drive kit is the easiest way to bring that compute into your car.
          tiny chestnut and ready to drive use the same USB-to-PCIe board and run
          the same <a class="highlight" href="https://github.com/tinygrad/asm2464pd-firmware/">open-source custom firmware</a>.
        </p>
        <p>
          Read the <a class="highlight" href="https://blog.comma.ai/chestnut/">launch blog post</a>.
        </p>
      </div>
    </Grid>

    <hr />

    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>Using chestnut</h2>
      <div>
        <img
          class="tech-specs-image"
          src={TechSpecsImage}
          loading="lazy"
          alt="Annotated connection diagram of the chestnut board"
        />
        <div class="usage-options">
          <article>
            <h3>With a PC</h3>
            <div class="connection-path">
              <h4>USB4</h4>
              <p>
                Connect chestnut to your computer and use it like any other USB4
                dock.
              </p>
            </div>
            <div class="connection-path">
              <h4>USB3 or USB2</h4>
              <p>
                Use <a class="highlight" href="https://github.com/tinygrad/tinygrad">tinygrad</a>
                to access the GPU over a USB3 or USB2 connection.
              </p>
            </div>
            <div class="connection-path">
              <h4>Mac</h4>
              <p>
                Follow the <a class="highlight" href="https://docs.tinygrad.org/tinygpu/">TinyGPU setup guide</a>
                to use a supported GPU on macOS.
              </p>
            </div>
            <p class="usage-link">
              Join the #gpu-on-usb channel on the tinygrad <a class="highlight" href="https://discord.gg/ZjZadyC7PK">Discord</a>.
            </p>
          </article>
          <article>
            <h3>With openpilot</h3>
            <p>
              Pair chestnut with <a class="highlight" href="/shop/comma-four">comma four</a>
              to run openpilot’s biggest models. The ready to drive kit
              includes everything you need for an in-car setup: a GPU, a longer
              USB cable, a car power cable, and mounting strips.
            </p>
            <p class="usage-link">
              Join the #chestnut channel on <a class="highlight" href="https://discord.comma.ai/">Discord</a>.
            </p>
          </article>
        </div>
      </div>
    </Grid>

    <hr />

    <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
      <h2>In the Box</h2>
      <div class="box-variants">
        <div class="box-variant">
          <hgroup>
            <h3>tiny chestnut</h3>
            <span>$249</span>
          </hgroup>
          <div class="box-contents">
            <div>
              <img src={ChestnutProductImage} loading="lazy" alt="chestnut board and aluminum base" />
              <p>chestnut</p>
            </div>
            <div>
              <img src={UsbCable1m} loading="lazy" alt="1m USB4 cable" />
              <p>1m USB4</p>
            </div>
            <div>
              <img src={StandoffsImage} loading="lazy" alt="chestnut standoffs and thumb nuts" />
              <p>standoffs + thumb nuts</p>
            </div>
            <div>
              <img src={AtxPowerAdapter} loading="lazy" alt="ATX to XT60i power adapter" />
              <p>ATX power adapter</p>
            </div>
            <div>
              <img src={GpuPowerCable} loading="lazy" alt="GPU power cable" />
              <p>GPU power cable</p>
            </div>
          </div>
        </div>

        <div class="box-variant">
          <hgroup>
            <h3>ready to drive</h3>
            <span>$799</span>
          </hgroup>
          <div class="box-contents">
            <div>
              <img src={ChestnutProductImage} loading="lazy" alt="chestnut board and aluminum base" />
              <p>chestnut</p>
            </div>
            <div>
              <img src={UsbCable1m} loading="lazy" alt="1m USB4 cable" />
              <p>1m USB4</p>
            </div>
            <div>
              <img src={StandoffsImage} loading="lazy" alt="chestnut standoffs and thumb nuts" />
              <p>standoffs + thumb nuts</p>
            </div>
            <div>
              <img src={AtxPowerAdapter} loading="lazy" alt="ATX to XT60i power adapter" />
              <p>ATX power adapter</p>
            </div>
            <div>
              <img src={GpuPowerCable} loading="lazy" alt="GPU power cable" />
              <p>GPU power cable</p>
            </div>
            <div>
              <img src={RadeonGpu} loading="lazy" alt="AMD Radeon GPU for chestnut" />
              <p>AMD Radeon RX 9060 8GB</p>
            </div>
            <div>
              <img src={UsbCable3m} loading="lazy" alt="3m USB3 cable" />
              <p>3m USB3</p>
            </div>
            <div>
              <img src={CarPowerCable} loading="lazy" alt="12V car power cable" />
              <p>car power cable</p>
            </div>
            <div>
              <img src={MountingStrips} loading="lazy" alt="chestnut mounting strips" />
              <p>mounting strips</p>
            </div>
          </div>
        </div>
      </div>
    </Grid>

    <hr />

    <div id="setup-guide">
      <Grid rowGap="0" templateColumns="0.5fr 1.25fr">
        <h2>Setup Guide</h2>
        <div class="setup-guide">
          <article class="setup-step">
            <Badge style="dark">Step 1 <span class="muted">of 7</span></Badge>
            <h3>Install the standoffs</h3>
            <div class="setup-step-content">
              <img class="step-image" src={InstallStandoffs} loading="lazy" alt="standoffs installed on chestnut" />
              <p>
                Thread the two standoffs into chestnut’s base so they are ready
                to support and secure the GPU.
              </p>
            </div>
          </article>
          <hr />
          <article class="setup-step">
            <Badge style="dark">Step 2 <span class="muted">of 7</span></Badge>
            <h3>Connect power to chestnut</h3>
            <div class="setup-step-content">
              <img class="step-image" src={InstallChestnutPower} loading="lazy" alt="GPU power cable connected to chestnut" />
              <p>
                Plug the GPU power cable into chestnut before installing the GPU.
              </p>
            </div>
          </article>
          <hr />
          <article class="setup-step">
            <Badge style="dark">Step 3 <span class="muted">of 7</span></Badge>
            <h3>Seat the GPU</h3>
            <div class="setup-step-content">
              <img class="step-image" src={InstallGpu} loading="lazy" alt="GPU seated in chestnut" />
              <p>
                Align the GPU with chestnut’s PCIe slot and press it firmly
                into place.
              </p>
            </div>
          </article>
          <hr />
          <article class="setup-step">
            <Badge style="dark">Step 4 <span class="muted">of 7</span></Badge>
            <h3>Secure the GPU</h3>
            <div class="setup-step-content">
              <img class="step-image" src={SecureGpu} loading="lazy" alt="GPU secured with thumb nuts" />
              <p>
                Align the GPU with the standoffs and secure it with the thumb
                nuts.
              </p>
            </div>
          </article>
          <hr />
          <article class="setup-step">
            <Badge style="dark">Step 5 <span class="muted">of 7</span></Badge>
            <h3>Connect GPU power</h3>
            <div class="setup-step-content">
              <img class="step-image" src={InstallGpuPower} loading="lazy" alt="power cable connected to the GPU" />
              <p>
                Plug the other end of the 8-pin power cable into the GPU.
              </p>
            </div>
          </article>
          <hr />
          <article class="setup-step">
            <Badge style="dark">Step 6 <span class="muted">of 7</span></Badge>
            <h3>Mount in your car</h3>
            <div class="setup-step-content">
              <div class="step-image-pair">
                <figure class="zoomed-footwell">
                  <div class="image-viewport">
                    <img src={InstallFootwell} loading="lazy" alt="chestnut and GPU mounted in the passenger footwell" />
                  </div>
                  <figcaption>Mount in the footwell</figcaption>
                </figure>
                <figure>
                  <img src={InstallUnderSeat} loading="lazy" alt="chestnut installed under the passenger seat" />
                  <figcaption>Or install under the passenger seat</figcaption>
                </figure>
              </div>
              <p>
                Secure the assembled chestnut and GPU in the passenger footwell
                with the included mounting strips, leaving room for airflow. If
                there’s enough room, you can also install chestnut under the
                passenger seat.
              </p>
            </div>
          </article>
          <hr />
          <article class="setup-step">
            <Badge style="dark">Step 7 <span class="muted">of 7</span></Badge>
            <h3>Plug it in</h3>
            <div class="setup-step-content">
              <div class="step-image-pair">
                <figure>
                  <img src={PluginVehiclePower} loading="lazy" alt="chestnut vehicle power adapter plugged into the car" />
                  <figcaption>Connect vehicle power</figcaption>
                </figure>
                <figure>
                  <img src={PluginCommaFour} loading="lazy" alt="USB cable connected to comma four" />
                  <figcaption>Connect comma four</figcaption>
                </figure>
              </div>
              <p>
                Connect chestnut to vehicle power and plug the USB cable into
                your comma four.
              </p>
            </div>
          </article>
        </div>
      </Grid>
    </div>

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

  hr {
    margin: 3rem 0;
  }

  .purchase-detail {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .purchase-detail-label {
    display: flex;
    align-items: center;
    color: #000;
  }

  .purchase-detail-label div {
    width: 2.5rem;
    height: 24px;
  }

  .purchase-detail-label span {
    margin-right: 1rem;
  }

  .purchase-detail-copy {
    max-width: 80%;
    margin-top: 0.875rem;
    margin-left: 2.5rem;
  }

  #description .description p:first-of-type {
    margin-top: 0;
  }

  #description .description p:last-of-type {
    margin-bottom: 0;
  }

  .usage-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .tech-specs-image {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: 1.5rem;
  }

  .usage-options article {
    padding: 2rem;
    border: 1px solid #000;
  }

  .usage-options h3 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .usage-options p {
    margin: 0;
    line-height: 1.5;
  }

  .usage-options .usage-link {
    margin-top: 1.5rem;
  }

  .connection-path + .connection-path {
    margin-top: 1.5rem;
  }

  .connection-path h4 {
    margin: 0 0 0.5rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  .box-variant + .box-variant {
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }

  .box-variant hgroup {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .box-variant hgroup span {
    font-family: "JetBrains Mono", monospace;
    font-size: 1.25rem;
  }

  .box-variant hgroup h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .box-contents {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem 1rem;
    text-align: center;
  }

  .box-contents > div {
    min-width: 0;
  }

  .box-contents img {
    width: 100%;
    max-height: 150px;
    object-fit: contain;
  }

  .box-contents p {
    margin: 0 2rem;
  }

  .setup-guide {
    min-width: 0;
  }

  .setup-step {
    padding: 0.5rem 0;
  }

  .setup-step-content {
    display: grid;
    grid-template-columns: minmax(0, 0.875fr) minmax(0, 0.75fr);
    align-items: start;
    gap: 2rem;
  }

  .step-image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .step-image-pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .step-image-pair figure {
    min-width: 0;
    margin: 0;
  }

  .step-image-pair .image-viewport {
    overflow: hidden;
  }

  .step-image-pair img {
    display: block;
    width: 100%;
    height: auto;
  }

  .step-image-pair .zoomed-footwell .image-viewport img {
    transform: scale(1.5);
    transform-origin: center;
  }

  .step-image-pair figcaption {
    margin-top: 0.5rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875rem;
    text-align: center;
    text-transform: uppercase;
  }

  .setup-guide h3 {
    margin: 1rem 0;
    font-size: 1.875rem;
    font-weight: 600;
  }

  .setup-guide p {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .setup-guide > hr {
    margin: 2rem 0 3rem;
  }

  @media screen and (max-width: 1024px) {
    #description {
      margin-bottom: 3rem;
    }

    .usage-options {
      grid-template-columns: 1fr;
    }

    .step-image-pair {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 768px) {
    .box-contents {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.5rem 0.75rem;
    }

    .box-contents > div {
      width: auto;
    }

    .box-contents p {
      margin: 0;
      font-size: 1rem;
    }

    .setup-step-content {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    .setup-guide p {
      font-size: 1.25rem;
    }

    .step-image {
      max-width: none;
      max-height: none;
    }
  }
</style>
