<script>
  import Faq from '$lib/components/Faq.svelte';
  import { faq } from '$lib/constants/faq.svelte';
</script>

<section class="restored-faqs" aria-labelledby="support-faqs-title">
  <div class="all-faqs">
    <h2 id="support-faqs-title">FAQs</h2>
    {#each Object.keys(faq) as key}
      <div class="faq-card"><Faq topic={faq[key]} /></div>
    {/each}
  </div>
</section>

<style>
  .restored-faqs { margin-top: 72px; }
  .restored-faqs h2 { margin: 0 0 32px; font-family: Inter, sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 400; line-height: 1; letter-spacing: -.04em; }
  .faq-card { margin-bottom: 3rem; }

  @media (max-width: 760px) {
    .restored-faqs { margin-top: 48px; }
  }
</style>
