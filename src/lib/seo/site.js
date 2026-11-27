// Site-wide values for <Seo>, the sitemap and structured data.

export const ORIGIN = 'https://comma.ai';

export const SITE_NAME = 'comma.ai';

export const TWITTER_HANDLE = '@comma_ai';

export const LOCALE = 'en_US';

// Share image used when neither the route nor src/lib/seo/pages.js picks one.
// Paths are relative to static/ (served from the site root); full URLs also work.
export const DEFAULT_IMAGE = {
  image: '/og/home-v1.jpg',
  imageAlt: 'comma four, front view with openpilot on the screen',
  imageWidth: 1200,
  imageHeight: 630,
};

// One URL per page: apex https host, no query string, no trailing slash ("/" for the home page)
export function canonicalUrl(pathname) {
  return ORIGIN + (pathname.replace(/\/+$/, '') || '/');
}

export function absoluteUrl(path) {
  return /^https?:\/\//.test(path) ? path : ORIGIN + path;
}
