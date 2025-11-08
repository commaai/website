// Dynamic import for all product images
const imageModules = import.meta.glob('/src/lib/images/products/**/*', {
  eager: true,
  import: 'default'
});

// Helper to resolve a single image path
export function resolveImage(path) {
  return imageModules[path];
}

// Helper to resolve multiple image paths
export function resolveImages(paths) {
  return paths.map(path => resolveImage(path));
}
