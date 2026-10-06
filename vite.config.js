import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';
import { mediaKitZip } from './scripts/media-kit-plugin.js';
import { videoAssets } from './scripts/video-assets-plugin.js';

const filetypesToOptimize = ['jpg', 'jpeg', 'png', 'gif'];

export default defineConfig({
  build: {
    // HomeHeroOverlay's marquee repeats these logos 92 times, so inlining them as data
    // URIs adds ~180KB to the home page HTML and stalls PostHog's DOM snapshot.
    assetsInlineLimit: (filePath) => {
      if (filePath.includes('/icons/home/brands/')) return false;
    },
  },
  plugins: [
    videoAssets(),
    imagetools({
      // Keep full-resolution media downloads byte-for-byte identical to the source.
      exclude: ['public/**/*', /\?url(?:&|$)/],
      defaultDirectives: (url) => {
        let sourceFileType = url.pathname.split('.').pop();
        if (filetypesToOptimize.includes(sourceFileType)) {
          return new URLSearchParams({'format': `avif;webp;${sourceFileType}`, 'as': 'picture' });
        }
        return new URLSearchParams();
      },
      cache: {
        enabled: true,
        dir: './node_modules/.cache/imagetools'
      }
    }),
    sveltekit(),
    mediaKitZip(),
  ]
});
