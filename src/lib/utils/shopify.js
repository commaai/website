import { get } from 'svelte/store';
import { cartId, cartCreatedAt, checkoutUrl, cartTotalQuantity, cartDiscountCodes, cartReferralWarning } from '../../store';
import { getReferralWarning } from './referral.js';

// GraphQL fragments for error handling
const USER_ERRORS_GQL = `userErrors { code field message }`;
const WARNINGS_GQL = `warnings { code message target }`;
const DISCOUNT_CODES_GQL = `discountCodes { code applicable }`;

export async function shopifyFetch({ query, variables }) {
  const apiToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
  const storeUrl = import.meta.env.VITE_SHOPIFY_STORE_URL;
  const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-07';
  const endpoint = `https://${storeUrl}/api/${apiVersion}/graphql.json`;

  if (apiVersion === 'unstable') {
    console.warn(
      'Using an unstable Shopify API version. Please ensure the API version is specified in your .env file.'
    );
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': apiToken
      },
      body: { query, variables } && JSON.stringify({ query, variables })
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error making Shopify Storefront API request:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}

async function shopifyCartFetch(operation, request) {
  const response = await shopifyFetch(request);
  const payload = response.body?.data?.[operation];
  if (payload?.cart && !response.body?.errors?.length && !payload.userErrors?.length) {
    const codes = payload.cart.discountCodes;
    cartDiscountCodes.set(codes);
    cartReferralWarning.set(getReferralWarning(codes, payload.warnings));
  }
  return response;
}

export async function loadCart() {
  let currentDate = Date.now();
  let difference = currentDate - get(cartCreatedAt);
  let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  let cartIdExpired = totalDays > 6;
  if (get(cartId) === "undefined" || get(cartId) === "null" || cartIdExpired) {
    await createCart();
  }
  let response = await _loadCart();
  if (!response?.body?.data?.cart) {
    console.log("setting up a new cart", response);
    await createCart();
    response = await _loadCart();
  }
  return response;
}

export async function _loadCart() {
  return shopifyFetch({
    query: /* graphql */ `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
          totalQuantity
          discountCodes {
            code
            applicable
          }
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          discountAllocations {
            discountedAmount {
              amount
              currencyCode
            }
            ... on CartAutomaticDiscountAllocation {
              title
            }
            ... on CartCodeDiscountAllocation {
              code
            }
          }
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                discountAllocations {
                  discountedAmount {
                    amount
                    currencyCode
                  }
                  ... on CartAutomaticDiscountAllocation {
                    title
                  }
                  ... on CartCodeDiscountAllocation {
                    code
                  }
                }
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    image {
                      url
                      altText
                    }
                    product {
                      id
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            originalSrc
                            altText
                            width
                            height
                          }
                        }
                      }
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { cartId: get(cartId) }
  });
}

export async function getProduct(id) {
  return shopifyFetch({
    query: /* graphql */ `
      query getProductById($id: ID!) {
        product(id: $id) {
          title
          id
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            nodes {
              id
              title
              availableForSale
              currentlyNotInStock
              price {
                amount
                currencyCode
              }
              image {
                altText
                height
                url
                width
              }
            }
          }
        }
      }
    `,
    variables: {
      id
    }
  });
}


export async function createCart(referralCode = null) {
  return shopifyCartFetch('cartCreate', {
    query: /* graphql */ `
      mutation createCart($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
            id
            totalQuantity
            ${DISCOUNT_CODES_GQL}
          }
          ${USER_ERRORS_GQL}
          ${WARNINGS_GQL}
        }
      }
    `,
    variables: {
      input: { discountCodes: referralCode ? [referralCode] : [] }
    }
  }).then(response => {
    const cart = response.body?.data?.cartCreate?.cart;
    if (!cart) return response;
    cartId.set(cart.id)
    cartCreatedAt.set(Date.now());
    checkoutUrl.set(cart.checkoutUrl);
    cartTotalQuantity.set(cart.totalQuantity)
    return response;
  });

}

export async function updateCart({ cartId, lineId, variantId, quantity }) {
  return shopifyCartFetch('cartLinesUpdate', {
    query: /* graphql */ `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${DISCOUNT_CODES_GQL} }
          ${USER_ERRORS_GQL}
          ${WARNINGS_GQL}
        }
      }
    `,
    variables: {
      cartId: cartId,
      lines: [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity: quantity
        }
      ]
    }
  });
}

export async function removeCartLines({ cartId, lineIds }) {
  if (!lineIds.length) return;

  return shopifyCartFetch('cartLinesRemove', {
    query: /* graphql */ `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${DISCOUNT_CODES_GQL} }
          ${USER_ERRORS_GQL}
          ${WARNINGS_GQL}
        }
      }
    `,
    variables: {
      cartId,
      lineIds
    }
  });
}

export async function updateCartDiscountCodes({ cartId, discountCodes }) {
  return shopifyCartFetch('cartDiscountCodesUpdate', {
    query: /* graphql */ `
      mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
        cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
          cart { ${DISCOUNT_CODES_GQL} }
          ${USER_ERRORS_GQL}
          ${WARNINGS_GQL}
        }
      }
    `,
    variables: {
      cartId,
      discountCodes
    }
  });
}

export async function addToCart({ cartId, variantId, additionalProductIds = [], note = "" }) {
  const cartLinesResponse = await shopifyCartFetch('cartLinesAdd', {
    query: /* graphql */ `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            ${DISCOUNT_CODES_GQL}
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          ${USER_ERRORS_GQL}
          ${WARNINGS_GQL}
        }
      }
    `,

    variables: {
      cartId: cartId,
      lines: [{
        merchandiseId: variantId,
        quantity: 1
      }, ...additionalProductIds.map(id => ({
        merchandiseId: id,
        quantity: 1
      }))]
    }
  });

  const { errors, data } = cartLinesResponse.body || {};
  const { cartLinesAdd } = data || {};
  const cartLinesErrors = errors || cartLinesAdd?.userErrors;
  if (errors || cartLinesErrors?.length) {
    console.error("Error adding items to cart:", cartLinesErrors);
    return cartLinesResponse;
  }

  // Update the cart note
  if (note) {
    const cartNoteResponse = await shopifyFetch({
      query: /* graphql */ `
        mutation updateCartNote($cartId: ID!, $note: String!) {
          cartNoteUpdate(cartId: $cartId, note: $note) {
            cart {
              id
              note
            }
            ${USER_ERRORS_GQL}
            ${WARNINGS_GQL}
          }
        }
      `,
      variables: {
        cartId: cartId,
        note: note,
      },
    });

    const { errors, data } = cartNoteResponse;
    const { cartNoteUpdate } = data || {};
    const cartNoteErrors = errors || cartNoteUpdate?.userErrors || cartNoteUpdate?.warnings;
    if (errors || cartNoteErrors?.length) {
      console.error("Error updating cart note:", cartNoteErrors);
    }

    return {
      ...cartLinesResponse,
      cartNoteResponse,
    };
  }

  return cartLinesResponse;
}
