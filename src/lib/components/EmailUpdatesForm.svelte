<script>
  import Grid from '$lib/components/Grid.svelte';
  import InterestCheckboxes from '$lib/components/InterestCheckboxes.svelte';
  import {
    EMAIL_INTERESTS,
    EMAIL_UPDATES_COPY as COPY,
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
  $: ({ someSelected, allSelected } = getEmailInterestSelectionState(selectedInterests));

  function handleInterestChange(interest, checked) {
    selectedInterests = updateEmailInterestSelection(selectedInterests, interest, checked);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (!someSelected) {
      errorMessage = COPY.noInterests;
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
          <strong>{COPY.successTitle}</strong>
          <span>{COPY.successBody}</span>
        </div>
      {:else}
        <form aria-label={`${title} signup`} on:submit={handleFormSubmit}>
          <label class="visually-hidden" for={`${formId}-email`}>{COPY.emailLabel}</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autocomplete="email"
            placeholder={COPY.emailPlaceholder}
            maxlength="256"
            required
            bind:value={email}
          >

          <fieldset>
            <legend class="visually-hidden">{COPY.legend}</legend>
            <label class="primary-preference">
              <input
                type="checkbox"
                checked={selectedInterests[defaultCategory]}
                use:setIndeterminate={defaultCategory === 'all' && someSelected && !allSelected}
                on:change={(event) => handleInterestChange(defaultCategory, event.currentTarget.checked)}
              >
              <span>
                <strong>{defaultCategoryLabel}</strong>
                <small>{defaultCategorySubtitle}</small>
              </span>
            </label>

            {#if showCustomOptions}
              <div class="custom-options" id={`${formId}-options`}>
                <InterestCheckboxes
                  interests={additionalInterests}
                  {selectedInterests}
                  onChange={handleInterestChange}
                />
              </div>
            {/if}
            <button
              class="customize-button"
              type="button"
              aria-expanded={showCustomOptions}
              aria-controls={`${formId}-options`}
              on:click={() => showCustomOptions = !showCustomOptions}
            >
              <span>{showCustomOptions ? COPY.hideOptions : COPY.showOptions}</span>
              <span class="customize-icon" aria-hidden="true">{showCustomOptions ? '−' : '＋'}</span>
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
    text-align: left;
    background: var(--color-card-background);
    border: 1px solid rgba(0, 0, 0, 0.4);
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
    width: 100%;
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

  .primary-preference input:indeterminate {
    appearance: none;
    background: #fff linear-gradient(#000, #000) center / 0.65rem 2px no-repeat;
    border: 1px solid #000;
    border-radius: 3px;
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
    --interest-accent: #000;

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

  .customize-button:focus-visible {
    color: #fff;
    background: #000;
    outline: 0;
  }

  @media (hover: hover) and (pointer: fine) {
    .customize-button:hover {
      color: #fff;
      background: #000;
    }
  }

  .customize-icon {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
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

  .submit-button:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  .success {
    display: grid;
    gap: 0.25rem;
    padding: 2rem;
    font-size: 1.125rem;
    line-height: 1.35;
    background: rgba(81, 255, 0, 0.1);
    border: 1px solid rgba(48, 153, 0, 0.5);
  }

  .error {
    margin: 0;
    padding: 0.75rem;
    color: #8a0d05;
    font-size: 0.875rem;
    background: rgba(255, 65, 51, 0.08);
    border: 1px solid var(--color-red);
  }

  @media screen and (max-width: 1024px) {
    .updates-card {
      padding: 2rem;
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
