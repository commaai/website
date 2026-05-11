// FAQ deep-link: open accordion whose id matches the URL hash, and update hash
// when an accordion is opened. Mirrors the SvelteKit Faq component behavior.

function openMatchingAccordion() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  const target = document.getElementById(hash);
  if (!target) return;

  // The target id may be on the .accordion or on its label - normalize.
  const accordion = target.closest('.accordion') ?? target;
  const input = accordion.querySelector(':scope > input');
  if (input && !input.checked) {
    input.checked = true;
    input.dispatchEvent(new Event('click'));
  }
  // Scroll into view
  accordion.scrollIntoView({ block: 'start' });
}

function wireFaqLabels() {
  document.querySelectorAll('.faq-questions .accordion').forEach((acc) => {
    const id = acc.id;
    const input = acc.querySelector(':scope > input');
    if (!id || !input) return;
    input.addEventListener('change', () => {
      if (input.checked) {
        history.replaceState(null, '', `#${id}`);
      }
    });
  });
}

function init() {
  wireFaqLabels();
  openMatchingAccordion();
  window.addEventListener('hashchange', openMatchingAccordion);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
