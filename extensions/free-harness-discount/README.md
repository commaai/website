# free-harness-discount

A Shopify [discount function](https://shopify.dev/docs/apps/build/discounts/build-discount-function)
that runs server-side in Shopify's cart/checkout and replaces our built-in
discounts (which can only apply the single best discount) so the two offers can
**stack**:

1. **Free car harness** — each comma four pairs with one harness to make it
   free. Free harnesses = `min(#comma four, #car harness)`.
   So 2 comma four + 3 harnesses → 2 free, you pay for 1.
2. **Bulk order discount** — at ≥ 10 paired sets (≥ 10 comma four **and** ≥ 10
   harnesses) every paired harness is free **and** the order gets 10% off the
   post-harness subtotal.

The logic lives in [`src/cart_lines_discounts_generate_run.js`](src/cart_lines_discounts_generate_run.js).
The resulting discounts are read and displayed by the storefront cart popup
(`src/store.js` → `getTotalDiscount`, `ShoppingCart.svelte`).

## Changing the rules

Everything tunable is a constant at the top of
`src/cart_lines_discounts_generate_run.js`:

| Constant | Meaning |
| --- | --- |
| `COMMA_FOUR_PRODUCT_ID` | comma four product GID (mirror of `src/lib/data/products.js`) |
| `CAR_HARNESS_PRODUCT_ID` | car harness product GID |
| `BULK_TIER_PAIRS` | paired sets needed to unlock the bulk discount (10) |
| `BULK_ORDER_DISCOUNT_PERCENT` | bulk order percentage off (`"10.0"`) |

After editing, re-run `shopify app deploy`.

## Prerequisites

- A Shopify **Partner** account with access to the comma store.
- The [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) installed
  (`npm i -g @shopify/cli`).

## One-time setup

Run these from the **repo root** (the CLI manages `extensions/`; it does not
touch the SvelteKit/Vite app).

```bash
# Link this project to the Shopify app (creates shopify.app.toml). Pick the
# comma app, or create a new one when prompted.
shopify app config link

# Install the function's deps (generates the Wasm wrapper too).
cd extensions/free-harness-discount && npm install && cd -
shopify app function typegen   # optional: generates input types
```

> The build/toolchain wiring (`package.json`, `shopify.extension.toml`
> `[extensions.build]`) tracks the Shopify CLI version. If `deploy` ever errors
> on the build, run `shopify app generate extension` → **Discount** → **JavaScript**
> to scaffold a fresh shell, then copy `src/cart_lines_discounts_generate_run.js`
> and `src/cart_lines_discounts_generate_run.graphql` into it — the logic is the
> part that matters.

## Deploy

```bash
shopify app deploy        # builds the Wasm + creates/releases an app version
```

`shopify app dev` runs it locally against a dev store first if you want to test
before releasing.

## Activate the discount (important)

Deploying only uploads the function. You still have to create **one automatic
discount** that uses it, and it must:

- enable **both** the Product and Order discount classes, and
- be set to **combine** with your other discounts (e.g. VIP codes), or Shopify
  falls back to "apply the single best discount".

The reliable way is the Admin GraphQL API (Admin → Apps → or any GraphQL
client). Get the function id from `shopify app deploy` output or
`shopify app function list`, then:

```graphql
mutation {
  discountAutomaticAppCreate(automaticAppDiscount: {
    title: "Free harness + bulk",
    functionId: "YOUR_FUNCTION_ID",
    discountClasses: [PRODUCT, ORDER],
    startsAt: "2026-06-15T00:00:00Z",
    combinesWith: {
      productDiscounts: true,
      orderDiscounts: true,
      shippingDiscounts: true
    }
  }) {
    automaticAppDiscount { discountId }
    userErrors { field message }
  }
}
```

For each VIP/code discount you want to stack on top, make sure its own
**Combinations** settings also allow product + order discounts. Discounts that
should stay exclusive should leave combinations off.

The discount then shows in **Admin → Discounts** like any other discount
(activate/deactivate, analytics, etc.). A store can have up to 25 active
function discounts.
