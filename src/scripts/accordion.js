// Initialize all accordion controls on the page.
// Each .accordion contains a labeled checkbox/radio input and a .accordion-content div.

function setup(tab) {
  if (tab.dataset.accordionInited) return;
  tab.dataset.accordionInited = '1';

  const input = tab.querySelector(':scope > input');
  const content = tab.querySelector(':scope > .accordion-content');
  if (!input || !content) return;

  // Initial state
  content.style.display = input.checked ? 'block' : 'none';

  function toggle() {
    if (input.checked) {
      content.style.display = 'block';
      content.style.maxHeight = '0px';
      requestAnimationFrame(() => {
        content.style.maxHeight = `${content.scrollHeight}px`;
      });
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
      requestAnimationFrame(() => {
        content.style.maxHeight = '0px';
      });
    }
  }

  input.addEventListener('click', toggle);
  content.addEventListener('transitionend', () => {
    if (!input.checked) {
      content.style.display = 'none';
    }
    content.style.maxHeight = '';
  });
}

function init() {
  document.querySelectorAll('.accordion').forEach(setup);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
