<div class="grid">
  <slot />
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }
</style>
