<script>
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { replaceState } from '$app/navigation';
  import Accordion from './Accordion.svelte';

  export let topic;
  export let title = null;

  $: activehash = $page.url.hash.slice(1)

  onMount(async () => {
    await tick();
    document.getElementById(activehash)?.closest('.tab')?.scrollIntoView();
  });

  // only one question open at a time, mirrored in the url hash
  $: openId = activehash;

  function toggle(id) {
    openId = openId === id ? '' : id;
    replaceState(openId ? `#${openId}` : $page.url.pathname + $page.url.search, $page.state);
  }
</script>

<div>
  <div class="header" id={(title ?? topic.title).toLowerCase().replace(/[^\w\s]/g, '').replaceAll(' ', '-')}>
    <h2 class="type-h2">{title ?? topic.title}</h2>
    {#if topic.image}<img src={topic.image} loading="eager" alt="{title ?? topic.title} banner" />{/if}
  </div>
  <div class="questions">
    {#each topic.questions as entry}
      {@const id = entry.question.toLowerCase().replace(/[^\w\s]/g, '').replaceAll(' ', '-')}
      <Accordion checked={id === openId} {id} on:click={() => toggle(id)}>
        <div slot="label" class="label type-h5">
          <span>{entry.question}</span>
        </div>
        <div class="details type-large" slot="content">
          {@html entry.answer}
        </div>
      </Accordion>
      <hr />
    {/each}
  </div>
</div>

<style>
  .header {
    width: 100%;
    min-height: 160px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 20px 32px;
    background-color: #000;
    margin-top: 2rem;
    margin-bottom: 2rem;

    & h2 {
      margin: 0;
      max-width: 60%;
      position: relative;
      z-index: 1;
      color: white;
    }

    & img {
      color: white;
      width: 320px;
      height: 200px;
      max-width: none;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    @media screen and (max-width: 760px) {
      & h2 {
        max-width: 100%;
        overflow-wrap: anywhere;
      }

      & img {
        display: none;
      }
    }

    @media screen and (max-width: 480px) {
      & {
        min-height: 120px;
        padding: 16px 20px;
      }
    }
  }

  .questions {
    & .label {
      margin: 1rem 0;
      margin-right: 0.75rem;
    }

    & .details {
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
