<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Old or mistyped shop links land on the shop instead of a dead end
  onMount(() => {
    if ($page.status === 404 && $page.url.pathname.startsWith('/shop/')) {
      goto('/shop', { replaceState: true });
    }
  });

  import CommaIcon from '$lib/icons/comma.svg?raw';
</script>

<div class="page light">
  {@html CommaIcon}
  <h1>{$page.error.message}</h1>
  <span class="type-lead">An issue occurred. <a class="highlight" href="/">Click here</a> to go back to the homepage.</span>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 3rem;
    background-color: var(--color-background);
  }

  h1 {
    color: black !important;
    margin: 3rem 0 1rem;
  }

  span {
    color: black !important;
    margin-top: 1rem;
  }
</style>
