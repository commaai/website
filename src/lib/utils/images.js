// Dynamic import for all product images. Resolved as { default: src } per Vite glob.
const imageModules = import.meta.glob('/src/lib/images/products/**/*', {
  eager: true,
  import: 'default'
});

function toUrl(mod) {
  if (!mod) return mod;
  // Astro asset modules are objects { src, width, height, format }; raw imports are strings
  if (typeof mod === 'string') return mod;
  return mod.src ?? mod;
}

export function resolveImage(path) {
  return toUrl(imageModules[path]);
}

export function resolveImages(paths) {
  return paths.map(path => resolveImage(path));
}
