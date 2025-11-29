<script>
  export let style = "dark";
  export let display = "block";
  export let noMargin = false;
</script>

<div
  class:dark={style == "dark"}
  class:light={style == "light"}
  class:accent={style == "accent"}
  class:no-margin={noMargin}
  style="display: {display}"
>
  <slot></slot>
</div>

<style>
  div {
    font-family: JetBrains Mono, monospace;
    font-size: 0.875rem;
    text-transform: uppercase;
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
    color: var(--color-background);
  }

  .no-margin {
    margin-bottom: 0;
  }
</style>
