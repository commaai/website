<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import HarnessConnectorImage from "$lib/images/products/harness-connector/harness-connector.jpg";
  import ConnectorsImage from "$lib/images/products/car-harness/connectors.jpg";

  export const productInfo = {
    title: "harness connector",
    id: "gid://shopify/Product/4310075310143",
    route: "/shop/harness-connector",
    category: "accessories",
    price: "$50",
    images: [HarnessConnectorImage, ConnectorsImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Compatibility">
      Harness connector compatibility based on the US car market.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      The harness connector does <b>not</b> include the car harness box and only
      ships with the wires and connectors needed to install an existing car harness
      into another car.
    </p>
    <p>
      Give your car harness more flexibility with another harness connector. The
      harness connector replaces the connector in your existing car harness for
      use in multiple cars. Already using a comma device and car harness in your
      Toyota and want to try it out in your Honda? Simply swap out the connector
      in your car harness, install, and drive!
    </p>
    <p>
      For a harness connector with all the wires and only the 18 pin molex
      connector, choose "Development".
    </p>
    <hr />
    <strong>Open Source</strong>
    <p>
      Buy it here or build it yourself. Harness connectors are <a
        href="https://github.com/commaai/neo/tree/master/car_harness"
        target="_blank">open source</a
      >.
    </p>
  </div>
</Product>
