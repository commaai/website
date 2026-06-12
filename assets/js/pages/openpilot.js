import '../main.js';
import { initFaq } from '../lib/faq.js';

// /openpilot has no page JS beyond the FAQ hash-sync (Faq.svelte + Accordion.svelte):
// replaceState('#'+id) on every accordion click (expand AND collapse), deep-link
// expansion from location.hash on load and on hashchange. Accordion open/close
// itself is pure CSS (hidden checkbox), no JS.
initFaq();
