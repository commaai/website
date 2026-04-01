/**
 * Extract a usable src string from an image import.
 * vite-imagetools with `as: 'picture'` returns { sources: {...}, img: { src, w, h } }
 * Regular imports return a string path.
 */
export function imgSrc(image) {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (typeof image === 'object') {
    if (image.img && image.img.src) return image.img.src;
    if (image.src) return image.src;
  }
  return String(image);
}

/**
 * Render a picture element with optimized sources if available.
 * Returns an object with { sources, imgSrc } for use in templates.
 */
export function pictureData(image) {
  if (!image || typeof image === 'string') {
    return { sources: null, imgSrc: image || '' };
  }
  if (typeof image === 'object' && image.sources) {
    return {
      sources: Object.entries(image.sources).map(([type, srcset]) => ({
        type: `image/${type}`,
        srcset: srcset.split(' ')[0],
      })),
      imgSrc: image.img?.src || '',
    };
  }
  if (typeof image === 'object' && image.src) {
    return { sources: null, imgSrc: image.src };
  }
  return { sources: null, imgSrc: String(image) };
}
