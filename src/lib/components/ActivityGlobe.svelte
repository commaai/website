<script>
  import { onMount } from "svelte";
  import { LAND } from "$lib/constants/land.js";

  // Orthographic projection by hand — no three.js, no WebGL, no WebGPU. A sphere spun
  // about its axis is ~15 lines of trig, and everything below is plain SVG.

  const R = 132;
  const CX = 150;
  const CY = 150;
  const BASE_TILT = 18; // degrees; the view centre's latitude

  // Real fleet activity — route start and end points over 90 days, binned to a 0.25deg
  // grid and cut at 100 endpoints per cell. 4,130 cells, 97% of all driving. Fetched
  // rather than imported so its 88KB stays off the critical path: land and graticule
  // render immediately and the density arrives after. The cut also drops single-drive
  // cells, which matters — route endpoints are where people park.
  let cells = [];

  let rot = 0;
  let el;

  // The viewBox is sized from the element rather than fixed, so px-per-user-unit stays
  // constant: the sphere keeps the same on-screen diameter while the viewport around it can
  // be as large as the section. A fixed 300x300 box meant a zoomed sphere (264 units at
  // zoom 1, ~690 at 2.6) clipped to a small square window with the page showing either side.
  const SPHERE_MAX = 672; // px across when zoomed out — matches the old 48rem footprint
  let vbw = 300;
  let vbh = 300;
  $: ox = vbw / 2 - CX; // centres the sphere's own coordinate system in the larger viewBox
  $: oy = vbh / 2 - CY;

  function measure() {
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    const sphere = Math.min(SPHERE_MAX, w * 0.82, h * 0.94);
    const scale = sphere / (2 * R); // px per user unit
    vbw = w / scale;
    vbh = h / scale;
  }

  const BASE_SPIN = 0.12; // degrees per tick when left alone (60 ticks/sec)
  const DEG_PER_PX = 0.4; // drag feel: dragging the sphere's width turns it about a third
  const CATCH_UP = 0.028; // per tick, how fast a flick bleeds back to the idle drift
  const MAX_FLICK = 3; // cap so a hard flick spins fast, not comically
  // First-order low pass on the drag. The pointer reports at 60-120Hz but we only redraw at
  // 30, so following it exactly lands the globe on whichever sample the tick happened to
  // catch and the motion looks choppy. Chasing a target instead smooths that out; ~80ms of
  // lag, which reads as weight rather than delay.
  const DRAG_LAG = 0.175;

  // The tour uses two cascaded low passes instead of one. A single filter starts at full
  // speed and only decelerates; cascading two gives an S-curve that eases in as well, which
  // is what makes a Google Earth fly-over read as smooth rather than as a lurch.
  const TOUR_LAG = 0.028;
  const ZOOM_IN = 2.6; // enough to read a region; the 110m coastline turns angular past ~3
  // The fly-over rate, held constant rather than derived from the live zoom so the amount it
  // will travel during a leg is known up front and can be compensated for exactly (see
  // startLeg). BASE_SPIN/ZOOM_IN means that once zoomed in it sweeps past at the same
  // apparent speed on screen as the idle rotation does zoomed out.
  const DRIFT = BASE_SPIN / ZOOM_IN;

  // Ticks at ~30fps. A cycle is: free (just turning) -> travel -> hold -> free again.
  // Travel pans and zooms simultaneously: both aims are set at the same moment and share
  // TOUR_LAG, so they arrive together. Zooming as a separate phase afterwards read as
  // pan, pause, zoom.
  const T_FREE = 420;
  const T_TRAVEL = 300;
  const T_LABEL = 170; // label fades up once most of the move is behind us
  const T_HOLD = 340;

  // Coordinates are the densest 0.25deg cell of each cluster in the real density grid, not
  // hand-placed. Names are metro-level and hand-written, so they are the one thing here
  // worth re-checking; where the densest cell sat between cities I kept it to the country.
  const HOTSPOTS = [
    { lat: 32.88, lon: -117.13, name: "San Diego, United States" },
    { lat: 37.38, lon: -121.88, name: "San Jose, United States" },
    { lat: 40.63, lon: -73.88, name: "New York, United States" },
    { lat: 47.63, lon: -122.13, name: "Seattle, United States" },
    { lat: 41.88, lon: -87.63, name: "Chicago, United States" },
    { lat: 30.38, lon: -97.63, name: "Austin, United States" },
    { lat: 43.88, lon: -79.38, name: "Toronto, Canada" },
    { lat: 25.13, lon: 121.63, name: "Taipei, Taiwan" },
    { lat: 37.38, lon: 127.13, name: "Seoul, South Korea" },
    { lat: -33.88, lon: 151.13, name: "Sydney, Australia" },
    { lat: -37.88, lon: 145.13, name: "Melbourne, Australia" },
    { lat: -36.88, lon: 174.88, name: "Auckland, New Zealand" },
    { lat: 47.38, lon: 8.63, name: "Zurich, Switzerland" },
    { lat: 13.63, lon: 100.63, name: "Bangkok, Thailand" },
    { lat: 24.38, lon: 54.63, name: "Abu Dhabi, United Arab Emirates" },
    { lat: 52.13, lon: 4.38, name: "Netherlands" },
    { lat: 52.13, lon: -1.13, name: "England, United Kingdom" },
  ];

  let dragging = false;
  let tilt = BASE_TILT;
  let zoom = 1;
  let spin = BASE_SPIN; // live rate, which a flick temporarily overrides
  let idleSpin = BASE_SPIN; // 0 when the visitor asked for reduced motion
  let raf = 0;
  let lastTick = 0;

  // middle stage of the cascaded filter, one per axis
  let rotMid = 0;
  let tiltMid = BASE_TILT;
  let zoomMid = 1;

  let phase = "free";
  let phaseT = 0;
  let place = null;
  let labelOn = false;
  // Where the current leg is headed, and how far the fly-over has drifted past it. Held
  // apart so travel can aim at a stationary point: letting the drift move the aim during
  // the approach put us ~66deg past the target by the time the zoom landed.
  let legAnchor = 0;
  let legDrift = 0;

  const wrap = (deg) => ((deg % 360) + 360) % 360;
  const clampTilt = (deg) => Math.max(-90, Math.min(90, deg));

  function startLeg() {
    let next = place;
    while (HOTSPOTS.length > 1 && next === place) {
      next = HOTSPOTS[Math.floor(Math.random() * HOTSPOTS.length)];
    }
    place = next;
    // Pick the rotation equivalent nearest where we already are, so a leg never crosses the
    // whole globe just because the accumulated drift sits on the far side of the seam.
    const want = -place.lon;
    const anchor = want + 360 * Math.round((rotPos - want) / 360);
    // Start the leg short by exactly the drift the approach will accumulate, so the target
    // is dead centre the moment travel ends — and the globe never has to stop turning to
    // get there. Aiming at a stationary point instead made it stall for the tail of travel.
    legAnchor = anchor - T_TRAVEL * DRIFT;
    legDrift = 0;
    tiltAim = clampTilt(place.lat);
    aimZoom = ZOOM_IN; // set now, not in a later phase, so the zoom rides along with the pan
    phase = "travel";
    phaseT = 0;
  }

  function tourTick() {
    phaseT++;
    if (phase === "free" && phaseT >= T_FREE) startLeg();
    else if (phase === "travel") {
      if (phaseT === T_LABEL) labelOn = true;
      if (phaseT >= T_TRAVEL) {
        phase = "hold";
        phaseT = 0;
      }
    } else if (phase === "hold" && phaseT >= T_HOLD) {
      phase = "free";
      phaseT = 0;
      labelOn = false;
      aimZoom = 1;
      tiltAim = BASE_TILT;
    }
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (now - lastTick < 16) return; // 60fps
    lastTick = now;
    if (dragging) {
      // Chase the pointer instead of snapping to it — see DRAG_LAG. Single stage here: the
      // cascade's extra smoothing reads as lag when it is your own hand doing the moving.
      rotPos += (rotAim - rotPos) * DRAG_LAG;
      rot = wrap(rotPos);
      tilt += (tiltAim - tilt) * DRAG_LAG;
      return;
    }

    if (phase === "free") {
      rotAim += spin; // plain rotation, and what carries a flick's momentum
    } else {
      // Runs through travel and hold alike, so the rotation never pauses: the approach is a
      // moving target that the pan converges onto, and it keeps sweeping past afterwards.
      legDrift += DRIFT;
      rotAim = legAnchor + legDrift;
    }
    rotMid += (rotAim - rotMid) * TOUR_LAG;
    rotPos += (rotMid - rotPos) * TOUR_LAG;
    rot = wrap(rotPos);

    tiltMid += (tiltAim - tiltMid) * TOUR_LAG;
    tilt += (tiltMid - tilt) * TOUR_LAG;
    zoomMid += (aimZoom - zoomMid) * TOUR_LAG;
    zoom += (zoomMid - zoom) * TOUR_LAG;

    // Ease rather than snap, so letting go of a flick glides back to the idle rate.
    spin += (idleSpin - spin) * CATCH_UP;
    if (Math.abs(spin - idleSpin) < 0.002) spin = idleSpin;

    if (idleSpin) tourTick();
    else if (!spin && Math.abs(tilt - tiltAim) < 0.05 && Math.abs(zoom - aimZoom) < 0.002) {
      stopSpin(); // reduced motion: let a glide finish, then stop burning frames
    }
  }

  function startSpin() {
    if (!raf) {
      lastTick = 0;
      raf = requestAnimationFrame(tick);
    }
  }

  function stopSpin() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  let grabX = 0;
  let grabY = 0;
  let rotAim = 0; // left unwrapped, so the filter never has to reason about the 0/360 seam
  let rotPos = 0;
  let tiltAim = BASE_TILT;
  let aimZoom = 1;
  let flickX = 0;
  let flickT = 0;
  let flick = 0;

  function onPointerDown(event) {
    if (event.button > 0) return; // left button and touch only
    dragging = true;
    // A drag interrupts the tour: drop the label and pull back so the hand is in charge of
    // a whole globe, not a zoomed-in corner of one.
    labelOn = false;
    aimZoom = 1;
    grabX = event.clientX;
    grabY = event.clientY;
    rotAim = rot;
    rotPos = rot;
    tiltAim = tilt;
    flickX = event.clientX;
    flickT = event.timeStamp;
    flick = 0;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    startSpin();
  }

  function onPointerMove(event) {
    if (!dragging) return;
    rotAim += (event.clientX - grabX) * DEG_PER_PX;
    // Clamped on the aim, not on tilt, so the filter converges on a legal angle instead of
    // fighting a target beyond the pole. Dragging down looks further north.
    tiltAim = clampTilt(tiltAim + (event.clientY - grabY) * DEG_PER_PX);
    grabX = event.clientX;
    grabY = event.clientY;
    // Sample over a short window rather than the last event: single-event deltas are
    // noisy, and a pointer held still would otherwise read as a fast flick on release.
    const dt = event.timeStamp - flickT;
    if (dt > 24) {
      flick = ((event.clientX - flickX) * DEG_PER_PX * 16) / dt; // degrees per tick
      flickX = event.clientX;
      flickT = event.timeStamp;
    }
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    spin = Math.max(-MAX_FLICK, Math.min(MAX_FLICK, flick));
    // Hand back to the auto path without a jump: seed both filter stages where the drag
    // actually left the globe, then let tilt glide home to the default lean.
    rotAim = rotPos;
    rotMid = rotPos;
    tiltMid = tilt;
    tiltAim = BASE_TILT;
    // Back to free rotation so the flick plays out; the tour picks up a leg after that.
    phase = "free";
    phaseT = 0;
    startSpin();
  }

  // tilt is threaded through every one of these rather than read from component state:
  // a Svelte reactive statement only re-runs for identifiers it actually mentions, so a
  // tilt read inside a helper would render once and then never update on drag.
  function project(latDeg, lonDeg, spin, tilt) {
    const phi = (latDeg * Math.PI) / 180;
    const lam = ((lonDeg + spin) * Math.PI) / 180;
    const ct = Math.cos((tilt * Math.PI) / 180);
    const st = Math.sin((tilt * Math.PI) / 180);
    const x = Math.cos(phi) * Math.sin(lam);
    const y0 = Math.sin(phi);
    const z0 = Math.cos(phi) * Math.cos(lam);
    const y = y0 * ct - z0 * st;
    const z = y0 * st + z0 * ct;
    return { x: CX + R * x, y: CY - R * y, front: z > 0, z };
  }

  // Bisect along a segment to the point where z crosses 0, i.e. the limb. Without this
  // a ring just stops at its last visible vertex and the fill closes short of the edge.
  function limbPoint(visible, hidden, spin, tilt) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 14; i++) {
      const m = (lo + hi) / 2;
      const lat = visible[0] + (hidden[0] - visible[0]) * m;
      const lon = visible[1] + (hidden[1] - visible[1]) * m;
      if (project(lat, lon, spin, tilt).z > 0) lo = m;
      else hi = m;
    }
    const m = (lo + hi) / 2;
    return project(
      visible[0] + (hidden[0] - visible[0]) * m,
      visible[1] + (hidden[1] - visible[1]) * m,
      spin,
      tilt,
    );
  }

  const fmt = (p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

  // Pin a point radially out to the limb. Orthographic is azimuthal, so this keeps the
  // point's true bearing from the view centre — which is the whole trick below.
  function toRim(p) {
    const dx = p.x - CX;
    const dy = p.y - CY;
    const m = Math.hypot(dx, dy) || 1;
    return { x: CX + (R * dx) / m, y: CY + (R * dy) / m };
  }

  const azim = (p) => Math.atan2(p.y - CY, p.x - CX);

  // Shortest arc along the limb. Safe because callers keep the steps small.
  function arcTo(from, to) {
    let delta = azim(to) - azim(from);
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    if (Math.abs(delta) < 1e-4) return "";
    return `A${R} ${R} 0 0 ${delta > 0 ? 1 : 0} ${fmt(to)} `;
  }

  // Bearing swings fast near the antipode, so bisect a hidden edge until each step is a
  // small arc. Without this the rim walk cuts a chord and a wedge appears over the disc.
  const MAX_STEP = 0.26; // ~15deg
  const MAX_DEPTH = 12;
  function walkHidden(out, a, b, pa, pb, spin, tilt, depth) {
    let delta = azim(pb) - azim(pa);
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    if (Math.abs(delta) <= MAX_STEP || depth === 0) {
      out.push(pb);
      return;
    }
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const pm = project(mid[0], mid[1], spin, tilt);
    walkHidden(out, a, mid, pa, pm, spin, tilt, depth - 1);
    walkHidden(out, mid, b, pm, pb, spin, tilt, depth - 1);
  }

  // A closed ring splits the sphere in two and its coordinates alone do not say which half
  // is land — but the winding order does, and Natural Earth winds every ring the same way.
  // That orientation survives projection, so summing the bearing turned around the disc
  // centre says whether we enclosed the land (+1 turn) or the ocean (-1 turn).
  function winding(proj) {
    let w = 0;
    for (let i = 0; i < proj.length; i++) {
      const a = proj[i];
      const b = proj[(i + 1) % proj.length];
      let d = Math.atan2(b.y - CY, b.x - CX) - Math.atan2(a.y - CY, a.x - CX);
      if (d > Math.PI) d -= 2 * Math.PI;
      else if (d < -Math.PI) d += 2 * Math.PI;
      w += d;
    }
    return w;
  }

  // Overshoots R so its own stroke lands outside the sphere clip and never brightens the rim
  const DISC = `M${CX - R - 3} ${CY}A${R + 3} ${R + 3} 0 1 0 ${CX + R + 3} ${CY}A${R + 3} ${R + 3} 0 1 0 ${CX - R - 3} ${CY}Z`;

  // Filled ring clipped to the visible hemisphere.
  //
  // The hard part is closing a ring that runs round the back. Rather than guess which way
  // to sweep the limb, follow the hidden vertices themselves: pinned to the rim they sit
  // at their real bearings, so they trace the arc the ring genuinely takes. That encloses
  // the land almost always, and the ocean when the far side of the globe is mid-continent
  // — twice a rotation, over southern Africa and over Brazil. Winding catches exactly
  // those, and prepending the whole disc under even-odd flips the fill back.
  function ringPath(coords, spin, tilt) {
    const n = coords.length;
    const proj = coords.map((c) => project(c[0], c[1], spin, tilt));
    // Only a ring straddling the limb can come out inverted. One that is wholly hidden
    // draws nothing — filling the cap would need a landmass covering a whole hemisphere —
    // and one wholly in view is just itself.
    if (proj.every((p) => !p.front)) return "";
    if (proj.every((p) => p.front)) {
      return proj.map((p, i) => `${i ? "L" : "M"}${fmt(p)} `).join("") + "Z";
    }
    const flip = winding(proj) < -Math.PI;

    // Open on a visible vertex so the path always starts on real geometry.
    const offset = proj.findIndex((p) => p.front);
    let d = `M${fmt(proj[offset])} `;
    let prevFront = true;
    let rim = null;

    for (let k = 1; k <= n; k++) {
      const i = (offset + k) % n; // k === n wraps back to the start and closes the ring
      const h = (offset + k - 1) % n;
      const cur = proj[i];

      if (cur.front) {
        if (!prevFront) d += arcTo(rim, limbPoint(coords[i], coords[h], spin, tilt));
        d += `L${fmt(cur)} `;
      } else {
        if (prevFront) {
          rim = limbPoint(coords[h], coords[i], spin, tilt);
          d += `L${fmt(rim)} `;
        }
        const steps = [];
        walkHidden(steps, coords[h], coords[i], proj[h], cur, spin, tilt, MAX_DEPTH);
        for (const s of steps) {
          const next = toRim(s);
          d += arcTo(rim, next);
          rim = next;
        }
      }
      prevFront = cur.front;
    }
    return (flip ? DISC : "") + d + "Z";
  }

  // split a run of points wherever it goes round the back, extending to the limb
  function polyline(coords, spin, tilt) {
    let d = "";
    let pen = false;
    for (let i = 0; i < coords.length; i++) {
      const cur = coords[i];
      const p = project(cur[0], cur[1], spin, tilt);

      if (p.front) {
        if (!pen && i > 0) {
          // entering view: start at the limb rather than mid-air
          const edge = limbPoint(cur, coords[i - 1], spin, tilt);
          d += `M${edge.x.toFixed(1)},${edge.y.toFixed(1)} `;
          pen = true;
          d += `L${p.x.toFixed(1)},${p.y.toFixed(1)} `;
          continue;
        }
        d += `${pen ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)} `;
        pen = true;
      } else {
        if (pen) {
          // leaving view: run out to the limb before lifting the pen
          const edge = limbPoint(coords[i - 1], cur, spin, tilt);
          d += `L${edge.x.toFixed(1)},${edge.y.toFixed(1)} `;
        }
        pen = false;
      }
    }
    return d;
  }

  const meridians = [];
  for (let lon = -180; lon < 180; lon += 30) {
    const line = [];
    for (let lat = -80; lat <= 80; lat += 8) line.push([lat, lon]);
    meridians.push(line);
  }
  const parallels = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const line = [];
    for (let lon = -180; lon <= 180; lon += 8) line.push([lat, lon]);
    parallels.push(line);
  }

  // Counts are savagely long-tailed — the top cell is 67,087 and the median is 15 — so
  // size on log(count). Linear and the Bay Area is a blob while everywhere else vanishes.
  const LEVELS = 5;
  const LEVEL_W = [0.9, 1.4, 2.0, 2.8, 3.8]; // stroke width, i.e. dot diameter
  // Slight brightness lift with density too, so a busy city reads hot rather than merely
  // large. Safe to band here where the depth fade was not: these boundaries follow the
  // data, so they land on city edges instead of drawing a circle across the sphere.
  const LEVEL_O = [0.62, 0.73, 0.84, 0.93, 1];

  // Deliberately no depth fade. Bucketing dots by z drew the bucket boundaries as hard
  // curves across the sphere, and a shared stroke cannot vary per dot. Orthographic
  // already crowds the dots towards the limb, which reads as depth on its own.

  // Bake each cell's rotation-invariant terms once. Spinning is then six multiplies per
  // point instead of four trig calls — at 4k points a frame that is the whole budget.
  $: basis = (() => {
    if (!cells.length) return [];
    const max = Math.log1p(Math.max(...cells.map((c) => c[2])));
    const min = Math.log1p(Math.min(...cells.map((c) => c[2])));
    return cells.map(([lat, lon, count]) => {
      const phi = (lat * Math.PI) / 180;
      const lam = (lon * Math.PI) / 180;
      const cp = Math.cos(phi);
      const t = (Math.log1p(count) - min) / (max - min || 1);
      return {
        a: cp * Math.sin(lam),
        b: cp * Math.cos(lam),
        s: Math.sin(phi),
        lvl: Math.min(LEVELS - 1, Math.floor(t * LEVELS)),
      };
    });
  })();

  // One path per size bucket instead of 4,130 nodes. Round linecaps turn a zero-length
  // segment into a dot, so each cell costs ~16 characters and the browser only sees five
  // elements change per frame.
  function densityLayers(pts, spin, tilt) {
    const cs = Math.cos((spin * Math.PI) / 180);
    const sn = Math.sin((spin * Math.PI) / 180);
    const ct = Math.cos((tilt * Math.PI) / 180);
    const st = Math.sin((tilt * Math.PI) / 180);
    const out = new Array(LEVELS).fill("");
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const z0 = p.b * cs - p.a * sn;
      if (p.s * st + z0 * ct <= 0) continue; // round the back
      const x = p.a * cs + p.b * sn;
      const y = p.s * ct - z0 * st;
      out[p.lvl] += `M${(CX + R * x).toFixed(1)} ${(CY - R * y).toFixed(1)}l.1 0`;
    }
    return out;
  }

  $: land = LAND.map((ring) => ringPath(ring, rot, tilt));
  $: graticule = [...meridians, ...parallels].map((line) => polyline(line, rot, tilt));
  $: layers = densityLayers(basis, rot, tilt);

  onMount(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    idleSpin = reduced.matches ? 0 : BASE_SPIN;
    spin = idleSpin;
    // Starts in "free", so the globe simply turns for a few seconds before the first leg.

    fetch("/activity-density.json")
      .then((r) => r.json())
      .then((d) => (cells = d.cells))
      .catch(() => {}); // globe still reads fine as just land and graticule

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(el);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && idleSpin) startSpin();
        else if (!dragging) stopSpin(); // never cut the loop out from under a drag
      },
      { threshold: 0.1 },
    );
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      resize.disconnect();
      stopSpin();
    };
  });
