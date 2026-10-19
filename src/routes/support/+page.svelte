<script>
  import SupportCatchAll from '$lib/components/Support/SupportCatchAll.svelte';
  import SupportFaqs from '$lib/components/Support/SupportFaqs.svelte';
  import SupportProducts from '$lib/components/Support/SupportProducts.svelte';
  import SupportHeader from '$lib/components/Support/SupportHeader.svelte';
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
<div class="category-grid">
  {#each options as option}
    <a class="category-card" href={option.href}>
      <div class="card-image"><img src={option.image} alt="" /></div>
      <div class="card-copy"><h2>{option.title}</h2><p>{option.description}</p></div>
    </a>
  {/each}
</div>
<hr class="support-divider" />
<SupportCatchAll standalone />
<hr class="support-divider" />
<SupportFaqs />

<style>
  .category-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 64px; padding-top: 32px; }
  .category-card { box-sizing: border-box; min-width: 0; border: 1px solid var(--support-border); background: var(--support-surface); color: var(--support-text); display: block; text-decoration: none; }
  @media (hover: hover) and (pointer: fine) {
    .category-card:hover { background: var(--support-hover); }
  }
  .category-card:focus-visible { outline: 3px solid var(--support-accent); outline-offset: 4px; }
  .card-image { display: flex; align-items: center; justify-content: flex-start; box-sizing: border-box; width: 100%; height: 170px; padding-left: 40px; flex-shrink: 0; background: #000; }
  .card-image img { width: 96px; height: 96px; filter: invert(1); }
  .card-copy { padding: 20px 24px 24px; }
  .card-copy h2 { margin: 0 0 8px; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.12; letter-spacing: -0.035em; font-weight: 600; }
  .card-copy p { margin: 0; max-width: none; color: var(--support-muted); font-size: 14px; line-height: 1.45; }

  @media (max-width: 760px) {
    .category-grid { grid-template-columns: 1fr; gap: 12px; padding-top: 24px; }
    .card-image { height: 80px; padding-left: 24px; }
    .card-image img { width: 52px; height: 52px; }
  }
</style>
