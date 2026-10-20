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
  <article class="prose rich-text">{@html article.html}</article>
  {#if article.toc.length}
    <aside class="sidebar">
      <nav class="topics" aria-label="Topics">
        <h2 class="support-label">Topics</h2>
        {#each article.toc as item}
          <a href="#{item.id}" on:click={e => scrollToTopic(e, item.id)} class="support-small" class:nested={item.nested} aria-current={activeId === item.id ? 'location' : undefined}>{item.label}</a>
        {/each}
      </nav>
    </aside>
  {/if}
</div>
<hr />
<SupportCatchAll />

<style>
  .support-page {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: clamp(48px, 7vw, 120px);
  }

  .prose {
    flex: 1;
    min-width: 0;
    max-width: 46rem;
    overflow-wrap: anywhere;

    & > :first-child {
      margin-top: 0;
    }

    & > :last-child {
      margin-bottom: 0;
    }

    & h2 {
      margin: 56px 0 16px;
    }

    & h3 {
      margin: 32px 0 12px;
    }

    & h2 + h3 {
      margin-top: 0;
    }

    & :is(p, ul, ol) {
      margin: 0 0 20px;
    }

    & :is(ul, ol) {
      padding-left: 1.5em;
    }

    & li {
      margin-bottom: 10px;
      padding-left: .25em;
    }

    & li > p:last-child {
      margin-bottom: 0;
    }

    & li::marker {
      color: var(--color-muted);
      font-variant-numeric: tabular-nums;
    }

    & li > :is(ul, ol) {
      margin: 10px 0 0;
    }

    & img {
      display: block;
      box-sizing: border-box;
      max-height: 300px;
      margin: 32px auto 20px;
      border: 1px solid var(--support-border);
    }

    & iframe {
      display: block;
      width: min(100%, 560px);
      height: auto;
      aspect-ratio: 16 / 9;
      margin: 0 auto 20px;
    }

    & pre {
      overflow-x: auto;
    }

    & code {
      font-size: .875em;
      letter-spacing: 0;
    }

    & .card-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 64px;
      margin: 10px 0;
      padding: 16px 20px;
      font-weight: 600;
    }

    & .card-link-arrow {
      display: flex;
      flex: 0 0 28px;
      justify-content: center;
    }

    & .card-link-arrow svg {
      width: 24px;
      height: 24px;
    }

    & .dropdown {
      border-bottom: 1px solid var(--support-rule);
    }

    & .dropdown summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding-right: 2rem;
      cursor: pointer;
      list-style: none;
    }

    & .dropdown summary::-webkit-details-marker {
      display: none;
    }

    & .dropdown-label {
      margin: 1rem 0;
      font-weight: 600;
    }

    & .dropdown-chevron svg {
      display: block;
      width: 18px;
      height: 12px;
    }

    & .dropdown[open] .dropdown-chevron {
      transform: rotate(180deg);
    }

    & .dropdown-content {
      padding: .25rem 0 1rem;
    }

    & .dropdown-content > :first-child {
      margin-top: 0;
    }

    & .dropdown-content > :last-child {
      margin-bottom: 0;
    }
  }

  .sidebar {
    flex: 0 0 260px;
    position: sticky;
    top: 100px;
    max-height: calc(100dvh - 120px);
    overflow-y: auto;
  }

  .topics {
    margin: 0 0 32px;
  }

  .topics h2 {
    margin: 0 0 14px;
  }

  .topics a {
    display: block;
    padding: 12px 16px;
    border-left: 2px solid var(--support-border);
    color: var(--color-muted);
  }

  .topics a.nested {
    padding-left: 28px;
  }

  @media (hover: hover) and (pointer: fine) {
    .topics a:hover {
      background: var(--color-card-background-hover);
    }
  }

  .topics a[aria-current] {
    border-color: var(--color-accent);
    color: var(--color-foreground);
    background: var(--support-accent-soft);
  }

  .topics a:focus-visible {
    outline-offset: -2px;
  }

  @media (min-width: 1440px) {
    .sidebar {
      flex-basis: 300px;
    }

    .topics a {
      padding: 12px 18px;
    }

    .topics a.nested {
      padding-left: 30px;
    }
  }

  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
  }
</style>
