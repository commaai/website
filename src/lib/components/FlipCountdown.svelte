<script>
  import { onMount } from 'svelte';

  export let endDate = new Date();

  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;

  let timeUnits = [
    { display: '00', label: 'days' },
    { display: '00', label: 'hrs' },
    { display: '00', label: 'min' },
    { display: '00', label: 'sec' }
  ];

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  function updateCountdown() {
    const msRemaining = Math.max(0, endDate - Date.now());

    timeUnits[0].display = pad(Math.floor(msRemaining / MS_PER_DAY));
    timeUnits[1].display = pad(Math.floor((msRemaining % MS_PER_DAY) / MS_PER_HOUR));
    timeUnits[2].display = pad(Math.floor((msRemaining % MS_PER_HOUR) / MS_PER_MINUTE));
    timeUnits[3].display = pad(Math.floor((msRemaining % MS_PER_MINUTE) / MS_PER_SECOND));
    timeUnits = timeUnits;

    return msRemaining > 0;
  }

  onMount(() => {
    if (!updateCountdown()) return;

    const intervalId = setInterval(() => {
      if (!updateCountdown()) clearInterval(intervalId);
    }, MS_PER_SECOND);

    return () => clearInterval(intervalId);
  });
</script>

<span class="countdown">
  {#each timeUnits as unit, i (unit.label)}
    {#if i > 0}<span class="colon">:</span>{/if}
    <span class="time-unit">
      <span class="flip-digit">
        <span class="upper-flap">{unit.display}</span>
        <span class="lower-flap">{unit.display}</span>
        <span class="split-line"></span>
      </span>
      <span class="unit-label">{unit.label}</span>
    </span>
  {/each}
</span>

<style>
  .countdown {
    display: flex;
    align-items: flex-start;
    gap: 0.15rem;
    flex-shrink: 0;
  }

  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flip-digit {
    position: relative;
    width: 1.85rem;
    height: 1.65rem;
    background: #111;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    overflow: hidden;
  }

  .upper-flap,
  .lower-flap {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    overflow: hidden;
    font-family: JetBrains Mono, monospace;
    font-size: 1.15rem;
    font-weight: 700;
    color: #86ff4e;
    text-shadow: 0 0 8px rgba(134,255,78,0.3);
    line-height: 1.65rem;
    text-align: center;
  }

  .upper-flap {
    top: 0;
    background: linear-gradient(180deg, #2d2d2d 0%, #1f1f1f 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
  }

  .lower-flap {
    bottom: 0;
    background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
    box-shadow: inset 0 -1px 0 rgba(255,255,255,0.05);
    line-height: 0;
  }

  .split-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #000;
    transform: translateY(-50%);
    box-shadow: 0 2px 1px rgba(255,255,255,0.2);
  }

  .split-line::before,
  .split-line::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 3px;
    height: 4px;
    background: #0a0a0a;
    transform: translateY(-50%);
  }

  .split-line::before { left: -1px; }
  .split-line::after { right: -1px; }

  .unit-label {
    font-family: JetBrains Mono, monospace;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 4px;
  }

  .colon {
    color: #86ff4e;
    font-weight: 700;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    opacity: 0.8;
  }
</style>
