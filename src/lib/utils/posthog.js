import { browser } from '$app/environment';

// posthog's stub queues calls before load and returns undefined, so fall back to its cookie
export function distinctId() {
  if (!browser) return null;

  const id = window.posthog?.get_distinct_id?.();
  if (id) return id;

  const match = document.cookie.match(/ph_[^=]+_posthog=([^;]+)/);
  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match[1]))?.distinct_id || null;
  } catch {
    return null;
  }
}
