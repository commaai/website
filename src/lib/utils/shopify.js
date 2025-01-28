import { get } from 'svelte/store';
import { cartId, cartCreatedAt, checkoutUrl, cartTotalQuantity } from '../../store';

export async function shopifyFetch({ query, variables }) {
  const endpoint = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_ENDPOINT;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
      },
      body: { query, variables } && JSON.stringify({ query, variables })
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
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
          lines(first: 100) {
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
          variants(first: 100) {
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

export async function createCart() {
  return shopifyFetch({
    query: /* graphql */ `
      mutation calculateCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
    variables: {}
  }).then(response => {
    cartId.set(response.body?.data?.cartCreate?.cart?.id)
    cartCreatedAt.set(Date.now());
    checkoutUrl.set(response.body?.data?.cartCreate?.cart?.checkoutUrl);
    cartTotalQuantity.set(response.body?.data?.cartCreate?.cart?.totalQuantity)
  });

}


export async function updateCart({ cartId, lineId, variantId, quantity }) {
  return shopifyFetch({
    query: /* graphql */ `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          userErrors {
            field
            message
          }
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

export async function addToCart({ cartId, variantId, additionalProductIds = [], note = "" }) {
  const cartLinesResponse = await shopifyFetch({
    query: /* graphql */ `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 100) {
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
          userErrors {
            field
            message
          }
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

  if (cartLinesResponse.errors || cartLinesResponse.data?.cartLinesAdd?.userErrors?.length) {
    console.error("Error adding items to cart:", cartLinesResponse.errors || cartLinesResponse.data.cartLinesAdd.userErrors);
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
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        cartId: cartId,
        note: note,
      },
    });

    if (cartNoteResponse.errors || cartNoteResponse.data?.cartNoteUpdate?.userErrors?.length) {
      console.error("Error updating cart note:", cartNoteResponse.errors || cartNoteResponse.data.cartNoteUpdate.userErrors);
    }

    return {
      ...cartLinesResponse,
      cartNoteResponse,
    };
  }

  return cartLinesResponse;
}
