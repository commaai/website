<script>
  import { page } from '$app/stores';
  import { supportById, supportByPath } from './support-content';
  import { products } from './product-content';
  import CommaIcon from '$lib/icons/comma.svg?raw';

  function breadcrumbsFor(pathname) {
    if (pathname === '/support' || pathname === '/support/') return [
      { label: 'comma home', href: '/', icon: true },
      { label: 'support' }
    ];
    if (!pathname.startsWith('/support/')) return [];

    const productKey = pathname === '/support/orders-warranty'
      ? 'orders-returns'
      : pathname.startsWith('/support/products/') ? pathname.split('/')[3] : null;
    const product = productKey && products.get(productKey);
    if (product) return [
      { label: 'comma home', href: '/', icon: true },
      { label: 'support', href: '/support' },
      { label: product.heading || `${product.title} support` }
    ];

    const entry = supportByPath.get(pathname.slice('/support/'.length));
    const crumbs = [
      { label: 'comma home', href: '/', icon: true },
      { label: 'support', href: entry ? '/support' : undefined }
    ];
    if (!entry) return crumbs;

    const section = entry.sectionId && supportById.get(entry.sectionId);
    if (entry.kind !== 'section' && section) {
      crumbs.push({ label: section.title, href: `/support/${section.path}` });
    }
    const group = entry.groupId && supportById.get(entry.groupId);
    if (entry.kind === 'article' && group) {
      crumbs.push({ label: group.title, href: `/support/${group.path}` });
    }
    crumbs.push({ label: entry.title });
    return crumbs;
  }

  $: crumbs = breadcrumbsFor($page.url.pathname);
</script>

{#if crumbs.length}
  <nav class="footer-breadcrumbs" aria-label="Breadcrumb">
    {#each crumbs as crumb, index}
      {#if index > 0}<span aria-hidden="true">&gt;</span>{/if}
      {#if crumb.href}
        <a href={crumb.href} aria-label={crumb.icon ? crumb.label : undefined}>
          {#if crumb.icon}<span class="comma-icon" aria-hidden="true">{@html CommaIcon}</span>{:else}{crumb.label}{/if}
        </a>
      {:else}<span>{crumb.label}</span>{/if}
    {/each}
  </nav>
{/if}

<style>
  .footer-breadcrumbs { position: absolute; top: calc(var(--footer-top-space) / -2); left: 0; transform: translateY(-50%); display: flex; align-items: center; flex-wrap: wrap; gap: 10px; color: #aaa; font-size: 13px; line-height: 20px; }
  .footer-breadcrumbs a { display: inline-flex; align-items: center; height: 20px; color: #fff; text-decoration: none; text-underline-offset: 3px; }
  .comma-icon { display: inline-flex; align-items: center; }
  .comma-icon :global(svg) { display: block; width: 11px; height: 19px; }
  .footer-breadcrumbs a:hover, .footer-breadcrumbs a:focus-visible { text-decoration: underline; }
</style>
