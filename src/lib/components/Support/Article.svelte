<script>
  import './support.css';
  import { tick } from 'svelte';
  import { goto } from '$app/navigation';
  import SupportHeader from './SupportHeader.svelte';
  import SupportCatchAll from './SupportCatchAll.svelte';
  import SectionNav from './SectionNav.svelte';

  export let article;
  export let embedded = false;

  $: title = article.heading || article.title;
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
      const selector = 'article > section > h2';
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
    await goto(`#${heading.id}`, { noScroll: true, keepFocus: true });
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    activeHeading = heading.id;
  }
</script>

<svelte:head>
  {#if !embedded}
    <title>{title} — comma</title>
    <meta name="description" content={article.description} />
  {/if}
</svelte:head>

<div class="support-article-page support-type light" class:embedded>
  <div class="shell">
    <SupportHeader title={title} description={article.description} image={article.image || article.articleImage} imageAlt={article.imageAlt || article.articleImageAlt || article.title} imageHtml={article.imageHtml} />
    <div class="support-page-grid" class:has-sidebar={Boolean(article.navItems?.length || headings.length)} use:trackHeadings={article.id || article.path || article.title}>
      <article class="article-content sectioned-content">{@html article.articleContent}</article>
      {#if article.navItems?.length || headings.length}
        <aside class="support-page-sidebar">
          <SectionNav title="Topics" items={headings.length ? headings : article.navItems} activeId={activeHeading} onSelect={jumpToHeading} />
        </aside>
      {/if}
    </div>
    <hr class="support-divider" />
    <SupportCatchAll />
  </div>
</div>

<style>
  .support-article-page { --support-border: #dedede; --support-surface: var(--color-card-background); --support-text: var(--color-foreground); --support-muted: var(--color-muted); --support-hover: var(--color-card-background-hover); --support-accent: var(--color-accent); background: var(--color-background); color: var(--color-foreground); color-scheme: light; }
  .shell { width: 85%; max-width: 90rem; margin: auto; padding: 0 0 48px; }
  .embedded { background: transparent; color: inherit; }
  .embedded .shell { width: 100%; max-width: none; padding: 0; }
  .article-content { min-width: 0; margin-bottom: 32px; overflow-wrap: anywhere; }
  .article-content > :global(:not(h2):first-child) { margin-top: 0; }
  .article-content :global(h1), .article-content :global(h2), .article-content :global(h3) { scroll-margin-top: 120px; }
  .article-content :global(a:not(.article-card-link)) { color: #000; border-bottom: 2px solid #86ff4e; background-color: rgba(134, 255, 78, 0.15); text-decoration: none; }
  .article-content :global(img) { display: block; width: auto; max-width: 100%; height: auto; max-height: 300px; margin: 32px auto 20px; border: 1px solid var(--support-border); }
  .article-content :global(iframe) { max-width: 100%; }
  .article-content :global(pre) { overflow-x: auto; }
  .sectioned-content :global(section) { padding: 0; scroll-margin-top: 110px; }
  .sectioned-content :global(.section-body ul) { padding-left: 22px; }
  .sectioned-content :global(.section-body .article-card-link) { margin: 10px 0; }
  .sectioned-content :global(.section-body summary) { padding: 18px 20px; cursor: pointer; font-size: 18px; font-weight: 600; }
  .sectioned-content :global(.section-body .support-dropdown-content) { margin-left: 20px; padding: 0 20px 18px 0; }
  .sectioned-content :global(.section-body .support-dropdown-chevron) { float: right; }
  @media (max-width: 760px) { .shell { padding-bottom: 24px; } }
</style>
