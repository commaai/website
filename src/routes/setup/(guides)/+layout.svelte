<script>
  import { page } from "$app/stores";
  import Grid from "$lib/components/Grid.svelte";
  import CommunityBanner from "$lib/components/CommunityBanner.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";
  import ImmediateIcon from "$lib/icons/features/immediate.svg?raw";
</script>

<section class="light" id="installation-guide">
  <div class="container">
    <div class="header">
      <Grid columns={2} columnGap="5rem" rowGap="0" templateColumns="1.5fr 0.75fr" size="large">
        <div class="title">
          <hgroup>
            <span>{$page.data.product}</span>
            <h1>{$page.data.title}</h1>
          </hgroup>
          <div class="media-container">
            {#if $page.data.imgSrc}
              <img src={$page.data.imgSrc} loading="lazy" alt={`${$page.data.product} setup guide`} />
            {:else if $page.data.videoSrc}
              <iframe
                src={$page.data.videoSrc}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen=""
                title={`${$page.data.product} setup guide`}
              ></iframe>
            {/if}
          </div>
          <div class="overview">
            <div>
              {@html RecordingsIcon}
              <span>{$page.data.stepCount} steps</span>
            </div>
            <div class="divider" />
            <div>
              {@html ImmediateIcon}
              <span>{$page.data.minuteEstimate} min</span>
            </div>
          </div>
        </div>
        <div>
          <div class="parts-card">
            <div class="header">Parts:</div>
            {#each $page.data.parts as part}
              <div class="contents">
                <div>
                  <Grid rowGap={0} columnGap="1rem" alignItems="center" size="small" wrapMode="none">
                    <div class="content-header">
                      <img src={part.image} loading="lazy" alt={part.name} />
                      <a href={part.link} target="_blank" class="highlight">{part.name}</a>
                    </div>
                    <span class="muted">{part.price}</span>
                  </Grid>
                </div>
                <ul>
                  {#each part.contents as content}
                    <li>{content}</li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
          {#each $page.data.notes as note}
            <NoteCard title={note.title}>
              {@html note.content}
            </NoteCard>
          {/each}
        </div>
      </Grid>
    </div>
  </div>
</section>

<slot></slot>

<section class="dark" id="community">
  <div class="container">
    <CommunityBanner />
  </div>
</section>

<style>
  #installation-guide {
    padding-bottom: 2rem;

    & .header {
      & .title {
        & hgroup {
          & span {
            display: block;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }

          & h1 {
            margin-top: 0;
            margin-right: 1rem;
          }
        }
      }

      & .media-container {
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

      & .overview {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
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

      & .parts-card {
        border: 1px solid #000;
        border-bottom: 0;
        margin-bottom: 1.5rem;

        & .header {
          font-size: 0.875rem;
          font-family: JetBrains Mono, monospace;
          text-transform: uppercase;
          color: #fff;
          background-color: #000;
          padding: 0.75rem 1rem;
        }

        & .contents {
          display: flex;
          flex-flow: column;
          align-items: start;
          justify-content: space-between;
          padding: 0.875rem 1rem;
          border-bottom: 1px solid #000;

          & div {
            width: 100%;

            & .content-header {
              display: flex;
              align-items: center;
              justify-content: start;
              gap: 1rem;

              & img {
                min-width: 45px;
                max-width: 60px;
                object-fit: contain;
                border: 1px solid rgba(0, 0, 0, 0.12);
                padding: 0.5rem;
              }

              & a {
                text-wrap: nowrap;
              }
            }
          }

          & span {
            text-align: end;
          }

          & li {
            font-size: 1rem;
            text-wrap: balance;
          }
        }
      }
    }
  }
</style>
