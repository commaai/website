/**
 * Verbatim port of src/lib/utils/clickOutside.js (Svelte action).
 *
 * Attaches document-level CAPTURE listeners for `click` (dispatches a
 * `clickOutside` CustomEvent on the node when the click lands outside it) and
 * `keydown` (dispatches on Escape). NOTE: destroy() forgets to remove the
 * keydown listener — that leak is part of the original and is kept on purpose
 * (irrelevant under full page loads). The CustomEvent is constructed with the
 * node as the init object, exactly like the original.
 *
 * Usage:
 *   const action = clickOutside(node);
 *   node.addEventListener('clickOutside', handler);
 *   // action.destroy() when tearing down (never needed on these pages)
 */
export function clickOutside(node) {
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('clickOutside', node)
      )
    }
  }

  const handleKeydown = event => {
    if (event.key === 'Escape') {
      node.dispatchEvent(
        new CustomEvent('clickOutside', node)
      )
    }
  }

  document.addEventListener('click', handleClick, true);
  document.addEventListener('keydown', handleKeydown, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  }
}
