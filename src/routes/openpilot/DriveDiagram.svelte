<script>
  import { onMount } from "svelte";
  import { playInView, reducedMotion } from "$lib/utils/media.js";

  // the steering wheel icon from openpilot's comma four UI
  // (openpilot/selfdrive/assets/icons_mici/wheel.png in commaai/openpilot)
  import WheelIcon from "$lib/icons/openpilot/wheel.png?format=png&as=url";

  // a real openpilot drive with its logs: road camera video, plus the driving
  // model's outputs and the car's speed for every frame (see the commit for the route)
  import DriveVideo from "$lib/videos/openpilot/drive-ramp.mp4";
  import DrivePoster from "$lib/videos/openpilot/drive-ramp.jpg?format=jpg&as=url";
  import drive from "$lib/videos/openpilot/drive-ramp.json";

  // stacked: one column at every width, for the side of a split layout
  export let stacked = false;

  // the outputs follow the video frame by frame, interpolated between logged frames
  let driveVideo;
  let frame = 0;
  let rafId = null;

  function sample(values, position) {
    const count = values.length;
    const i = Math.floor(position) % count;
    const next = (i + 1) % count;
    const t = position - Math.floor(position);
    return values[i] + (values[next] - values[i]) * t;
  }

  function followVideo() {
    if (driveVideo) {
      frame = driveVideo.currentTime * drive.fps;
    }
    rafId = requestAnimationFrame(followVideo);
  }

  function startFollowing() {
    if (rafId === null) {
      rafId = requestAnimationFrame(followVideo);
    }
  }

  function stopFollowing() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (driveVideo) {
      frame = driveVideo.currentTime * drive.fps;
    }
  }

  onMount(() => stopFollowing);

  $: steer = sample(drive.steer, frame);
  $: accel = sample(drive.accel, frame);
  $: mph = sample(drive.mph, frame);
  $: steerText = Math.abs(steer) < 0.5 ? "straight" : `${Math.abs(steer).toFixed(0)}° ${steer > 0 ? "right" : "left"}`;
  $: accelText = `${accel >= 0 ? "+" : "−"}${Math.abs(accel).toFixed(1)} m/s²`;
  $: accelWidth = Math.min(Math.abs(accel) / 1.5, 1) * 50;
</script>

