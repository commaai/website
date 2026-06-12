import '../main.js';
import { initFaq } from '../lib/faq.js';

/* /support — src/routes/support/+page.svelte has no script behaviors of its
   own (the `page` import is dead code). The only interactivity is the shared
   Faq hash sync, scoped to `.questions .tab > input` — the top-section
   accordions (#support) are pure CSS checkbox toggles with no hash behavior. */
initFaq();
