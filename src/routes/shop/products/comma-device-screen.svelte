<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import CommaThreeDeviceScreenImage from "$lib/images/products/comma-three-device-screen/comma-three-device-screen.jpg";

  export const productInfo = {
    title: "comma device screen",
    id: "gid://shopify/Product/6786322858047",
    route: "/shop/comma-device-screen",
    category: "accessories",
    price: "$100",
    images: [CommaThreeDeviceScreenImage],
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
    <strong>comma 3X - screen + front case</strong>
    <ul>
      <li>comma 3X display pre-attached to front case</li>
      <li>includes 4 screws to attach to back piece</li>
    </ul>
    <strong>comma 3/3X - screen only</strong>
    <ul>
      <li>only includes the screen (no case)</li>
      <li>compatible with both comma three and comma 3X</li>
    </ul>
    <strong>comma three - screen + front case</strong>
    <ul>
      <li>comma three display pre-attached to front case</li>
      <li>NOTE: comma three front cases are out of stock; purchase the "comma 3/3X - screen only" instead and attach to your existing front case</li>
    </ul>
  </div>
</Product>
