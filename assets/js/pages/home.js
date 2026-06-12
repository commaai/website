import '../main.js';
// Home page behaviors (port of src/routes/+page.svelte lines 1-92):
// HLS hero/screen videos + dragstart suppression. Nothing else is
// interactive on this page.
import Hls from '../vendor/hls.mjs';

const CDN = 'https://3comma.net';

// Port of initializeHLS() + the per-video onMount wiring:
//  - first `playing` event adds the `ready` class (CSS fades opacity 0 -> 1)
//  - MSE path: default-config Hls, loadSource/attachMedia, play() on
//    MANIFEST_PARSED (the hls instance is never destroyed, no error handling)
//  - Safari/iOS native HLS fallback: set src, play() on loadedmetadata
//  - neither supported: video keeps showing only the poster (opacity stays 0)
function initVideo(el, src) {
  if (!el) return;
  el.addEventListener('playing', () => el.classList.add('ready'));
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(el);
    hls.on(Hls.Events.MANIFEST_PARSED, () => el.play());
  } else if (el.canPlayType('application/vnd.apple.mpegurl')) {
    el.src = src;
    el.addEventListener('loadedmetadata', () => el.play());
  }
}

// All three videos are initialized unconditionally (even the one hidden by
// the media query) — parity with the `// TODO: don't load both` in source.
initVideo(document.querySelector('.hero-image.desktop video'), `${CDN}/hero-landscape/hero-landscape.m3u8`);
initVideo(document.querySelector('.hero-image.mobile video'), `${CDN}/hero-portrait/hero-portrait.m3u8`);
initVideo(document.querySelector('.device-image-container video.screen-video-overlay'), `${CDN}/screen-video/screen-video.m3u8`);

// on:dragstart on both .hero-image sections — prevents dragging the
// poster/video image out.
document.querySelectorAll('.hero-image').forEach((section) => {
  section.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });
});
