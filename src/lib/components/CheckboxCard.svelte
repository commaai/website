<script>
  import NoteCard from "./NoteCard.svelte";

  export let title;
  export let checked = false;
  export let onToggle;
</script>

<div class="checkbox-card">
  <NoteCard {title}>
    <label class="checkbox-label" slot="icon">
      <input type="checkbox" checked={checked} on:change={() => onToggle && onToggle()} />
    </label>
    <slot></slot>
  </NoteCard>
</div>

<style>
  .checkbox-card {
    margin: 1rem 0;
    position: relative;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .checkbox-label input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    margin: 0;
  }

  .checkbox-card :global(.icon-slot) {
    position: relative;
  }
</style>

