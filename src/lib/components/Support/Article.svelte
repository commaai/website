<script>
  import SupportHeader from './SupportHeader.svelte';
  import SupportCatchAll from './SupportCatchAll.svelte';

  export let article;

  let activeId = '';

  function trackActiveHeading(node, toc) {
    let frame;

    function update() {
      frame = undefined;
      const headings = toc.map(item => document.getElementById(item.id)).filter(Boolean);
      if (!headings.length) return;
      const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const scrollMargin = Number.parseFloat(getComputedStyle(headings[0]).scrollMarginTop) || 0;
      const activationLine = scrollPadding + scrollMargin + 2;
      activeId = (headings.findLast(heading => heading.getBoundingClientRect().top <= activationLine) ?? headings[0]).id;
    }

    function schedule() {
      frame ??= requestAnimationFrame(update);
    }

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(node);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return {
      update(newToc) {
        toc = newToc;
        schedule();
      },
      destroy() {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
  }

  function jumpToHeading(event, item) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(item.id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    activeId = item.id;
  }
</script>

<SupportHeader title={article.title} description={article.description} image={article.image} imageAlt={article.imageAlt || article.title} icon={article.icon} />
<div class="support-page-grid" class:has-sidebar={article.toc.length} use:trackActiveHeading={article.toc}>
  <article class="support-prose">{@html article.html}</article>
  {#if article.toc.length}
    <aside class="support-page-sidebar">
      <nav class="topics" aria-label="Topics">
        <h2>Topics</h2>
        {#each article.toc as item}
          <a href="#{item.id}" class:nested={item.nested} aria-current={activeId === item.id ? 'location' : undefined} on:click={(event) => jumpToHeading(event, item)}>{item.label}</a>
        {/each}
      </nav>
    </aside>
  {/if}
</div>
<hr class="support-divider" />
<SupportCatchAll />

<style>
  .topics { margin: 20px 0 32px; }
  .topics h2 { margin: 0 0 18px; font-size: 16px; font-weight: 600; }
  .topics a { display: block; padding: 12px 16px; border-left: 2px solid var(--support-border); color: var(--support-muted); font-size: 15px; line-height: 1.4; text-decoration: none; }
  .topics a.nested { padding-left: 28px; font-size: 14px; }
  .topics a:hover { background: var(--support-hover); }
  .topics a[aria-current] { border-color: var(--support-accent); color: var(--support-text); background: #e5ffd9; }
  .topics a:focus-visible { outline: 2px solid var(--support-accent); outline-offset: -2px; }
  @media (min-width: 1440px) { .topics h2 { font-size: 18px; } .topics a { font-size: 17px; padding: 14px 18px; } .topics a.nested { padding-left: 30px; font-size: 15px; } }
</style>
