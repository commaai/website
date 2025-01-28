<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import RedPandaImage from "$lib/images/products/panda/red-panda.jpg";
  import BlackPandaImage from "$lib/images/products/panda/black-panda.jpeg";
  import WhitePandaImage from "$lib/images/products/panda/white-panda.jpeg";

  export const productInfo = {
    title: "panda",
    id: "gid://shopify/Product/10933316813",
    route: "/shop/panda",
    category: "accessories",
    price: "from $149",
    images: [RedPandaImage, BlackPandaImage, WhitePandaImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Note">
      A panda is not necessary if purchasing a
      <a href="/shop/comma-3x" target="_blank">comma 3X</a>.
      <br /><br />
      A red panda is required if using a comma 3 on a CAN FD vehicle. Check
      <a href="/vehicles" target="_blank">compatibility</a> to see if your car requires
      a red panda with comma 3.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      pandas are the nicest universal car interfaces ever. They give you full
      access to the many communication buses of your car.
    </p>
    <p>
      A panda + <a
        href="https://github.com/commaai/openpilot/tree/master/tools/cabana"
        target="_blank">cabana</a
      >
      is like fitbit for your car. Track your RPMs, MPG, cornering G-force, battery
      life, and so much more. pandas also work as a CAN to USB adapter.
    </p>
    <p>
      pandas are designed for cars from 2008 and newer. <a
        href="https://github.com/commaai/panda"
        target="_blank">panda firmware</a
      > is released under the MIT license.
    </p>
    <hr />
    <div>
      <hgroup>
        <img src={RedPandaImage} loading="lazy" alt="red panda" />
        <div>
          <span>variant</span>
          <strong>red panda</strong>
        </div>
      </hgroup>
      <p>
        The red panda is the future of panda technology. Using a STM32H725, it
        has a 4x faster CPU and support for CAN FD on all 3 buses + the one we
        multiplex.
      </p>
      <p>
        If you have a comma three, a red panda is needed to talk to CAN FD cars.
      </p>
      <p>
        A red panda is not required for the <a href="/shop/comma-3x">comma 3X</a
        >.
      </p>
      <p>
        The red panda does not have GPS support. It is not compatible with the
        comma two.
      </p>
    </div>
    <hr />
    <div>
      <hgroup>
        <img src={BlackPandaImage} loading="lazy" alt="black panda" />
        <div>
          <span>variant • deprecated from openpilot</span>
          <strong>black panda</strong>
        </div>
      </hgroup>
      <p>
        The black panda connects to an EON Gold with <a
          href="/shop/car-harness">car harness</a
        >. It can also be used with a computer and
        <a
          href="https://github.com/commaai/openpilot/tree/master/tools/cabana"
          target="_blank">cabana</a
        >.
      </p>
      <ul>
        <li>4th CAN bus to connect to the OBD-II port</li>
        <li>OBD-C to connect to car harness</li>
        <li>USB A to connect to EON</li>
        <li>Mounts on the windshield</li>
        <li>High-definition GPS</li>
      </ul>
    </div>
    <hr />
    <div>
      <hgroup>
        <img src={WhitePandaImage} loading="lazy" alt="white panda" />
        <div>
          <span>variant • deprecated from openpilot</span>
          <strong>white panda</strong>
        </div>
      </hgroup>
      <ul>
        <li>3x CAN</li>
        <li>2x LIN</li>
        <li>1x GMLAN</li>
        <li>USB A</li>
        <li>Wi-Fi hardware (software support deprecated)</li>
      </ul>
      <p>White panda is deprecated from openpilot.</p>
    </div>
  </div>
</Product>
