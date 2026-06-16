# comma-discounts

A Shopify [discount function](https://shopify.dev/docs/apps/build/discounts/build-discount-function)
for the comma store, with a small admin UI (`../comma-discount-settings`) to turn
it on.

**Current rule:** ≥ 10 comma four in the cart → **10% off the comma four value**.
It's an order-class discount scoped to the comma four lines, so it stacks on top
of the native per-item discounts (Shopify applies product discounts first, order
discounts after).

The free car harness / $50-off-comma-four offers are native Shopify discounts;
this function only adds the bulk tier (free-harness logic may move in here later).

- Logic: [`src/cart_lines_discounts_generate_run.js`](src/cart_lines_discounts_generate_run.js)
- Input query (cart fields the function receives): [`src/cart_lines_discounts_generate_run.graphql`](src/cart_lines_discounts_generate_run.graphql)

## Changing the rules

Constants at the top of `cart_lines_discounts_generate_run.js`:

| Constant | Meaning |
| --- | --- |
| `COMMA_FOUR_PRODUCT_ID` | comma four product GID (mirror of `src/lib/data/products.js`) |
| `BULK_TIER_QUANTITY` | comma four quantity that unlocks the discount (`10`) |
| `BULK_ORDER_DISCOUNT_PERCENT` | percentage off the comma four value (`10`) |

After editing, re-run `shopify app deploy`.

## Prerequisites

- Membership in the comma Shopify org with the **App developer** role.
- **Node ≥ 20.18 or 22**, and the Shopify CLI (`npm i -g @shopify/cli`).

## Deploy

From the repo root:

```bash
shopify app config link   # one-time: link to the comma app
shopify app deploy        # builds + releases a new app version
```

## Activate

Deploying only uploads the function — you create the discount once in the admin.
The `comma-discount-settings` UI extension powers this, so it's just:

**Admin → Discounts → Create discount → comma-discounts** → in the settings panel
tick **Order**, set a title + combinations + Active → **Save**.

No GraphQL needed. The discount then shows in **Admin → Discounts** like any other.
