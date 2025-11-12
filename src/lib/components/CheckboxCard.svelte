<script>
  import { clickOutside } from '$lib/utils/clickOutside';
  import NoteCard from "./NoteCard.svelte";
  import ChevronIcon from '$lib/icons/icon-chevron.svg?raw';

  export let title;
  export let checked = false;
  export let onToggle;

  let expanded = false;

  const handleCardClick = (e) => {
    // Don't toggle if clicking the checkbox label
    if (e.target.closest('.checkbox-label')) return;
    expanded = !expanded;
  };
</script>

<div class="checkbox-card" use:clickOutside on:clickOutside={() => expanded = false}>
  <div class="card-wrapper" on:click={handleCardClick} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && (expanded = !expanded)}>
    <NoteCard {title}>
      <label class="checkbox-label" slot="icon">
        <input type="checkbox" checked={checked} on:change={() => onToggle && onToggle()} />
      </label>
      <slot></slot>
    </NoteCard>
    <span class="chevron" class:expanded={expanded}>{@html ChevronIcon}</span>
  </div>
  {#if expanded}
    <div class="dropdown-content">
      <slot name="instructions"></slot>
    </div>
  {/if}
</div>

<style>
  .checkbox-card {
    margin: 1rem 0;
    position: relative;
  }

  .card-wrapper {
    position: relative;
    cursor: pointer;
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

  .chevron {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.2s;
    pointer-events: none;

    & > svg {
      width: 18px;
      height: 12px;
    }

    &.expanded {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
    padding: 1rem;
    background: white;
    border: 1px solid #616161;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>

