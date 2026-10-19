<script>
  export let id;
  export let eyebrow = '';
</script>

{#if eyebrow}<span>{eyebrow}</span>{/if}
<h2 {id}><slot /></h2>

<style>
  span { display: block; color: var(--color-muted); font-size: 14px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
  h2 { margin: 0 0 20px; font-size: clamp(32px, 3.2vw, 48px); font-weight: 400; line-height: 1.08; letter-spacing: -.04em; }
</style>
