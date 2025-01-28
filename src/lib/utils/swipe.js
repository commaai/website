export function swipe(node) {
  let touchStartX, touchStartY;

  const handleTouchStart = event => {
    event.preventDefault();
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  }

  const handleTouchEnd = event => {
    event.preventDefault();
    let touchEndX = event.changedTouches[0].screenX;
    let touchEndY = event.changedTouches[0].screenY;

    if (touchEndX < touchStartX) {
      node.dispatchEvent(new CustomEvent('swipeLeft', node));
    } else if (touchEndX > touchStartX) {
      node.dispatchEvent(new CustomEvent('swipeRight', node));
    } else if (touchEndY < touchStartY) {
      node.dispatchEvent(new CustomEvent('swipeUp', node));
    } else if (touchEndY > touchStartY) {
      node.dispatchEvent(new CustomEvent('swipeDown', node));
    }
  }

  node.addEventListener('touchstart', handleTouchStart, true);
  node.addEventListener('touchend', handleTouchEnd, true);

  return {
    destroy() {
      node.removeEventListener('touchstart', handleTouchStart, true);
      node.removeEventListener('touchend', handleTouchEnd, true);
    }
  }
}
