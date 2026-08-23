<script>
  import { setCheckboxIndeterminate as setIndeterminate } from '$lib/email-updates.js';

  export let interests;
  export let selected;
  export let selection;
  export let onChange;
</script>

{#each interests as interest}
  <label class:all={interest.key === 'all'} class="preference">
    <input
      type="checkbox"
      checked={selected[interest.key]}
      use:setIndeterminate={interest.key === 'all' && selection.someSelected && !selection.allSelected}
      on:change={(event) => onChange(interest.key, event.currentTarget.checked)}
    >
    <span>{interest.label}</span>
  </label>
{/each}

<style>
  /* The host sets --interest-accent to tint the control for its background. */
  .preference {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    width: fit-content;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0;
    cursor: pointer;
  }

  .preference:not(.all) {
    margin-left: 1rem;
  }

  .preference input {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: var(--interest-accent);
  }

  .preference input:indeterminate {
    appearance: none;
    background: #fff linear-gradient(#000, #000) center / 0.65rem 2px no-repeat;
    border: 1px solid var(--interest-accent);
    border-radius: 3px;
  }
</style>
