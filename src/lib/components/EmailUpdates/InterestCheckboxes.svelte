<script>
  import { EMAIL_INTERESTS, allSelected, anySelected, setCheckboxIndeterminate } from '$lib/email-updates.js';

  export let interests;
  export let selected;
  export let onChange;

  $: all = allSelected(selected);

  const changeAll = (checked) => EMAIL_INTERESTS.forEach(({ key }) => onChange(key, checked));
</script>

<label class="preference all">
  <input
    type="checkbox"
    checked={all}
    use:setCheckboxIndeterminate={anySelected(selected) && !all}
    on:change={(event) => changeAll(event.currentTarget.checked)}
  >
  <span>All updates</span>
</label>

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
