<a href="https://tickets.comma-con.com/events/comma/1859964" target="_blank" class="banner">
  <div class="top-border"></div>
  <div class="wrapper">
    <strong class="headline">
      COMMA_CON is Nov 8th in San Diego, CA!
      Get your ticket here.
    </strong>
  </div>
  <div class="bottom-border"></div>
</a>

<style>
  @keyframes borderShine {
    0% {
      background-position: -200% 0%;
    }
    100% {
      background-position: 200% 0%;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .banner {
    display: block;
    text-decoration: none;
    color: black;
    background-color: rgb(3, 47, 4);
    box-shadow: inset 0 -12px 8px rgb(0, 109, 13);
  }

  .top-border,
  .bottom-border {
    height: 8px;
    background:
      linear-gradient(90deg, transparent, #00b925, #002a08, transparent),
      radial-gradient(ellipse at center, #2d4a35 20%, #1e3a28 35%, #0a0f0e 80%);
    background-size: 200% 100%;
    animation: borderShine 35s linear infinite;
  }

  .wrapper {
    padding: 1.5rem 0;
    margin-left: auto;
    margin-right: auto;
    width: 85%;
    max-width: 90rem;
    font-size: 0.875rem;
    line-height: 1.2;
    text-align: center;

    display: flex;
    flex-direction: column;
    grid-row-gap: 0.5rem;
  }

  strong {
    display: block;
    margin: 0 0.5rem;
    font-family: JetBrains Mono, monospace;
    text-decoration: none;
  }

  .headline {
    font-size: 1.75rem;
    background: linear-gradient(
      90deg,
      #1e921a 0%,
      #00ff41 20%,
      #1e921a 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 25s linear infinite;
  }
</style>
