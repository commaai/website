<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";

  import CarHarnessImage from "$lib/images/products/car-harness/car-harness.jpg";
  import HarnessIncludesImage from "$lib/images/products/car-harness/harness-includes.jpg";
  import ConnectorsImage from "$lib/images/products/car-harness/connectors.jpg";
  import OBDIIImage from "$lib/images/products/car-harness/OBD-II.png";

  import { CAR_HARNESS_PRICE } from "$lib/constants/prices.js";

  export const productInfo = {
    title: "car harness",
    id: "gid://shopify/Product/4447447908415",
    route: "/shop/car-harness",
    category: "accessories",
    price: `$${CAR_HARNESS_PRICE}`,
    images: [CarHarnessImage, HarnessIncludesImage, ConnectorsImage, OBDIIImage],
  };
</script>

<script>
  export let product;
</script>

<!-- TODO: support custom harness backorder overrides -->
<Product {product} VariantSelector={HarnessSelector} autoSelectFirstVariant={false}>
  <div slot="notes">
    <NoteCard title="Compatibility">
      Harness compatibility based on the US car market.
    </NoteCard>
    <NoteCard title="Note">
      Does not include the right angle
      <a href="/shop/obd-c-cable" target="_blank">OBD-C cable</a>, sold
      separately.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      The car harness is our universal interface to your car. Use the car
      harness to connect your comma device to your vehicle.
    </p>
    <p>
      We designed it to be invisible in your car while being easy to install and
      use. Car harness allows seamlessly switching back
      to the stock system when unplugging your comma device.
    </p>
    <div class="video-container">
      <iframe
        src="https://www.youtube.com/embed/keM6UnpguKo?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen=""
        title="car harness"
      ></iframe>
    </div>
    <hr />
    <strong>Highlights</strong>
    <ul>
      <li>Stealth install; car parts remain in place, no messy cables</li>
      <li>
        Easy to set up; watch us do it in 3 minutes
        <a href="https://www.youtube.com/watch?v=3nlkomHathI" target="_blank">
          here
        </a>
      </li>
    </ul>
    <hr />
    <strong>What's in the box?</strong>
    <p>
      Each vehicle has a specific harness based on make, model and year. Each
      kit includes the following:
    </p>
    <ul>
      <li>comma power</li>
      <li>harness connector</li>
      <li>harness box</li>
    </ul>
    <p>Exceptions to the above include:</p>
    <p><strong>OBD II</strong></p>
    <ul>
      <li>OBD-II connector</li>
      <li>long OBD-C cable (9.5 ft)</li>
      <li>USB-C coupler</li>
    </ul>
    <p><strong>Rivian A, Tesla A, Tesla B, Nissan, and J533</strong></p>
    <ul>
      <li>comma power</li>
      <li>harness connector</li>
      <li>harness box</li>
      <li>long OBD-C cable (9.5 ft)</li>
      <li>USB-C coupler</li>
    </ul>
  </div>
</Product>
