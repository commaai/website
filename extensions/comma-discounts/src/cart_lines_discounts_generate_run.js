// comma bulk order discount.
//
// The free car harness ($0) and the $50-off-comma-four offers are handled by
// native Shopify automatic discounts (Shopify picks the best per item). This
// function only adds the part Shopify can't do natively: a bulk discount that
// STACKS on top of those.
//
// Rule: with >= BULK_TIER_QUANTITY comma four in the cart, take
// BULK_ORDER_DISCOUNT_PERCENT off the comma four value only. It's an order-class
// discount scoped to the comma four lines, so it stacks with the native per-item
// discounts and applies to their already-discounted value (order discounts run
// after product discounts).
const COMMA_FOUR_PRODUCT_ID = 'gid://shopify/Product/7964554231871';
const BULK_TIER_QUANTITY = 10;
const BULK_ORDER_DISCOUNT_PERCENT = 10;

const NO_DISCOUNTS = {operations: []};

export function cartLinesDiscountsGenerateRun(input) {
  const lines = input.cart.lines;
  if (!lines.length) return NO_DISCOUNTS;

  // This function only emits an order-class discount.
  if (!input.discount.discountClasses.includes('ORDER')) {
    return NO_DISCOUNTS;
  }

  let commaFourQty = 0;
  const nonCommaFourLineIds = [];
  for (const line of lines) {
    if (line.merchandise?.product?.id === COMMA_FOUR_PRODUCT_ID) {
      commaFourQty += line.quantity;
    } else {
      nonCommaFourLineIds.push(line.id);
    }
  }

  if (commaFourQty < BULK_TIER_QUANTITY) return NO_DISCOUNTS;

  // Order discounts only support excluding lines (there is no "include only"),
  // so we exclude everything that isn't a comma four to scope the % to the
  // comma fours.
  return {
    operations: [
      {
        orderDiscountsAdd: {
          candidates: [
            {
              message: 'Bulk order discount',
              targets: [
                {orderSubtotal: {excludedCartLineIds: nonCommaFourLineIds}},
              ],
              value: {percentage: {value: BULK_ORDER_DISCOUNT_PERCENT}},
            },
          ],
          selectionStrategy: 'FIRST',
        },
      },
    ],
  };
}
