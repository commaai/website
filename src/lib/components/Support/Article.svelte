<script>
  import SupportHeader from './SupportHeader.svelte';
  import SupportCatchAll from './SupportCatchAll.svelte';
  import SectionNav from './SectionNav.svelte';

  export let article;

  let activeId = '';

  // Highlights the last table of contents heading scrolled past the top of the viewport.
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
      <SectionNav items={article.toc} {activeId} onSelect={jumpToHeading} />
    </aside>
  {/if}
</div>
<hr class="support-divider" />
<SupportCatchAll />
