<script>
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import ImmediateIcon from "$lib/icons/features/immediate.svg?raw";

  export let productName = "";
  export let title = "Setup Guide";
  export let stepCount = 0;
  export let estimatedMinutes = 0;
  export let link;
  export let image;
</script>

<Grid alignItems="center" size="large">
  <div class="installation-guide">
    <hgroup>
      <span>{productName}</span>
      <h2>{title}</h2>
    </hgroup>
    <div class="overview">
      <div>
        {@html ImmediateIcon}
        <span>{estimatedMinutes} min</span>
      </div>
    </div>
    <LinkButton href={link} style="primary" fullWidth={true}>View Guide</LinkButton>
  </div>
  <div class="mobile-first">
    <img src={image} loading="lazy" alt={productName} />
  </div>
</Grid>

<style>
  .installation-guide {
    max-width: 80%;

    @media screen and (max-width: 1024px) {
      & {
        max-width: 100%;
      }
    }

    & hgroup {
      & span {
        display: block;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }
    }

    & .overview {
      display: flex;
      align-items: center;
      max-width: 375px;
      margin: 2rem 0;

      & div {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      & span {
        margin-left: 1rem;
      }

      & .divider {
        width: 1px;
        height: 3rem;
        background-color: rgba(0, 0, 0, 0.2);
        margin: 0 2.5rem;
      }
    }
  }
</style>
