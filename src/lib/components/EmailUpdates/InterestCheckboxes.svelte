<script>
  export let interests;
  export let selected;
  export let onChange;
</script>

{#each interests as { key, label }}
  <label class="preference">
    <input
      type="checkbox"
      checked={selected[key]}
      on:change={(event) => onChange(key, event.currentTarget.checked)}
    >
    <span>{label}</span>
  </label>
{/each}

<style>
  .preference {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    width: fit-content;
    touch-action: manipulation;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0;
    cursor: pointer;
  }

  .preference input {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: var(--interest-accent);
  }
</style>
