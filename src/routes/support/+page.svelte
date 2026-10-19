<script>
  import SupportCatchAll from '$lib/components/Support/SupportCatchAll.svelte';
  import SupportFaqs from '$lib/components/Support/SupportFaqs.svelte';
  import SupportProducts from '$lib/components/Support/SupportProducts.svelte';
  import SupportHeader from '$lib/components/Support/SupportHeader.svelte';
  import Card from '$lib/components/Support/Card.svelte';
  import CardGrid from '$lib/components/Support/CardGrid.svelte';
  import ShippingIcon from '$lib/icons/features/shipping.svg';
  import WarrantyIcon from '$lib/icons/features/warranty.svg';
  import CarIcon from '$lib/icons/features/car.svg';

  const options = [
    { title: 'Orders & Returns', href: '/support/orders-returns', description: 'Shipping, returns, and exchanges', image: ShippingIcon },
    { title: 'Warranty', href: '/support/warranty', description: 'Coverage, claims, and commacare', image: WarrantyIcon },
    { title: 'Vehicle Compatibility', href: '/support/vehicle-compatibility', description: 'Check if your car works with openpilot', image: CarIcon }
  ];
</script>

<svelte:head>
  <title>comma Help Center</title>
  <meta name="description" content="Find help with comma hardware, openpilot, connect, and comma prime. Search setup guides and troubleshooting articles." />
</svelte:head>

<SupportHeader title="comma support" description="Need help? Start here." />
<SupportProducts />
<CardGrid>
  {#each options as option}
    <Card href={option.href}>
      <div class="card-image"><img src={option.image} alt="" /></div>
      <div class="card-copy"><h2>{option.title}</h2><p>{option.description}</p></div>
    </Card>
  {/each}
</CardGrid>
<hr />
<SupportCatchAll />
<hr />
<SupportFaqs />

<style>
  .card-image { display: flex; align-items: center; height: 170px; padding-left: 40px; background: #000; }
  .card-image img { width: 96px; height: 96px; filter: invert(1); }
  .card-copy { padding: 20px 24px 24px; }
  .card-copy p { margin: 8px 0 0; color: var(--color-muted); font-size: 14px; line-height: 1.45; }

  @media (max-width: 768px) {
    .card-image { height: 80px; padding-left: 24px; }
    .card-image img { width: 52px; height: 52px; }
  }
</style>
