/**
 * Modal.svelte (scope svelte-1jwweco) — client-rendered confirm dialog.
 * Only consumer: the comma-four disclaimer before add-to-cart. The original
 * renders the whole subtree only while `show` is true, so there is no static
 * markup — this module creates/destroys it, exactly mirroring the component:
 *
 *   const modal = openModal({
 *     title: '',                       // <span> text
 *     contentHTML: '',                 // slot content (HTML string)
 *     primaryButtonText: 'Add to cart',
 *     onPrimaryClick: () => {},        // accent button (does NOT auto-close —
 *                                      //   the caller closes, like CommaFour)
 *     onClose: () => {},               // "Go back" / backdrop click / Escape
 *   });
 *   modal.close();                     // remove from the DOM
 *
 * Faithful quirks: the CSS animation `fade-in` has no @keyframes anywhere (no
 * visible animation); no body scroll locking, no focus trap, no aria-modal.
 * clickOutside is attached to .modal: clicking the backdrop or pressing
 * Escape fires onClose. Buttons are client-rendered Button.svelte instances,
 * so their class strings use single spaces (unlike the SSR buy button).
 */
import { clickOutside } from './click-outside.js';

export function openModal({
  title = '',
  contentHTML = '',
  primaryButtonText = 'Add to cart',
  onPrimaryClick = () => {},
  onClose = () => {},
} = {}) {
  const backdrop = document.createElement('div');
  backdrop.className = 'backdrop svelte-1jwweco';

  const container = document.createElement('div');
  container.className = 'modal-container svelte-1jwweco';

  const modal = document.createElement('div');
  modal.tabIndex = -1;
  modal.className = 'modal svelte-1jwweco';

  const titleEl = document.createElement('span');
  titleEl.className = 'svelte-1jwweco';
  titleEl.textContent = title;

  const slot = document.createElement('div');
  slot.innerHTML = contentHTML;

  const primaryBtn = document.createElement('button');
  primaryBtn.className = 'svelte-1io34pc accent full-width';
  primaryBtn.textContent = primaryButtonText;
  primaryBtn.addEventListener('click', onPrimaryClick);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'svelte-1io34pc primary full-width';
  closeBtn.textContent = 'Go back';
  closeBtn.addEventListener('click', onClose);

  modal.append(titleEl, ' ', ...slot.childNodes, ' ', primaryBtn, ' ', closeBtn);
  container.appendChild(modal);
  backdrop.appendChild(container);

  const action = clickOutside(modal);
  modal.addEventListener('clickOutside', onClose);

  document.body.appendChild(backdrop);

  return {
    close() {
      action.destroy(); // NOTE: leaks the keydown listener, like the original
      backdrop.remove();
    },
  };
}
