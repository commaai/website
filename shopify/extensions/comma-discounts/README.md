# comma-discounts

A Shopify discount function for the comma store, plus an admin settings panel
(`../comma-discount-settings`) to configure it.

It powers three offers. Each is created as a **separate** automatic discount so
they report separately in Shopify metrics. Each discount carries a `type` (picked
in the settings panel); the function reads it and emits only that piece:

| type (picked in the panel) | what it does |
| --- | --- |
| **FOUR INCLUDED HARNESS** | the harness paired with each comma four is free |
| **FOUR NO HARNESS** | comma fours *without* a harness get $50 off each |
| **BULK ORDER** | ≥ 10 comma four → 10% off the comma four value |

Pairing: `pairs = min(#comma four, #car harness)`. FOUR INCLUDED HARNESS frees
those pairs; FOUR NO HARNESS applies only to the **unpaired** comma fours — so a
comma four never gets both. BULK ORDER is an order-class discount scoped to the
comma four lines, so it stacks on top.

- Logic: [`src/cart_lines_discounts_generate_run.js`](src/cart_lines_discounts_generate_run.js)
- Input query: [`src/cart_lines_discounts_generate_run.graphql`](src/cart_lines_discounts_generate_run.graphql)

## Changing the rules

Constants at the top of `cart_lines_discounts_generate_run.js`:

| Constant | Meaning |
| --- | --- |
| `COMMA_FOUR_PRODUCT_ID` / `CAR_HARNESS_PRODUCT_ID` | product GIDs (mirror the storefront's `src/lib/data/products.js`) |
| `FOUR_NO_HARNESS_AMOUNT` | $ off each unpaired comma four (`50`) |
| `BULK_TIER_QUANTITY` | comma four qty that unlocks BULK ORDER (`10`) |
| `BULK_ORDER_DISCOUNT_PERCENT` | bulk % off (`10`) |

After editing, re-run `shopify app deploy`.

## Prerequisites

- Membership in the comma Shopify org with the **App developer** role.
- **Node ≥ 20.18 or 22**, and the Shopify CLI (`npm i -g @shopify/cli`).

## Deploy

```bash
shopify app config link   # one-time: link to the comma app
shopify app deploy        # builds + releases a new app version
```

## Activate — create the 3 discounts

Do this once **per offer**, in the admin:

**Discounts → Create discount → comma-discounts** → in the settings panel pick the
**type**, set the **title to the offer name** (e.g. `FOUR NO HARNESS`),
Combinations, and Active → **Save**.
