<script context="module">
  import Product from "$lib/components/Product.svelte";

  import PandaJungleImage from "$lib/images/products/panda-jungle/panda-jungle-v2.jpeg";
  import PowerAdapterImage from "$lib/images/products/panda-jungle/power-adapter.jpeg";

  export const productInfo = {
    title: "panda jungle v2",
    id: "gid://shopify/Product/4598987325503",
    route: "/shop/panda-jungle",
    category: "accessories",
    price: "$199",
    images: [PandaJungleImage, PowerAdapterImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>What's better than debug board? pandas in a jungle! (pandas not included, only panda jungle)</p>
    <p>Plug up to 6 comma devices or pandas in at once. Use provided switch to "start" all panda ignitions at once.</p>
    <p>Great for comma device development and debugging!</p>
    <p>
      Firmware for the jungle is located in the panda repository and can be
        <a href="https://github.com/commaai/panda/tree/master/board/jungle" target="_blank">obtained here</a>.
    </p>
  </div>
</Product>
