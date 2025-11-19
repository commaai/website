<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import ReplacementMountsImage from "$lib/images/products/replacement-mounts/replacement-mounts-3x.png";
  import Mount3XImage from "$lib/images/products/replacement-mounts/mount-3x.png";
  import Mount3X8DegreeImage from "$lib/images/products/replacement-mounts/mount-3x-8deg.png";
  import Mount3XImageNoText from "$lib/images/products/replacement-mounts/mount-3x-no-text.png";
  import Mount3X8DegreeImageNoText from "$lib/images/products/replacement-mounts/mount-3x-8deg-no-text.png";

  export const productInfo = {
    title: "replacement mounts",
    id: "gid://shopify/Product/4576073482303",
    route: "/shop/replacement-mounts",
    category: "accessories",
    price: "$20",
    images: [ReplacementMountsImage, Mount3XImage, Mount3X8DegreeImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Note">
      comma 3X orders come with (2) mounts.
    </NoteCard>
    <NoteCard title="Note">
      comma 3X mounts are compatible with comma three.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      The required 3X mount for each supported car is documented
      <a href="https://github.com/commaai/openpilot/blob/master/docs/CARS.md#supported-cars" target="_blank">here</a>.
      We recommend allowing 48 hours for the mount to cure before use.
      See <a href="/setup/comma-3x" target="_blank">comma.ai/setup</a> for more information.
    </p>
    <hr />
    <hgroup>
      <img src={Mount3XImageNoText} loading="lazy" alt="standard replacement mounts" />
      <div>
        <span>Variant</span>
        <strong>comma 3X</strong>
      </div>
    </hgroup>
    <p>
      Standard mount compatible with most vehicles.<br /><br />
      <strong>Includes:</strong>
    </p>
    <p>
      (2) standard mounts with adhesive backing
    </p>
    <p>
      (1) alcohol wipe
    </p>
    <hr />
    <hgroup>
      <img src={Mount3X8DegreeImageNoText} loading="lazy" alt="8deg replacement mounts" />
      <div>
        <span>Variant</span>
        <strong>comma 3X (8 degrees)</strong>
      </div>
    </hgroup>
    <p>
      Vehicles with steeper windshields require an alternative mount for
      openpilot to work correctly.<br /><br />
      <strong>Includes:</strong>
    </p>
    <p>
      (2) 8 degree mounts with adhesive backing
    </p>
    <p>
      (1) alcohol wipe
    </p>
    <hr />
    <strong>DIY Mounts</strong>
    <p>
      3D print comma two, three, and 3X mounts from our <a
        href="https://github.com/commaai/hardware"
        target="_blank">open source</a
      > files.
    </p>
  </div>
</Product>
