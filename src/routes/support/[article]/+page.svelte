<script>
  import Article from '$lib/components/Support/Article.svelte';
  import { supportHome } from '$lib/components/Support/content';
  export let data;
</script>

<svelte:head>
  <title>{data.article.title} — comma support</title>
  <meta name="description" content={data.article.description || supportHome.description} />
</svelte:head>

<Article article={data.article} />
