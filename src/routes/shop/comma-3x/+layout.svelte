<script>
  import DeviceVideoWebm from "$lib/videos/comma-3x.webm";
  import DeviceVideoMp4 from "$lib/videos/comma-3x.mp4";
</script>

<div class="hero">
  <video autoplay muted loop webkit-playsinline playsinline disableRemotePlayback>
    <source src={DeviceVideoWebm} type="video/webm" />
    <source src={DeviceVideoMp4} type="video/mp4" />
  </video>
  <hgroup>
    <h1>comma 3X</h1>
    <h2>Make driving chill</h2>
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

    & video {
      width: 100%;
      height: 45vh;
      object-fit: cover;
    }
  }

  @media only screen and (max-width: 1024px) {
    video {
      height: 40vh;
    }
  }

  @media screen and (max-width: 768px) {
    .hero {
      display: none;
    }
  }
</style>
