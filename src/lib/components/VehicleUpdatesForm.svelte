<script>
  const GROUPS = {
    all: 'group[54660][1]',
    compatibility: 'group[54660][2]',
    releases: 'group[54660][4]',
    blog: 'group[54660][8]',
  };

  let email = '';
  let allUpdates = false;
  let compatibilityUpdates = true;
  let releaseUpdates = false;
  let blogUpdates = false;
  let showCustomOptions = false;
  let status = 'idle';
  let errorMessage = '';

  function handleAllUpdatesChange(event) {
    allUpdates = event.currentTarget.checked;

    if (allUpdates) {
      compatibilityUpdates = true;
      releaseUpdates = true;
      blogUpdates = true;
    }
  }

  function handleTopicChange(topic, checked) {
    if (topic === 'compatibility') compatibilityUpdates = checked;
    if (topic === 'releases') releaseUpdates = checked;
    if (topic === 'blog') blogUpdates = checked;

    if (!checked) allUpdates = false;
  }

  function cleanMessage(message) {
    const element = document.createElement('div');
    element.innerHTML = message;
    return element.textContent || 'Please try again.';
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!allUpdates && !compatibilityUpdates && !releaseUpdates && !blogUpdates) {
      errorMessage = 'Choose at least one type of update.';
      status = 'error';
      return;
    }

    status = 'submitting';
    errorMessage = '';

    const selectedCar = window.localStorage.getItem('selectedCar');
    const callbackName = `mailchimpVehicleUpdates_${Math.random().toString(36).slice(2, 11)}`;
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
    if (allUpdates) params.set(GROUPS.all, '');
    if (compatibilityUpdates) params.set(GROUPS.compatibility, '');
    if (releaseUpdates) params.set(GROUPS.releases, '');
    if (blogUpdates) params.set(GROUPS.blog, '');

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

<aside class="updates-card" aria-labelledby="vehicle-updates-heading">
  <div class="updates-copy">
    <h2 id="vehicle-updates-heading">Don't see your car?</h2>
    <p>
      New cars are added with each openpilot release. Get an email when compatibility changes. Unsubscribe anytime.
    </p>
    <p class="contribute">
      If you have a modern car and some programming skills, you can likely add support for your car.
      Watch <a href="https://youtu.be/XxPS5TpTUnI" class="highlight">this talk</a> and check out the
      <a href="https://github.com/commaai/openpilot/blob/master/docs/CARS.md#dont-see-your-car-here" class="highlight">docs</a>
      to learn more.
    </p>
  </div>

  <div class="form-wrapper">
    {#if status === 'success'}
      <div class="success" role="status">
        <strong>You're all set.</strong>
        <span>We'll send the updates you selected.</span>
      </div>
    {:else}
      <form aria-label="Car compatibility update signup" on:submit={handleFormSubmit}>
        <label class="visually-hidden" for="vehicle-updates-email">Email address</label>
        <input
          id="vehicle-updates-email"
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
              checked={compatibilityUpdates}
              on:change={(event) => handleTopicChange('compatibility', event.currentTarget.checked)}
            >
            <span>
              <strong>Car compatibility updates</strong>
              <small>Newly supported cars and compatibility changes</small>
            </span>
          </label>

          {#if showCustomOptions}
            <div class="custom-options">
              <label class="preference">
                <input type="checkbox" checked={allUpdates} on:change={handleAllUpdatesChange}>
                <span>All updates</span>
              </label>
              <label class="preference">
                <input
                  type="checkbox"
                  checked={releaseUpdates}
                  on:change={(event) => handleTopicChange('releases', event.currentTarget.checked)}
                >
                <span>New openpilot releases</span>
              </label>
              <label class="preference">
                <input
                  type="checkbox"
                  checked={blogUpdates}
                  on:change={(event) => handleTopicChange('blog', event.currentTarget.checked)}
                >
                <span>New blog posts</span>
              </label>
            </div>
          {/if}
        </fieldset>

        {#if status === 'error'}
          <p class="error" role="alert">{errorMessage}</p>
        {/if}

        <button class="submit-button" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'signing up...' : 'notify me'}
        </button>
        <button
          class="customize-button"
          type="button"
          aria-expanded={showCustomOptions}
          on:click={() => showCustomOptions = !showCustomOptions}
        >
          {showCustomOptions ? 'hide email options' : 'customize emails'}
        </button>

      </form>
    {/if}
  </div>
</aside>

<style>
  .updates-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(22rem, 0.8fr);
    gap: 4rem;
    width: calc(85% + 2rem + 2px);
    box-sizing: border-box;
    margin: 3rem auto;
    padding: 3rem;
    overflow: hidden;
    text-align: left;
    background: var(--color-card-background);
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  .updates-copy {
    align-self: start;
  }

  h2 {
    margin: 0 0 0.75rem;
    font-size: 2.75rem;
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.06em;
  }

  .updates-copy p {
    max-width: 30rem;
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.35;
  }

  .updates-copy .contribute {
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
    outline: 2px solid var(--color-accent-hover);
    outline-offset: 2px;
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

  .primary-preference {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
    padding: 1rem;
    cursor: pointer;
    background: #fff;
    border: 1px solid #000;
  }

  .primary-preference input {
    width: 1.1rem;
    height: 1.1rem;
    margin: 0.15rem 0 0;
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
    justify-self: center;
    padding: 0.2rem;
    color: #000;
    font: inherit;
    font-size: 0.8rem;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    cursor: pointer;
    background: transparent;
    border: 0;
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

  @media screen and (max-width: 850px) {
    .updates-card {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      width: 100%;
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

    .updates-copy p {
      font-size: 1rem;
    }

    .success {
      font-size: 1rem;
    }

  }
</style>
