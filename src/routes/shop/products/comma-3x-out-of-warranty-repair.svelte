<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import Comma3XImage from "$lib/images/products/comma-3x/comma-3x.jpg";
  import Comma3XBackImage from "$lib/images/products/comma-3x/comma-3x-back.jpg";
  import Comma3XPromoImage from "$lib/images/products/comma-3x/comma-3x-promo.jpg";
  import Comma3XIncludesImage from "$lib/images/products/comma-3x/comma-3x-includes.jpg";

  export const productInfo = {
    title: "comma 3X out of warranty repair",
    id: "gid://shopify/Product/7294255104063",
    route: "/shop/comma-3x-out-of-warranty-repair",
    category: "accessories",
    price: "$500",
    images: [Comma3XImage, ],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="description">
    <strong>Description</strong>
    <p>
      Dropped your device and broke the screen?
      Having issues outside the warranty period?

      <b>All out-of-warranty comma 3X repairs are covered under the same flat-rate.</b>

      Ship us your original comma 3X, and for the flat rate, we'll send you your repaired comma 3X.
    </p>

    <hr>
    <strong>Instructions</strong>
    <p>
      1. Purchase this product.
    </p>
    <p>
      2. Ship your comma 3X back to us with tracking.
    </p>
    <p>Address to:</p>
    <p style="margin-left: 1em; font-size: 0.75em"><b>
      comma 3X repair<br>
      Repair Order #<br>
      3900 Harney Street<br>
      San Diego, CA 92110<br>
    </b></p>
    <p>
      3. When the comma 3X arrives, give us up to 5 business days to process it.
    </p>
    <p>
      4. We ship you your repaired comma 3X.
    </p>

    <hr>
    <strong>THE FINE PRINT</strong>
    <p>
      -> This offer is ONLY good for the original device owner. <b>What does this mean?</b> The device sent for repair must have been purchased from the comma shop by the same person who purchased the device originally. The name and/or address on the original comma 3X order must be the same. Resale and second market devices do not qualify for repair at this time. You must include your original order number with your device when returning it. We reserve the right to cancel orders that do not follow this policy.
    </p>
    <p>
      -> We are not responsible for lost or damaged packages. Please be sure to have tracking on your package. Ship your device according to local laws and regulations.
    </p>
    <p>
      -> No warranty except DOA.
    </p>
  </div>
</Product>
