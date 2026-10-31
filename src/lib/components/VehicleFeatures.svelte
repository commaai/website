<script>
  export let features = [];

  $: groups = [
    {
      kind: 'adds',
      title: (count) => count === 1 ? 'new feature' : 'new features',
      features: features.filter((feature) => feature.kind === 'adds'),
    },
    {
      kind: 'upgrades',
      title: (count) => count === 1 ? 'upgrade' : 'upgrades',
      features: features.filter((feature) => feature.kind === 'upgrades'),
    },
  ].filter((group) => group.features.length > 0);
</script>

<div class="vehicle-features">
  {#each groups as group}
    <div class="group {group.kind}">
      <div class="group-title">
        <span class="count">{group.features.length}</span>
        {group.title(group.features.length)}
      </div>
      <ul>
        {#each group.features as feature}
          <li>
            <span class="icon" aria-hidden="true">
              {#if feature.kind === 'adds'}
                <svg viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" /></svg>
              {:else}
                <svg viewBox="0 0 16 16"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" /></svg>
              {/if}
            </span>
            <span class="text">
              {#if feature.href}
                <a class="label" href={feature.href}>{feature.label}</a>
              {:else}
                <span class="label">{feature.label}</span>
              {/if}
              {#if feature.description || feature.detail}
                <span class="description">
                  {[feature.description, feature.detail].filter(Boolean).join(' · ')}
                </span>
              {/if}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  .vehicle-features {
    display: grid;
    gap: 1.5rem;
  }

  .group-title {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
  }

  .count {
    display: inline-grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    line-height: 1;
  }

  .adds .count {
    background-color: var(--color-accent);
    color: var(--color-black);
  }

  .upgrades .count {
    background-color: var(--color-black);
    color: var(--color-white);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px dashed #c4c4c4;
    font-size: 1.125rem;
    line-height: 1.4;
  }

  .adds li {
    background-color: #f1ffe9;
    border-bottom-color: #a6c797;
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.0625rem;
    border: 1px solid var(--color-black);
    background-color: var(--color-white);

    & svg {
      width: 1rem;
      height: 1rem;
      fill: none;
      stroke: var(--color-black);
      stroke-width: 2.5;
      stroke-linecap: square;
    }
  }

  .adds .icon {
    background-color: var(--color-accent);
  }

  .label {
    color: inherit;
    font-weight: 700;
  }

  a.label {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  .description {
    display: block;
    margin-top: 0.1875rem;
    color: #616161;
    font-size: 0.9375rem;
    line-height: 1.45;
  }
</style>
