<script>
  export let value;
</script>

<div class="select">
  <select bind:value>
    <slot></slot>
  </select>
</div>

<style>
  .select {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    border: 1px solid #a0a0a0;
    padding: 0.25em 0.5em;
    font-size: 1.25rem;
    cursor: pointer;
  }

  select {
    font-size: inherit;
    font-weight: 600;
    text-wrap: balance;
    appearance: none;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 1rem;
    width: 100%;

    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 50%;
  }
</style>
