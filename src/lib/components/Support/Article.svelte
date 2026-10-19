<script>
  import SupportHeader from './SupportHeader.svelte';
  import SupportCatchAll from './SupportCatchAll.svelte';
  import { replaceState } from '$app/navigation';

  export let article;

  function scrollToTopic(event, id) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    replaceState(`#${id}`, {});
  }

  let activeId = '';

  // Highlight the topic whose heading is in the band just below the sticky header
  function trackActiveHeading(node, toc) {
    let observer;
    function observe(toc) {
      observer?.disconnect();
      activeId = toc[0]?.id ?? '';
      observer = new IntersectionObserver(entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) activeId = visible.target.id;
      }, { rootMargin: '-96px 0px -70% 0px' });
      toc.forEach(item => {
        const heading = document.getElementById(item.id);
        if (heading) observer.observe(heading);
      });
    }
    observe(toc);
    return { update: observe, destroy: () => observer.disconnect() };
  }
</script>

<SupportHeader title={article.title} description={article.description} image={article.image} imageAlt={article.imageAlt || article.title} />
<div class="support-page" use:trackActiveHeading={article.toc}>
  <article class="support-prose">{@html article.html}</article>
  {#if article.toc.length}
    <aside class="sidebar">
      <nav class="topics" aria-label="Topics">
        <h2>Topics</h2>
        {#each article.toc as item}
          <a href="#{item.id}" on:click={e => scrollToTopic(e, item.id)} class:nested={item.nested} aria-current={activeId === item.id ? 'location' : undefined}>{item.label}</a>
        {/each}
      </nav>
    </aside>
  {/if}
</div>
<hr class="support-divider" />
<SupportCatchAll />

<style>
  .support-page { display: flex; align-items: flex-start; gap: clamp(48px, 7vw, 120px); }
  .support-prose { flex: 1; min-width: 0; }
  .sidebar { flex: 0 0 260px; position: sticky; top: 100px; max-height: calc(100dvh - 120px); overflow-y: auto; }
  .topics { margin: 20px 0 32px; }
  .topics h2 { margin: 0 0 18px; font-size: 16px; font-weight: 600; }
  .topics a { display: block; padding: 12px 16px; border-left: 2px solid var(--support-border); color: var(--color-muted); font-size: 15px; line-height: 1.4; }
  .topics a.nested { padding-left: 28px; font-size: 14px; }
  .topics a:hover { background: var(--color-card-background-hover); }
  .topics a[aria-current] { border-color: var(--color-accent); color: var(--color-foreground); background: var(--support-highlight); }
  .topics a:focus-visible { outline-offset: -2px; }

  @media (min-width: 1440px) {
    .sidebar { flex-basis: 300px; }
    .topics h2 { font-size: 18px; }
    .topics a { padding: 14px 18px; font-size: 17px; }
    .topics a.nested { padding-left: 30px; font-size: 15px; }
  }

  @media (max-width: 760px) {
    .sidebar { display: none; }
  }
</style>
