<script>
  import Faq from '$lib/components/Faq.svelte';
  import { faq } from '$lib/constants/faq.svelte';
</script>

<section class="support-faqs" aria-labelledby="support-faqs-title">
  <h2 id="support-faqs-title">FAQs</h2>
  {#each Object.keys(faq).filter(key => key !== 'connect') as key}
    <div class="faq-card"><Faq topic={faq[key]} /></div>
  {/each}
</section>

<style>
  .faq-card { margin-bottom: 3rem; }
</style>
