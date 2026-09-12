import { browser } from '$app/environment';

const STORAGE_KEY = 'attribution';
const MAX_ATTR_LEN = 255;

// params that mark a real inbound touch, not internal navigation
const TOUCH_PARAMS = [
  'mc_cid', 'mc_eid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'igshid', 'ttclid', 'msclkid',
];

const isInternalHost = (host) => /(^|\.)comma\.ai$/.test(host);

function posthog() {
  return browser ? window.posthog : null;
}

// posthog's stub queues calls before load and returns undefined, so fall back to its cookie
function distinctId() {
  const id = posthog()?.get_distinct_id?.();
  if (id) return id;
  if (!browser) return null;
  const match = document.cookie.match(/ph_[^=]+_posthog=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]))?.distinct_id || null;
  } catch {
    return null;
  }
}

function load() {
  if (!browser) return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function save(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // private browsing / storage disabled
  }
}

function readTouch() {
  const url = new URL(window.location.href);
  const touch = { ts: Date.now(), path: url.pathname };

  for (const param of TOUCH_PARAMS) {
    const value = url.searchParams.get(param);
    if (value) touch[param] = value;
  }

  try {
    const host = document.referrer ? new URL(document.referrer).hostname : '';
    if (host && !isInternalHost(host)) touch.referrer = host;
  } catch {
    // malformed referrer
  }

  return touch;
}

// a direct visit or internal navigation must not clobber an earlier campaign touch
function isRealTouch(touch) {
  return TOUCH_PARAMS.some((param) => touch[param]) || !!touch.referrer;
}

export function captureTouch() {
  if (!browser) return;

  const touch = readTouch();
  const attribution = load();

  if (!attribution.first) attribution.first = touch;
  if (isRealTouch(touch)) attribution.last = touch;

  save(attribution);
  identifyFromEmailClick(touch);
}

// an email click identifies the person without them filling anything in.
// never re-identify an already-identified device: a forwarded email or a shared
// machine would otherwise merge two different people.
function identifyFromEmailClick(touch) {
  if (!touch.mc_eid) return;

  const current = posthog()?.get_distinct_id?.();
  if (current && current.startsWith('mc:')) return;

  posthog()?.identify?.(`mc:${touch.mc_eid}`);
}

// $set_once, so a typo or someone else's address can never replace a known one
export function identifyByEmail(email) {
  if (!browser || !email) return;
  posthog()?.setPersonProperties?.(undefined, { submitted_email: email });
}

// written into the shopify cart so the order can be joined back to the session
export function cartAttributes() {
  if (!browser) return [];

  const { first, last } = load();
  const attributes = [];
  const add = (key, value) => {
    if (value) attributes.push({ key, value: String(value).slice(0, MAX_ATTR_LEN) });
  };

  add('_ph_distinct_id', distinctId());
  add('_ph_session_id', posthog()?.get_session_id?.());
  add('_mc_cid', last?.mc_cid || first?.mc_cid);
  add('_utm_source', last?.utm_source || first?.utm_source);
  add('_first_touch', first && JSON.stringify(first));
  add('_last_touch', last && JSON.stringify(last));

  return attributes;
}
