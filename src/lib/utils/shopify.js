// GraphQL fragments for error handling
const USER_ERRORS_GQL = `userErrors { code field message }`;
const WARNINGS_GQL = `warnings { code message target }`;

export async function shopifyFetch({ query, variables }) {
  const apiToken = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN || import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
  const storeUrl = import.meta.env.PUBLIC_SHOPIFY_STORE_URL || import.meta.env.VITE_SHOPIFY_STORE_URL;
  const apiVersion = import.meta.env.PUBLIC_SHOPIFY_API_VERSION || import.meta.env.VITE_SHOPIFY_API_VERSION || 'unstable';
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

export async function loadCartRemote(cartId) {
  return shopifyFetch({
    query: /* graphql */ `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
          totalQuantity
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
          }
          lines(first: 250) {
            edges {
              node {
                id
                quantity
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
                    product {
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
    variables: { cartId }
  });
}

export async function createCart() {
  return shopifyFetch({
    query: /* graphql */ `
      mutation calculateCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
          cart {
            checkoutUrl
            id
            totalQuantity
          }
        }
      }
    `,
    variables: {}
  });
}

export async function updateCartLine({ cartId, lineId, variantId, quantity }) {
  return shopifyFetch({
    query: /* graphql */ `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          ${USER_ERRORS_GQL}
          ${WARNINGS_GQL}
        }
      }
    `,
    variables: {
      cartId,
      lines: [{ id: lineId, merchandiseId: variantId, quantity }]
    }
  });
}

export async function addToCartRemote({ cartId, variantId, additionalProductIds = [], note = "" }) {
  const cartLinesResponse = await shopifyFetch({
    query: /* graphql */ `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
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
      cartId,
      lines: [{
        merchandiseId: variantId,
        quantity: 1
      }, ...additionalProductIds.map(id => ({
        merchandiseId: id,
        quantity: 1
      }))]
    }
  });

  const { errors, data } = cartLinesResponse;
  const { cartLinesAdd } = data || {};
  const cartLinesErrors = errors || cartLinesAdd?.userErrors || cartLinesAdd?.warnings;
  if (errors || cartLinesErrors?.length) {
    console.error("Error adding items to cart:", cartLinesErrors);
    return cartLinesResponse;
  }

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
        cartId,
        note,
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
