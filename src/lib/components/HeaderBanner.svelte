<a href="https://tickets.comma-con.com/events/comma/1859964" target="_blank" class="banner">
  <div class="wrapper">
    <strong class="headline">
      COMMA_CON 2025 is Nov 8th in San Diego, CA!
      Get your ticket now.
    </strong>
  </div>
</a>

<style>
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
    background-color: var(--color-accent);
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
      black 30%,
      #666 50%,
      black 70%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }
</style>
