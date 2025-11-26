<script>
  import NoteCard from "./NoteCard.svelte";

  export let title;
  export let checked = false;
  export let onToggle;
  export let disabled = false;

  export function setChecked(value) {
    checked = value;
  }
</script>

<label class="checkbox-card" class:checked={checked} class:disabled={disabled}>
  <NoteCard {title}>
    <input type="checkbox" slot="icon" checked={checked} disabled={disabled} on:change={() => !disabled && onToggle && onToggle()} />
    <slot></slot>
  </NoteCard>
</label>

<style>
  .checkbox-card {
    cursor: pointer;
    display: block;
    color: green;
  }

  .checkbox-card.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .checkbox-card :global(input[type="checkbox"]) {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    accent-color: var(--color-accent);
  }

  .checkbox-card.disabled :global(input[type="checkbox"]) {
    cursor: not-allowed;
  }

  .checkbox-card.checked :global(.card hgroup span) {
    background-color: #86ff4e;
    color: black;
  }
</style>
