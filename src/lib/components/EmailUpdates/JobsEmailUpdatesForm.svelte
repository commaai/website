<script>
  import { createEmailUpdatesForm } from '$lib/email-updates.js';

  const { email, github, status, errorMessage, submit } = createEmailUpdatesForm(['events']);
</script>

<aside class="jobs-updates" aria-labelledby="jobs-updates-title">
  <div class="copy">
    <h2 id="jobs-updates-title">Stay in the loop</h2>
    <p>Interested in comma? Get notified about COMMA_CON, hackathons, other events, and new challenges.</p>
  </div>

  <div class="signup">
    {#if $status === 'success'}
      <p class="success" role="status">Thanks for signing up! We'll keep you posted.</p>
    {:else}
      <form on:submit|preventDefault={submit}>
        <label class="sr-only" for="jobs-updates-email">Email address</label>
        <div class="email-row">
          <input
            id="jobs-updates-email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder="Your email address"
            maxlength="256"
            required
            bind:value={$email}
          />
        </div>
        <label class="sr-only" for="jobs-updates-github">GitHub username (optional)</label>
        <input
          id="jobs-updates-github"
          name="github"
          type="text"
          autocomplete="off"
          autocapitalize="none"
          spellcheck="false"
          placeholder="GitHub username (optional)"
          maxlength="40"
          bind:value={$github}
        />
        {#if $status === 'error'}
          <p class="error" role="alert">{$errorMessage}</p>
        {/if}
        <button type="submit" disabled={$status === 'submitting'}>
          {$status === 'submitting' ? 'Signing up…' : 'Keep me posted'}
        </button>
      </form>
    {/if}
  </div>
</aside>

<style>
  .jobs-updates {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(22rem, 0.8fr);
    gap: 4rem;
    align-items: start;
    padding: 3rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background: var(--color-card-background);
    color: #000;
  }

  h2 {
    margin: 0 0 0.75rem;
    font-size: clamp(2rem, 3vw, 2.75rem);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.06em;
  }

  .copy p {
    max-width: 32rem;
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.35;
  }

  form { display: grid; gap: 0.75rem; margin: 0; }

  .email-row {
    display: flex;
  }

  input {
    min-width: 0;
    flex: 1;
    padding: 1rem;
    border: 1px solid #000;
    border-radius: 0;
    background: #fff;
    color: #000;
    font: inherit;
    font-size: 1rem;
  }

  button {
    padding: 1rem;
    border: 0;
    background: var(--color-accent);
    color: #000;
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  input:focus-visible, button:focus-visible {
    outline: 2px solid #000;
    outline-offset: 3px;
  }

  button:disabled { opacity: 0.6; cursor: wait; }
  button:hover, button:focus-visible { background: var(--color-accent-hover); }

  .success { margin: 0; line-height: 1.5; }
  .error { margin: 0.625rem 0 0; color: #8a0d05; font-size: 0.875rem; line-height: 1.4; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }

  @media (max-width: 1024px) {
    .jobs-updates { grid-template-columns: 1fr; gap: 2rem; }
  }

  @media (max-width: 768px) {
    .jobs-updates { padding: 2rem 1rem; }
    .email-row { flex-direction: column; gap: 0.5rem; }
    input { border-right: 1px solid #000; }
    input, button { min-height: 48px; }
  }
</style>
