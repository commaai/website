<script>
  import Article from '$lib/components/Support/Article.svelte';
  export let data;
</script>

<svelte:head>
  <title>{data.article.title} — comma support</title>
  <meta name="description" content={data.article.description} />
</svelte:head>

<Article article={data.article} />
