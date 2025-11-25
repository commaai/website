<script>
  import NoteCard from "./NoteCard.svelte";

  export let options = []; // Array of two options: [{value: 'option1', label: 'Label 1'}, {value: 'option2', label: 'Label 2'}]
  export let value = null; // Currently selected value
  export let onSelect; // callback function when selection changes

  const handleSelect = (selectedValue) => {
    if (value === selectedValue) {
      value = null;
    } else {
      value = selectedValue;
    }
    console.log("Selected value:", value);
    onSelect && onSelect(value);
  };

  $: option1 = options[0] || {};
  $: option2 = options[1] || {};
</script>

<div class="button-group">
  <button class="button" class:checked={value === option1.value} on:click={() => handleSelect(option1.value)}>
    <NoteCard title={option1.label || ''}>
      <div slot="icon"></div>
      <slot name="option1-content"></slot>
    </NoteCard>
  </button>

  <button class="button" class:checked={value === option2.value} on:click={() => handleSelect(option2.value)}>
    <NoteCard title={option2.label || ''}>
      <div slot="icon"></div>
      <slot name="option2-content"></slot>
    </NoteCard>
  </button>
</div>

<style>
  .button-group {
    display: flex;
    align-items: stretch;
    gap: 1rem;
    margin: 1rem 0 0;
  }

  .button {
    cursor: pointer;
    display: flex;
    flex: 1;
    color: green;
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    text-align: inherit;
  }

  .button:first-child {
    flex: 2;
  }

  .button:last-child {
    flex: 1;
  }

  .button :global(.card) {
    flex: 1;
    display: flex;
    margin: 0;
  }

  .button :global(.card hgroup) {
    margin-left: 0;
  }

  .button.checked :global(.card) {
    background-color: var(--color-accent);
  }

  .button.checked :global(.card hgroup span) {
    color: black;
  }
</style>
