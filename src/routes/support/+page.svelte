<script>
  import '$lib/components/Support/support.css';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { afterUpdate, tick } from 'svelte';
  import Article from '$lib/components/Support/Article.svelte';
  import SupportCatchAll from '$lib/components/Support/SupportCatchAll.svelte';
  import SupportFaqs from '$lib/components/Support/SupportFaqs.svelte';
  import SupportProducts from '$lib/components/Support/SupportProducts.svelte';
  import SupportHeader from '$lib/components/Support/SupportHeader.svelte';
  import ArrowRight from '$lib/icons/arrow-right.svg?raw';
  import { supportHome, supportByPath } from '$lib/components/Support/support-content';

  let lastScrolledHash = '';
  $: hash = decodeURIComponent($page.url.hash.slice(1));
  $: supportPath = $page.params.path || '';
  $: selectedEntry = supportByPath.get(supportPath);
  $: selectedArticle = selectedEntry?.kind === 'article' ? selectedEntry : null;
  $: landing = selectedEntry?.kind === 'section' || selectedEntry?.kind === 'group' ? selectedEntry : null;
  $: landingArticles = landing?.articles?.filter(article => article.listed !== 'false') || [];

  afterUpdate(() => {
    if (!hash || hash === lastScrolledHash) return;
    const target = document.getElementById(hash);
    if (!target) return;
    lastScrolledHash = hash;
    if (target instanceof HTMLDetailsElement) target.open = true;
    target.scrollIntoView();
  });

  async function openSupportLink(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a');
    if (!link || !event.currentTarget.contains(link)) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.startsWith('/support')) return;
    event.preventDefault();
    await goto(`${url.pathname}${url.hash}`, { noScroll: true, keepFocus: true });
    await tick();
    const targetHash = decodeURIComponent(url.hash.slice(1));
    const target = targetHash && document.getElementById(targetHash);
    if (target) {
      if (target instanceof HTMLDetailsElement) target.open = true;
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  function interceptSupportLinks(node) {
    node.addEventListener('click', openSupportLink);
    return { destroy: () => node.removeEventListener('click', openSupportLink) };
  }
</script>

<svelte:head>
  <title>{selectedArticle ? `${selectedArticle.title} — comma support` : supportHome.pageTitle}</title>
  <meta name="description" content={selectedArticle?.description || supportHome.description} />
</svelte:head>

<div class="help-center support-type light" data-sveltekit-preload-data="off" use:interceptSupportLinks>
  <div class="help-shell">
    {#if selectedArticle}
      <Article article={selectedArticle} embedded />
    {:else}
      <SupportHeader title={supportHome.title} description={supportHome.subtitle} />
    {/if}

    {#if !supportPath}
      <SupportProducts />
      <div class="category-grid">
        {#each supportHome.options as option}
          <a class="category-card help-card" href={option.href}>
            {#if option.image}<div class="card-image"><img src={option.image} alt="" /></div>{/if}
            <div class="help-card-copy"><h2>{option.title}</h2><p>{option.description}</p></div>
          </a>
        {/each}
      </div>
    {/if}

    {#if selectedEntry && !selectedArticle}
      <div class="path-page">
        {#if selectedEntry.kind === 'section'}
          <div class="path-banner"><img src={selectedEntry.image} alt="" /><h2>{selectedEntry.title}</h2></div>
        {/if}

        {#if landing}
          {#if landing.beforeArticles}<div class="section-content">{@html landing.beforeArticles}</div>{/if}
          {#if landingArticles.length}
            <div class="before-buy-links">
              {#each landingArticles as article}
                <a href="/support/{article.path}">{article.title}<span class="article-card-arrow" aria-hidden="true">{@html ArrowRight}</span></a>
              {/each}
            </div>
          {/if}
          {#if landing.afterArticles}<div class="section-content section-after-articles">{@html landing.afterArticles}</div>{/if}
        {/if}
      </div>
    {/if}

    {#if !selectedArticle}
      <hr class="support-divider" />
      <SupportCatchAll standalone={!supportPath} />
    {/if}

    {#if !supportPath && hash !== 'search'}
      <hr class="support-divider" />
      <SupportFaqs />
    {/if}
  </div>
</div>

<style>
  .help-center {
    --support-background: var(--color-background);
    --support-surface: var(--color-card-background);
    --support-text: var(--color-foreground);
    --support-muted: var(--color-muted);
    --support-border: #ddd;
    --support-hover: var(--color-card-background-hover);
    --support-accent: var(--color-accent);
    background: var(--support-background); color: var(--support-text);
    color-scheme: light;
  }
  .help-shell { width: 85%; max-width: 90rem; margin: auto; padding-bottom: 48px; }
  .category-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 64px; padding-top: 32px; }
  .category-card { box-sizing: border-box; min-width: 0; border: 1px solid var(--support-border); background: var(--support-surface); color: var(--support-text); display: block; text-decoration: none; }
  @media (hover: hover) and (pointer: fine) {
    .category-card:hover { background: var(--support-hover); }
  }
  .card-image { display: flex; align-items: center; justify-content: flex-start; box-sizing: border-box; width: 100%; height: 170px; padding-left: 40px; flex-shrink: 0; background: #000; }
  .card-image img { width: 96px; height: 96px; filter: invert(1); }
  .help-card-copy { padding: 20px 24px 24px; }
  .help-card h2 { margin: 0 0 8px; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.12; letter-spacing: -0.035em; font-weight: 600; }
  .help-card p { margin: 0; max-width: none; color: var(--support-muted); font-size: 13px; line-height: 1.45; }
  .section-content :global(.fix-category-grid) { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .section-content :global(.fix-category-grid .help-card) { min-height: 180px; padding: 24px; justify-content: flex-end; }
  .section-content :global(.support-option) { position: relative; box-sizing: border-box; min-width: 0; border: 1px solid var(--support-border); background: var(--support-surface); color: var(--support-text); display: flex; flex-direction: column; text-decoration: none; }
  .section-content :global(.support-option:hover) { background: var(--support-hover); }
  .section-content :global(.support-option h3) { margin: 0 0 8px; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.12; letter-spacing: -.035em; font-weight: 600; }
  .section-content :global(.support-option p) { margin: 0; max-width: none; color: var(--support-muted); font-size: 13px; line-height: 1.45; }
  .path-page { width: 100%; }
  .path-banner { display: flex; align-items: center; justify-content: flex-start; min-height: 220px; margin-bottom: 28px; background: #000; color: #fff; overflow: hidden; }
  .path-banner h2 { margin: 0; padding: 24px 32px; }
  .path-banner img { width: 120px; height: 120px; margin-left: 48px; flex-shrink: 0; filter: invert(1); }
  .before-buy-links { display: grid; gap: 12px; margin-top: 24px; }
  .before-buy-links a { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 64px; box-sizing: border-box; padding: 16px 20px; border: 1px solid var(--support-border); background: var(--support-surface); font-weight: 600; }
  .before-buy-links a:hover { background: var(--support-hover); }
  .section-content { overflow-wrap: anywhere; }
  .section-after-articles { margin-top: 0; }
  .section-content :global(a:not(.article-card-link)) { color: #000; border-bottom: 2px solid #86ff4e; background-color: rgba(134, 255, 78, 0.15); text-decoration: none; }
  .section-content :global(img), .section-content :global(iframe) { max-width: 100%; }
  .help-center :global(.support-dropdown) { margin: 0; background: transparent; color: var(--support-text); font-family: Inter, sans-serif; }
  .help-center :global(.support-dropdown-divider) { border-top-color: #333; }
  .help-center :global(.support-dropdown summary) { position: relative; display: grid; align-items: center; box-sizing: border-box; padding: 0 52px 0 20px; background: transparent; color: var(--support-text); cursor: pointer; list-style: none; }
  .help-center :global(.support-dropdown summary::-webkit-details-marker) { display: none; }
  .help-center :global(.support-dropdown-label) { margin: 1rem 0; font: inherit; font-size: 1.25rem; font-weight: 600; }
  .help-center :global(.support-dropdown-chevron) { position: absolute; right: 20px; color: var(--support-text); }
  .help-center :global(.support-dropdown-chevron svg) { display: block; width: 18px; height: 12px; color: var(--support-text); }
  .help-center :global(.support-dropdown[open] .support-dropdown-chevron) { transform: rotate(180deg); }
  .help-center :global(.support-dropdown-content) { padding: .25rem 20px 1rem; font: inherit; font-size: 1.25rem; line-height: 1.4; }
  .help-center :global(.support-dropdown-content > *:first-child) { margin-top: 0; }
  .help-center :global(.support-dropdown-content > *:last-child) { margin-bottom: 0; }
  .help-center :global(.support-dropdown-content li) { font: inherit; }
  a:focus-visible { outline: 3px solid var(--support-accent); outline-offset: 4px; }

  @media (max-width: 760px) {
    .help-shell { padding-bottom: 40px; }
    .category-grid { grid-template-columns: 1fr; gap: 12px; padding-top: 24px; }
    .card-image { height: 80px; padding-left: 24px; }
    .card-image img { width: 52px; height: 52px; }
    .path-banner { min-height: 160px; }
    .path-banner h2 { padding: 20px; }
    .path-banner img { width: 80px; height: 80px; margin-left: 32px; }
    .section-content :global(.fix-category-grid) { grid-template-columns: 1fr; }
    .section-content :global(.fix-category-grid .help-card) { padding: 20px; }
  }

</style>
