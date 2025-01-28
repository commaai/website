<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import CommaPowerImage from "$lib/images/products/comma-power/comma-power.jpg";

  export const productInfo = {
    title: "comma power",
    id: "gid://shopify/Product/341670756365",
    route: "/shop/comma-power",
    category: "accessories",
    price: "$20",
    images: [CommaPowerImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Note">
      A comma power is included with a purchase of a car harness.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      Use your car's OBD-II port to power your car harness.
    </p>
  </div>
</Product>
