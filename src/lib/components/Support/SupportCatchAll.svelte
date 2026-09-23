<section class="support-catch-all" aria-labelledby="support-catch-all-title">
  <h2 id="support-catch-all-title">Get in touch</h2>
  <div class="support-catch-all-grid">
    <a class="support-catch-all-card" href="https://commasupport.zendesk.com/hc/en-us/requests/new">
      <div>
        <svg class="support-catch-all-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 1C6.48 1 2 5.48 2 11v5c0 1.66 1.34 3 3 3h1v-8H4c0-4.42 3.58-8 8-8s8 3.58 8 8v9h-9v2h8c1.66 0 3-1.34 3-3v-8c0-5.52-4.48-10-10-10z" />
        </svg>
        <h3>Open a support ticket</h3>
        <p>Get help from comma support with your order, account, subscription, or hardware.</p>
      </div>
      <span class="support-catch-all-link">
        open a ticket
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </a>

    <a class="support-catch-all-card" href="https://discord.comma.ai/">
      <div>
        <svg class="support-catch-all-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
        </svg>
        <h3>Ask the community</h3>
        <p>Join the comma community on Discord for openpilot questions, tips, and troubleshooting.</p>
      </div>
      <span class="support-catch-all-link">
        join Discord
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </a>
  </div>
</section>

<style>
  .support-catch-all { margin-top: 72px; padding-top: 48px; border-top: 1px solid var(--support-border); }
  .support-catch-all h2 { margin: 0 0 24px; font-family: Inter, sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 400; line-height: 1; letter-spacing: -.04em; }
  .support-catch-all-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .support-catch-all-card { box-sizing: border-box; min-height: 240px; padding: 28px; border: 1px solid var(--support-strong-border); background: var(--support-surface); color: var(--support-text); display: flex; flex-direction: column; justify-content: space-between; gap: 36px; text-decoration: none; }
  .support-catch-all-card:hover { background: var(--support-hover); }
  .support-catch-all-icon { display: block; width: 44px; height: 44px; margin-bottom: 32px; fill: currentColor; }
  .support-catch-all-card h3 { margin: 0 0 12px; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.12; letter-spacing: -.035em; font-weight: 600; }
  .support-catch-all-card p { max-width: 46ch; margin: 0; color: var(--support-muted); font-size: 14px; line-height: 1.5; }
  .support-catch-all-link { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: 14px; font-weight: 600; }
  .support-catch-all-link svg { display: block; width: 24px; height: 24px; flex: 0 0 24px; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: square; stroke-linejoin: miter; }

  @media (max-width: 760px) {
    .support-catch-all { margin-top: 48px; padding-top: 36px; }
    .support-catch-all-grid { grid-template-columns: 1fr; gap: 12px; }
    .support-catch-all-card { min-height: 210px; padding: 24px; }
  }
</style>
