<script>
  export let style = "dark";
  export let display = "block";
  export let blackText = false;
</script>

<div
  class:dark={style == "dark"}
  class:light={style == "light"}
  class:accent={style == "accent"}
  class:light-green={style == "light-green"}
  class:red={style == "red"}
  class:black-text={blackText}
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

  .light-green {
    background-color: #86ff4e;
    color: var(--color-black);
  }

  .red {
    background-color: var(--color-red);
    color: black;
  }

  .black-text {
    color: var(--color-black);
  }
</style>
