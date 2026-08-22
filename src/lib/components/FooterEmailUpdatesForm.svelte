<script>
  import ArrowRight from '$lib/icons/arrow-right.svg?raw';

  const INTERESTS = [
    { key: 'all', label: 'All updates' },
    { key: 'general', label: 'General updates', fieldName: 'group[54660][1]' },
    { key: 'releases', label: 'New openpilot releases', fieldName: 'group[54660][4]' },
    { key: 'compatibility', label: 'Car compatibility updates', fieldName: 'group[54660][2]' },
    { key: 'blog', label: 'New blog posts', fieldName: 'group[54660][8]' },
  ];
  const REAL_INTEREST_KEYS = INTERESTS.filter(({ key }) => key !== 'all').map(({ key }) => key);

  let email = '';
  let selectedInterests = Object.fromEntries(INTERESTS.map(({ key }) => [key, true]));
  let showOptions = false;
  let status = 'idle';
  let errorMessage = '';
  let componentElement;

  $: selectedRealInterestCount = REAL_INTEREST_KEYS.filter((key) => selectedInterests[key]).length;
  $: someRealInterestsSelected = selectedRealInterestCount > 0;
  $: allRealInterestsSelected = selectedRealInterestCount === REAL_INTEREST_KEYS.length;

  function setIndeterminate(node, indeterminate) {
    node.indeterminate = indeterminate;

    return {
      update(value) {
        node.indeterminate = value;
      },
    };
  }

  function handleInterestChange(interest, checked) {
    if (interest === 'all') {
      selectedInterests = Object.fromEntries(INTERESTS.map(({ key }) => [key, checked]));
      return;
    }

    const nextInterests = {
      ...selectedInterests,
      [interest]: checked,
    };
    nextInterests.all = REAL_INTEREST_KEYS.every((key) => nextInterests[key]);
    selectedInterests = nextInterests;
  }

  function cleanMessage(message) {
    const element = document.createElement('div');
    element.innerHTML = message;
    return element.textContent || 'Please try again.';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!someRealInterestsSelected) {
      errorMessage = 'Choose at least one type of update.';
      status = 'error';
      showOptions = true;
      return;
    }

    status = 'submitting';
    errorMessage = '';

    const selectedCar = window.localStorage.getItem('selectedCar');
    const callbackName = `mailchimpFooterUpdates_${Math.random().toString(36).slice(2, 11)}`;
    const script = document.createElement('script');
    const params = new URLSearchParams({
      u: 'e127cf7151180db2b566d880b',
      id: 'f150bd2a9c',
      EMAIL: email,
      Email: email,
      SOURCE: window.location.pathname,
      c: callbackName,
    });

    if (selectedCar) params.set('SELECTCAR', selectedCar);
    for (const { key, fieldName } of INTERESTS) {
      if (fieldName && selectedInterests[key]) params.set(fieldName, '');
    }

    function cleanUp() {
      script.remove();
      delete window[callbackName];
    }

    window[callbackName] = function(response) {
      const alreadySubscribed = /already subscribed/i.test(response.msg || '');

      if (response.result === 'success' || alreadySubscribed) {
        status = 'success';
      } else {
        errorMessage = cleanMessage(response.msg || 'Please try again.');
        status = 'error';
      }

      cleanUp();
    };

    script.onerror = function() {
      errorMessage = 'We could not reach Mailchimp. Please try again.';
      status = 'error';
      cleanUp();
    };

    script.src = `https://comma.us12.list-manage.com/subscribe/post?${params}`;
    document.body.appendChild(script);
  }
</script>

<svelte:window
  on:pointerdown={(event) => {
    if (showOptions && componentElement && !event.composedPath().includes(componentElement)) showOptions = false;
  }}
  on:keydown={(event) => {
    if (event.key === 'Escape') showOptions = false;
  }}
/>

