import '../main.js';
import { initFaq } from '../lib/faq.js';

// /vehicles page behaviors. Everything else on the page is CSS-only:
// - brand icon links are native in-page anchors (#acura ... #škoda),
// - car-row accordions are checkbox/label toggles with no hash side effects.
// The only JS the old page ran was the FAQ hash sync (Faq.svelte):
// deep-link open on load, replaceState('#'+id) on every question click
// (open AND close), and hash-driven close of the hash-opened question.
initFaq();
