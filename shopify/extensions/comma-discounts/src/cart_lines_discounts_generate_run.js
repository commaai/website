// comma discounts — one function backing three SEPARATE discounts so they report
// separately in Shopify metrics. Each discount carries a `type` in its config
// metafield (picked in the admin settings panel); this function reads it and
// emits only that discount's piece.
//
// Pairing: every comma four pairs with one car harness.
//   pairs = min(#comma four, #car harness)
//   - free_harness: those `pairs` harnesses are free
//   - fifty_off:    the UNPAIRED comma fours (#c4 - pairs) get $50 off each
//   - bulk:         >= 10 comma four -> 10% off the comma four value (order)
const COMMA_FOUR_PRODUCT_ID = 'gid://shopify/Product/7964554231871';
const CAR_HARNESS_PRODUCT_ID = 'gid://shopify/Product/4447447908415';

const FREE_HARNESS_PERCENT = 100;
const FOUR_NO_HARNESS_AMOUNT = 50; // $ off each unpaired comma four
const BULK_TIER_QUANTITY = 10;
const BULK_ORDER_DISCOUNT_PERCENT = 10;

const NO_DISCOUNTS = {operations: []};

function discountType(input) {
  try {
    return JSON.parse(input.discount?.metafield?.value || '{}').type || null;
  } catch {
    return null;
  }
}

// Spread `units` across the given lines as cart-line targets.
function allocate(lines, units) {
  const targets = [];
  let remaining = units;
  for (const line of lines) {
    if (remaining <= 0) break;
    const quantity = Math.min(remaining, line.quantity);
    targets.push({cartLine: {id: line.id, quantity}});
    remaining -= quantity;
  }
  return targets;
}

export function cartLinesDiscountsGenerateRun(input) {
  const lines = input.cart.lines;
  if (!lines.length) return NO_DISCOUNTS;

  const type = discountType(input);
  const classes = input.discount.discountClasses;

  const commaFourLines = [];
  const harnessLines = [];
  const nonCommaFourLineIds = [];
  for (const line of lines) {
    const productId = line.merchandise?.product?.id;
    if (productId === COMMA_FOUR_PRODUCT_ID) commaFourLines.push(line);
    else nonCommaFourLineIds.push(line.id);
    if (productId === CAR_HARNESS_PRODUCT_ID) harnessLines.push(line);
  }
  const commaFourQty = commaFourLines.reduce((s, l) => s + l.quantity, 0);
  const harnessQty = harnessLines.reduce((s, l) => s + l.quantity, 0);
  const pairs = Math.min(commaFourQty, harnessQty);

  // Free car harness — the paired harnesses are free.
  if (type === 'free_harness') {
    if (!classes.includes('PRODUCT') || pairs === 0) return NO_DISCOUNTS;
    // Free the most expensive harness units first.
    const sorted = [...harnessLines].sort(
      (a, b) =>
        Number(b.cost.amountPerQuantity.amount) -
        Number(a.cost.amountPerQuantity.amount),
    );
    return {
      operations: [
        {
          productDiscountsAdd: {
            candidates: [
              {
                message: 'FOUR INCLUDED HARNESS',
                targets: allocate(sorted, pairs),
                value: {percentage: {value: FREE_HARNESS_PERCENT}},
              },
            ],
            selectionStrategy: 'FIRST',
          },
        },
      ],
    };
  }

  // $50 off — only comma fours WITHOUT a paired harness.
  if (type === 'fifty_off') {
    if (!classes.includes('PRODUCT')) return NO_DISCOUNTS;
    const unpaired = commaFourQty - pairs;
    if (unpaired === 0) return NO_DISCOUNTS;
    return {
      operations: [
        {
          productDiscountsAdd: {
            candidates: [
              {
                message: 'FOUR NO HARNESS',
                targets: allocate(commaFourLines, unpaired),
                value: {
                  fixedAmount: {
                    amount: String(FOUR_NO_HARNESS_AMOUNT),
                    appliesToEachItem: true,
                  },
                },
              },
            ],
            selectionStrategy: 'FIRST',
          },
        },
      ],
    };
  }

  // Bulk — 10% off the comma four value at >= 10 comma four (order class).
  if (type === 'bulk') {
    if (!classes.includes('ORDER') || commaFourQty < BULK_TIER_QUANTITY) {
      return NO_DISCOUNTS;
    }
    return {
      operations: [
        {
          orderDiscountsAdd: {
            candidates: [
              {
                message: 'BULK ORDER',
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

  return NO_DISCOUNTS;
}
