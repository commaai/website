<script>
  import Seo from "$lib/components/Seo.svelte";
  import Article from '$lib/components/Support/Article.svelte';
  export let data;
</script>

<Seo
  title="{data.article.title} — comma support"
  description={data.article.description}
  type="article"
/>

<Article article={data.article} />
