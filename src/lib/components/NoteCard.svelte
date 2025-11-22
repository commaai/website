<script>
  import InfoIcon from "$lib/icons/ui/info.svg?raw";

  export let icon = InfoIcon;
  export let title;
  export let style = "normal" // or "elevated", useful when rendered within a card
</script>

<div class="card" class:elevated={style == "elevated"}>
  <div class="icon-slot">
    <slot name="icon">
      {@html icon}
    </slot>
  </div>
  <hgroup>
    <span>{title}</span>
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

      & span {
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
        background-image: none;

        &:hover {
          opacity: 0.8;
          background-color: transparent;
        }
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
