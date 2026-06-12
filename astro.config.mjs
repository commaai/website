import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { imagetools } from 'vite-imagetools';
import { fileURLToPath } from 'node:url';

const filetypesToOptimize = ['jpg', 'jpeg', 'png', 'gif'];
// image types Astro's asset pipeline would otherwise turn into ImageMetadata
const filetypesToLeaveAlone = ['svg', 'webp', 'avif', 'tiff'];

export default defineConfig({
  site: 'https://comma.ai',
  trailingSlash: 'never',
  publicDir: 'static',
  outDir: 'build',
  build: {
    format: 'file',
    // SvelteKit always emitted <link> stylesheets; keep that behavior
    inlineStylesheets: 'never',
  },
  integrations: [svelte()],
  vite: {
    // expose VITE_-prefixed env vars to client code (Vite/SvelteKit default;
    // Astro alone only exposes PUBLIC_)
    envPrefix: ['VITE_', 'PUBLIC_'],
    build: {
      // Vite's default css target, which SvelteKit used; without this Astro
      // keeps native CSS nesting un-flattened and older browsers lose styles
      cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    },
    resolve: {
      alias: {
        '$app/environment': fileURLToPath(new URL('./src/lib/shims/app-environment.js', import.meta.url)),
        '$app/stores': fileURLToPath(new URL('./src/lib/shims/app-stores.js', import.meta.url)),
        '$app/navigation': fileURLToPath(new URL('./src/lib/shims/app-navigation.js', import.meta.url)),
        '@sveltejs/kit': fileURLToPath(new URL('./src/lib/shims/sveltejs-kit.js', import.meta.url)),
        '$lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      },
    },
    plugins: [
      {
        // Astro's own asset pipeline claims query-less image imports before
        // imagetools can. Appending the directives as an explicit query makes
        // Astro skip them and imagetools process them, same as before.
        name: 'imagetools-default-directives',
        enforce: 'pre',
        async resolveId(source, importer, options) {
          if (source.includes('?')) return;
          const sourceFileType = source.split('.').pop()?.toLowerCase();
          let query;
          if (filetypesToOptimize.includes(sourceFileType)) {
            query = `?format=avif;webp;${sourceFileType}&as=picture`;
          } else if (filetypesToLeaveAlone.includes(sourceFileType)) {
            query = '?url'; // plain Vite asset URL, like the old setup
          } else {
            return;
          }
          const resolved = await this.resolve(source, importer, { skipSelf: true, ...options });
          if (!resolved) return;
          return resolved.id + query;
        },
      },
      imagetools({
        cache: {
          enabled: true,
          dir: './node_modules/.cache/imagetools'
        }
      }),
    ],
  },
});
