<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import Comma3XBackCaseImage from "$lib/images/products/comma-3x-back-case/comma-3x-back-case.jpg";

  export const productInfo = {
    title: "comma 3X back case",
    id: "gid://shopify/Product/7871177818175",
    route: "/shop/comma-3x-back-case",
    category: "accessories",
    price: "$25",
    images: [Comma3XBackCaseImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Note: final sale">
      Open and repair the comma 3/3X at your own risk.
      comma is not responsible for damages that may occur while repairing devices.
      No warranty except DOA.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>comma 3X back case</strong>
    <ul>
      <li>comma 3X back case</li>
      <li>Includes screws</li>
    </ul>
  </div>
</Product>
