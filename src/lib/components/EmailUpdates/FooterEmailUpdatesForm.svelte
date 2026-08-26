<script>
  import ArrowRight from '$lib/icons/arrow-right.svg?raw';
  import { EMAIL_CATEGORIES, createEmailUpdatesForm } from '$lib/email-updates.js';

  const { email, selectedCategories, status, errorMessage, submit } = createEmailUpdatesForm();

  let showOptions = false;
  let componentElement;

  function handleFormSubmit() {
    if (!$selectedCategories.length) showOptions = true;
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
      Thanks for signing up! We only send emails we would want to receive.
    </div>
  {:else}
    <div class="copy">
      <strong>Get the latest updates</strong>
      <span>Products, openpilot releases, car support, and more.</span>
    </div>

    <form on:submit|preventDefault={handleFormSubmit}>
      <div class="email-row">
        <input
          name="email"
          type="email"
          autocomplete="email"
          placeholder="Enter email"
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
          on:click={() => showOptions = !showOptions}
        >
          <span>{showOptions ? 'hide options' : 'choose updates'}</span>
          <span class="options-icon" aria-hidden="true">{showOptions ? '－' : '＋'}</span>
        </button>

        {#if showOptions}
          <fieldset>
            {#each EMAIL_CATEGORIES as { key, label }}
              <label class="preference">
                <input type="checkbox" value={key} bind:group={$selectedCategories}>
                <span>{label}</span>
              </label>
            {/each}
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
    --muted: #aaa;
    --highlight: #ccc;
  }

  .copy {
    display: grid;
    gap: 0.2rem;
    margin-bottom: 0.75rem;
  }

  .copy span {
    color: var(--muted);
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
    outline: 0;
    border-color: var(--highlight);
  }

  .submit-button {
    display: grid;
    place-items: center;
    padding: 0;
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

  .options-control {
    position: relative;
  }

  .options-button {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0.6rem 0 0;
    padding: 0.65rem 0.75rem;
    color: var(--muted);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    background: transparent;
    border: 1px solid #777;
    transition: background-color 0.2s, border-color 0.2s;
  }

  /* Both spans would otherwise be whitened by the global `span` color rule. */
  .options-button span {
    color: inherit;
  }

  .options-button:focus-visible {
    outline: 2px solid var(--highlight);
    outline-offset: 2px;
  }

  @media (hover: hover) and (pointer: fine) {
    .options-button:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--highlight);
    }
  }

  .options-icon {
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
  }

  fieldset {
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

  .preference {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    width: fit-content;
    touch-action: manipulation;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0;
    cursor: pointer;
  }

  .preference input {
    flex: 0 0 auto;
    width: 1.1rem;
    height: 1.1rem;
    margin: 0;
    accent-color: #fff;
  }

  .success {
    padding: 2rem 1rem;
    text-align: center;
    line-height: 1.35;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-accent) 35%, transparent);
  }

  .error {
    margin: 0.5rem 0 0;
    padding: 0.6rem;
    color: #ff8b82;
    line-height: 1.3;
    background: color-mix(in srgb, var(--color-red) 10%, transparent);
    border: 1px solid var(--color-red);
  }
</style>
