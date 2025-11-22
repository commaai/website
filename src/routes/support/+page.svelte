<script>
  import { page } from '$app/stores';

  import Grid from "$lib/components/Grid.svelte";
  import Faq from '$lib/components/Faq.svelte';
  import Accordion from '$lib/components/Accordion.svelte';

  import { supportFaqs } from '$lib/constants/support.svelte';
  import { faq } from '$lib/constants/faq.svelte';
</script>

<section class="light" id="support">
  <div class="container">
    <!-- <hr> -->
    <h1>comma support</h1>
    <div class="faq-sections">
      {#each Object.values(supportFaqs) as section}
        <div class="faq-section">
          <!-- <h3>{section.title}</h3> -->
          {#each section.questions as entry}
            <Accordion>
              <div slot="label" class="label">
                <span>{entry.question}</span>
              </div>
              <div class="details" slot="content">
                {@html entry.answer}
              </div>
            </Accordion>
            <hr />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="light" id="faq">
  <div class="container">
    <h1>FAQs</h1>
    {#each Object.keys(faq) as key}
      <div class="faq-card">
        <Faq topic={faq[key]} />
      </div>
    {/each}
  </div>
</section>

<style>
  #support {
    & .breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      padding: 1rem;
      background-color: var(--color-card-background);
      margin-bottom: 2rem;
      font-size: 1.25rem;

      & span {
        margin: 0 0.5rem;
        user-select: none;
      }

      & :last-child {
        font-weight: 600;
      }
    }

    & h2 {
      margin-bottom: 2rem;
    }

    & h3 {
      font-size: 1.875rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 2rem;
    }

    & a {
      color: #000;
      border-bottom: 2px solid #86ff4e;
      background-color: rgba(134, 255, 78, 0.15);
    }

    & li {
      font-size: 1rem;
    }

    & .support-card {
      border: 1px solid #000;
      background-color: var(--color-card-background);
      padding: 1rem;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: var(--color-card-background-hover);
          transform: scale(1.02);
        }
      }
      &:active {
        background-color: var(--color-card-background-hover);
        transform: scale(1.02);
      }

      & img {
        display: inline-block;
        mix-blend-mode: multiply;
        padding-bottom: 1rem;
        object-fit: contain;
      }

      & div {
        font-size: 1.25rem;
        font-weight: 600;
      }

      @media only screen and (max-width: 375px) {
        & div {
          font-size: 1rem;
          text-wrap: wrap;
        }
      }
    }

    & .header-line {
      display: flex;
      justify-content: space-around;
      align-items: center;

      & span {
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 1;
        margin: 1.5rem 0;
      }

      & .line {
        width: 100%;
        height: 1px;
        background-color: #000;
        margin-left: 1rem;
      }
    }
  }

  #faq {
    & .faq-card {
      margin-bottom: 3rem;
    }

    & .contact-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      background-color: #000;
      margin: 4rem 0;
      padding: 6rem 4rem;

      & h2 {
        color: white;
        font-size: 2rem;
        margin-bottom: 2rem;
      }

      & span {
        color: white;
        font-size: 1.25rem;
        line-height: 1.5;
        margin-bottom: 1rem;
      }

      & a {
        color: white;
      }
    }

  }

  .faq-sections {
    margin: 2rem 0;
  }

  .faq-section {
    margin-bottom: 3rem;
  }

  .label {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0;
    margin-right: 0.75rem;
  }

  .details {
    font-size: 1.25rem !important;
    line-height: 1.4;
    padding: 0.25rem 0 1rem;
  }

  .details :global(a) {
    color: #000;
    border-bottom: 2px solid #86ff4e;
    background-color: rgba(134, 255, 78, 0.15);
    text-decoration: none;
  }

  hr {
    border: none;
    border-top: 1px solid var(--surface-2);
    margin: 0;
  }
</style>
