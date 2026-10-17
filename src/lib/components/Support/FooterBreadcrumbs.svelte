<script>
  import { page } from '$app/stores';
  import CommaIcon from '$lib/icons/comma.svg?raw';

  function breadcrumbsFor({ route, data, error }) {
    if (error || !route.id?.startsWith('/support')) return [];
    const home = { label: 'comma home', href: '/', icon: true };
    if (data.product) return [home, { label: 'support', href: '/support' }, { label: `${data.product.title} support` }];
    if (data.article) return [home, { label: 'support', href: '/support' }, { label: data.article.title }];
    return [home, { label: 'support' }];
  }

  $: crumbs = breadcrumbsFor($page);
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
  .footer-breadcrumbs { position: absolute; top: calc(var(--footer-top-space) / -2); left: 0; transform: translateY(-50%); display: flex; align-items: center; flex-wrap: wrap; gap: 10px; color: #aaa; font-size: 14px; line-height: 20px; }
  .footer-breadcrumbs a { display: inline-flex; align-items: center; height: 20px; color: #fff; text-decoration: none; text-underline-offset: 3px; }
  .comma-icon { display: inline-flex; align-items: center; }
  .comma-icon :global(svg) { display: block; width: 11px; height: 19px; }
  .footer-breadcrumbs a:hover, .footer-breadcrumbs a:focus-visible { text-decoration: underline; }

  @media (max-width: 1024px) {
    .footer-breadcrumbs { position: static; transform: none; margin-bottom: 2rem; }
    .footer-breadcrumbs > * { min-width: 0; overflow-wrap: anywhere; }
    .footer-breadcrumbs a { height: auto; min-height: 20px; }
  }
</style>
