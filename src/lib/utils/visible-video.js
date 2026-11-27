// Media below the fold: nothing is downloaded until the element comes near the viewport.

const NEAR_VIEWPORT = '200px 0px';

// Calls start(node) the first time node comes near the viewport, then onVisibilityChange(visible)
// every time it enters or leaves it. Returns a Svelte action object.
export function whenVisible(node, start, onVisibilityChange = () => {}) {
  let started = false;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !started) {
      started = true;
      start(node);
    }
    if (started) onVisibilityChange(entry.isIntersecting);
  }, { rootMargin: NEAR_VIEWPORT });
  observer.observe(node);
  return {
    destroy() {
      observer.disconnect();
    },
  };
}

// <video use:visibleVideo={src} muted loop playsinline preload="none" poster=...>: sets src once
// the video is near the viewport, plays it while it's on screen and pauses it when it's off.
export function visibleVideo(node, src) {
  return whenVisible(
    node,
    () => {
      node.src = src;
    },
    (visible) => {
      if (visible) {
        node.play().catch(() => {});
      } else {
        node.pause();
      }
    },
  );
}

// <video use:preloadWhenVisible preload="none" controls src=...>: a click-to-play video that only
// fetches its metadata (duration, first frame) once it's near the viewport.
export function preloadWhenVisible(node) {
  return whenVisible(node, () => {
    node.preload = 'metadata';
  });
}
