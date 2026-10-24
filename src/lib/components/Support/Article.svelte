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

  function syncDropdownHash({ target }) {
    if (!(target instanceof HTMLDetailsElement) || !target.id) return;
    if (target.open) replaceState(`#${target.id}`, {});
    else if (location.hash === `#${target.id}`) replaceState(location.pathname + location.search, {});
  }

  function handleAnchorClick(event) {
    const anchor = event.target.closest('.heading-anchor');
    if (anchor) scrollToTopic(event, anchor.hash.slice(1));
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
  <article class="prose" on:toggle|capture={syncDropdownHash} on:click={handleAnchorClick}>{@html article.html}</article>
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
<div class="edit-row">
  <a class="edit-button" href="https://github.com/commaai/website/edit/master/{article.source}" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
    Edit this page
  </a>
</div>
<hr />
<SupportCatchAll />

<style>
  .support-page {
    display: flex;
    align-items: flex-start;
    gap: clamp(48px, 7vw, 120px);
  }

  /* overlay the gap above the hr instead of adding to it */
  .edit-row {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    box-sizing: border-box;
    height: var(--support-space);
    margin: calc(-1 * var(--support-space)) 0;
    padding-bottom: 12px;
  }

  .edit-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border: 1px solid var(--support-border);
    background-color: var(--color-card-background);
    color: var(--color-muted);
    font-size: 14px;
    font-weight: 500;

    &:hover {
      background-color: var(--color-card-background-hover);
      color: var(--color-foreground);
    }

    & svg {
      width: 14px;
      height: 14px;
    }
  }

  .prose {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;

    & > :first-child {
      margin-top: 0;
    }

    & h2 {
      margin: var(--support-space) 0 20px;
      font-size: clamp(32px, 3.2vw, 48px);
      font-weight: 400;
      line-height: 1.08;
      letter-spacing: -.04em;
    }

    & h3 {
      margin: 32px 0 16px;
      font-size: 21px;
      font-weight: 600;
      line-height: 1.3;
    }

    & h2 + h3 {
      margin-top: 0;
    }

    & p {
      margin: 0 0 20px;
    }

    & ul {
      padding-left: 22px;
    }

    & li {
      font: inherit;
      margin-bottom: 8px;
    }

    & img {
      display: block;
      width: auto;
      height: auto;
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

    & .heading-anchor {
      display: inline-flex;
      vertical-align: middle;
      margin-left: .3em;
      color: var(--color-muted);
      opacity: 0;
      transition: opacity .15s;

      &:hover {
        color: var(--color-foreground);
      }

      & svg {
        width: .6em;
        height: .6em;
      }
    }

    & h2:hover .heading-anchor,
    & .heading-anchor:focus-visible {
      opacity: 1;
    }

    & a:not(.card-link, .heading-anchor) {
      border-bottom: 2px solid var(--color-accent);
      background: var(--support-accent-soft);
    }

    & .card-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      box-sizing: border-box;
      min-height: 64px;
      margin: 10px 0;
      padding: 16px 20px;
      border: 1px solid var(--support-border);
      background: var(--color-card-background);
      font-weight: 600;

      &:hover {
        background: var(--color-card-background-hover);
      }
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
      font-size: 1.25rem;
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
      font-size: 1.25rem;
      line-height: 1.4;
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
    margin: 20px 0 32px;
  }

  .topics h2 {
    margin: 0 0 18px;
    font-size: 16px;
    font-weight: 600;
  }

  .topics a {
    display: block;
    padding: 12px 16px;
    border-left: 2px solid var(--support-border);
    color: var(--color-muted);
    font-size: 15px;
    line-height: 1.4;
  }

  .topics a.nested {
    padding-left: 28px;
    font-size: 14px;
  }

  .topics a:hover {
    background: var(--color-card-background-hover);
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

    .topics h2 {
      font-size: 18px;
    }

    .topics a {
      padding: 14px 18px;
      font-size: 17px;
    }

    .topics a.nested {
      padding-left: 30px;
      font-size: 15px;
    }
  }

  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
  }
</style>
