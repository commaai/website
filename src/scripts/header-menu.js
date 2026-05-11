// Mailing list focus on hash, console banner.
import { printConsoleBanner } from '$lib/utils/console.js';

function focusMailingList() {
  if (window.location.hash === '#mailing-list') {
    setTimeout(() => {
      const input = document.querySelector('#mailing-list input[type="email"]');
      if (input) input.focus();
    }, 300);
  }
}

function init() {
  focusMailingList();
  window.addEventListener('hashchange', focusMailingList);
  printConsoleBanner();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
