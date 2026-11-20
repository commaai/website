<script>
  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import HarnessSelector from "$lib/components/HarnessSelector/HarnessSelector.svelte";
  import SetupGuides from "$lib/setup-guides.json";

  import { faq } from "$lib/constants/faq.svelte";

  import { FOUR_PRICE, FOUR_SALE, FOUR_STRIKETHROUGH_PRICE } from '$lib/constants/prices.js';

  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";


  import CommaFourDeviceImage from "$lib/images/products/comma-four/four_screen_on.png";

  import TrimImage from "$lib/images/setup/comma-four/trim.jpg";
  import Trim1Image from "$lib/images/setup/comma-four/trim-1.jpg";
  import Trim2Image from "$lib/images/setup/comma-four/trim-2.jpg";
  import Trim3Image from "$lib/images/setup/comma-four/trim-3.jpg";
  import Trim4Image from "$lib/images/setup/comma-four/trim-4.jpg";
  import WiresImage from "$lib/images/setup/comma-four/wires.jpg";
  import Wires1Image from "$lib/images/setup/comma-four/wires-1.jpg";
  import AlignImage from "$lib/images/setup/comma-four/align.jpg";
  import Mount1Image from "$lib/images/setup/comma-four/mount-1.jpg";
  import PressImage from "$lib/images/setup/comma-four/press.jpg";
  import ObdcImage from "$lib/images/setup/comma-four/obdc.jpg";
  import Plug2Image from "$lib/images/setup/comma-four/plug-2.jpg";
  import RemountImage from "$lib/images/setup/comma-four/remount.jpg";
  import CameraImage from "$lib/images/setup/comma-four/camera.jpg";
  import Camera1Image from "$lib/images/setup/comma-four/camera-1.jpg";
  import Plug1Image from "$lib/images/setup/comma-four/plug-1.jpg";
  import PlugImage from "$lib/images/setup/comma-four/plug.jpg";
  import StepSixImage from "$lib/images/setup/comma-3x/step-6.jpeg";
  import CommaPowerImage from "$lib/images/products/comma-power/comma-power.jpg";

  let selectedVehicle = undefined;
  const handleHarnessSelection = (value) => {
    selectedVehicle = value;
  }

  $: guide = SetupGuides[selectedVehicle?.car] || SetupGuides.default;
  $: setupVideo = getVideoEmbedSrc(guide.video);

  const photos = {
    'camera-access': [TrimImage, Trim1Image, Trim2Image, Trim3Image],
    'camera-connect': [CameraImage, Camera1Image, Plug1Image, PlugImage],
    mount: [AlignImage, Mount1Image, PressImage],
    device: [ObdcImage, Plug2Image, RemountImage],
    'device-remote': [Plug2Image, RemountImage],
    'camera-close': [Wires1Image, Trim4Image, WiresImage, TrimImage],
    power: [CommaPowerImage],
  };
  const locations = new Set(['footwell', 'cargo', 'cluster', 'glovebox', 'overhead', 'module']);

  function getVideoEmbedSrc(videoLink) {
    if (!videoLink) return null;
    try {
      const url = new URL(videoLink);
      if (!['youtu.be', 'www.youtube.com', 'youtube.com'].includes(url.hostname)) return null;
      const videoId = url.searchParams.get('v') || url.pathname.slice(1);
      if (!/^[\w-]{11}$/.test(videoId)) return null;
      return `https://www.youtube.com/embed/${videoId}?rel=0&controls=1&autoplay=0&mute=0`;
    } catch {
      return null;
    }
  }
</script>

