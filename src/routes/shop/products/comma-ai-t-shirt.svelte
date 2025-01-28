<script context="module">
  import Product from "$lib/components/Product.svelte";

  import CommaTShirtImage from "$lib/images/products/comma-ai-t-shirt/comma-t-shirt.jpg";
  import CommaTShirtPose from "$lib/images/products/comma-ai-t-shirt/comma-t-shirt-pose.jpeg";
  import CommaTShirtPrint from "$lib/images/products/comma-ai-t-shirt/comma-t-shirt-print.jpeg";

  export const productInfo = {
    title: "comma t-shirt",
    id: "gid://shopify/Product/339835518989",
    route: "/shop/comma-ai-t-shirt",
    category: "accessories",
    price: "$35",
    images: [CommaTShirtImage, CommaTShirtPose, CommaTShirtPrint],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes"></div>

  <div slot="description">
    <strong>Description</strong>
    <p>Okay, okay we heard you. We aren't a high end fashion brand, we are a tech company. We sell a company t-shirt—for a reasonable price.</p>
    <p>
      This signature t-shirt is markedly soft, unisex that is versatile and lends itself to daily wear.
      Spun from a plush fabric that is made up of cotton and polyester fibers,
      this shirt features an up-to-date fit. Choose yours from the single white color we offer.
    </p>
  </div>
</Product>
