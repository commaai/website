<script>
  import BoldCheckmark from "$lib/icons/ui/bold-checkmark.svg?raw";

  export let title;
  export let checked = false;
  export let onToggle;
  export let disabled = false;

  export function setChecked(value) {
    checked = value;
  }
</script>

<label class="select-card" class:checked class:disabled>
  <input type="checkbox" {checked} {disabled} on:change={() => !disabled && onToggle && onToggle()} />
  <div class="checkbox">
    {#if checked}{@html BoldCheckmark}{/if}
  </div>
  <div class="content">
    <span class="title">{title}</span>
    <div class="description"><slot /></div>
  </div>
</label>

<style>
  .select-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    margin: 1rem 0;
    border: 2px solid #222;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .select-card:hover {
    border-color: #000;
    background: #fafafa;
  }

  .select-card.checked {
    border-color: var(--color-accent);
    background: linear-gradient(135deg, rgba(134, 255, 78, 0.08), rgba(134, 255, 78, 0.02));
  }

  .select-card.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .select-card input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .checkbox {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #222;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checked .checkbox {
    background: var(--color-accent);
    border-color: var(--color-accent);
  }

  .checkbox :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
    color: #005c03;
  }

  .content {
    flex: 1;
    min-width: 0;
  }

  .title {
    display: block;
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: #000;
    margin-bottom: 0.25rem;
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.4;
    color: #555;
  }

  .description :global(a) {
    color: #000;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
</style>
