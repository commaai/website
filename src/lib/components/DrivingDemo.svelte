<script>
  import { onMount } from "svelte";

  // One loop showing both behaviours at once:
  //  - lateral: the road curves, openpilot tracks the center, stock drifts and corrects late
  //  - longitudinal: a light comes toward the car; openpilot slows down and rolls through as
  //    it turns green, stock holds its speed the whole way
  // No speed readouts — the difference shows in how far apart the two cars end up.
  // Claim source: vehicles.json detail_sentence, "Traffic light and stop sign handling is
  // also available in Experimental mode."

  const W = 620;      // viewBox width
  const H = 142;      // viewBox height
  const MID = H / 2;
  const OFFSET = 36;  // how far the road shifts across the bend
  const FLAT = 470;   // straight run before/after the bend
  const TURN = 300;   // length of the bend itself
  const PERIOD = 2 * (FLAT + TURN);
  const LANE = 28;    // half lane width
  const CAR_X = 130;  // cars are fixed here; the road moves past them
  const SLOW_FROM = 430;
  const GREEN_AT = 90;
  const BASE = 3.1;   // road units per tick

  // a stretch of the high straight where the markings have worn away
  const DEG_FROM = FLAT + TURN + 90;
  const DEG_TO = DEG_FROM + 430;
  const DEG_FADE = 90;

  const smooth = (t) => t * t * (3 - 2 * t);
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  let opDist = 0;
  let stockDist = 0;
  let opSpeed = BASE;
  let el;

  // One light per loop, parked in the middle of the low straight. Green is driven by
  // openpilot's approach: it slows down and arrives after the change, while stock — which
  // never slows and so runs ahead — reaches its light while it is still red.
  const LIGHT_AT = FLAT / 2;

  // straight, one gentle bend, straight again a lane-width higher, then back down later.
  // Reads as the camera panning with a single curve rather than a rolling wave.
  function curveAt(x) {
    let t = ((x % PERIOD) + PERIOD) % PERIOD;
    if (t < FLAT) return MID;
    t -= FLAT;
    if (t < TURN) return MID - OFFSET * smooth(t / TURN);
    t -= TURN;
    if (t < FLAT) return MID - OFFSET;
    t -= FLAT;
    return MID - OFFSET * (1 - smooth(t / TURN));
  }

  const wornAt = (x) => {
    const t = ((x % PERIOD) + PERIOD) % PERIOD;
    return t >= DEG_FROM && t < DEG_TO;
  };

  // how worn the markings are at x, ramped so nothing pops in or out
  function wornAmount(x) {
    const t = ((x % PERIOD) + PERIOD) % PERIOD;
    if (t <= DEG_FROM - DEG_FADE || t >= DEG_TO + DEG_FADE) return 0;
    if (t < DEG_FROM) return smooth((t - (DEG_FROM - DEG_FADE)) / DEG_FADE);
    if (t > DEG_TO) return 1 - smooth((t - DEG_TO) / DEG_FADE);
    return 1;
  }

  // one period wider than the viewBox so translating by dist % PERIOD never shows an end.
  // Split into painted / worn runs so the worn stretch can be drawn faintly.
  function lanePath(offset, worn) {
    let d = "";
    let pen = false;
    for (let x = 0; x <= W + PERIOD; x += 8) {
      if (wornAt(x) === worn) {
        d += `${pen ? "L" : "M"}${x},${(curveAt(x) + offset).toFixed(2)} `;
        pen = true;
      } else {
        pen = false;
      }
    }
    return d;
  }
  const edgeTop = lanePath(-LANE, false);
  const edgeBottom = lanePath(LANE, false);
  const center = lanePath(0, false);
  const edgeTopWorn = lanePath(-LANE, true);
  const edgeBottomWorn = lanePath(LANE, true);

  function lightX(dist) {
    let x = LIGHT_AT - (dist % PERIOD);
    while (x < -90) x += PERIOD;
    return x;
  }

  $: opLightX = lightX(opDist);
  $: stockLightX = lightX(stockDist);
  $: opToLight = opLightX - CAR_X;
  $: lightGreen = opToLight < GREEN_AT;

  // rotate each car onto the road's tangent. atan of the viewBox slope is correct even
  // though preserveAspectRatio="none" scales x and y differently.
  const D = 6;
  const angleAt = (x) =>
    (Math.atan2(curveAt(x + D) - curveAt(x - D), 2 * D) * 180) / Math.PI;
  $: opAngle = angleAt(CAR_X + opDist);
  $: stockAngle = angleAt(CAR_X + stockDist - 150);

  // openpilot sits on the lane center; stock reacts late, so it cuts and overshoots
  $: opY = curveAt(CAR_X + opDist);
  $: stockY =
    curveAt(CAR_X + stockDist - 150) +
    Math.sin((stockDist / 260) * Math.PI) * (4 + 15 * wornAmount(CAR_X + stockDist - 150));

  $: opWorn = wornAmount(CAR_X + opDist);
  $: stockWorn = wornAmount(CAR_X + stockDist - 150);
  $: opStatus = !lightGreen && opToLight < SLOW_FROM
    ? "slowing down for the light"
    : opWorn > 0.5
      ? "no lane lines — still centered"
      : "on the center line";
  $: stockStatus = stockWorn > 0.5 ? "no lines to follow — wandering" : "holds speed — you brake";

  onMount(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf;
    let last = 0;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 16) return;
      last = now;

      // ramps with distance to the light rather than switching between two speeds
      const approach = clamp01((lightX(opDist) - CAR_X - GREEN_AT) / SLOW_FROM);
      const wants = lightGreen ? BASE : BASE * (0.22 + 0.78 * smooth(approach));
      opSpeed += (wants - opSpeed) * 0.02;

      opDist += opSpeed;
      stockDist += BASE;
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced.matches) {
        if (!raf) raf = requestAnimationFrame(frame);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { threshold: 0.15 });

    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  });
