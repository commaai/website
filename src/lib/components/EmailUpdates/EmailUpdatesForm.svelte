<script>
  import Grid from '$lib/components/Grid.svelte';
  import BrandText from '$lib/components/BrandText.svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { EMAIL_CATEGORIES, createEmailUpdatesForm } from '$lib/email-updates.js';

  export let defaultCategory;
  export let title;
  export let margin;
  export let askForCar = false;

  const { email, car, selectedCategories, status, errorMessage, submit } = createEmailUpdatesForm();

  let everything = true;

  // linked to as ?car=2017%20bolt#email-updates
  $: carParam = browser && askForCar ? $page.url.searchParams.get('car') : null;
  $: if (carParam) car.set(carParam);

  $: primaryCategory = EMAIL_CATEGORIES.find(({ key }) => key === defaultCategory);
  $: $selectedCategories = everything ? EMAIL_CATEGORIES.map(({ key }) => key) : [defaultCategory];
</script>

<aside id="email-updates" class="updates-card" style:margin>
  <Grid
    columnGap="4rem"
    templateColumns="minmax(0, 1fr) minmax(22rem, 0.8fr)"
    size="large"
    wrapMode="single"
  >
    <div>
      <h2><BrandText text={title} /></h2>
      <div class="updates-subtitle type-large"><slot /></div>
    </div>

    {#if $status === 'success'}
      <div class="success type-large" role="status">
        <strong>Thanks for signing up!</strong>
        <span>We only send emails we would want to receive.</span>
      </div>
    {:else}
      <form id="email-updates-form" on:submit|preventDefault={submit}>
        <input
          name="email"
          type="email"
          autocomplete="email"
          data-1p-ignore
          placeholder="Enter your email"
          maxlength="256"
          required
          bind:value={$email}
        >

        {#if askForCar}
          <div class="car-field">
            <input
              name="car"
              type="text"
              data-1p-ignore
              placeholder="What do you drive? (optional)"
              maxlength="120"
              bind:value={$car}
            >
            <small>Add the make, model, and year and we'll email you when it's supported.</small>
          </div>
        {/if}

        <fieldset class="category-options">
          <label>
            <input type="radio" name="email-categories" value={true} bind:group={everything}>
            <span>
              <strong>All <span translate="no">comma</span> updates</strong>
              <small>New products, <span translate="no">openpilot</span> releases, car support, blog posts, events, and challenges</small>
            </span>
          </label>
          <label>
            <input type="radio" name="email-categories" value={false} bind:group={everything}>
            <span>
              <strong>Only <BrandText text={primaryCategory.label.toLowerCase()} /></strong>
              <small><BrandText text={primaryCategory.description} /></small>
            </span>
          </label>
        </fieldset>

        {#if $status === 'error'}
          <p class="error type-small" role="alert">{$errorMessage}</p>
        {/if}

        <button
          class="submit-button type-strong"
          type="submit"
          disabled={$status === 'submitting' || !$email}
        >
          {$status === 'submitting' ? 'signing up...' : 'notify me'}
        </button>
      </form>
    {/if}
  </Grid>
</aside>

<style>
  .updates-card {
    margin: 3rem 0;
    padding: 3rem;
    background: var(--color-card-background);
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  h2 {
    margin: 0 0 0.75rem;
  }

  .updates-subtitle :global(p) {
    max-width: 30rem;
    margin: 0;
  }

  .updates-subtitle :global(p + p) {
    margin-top: 1.35em;
  }

  form {
    display: grid;
    gap: 0.75rem;
    margin: 0;
  }

  input[type='email'],
  .car-field input {
    min-width: 0;
    box-sizing: border-box;
    padding: 1rem;
    color: #000;
    background: #fff;
    border: 1px solid #000;
  }

  input[type='email']:focus-visible,
  .car-field input:focus-visible {
    outline: 2px solid #000;
    outline-offset: -3px;
  }

  .car-field {
    display: grid;
    gap: 0.4rem;
  }

  .car-field small {
    opacity: 0.7;
  }

  .submit-button {
    padding: 1rem;
    cursor: pointer;
    background: var(--color-accent);
    border: none;
    transition: background-color 0.2s;
  }

  .submit-button:hover,
  .submit-button:focus-visible {
    background: var(--color-accent-hover);
  }

  .submit-button:disabled {
    color: #fff;
    cursor: not-allowed;
    background: var(--color-muted);
  }

  .category-options {
    display: grid;
    margin: 0;
    padding: 0;
    background: #fff;
    border: 1px solid #000;
  }

  .category-options label {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
  }

  .category-options label + label {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }

  .category-options input {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: #000;
  }

  .category-options label > span {
    display: grid;
    gap: 0.15rem;
    justify-items: start;
  }

  .success {
    display: grid;
    gap: 0.25rem;
    padding: 2rem;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    border: 1px solid rgba(48, 153, 0, 0.5);
  }

  .error {
    margin: 0;
    padding: 0.75rem;
    color: #8a0d05;
    background: color-mix(in srgb, var(--color-red) 10%, transparent);
    border: 1px solid var(--color-red);
  }

  @media screen and (max-width: 768px) {
    .updates-card {
      padding: 2rem 1rem;
    }
  }
</style>
