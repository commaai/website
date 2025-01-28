import { getProduct } from '$lib/utils/shopify';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
  const productId = url.pathname.split('/')[2];

  try {
    const productModule = await import(`../products/${productId}.svelte`);
    const { default: component, productInfo } = productModule;

    const response = await getProduct(productInfo.id);
    if (response.status === 200) {
      const product = response.body?.data?.product;

      if (product) {
        return {
          banner: productInfo.category === "parts" ? { label: "Parts", link: "/shop/parts" } : { label: "Shop", link: "/shop" },
          component,
          product: {
            ...product,
            ...productInfo,
          },
        };
      }

      throw error(404, {
        message: response.body.errors.map(error => error.message).join(', '),
      })
    } else {
      console.error(response);
      throw error(response.status, {
        message: "Error fetching product",
      })
    }
  } catch (e) {
    console.error(`Failed to load product ${productId}:`, e);
    throw error(response.status, {
      message: `Product ${productId} not found`,
    })
  }
}
