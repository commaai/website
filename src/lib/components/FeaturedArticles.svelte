<script>
  // Featured press articles about comma.ai
  const articles = [
    {
      source: "TechCrunch",
      title: "Comma.ai's self-driving kit",
      url: "https://techcrunch.com/tag/comma-ai/"
    },
    {
      source: "The Verge",
      title: "Open source autonomous driving",
      url: "https://www.theverge.com/2016/11/30/13779336/comma-ai-autopilot-canceled-autonomous-car-software-free"
    },
    {
      source: "Bloomberg",
      title: "Self-driving car pioneer",
      url: "https://www.bloomberg.com/profile/company/1521197D:US"
    }
  ];
</script>

<div class="featured-articles">
  {#each articles as article}
    <a href={article.url} target="_blank" rel="noopener noreferrer" class="article-item">
      <span class="source muted">{article.source}</span>
      <span class="title">{article.title}</span>
    </a>
  {/each}
</div>

<style>
  .featured-articles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }

  .article-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: border-color 0.2s;
    text-decoration: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .article-item:hover {
      border-color: var(--color-accent);
    }
  }

  .article-item:active {
    border-color: var(--color-accent);
  }

  .source {
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
  }
</style>
