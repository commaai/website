# comma-discounts

A Shopify [discount function](https://shopify.dev/docs/apps/build/discounts/build-discount-function)
that adds the one thing Shopify's native discounts can't: a **bulk discount that
stacks**.

- **≥ 10 comma four in the cart → 10% off the comma four value** (only the comma
  fours, computed after the native per-item discounts).

The **free car harness** and **$50-off-comma-four** offers stay as **native
Shopify automatic discounts** (Shopify picks the best per item). This function
deliberately doesn't touch them — it emits an *order*-class discount scoped to
the comma four lines, so it layers on top instead of competing with the native
product discounts.

This extension was scaffolded with `shopify app generate extension` (Discounts
function → JavaScript). Our logic lives in
[`src/cart_lines_discounts_generate_run.js`](src/cart_lines_discounts_generate_run.js);
its input query (which cart fields Shopify hands the function at runtime) is
[`src/cart_lines_discounts_generate_run.graphql`](src/cart_lines_discounts_generate_run.graphql).
The resulting discounts are read + displayed by the storefront cart popup
(`src/store.js` → `getTotalDiscount`, `ShoppingCart.svelte`).

> The generator also created a `cart.delivery-options…` (shipping) target. We
> don't use it — it's a no-op unless a discount enables the SHIPPING class,
> which ours never does. Safe to leave or delete.

## Changing the rules

Tunables are constants at the top of `src/cart_lines_discounts_generate_run.js`:

| Constant | Meaning |
| --- | --- |
| `COMMA_FOUR_PRODUCT_ID` | comma four product GID (mirror of `src/lib/data/products.js`) |
| `BULK_TIER_QUANTITY` | comma four quantity that unlocks the bulk discount (`10`) |
| `BULK_ORDER_DISCOUNT_PERCENT` | percentage off the comma four value (`10`) |

After editing, re-run `shopify app deploy`.

## Prerequisites

- Membership in the comma Shopify **organization / Partner org** with the
  **App developer** role. (The store's staff "App development" permission is
  *not* enough — admin-created custom apps can't host Functions.)
- **Node ≥ 20.18 or 22** — older Node breaks the Shopify CLI.
- The Shopify CLI: `npm i -g @shopify/cli`.

## Deploy

From the repo root:

```bash
shopify app config link     # one-time: link to the comma app (creates shopify.app.toml)
shopify app deploy          # builds the Wasm + releases a new app version
```

If you change the input query, refresh the generated types first:
`cd extensions/comma-discounts && npm run typegen`.

Each deploy creates an auto-named app **version** (e.g. `comma-discounts-2`) —
that's just deploy history, not the function's name (which is the `handle`,
`comma-discounts`).

## Activate the discount (required, one-time)

Deploying only uploads the function — you still create one **automatic discount**
that uses it. This function has no admin config UI, so you **can't** set it up
from *Discounts → Create discount* (selecting the app there just shows "Find this
app in the pages where you work"). Create it via the Admin GraphQL API:

1. Install Shopify's **GraphiQL app**
   ([instructions](https://shopify.dev/docs/api/usage/api-exploration/admin-graphiql-explorer));
   grant it `write_discounts`.
2. Open it, set the API version to **2025-10 or later**, paste the mutation, run it.
3. Confirm `userErrors` is empty and a `discountId` comes back.

```graphql
mutation {
  discountAutomaticAppCreate(automaticAppDiscount: {
    title: "Free harness + bulk",
    functionHandle: "comma-discounts",
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

- `functionHandle` is this extension's `handle` (`comma-discounts`).
- `discountClasses: [PRODUCT, ORDER]` is what lets it apply both the free harness
  (product) **and** the bulk 10% (order). Omitting a class disables that half.
- `combinesWith` lets it stack with your other discounts (e.g. VIP codes) — each
  of those must *also* allow product/order combinations, or Shopify applies only
  the single best discount.

> Alternative (terminal): create a custom app in **Settings → Apps → Develop
> apps** with the `write_discounts` scope, then POST the same mutation to
> `https://<store>.myshopify.com/admin/api/2025-10/graphql.json` with the
> `X-Shopify-Access-Token` header.

After it runs, the discount appears in **Admin → Discounts** like any other
(activate/deactivate, analytics). A store can have up to 25 active function
discounts.
