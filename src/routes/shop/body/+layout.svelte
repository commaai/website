<script>
  import DeviceVideoWebm from "$lib/videos/comma-body.webm";
  import DeviceVideoMp4 from "$lib/videos/comma-body.mp4";
</script>

<div class="hero">
  <video autoplay muted loop webkit-playsinline playsinline disableRemotePlayback>
    <source src={DeviceVideoWebm} type="video/webm" />
    <source src={DeviceVideoMp4} type="video/mp4" />
  </video>
  <hgroup>
    <span>Meet</span>
    <h1>comma body</h1>
    <h2>The future of people</h2>
  </hgroup>
</div>

<slot />

<style>
  .hero {
    position: relative;
    color: white;

    & hgroup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;

      text-align: center;
      text-transform: uppercase;

      & span {
        display: block;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      & h1 {
        text-transform: uppercase;
        font-family:
          Monument Extended Black,
          sans-serif;
        margin-bottom: 1rem;
      }

      & h2 {
        font-family: JetBrains Mono, monospace;
        font-size: 2rem;
      }
    }
  }

  video {
    width: 100%;
    height: 45vh;
    object-fit: cover;
  }

  @media only screen and (max-width: 1024px) {
    video {
      height: 40vh;
    }
  }

  @media only screen and (max-width: 768px) {
    .hero {
      display: none;
    }
  }
</style>
