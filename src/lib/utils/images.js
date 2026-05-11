// Glob all product images. Vite returns the default export, which for raster assets
// is an ImageMetadata object ({ src, width, height, format }) — exactly what Astro's
// <Image> component expects.
const imageModules = import.meta.glob('/src/lib/images/products/**/*', {
  eager: true,
  import: 'default'
});

export function resolveImage(path) {
  return imageModules[path] ?? null;
}

export function resolveImages(paths) {
  return paths.map(path => resolveImage(path));
}
