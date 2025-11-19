<script context="module">
  import Product from "$lib/components/Product.svelte";

  import PandaPawImage from "$lib/images/products/panda-paw/panda-paw.jpg";
  import PandaPawBackImage from "$lib/images/products/panda-paw/panda-paw-back.jpeg";

  export const productInfo = {
    title: "panda paw",
    id: "gid://shopify/Product/335696887821",
    route: "/shop/panda-paw",
    category: "accessories",
    price: "$20",
    images: [PandaPawImage, PandaPawBackImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes"></div>

  <div slot="description">
    <strong>Description</strong>
    <p>Bricked your panda? You must be kidding, because panda are unbrickable if you have the convenient panda paw!</p>
    <p>Just press the button to put your panda in boot mode, no matter what you did to it. Also makes it easy to connect to a computer with a USB Mini-B cable (not included).</p>
    <p>Note that paw PCB color may vary, and you may not like the new color. All paw work the same though, so if you were worried, don't worry.</p>
    <hr/>
    <strong>Open Source</strong>
    <p>
      Buy it here or build it yourself. panda paw are
      <a href="https://github.com/commaai/hardware/tree/master/tools/paw" target="_blank">open source hardware</a>.
    </p>
  </div>
</Product>
