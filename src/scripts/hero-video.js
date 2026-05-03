import Hls from 'hls.js';

function initHls(videoEl, src) {
  if (!videoEl) return;
  videoEl.addEventListener('playing', () => videoEl.classList.add('ready'));

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(videoEl);
    hls.on(Hls.Events.MANIFEST_PARSED, () => videoEl.play());
  } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    videoEl.src = src;
    videoEl.addEventListener('loadedmetadata', () => videoEl.play());
  }
}

function init() {
  document.querySelectorAll('video[data-hls-src]').forEach((el) => {
    const src = el.dataset.hlsSrc;
    if (src) initHls(el, src);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