<figure class="e2e" class:stacked>
  <div class="label label-in">
    <span class="word">end</span>
    <span class="sub">Video in</span>
  </div>
  <div class="cell cell-in">
    <video
      bind:this={driveVideo}
      src={DriveVideo}
      poster={DrivePoster}
      use:playInView={$reducedMotion}
      on:play={startFollowing}
      on:pause={stopFollowing}
      on:seeked={stopFollowing}
      muted
      loop
      playsinline
      preload="none"
      aria-label="Road camera video from openpilot driving a freeway exit ramp"
    ></video>
  </div>
  <span class="arrow arrow-1" aria-hidden="true"></span>
  <div class="label label-model">
    <span class="word">to</span>
    <span class="sub">One neural network</span>
  </div>
  <div class="cell cell-model">
    {#if stacked}
      <div class="model">openpilot's end-to-end driving model</div>
    {:else}
      <div class="model">openpilot's<br />end-to-end<br />driving model</div>
    {/if}
  </div>
  <span class="arrow arrow-2" aria-hidden="true"></span>
  <div class="label label-out">
    <span class="word">end</span>
    <span class="sub">Driving actions out</span>
  </div>
  <div class="cell cell-out">
    <dl class="outputs">
      <div class="output">
        <span class="wheel" style="--wheel: url({WheelIcon}); transform: rotate({steer}deg)" aria-hidden="true"></span>
        <div>
          <dt>Curvature</dt>
          <dd>where to steer</dd>
          <dd class="value">{steerText}</dd>
        </div>
      </div>
      <div class="output">
        <div class="accel" aria-hidden="true">
          <span class="track"></span>
          <span class="fill" class:braking={accel < 0} style="width: {accelWidth}%"></span>
          <span class="zero"></span>
        </div>
        <div>
          <dt>Acceleration</dt>
          <dd>how fast to go</dd>
          <dd class="value">{accelText}</dd>
        </div>
      </div>
    </dl>
    <p class="speed"><span>{mph.toFixed(0)}</span> mph</p>
  </div>
  <figcaption>
    A real openpilot drive in a Ford Bronco Sport, at real speed. The wheel and the bar are
    the driving model's own output for each video frame (curvature is drawn as a steering wheel angle); the speed is the car's.
  </figcaption>
</figure>

<style>
  .e2e {
    display: grid;
    grid-template-columns: minmax(0, 2.3fr) 3.5rem minmax(0, 0.75fr) 3.5rem minmax(0, 0.95fr);
    grid-template-rows: auto auto auto;
    align-items: center;
    row-gap: 1.5rem;
    width: min(100vw - 4rem, 96rem);
    margin: 6rem 0 0 50%;
    transform: translateX(-50%);
    text-align: left;

    & .label {
      grid-row: 1;
      align-self: end;
    }

    & .cell {
      grid-row: 2;
      min-width: 0;
    }

    & .arrow {
      grid-row: 2;
    }

    & .label-in,
    & .cell-in {
      grid-column: 1;
    }

    & .arrow-1 {
      grid-column: 2;
    }

    & .label-model,
    & .cell-model {
      grid-column: 3;
    }

    & .arrow-2 {
      grid-column: 4;
    }

    & .label-out,
    & .cell-out {
      grid-column: 5;
    }

    & figcaption {
      grid-row: 3;
      grid-column: 1 / -1;
      max-width: 52rem;
      margin: 1.5rem auto 0;
      text-align: center;
      color: #8a8a8a;
      font-size: 0.95rem;
      line-height: 1.55;
      text-wrap: pretty;
    }
  }

  .label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & .word {
      font-size: clamp(3rem, 7vw, 6.5rem);
      font-weight: 700;
      letter-spacing: -0.05em;
      line-height: 0.9;
    }

    & .sub {
      text-transform: uppercase;
      color: #9e9e9e;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.12em;
    }
  }

  .label-model {
    align-items: center;
    text-align: center;

    & .word {
      color: var(--color-accent);
    }
  }

  .cell-in video {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 8 / 3;
    background-color: #151515;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }

  .model {
    padding: 2.5rem 1rem;
    border: 1px solid var(--color-accent);
    border-radius: 0.25rem;
    box-shadow: 0 0 3rem #51ff0022;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;
  }

  .arrow {
    position: relative;
    justify-self: center;
    width: 2.75rem;
    height: 1px;
    background-color: var(--color-accent);

    &::after {
      content: "";
      position: absolute;
      right: -1px;
      top: -4px;
      width: 8px;
      height: 8px;
      border-top: 1px solid var(--color-accent);
      border-right: 1px solid var(--color-accent);
      transform: rotate(45deg);
    }
  }

  .outputs {
    margin: 0;
    border-top: 1px solid #333;
  }

  .output {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 1rem 0;
    border-bottom: 1px solid #333;

    & dt {
      font-size: 1.25rem;
      font-weight: 600;
    }

    & dd {
      margin: 0.15rem 0 0;
      color: #9e9e9e;
      font-size: 0.95rem;
    }

    & dd.value {
      margin-top: 0.4rem;
      color: #fff;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
    }
  }

  /* drawn the way the comma four UI draws it: the white icon, tinted green while engaged */
  .wheel {
    flex: none;
    width: 4.5rem;
    height: 4.5rem;
    background-color: var(--color-accent);
    mask-image: var(--wheel);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }

  .accel {
    position: relative;
    flex: none;
    width: 4.5rem;
    height: 4.5rem;

    & .track {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(50% - 0.4rem);
      height: 0.8rem;
      background-color: #222;
      border-radius: 0.4rem;
    }

    & .fill {
      position: absolute;
      left: 50%;
      top: calc(50% - 0.4rem);
      height: 0.8rem;
      background-color: var(--color-accent);
      border-radius: 0 0.4rem 0.4rem 0;
    }

    & .fill.braking {
      left: auto;
      right: 50%;
      background-color: #fff;
      border-radius: 0.4rem 0 0 0.4rem;
    }

    & .zero {
      position: absolute;
      left: calc(50% - 1px);
      top: calc(50% - 1rem);
      width: 2px;
      height: 2rem;
      background-color: #666;
    }
  }

  .speed {
    margin: 1rem 0 0;
    color: #9e9e9e;
    font-family: var(--font-mono);
    font-size: 0.95rem;
    letter-spacing: 0;

    & span {
      color: #fff;
      font-family: var(--font-sans);
      font-size: 2rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.03em;
    }
  }

  /* stacked, for a split layout: video on top, then the model, then the outputs in a row */

  .e2e.stacked {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: none;
    row-gap: 0.75rem;
    width: auto;
    margin: 0;
    transform: none;

    & .label,
    & .cell,
    & .arrow,
    & figcaption {
      grid-row: auto;
      grid-column: 1;
    }

    & .label {
      flex-direction: row;
      align-items: baseline;
      gap: 0.75rem;
    }

    & .label .word {
      font-size: 2.25rem;
    }

    & .label-model {
      justify-content: flex-start;
      text-align: left;
    }

    & .label-model,
    & .label-out {
      margin-top: 0.25rem;
    }

    & .arrow {
      display: none;
    }

    & .model {
      padding: 1rem;
    }

    & .cell-out {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    & .outputs {
      display: flex;
      flex: 1;
      gap: 1.5rem;
      border-top: 0;
    }

    & .output {
      flex: 1;
      gap: 0.9rem;
      padding: 0;
      border-bottom: 0;
    }

    & .output dt {
      font-size: 1.05rem;
    }

    & .wheel,
    & .accel {
      width: 3.25rem;
      height: 3.25rem;
    }

    & .speed {
      flex: none;
      margin: 0;
    }

    & figcaption {
      max-width: none;
      margin: 0.75rem 0 0;
      text-align: left;
      font-size: 0.85rem;
    }
  }

  @media (max-width: 1024px) {
    .e2e {
      grid-template-columns: minmax(0, 1.5fr) 3rem minmax(0, 0.9fr) 3rem minmax(0, 1.1fr);
    }

    .model {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .e2e {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: none;
      row-gap: 1rem;
      max-width: 30rem;
      margin-top: 3.5rem;
    }

    .e2e .label,
    .e2e .cell,
    .e2e .arrow,
    .e2e figcaption {
      grid-row: auto;
      grid-column: 1;
    }

    .e2e figcaption {
      margin-top: 1rem;
    }

    .label {
      align-items: center;
      text-align: center;
    }

    .label .word {
      font-size: 3.5rem;
    }

    .label-model,
    .label-out {
      margin-top: 0.5rem;
    }

    .arrow {
      width: 1px;
      height: 2.5rem;
      margin: 0.5rem 0;
    }

    .arrow::after {
      left: -4px;
      right: auto;
      top: auto;
      bottom: -1px;
      transform: rotate(135deg);
    }

    .model {
      padding: 1.75rem 1rem;
    }

    .outputs {
      max-width: 20rem;
      margin: 0 auto;
    }

    .speed {
      text-align: center;
    }

    .e2e.stacked .cell-out {
      flex-direction: column;
      align-items: stretch;
    }

    .e2e.stacked .outputs {
      max-width: none;
      margin: 0;
    }

    .e2e.stacked .speed {
      text-align: left;
    }
  }
</style>
