<script>
  import { onMount } from "svelte";
  import { LAND } from "$lib/constants/land.js";

  // Orthographic projection by hand — no three.js, no WebGL, no WebGPU. A sphere spun
  // about its axis is ~15 lines of trig, and everything below is plain SVG.

  const R = 132;
  const CX = 150;
  const CY = 150;
  const TILT = (18 * Math.PI) / 180;
  const COS_T = Math.cos(TILT);
  const SIN_T = Math.sin(TILT);

  // Real fleet activity — route start and end points over 90 days, binned to a 0.25deg
  // grid and cut at 100 endpoints per cell. 4,130 cells, 97% of all driving. Fetched
  // rather than imported so its 88KB stays off the critical path: land and graticule
  // render immediately and the density arrives after. The cut also drops single-drive
  // cells, which matters — route endpoints are where people park.
  let cells = [];

  let rot = 0;
  let el;

  function project(latDeg, lonDeg, spin) {
    const phi = (latDeg * Math.PI) / 180;
    const lam = ((lonDeg + spin) * Math.PI) / 180;
    const x = Math.cos(phi) * Math.sin(lam);
    const y0 = Math.sin(phi);
    const z0 = Math.cos(phi) * Math.cos(lam);
    const y = y0 * Math.cos(TILT) - z0 * Math.sin(TILT);
    const z = y0 * Math.sin(TILT) + z0 * Math.cos(TILT);
    return { x: CX + R * x, y: CY - R * y, front: z > 0, z };
  }

  // Bisect along a segment to the point where z crosses 0, i.e. the limb. Without this
  // a ring just stops at its last visible vertex and the fill closes short of the edge.
  function limbPoint(visible, hidden, spin) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 14; i++) {
      const m = (lo + hi) / 2;
      const lat = visible[0] + (hidden[0] - visible[0]) * m;
      const lon = visible[1] + (hidden[1] - visible[1]) * m;
      if (project(lat, lon, spin).z > 0) lo = m;
      else hi = m;
    }
    const m = (lo + hi) / 2;
    return project(
      visible[0] + (hidden[0] - visible[0]) * m,
      visible[1] + (hidden[1] - visible[1]) * m,
      spin,
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
  function walkHidden(out, a, b, pa, pb, spin, depth) {
    let delta = azim(pb) - azim(pa);
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    if (Math.abs(delta) <= MAX_STEP || depth === 0) {
      out.push(pb);
      return;
    }
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const pm = project(mid[0], mid[1], spin);
    walkHidden(out, a, mid, pa, pm, spin, depth - 1);
    walkHidden(out, mid, b, pm, pb, spin, depth - 1);
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
  function ringPath(coords, spin) {
    const n = coords.length;
    const proj = coords.map((c) => project(c[0], c[1], spin));
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
        if (!prevFront) d += arcTo(rim, limbPoint(coords[i], coords[h], spin));
        d += `L${fmt(cur)} `;
      } else {
        if (prevFront) {
          rim = limbPoint(coords[h], coords[i], spin);
          d += `L${fmt(rim)} `;
        }
        const steps = [];
        walkHidden(steps, coords[h], coords[i], proj[h], cur, spin, MAX_DEPTH);
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
  function polyline(coords, spin) {
    let d = "";
    let pen = false;
    for (let i = 0; i < coords.length; i++) {
      const cur = coords[i];
      const p = project(cur[0], cur[1], spin);

      if (p.front) {
        if (!pen && i > 0) {
          // entering view: start at the limb rather than mid-air
          const edge = limbPoint(cur, coords[i - 1], spin);
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
          const edge = limbPoint(coords[i - 1], cur, spin);
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
  function densityLayers(pts, spin) {
    const cs = Math.cos((spin * Math.PI) / 180);
    const sn = Math.sin((spin * Math.PI) / 180);
    const out = new Array(LEVELS).fill("");
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const z0 = p.b * cs - p.a * sn;
      if (p.s * SIN_T + z0 * COS_T <= 0) continue; // round the back
      const x = p.a * cs + p.b * sn;
      const y = p.s * COS_T - z0 * SIN_T;
      out[p.lvl] += `M${(CX + R * x).toFixed(1)} ${(CY - R * y).toFixed(1)}l.1 0`;
    }
    return out;
  }

  $: land = LAND.map((ring) => ringPath(ring, rot));
  $: graticule = [...meridians, ...parallels].map((line) => polyline(line, rot));
  $: layers = densityLayers(basis, rot);

  onMount(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf;
    let last = 0;

    fetch("/activity-density.json")
      .then((r) => r.json())
      .then((d) => (cells = d.cells))
      .catch(() => {}); // globe still reads fine as just land and graticule

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 33) return; // ~30fps is plenty for a slow spin
      last = now;
      rot = (rot + 0.24) % 360;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced.matches) {
          if (!raf) raf = requestAnimationFrame(frame);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.1 },
    );
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  });
</script>

<div class="globe" bind:this={el}>
  <svg viewBox="0 0 300 300" role="img" aria-label="Globe showing comma driving activity worldwide">
    <defs>
      <clipPath id="sphere-clip">
        <circle cx={CX} cy={CY} r={R} />
      </clipPath>
      <radialGradient id="limb" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stop-color="rgba(81,255,0,0)" />
        <stop offset="100%" stop-color="rgba(81,255,0,0.16)" />
      </radialGradient>
    </defs>

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
  </svg>
</div>

<style>
  .globe {
    margin: 0 auto;
    max-width: 48rem;
    /* sits above the page's dot-grid backdrop */
    position: relative;
    width: 100%;
    z-index: 1;
  }

  svg {
    display: block;
    height: auto;
    overflow: visible;
    width: 100%;
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
  }

  /* over the land, so the grid still reads as a sphere */
  .grat {
    fill: none;
    stroke: rgba(255, 255, 255, 0.1);
    stroke-width: 0.7;
  }

  /* the density field: zero-length segments with round caps, so each cell is one dot */
  .density {
    fill: none;
    stroke: var(--color-accent);
    stroke-linecap: round;
  }

</style>
