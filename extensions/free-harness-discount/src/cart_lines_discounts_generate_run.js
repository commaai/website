// comma free-harness + bulk order discount.
//
// Replaces Shopify's built-in discounts (which can only pick the single best
// discount) so that the free-harness pairing and the bulk-tier order discount
// can stack.
//
// Rules:
//   - Each comma four pairs with one car harness to make that harness free.
//     Free harnesses = min(#comma four, #car harness).
//     e.g. 2 comma four + 3 harnesses => 2 free harnesses (you pay for 1).
//   - At the bulk tier (>= BULK_TIER_PAIRS paired sets, i.e. >= 10 comma four
//     AND >= 10 harnesses), every paired harness is free AND the whole order
//     gets BULK_ORDER_DISCOUNT_PERCENT off the post-product-discount subtotal.
//
// The resulting discount allocations are read + displayed by the storefront
// cart popup (see src/store.js getTotalDiscount / ShoppingCart.svelte).
//
// Product ids mirror src/lib/data/products.js. Update them here if they change.
const COMMA_FOUR_PRODUCT_ID = "gid://shopify/Product/7964554231871";
const CAR_HARNESS_PRODUCT_ID = "gid://shopify/Product/4447447908415";

// How many comma four + harness pairs unlock the bulk order discount.
const BULK_TIER_PAIRS = 10;
// Order-level percentage taken off once the bulk tier is reached.
const BULK_ORDER_DISCOUNT_PERCENT = "10.0";

const NO_DISCOUNTS = { operations: [] };

/**
 * @param {{ cart: { lines: Array<any> }, discount: { discountClasses: string[] } }} input
 */
export function cart_lines_discounts_generate_run(input) {
  const lines = input?.cart?.lines ?? [];
  if (lines.length === 0) return NO_DISCOUNTS;

  // The discount must be created with both the PRODUCT and ORDER classes for
  // both halves to apply (see README). Only emit what the discount allows.
  const discountClasses = input?.discount?.discountClasses ?? [];
  const canDiscountProducts = discountClasses.includes("PRODUCT");
  const canDiscountOrder = discountClasses.includes("ORDER");

  let commaFourQty = 0;
  const harnessLines = [];
  for (const line of lines) {
    const productId = line?.merchandise?.product?.id;
    if (productId === COMMA_FOUR_PRODUCT_ID) {
      commaFourQty += line.quantity;
    } else if (productId === CAR_HARNESS_PRODUCT_ID) {
      harnessLines.push(line);
    }
  }

  const harnessQty = harnessLines.reduce((sum, line) => sum + line.quantity, 0);
  const freeHarnessUnits = Math.min(commaFourQty, harnessQty);
  if (freeHarnessUnits === 0) return NO_DISCOUNTS;

  const operations = [];

  // --- Free harnesses (product discount) ---
  if (canDiscountProducts) {
    // Free the most expensive harness units first so the customer saves the
    // most when harness variants are priced differently.
    const sorted = [...harnessLines].sort(
      (a, b) =>
        Number(b.cost.amountPerQuantity.amount) -
        Number(a.cost.amountPerQuantity.amount)
    );

    // One candidate targeting each harness line for the number of free units on
    // it. Targeting per-quantity handles partial lines (e.g. 2 free of 3).
    const targets = [];
    let remaining = freeHarnessUnits;
    for (const line of sorted) {
      if (remaining <= 0) break;
      const quantity = Math.min(remaining, line.quantity);
      targets.push({ cartLine: { id: line.id, quantity } });
      remaining -= quantity;
    }

    operations.push({
      productDiscountsAdd: {
        candidates: [
          {
            message: "Free car harness",
            targets,
            value: { percentage: { value: "100.0" } },
          },
        ],
        selectionStrategy: "FIRST",
      },
    });
  }

  // --- Bulk order discount (order discount) ---
  // Applies to the subtotal after the free harnesses are taken off, because
  // Shopify applies product discounts before order discounts.
  if (canDiscountOrder && freeHarnessUnits >= BULK_TIER_PAIRS) {
    operations.push({
      orderDiscountsAdd: {
        candidates: [
          {
            message: "Bulk order discount",
            targets: [{ orderSubtotal: { excludedCartLineIds: [] } }],
            value: { percentage: { value: BULK_ORDER_DISCOUNT_PERCENT } },
          },
        ],
        selectionStrategy: "FIRST",
      },
    });
  }

  return operations.length > 0 ? { operations } : NO_DISCOUNTS;
}
