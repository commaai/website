<script>
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
    <div class="card">
      <hgroup>
        <span class="title-row">
          <span class="title">{option1.label || ''}</span>
          {#if option1.subheader}
            <span class="subheader">{option1.subheader}</span>
          {/if}
        </span>
        <div>
          <slot name="option1-content"></slot>
        </div>
      </hgroup>
    </div>
  </button>

  <button class="button" class:checked={value === option2.value} on:click={() => handleSelect(option2.value)}>
    <div class="card">
      <hgroup>
        <span class="title-row">
          <span class="title">{option2.label || ''}</span>
          {#if option2.subheader}
            <span class="subheader">{option2.subheader}</span>
          {/if}
        </span>
        <div>
          <slot name="option2-content"></slot>
        </div>
      </hgroup>
    </div>
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
    flex: 3;
  }

  .button:last-child {
    flex: 2;
  }

  .button .card {
    flex: 1;
    display: flex;
    margin: 0;
    padding: 1.5rem 1rem;
    align-items: center;
    color: black;
    border: 1px solid #616161;
    width: 100%;
  }

  .button .card hgroup {
    margin-left: 0;
    display: block !important;
    width: 100%;
  }

  .button .card hgroup .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }

  .button:last-child .card hgroup .title-row {
    justify-content: center;
  }

  .button .card hgroup .title-row .title {
    /*font-family: JetBrains Mono, monospace;*/
    /*font-size: 0.875rem;*/
    font-size: 1rem;
    font-weight: 400;
    /*text-transform: uppercase;*/
    line-height: 1.1;
    color: black;
  }

  .button .card hgroup .title-row .subheader {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    text-transform: none;
    text-align: right;
    line-height: 1.1;
  }

  .button .card hgroup div {
    display: block;
    color: #000000A6;
    font-size: 0.875rem;
    line-height: 1.25;
  }

  .button.checked .card {
    background-color: var(--color-accent);
  }

  .button.checked .card hgroup span {
    color: black;
  }
</style>
