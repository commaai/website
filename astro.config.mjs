import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  outDir: './build',
  publicDir: './static',
  site: 'https://comma.ai',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  vite: {
    envPrefix: ['PUBLIC_', 'VITE_'],
    resolve: {
      alias: {
        $lib: path.resolve(__dirname, 'src/lib'),
        $components: path.resolve(__dirname, 'src/components'),
        $scripts: path.resolve(__dirname, 'src/scripts'),
      },
    },
  },
});
