<script>
  import Article from '$lib/components/Support/Article.svelte';
  export let data;
</script>

<svelte:head>
  <title>{data.product.title} — comma</title>
  <meta name="description" content={data.product.description} />
</svelte:head>

<Article article={data.product} />
