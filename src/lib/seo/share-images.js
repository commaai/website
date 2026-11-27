// Share image (og:image / twitter:image) for each page, keyed by path like src/lib/seo/pages.js.
// The JPEGs live in static/og/ and are made by scripts/og/render.js (`bun run og`) from
// scripts/og/cards.js. Entries in pages.js still win over these.
//
// File names are versioned and never reused: to change an image, add a new version in
// cards.js, render it, and point the entry here at the new file.

const card = (image, imageAlt) => ({ image: `/og/${image}`, imageAlt });

const cards = {
  home: card('home-v1.jpg', 'comma four, front view with openpilot on the screen'),
  commaFour: card('comma-four-v1.jpg', 'comma four, front view with openpilot on the screen'),
  shop: card('shop-v1.jpg', 'comma four and chestnut'),
  tradeIn: card('comma-four-trade-in-v1.jpg', 'comma 3X next to comma four'),
  chestnut: card('chestnut-v1.jpg', 'chestnut'),
  carHarness: card('car-harness-v1.jpg', 'car harness'),
  redPanda: card('red-panda-v1.jpg', 'red panda'),
  pandaJungle: card('panda-jungle-v1.jpg', 'panda jungle v2 board'),
  commaPower: card('comma-power-v1.jpg', 'comma power cable'),
  powerExtender: card('comma-power-extender-v1.jpg', 'comma power extender cable'),
  primeSim: card('comma-prime-sim-v1.jpg', 'comma prime SIM card'),
  obdcCable: card('obd-c-cable-v1.jpg', 'OBD-C cable'),
  harnessConnector: card('harness-connector-v1.jpg', 'harness connector'),
  harnessBox: card('harness-box-v1.jpg', 'harness box'),
  mounts: card('replacement-mounts-v1.jpg', 'two comma four replacement mounts'),
  deviceScreen: card('comma-device-screen-v1.jpg', 'comma device screen'),
  hoodie: card('comma-hoodie-v1.jpg', 'back of the comma hoodie'),
  beanie: card('comma-beanie-v1.jpg', 'comma beanie'),
  tShirt: card('comma-t-shirt-v1.jpg', 'comma t-shirt'),
  body: card('comma-body-v1.jpg', 'comma body'),
  openpilot: card('openpilot-v1.jpg', 'comma four mounted on a windshield, running openpilot'),
  connect: card('connect-v1.jpg', 'comma connect on desktop and phone'),
  vehicles: card('vehicles-v1.jpg', 'comma device on a car windshield, on a coastal road'),
  setup: card('setup-v1.jpg', 'putting the mount on comma four'),
  jobs: card('jobs-v1.jpg', 'comma four devices on the test rack in the comma factory'),
  media: card('media-v1.jpg', 'the comma factory'),
  terms: card('terms-v1.jpg', 'the comma logo'),
  support: card('support-v1.jpg', 'comma four'),
  prime: card('comma-prime-v1.jpg', 'the comma prime icon'),
  comma3x: card('comma-3x-v1.jpg', 'comma 3X'),
  commaThree: card('comma-three-v1.jpg', 'comma three'),

  // hand-written static/*.html pages: their og/twitter tags are written in those files
  // (harness-parts in templates/harness-parts_template.html); listed here so render.js checks them
  leaderboard: card('leaderboard-v1.jpg', 'the comma logo'),
  neurips: card('neurips-v1.jpg', 'the comma logo'),
  harnessParts: card('harness-parts-v1.jpg', 'harness box'),
};

export const shareImages = {
  '/': cards.home,
  '/connect': cards.connect,
  '/jobs': cards.jobs,
  '/media': cards.media,
  '/openpilot': cards.openpilot,
  '/setup': cards.setup,
  '/terms': cards.terms,
  '/vehicles': cards.vehicles,

  '/shop': cards.shop,
  '/shop/body': cards.body,
  '/shop/car-harness': cards.carHarness,
  '/shop/chestnut': cards.chestnut,
  '/shop/comma-ai-beanie': cards.beanie,
  '/shop/comma-ai-hoodie': cards.hoodie,
  '/shop/comma-ai-t-shirt': cards.tShirt,
  '/shop/comma-device-screen': cards.deviceScreen,
  '/shop/comma-four': cards.commaFour,
  '/shop/comma-four-trade-in': cards.tradeIn,
  '/shop/comma-power': cards.commaPower,
  '/shop/comma-power-extender': cards.powerExtender,
  '/shop/comma-prime-sim': cards.primeSim,
  '/shop/harness-box': cards.harnessBox,
  '/shop/harness-connector': cards.harnessConnector,
  '/shop/obd-c-cable': cards.obdcCable,
  '/shop/panda-jungle': cards.pandaJungle,
  '/shop/red-panda': cards.redPanda,
  '/shop/replacement-mounts': cards.mounts,

  '/support': cards.support,
  '/support/activate-prime': cards.prime,
  '/support/cancel-prime': cards.prime,
  '/support/car-harness': cards.carHarness,
  '/support/chestnut': cards.chestnut,
  '/support/comma-3x': cards.comma3x,
  '/support/comma-body': cards.body,
  '/support/comma-four': cards.commaFour,
  '/support/comma-four-common-issues': cards.commaFour,
  '/support/comma-panda': cards.redPanda,
  '/support/comma-power': cards.commaPower,
  '/support/comma-prime': cards.prime,
  '/support/comma-three': cards.commaThree,
  '/support/prime-common-issues': cards.prime,
  '/support/replace-comma-3x-sim-card': cards.comma3x,
  '/support/switch-prime-plans': cards.prime,
  '/support/vehicle-compatibility': cards.vehicles,
  '/support/what-is-comma-connect': cards.connect,
  '/support/what-is-comma-prime': cards.prime,
};

// support articles not listed above get the support card
export function shareImageFor(path) {
  const key = path.replace(/\/+$/, '') || '/';
  return shareImages[key] ?? (key.startsWith('/support/') ? cards.support : undefined);
}

// every file referenced here, for scripts/og/render.js to check
export function shareImageFiles() {
  return [...new Set(Object.values(cards).map(entry => entry.image))];
}
