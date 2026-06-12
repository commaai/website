import { vitePreprocess } from '@astrojs/svelte';
import { optimizeImagePreprocess } from './scripts/optimize-image-preprocessor.js';

export default {
  preprocess: [vitePreprocess(), optimizeImagePreprocess()],
};
