<script>
  import Faq from '$lib/components/Faq.svelte';
  import { faq } from '$lib/constants/faq.svelte';
</script>

<section class="light" id="faq">
  <div class="container">
    <Faq topic={faq.returns} title="Frequently asked questions" />
  </div>
</section>
