import { getProduct } from '$lib/utils/shopify';
import { error } from '@sveltejs/kit';
import { products as productsData } from '$lib/data/products.js';
import { resolveImages } from '$lib/utils/images.js';

// Helper to convert product-slug to PascalCase component name
function slugToComponentName(slug) {
  // Special case for comma-3x -> Comma3X
  if (slug === 'comma-four') {
    return 'CommaFour';
  }
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export async function load({ url, params }) {
  // Support both dynamic routes and explicit routes like /shop/comma-3x
  const productId = params.product || url.pathname.split('/').filter(Boolean).pop();
  const productInfo = productsData[productId];

  if (!productInfo) {
    throw error(404, { message: `Product "${productId}" not found` });
  }

  // Resolve image imports
  const resolvedImages = resolveImages(productInfo.images);

  // Load custom component if needed
  let descriptionComponent = null;
  if (productInfo.hasCustomComponent) {
    const componentName = slugToComponentName(productId);
    try {
      const module = await import(`$lib/components/ProductDescriptions/${componentName}.svelte`);
      descriptionComponent = module.default;
    } catch (e) {
      console.error(`Failed to load custom component for ${productId}:`, e);
    }
  }

  // Fetch from Shopify
  const response = await getProduct(productInfo.id);
  if (response.status === 200) {
    const product = response.body?.data?.product;
    if (product) {
      return {
        product: {
          ...product,
          ...productInfo,
          images: resolvedImages
        },
        descriptionComponent
      };
    }
    throw error(404, {
      message: response.body.errors.map(e => e.message).join(', ')
    });
  } else {
    console.error(response);
    throw error(response.status, {
      message: "Error fetching product"
    });
  }
}
