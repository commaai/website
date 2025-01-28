<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import HarnessBoxImage from "$lib/images/products/harness-box/harness-box.jpg";

  export const productInfo = {
    title: "harness box",
    id: "gid://shopify/Product/4826851573823",
    route: "/shop/harness-box",
    category: "accessories",
    price: "$50",
    images: [HarnessBoxImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Note">
      The harness box is included with the <a href="/shop/car-harness">car harness</a>.
    </NoteCard>
  </div>

  <div slot="description"></div>
</Product>
