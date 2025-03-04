<script>
  import InfoIcon from "$lib/icons/ui/info.svg?raw";

  export let icon = InfoIcon;
  export let title;
  export let style = "normal" // or "elevated", useful when rendered within a card
</script>

<div class="card" class:elevated={style == "elevated"}>
  <div>{@html icon}</div>
  <hgroup>
    <span class="title">{title}</span>
    <div>
      <slot></slot>
    </div>
  </hgroup>
</div>

<style>
  .card {
    display: flex;
    margin: 1rem 0;
    padding: 1rem;
    align-items: center;
    color: black;
    border: 1px solid #616161;

    & hgroup {
      margin-left: 1rem;
      display: block !important;

      & .title {
        font-family: JetBrains Mono, monospace;
        font-size: 0.875rem;
        font-weight: 400;
        text-transform: uppercase;
        line-height: 1.1;
        margin-bottom: 0.25rem;
        color: black;
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

      & h1, & h2, & h3, & h4, & h5, & h6 {
        margin-block: 1rem;
      }

      & h1 {
        font-size: 1.5rem;
      }

      & h2 {
        font-size: 1.25rem;
      }

      & h3 {
        font-size: 1.125rem;
      }

      & h4 {
        font-size: 1rem;
      }

      & h5 {
        font-size: 0.875rem;
      }

      & h6 {
        font-size: 0.75rem;
      }

      & li {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      & ul, & ol {
        padding-left: 1.5rem;
        margin: 0.5rem 0;
      }
    }
  }

  .elevated {
    color: black;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: rgba(68, 65, 58, .12);

    & hgroup {
      & span {
        color: black;
      }
    }
  }
</style>
