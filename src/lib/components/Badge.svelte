<script>
  export let style = "dark";
  export let display = "block";
</script>

<div
  class="mono-label"
  class:dark={style == "dark"}
  class:light={style == "light"}
  class:accent={style == "accent"}
  style="display: {display}"
>
  <slot></slot>
</div>

<style>
  div {
    width: fit-content;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .dark {
    background-color: #232323;
    color: #fff;
  }

  .light {
    background-color: #fff;
    color: black;
  }

  .accent {
    background-color: var(--color-accent);
    color: black;
  }
</style>
