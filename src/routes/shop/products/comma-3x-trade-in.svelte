<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import Comma3XImage from "$lib/images/products/comma-3x/comma-3x.jpg";
  import Comma3XBackImage from "$lib/images/products/comma-3x/comma-3x-back.jpg";
  import Comma3XPromoImage from "$lib/images/products/comma-3x/comma-3x-promo.jpg";
  import Comma3XIncludesImage from "$lib/images/products/comma-3x/comma-3x-includes.jpg";

  export const productInfo = {
    title: "comma 3X trade-in",
    id: "gid://shopify/Product/7555745054783",
    route: "/shop/comma-3x-trade-in",
    category: "accessories",
    price: "$750",
    images: [Comma3XImage, Comma3XBackImage, Comma3XPromoImage, Comma3XIncludesImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Note">
      If you are already using a car harness, you only need to purchase this product. Do not return your car harness. comma two, comma three,and comma 3X use the same harness.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      Trade in any older comma device (EON, comma two, comma three) for a brand new comma 3X. Device can be in any condition as long as you are the original purchaser.
    </p>

    <hr>
    <strong>Trade-in Instructions</strong>
    <p>
      1. Purchase this product.
    </p>
    <p>
      2. Ship your old comma device back to us with tracking.
      <br>
      <u>You must include your trade-in comma 3X order number <b>and</b> the trade-in device's original order number <b>inside</b> the box.</u>
    </p>
    <p>Address to:</p>
    <p style="margin-left: 1em; font-size: 0.75em"><b>
      comma 3X upgrade<br>
      Upgrade Order #<br>
      3900 Harney Street<br>
      San Diego, CA 92110<br>
    </b></p>
    <p>
      3. When the old comma device arrives, give us 1-2 business days to process it.
    </p>
    <p>
      4. We ship you your brand new comma 3X.
    </p>

    <hr>
    <strong>THE FINE PRINT</strong>
    <p>
      -> This trade-in offer is ONLY good for the original device owner. <b>What does this mean?</b> The device sent for trade-in must have been purchased from the comma shop by the same person purchasing the comma 3X trade-in offer. The name and/or address on the original and new comma 3X order must be the same. Resale and second market devices do not qualify for trade-in at this time. You must include your original comma device's order number <b>and</b> your trade-in order number with your device when returning it. We reserve the right to cancel orders that do not follow this policy.
    </p>
    <p>
      -> This offer is for new comma 3X purchases only.
    </p>
    <p>
      -> We are not responsible for lost or damaged packages. Please be sure to have tracking on your package. Ship your device according to local laws and regulations.
    </p>
  </div>
</Product>
