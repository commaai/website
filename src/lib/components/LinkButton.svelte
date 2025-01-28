<script>
  export let href;
  export let style = "primary";
  export let thin = false;
  export let fullWidth = false;
  export let target = "_self";
</script>

<a
  {href}
  {target}
  class:primary={style == "primary"}
  class:secondary={style == "secondary"}
  class:accent={style == "accent"}
  class:full-width={fullWidth}
  class:thin={thin}
>
  <slot></slot>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- right arrow -->
    <path
      d="M15 19L13.59 17.59L18.17 13L2 13V11L18.17 11L13.58 6.41L15 5L22 12L15 19Z"
      fill="CurrentColor"
    >
    </path>
  </svg>
</a>

<style>
  a {
    background-color: var(--color-accent);
    text-align: center;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    justify-content: center;
    padding: 1.25rem 3rem;
    font-size: 1.125rem;
    font-weight: 600;
    width: fit-content;
    display: flex;
    align-items: center;
    text-wrap: balance;
    transition: color 0.2s, background-color 0.2s, opacity 0.2s;

    @media (hover: hover) and (pointer: fine) {
      &.primary:hover {
        opacity: 0.75;
      }

      &.secondary:hover {
        opacity: 0.8;
      }

      &.accent:hover {
        color: black;
        background-color: var(--color-accent-hover);
      }
    }

    &.primary:active {
      opacity: 0.75;
    }

    &.secondary:active {
      opacity: 0.8;
    }

    &.accent:active {
      color: black;
      background-color: var(--color-accent-hover);
    }
  }

  @media screen and (max-width: 768px) {
    a {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  a.thin {
    font-size: 1rem;
    padding: 0.25rem 1rem;
  }

  svg {
    margin-left: 0.75rem;
  }

  .full-width {
    width: auto;
  }

  .primary {
    background-color: black;
    color: white;
  }

  .secondary {
    background-color: white;
    color: black;
  }

  .accent {
    background-color: var(--color-accent);
    color: black;
  }
</style>