</script>

<div class="globe" bind:this={el}>
  <!-- Drag is a bonus, not a route to anything: the globe rotates on its own, so every
       region comes around without touching it. Nothing here is keyboard-gated. -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <svg
    viewBox="0 0 {vbw.toFixed(1)} {vbh.toFixed(1)}"
    role="img"
    aria-label="Globe showing comma driving activity worldwide"
    class:dragging
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
    on:pointercancel={onPointerUp}
    on:lostpointercapture={onPointerUp}
  >
    <defs>
      <clipPath id="sphere-clip">
        <circle cx={CX} cy={CY} r={R} />
      </clipPath>
      <radialGradient id="limb" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stop-color="rgba(81,255,0,0)" />
        <stop offset="100%" stop-color="rgba(81,255,0,0.16)" />
      </radialGradient>
    </defs>

    <!-- Zoom is a plain scale about the disc centre, applied after projection, so none of
         the spherical maths above has to know about it. Strokes opt out of scaling (see
         .land/.grat/.density) — magnifying line weights turns a dense city into a blob,
         whereas holding them constant is what lets the structure separate as you close in. -->
    <g transform="translate({ox.toFixed(1)} {oy.toFixed(1)})">
    <g transform="translate({CX} {CY}) scale({zoom}) translate({-CX} {-CY})">
    <circle class="sphere" cx={CX} cy={CY} r={R} />
    <circle cx={CX} cy={CY} r={R} fill="url(#limb)" />

    <g clip-path="url(#sphere-clip)">
      {#each land as d}
        <path class="land" {d} />
      {/each}
    </g>

    {#each graticule as d}
      <path class="grat" {d} />
    {/each}

    {#each layers as d, i}
      {#if d}
        <path class="density" {d} stroke-width={LEVEL_W[i]} stroke-opacity={LEVEL_O[i]} />
      {/if}
    {/each}

    <circle class="rim" cx={CX} cy={CY} r={R} />
    </g>
    </g>
  </svg>

  <!-- aria-hidden: the place name is a caption on decorative motion, and reading it out as
       it cycles would be noise. The globe's own aria-label carries the meaning. -->
  <p class="place" class:on={labelOn} aria-hidden="true">{place ? place.name : ""}</p>
</div>

<style>
  .globe {
    /* Fills the parent's width so a zoomed-in view has room, while the sphere itself stays
       at SPHERE_MAX px. Height matches the old square footprint so the section keeps its
       height, and tracks viewport width on narrow screens so it is not left tall and empty. */
    height: min(48rem, 92vw);
    margin: 0 auto;
    max-width: 100%;
    /* sits above the page's dot-grid backdrop */
    position: relative;
    width: 100%;
    z-index: 1;
  }

  svg {
    cursor: grab;
    display: block;
    height: 100%;
    inset: 0;
    position: absolute;
    /* clips, not visible: the zoomed sphere runs past the viewBox and would otherwise
       paint over the rest of the page */
    overflow: hidden;
    /* pan-y, not none: a vertical swipe still scrolls the page on touch */
    touch-action: pan-y;
    user-select: none;
    width: 100%;
  }

  svg.dragging {
    cursor: grabbing;
  }

  .sphere {
    fill: #0a0a0a;
  }

  .rim {
    fill: none;
    stroke: rgba(255, 255, 255, 0.22);
    stroke-width: 1;
  }

  /* even-odd, not nonzero: an inverted ring is flipped by prepending the whole disc, and
     even-odd flips the fill regardless of which way either subpath is wound */
  .land {
    fill: rgba(255, 255, 255, 0.11);
    fill-rule: evenodd;
    stroke: rgba(255, 255, 255, 0.4);
    stroke-linejoin: round;
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  /* over the land, so the grid still reads as a sphere */
  .grat {
    fill: none;
    stroke: rgba(255, 255, 255, 0.1);
    stroke-width: 0.7;
    vector-effect: non-scaling-stroke;
  }

  /* the density field: zero-length segments with round caps, so each cell is one dot */
  .density {
    fill: none;
    stroke: var(--color-accent);
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  .place {
    bottom: 4%;
    color: rgba(255, 255, 255, 0.92);
    font-family: JetBrains Mono, monospace;
    font-size: 0.9rem;
    left: 50%;
    margin: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.85);
    transform: translateX(-50%);
    transition: opacity 0.7s ease;
    white-space: nowrap;
  }

  .place.on {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .place {
      transition: none;
    }
  }

</style>
