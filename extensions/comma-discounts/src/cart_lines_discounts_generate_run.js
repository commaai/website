import {
  DiscountClass,
  OrderDiscountSelectionStrategy,
  ProductDiscountSelectionStrategy,
} from '../generated/api';

/**
 * @typedef {import("../generated/api").CartInput} RunInput
 * @typedef {import("../generated/api").CartLinesDiscountsGenerateRunResult} CartLinesDiscountsGenerateRunResult
 */

// comma free-harness + bulk order discount.
//
// Rules:
//   - Free car harness: one free harness per comma four in the cart.
//     Free harnesses = min(#comma four, #car harness).
//     e.g. 2 comma four + 3 harnesses => 2 free (you pay for 1). Adding a
//     harness is optional — it's just free when you do.
//   - Bulk order discount: >= BULK_TIER_QUANTITY comma four in the cart gets
//     BULK_ORDER_DISCOUNT_PERCENT off the order. This does NOT require a
//     harness — it triggers on comma four quantity alone.
//
// Product ids mirror src/lib/data/products.js — update here if they change.
const COMMA_FOUR_PRODUCT_ID = 'gid://shopify/Product/7964554231871';
const CAR_HARNESS_PRODUCT_ID = 'gid://shopify/Product/4447447908415';
const BULK_TIER_QUANTITY = 10;
const BULK_ORDER_DISCOUNT_PERCENT = 10;

const NO_DISCOUNTS = {operations: []};

/**
 * @param {RunInput} input
 * @returns {CartLinesDiscountsGenerateRunResult}
 */
export function cartLinesDiscountsGenerateRun(input) {
  const lines = input.cart.lines;
  if (!lines.length) return NO_DISCOUNTS;

  const canDiscountProducts = input.discount.discountClasses.includes(
    DiscountClass.Product,
  );
  const canDiscountOrder = input.discount.discountClasses.includes(
    DiscountClass.Order,
  );
  if (!canDiscountProducts && !canDiscountOrder) return NO_DISCOUNTS;

  let commaFourQty = 0;
  const harnessLines = [];
  for (const line of lines) {
    const productId = line.merchandise?.product?.id;
    if (productId === COMMA_FOUR_PRODUCT_ID) {
      commaFourQty += line.quantity;
    } else if (productId === CAR_HARNESS_PRODUCT_ID) {
      harnessLines.push(line);
    }
  }

  const harnessQty = harnessLines.reduce((sum, line) => sum + line.quantity, 0);
  const freeHarnessUnits = Math.min(commaFourQty, harnessQty);

  const operations = [];

  // Free harnesses (product discount). One per comma four; free the most
  // expensive units first so the customer saves the most when harness variants
  // are priced differently.
  if (canDiscountProducts && freeHarnessUnits > 0) {
    const sorted = [...harnessLines].sort(
      (a, b) =>
        Number(b.cost.amountPerQuantity.amount) -
        Number(a.cost.amountPerQuantity.amount),
    );

    const targets = [];
    let remaining = freeHarnessUnits;
    for (const line of sorted) {
      if (remaining <= 0) break;
      const quantity = Math.min(remaining, line.quantity);
      targets.push({cartLine: {id: line.id, quantity}});
      remaining -= quantity;
    }

    operations.push({
      productDiscountsAdd: {
        candidates: [
          {
            message: 'Free car harness',
            targets,
            value: {percentage: {value: 100}},
          },
        ],
        selectionStrategy: ProductDiscountSelectionStrategy.First,
      },
    });
  }

  // Bulk order discount — triggered by comma four quantity alone (no harness
  // required). Applied after any free harnesses come off, since Shopify applies
  // product discounts before order discounts.
  if (canDiscountOrder && commaFourQty >= BULK_TIER_QUANTITY) {
    operations.push({
      orderDiscountsAdd: {
        candidates: [
          {
            message: 'Bulk order discount',
            targets: [{orderSubtotal: {excludedCartLineIds: []}}],
            value: {percentage: {value: BULK_ORDER_DISCOUNT_PERCENT}},
          },
        ],
        selectionStrategy: OrderDiscountSelectionStrategy.First,
      },
    });
  }

  return operations.length > 0 ? {operations} : NO_DISCOUNTS;
}
