<script>
  import { page } from '$app/stores';
  import CommaIcon from '$lib/icons/comma.svg?raw';

  const pageRoutes = new Set(
    Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
      .map(path => path.replace(/^\/src\/routes/, '').replace(/\/\+page\.svelte$/, ''))
  );

  const labelFor = segment => decodeURIComponent(segment).replaceAll('-', ' ');

  function breadcrumbsFor({ url, data, error }) {
    if (error || url.pathname === '/') return [];
    const segments = url.pathname.split('/').filter(Boolean);
    const ancestors = segments.slice(0, -1)
      .map((segment, index) => ({ label: labelFor(segment), href: '/' + segments.slice(0, index + 1).join('/') }))
      .filter(({ href }) => pageRoutes.has(href));
    const content = data.article ?? data.product;
    const current = { label: content?.title ?? labelFor(segments.at(-1)) };
    return [...ancestors, ...(content?.parents ?? []), current];
  }

  $: crumbs = breadcrumbsFor($page);
</script>

{#if crumbs.length}
  <nav class="footer-breadcrumbs" aria-label="Breadcrumb">
    <a href="/" aria-label="comma home">{@html CommaIcon}</a>
    {#each crumbs as { label, href }}
      <span aria-hidden="true">&gt;</span>
      {#if href}<a {href}>{label}</a>{:else}<span aria-current="page">{label}</span>{/if}
    {/each}
  </nav>
{/if}

<style>
  .footer-breadcrumbs {
    height: 6rem;
    margin-top: -6rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    color: #aaa;
    font-size: 14px;
    line-height: 20px;
  }

  .footer-breadcrumbs a {
    display: inline-flex;
    align-items: center;
    min-height: 20px;
    color: #fff;
    text-decoration: none;
    text-underline-offset: 3px;
  }

  .footer-breadcrumbs :global(svg) {
    display: block;
    width: 11px;
    height: 19px;
  }

  .footer-breadcrumbs a:hover,
  .footer-breadcrumbs a:focus-visible {
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    .footer-breadcrumbs {
      height: auto;
      margin: 0 0 2rem;
    }

    .footer-breadcrumbs > * {
      min-width: 0;
      overflow-wrap: anywhere;
    }
  }
</style>
