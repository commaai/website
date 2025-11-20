<script>
  export let title;
  export let subtitle = "";  // placed on the right side
  export let checked = false;
  export let disabled = false;
  export let checkedStyle = "accent"; // "accent" or "black"
  export let onToggle;
</script>

<label class="checkbox-card" class:checked={checked} class:disabled={disabled} class:black-checked={checked && checkedStyle === "black"}>
  <div class="card">
    <div class="icon-slot">
      <input type="checkbox" checked={checked} disabled={disabled} on:change={() => !disabled && onToggle && onToggle()} />
    </div>
    <hgroup>
      <span class="title-row">
        <span class="title">{title}</span>
        {#if subtitle}
          <span class="subtitle">{subtitle}</span>
        {/if}
      </span>
      <div>
        <slot></slot>
      </div>
    </hgroup>
  </div>
</label>

<style>
  .checkbox-card {
    cursor: pointer;
    display: block;
    color: green;
  }

  .checkbox-card.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .checkbox-card :global(input[type="checkbox"]) {
    display: none;
    cursor: pointer;
    accent-color: var(--color-accent);
  }

  .card {
    display: flex;
    margin: 1rem 0;
    padding: 1.5rem 24px 1.5rem 24px;
    align-items: center;
    color: black;
    background-color: rgb(217, 217, 217);

    & hgroup {
      display: block !important;
      width: 100%;

      & .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        font-size: 24px;
        text-transform: lowercase;
        line-height: 1;

        & .title {
          color: black;
          text-decoration: underline;
        }

        & .subtitle {
          text-transform: none;
          font-weight: normal;
        }
      }

      & div {
        display: block;
        color: #000000A6;
        font-size: 0.875rem;
        line-height: 1.25;
      }

      & a {
        color: black;
        border-bottom: 2px solid #616161;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .checkbox-card.checked :global(.card) {
    background-color: var(--color-accent);
    color: black;
  }

  .checkbox-card.black-checked :global(.card) {
    background-color: black;
    color: white;

    & .title-row .title {
      color: white;
    }
  }

  .checkbox-card.disabled :global(.card) {
    background-color: #EAEAEA;
    cursor: not-allowed;

    & .title-row .title {
      text-decoration: none;
    }
  }
</style>
