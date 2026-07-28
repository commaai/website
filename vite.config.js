import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';

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
    imagetools({
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
  ]
});
