<script>
  import Grid from '$lib/components/Grid.svelte';
  import { EMAIL_INTERESTS, createEmailUpdatesForm } from '$lib/email-updates.js';

  // The interest this page leads with; everything is selected until you narrow to it.
  export let defaultCategory;
  export let title;
  export let margin;

  const { email, status, errorMessage, setScope, submit } = createEmailUpdatesForm();

  let scope = 'all';

  $: primaryInterest = EMAIL_INTERESTS.find((interest) => interest.key === defaultCategory);

  function choose(next) {
    scope = next;
    setScope(next === 'all' ? undefined : defaultCategory);
  }
</script>

<aside class="updates-card" aria-label={title} style:margin>
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
          aria-label="Email address"
          name="email"
          type="email"
          autocomplete="email"
          placeholder="Enter your email"
          maxlength="256"
          required
          bind:value={$email}
        >

        <fieldset class="scope-options" aria-label="Choose email updates">
          <label>
            <input
              type="radio"
              name="email-scope-{defaultCategory}"
              checked={scope === 'all'}
              on:change={() => choose('all')}
            >
            <span>
              <strong>All comma updates</strong>
              <small>New products, releases, car support, and blog posts</small>
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="email-scope-{defaultCategory}"
              checked={scope === 'only'}
              on:change={() => choose('only')}
            >
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

  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }

  input[type='email'] {
    min-width: 0;
    box-sizing: border-box;
    padding: 1rem;
    color: #000;
    font: inherit;
    background: #fff;
    border: 1px solid #000;
  }

  input[type='email']:focus-visible {
    outline: 2px solid #000;
    outline-offset: -3px;
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

  .scope-options span {
    display: grid;
    gap: 0.15rem;
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
