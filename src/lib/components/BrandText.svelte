<script>
  import { markBrandsInText } from '$lib/utils/brands.js';

  export let text;
</script>

{@html markBrandsInText(String(text))}
