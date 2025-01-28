<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import CommaBodyImage from "$lib/images/products/body/comma-body.jpg";
  import CommaBodyDevkitImage from "$lib/images/products/body/comma-body-devkit.jpeg";
  import CommaBodyDisplayImage from "$lib/images/products/body/comma-body-display.jpeg";
  import CommaBodySizeImage from "$lib/images/products/body/comma-body-size.png";
  import CommaBodyWheelsImage from "$lib/images/products/body/comma-body-wheels.jpg";

  import ShippingIcon from "$lib/icons/features/shipping.svg?raw";

  export const productInfo = {
    title: "comma body",
    id: "gid://shopify/Product/6920331296831",
    route: "/shop/body",
    category: "device",
    price: "$999",
    images: [CommaBodyImage, CommaBodyDevkitImage, CommaBodyDisplayImage, CommaBodySizeImage, CommaBodyWheelsImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="shipping">
    <NoteCard title="Free US Shipping" icon={ShippingIcon}>
      Free US shipping, No international shipping at this time. Ships in 1-3 months; first in, first out.
    </NoteCard>
  </div>

  <span slot="price-accessory">
    or $91/mo with Affirm.
    <a
      href="https://www.affirm.com/apps/prequal/?public_api_key=EE7S5PMJUQ8H98C5&amp;device_id=38d9205d-2cbb-473e-b2d4-89a02c0f4dc3&amp;referring_url=https%253A%252F%252Fcomma.ai%252Fshop%252Fproducts%252Fbody&amp;unit_price=99900&amp;page_type=product&amp;use_promo=true&amp;locale=en_US"
      target="_blank"
      class="highlight"
    >
      Prequalify now
    </a>
  </span>

  <div slot="notes">
    <NoteCard title="Note">
      <a href="/shop/comma-3x">comma 3X</a> sold separately.
    </NoteCard>
  </div>

  <div slot="description"></div>
</Product>
