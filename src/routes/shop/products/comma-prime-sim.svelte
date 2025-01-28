<script context="module">
  import Product from "$lib/components/Product.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import CommaPrimeSIMImage from "$lib/images/products/comma-prime-sim/comma-prime-sim.jpg";
  import CommaPrimeSIMInstallationImage from "$lib/images/products/comma-prime-sim/comma-prime-sim-installation.png";

  export const productInfo = {
    title: "comma prime SIM",
    id: "gid://shopify/Product/1923405250623",
    route: "/shop/comma-prime-sim",
    category: "accessories",
    price: "$20",
    images: [CommaPrimeSIMImage, CommaPrimeSIMInstallationImage],
  };
</script>

<script>
  export let product;
</script>

<Product {product}>
  <div slot="notes">
    <NoteCard title="Product Compatibility">This product is only for the comma 3/3X.</NoteCard>
    <NoteCard title="Note">
      For US customers only, requires $24/month comma prime subscription you can purchase at
      <a href="http://connect.comma.ai/" target="_blank">connect.comma.ai</a>.
    </NoteCard>
  </div>

  <div slot="description">
    <strong>Description</strong>
    <p>
      Give your comma 3/3X a SIM card and internet connectivity. The comma prime SIM card (plus a <a
        href="/connect">comma prime subscription</a
      >) gives you the ability to:
    </p>
    <ul>
      <li>Access your device remotely from anywhere via SSH</li>
      <li>See your vehicles last location in comma connect</li>
      <li>Upload drive summaries in real time</li>
      <li>Your drives are stored for 1 year (only 3 days without prime)</li>
      <li>Turn-by-turn navigation</li>
    </ul>
    <p>
      See how to replace the SIM card in a comma 3/3X
      <a href="/support#how-do-you-replace-the-sim-card-in-a-comma-3x" target="_blank">here</a>.
    </p>
  </div>
</Product>
