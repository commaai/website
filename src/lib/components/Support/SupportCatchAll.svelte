<script>
  export let standalone = false;
</script>

<section class="support-catch-all" class:standalone aria-labelledby="support-catch-all-title">
  <div class="support-catch-all-heading">
    <span>Still have an issue?</span>
    <h2 id="support-catch-all-title">We're here to help.</h2>
  </div>

  <div class="support-catch-all-grid">
    <a class="support-catch-all-card" href="https://commasupport.zendesk.com/hc/en-us/requests/new" target="_blank" rel="noopener noreferrer">
      <svg class="support-catch-all-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1C6.48 1 2 5.48 2 11v5c0 1.66 1.34 3 3 3h1v-8H4c0-4.42 3.58-8 8-8s8 3.58 8 8v9h-9v2h8c1.66 0 3-1.34 3-3v-8c0-5.52-4.48-10-10-10z" />
      </svg>
      <div>
        <span class="support-catch-all-label">Support</span>
        <h3>Open a support ticket</h3>
      </div>
    </a>

    <a class="support-catch-all-card" href="mailto:support@comma.ai">
      <svg class="support-catch-all-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 4h20v16H2V4zm2 2v1.2l8 6 8-6V6H4zm16 12V9.7l-8 6-8-6V18h16z" />
      </svg>
      <div>
        <span class="support-catch-all-label">Email us</span>
        <h3>Send us an email</h3>
      </div>
    </a>

    <a class="support-catch-all-card" href="https://discord.comma.ai/">
      <svg class="support-catch-all-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
      </svg>
      <div>
        <span class="support-catch-all-label">Community</span>
        <h3>Ask the community</h3>
      </div>
    </a>
  </div>
</section>

<style>
  .support-catch-all { margin: 64px 0; padding: 32px 0 0; border-top: 1px solid var(--support-border); color: var(--support-text); }
  .support-catch-all.standalone { padding: 0; border: 0; }
  .support-catch-all-heading { margin-bottom: 28px; }
  .support-catch-all-heading span { display: block; margin-bottom: -32px; color: var(--support-muted); font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
  .support-catch-all-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .support-catch-all-card { box-sizing: border-box; min-width: 0; min-height: 220px; padding: 28px; border: 1px solid var(--support-border); background: var(--support-surface); color: var(--support-text); display: flex; flex-direction: column; justify-content: space-between; gap: 32px; text-decoration: none; }
  .support-catch-all-card:hover { background: var(--support-hover); }
  .support-catch-all-card:focus-visible { outline: 2px solid var(--support-accent); outline-offset: 3px; }
  .support-catch-all-icon { display: block; width: 40px; height: 40px; fill: currentColor; }
  .support-catch-all-label { display: block; margin-bottom: 8px; color: var(--support-muted); font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
  .support-catch-all-card h3 { margin: 0; font-size: clamp(20px, 2.4vw, 28px); line-height: 1.15; letter-spacing: -.035em; font-weight: 600; }

  @media (max-width: 760px) {
    .support-catch-all { padding-top: 48px; }
    .support-catch-all-heading { margin-bottom: 28px; }
    .support-catch-all-grid { grid-template-columns: 1fr; gap: 12px; }
    .support-catch-all-card { min-height: 160px; padding: 24px; }
  }
</style>
