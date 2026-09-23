<script>
  import './support.css';
  import { tick } from 'svelte';
  import { goto } from '$app/navigation';
  import SupportHeader from './SupportHeader.svelte';
  import SupportCatchAll from './SupportCatchAll.svelte';
  import SectionNav from './SectionNav.svelte';

  export let article;
  export let embedded = false;

  $: isProduct = article.kind === 'product';
  $: title = article.heading || (isProduct ? `${article.title} support` : article.title);
  let headings = [];
  let activeHeading = '';

  function trackHeadings(node) {
    let targets = [];
    let frame;
    let disposed = false;
    let revision = 0;

    function updateActive() {
      frame = undefined;
      if (!targets.length) return;
      let current = targets[0];
      for (const target of targets) {
        if (target.node.getBoundingClientRect().top <= 140) current = target;
      }
      activeHeading = current.id;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(updateActive);
    }

    async function refresh() {
      const currentRevision = ++revision;
      await tick();
      if (disposed || currentRevision !== revision) return;
      const selector = article.kind === 'product' ? 'article > section > h2' : 'article h1, article h2, article h3';
      targets = Array.from(node.querySelectorAll(selector)).map((element, index) => {
        const id = element.id || `article-heading-${index}`;
        element.id = id;
        return { id, label: element.textContent, node: element, nested: element.matches('h3') };
      });
      headings = targets;
      updateActive();
    }

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(node);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    refresh();
    return {
      update: refresh,
      destroy() {
        disposed = true;
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
  }

  async function jumpToHeading(event, heading) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const target = heading.node;
    if (isProduct) {
      await goto(`#${heading.id}`, { noScroll: true, keepFocus: true });
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    } else {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      window.scrollTo({
        top: window.scrollY + target.getBoundingClientRect().top - 120,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
    }
    activeHeading = heading.id;
  }
</script>

<svelte:head>
  {#if !embedded}
    <title>{title} — comma</title>
    <meta name="description" content={article.description} />
  {/if}
</svelte:head>

<div class="support-article-page support-type light" class:product-support={isProduct} class:embedded>
  <div class="shell">
    <SupportHeader title={title} description={article.description} image={isProduct ? article.image : article.articleImage} imageAlt={isProduct ? article.imageAlt || article.title : article.articleImageAlt} imageHtml={article.imageHtml} />
    <div class="support-page-grid" class:has-sidebar={Boolean(article.navItems?.length || headings.length)} use:trackHeadings={article.id || article.path || article.title}>
      <article class="article-content" class:product-content={isProduct}>{@html article.articleContent}</article>
      {#if article.navItems?.length || headings.length}
        <aside class="support-page-sidebar">
          <SectionNav title={isProduct ? 'Topics' : 'On this page'} items={headings.length ? headings : article.navItems} activeId={activeHeading} onSelect={jumpToHeading} />
        </aside>
      {/if}
    </div>
    {#if isProduct}
      <hr class="help-divider" />
      <SupportCatchAll standalone />
    {/if}
  </div>
</div>

<style>
  .support-article-page { background: var(--color-background); color: var(--color-foreground); color-scheme: light; }
  .product-support { --border: #dedede; --support-border: var(--border); --support-surface: var(--color-card-background); --support-text: var(--color-foreground); --support-muted: var(--color-muted); --support-hover: var(--color-card-background-hover); --support-accent: var(--color-accent); }
  .shell { width: 85%; max-width: 90rem; margin: auto; padding: 0 0 48px; }
  .embedded { background: transparent; color: inherit; }
  .embedded .shell { width: 100%; max-width: none; padding: 0; }
  .article-content { min-width: 0; margin-bottom: 32px; overflow-wrap: anywhere; }
  .article-content > :global(:not(h2):first-child) { margin-top: 0; }
  .article-content :global(h1), .article-content :global(h2), .article-content :global(h3) { scroll-margin-top: 120px; }
  .article-content :global(a) { color: #000; border-bottom: 2px solid #86ff4e; background-color: rgba(134, 255, 78, 0.15); text-decoration: none; }
  .article-content :global(.article-card-link) { display: flex; align-items: center; justify-content: space-between; gap: 16px; box-sizing: border-box; width: 100%; min-height: 64px; padding: 16px 20px; border: 1px solid var(--support-border); background: var(--support-surface); font-weight: 600; }
  .article-content :global(.article-card-link:hover) { background: var(--support-hover); }
  .article-content :global(img) { display: block; width: 100%; height: auto; margin: 20px 0 32px; border: 1px solid var(--support-border); }
  .article-content :global(iframe) { max-width: 100%; }
  .article-content :global(pre) { overflow-x: auto; }
  .product-content :global(section) { padding: 0; scroll-margin-top: 110px; }
  .product-content :global(.section-body a) { color: inherit; border: 0; background: none; text-decoration-thickness: 2px; text-decoration-color: var(--color-accent); text-underline-offset: 4px; }
  .product-content :global(.section-body ul) { padding-left: 22px; }
  .product-content :global(.section-body a[title='article']) { box-sizing: border-box; display: flex; justify-content: space-between; align-items: center; gap: 18px; min-height: 65px; padding: 12px 20px; border: 1px solid var(--border); margin: 10px 0; background: var(--color-card-background); font-weight: 600; text-decoration: none; }
  .product-content :global(.section-body a[title='article']::after) { content: ''; flex: 0 0 24px; width: 24px; height: 24px; background: currentColor; mask: url('../../icons/ui/external.svg') center / contain no-repeat; }
  .product-content :global(.section-body a[title='article']:hover) { background: var(--color-card-background-hover); }
  .product-content :global(.section-body details) { border-bottom: 1px solid var(--border); }
  .product-content :global(.section-body details:first-of-type) { border-top: 1px solid var(--border); }
  .product-content :global(.section-body summary) { padding: 18px 4px; cursor: pointer; font-size: 18px; font-weight: 600; }
  .product-content :global(.section-body .support-dropdown-content) { padding: 0 4px 18px; }
  .product-content :global(.section-body .support-dropdown-chevron) { float: right; }
  .help-divider { height: 0; margin: 0; border: 0; border-top: 1px solid var(--border); }
  @media (max-width: 760px) { .shell { padding-bottom: 24px; } }
</style>
