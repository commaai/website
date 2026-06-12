import { getProduct } from '$lib/utils/shopify';
import { error } from '@sveltejs/kit';
import { products as productsData } from '$lib/data/products.js';
import { resolveImages } from '$lib/utils/images.js';

export async function load({ url, params }) {
  // Support both dynamic routes and explicit routes like /shop/comma-3x
  const productId = params.product || url.pathname.split('/').filter(Boolean).pop();
  const productInfo = productsData[productId];

  if (!productInfo) {
    throw error(404, { message: `Product "${productId}" not found` });
  }

  // Resolve image imports
  const resolvedImages = resolveImages(productInfo.images);

  // Fetch from Shopify
  const response = await getProduct(productInfo.id);
  if (response.status === 200) {
    const product = response.body?.data?.product;
    if (product) {
      return {
        product: {
          ...product,
          ...productInfo,
          slug: productId,
          images: resolvedImages
        }
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
