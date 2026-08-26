<script>
  import Grid from '$lib/components/Grid.svelte';
  import { EMAIL_INTERESTS, createEmailUpdatesForm } from '$lib/email-updates.js';

  // The interest this page leads with; everything is selected until you narrow to it.
  export let defaultCategory;
  export let title;
  export let margin;
  export let askForCar = false;

  const { email, car, status, errorMessage, setScope, submit } = createEmailUpdatesForm();

  let scope = 'all';

  $: primaryInterest = EMAIL_INTERESTS.find((interest) => interest.key === defaultCategory);
  $: setScope(scope === 'all' ? undefined : defaultCategory);
</script>

<aside class="updates-card" style:margin>
  <Grid
    columnGap="4rem"
    templateColumns="minmax(0, 1fr) minmax(22rem, 0.8fr)"
    size="large"
    wrapMode="single"
  >
    <div>
      <h2>{title}</h2>
      <div class="updates-subtitle"><slot /></div>
    </div>

    {#if $status === 'success'}
      <div class="success" role="status">
        <strong>Thanks for signing up!</strong>
        <span>We only send emails we would want to receive.</span>
      </div>
    {:else}
      <form on:submit|preventDefault={submit}>
        <input
          name="email"
          type="email"
          autocomplete="email"
          placeholder="Enter your email"
          maxlength="256"
          required
          bind:value={$email}
        >

        {#if askForCar}
          <div class="car-field">
            <input
              type="text"
              placeholder="Enter your car (optional)"
              maxlength="120"
              bind:value={$car}
            >
            <small>
              Enter your make, model, and year. We'll email you when your car is supported.
            </small>
          </div>
        {/if}

        <fieldset class="scope-options">
          <label>
            <input type="radio" name="email-scope" value="all" bind:group={scope}>
            <span>
              <strong>All comma updates</strong>
              <small>New products, openpilot releases, car support, blog posts, and more</small>
            </span>
          </label>
          <label>
            <input type="radio" name="email-scope" value="only" bind:group={scope}>
            <span>
              <strong>Only {primaryInterest.label.toLowerCase()}</strong>
              <small>{primaryInterest.description}</small>
            </span>
          </label>
        </fieldset>

        {#if $status === 'error'}
          <p class="error" role="alert">{$errorMessage}</p>
        {/if}

        <button
          class="submit-button"
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
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.06em;
  }

  .updates-subtitle :global(p) {
    max-width: 30rem;
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.35;
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
    font: inherit;
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
    font-size: 0.8125rem;
    line-height: 1.35;
    letter-spacing: 0;
    opacity: 0.7;
  }

  .submit-button {
    padding: 1rem;
    font: inherit;
    font-weight: 600;
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

  .scope-options {
    display: grid;
    margin: 0;
    padding: 0;
    background: #fff;
    border: 1px solid #000;
  }

  .scope-options label {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
  }

  .scope-options label + label {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }

  .scope-options input {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: #000;
  }

  .scope-options label > span {
    display: grid;
    gap: 0.15rem;
    justify-items: start;
  }

  .scope-options small {
    font-size: 0.875rem;
    letter-spacing: 0;
  }

  .success {
    display: grid;
    gap: 0.25rem;
    padding: 2rem;
    font-size: 1.125rem;
    line-height: 1.35;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    border: 1px solid rgba(48, 153, 0, 0.5);
  }

  .error {
    margin: 0;
    padding: 0.75rem;
    color: #8a0d05;
    font-size: 0.875rem;
    background: color-mix(in srgb, var(--color-red) 10%, transparent);
    border: 1px solid var(--color-red);
  }

  @media screen and (max-width: 768px) {
    .updates-card {
      padding: 2rem 1rem;
    }
  }
</style>
