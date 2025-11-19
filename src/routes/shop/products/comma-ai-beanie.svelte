<script context="module">
  import Product from "$lib/components/Product.svelte";

  import CommaBeanieImage from "$lib/images/products/comma-ai-beanie/comma-beanie.jpg";

  export const productInfo = {
title: "comma beanie",
    id: "gid://shopify/Product/4863559663679",
    route: "/shop/comma-ai-beanie",
    category: "accessories",
    price: "$69",
    images: [CommaBeanieImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes"></div>

  <div slot="description">
    <strong>Description</strong>
    <p>A black beanie with a comma on it.</p>
    <p><b>The beanie will never ever be sold for less than $69.</b></p>
  </div>
</Product>
