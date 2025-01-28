<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import CommaPowerExtenderImage from "$lib/images/products/comma-power-extender/POWER-EXTENDER.jpg";

  export const productInfo = {
    title: "comma power extender",
    id: "gid://shopify/Product/7626118266943",
    route: "/shop/comma-power-extender",
    category: "accessories",
    price: "$20",
    images: [CommaPowerExtenderImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>

  <div slot="description">
    <strong>Description</strong>
    <p>
      Use to extend the cable range of your comma power.
    </p>
  </div>
</Product>
