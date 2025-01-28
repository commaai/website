<script context="module">
  import Product from "$lib/components/Product.svelte";

import CommaSerialImage from "$lib/images/products/comma-serial/comma-serial.jpg";

  export const productInfo = {
 title: "comma serial",
    id: "gid://shopify/Product/6686025416767",
    route: "/shop/comma-serial",
    category: "accessories",
    price: "$99",
    images: [CommaSerialImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes"></div>

  <div slot="description">
    <strong>Description</strong>
    <p>You messed up. You messed up your BRAND NEW comma 3X. You are sad. You don't even see anything on the screen. If only you knew what was going on...</p>
    <p>Now, with a comma serial, you can know! Connect your comma serial to your device, the adapter to the wall, and the USB to a computer. You have solid power for your device + access to the lowest level serial console over a simple USB connection.</p>
    <p>Buy your comma serial before you are in this situation, that way you can say, "don't worry, I bought a comma serial".</p>
  </div>
</Product>
