// Share images (og:image / twitter:image) rendered by scripts/og/render.js into static/og/.
//
// Each card is one 1200x630 JPEG: a photo from the repo on white, then the page label, a
// rule and the COMMA wordmark along the bottom (the style of static/og-comma-four.png).
//
// `file` is the published name. Files are never overwritten (social platforms and chat apps
// cache share images by URL), so to change a card's content, bump its version in `file`
// (comma-four-v1.jpg -> comma-four-v2.jpg), re-run `bun run og`, and update the path in
// src/lib/seo/share-images.js. Delete the old file once nothing points at it.
//
// Layouts:
//   product  photo trimmed to its subject and fitted on white above the label
//   photo    photo fills the top of the card (cropped to cover; `position` = object-position)
//   duo      two product photos side by side
//   mark     the comma mark, for pages without a product of their own
//   exact    photo placed with `style` (absolute CSS), for hand-tuned crops
//
// Photo paths are relative to the repo root.

const products = 'src/lib/images/products';

export const cards = [
  {
    file: 'home-v1.jpg',
    label: 'make driving chill',
    layout: 'exact',
    photo: `${products}/comma-four/four_screen_on.png`,
    // same crop as static/og-comma-four.png
    style: 'left: -12px; top: -362px; width: 1223px;',
  },
  {
    file: 'comma-four-v1.jpg',
    label: 'comma four',
    layout: 'exact',
    photo: `${products}/comma-four/four_screen_on.png`,
    style: 'left: -12px; top: -362px; width: 1223px;',
  },
  {
    file: 'shop-v1.jpg',
    label: 'comma shop',
    layout: 'duo',
    photos: [
      `${products}/comma-four/four_screen_on.png`,
      `${products}/chestnut/bnut_34.png`,
    ],
  },
  {
    file: 'comma-four-trade-in-v1.jpg',
    label: 'comma four trade-in',
    layout: 'duo',
    photos: [
      `${products}/comma-3x/comma-3x.jpg`,
      `${products}/comma-four/four_screen_on.png`,
    ],
  },
  {
    file: 'chestnut-v1.jpg',
    label: 'chestnut',
    layout: 'product',
    photo: `${products}/chestnut/bnut_34.png`,
  },
  {
    file: 'car-harness-v1.jpg',
    label: 'car harness',
    layout: 'product',
    photo: `${products}/car-harness/car-harness.jpg`,
  },
  {
    file: 'red-panda-v1.jpg',
    label: 'red panda',
    layout: 'product',
    photo: `${products}/panda/red-panda.jpg`,
  },
  {
    file: 'panda-jungle-v1.jpg',
    label: 'panda jungle v2',
    layout: 'product',
    photo: `${products}/panda-jungle/panda-jungle-v2.jpeg`,
  },
  {
    file: 'comma-power-v1.jpg',
    label: 'comma power',
    layout: 'product',
    photo: `${products}/comma-power/comma-power.jpg`,
  },
  {
    file: 'comma-power-extender-v1.jpg',
    label: 'comma power extender',
    layout: 'product',
    photo: `${products}/comma-power-extender/POWER-EXTENDER.jpg`,
  },
  {
    file: 'comma-prime-sim-v1.jpg',
    label: 'comma prime SIM',
    layout: 'product',
    photo: `${products}/comma-prime-sim/comma-prime-sim.jpg`,
  },
  {
    file: 'obd-c-cable-v1.jpg',
    label: 'OBD-C cable',
    layout: 'product',
    photo: `${products}/obd-c-cable/obd-c-cable-four.png`,
  },
  {
    file: 'harness-connector-v1.jpg',
    label: 'harness connector',
    layout: 'product',
    photo: `${products}/harness-connector/harness-connector.jpg`,
  },
  {
    file: 'harness-box-v1.jpg',
    label: 'harness box',
    layout: 'product',
    photo: `${products}/harness-box/harness-box.jpg`,
  },
  {
    file: 'replacement-mounts-v1.jpg',
    label: 'replacement mounts',
    layout: 'product',
    photo: `${products}/replacement-mounts/replacement-mounts-four.png`,
  },
  {
    file: 'comma-device-screen-v1.jpg',
    label: 'comma device screen',
    layout: 'product',
    photo: `${products}/comma-three-device-screen/comma-three-device-screen.jpg`,
  },
  {
    file: 'comma-hoodie-v1.jpg',
    label: 'comma hoodie',
    layout: 'photo',
    photo: `${products}/comma-ai-hoodie/comma-hoodie-back.jpeg`,
    position: '50% 35%',
  },
  {
    file: 'comma-beanie-v1.jpg',
    label: 'comma beanie',
    layout: 'product',
    photo: `${products}/comma-ai-beanie/comma-beanie.jpg`,
  },
  {
    file: 'comma-t-shirt-v1.jpg',
    label: 'comma t-shirt',
    layout: 'photo',
    photo: `${products}/comma-ai-t-shirt/comma-t-shirt-pose.jpeg`,
    position: '50% 10%',
  },
  {
    file: 'comma-body-v1.jpg',
    label: 'comma body',
    layout: 'product',
    photo: `${products}/body/comma-body.jpg`,
  },
  {
    file: 'openpilot-v1.jpg',
    label: 'openpilot',
    layout: 'photo',
    photo: `${products}/comma-four/windshield43.png`,
    position: '50% 45%',
  },
  {
    file: 'connect-v1.jpg',
    label: 'comma connect',
    layout: 'product',
    photo: 'src/lib/images/connect-app.png',
    trim: false,
  },
  {
    file: 'vehicles-v1.jpg',
    label: 'vehicle compatibility',
    layout: 'photo',
    photo: 'src/lib/images/vehicles/cover-vehicles-v2-3x-optimized_1.jpg',
    position: '50% 50%',
  },
  {
    file: 'setup-v1.jpg',
    label: 'setup guide',
    layout: 'photo',
    photo: 'src/lib/images/setup/comma-four/mount.jpg',
    position: '50% 50%',
  },
  {
    file: 'jobs-v1.jpg',
    label: 'jobs',
    layout: 'photo',
    photo: 'src/lib/images/manufacturing/factory-4.png',
    position: '50% 50%',
  },
  {
    file: 'media-v1.jpg',
    label: 'press & media kit',
    layout: 'photo',
    photo: 'src/lib/images/manufacturing/factory-1.png',
    position: '50% 55%',
  },
  {
    file: 'terms-v1.jpg',
    label: 'terms & privacy',
    layout: 'mark',
  },
  {
    file: 'support-v1.jpg',
    label: 'comma support',
    layout: 'product',
    photo: `${products}/comma-four/four_angled.png`,
  },
  {
    file: 'comma-prime-v1.jpg',
    label: 'comma prime',
    layout: 'product',
    photo: `${products}/comma-prime/comma-prime.png`,
  },
  {
    file: 'comma-3x-v1.jpg',
    label: 'comma 3X',
    layout: 'product',
    photo: `${products}/comma-3x/comma-3x.jpg`,
  },
  {
    file: 'comma-three-v1.jpg',
    label: 'comma three',
    layout: 'product',
    photo: `${products}/comma-three/comma-three.jpg`,
  },
  {
    file: 'leaderboard-v1.jpg',
    label: 'leaderboard',
    layout: 'mark',
  },
  {
    file: 'neurips-v1.jpg',
    label: 'NeurIPS event',
    layout: 'mark',
  },
  {
    file: 'harness-parts-v1.jpg',
    label: 'harness parts',
    layout: 'product',
    photo: `${products}/harness-box/harness-box.jpg`,
  },
];
