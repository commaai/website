<script>
  import { page } from '$app/stores';
  import GithubIcon from '$lib/icons/social/github.svg?raw';

  // Static routes edit their own +page.svelte; dynamic routes ([article], [product])
  // edit the file their load() says the content comes from, falling back to the route file.
  function sourceFor({ route, data, error }) {
    if (error || !route.id) return null;
    const dynamicSource = route.id.includes('[') && (data.article?.source ?? data.source);
    if (dynamicSource) return dynamicSource;
    return `src/routes${route.id === '/' ? '' : route.id}/+page.svelte`;
  }

  $: source = sourceFor($page);
</script>

{#if source}
  <a class="footer-edit-link" href="https://github.com/commaai/website/edit/master/{source}" target="_blank" rel="noopener">
    {@html GithubIcon}
    <span>Edit this page on GitHub</span>
  </a>
{/if}

<style>
  .footer-edit-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    transition: opacity 0.2s;
  }

  .footer-edit-link span {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .footer-edit-link :global(svg) {
    flex-shrink: 0;
    width: 0.875rem;
    height: 0.875rem;
  }

  @media (hover: hover) and (pointer: fine) {
    .footer-edit-link:hover {
      opacity: 0.65;
    }
  }

  .footer-edit-link:active {
    opacity: 0.65;
  }
</style>
