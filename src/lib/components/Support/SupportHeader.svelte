<script>
  export let title;
  export let description = '';
  export let image = '';
  export let imageAlt = '';
</script>

<header class="support-header">
  <div class="header-copy">
    <h1>{title}</h1>
    {#if description}<p>{description}</p>{/if}
  </div>
  {#if image}
    <div class="header-image">
      <img src={image} alt={imageAlt} />
    </div>
  {/if}
</header>

<style>
  .support-header { display: flex; align-items: flex-start; gap: 32px; min-height: 180px; }
  .header-copy { min-width: 0; align-self: center; }
  h1 { margin: 0 0 18px; font-size: clamp(48px, 7vw, 88px); font-weight: 400; line-height: 1; letter-spacing: -.05em; }
  p { margin: 0; color: var(--color-muted); font-size: clamp(17px, 1.6vw, 20px); line-height: 1.4; }
  .header-image { display: flex; flex: 1 1 0; justify-content: center; min-width: 180px; }
  .header-image img { display: block; max-height: 180px; }

  @media (max-width: 768px) {
    .support-header { flex-direction: column; align-items: stretch; min-height: 0; }
    .header-copy { align-self: stretch; }
    .header-image { flex: none; }
    .header-image img { max-height: 160px; }
  }
</style>
