<script context="module">
  import Product from "$lib/components/Product.svelte";

  import CommaHoodieImage from "$lib/images/products/comma-ai-hoodie/comma-hoodie.jpg";
  import CommaHoodieBackImage from "$lib/images/products/comma-ai-hoodie/comma-hoodie-back.jpeg";
  import CommaHoodiePrintImage from "$lib/images/products/comma-ai-hoodie/comma-hoodie-print.jpeg";
  import CommaHoodiePackagingImage from "$lib/images/products/comma-ai-hoodie/comma-hoodie-packaging.jpeg";

  export const productInfo = {
    title: "comma hoodie",
    id: "gid://shopify/Product/11027682317",
    route: "/shop/comma-ai-hoodie",
    category: "accessories",
    price: "$89",
    images: [CommaHoodieImage, CommaHoodieBackImage, CommaHoodiePrintImage, CommaHoodiePackagingImage],
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
      The perfect mid-weight hoodie. Made from a polyester cotton blend,
      they're not too heavy and not too warm. They have a double-lined hood for warmth,
      a soft interior lining, and - get this - the pocket is also lined with soft fleece!
      Men's sizing. Black fabric with a white printed comma on the front, and
      <a href="http://comma.ai/" target="_blank">comma.ai</a> graphic on the back.
      Hoodie comes stringless.
    </p>
  </div>
</Product>
