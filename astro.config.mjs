import { defineConfig } from 'astro/config';
import { imagetools } from 'vite-imagetools';

const filetypesToOptimize = ['jpg', 'jpeg', 'png', 'gif'];

export default defineConfig({
  output: 'static',
  outDir: './build',
  publicDir: './static',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 600,
    },
    plugins: [
      imagetools({
        defaultDirectives: (url) => {
          let sourceFileType = url.pathname.split('.').pop();
          if (filetypesToOptimize.includes(sourceFileType)) {
            return new URLSearchParams({ 'format': `avif;webp;${sourceFileType}`, 'as': 'picture' });
          }
          return new URLSearchParams();
        },
        cache: {
          enabled: true,
          dir: './node_modules/.cache/imagetools'
        }
      }),
    ],
  },
});
