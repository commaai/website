<script>
  import { onMount } from 'svelte';
  import Hls from 'hls.js';
  import LinkButton from "$lib/components/LinkButton.svelte";
  import FeaturedCarsList from "$lib/components/FeaturedCarsList.svelte";
  import FeaturedArticles from "$lib/components/FeaturedArticles.svelte";
  import SectionHeader from "../lib/components/SectionHeader.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import { vehicleCountText } from '$lib/constants/vehicles.js';

  import DeviceImage from "$lib/images/products/comma-four/four_dark.png";
  import LaneCenteringIcon from "$lib/icons/features/lane-centering.svg?raw";
  import AdaptiveCruiseIcon from "$lib/icons/features/adaptive-cruise.svg?raw";
  import OtaUpdatesIcon from "$lib/icons/features/ota-updates.svg?raw";
  import ThreeSixtyVisionIcon from "$lib/icons/features/360-vision.svg?raw";
  import LocationIcon from "$lib/icons/features/location.svg?raw";
  import RecordingsIcon from "$lib/icons/features/recordings.svg?raw";

  const HeroLandscapeVideo = "/videos/hero-landscape/hero-landscape.m3u8";
  const HeroPortraitVideo = "/videos/hero-portrait/hero-portrait.m3u8";
  const ScreenVideo = "/videos/screen-video/screen-video.m3u8";

  let videoLandscapeElement;
  let videoLandscapeReady = false;
  let videoPortraitElement;
  let videoPortraitReady = false;
  let screenVideoElement;
  let screenVideoReady = false;
  let screenVideoCanvas;
  let gl;
  let program;
  let animationFrame;

  // Hardcode GitHub star count (similar to contributors on openpilot page)
  const githubStars = 50000;

  function initializeHLS(videoEl, src, onReady) {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (onReady) onReady();
      });
      return hls;
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = src;
      videoEl.addEventListener('loadedmetadata', () => {
        if (onReady) onReady();
      });
      return null;
    }
    return null;
  }

  function initWebGL() {
    if (!screenVideoCanvas || !screenVideoElement) return;

    gl = screenVideoCanvas.getContext('webgl', { 
      premultipliedAlpha: false,
      alpha: true,
      preserveDrawingBuffer: false
    });

    if (!gl) return;

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    // Fragment shader with better antialiasing using 4-tap bilinear filtering
    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform vec2 u_textureSize;
      varying vec2 v_texCoord;
      
      vec4 texture2D_bilinear(sampler2D tex, vec2 coord) {
        vec2 texelSize = 1.0 / u_textureSize;
        vec2 f = fract(coord * u_textureSize);
        vec2 coord00 = floor(coord * u_textureSize) * texelSize;
        vec2 coord10 = coord00 + vec2(texelSize.x, 0.0);
        vec2 coord01 = coord00 + vec2(0.0, texelSize.y);
        vec2 coord11 = coord00 + texelSize;
        
        vec4 tex00 = texture2D(tex, coord00);
        vec4 tex10 = texture2D(tex, coord10);
        vec4 tex01 = texture2D(tex, coord01);
        vec4 tex11 = texture2D(tex, coord11);
        
        vec4 tex0 = mix(tex00, tex10, f.x);
        vec4 tex1 = mix(tex01, tex11, f.x);
        return mix(tex0, tex1, f.y);
      }
      
      void main() {
        gl_FragColor = texture2D_bilinear(u_texture, v_texCoord);
      }
    `;

    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(vertexSource, fragmentSource) {
      const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      if (!vertexShader || !fragmentShader) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    program = createProgram(vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1, 1,   1, -1,  1, 1
    ]), gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 1,  1, 1,  0, 0,
      0, 0,  1, 1,  1, 0
    ]), gl.STATIC_DRAW);

    // Create texture with nearest filtering (we'll do bilinear in shader)
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    function render() {
      if (!gl || !program || !screenVideoElement || screenVideoElement.readyState < 2) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      const positionLoc = gl.getAttribLocation(program, 'a_position');
      const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord');
      const textureLoc = gl.getUniformLocation(program, 'u_texture');
      const textureSizeLoc = gl.getUniformLocation(program, 'u_textureSize');

      gl.useProgram(program);

      // Update texture from video
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, screenVideoElement);
      
      // Set texture size for bilinear filtering
      gl.uniform2f(textureSizeLoc, screenVideoElement.videoWidth, screenVideoElement.videoHeight);

      // Set up attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordLoc);
      gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1i(textureLoc, 0);

      // Clear and draw
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrame = requestAnimationFrame(render);
    }

    // Start rendering loop
    render();
  }

  // TODO: don't load both mobile and desktop videos on initial load
  onMount(async () => {
    // const isMobile = typeof window !== 'undefined' && window.innerWidth < 769;

    // Initialize landscape video
    if (videoLandscapeElement) {
      videoLandscapeElement.addEventListener('playing', () => {
        videoLandscapeReady = true;
      });
      initializeHLS(videoLandscapeElement, HeroLandscapeVideo, () => {
        videoLandscapeElement.play();
      });
    }

    // Initialize portrait video
    if (videoPortraitElement) {
      videoPortraitElement.addEventListener('playing', () => {
        videoPortraitReady = true;
      });
      initializeHLS(videoPortraitElement, HeroPortraitVideo, () => {
        videoPortraitElement.play();
      });
    }

    // Initialize screen video
    if (screenVideoElement) {
      screenVideoElement.addEventListener('playing', () => {
        screenVideoReady = true;
      });
      initializeHLS(screenVideoElement, ScreenVideo, () => {
        screenVideoElement.play();
        // Initialize WebGL after video starts
        setTimeout(() => {
          initWebGL();
        }, 100);
      });
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });

  function handleDragStart(e) {
    e.preventDefault();
    return false;
  }
</script>

<svelte:head>
  <link rel="preload" as="image" href="/videos/hero-landscape/poster.jpg" />
  <link rel="preload" as="image" href="/videos/hero-portrait/poster.jpg" />
  <link rel="preload" as="image" href="/videos/screen-video/poster.jpg" />
</svelte:head>

<section class="hero-image desktop" style="background-image: url('/videos/hero-landscape/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">
  <video
    bind:this={videoLandscapeElement}
    class:ready={videoLandscapeReady}
    poster="/videos/hero-landscape/poster.jpg"
    autoplay
    muted
    loop
    playsinline
    draggable="false"
  />
</section>


<section class="hero-image mobile" style="background-image: url('/videos/hero-portrait/poster.jpg');" on:dragstart={handleDragStart} role="img" aria-label="Hero image">
  <video
    bind:this={videoPortraitElement}
    class:ready={videoPortraitReady}
    poster="/videos/hero-portrait/poster.jpg"
    autoplay
    muted
    loop
    playsinline
    draggable="false"
  />
</section>

<section class="dark" id="hero">
  <div class="container">
    <h1>comma four</h1>
    <h2 class="muted">An AI upgrade for your car</h2>
    <Grid columns={2} rowGap="3rem">
      <div class="device-image-container">
        <img
          src={DeviceImage}
          alt="comma four device"
        />
        <video
          bind:this={screenVideoElement}
          class:ready={screenVideoReady}
          poster="/videos/screen-video/poster.jpg"
          autoplay
          muted
          loop
          playsinline
          draggable="false"
          class="screen-video-source"
          style="display: none;"
        />
        <canvas
          bind:this={screenVideoCanvas}
          class:ready={screenVideoReady}
          class="screen-video-overlay"
        />
      </div>
      <div>
        <div class="mb-2">
          <Grid columns={2} columnGap="1rem" rowGap="1.25rem" size="small" wrapMode="none">
            <div class="feature-item">
              {@html LaneCenteringIcon}
              <span>Lane<br />centering</span>
            </div>
            <div class="feature-item">
              {@html RecordingsIcon}
              <span>Dashcam<br />recording</span>
            </div>
            <div class="feature-item">
              {@html AdaptiveCruiseIcon}
              <span>Adaptive<br />cruise</span>
            </div>
            <div class="feature-item">
              {@html OtaUpdatesIcon}
              <span>OTA<br />updates</span>
            </div>
            <div class="feature-item">
              {@html LocationIcon}
              <span>Lane<br />changing</span>
            </div>
            <div class="feature-item">
              {@html ThreeSixtyVisionIcon}
              <span>360° vision</span>
            </div>
          </Grid>
        </div>
        <LinkButton href="/shop/comma-four" fullWidth={true} style="accent">
          Buy now
        </LinkButton>
      </div>
    </Grid>
    <h1 class="mt-4">Buy it, plug it in, and engage.</h1>
    <h3 class="muted">
      comma four works with the car you already drive. It's active driver assistance
      for your Toyota, Hyundai, Ford, and more.
    </h3>
  </div>
</section>

<section class="light" id="compatibility">
  <div class="container">
    <h1 class="mb-7 sm-mb-3">openpilot can drive for hours without driver action.</h1>
    <Grid columns={2} rowGap="3rem">
      <h1>
        It works on {vehicleCountText} car models from 27 brands.
        <span class="muted">Is your car supported?</span>
      </h1>
      <div>
        <FeaturedCarsList />
        <LinkButton href="/vehicles" style="primary" fullWidth={true}>
          View all {vehicleCountText} cars
        </LinkButton>
      </div>
    </Grid>
  </div>
</section>

<section class="dark" id="social">
  <div class="container">
    <SectionHeader leftLabel="comma" rightLabel="is real" />
    <h1>
      300+ million miles driven and 20k users. Our GitHub repo has
      <a href="https://github.com/commaai/openpilot" target="_blank" class="highlight">{Math.floor(githubStars / 10000) * 10}k stars</a>.
    </h1>
    <FeaturedArticles />
    <h1>
      Follow us on 𝕏
      <a href="https://twitter.com/comma_ai" target="_blank" class="highlight">@comma_ai</a>.
    </h1>
  </div>
</section>

<section class="light" id="recruit">
  <div class="container">
    <SectionHeader leftLabel="Careers" rightLabel="We are hiring" />
    <h1 class="mb-5 sm-mb-3">Join us in building the future.</h1>
    <Grid columns={2} columnGap="6rem" size="large">
      <Grid columns={2}>
        <div class="recruiting-card">
          <span class="muted">/01</span>
          <span>product</span>
        </div>
        <div class="recruiting-card">
          <span class="muted">/02</span>
          <span>autonomy</span>
        </div>
        <div class="recruiting-card">
          <span class="muted">/03</span>
          <span>operations</span>
        </div>
      </Grid>
      <div>
        <h4>
          We're looking for talented individuals, able to work independently,
          and ready to make a meaningful impact.
        </h4>
        <LinkButton
          href="/jobs"
          style="primary"
          fullWidth={true}
        >
          See open positions
        </LinkButton>
      </div>
    </Grid>
  </div>
</section>

<style>
  .hero-image {
    position: relative;
    /* Behind nav bar */
    margin: -66px 0 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 0;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &.desktop {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    &.mobile {
      height: unset;
      aspect-ratio: 3 / 4;
      @media screen and (min-width: 769px) {
        display: none;
      }
    }

    & video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      opacity: 0;
      transition: opacity 0.3s ease-in;

      &.ready {
        opacity: 1;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 180px;
      background: linear-gradient(to bottom, transparent, black);
      z-index: 2;
      pointer-events: none;
    }
  }

  #hero {
    & .feature-item {
      align-items: center;
      display: flex;
      color: white;

      & img {
        border: 1px solid #000;
        width: 52px;
        margin-right: 0.5rem;
        padding: 0.375rem;
        display: inline-block;
      }

      & span {
        color: var(--color-muted);
        text-transform: uppercase;
        flex: 1;
        font-family: JetBrains Mono, monospace;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.25;
        margin-left: 1rem;
      }
    }

    & h3 {
      line-height: 1.4;
    }

    @media screen and (max-width: 375px) {
      & .feature-item span {
        font-size: 0.75rem;
      }
    }
  }

  #recruit {
    & .recruiting-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem;
      border: 1px solid #000;

      & span {
        display: block;
      }

      & span:first-child {
        font-family: JetBrains Mono, monospace;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1;
        margin-bottom: 0.375rem;
      }

      & span:last-child {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1;
      }
    }

    @media screen and (max-width: 768px) {
      & h4 {
        margin-bottom: 2rem;
      }
    }
  }

  .device-image-container {
    position: relative;
    display: inline-block;
    transform: scale(1.1);

    & img {
      display: block;
      width: 100%;
      height: auto;
    }

    & .screen-video-source {
      display: none;
    }

    & .screen-video-overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      /* Use transform to scale and position - WebGL handles high-quality downscaling */
      transform: translate(23.21%, 63.97%) scale(0.4021, 0.258);
      transform-origin: top left;
      mix-blend-mode: screen;
      opacity: 0;
      transition: opacity 0.3s ease-in;
      pointer-events: none;

      &.ready {
        opacity: 1;
      }
    }
  }
</style>
