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
