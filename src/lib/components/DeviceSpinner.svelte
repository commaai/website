<script>
  import { onMount, onDestroy } from 'svelte';

  export let src;
  export let frameCount = 150;
  export let fps = 30;
  export let restImage;
  export let label = 'device';

  // true while the device sits on the first frame, so the caller can show
  // overlays that are only registered against that pose
  export let atFront = true;

  // false until the turntable can actually be driven, so the caller can keep
  // its own controls inert on a browser that cannot decode the video
  export let ready = false;

  // yaw of the frame on screen, signed -180..180, for overlays that have to
  // ride along with the device face
  export let angle = 0;

  const DECAY = 0.94;
  const MIN_VELOCITY = 0.02;

  let container;
  let video;
  let videoSrc = null;
  let position = 0;
  let dragging = false;
  let introPlayed = false;
  let kicked = false;
  let seeking = false;
  let shownFrame = 0;
  let seekTarget = 0;
  let lastX = 0;
  let velocity = 0;
  let raf = 0;

  $: frameIndex = ((Math.round(position) % frameCount) + frameCount) % frameCount;
  // raf is only non-zero while a spin is in flight, so momentum passing over
  // the front frame does not flash the overlay back on
  $: atFront = frameIndex === 0 && !dragging && raf === 0;
  $: degrees = Math.round((frameIndex / frameCount) * 360);
  // reported off the frame the video is actually showing, not off the drag
  // target, so anything riding on the device face cannot lead or trail it
  $: shownDegrees = Math.round((shownFrame / frameCount) * 360);
  $: angle = shownDegrees > 180 ? shownDegrees - 360 : shownDegrees;
  $: frameIndex, ready, syncVideo();

  // only ever one seek in the air: when it lands we jump straight to wherever
  // the drag has got to by then, so fast drags coalesce instead of queueing.
  // Everything is quantised to whole frames and seeks aim at the middle of one,
  // because any two times inside the same frame paint the same picture and only
  // the frame number describes what is on screen.
  function syncVideo() {
    if (!video || !ready || seeking) return;
    if (frameIndex === shownFrame) return;
    seeking = true;
    seekTarget = frameIndex;
    video.currentTime = (frameIndex + 0.5) / fps;
  }

  function onSeeked() {
    seeking = false;
    shownFrame = seekTarget;
    syncVideo();
  }

  function onLoaded() {
    ready = true;
  }

  function stopMotion() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    velocity = 0;
  }

  // leaves hard and coasts to a stop, the way a nudged turntable settles
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  // ramps up and back down, so a jump to a named angle has no hard edge
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(2 - 2 * t, 3) / 2);

  function animateTo(target, duration, easing) {
    const from = position;
    const distance = target - from;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      position = from + distance * easing(t);
      if (t < 1) {
        raf = requestAnimationFrame(step);
        return;
      }
      position = ((target % frameCount) + frameCount) % frameCount;
      raf = 0;
    };
    raf = requestAnimationFrame(step);
  }

  // rotates the shorter way around to the requested frame
  export function spinTo(index) {
    if (!ready) return;
    stopMotion();
    let delta = (((index - position) % frameCount) + frameCount) % frameCount;
    if (delta > frameCount / 2) delta -= frameCount;
    animateTo(position + delta, Math.min(1400, 340 + Math.abs(delta) * 12), easeInOut);
  }

  function playIntro() {
    introPlayed = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animateTo(frameCount, 3000, easeOut);
  }

  function pixelsPerFrame() {
    const width = container?.clientWidth || 480;
    return Math.max(2, (width / frameCount) * 1.6);
  }

  function glide() {
    const step = () => {
      velocity *= DECAY;
      position += velocity;
      if (Math.abs(velocity) < MIN_VELOCITY) {
        position = Math.round(position);
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  // iOS will not paint a frame until the element has played once
  function kickDecoder() {
    if (kicked || !video) return;
    kicked = true;
    const started = video.play();
    if (started) started.then(() => video.pause()).catch(() => {});
  }

  function onPointerDown(event) {
    if (event.button > 0 || !ready) return;
    kickDecoder();
    stopMotion();
    dragging = true;
    lastX = event.clientX;
    container.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!dragging) return;
    const delta = (event.clientX - lastX) / pixelsPerFrame();
    lastX = event.clientX;
    position -= delta;
    velocity = -delta;
  }

  function onPointerUp(event) {
    if (!dragging) return;
    dragging = false;
    if (container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    if (Math.abs(velocity) > MIN_VELOCITY) glide();
    else position = Math.round(position);
  }

  function onKeyDown(event) {
    if (!ready) return;
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowLeft') position -= step;
    else if (event.key === 'ArrowRight') position += step;
    else if (event.key === 'Home') position = 0;
    else return;
    event.preventDefault();
    stopMotion();
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        videoSrc = src;
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  });

  $: if (ready && !introPlayed) playIntro();

  onDestroy(stopMotion);
</script>

<div
  class="spinner"
  class:grabbing={dragging}
  bind:this={container}
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointercancel={onPointerUp}
  on:keydown={onKeyDown}
  role="slider"
  tabindex="0"
  aria-label={`Rotate ${label}`}
  aria-valuemin="0"
  aria-valuemax="360"
  aria-valuenow={degrees}
  aria-valuetext={`${degrees} degrees`}
>
  <img class="rest {atFront ? '' : 'hidden'}" src={restImage} alt={label} draggable="false" />
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    bind:this={video}
    class="frame {atFront ? '' : 'visible'}"
    src={videoSrc}
    on:loadeddata={onLoaded}
    on:seeked={onSeeked}
    muted
    playsinline
    preload="auto"
    disablepictureinpicture
    aria-hidden="true"
  />
</div>

<style>
  .spinner {
    cursor: grab;
    display: block;
    position: relative;
    touch-action: pan-y;
    width: 100%;
  }

  .spinner.grabbing {
    cursor: grabbing;
  }

  .spinner:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }

  img,
  video {
    display: block;
    height: auto;
    user-select: none;
    width: 100%;
  }

  /* the video carries its own alpha, so only one of the two is ever painted */
  .rest.hidden {
    opacity: 0;
  }

  .frame {
    inset: 0;
    opacity: 0;
    position: absolute;
  }

  .frame.visible {
    opacity: 1;
  }
</style>
