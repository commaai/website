<script>
  import ArrowRight from '$lib/icons/arrow-right.svg?raw';
  import InterestCheckboxes from '$lib/components/InterestCheckboxes.svelte';
  import { EMAIL_INTERESTS, createEmailUpdatesForm } from '$lib/email-updates.js';

  const { email, interests, status, errorMessage, selection, toggle, submit } =
    createEmailUpdatesForm();

  let showOptions = false;
  let componentElement;

  // Reveal the panel when the reason we can't send is that nothing is picked in it.
  function handleFormSubmit() {
    if (!$selection.someSelected) showOptions = true;
    submit();
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
  {#if $status === 'success'}
    <div class="success" role="status">
      <span>Thanks for signing up! We only send emails we would want to receive.</span>
    </div>
  {:else}
    <div class="copy">
      <strong>Get the latest updates</strong>
      <span>Products, releases, car support, and more.</span>
    </div>

    <form aria-label="Email updates signup" on:submit|preventDefault={handleFormSubmit}>
      <div class="email-row">
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
        <button class="submit-button" type="submit" aria-label="Subscribe" disabled={$status === 'submitting'}>
          <span aria-hidden="true">{@html ArrowRight}</span>
        </button>
      </div>

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
          <fieldset id="footer-update-options" aria-label="Choose email updates">
            <InterestCheckboxes
              interests={EMAIL_INTERESTS}
              selected={$interests}
              selection={$selection}
              onChange={toggle}
            />
          </fieldset>
        {/if}
      </div>

      {#if $status === 'error'}
        <p class="error" role="alert">{$errorMessage}</p>
      {/if}
    </form>
  {/if}
</div>

<style>
  .footer-email-updates {
    color: #fff;
  }

  .copy {
    display: grid;
    gap: 0.2rem;
    margin-bottom: 0.75rem;
  }

  .copy strong {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0;
  }

  .copy span {
    color: #aaa;
    font-size: 0.875rem;
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
    outline: 2px solid #fff;
    outline-offset: -3px;
  }

  .submit-button {
    display: grid;
    place-items: center;
    padding: 0;
    color: #000;
    cursor: pointer;
    background: var(--color-accent);
    border: 0;
  }

  .submit-button span {
    color: inherit;
  }

  .submit-button :global(svg) {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
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
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1;
  }

  fieldset {
    --interest-accent: #fff;

    position: absolute;
    right: 0;
    bottom: calc(100% + 0.5rem);
    left: 0;
    display: grid;
    gap: 0.6rem;
    margin: 0;
    padding: 0.9rem;
    background: #080808;
    border: 1px solid #777;
    box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.45);
  }

  .success {
    display: grid;
    gap: 0.25rem;
    padding: 2rem 1rem;
    text-align: center;
    line-height: 1.35;
    background: rgba(81, 255, 0, 0.08);
    border: 1px solid rgba(81, 255, 0, 0.35);
  }

  .error {
    margin: 0.5rem 0 0;
    padding: 0.6rem;
    color: #ff8b82;
    line-height: 1.3;
    background: rgba(255, 65, 51, 0.1);
    border: 1px solid #ff4133;
  }
</style>
