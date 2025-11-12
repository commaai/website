<script>
  import NoteCard from "./NoteCard.svelte";

  export let title;
  export let checked = false;
  export let onToggle;
</script>

<label class="checkbox-card">
  <NoteCard {title}>
    <input type="checkbox" slot="icon" checked={checked} on:change={() => onToggle && onToggle()} />
    <slot></slot>
  </NoteCard>
</label>

<style>
  .checkbox-card {
    cursor: pointer;
    display: block;
  }

  .checkbox-card :global(input[type="checkbox"]) {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  }

  .checkbox-card.checked :global(.card hgroup span) {
    background-color: #86ff4e;
    color: black;
  }
</style>

