<script>
  import { getEmailInterestSelectionState, setCheckboxIndeterminate as setIndeterminate } from '$lib/email-updates.js';

  export let interests;
  export let selectedInterests;
  export let onChange;

  $: ({ someSelected, allSelected } = getEmailInterestSelectionState(selectedInterests));
</script>

{#each interests as interest}
  <label class="preference" class:all={interest.key === 'all'}>
    <input
      type="checkbox"
      checked={selectedInterests[interest.key]}
      use:setIndeterminate={interest.key === 'all' && someSelected && !allSelected}
      on:change={(event) => onChange(interest.key, event.currentTarget.checked)}
    >
    <span>{interest.label}</span>
  </label>
{/each}

<style>
  /* Colours come from the host: --interest-accent tints the control itself. */
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
