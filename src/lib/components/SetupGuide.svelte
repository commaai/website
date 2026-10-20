<script>
  import Grid from "$lib/components/Grid.svelte";
  import Button from "$lib/components/Button.svelte";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import ImmediateIcon from "$lib/icons/features/immediate.svg?raw";

  export let productName = "";
  export let title = "Setup Guide";
  export let estimatedMinutes = 0;
  export let link;
  export let image;
</script>

<div class="setup-guide">
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
    <Button href={link} style="primary" fullWidth={true}>View Guide</Button>
  </div>
  <div class="mobile-first">
    <img src={image} loading="lazy" alt={productName} />
  </div>
</Grid>
</div>

<style>
  @media screen and (min-width: 1025px) {
    .setup-guide {
      margin-bottom: 1.5rem;
    }
  }

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
      }

      & span {
        margin-left: 1rem;
      }
    }
  }
</style>
