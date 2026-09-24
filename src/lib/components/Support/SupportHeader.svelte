<script>
  export let title;
  export let description = '';
  export let image = '';
  export let imageAlt = '';
  export let imageHtml = '';
</script>

<header class="support-header">
  <div class="header-copy">
    <h1>{title}</h1>
    {#if description}<p>{description}</p>{/if}
  </div>
  {#if imageHtml || image}
    <div class="header-image">
      {#if imageHtml}<span class="header-icon" aria-hidden="true">{@html imageHtml}</span>{:else}<img src={image} alt={imageAlt} />{/if}
    </div>
  {/if}
</header>

<style>
  .support-header { display: flex; align-items: flex-start; justify-content: flex-start; gap: 32px; min-height: 180px; margin: 64px 0 48px; }
  .header-copy { flex: 0 1 auto; min-width: 0; align-self: center; text-align: left; }
  h1 { margin: 0 0 18px; font-size: clamp(48px, 7vw, 88px); font-weight: 400; line-height: 1; letter-spacing: -.05em; }
  p { margin: 0; color: var(--support-muted); font-size: clamp(17px, 1.6vw, 20px); line-height: 1.4; }
  .header-image { display: flex; flex: 1 1 0; justify-content: center; min-width: 180px; }
  .header-image img { display: block; width: auto; height: auto; max-width: 100%; max-height: 180px; }
  .header-icon { display: grid; place-items: center; width: 170px; height: 170px; border-radius: 24%; background: #171717; color: #fff; }
  .header-icon :global(svg) { width: 51px; height: 89px; }
  @media (max-width: 760px) {
    .support-header { min-height: 0; }
    .support-header { flex-direction: column; align-items: stretch; }
    .header-copy { box-sizing: border-box; width: 100%; }
    .header-image { flex: none; width: 100%; align-self: center; }
    .header-image img { max-height: 160px; }
  }
</style>