</script>

<div class="demo" bind:this={el}>
  <div class="demo-head">
    <span class="demo-tag">lane centering + adaptive cruise</span>
    <p>
      openpilot holds the center through the curve, stays there where the lane lines have
      worn away, and slows down for the light. stock assist needs the lines, and holds its
      speed — you brake.
    </p>
  </div>

  <div class="lanes" aria-hidden="true">
    <div class="lane-row">
      <span class="who op">openpilot</span>
      <svg viewBox="0 0 {W} {H}" preserveAspectRatio="none">
        <g style="transform: translateX({-(opDist % PERIOD)}px)">
          <path class="edge" d={edgeTop} />
          <path class="edge" d={edgeBottom} />
          <path class="edge worn" d={edgeTopWorn} />
          <path class="edge worn" d={edgeBottomWorn} />
          <path class="dash" d={center} />
        </g>
        <g style="transform: translateX({opLightX - CAR_X}px)">
          <line class="stopline" class:green={lightGreen} x1={CAR_X} y1="30" x2={CAR_X} y2={H - 22} />
          <g transform="translate({CAR_X - 9}, 2)">
            <rect class="signal-box" width="18" height="42" rx="5" />
            <circle class="bulb red" class:on={!lightGreen} cx="9" cy="10" r="4.5" />
            <circle class="bulb amber" cx="9" cy="21" r="4.5" />
            <circle class="bulb green" class:on={lightGreen} cx="9" cy="32" r="4.5" />
          </g>
        </g>
        <rect
          class="car op"
          x={CAR_X - 16}
          y={opY - 6}
          width="32"
          height="12"
          rx="2"
          transform="rotate({opAngle} {CAR_X} {opY})"
        />
      </svg>
      <span class="status" class:easing={opStatus !== "on the center line"}>{opStatus}</span>
    </div>

    <div class="lane-row">
      <span class="who">stock assist</span>
      <svg viewBox="0 0 {W} {H}" preserveAspectRatio="none">
        <g style="transform: translateX({-(stockDist % PERIOD)}px)">
          <path class="edge" d={edgeTop} />
          <path class="edge" d={edgeBottom} />
          <path class="edge worn" d={edgeTopWorn} />
          <path class="edge worn" d={edgeBottomWorn} />
          <path class="dash" d={center} />
        </g>
        <g style="transform: translateX({stockLightX - CAR_X}px)">
          <line class="stopline" class:green={lightGreen} x1={CAR_X} y1="30" x2={CAR_X} y2={H - 22} />
          <g transform="translate({CAR_X - 9}, 2)">
            <rect class="signal-box" width="18" height="42" rx="5" />
            <circle class="bulb red" class:on={!lightGreen} cx="9" cy="10" r="4.5" />
            <circle class="bulb amber" cx="9" cy="21" r="4.5" />
            <circle class="bulb green" class:on={lightGreen} cx="9" cy="32" r="4.5" />
          </g>
        </g>
        <rect
          class="car"
          x={CAR_X - 16}
          y={stockY - 6}
          width="32"
          height="12"
          rx="2"
          transform="rotate({stockAngle} {CAR_X} {stockY})"
        />
      </svg>
      <span class="status">{stockStatus}</span>
    </div>
  </div>
</div>

<style>
  .demo {
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 1.5rem;
  }

  .demo-tag {
    color: var(--color-accent);
    display: inline-block;
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    letter-spacing: 0;
    margin-bottom: 0.625rem;
  }

  .demo-head p {
    color: white;
    font-size: 1.125rem;
    letter-spacing: -0.04em;
    line-height: 1.35;
    margin: 0;
  }

  .lanes {
    display: grid;
    gap: 1.125rem;
    margin-top: 1.5rem;
  }

  .lane-row {
    display: grid;
    gap: 0.375rem;
  }

  svg {
    background: rgba(255, 255, 255, 0.04);
    display: block;
    height: 6.75rem;
    overflow: hidden;
    width: 100%;
  }

  .who {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.875rem;
    letter-spacing: -0.02em;
  }

  .who.op {
    color: white;
  }

  .edge {
    fill: none;
    stroke: rgba(255, 255, 255, 0.32);
    stroke-width: 2;
  }

  /* worn markings: faint and broken up, not absent, so the road still reads as a road */
  .edge.worn {
    stroke: rgba(255, 255, 255, 0.09);
    stroke-dasharray: 5 22;
  }

  .dash {
    fill: none;
    stroke: rgba(255, 255, 255, 0.22);
    stroke-dasharray: 16 26;
    stroke-width: 2;
  }

  .stopline {
    stroke: rgba(255, 65, 51, 0.4);
    stroke-width: 2;
    transition: stroke 0.2s ease;
  }

  .stopline.green {
    stroke: rgba(81, 255, 0, 0.3);
  }

  .signal-box {
    fill: #101010;
    stroke: rgba(255, 255, 255, 0.35);
    stroke-width: 1.5;
  }

  .bulb {
    opacity: 0.14;
    transition: opacity 0.2s ease;
  }

  .bulb.red { fill: #ff4133; }
  .bulb.amber { fill: #ffb300; }
  .bulb.green { fill: var(--color-accent); }

  .bulb.on {
    opacity: 1;
  }

  .car {
    fill: rgba(255, 255, 255, 0.8);
  }

  .car.op {
    fill: var(--color-accent);
  }

  .status {
    color: rgba(255, 255, 255, 0.5);
    font-family: JetBrains Mono, monospace;
    font-size: 0.8125rem;
    transition: color 0.25s ease;
  }

  .status.easing {
    color: var(--color-accent);
  }
</style>
