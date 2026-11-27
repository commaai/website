<script>
  // B: type only. One plain statement on white, so the dark "Drives like you do." reads as the next line.
  import LinkButton from "$lib/components/LinkButton.svelte";
  import { vehicleCountText } from "$lib/constants/vehicles.js";

  const facts = [
    ["400M+", "miles driven"],
    [vehicleCountText, "cars supported"],
    ["MIT", "licensed"],
  ];
</script>

<section class="light hero-b">
  <div class="container">
    <h1>
      <span class="muted">Your car came with driver assistance.</span>
      openpilot is the upgrade.
    </h1>

    <div class="bottom">
      <ul class="facts">
        {#each facts as [value, label]}
          <li><span class="value">{value}</span> {label}</li>
        {/each}
      </ul>
      <div class="actions">
        <LinkButton href="/shop/comma-four" style="accent">Buy comma four</LinkButton>
        <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="primary">View on GitHub</LinkButton>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-b {
    padding-top: 7rem;
    padding-bottom: 6rem;
    background-color: #fff;
    color: #000;
  }

  h1 {
    max-width: 17ch;
    margin: 0;
    font-size: clamp(3rem, 6.4vw, 6rem);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1;
    text-wrap: balance;
  }

  .muted {
    color: #0000004d;
  }

  .bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2.5rem;
    margin-top: 4.5rem;
    padding-top: 2rem;
    border-top: 1px solid #000;
  }

  .facts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 3rem;
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      color: #00000099;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    & .value {
      color: #000;
      font-family: var(--font-sans);
      font-size: 1.75rem;
      font-weight: 600;
      text-transform: none;
      letter-spacing: -0.03em;
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .hero-b {
      padding-top: 3.5rem;
      padding-bottom: 4rem;
    }

    h1 {
      font-size: 2.6rem;
    }

    .bottom {
      gap: 2rem;
      margin-top: 2.5rem;
      padding-top: 1.5rem;
    }

    .facts {
      flex-direction: column;
    }
  }
</style>
