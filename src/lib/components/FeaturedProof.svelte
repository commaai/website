<script>
  import ProofWall from "$lib/components/ProofWall.svelte";

  const groups = [
    {
      show: "owners",
      label: "owners on 𝕏",
      meta: "@comma_ai",
      metaHref: "https://twitter.com/comma_ai",
    },
    {
      show: "press",
      label: "the press",
    },
  ];
</script>

{#each groups as group}
  <div class="subhead">
    <h2>{group.label}</h2>
    <span class="line" aria-hidden="true"></span>
    {#if group.metaHref}
      <a class="meta" href={group.metaHref} target="_blank" rel="noopener">{group.meta}</a>
    {/if}
  </div>

  <ProofWall show={group.show} />
{/each}

<style>
  .subhead {
    --head-size: clamp(1.75rem, 3vw, 2.5rem);
    --lowercase-drop: calc(var(--head-size) * 0.0908);

    align-items: center;
    display: flex;
    gap: 1.25rem;
    margin: 5rem 0 2rem;
  }

  .subhead:first-of-type {
    margin-top: 0;
  }

  h2 {
    font-size: var(--head-size);
    font-weight: 600;
    line-height: 1;
    margin: 0;
  }

  .line {
    background: #000;
    flex: 1;
    height: 1px;
    opacity: 0.25;
    transform: translateY(var(--lowercase-drop));
  }

  .meta {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    letter-spacing: normal;
    line-height: 1;
    transform: translateY(var(--lowercase-drop));
    transition: color 0.2s;
    white-space: nowrap;
  }

  @media (hover: hover) and (pointer: fine) {
    a.meta:hover {
      color: var(--color-foreground);
    }
  }

  @media screen and (max-width: 768px) {
    .subhead {
      margin: 3rem 0 1.5rem;
    }

    .meta {
      display: none;
    }
  }
</style>
