import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';

const filetypesToOptimize = ['jpg', 'jpeg', 'png', 'gif'];

export default defineConfig({
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
