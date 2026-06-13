import '../main.js';
import { initFaq } from '../lib/faq.js';

// FAQ hash deep-link + replaceState write-back (Faq.svelte:9-13,28).
// The #what-is-commacare link in the features table targets the FAQ accordion.
initFaq();