<div class="footer-email-updates" bind:this={componentElement}>
  {#if status === 'success'}
    <div class="success" role="status">
      <strong>You're all set.</strong>
      <span>We'll send the updates you selected.</span>
    </div>
  {:else}
    <div class="copy">
      <strong>Get the latest updates</strong>
      <span>Products, releases, car support, and more.</span>
    </div>

    <form aria-label="Email updates signup" on:submit={handleFormSubmit}>
      <div class="email-row">
        <label class="visually-hidden" for="footer-updates-email">Email address</label>
        <input
          id="footer-updates-email"
          name="email"
          type="email"
          autocomplete="email"
          placeholder="Enter your email"
          maxlength="256"
          required
          bind:value={email}
        >
        <button class="submit-button" type="submit" aria-label="Subscribe" disabled={status === 'submitting'}>
          <span class="submit-arrow" aria-hidden="true">{@html ArrowRight}</span>
        </button>
      </div>

      {#if status === 'error'}
        <p class="error" role="alert">{errorMessage}</p>
      {/if}

      <div class="options-control">
        <button
          class="options-button"
          type="button"
          aria-expanded={showOptions}
          aria-controls="footer-update-options"
          on:click={() => showOptions = !showOptions}
        >
          <span>{showOptions ? 'hide options' : 'choose updates'}</span>
          <span class="options-icon" aria-hidden="true">{showOptions ? '−' : '+'}</span>
        </button>

        {#if showOptions}
          <fieldset id="footer-update-options">
            <legend class="visually-hidden">Choose email updates</legend>
            {#each INTERESTS as interest}
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
          </fieldset>
        {/if}
      </div>
    </form>
  {/if}
</div>

<style>
  .footer-email-updates {
    width: 100%;
    color: #fff;
  }

  .copy {
    display: grid;
    gap: 0.2rem;
    margin-bottom: 0.75rem;
  }

  .copy strong {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0;
  }

  .copy span {
    color: #aaa;
    font-size: 0.8rem;
    line-height: 1.35;
  }

  form {
    margin: 0;
  }

  .email-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 3rem;
  }

  input[type='email'] {
    min-width: 0;
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    padding: 0.75rem;
    color: #fff;
    font: inherit;
    background: #080808;
    border: 1px solid #777;
    border-right: 0;
  }

  input[type='email']:focus-visible {
    position: relative;
    z-index: 1;
    outline: 2px solid #fff;
    outline-offset: -3px;
  }

  .submit-button {
    display: grid;
    place-items: center;
    padding: 0;
    color: #000;
    font: inherit;
    font-size: 1.35rem;
    cursor: pointer;
    background: var(--color-accent);
    border: 0;
  }

  .submit-button span {
    color: inherit;
  }

  .submit-arrow {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
  }

  .submit-arrow :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  .submit-button:hover,
  .submit-button:focus-visible {
    background: var(--color-accent-hover);
  }

  .submit-button:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  .options-button {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0.6rem 0 0;
    padding: 0.65rem 0.75rem;
    color: #fff;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 1px solid #777;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .options-control {
    position: relative;
  }

  .options-button:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (hover: hover) and (pointer: fine) {
    .options-button:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: #fff;
    }
  }

  .options-icon {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1;
  }

  fieldset {
    position: absolute;
    right: 0;
    bottom: calc(100% + 0.5rem);
    left: 0;
    z-index: 10;
    display: grid;
    gap: 0.6rem;
    margin: 0;
    padding: 0.9rem;
    background: #080808;
    border: 1px solid #777;
    box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.45);
  }

  .preference {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    width: fit-content;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0;
    cursor: pointer;
  }

  .preference:not(.all) {
    margin-left: 1rem;
  }

  .preference input {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: #fff;
  }

  input[type='checkbox']:indeterminate {
    appearance: none;
    background: #fff linear-gradient(#000, #000) center / 0.65rem 2px no-repeat;
    border: 1px solid #fff;
    border-radius: 3px;
  }

  .success {
    display: grid;
    gap: 0.25rem;
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.35;
    background: rgba(81, 255, 0, 0.08);
    border: 1px solid rgba(81, 255, 0, 0.35);
  }

  .success strong,
  .success span {
    color: #fff;
  }

  .error {
    margin: 0.5rem 0 0;
    padding: 0.6rem;
    color: #ff8b82;
    font-size: 0.8rem;
    line-height: 1.3;
    background: rgba(255, 65, 51, 0.1);
    border: 1px solid #ff4133;
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
</style>
