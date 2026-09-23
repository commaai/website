<script>
  import Faq from '$lib/components/Faq.svelte';
  import { faq } from '$lib/constants/faq.svelte';
</script>

<section class="restored-faqs standalone" aria-labelledby="support-faqs-title">
  <div class="all-faqs">
    <h2 id="support-faqs-title">FAQs</h2>
    {#each Object.keys(faq) as key}
      <div class="faq-card"><Faq topic={faq[key]} /></div>
    {/each}
  </div>
</section>

<style>
  .restored-faqs { padding: 32px 0 0; border-top: 1px solid var(--support-border); }
  .restored-faqs.standalone { padding: 0; border: 0; }
  .faq-card { margin-bottom: 3rem; }

  @media (max-width: 760px) {
    .restored-faqs { padding-top: 48px; }
  }
</style>
