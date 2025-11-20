<script>
  import { page } from '$app/stores';
  import Accordion from './Accordion.svelte';
  import Grid from './Grid.svelte';

  export let topic;
  export let title = null;

  const handleExpand = (id) => {
    history.replaceState(null, null, `#${id}`);
  }

  $: activehash = $page.url.hash.slice(1)
</script>

<div>
  <div class="header" id={(title ?? topic.title).toLowerCase().replace(/[^\w\s]/g, '').replaceAll(' ', '-')}>
    <h1>{title ?? topic.title}</h1>
  </div>
  <div class="questions">
    {#each topic.questions as entry}
      {@const id = entry.question.toLowerCase().replace(/[^\w\s]/g, '').replaceAll(' ', '-')}
      <Accordion checked={id === activehash} on:click={() => handleExpand(id)} {id} alternateBackground={true}>
        <div slot="label" class="label">
          <span>{entry.question}</span>
        </div>
        <div class="details" slot="content">
          {@html entry.answer}
        </div>
      </Accordion>
<!--      <div style="height: 1rem;"></div>-->
    {/each}
  </div>
</div>

<style>
  .header {
    /*background-color: #000;*/
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-left: 2rem;
    /*padding: 1rem;*/

    & h1 {
      letter-spacing: -0.06em;
      font-size: 3rem;
      font-weight: 400;
      color: black;
      text-wrap: balance;

      @media screen and (max-width: 1024px) {
        & {
          font-size: 2.5rem;
        }
      }

      @media screen and (max-width: 480px) {
        & {
          font-size: 2rem;
        }
      }

      @media screen and (max-width: 375px) {
        & {
          font-size: 1.5rem;
        }
      }
    }

    & img {
      color: white;
      width: 100%;
    }
  }

  .questions {
    & .label {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 1rem 0;
      margin-right: 0.75rem;
    }

    & .details {
      font-size: 1.25rem !important;
      line-height: 1.4;
      padding: 0.25rem 0 1rem;

      & *:first-child {
        margin-top: 0;
      }

      & *:last-child {
        margin-bottom: 0;
      }

      & a {
        color: #000;
        border-bottom: 2px solid #86ff4e;
        background-color: rgba(134, 255, 78, 0.15);
      }

      & li {
        font-size: 1.25rem;
      }

      & .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;

        & iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
