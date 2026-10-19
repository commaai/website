<script>
  import Faq from '$lib/components/Faq.svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { faq } from '$lib/constants/faq.svelte';
</script>

<section aria-labelledby="support-faqs-title">
  <SectionHeading id="support-faqs-title">FAQs</SectionHeading>
  {#each Object.keys(faq).filter(key => key !== 'connect') as key}
    <div class="faq-card"><Faq topic={faq[key]} /></div>
  {/each}
</section>

<style>
  .faq-card { margin-bottom: 3rem; }
</style>
