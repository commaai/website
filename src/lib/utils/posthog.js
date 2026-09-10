import { browser } from '$app/environment';

// posthog may not have loaded yet, so read its cookie instead
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
