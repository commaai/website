import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { optimizeImagePreprocess } from './scripts/optimize-image-preprocessor.js';
import { brandsPreprocess } from './src/lib/preprocess/brands.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: staticAdapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true,
    }),
    paths: {
      relative: false,
    },
  },
  preprocess: [vitePreprocess(), optimizeImagePreprocess(), brandsPreprocess()],
};

export default config;
