<script context="module">
  import Product from "$lib/components/Product.svelte";

  import ObdCRightCableImage from "$lib/images/products/obd-c-cable/obd-c-right-cable.jpg";
  import ObdCLongCableImage from "$lib/images/products/obd-c-cable/obd-c-long-cable.jpg";

  export const productInfo = {
    title: "OBD-C cable",
    id: "gid://shopify/Product/4826822639679",
    route: "/shop/obd-c-cable",
    category: "accessories",
    price: "$20",
    images: [ObdCRightCableImage, ObdCLongCableImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes"></div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      The OBD-C cable is the standard cable for connecting your comma device to
      your car.
    </p>
    <p>
      Check out the OBD-C spec <a
        href="https://github.com/commaai/hardware/blob/master/harness/OBD-C.sch.pdf"
        target="_blank">here</a
      >.
    </p>
    <hr />
    <div>
      <hgroup>
        <img src={ObdCLongCableImage} loading="lazy" alt="obd-c long cable" />
        <div>
          <span>variant</span>
          <strong>comma 3/3X long (9.5 ft)</strong>
        </div>
      </hgroup>
      <p>
        Check the <a href="../shop/car-harness" target="_blank"
          >car harness page</a
        > to determine if your car harness kit requires this cable instead of the
        standard right-angle cable.
      </p>
    </div>
  </div>
</Product>
