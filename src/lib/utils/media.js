import { readable } from "svelte/store";

// true until the browser says otherwise, so nothing autoplays before we know
export const reducedMotion = readable(true, (set) => {
  if (typeof window === "undefined") {
    return;
  }
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const update = () => set(query.matches);
  update();
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
});

// a muted loop that plays only while it's on screen, and not at all with reduced motion
export function playInView(video, reduced) {
  let visible = false;
  const sync = () => {
    if (visible && !reduced) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }, { threshold: 0.25 });
  observer.observe(video);
  video.addEventListener("loadstart", sync);
  return {
    update(value) {
      reduced = value;
      sync();
    },
    destroy() {
      observer.disconnect();
      video.removeEventListener("loadstart", sync);
    },
  };
}
