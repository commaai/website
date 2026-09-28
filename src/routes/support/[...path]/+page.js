import { supportEntries } from '$lib/components/Support/support-content';

export function entries() {
  return supportEntries.map(entry => ({ path: entry.path }));
}
