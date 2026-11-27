<script>
  import BrandText from "$lib/components/BrandText.svelte";
  import Grid from "$lib/components/Grid.svelte";

  export let releaseNote;
</script>

<div class="release-note">
  <Grid columns={2} alignItems="center">
    <img src={releaseNote.cover} alt="{releaseNote.title} feature highlights" />
    <div>
      <hgroup>
        <span class="type-label">{releaseNote.date}</span>
        <a class="highlight type-h4 type-regular" href={releaseNote.link}><BrandText text={releaseNote.title} /></a>
      </hgroup>
      <p class="type-lead"><BrandText text={releaseNote.excerpt} /></p>
    </div>
  </Grid>
</div>

<style>
  .release-note {
    border-top: 1px solid #000;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  img {
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin-right: 1.5rem;
  }

  hgroup {
    & span {
      margin-bottom: 0.25rem;
    }

    & a {
      display: block !important;
      width: fit-content;
      margin-top: 0.25rem;
    }
  }
</style>
