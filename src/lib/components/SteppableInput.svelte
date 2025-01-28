<script>
  export let onChange;
  export let value;
  export let label;
</script>

<div>
  <button
    on:click={() => {
      let nextValue = value - 1;
      onChange(nextValue);
    }}
    aria-label="Decrement {label}"
  >
    -
  </button>
  <input
    type="number"
    min="0"
    aria-label={label}
    bind:value
    on:change={() => {
      onChange(value);
    }}
  />
  <button
    on:click={() => {
      let nextValue = value + 1;
      onChange(nextValue);
    }}
    aria-label="Increment {label}"
  >
    +
  </button>
</div>

<style>
  div {
    display: flex;
    height: 35px;
  }

  input {
    width: 45px;
    text-align: center;
    border: none;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    font-size: 1rem;
    border-radius: 0;

    &[type="number"],
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: textfield;
      margin: 0;
    }
  }

  button {
    width: 2rem;
    padding: 0;
    border: 1px solid #000;
    background-color: transparent;
    color: black;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
</style>
