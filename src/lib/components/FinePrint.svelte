<script>
  import ProductSection from "$lib/components/ProductSection.svelte";
</script>

<!-- Pass <strong> headings each followed by <p> paragraphs -->
<ProductSection title="Fine Print">
  <div class="fine-print">
    <slot></slot>
  </div>
</ProductSection>

<style>
  .fine-print {
    padding: 1.5rem;
    background-color: #fafafa;
  }

  .fine-print :global(strong),
  .fine-print :global(p) {
    color: #545458;
    font-size: 0.875rem;
    line-height: 1.25;
  }

  .fine-print :global(strong + p) {
    margin-top: 0.25rem;
  }
</style>
