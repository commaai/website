// Per-page overrides for <Seo> (src/lib/components/Seo.svelte), keyed by path
// ("/", "/shop/comma-four", "/support/warranty"; no trailing slash).
//
// Precedence: route props are the defaults, and an entry here WINS for every field it sets.
// Fields not set here fall back to what the route passes to <Seo>, then to DEFAULT_IMAGE
// (src/lib/seo/site.js) for the image. That lets titles, descriptions and share images be
// changed for any page, including generated ones (shop products, support articles), without
// touching route files.
//
// Fields (all optional):
//   title        full <title>, also used for og:title / twitter:title
//   description  meta description, also og:description / twitter:description
//   image        share image: a path in static/ (e.g. "/og/comma-four.jpg", 1200x630 JPEG) or a full URL
//   imageAlt     alt text for the share image
//   imageWidth   defaults to 1200
//   imageHeight  defaults to 630
//   noindex      true adds <meta name="robots" content="noindex">, drops the canonical and
//                removes the page from sitemap.xml
//
// Share images: src/lib/seo/share-images.js holds each page's image; an image set here wins.

import { shareImageFor } from './share-images.js';

export const pages = {
  // shop products (rendered by shop/[product], shop/comma-four, shop/body)
  // description comes from shop/comma-four (it carries the live vehicle count)
  '/shop/comma-four': {
    title: 'comma four: hands free driving for your car — comma shop',
  },
  '/shop/body': {
    title: 'comma body: robotics dev kit for openpilot — comma shop',
    description: 'The comma body is a human scale robotics dev kit that can run openpilot, open source software with over a million hours of usage in the field.',
  },
  '/shop/car-harness': {
    title: 'car harness: connect comma four to your car — comma shop',
    description: 'The car harness is our universal interface to your car, with a stealth install. Each car has its own harness, and one is free with comma four.',
  },
  '/shop/red-panda': {
    title: 'red panda: universal CAN FD car interface — comma shop',
    description: 'The red panda is a universal car interface with CAN FD on all 3 buses and a 4x faster CPU. Needed with comma three on CAN FD cars, not with comma four.',
  },
  '/shop/panda-jungle': {
    title: 'panda jungle v2: debug board for comma devices — comma shop',
    description: 'Plug up to 6 comma devices or pandas in at once and start all their ignitions with one switch. Great for comma device development and debugging.',
  },
  '/shop/comma-power': {
    title: 'comma power: OBD-II power for your comma — comma shop',
    description: 'comma power uses your car\'s OBD-II port to power your car harness, so your comma device stays online while the car is off. Included with the car harness.',
  },
  '/shop/comma-power-extender': {
    title: 'comma power extender: a longer power cable — comma shop',
    description: 'The comma power extender extends the cable range of your comma power, the cable that connects your car harness to your car\'s OBD-II port.',
  },
  '/shop/comma-prime-sim': {
    title: 'comma prime SIM: replacement SIM card — comma shop',
    description: 'A replacement comma prime SIM card for comma three and comma 3X, with a guide to swapping it. For US customers only; requires a comma prime subscription.',
  },
  '/shop/obd-c-cable': {
    title: 'OBD-C cable: standard and 9.5 ft long — comma shop',
    description: 'The OBD-C cable is the standard cable for connecting your comma device to your car. Also comes as the 9.5 ft comma long for some car harness kits.',
  },
  '/shop/harness-connector': {
    title: 'harness connector for a second car — comma shop',
    description: 'Swap the connector in your existing car harness to use it in another car, like moving from a Toyota to a Honda. Does not include the harness box.',
  },
  '/shop/harness-box': {
    title: 'harness box for the comma car harness — comma shop',
    description: 'The harness box is the part of the car harness that your OBD-C cable plugs into. It comes with every car harness, and is sold here on its own.',
  },
  '/shop/replacement-mounts': {
    title: 'replacement mounts for comma four and comma 3X — comma shop',
    description: 'Windshield mounts with adhesive backing and an alcohol wipe. comma four mounts fit every car openpilot supports; comma 3X also has an 8° mount.',
  },
  '/shop/comma-device-screen': {
    title: 'comma three and comma 3X replacement screen — comma shop',
    description: 'A replacement display for comma three and comma 3X: screen only, without the front case. Final sale; open and repair your device at your own risk.',
  },
  '/shop/comma-ai-hoodie': {
    title: 'comma hoodie: black mid-weight hoodie — comma shop',
    description: 'The perfect mid-weight hoodie: black, with a white comma on the front, a comma.ai graphic on the back, and a fleece-lined pocket. Men\'s sizing.',
  },
  '/shop/comma-ai-beanie': {
    title: 'comma beanie: a black beanie with a comma on it — comma shop',
    description: 'A black beanie with a comma on it, from the company that makes comma four and openpilot. The beanie will never ever be sold for less than $69.',
  },
  '/shop/comma-ai-t-shirt': {
    title: 'comma t-shirt: soft unisex company tee — comma shop',
    description: 'We aren\'t a high end fashion brand, we are a tech company. So we sell a soft, unisex company t-shirt in white, for a reasonable price.',
  },

  // support articles and product pages (src/lib/content/support, src/lib/content/products);
  // their frontmatter title/description stay as the on-page heading and card text
  '/support/activate-prime': {
    title: 'how to activate comma prime and prime lite — comma support',
    description: 'Activate prime or prime lite in comma connect, claim the free month of prime that comes with a new comma four, and keep your commacare eligibility.',
  },
  '/support/cancel-prime': {
    title: 'how to cancel your comma prime subscription — comma support',
    description: 'Cancel comma prime at any time in comma connect, with no cancellation fee. See how billing credit works and what happens to your commacare coverage.',
  },
  '/support/car-harness': {
    title: 'car harness help: find and install yours — comma support',
    description: 'Find the right car harness for your exact model, model year and factory equipment, install it with the setup guide, and fix a car that isn\'t recognized.',
  },
  '/support/chestnut': {
    title: 'chestnut help: setup and troubleshooting — comma support',
    description: 'Set up chestnut to connect a desktop GPU to comma four, use the release-chestnut branch for the big models, and get help in the #chestnut Discord channel.',
  },
  '/support/comma-3x': {
    title: 'comma 3X help: SIM, factory reset and repairs — comma support',
    description: 'Replace the SIM card, factory reset, fix a broken screen, or get in-warranty help for your comma 3X, and see how to trade it in for a comma four.',
  },
  '/support/comma-body': {
    title: 'comma body help: robotics dev kit — comma support',
    description: 'comma body is a wheeled robotics development kit for comma 3X. It also works with comma four using a 3D printed mount. Its firmware is on GitHub.',
  },
  '/support/comma-four-common-issues': {
    title: 'comma four common issues and troubleshooting — comma support',
    description: 'Fix common comma four issues: it won\'t turn on, blank screen, camera or GPS trouble, or openpilot won\'t engage. Learn when to contact hardware support.',
  },
  '/support/comma-four': {
    title: 'comma four help: setup, issues and add-ons — comma support',
    description: 'Install comma four, troubleshoot hardware issues, flash it, capture a route, pair it with comma connect, claim your comma prime trial, and add commacare.',
  },
  '/support/comma-panda': {
    title: 'panda help: firmware and development — comma support',
    description: 'panda is a CAN and CAN FD interface for cars. Its firmware and development tools are open source; find the panda firmware and docs on GitHub.',
  },
  '/support/comma-power': {
    title: 'comma power help: install and troubleshooting — comma support',
    description: 'comma power connects your car harness to the OBD-II port, keeping comma four powered and online while the car is off to upload drives and get updates.',
  },
  '/support/comma-prime': {
    title: 'comma prime help: plans, billing and commacare — comma support',
    description: 'Set up, switch, or cancel comma prime and prime lite in comma connect, check your commacare coverage, and fix cellular service issues.',
  },
  '/support/comma-three': {
    title: 'comma three help: factory reset and trade-in — comma support',
    description: 'comma three runs openpilot up to v0.10 on the release-tici branch. Factory reset it, replace a broken screen, or trade it in toward a new comma four.',
  },
  '/support/comma-two': {
    title: 'comma two help: restore software and trade-in — comma support',
    description: 'comma two runs openpilot up to v0.8.13 on NEOS. Restore its factory software with the NEOS instructions, or trade it in toward a new comma four.',
  },
  '/support/flash-your-comma': {
    title: 'how to flash your comma device — comma support',
    description: 'Restore your comma device to a clean factory state with flash.comma.ai and a high-quality USB-C cable, then install the latest openpilot release.',
  },
  '/support/how-to-capture-a-route': {
    title: 'how to capture and share a route — comma support',
    description: 'Record an issue on stock openpilot, upload the drive over Wi-Fi, and share the route link from comma connect in your support ticket.',
  },
  '/support/orders-returns': {
    title: 'orders, shipping and returns — comma support',
    description: 'Help with comma shop orders, international orders and customs, shipping and tracking, 30-day returns, exchanges, and hardware warranty claims.',
  },
  '/support/pair-your-device': {
    title: 'how to pair your comma with comma connect — comma support',
    description: 'Pair your comma four with comma connect by scanning a QR code in device settings, then view your recorded drives, manage prime, and use remote features.',
  },
  '/support/prime-common-issues': {
    title: 'comma prime common issues: SIM and cellular — comma support',
    description: 'Fix comma prime cellular issues, like a SIM that won\'t connect to the network or has stopped working. Check your subscription, coverage, and software.',
  },
  '/support/replace-comma-3x-sim-card': {
    title: 'how to replace the SIM card in a comma 3X — comma support',
    description: 'Remove and insert the SIM card in your comma 3X step by step with a video guide, then connect to Wi-Fi to activate the new card.',
  },
  '/support/switch-prime-plans': {
    title: 'how to switch between prime and prime lite — comma support',
    description: 'Switch your comma device between the prime and prime lite plans from Prime Settings in comma connect, and see how the two plans differ.',
  },
  '/support/vehicle-compatibility': {
    title: 'how to check if your car works with openpilot — comma support',
    description: 'Use the vehicle compatibility page to find your car\'s exact make, model and model year, and check whether it works with comma four and openpilot.',
  },
  '/support/warranty': {
    title: 'warranty and commacare: hardware coverage — comma support',
    description: 'comma hardware has a 1 year limited warranty. commacare, included with comma prime or prime lite, extends comma four coverage to up to two years in total.',
  },
  '/support/what-is-comma-connect': {
    title: 'what is comma connect? your drives online — comma support',
    description: 'comma connect is the web app for your comma device: review recent drives, livestream your cameras, check device info, and manage comma prime.',
  },
  '/support/what-is-comma-prime': {
    title: 'what is comma prime? prime vs prime lite — comma support',
    description: 'comma prime is an optional subscription. prime adds US cellular data, one year of drive storage and commacare; prime lite has no SIM or cellular data.',
  },
};

export function seoFor(path) {
  const entry = pages[path.replace(/\/+$/, '') || '/'] ?? {};
  // an image set in this map brings its own alt text, so the share-images entry only fills in when it has none
  return entry.image ? entry : { ...shareImageFor(path), ...entry };
}