<section class="light" id="installation-guide">
  <div class="container">
    <div class="header">
      <hgroup>
        <span style="font-size: 1.5rem; margin-bottom: 0.5rem;">comma four</span>
        <h2 style="font-size: 3rem; font-weight: 600;">Setup Guide</h2>
      </hgroup>
      <Grid columns={2} columnGap="5rem" rowGap="0" templateColumns="1.5fr 0.75fr" alignItems="start" size="large">
        <div class="title">
          <div class="media-container">
            <iframe
              src={setupVideo}
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen=""
              title="setup video"
            ></iframe>
          </div>
          {#if guide.video_is_reference}
            <p class="media-caption video-note"><strong>Installation may differ.</strong> Some steps in this video may differ for your car or comma hardware. Follow your vehicle’s guide below.</p>
          {/if}
          <div class="overview">
            <div>
              {@html RecordingsIcon}
              <span>{guide.steps.length} steps</span>
            </div>

          </div>
        </div>
        <div>
          <div class="parts-card">
            <div class="header">Parts:</div>
            <div class="contents">
              <div>
                <Grid rowGap={0} columnGap="1rem" alignItems="center" size="small">
                  <div class="content-header">
                    <img src={CommaFourDeviceImage} loading="lazy" alt="comma four" />
                    <span><a href="/shop/comma-four" target="_blank" class="highlight">comma four</a></span>
                  </div>
                  {#if FOUR_SALE}
                    <div class="price-group">
                      {#if FOUR_STRIKETHROUGH_PRICE}
                        <span class="muted strikethrough-price">${FOUR_STRIKETHROUGH_PRICE}</span>
                      {/if}
                      <span class="red-price">${FOUR_PRICE}</span>
                    </div>
                  {:else}
                    <span class="muted">${FOUR_PRICE}</span>
                  {/if}
                </Grid>
              </div>
              <ul>
                {#each guide.parts as part}
                  <li>{part}</li>
                {/each}
              </ul>
              <a href="/shop/car-harness" class="highlight">Find your car harness</a>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  </div>
</section>

<section class="light" id="guide">
  <div class="container">
    <div class="card vehicle-notes">
      <div class="header">Customize Your Guide</div>
      <div class="contents">
        <p>Select your vehicle to customize the steps below:</p>
        <HarnessSelector
          label="Select your vehicle"
          placeholder="Search for your vehicle"
          onChange={handleHarnessSelection}
          showGenericHarnesses={false}
          hideSupportNoteCard={true}
          restoreSelection={true}
        />

        <div class="setup-notes" aria-live="polite">
          <p class="note-heading">{selectedVehicle?.car || 'Standard installation'}</p>
          <p>{guide.summary}</p>
          {#if selectedVehicle?.package}
            <p><strong>Factory equipment:</strong> {selectedVehicle.package}</p>
          {/if}
          {#each guide.notes || [] as note}
            <p class="guide-note">{note}</p>
          {/each}

        </div>
      </div>
    </div>

    {#each guide.steps as step, index (step.id)}
      {#if index > 0}<hr />{/if}
      <div class="step" id="step-{index + 1}">
        <Badge style="dark">Step {index + 1} <span class="muted">of {guide.steps.length}</span></Badge>
        <h2>{step.title}</h2>
        <Grid templateColumns="0.875fr 0.75fr">
          {#if locations.has(step.media)}
            <figure class="location-figure">
              <img src={'/images/setup/' + step.media + '.svg'} loading="lazy" alt={step.title} />
              <figcaption>{step.media === 'module' ? 'Connection overview. Connector appearance varies by vehicle.' : 'Location overview. Follow the text for the correct side and use the linked references to identify the connector.'}</figcaption>
            </figure>
          {:else}
            <figure class="location-figure">
            <div class="image-grid" class:single-image={photos[step.media]?.length === 1}>
              {#each photos[step.media] || [] as photo, photoIndex}
                {#if step.media === 'mount' && photoIndex === 0}
                  <div class="crop-wrapper"><img src={photo} loading="lazy" alt="Check mount alignment" /></div>
                {:else}
                  <img src={photo} loading="lazy" alt="{step.title} — image {photoIndex + 1}" />
                {/if}
              {/each}
            </div>
            {#if step.media.startsWith('camera-') || step.media === 'device'}
              <figcaption>Example installation. Camera covers, connector positions and cable routing vary by vehicle.</figcaption>
            {/if}
            </figure>
          {/if}
          <div>
            <ul>
              {#each step.body as instruction}
                <li>{instruction}</li>
              {/each}
            </ul>
            {#each step.sources.filter(source => source.url !== 'https://comma.ai/setup') as source}
              <p class="step-reference"><a href={source.url} target="_blank" rel="noreferrer" class="highlight">{source.title} ↗</a></p>
            {/each}
          </div>
        </Grid>
      </div>
    {/each}

    {#if guide.sources?.length}
      <details class="setup-reference sources">
        <summary>Vehicle installation references</summary>
        <ul>
          {#each guide.sources as source}
            <li><a href={source.url} target="_blank" rel="noreferrer" class="highlight">{source.title}</a></li>
          {/each}
        </ul>
      </details>
    {/if}

    <hr />
    <div class="step">
      <Badge style="dark">OPTIONAL STEP</Badge>
      <h2>Pair your device with comma connect</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div>
          <img src={StepSixImage} loading="lazy" alt="comma connect application logo" />
        </div>
        <div>
          <p>
            Pair your comma four with <a href="https://connect.comma.ai/" target="_blank" class="highlight">connect.comma.ai</a> on your phone to see your recorded drives.
          </p>
          <br />
          <LinkButton href="https://connect.comma.ai/" target="_blank" style="primary" fullWidth={true}>comma Connect</LinkButton>
        </div>
      </Grid>
    </div>

    {#if guide.power === "optional"}
    <hr />
    <div class="step">
      <Badge style="dark">OPTIONAL STEP</Badge>
      <h2>Add the comma power</h2>
      <Grid templateColumns="0.875fr 0.75fr">
        <div>
          <img src={CommaPowerImage} loading="lazy" alt="comma power" />
        </div>
        <div>
          {#each guide.power_notes || [] as note}
            <p>{note}</p>
          {/each}
          <ul>
            {#each guide.power_instructions as instruction}
              <li>{instruction}</li>
            {/each}
          </ul>
          <p>
            With a comma power:
          </p>
          <ul>
            <li>The start and end of every drive are recorded.</li>
            <li>Your comma four remains powered and online while the car is off.</li>
            <li>Your comma four downloads updates while the car is off.</li>
          </ul>
        </div>
      </Grid>
    </div>
    {/if}

  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.devices} title="Frequently asked questions" />
  </div>
</section>

<style>
  .step .step-reference { font-size: 1rem; margin: 0.75rem 0; }
  .setup-notes .guide-note { margin-top: 0.75rem; }
  .video-note { border-left: 3px solid #86ff4e; padding-left: 0.875rem; }
  .location-figure { margin: 0; }
  .location-figure img { width: 100%; display: block; }
  .location-figure figcaption, .media-caption { font-size: 0.875rem; color: #666; line-height: 1.5; margin-top: 0.75rem; }
  .setup-reference { width: 100%; margin-top: 1.5rem; }
  .setup-reference summary { cursor: pointer; text-decoration: underline; text-underline-offset: 4px; }
  .sources { margin: 3rem 0; font-size: 1rem; }
  .sources li { margin: 0.75rem 0; }
  .image-grid.single-image { grid-template-columns: 1fr; }

  #installation-guide {
    padding-bottom: 2rem;

    & .header {
      & hgroup {
        margin-bottom: 2rem;

        & h1 {
          margin: 0;
          font-size: 3rem;
        }

        & h2 {
          margin: 0.5rem 0 0 0;
          font-size: 2rem;
          font-weight: normal;
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
          font-family: var(--font-mono);
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

              & span {
                white-space: nowrap;

                @media screen and (max-width: 480px) {
                  white-space: normal;
                }
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

  .price-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .strikethrough-price {
    text-decoration: line-through;
  }

  .red-price {
    color: var(--color-sale-red);
    font-weight: 700;
  }

  .card {
    border: 1px solid #000;
    border-bottom: 0;
    margin-bottom: 4rem;

    & .header {
      font-size: 0.875rem;
      font-family: var(--font-mono);
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
    }
  }

  .step {
    & h2 {
      margin-top: 1rem;
    }

    & p, & li {
      font-size: 1.5rem;

      @media screen and (max-width: 1024px) {
        font-size: 1.25rem;
      }
    }

    & li {
      margin-bottom: 1rem;
    }

    & .card {
      margin-bottom: 1rem;
    }

    & .image-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.7rem;
      align-items: start;

      & img {
        width: 100%;
        height: auto;
      }

      & .crop-wrapper {
        overflow: hidden;
        position: relative;
        aspect-ratio: 1 / 1;

        & img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: top;
        }
      }
    }
  }

  #faq {
    margin-bottom: 2rem;
  }

  hr {
    margin: 2rem 0 3rem;

    @media screen and (min-width: 1025px) {
      margin-top: 3.5rem;
    }
  }

  .vehicle-notes {
    margin-top: 1rem;
    font-size: 1.25rem;

    & p {
      margin: 0.25rem 0 0;
    }

    & .setup-notes {
      width: 100%;
      margin: 1rem 0 0.5rem;

      & .note-heading {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      & ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      & li {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
      }

      & a {
        color: #000;
        border-bottom: 2px solid #86ff4e;
        background-color: rgba(134, 255, 78, 0.15);
      }

      & .media-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */

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
