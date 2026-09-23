<script>
  import { tick } from 'svelte';

  export let article;
  let headings = [];
  let activeHeading = '';

  function trackHeadings(node, articleId) {
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
      targets = Array.from(node.querySelectorAll('article h1, article h2, article h3'))
        .map((element, index) => ({
          id: `article-heading-${index}`,
          label: element.textContent,
          node: element,
          nested: element.matches('h3')
        }));
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

  function jumpToHeading(heading) {
    heading.node.setAttribute('tabindex', '-1');
    heading.node.focus({ preventScroll: true });
    window.scrollTo({
      top: window.scrollY + heading.node.getBoundingClientRect().top - 120,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
    activeHeading = heading.id;
  }
</script>

<div class="article-layout" class:has-headings={headings.length > 0} use:trackHeadings={article.id}>
  <article class="article-content">{@html article.content}</article>
  {#if headings.length}
    <nav class="page-subsections" aria-label="On this page">
      <h3>on this page</h3>
      {#each headings as heading}
        <button type="button" class:nested={heading.nested} aria-current={activeHeading === heading.id ? 'location' : undefined} on:click={() => jumpToHeading(heading)}>{heading.label}</button>
      {/each}
    </nav>
  {/if}
</div>

<style>
  .article-layout { display: grid; grid-template-columns: minmax(0, 1fr); gap: 32px; align-items: start; }
  .article-layout.has-headings { grid-template-columns: minmax(0, 1fr) 200px; }
  .article-content { min-width: 0; line-height: 1.6; overflow-wrap: anywhere; }
  .article-content > :global(*:first-child) { margin-top: 0; }
  .article-content :global(h1), .article-content :global(h2), .article-content :global(h3) { scroll-margin-top: 120px; }
  .article-content :global(h3) { margin: 32px 0 12px; }
  .article-content :global(h3:first-child) { margin-top: 0; }
  .article-content :global(p) { margin: 0 0 18px; }
  .article-content :global(li) { font-size: 16px; line-height: 1.6; margin-bottom: 8px; }
  .article-content :global(a) { color: #000; border-bottom: 2px solid #86ff4e; background-color: rgba(134, 255, 78, 0.15); text-decoration: none; }
  .article-content :global(.article-card-link) { display: flex; align-items: center; justify-content: space-between; gap: 16px; box-sizing: border-box; width: 100%; min-height: 64px; padding: 16px 20px; border: 1px solid var(--support-border); background: var(--support-surface); font-weight: 600; }
  .article-content :global(.article-card-link:hover) { background: var(--support-hover); }
  .article-content :global(img) { display: block; width: 100%; height: auto; margin: 20px 0 32px; border: 1px solid var(--support-border); }
  .article-content :global(iframe) { max-width: 100%; }
  .article-content :global(pre) { overflow-x: auto; }
  .page-subsections { position: sticky; top: 100px; max-height: calc(100dvh - 130px); overflow-y: auto; }
  .page-subsections h3 { font-size: 13px; font-weight: 600; margin: 0 0 16px; }
  .page-subsections button { display: block; width: 100%; text-align: left; font: inherit; font-size: 12px; line-height: 1.5; padding: 9px 12px; background: transparent; border: 0; border-left: 2px solid var(--support-border); color: var(--support-muted); cursor: pointer; }
  .page-subsections button.nested { padding-left: 24px; }
  .page-subsections button:hover { background: var(--support-hover); }
  .page-subsections button[aria-current] { border-color: var(--support-accent); color: var(--support-text); background: var(--support-selected); }
  .page-subsections button:focus-visible { outline: 2px solid var(--support-accent); outline-offset: -2px; }
  @media (min-width: 761px) and (max-width: 1100px) {
    .article-layout.has-headings { grid-template-columns: minmax(0, 1fr) 150px; gap: 20px; }
  }
  @media (max-width: 760px) {
    .article-layout.has-headings { grid-template-columns: 1fr; }
    .page-subsections { display: none; }
  }
</style>
