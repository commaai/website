// Shim for SvelteKit's $app/environment
export const browser = typeof window !== 'undefined';
export const dev = import.meta.env.DEV;
export const building = import.meta.env.SSR && !dev;
