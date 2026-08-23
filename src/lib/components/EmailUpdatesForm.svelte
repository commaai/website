<script>
  import Grid from '$lib/components/Grid.svelte';
  import {
    EMAIL_INTERESTS,
    createEmailInterestSelection,
    getEmailInterestSelectionState,
    setCheckboxIndeterminate as setIndeterminate,
    submitEmailUpdates,
    updateEmailInterestSelection,
  } from '$lib/email-updates.js';

  export let title = 'Get email updates';
  export let defaultCategory = 'all';
  export let defaultCategorySubtitle = 'All comma email updates';
  export let formId = 'email-updates';
  export let margin;

  let email = '';
  let selectedInterests = createEmailInterestSelection(defaultCategory);
  let showCustomOptions = false;
  let status = 'idle';
  let errorMessage = '';

  $: additionalInterests = EMAIL_INTERESTS.filter((interest) => interest.key !== defaultCategory);
  $: defaultCategoryLabel = EMAIL_INTERESTS.find((interest) => interest.key === defaultCategory)?.label ?? 'Email updates';
  $: selectionState = getEmailInterestSelectionState(selectedInterests);
  $: someRealInterestsSelected = selectionState.someSelected;
  $: allRealInterestsSelected = selectionState.allSelected;

  function handleInterestChange(interest, checked) {
    selectedInterests = updateEmailInterestSelection(selectedInterests, interest, checked);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (!someRealInterestsSelected) {
      errorMessage = 'Choose at least one type of update.';
      status = 'error';
      return;
    }

    status = 'submitting';
    errorMessage = '';

    try {
      await submitEmailUpdates(email, selectedInterests);
      status = 'success';
    } catch (error) {
      errorMessage = error.message;
      status = 'error';
    }
  }
</script>

<aside class="updates-card" aria-labelledby={`${formId}-heading`} style:margin>
  <Grid
    columnGap="4rem"
    rowGap="1.5rem"
    templateColumns="minmax(0, 1fr) minmax(22rem, 0.8fr)"
    size="large"
    wrapMode="single"
  >
    <div class="updates-copy">
      <h2 id={`${formId}-heading`}>{title}</h2>
      <div class="updates-subtitle"><slot /></div>
    </div>

    <div class="form-wrapper">
      {#if status === 'success'}
        <div class="success" role="status">
          <strong>You're all set.</strong>
          <span>We'll send the updates you selected.</span>
        </div>
      {:else}
        <form aria-label={`${title} signup`} on:submit={handleFormSubmit}>
          <label class="visually-hidden" for={`${formId}-email`}>Email address</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autocomplete="email"
            placeholder="Enter your email"
            maxlength="256"
            required
            bind:value={email}
          >

          <fieldset>
            <legend class="visually-hidden">Choose email updates</legend>
            <label class="primary-preference">
              <input
                type="checkbox"
                checked={selectedInterests[defaultCategory]}
                use:setIndeterminate={defaultCategory === 'all' && someRealInterestsSelected && !allRealInterestsSelected}
                on:change={(event) => handleInterestChange(defaultCategory, event.currentTarget.checked)}
              >
              <span>
                <strong>{defaultCategoryLabel}</strong>
                <small>{defaultCategorySubtitle}</small>
              </span>
            </label>

            {#if showCustomOptions}
              <div class="custom-options">
                {#each additionalInterests as interest}
                  <label class:all={interest.key === 'all'} class="preference">
                    <input
                      type="checkbox"
                      checked={selectedInterests[interest.key]}
                      use:setIndeterminate={interest.key === 'all' && someRealInterestsSelected && !allRealInterestsSelected}
                      on:change={(event) => handleInterestChange(interest.key, event.currentTarget.checked)}
                    >
                    <span>{interest.label}</span>
                  </label>
                {/each}
              </div>
            {/if}
            <button
              class="customize-button"
              type="button"
              aria-expanded={showCustomOptions}
              on:click={() => showCustomOptions = !showCustomOptions}
            >
              <span>{showCustomOptions ? 'hide options' : 'choose updates'}</span>
              <span class="customize-icon" aria-hidden="true">{showCustomOptions ? '−' : '+'}</span>
            </button>
          </fieldset>

          {#if status === 'error'}
            <p class="error" role="alert">{errorMessage}</p>
          {/if}

          <button class="submit-button" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'signing up...' : 'notify me'}
          </button>
        </form>
      {/if}
    </div>
  </Grid>
</aside>

<style>
  .updates-card {
    box-sizing: border-box;
    padding: 3rem;
    overflow: hidden;
    text-align: left;
    background: var(--color-card-background);
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  .updates-copy {
    align-self: start;
  }

  .form-wrapper {
    min-width: 0;
  }

  h2 {
    margin: 0 0 0.75rem;
    font-size: 2.75rem;
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

  form,
  fieldset {
    margin: 0;
  }

  form {
    display: grid;
    gap: 0.75rem;
  }

  fieldset {
    padding: 0;
    border: 0;
  }

  input[type='email'] {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    color: #000;
    font: inherit;
    background: #fff;
    border: 1px solid #000;
  }

  input[type='email']:focus-visible {
    position: relative;
    z-index: 1;
    outline: 2px solid #000;
    outline-offset: -3px;
  }

  .submit-button {
    width: 100%;
    padding: 1rem;
    color: #000;
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

  .customize-button:focus-visible {
    color: #fff;
    background: #000;
    outline: 0;
  }

  .submit-button:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  .preference {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    width: fit-content;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0;
    cursor: pointer;
  }

  .preference input {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: #000;
  }

  input[type='checkbox']:indeterminate {
    appearance: none;
    background: #fff linear-gradient(#000, #000) center / 0.65rem 2px no-repeat;
    border: 1px solid #000;
    border-radius: 3px;
  }

  .preference:not(.all) {
    margin-left: 1rem;
  }

  .primary-preference {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    background: #fff;
    border: 1px solid #000;
  }

  .primary-preference input {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: #000;
  }

  .primary-preference span {
    display: grid;
    gap: 0.15rem;
  }

  .primary-preference small {
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0;
  }

  .custom-options {
    display: grid;
    gap: 0.6rem;
    padding: 0.9rem;
    background: #fff;
    border: 1px solid #000;
    border-top: 0;
  }

  .customize-button {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    color: #000;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    background: #fff;
    border: 1px solid #000;
    border-top: 0;
    transition: color 0.2s, background-color 0.2s;
  }

  .customize-button span {
    color: inherit;
  }

  @media (hover: hover) and (pointer: fine) {
    .customize-button:hover {
      color: #fff;
      background: #000;
    }
  }

  .customize-icon {
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1;
  }

  .success {
    display: grid;
    gap: 0.25rem;
    align-content: center;
    min-height: 8rem;
    box-sizing: border-box;
    padding: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.35;
    background: rgba(81, 255, 0, 0.1);
    border: 1px solid rgba(48, 153, 0, 0.5);
  }

  .success strong {
    font-weight: 700;
  }

  .error {
    margin: 0;
    padding: 0.75rem;
    color: #8a0d05;
    font-size: 0.875rem;
    background: rgba(255, 65, 51, 0.08);
    border: 1px solid var(--color-red);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media screen and (max-width: 1024px) {
    .updates-card {
      padding: 2rem;
    }

    .updates-copy {
      align-self: start;
    }
  }

  @media screen and (max-width: 520px) {
    .updates-card {
      padding: 1.5rem 1rem;
    }

    h2 {
      font-size: 1.6rem;
    }

    .updates-subtitle :global(p) {
      font-size: 1rem;
    }

    .success {
      font-size: 1rem;
    }

  }
</style>
