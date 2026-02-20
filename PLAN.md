# Astro Migration Plan

## Specific Goal and Instructions (from user)

- "i don't like that this project ships JS and chunks and complex stuff like that for such a simple site."
- "give me some options for simoplify this. rank by how easy the migration will be and how simple the new repo will be. i want dumb simple HTML"
- "i do want to keep the cart stuff."
- "i just don't want \"hydration\" and JS chunks and shit like that. just normal html+css+js over the wire"

## Objective

Migrate from SvelteKit to Astro while preserving shopping cart functionality, and ship a static site that serves plain HTML + CSS + vanilla JS without framework hydration/runtime chunks.

## Hard Constraints

- No framework hydration (`client:*` not allowed).
- No Svelte runtime in browser output.
- No app chunk graph like `build/_app/immutable/*`.
- Keep cart behavior (add to cart, quantity update, subtotal/discount display, checkout).
- Output remains Firebase-compatible (`build/`).

## Success Criteria

- Build output contains static pages and static assets.
- Browser JS is only explicit files from `public/js/*` (or inline scripts in HTML), not framework-generated runtime chunks.
- All existing primary routes continue to work:
  - `/`, `/openpilot`, `/connect`, `/vehicles`, `/setup`, `/support`, `/jobs`, `/terms`
  - `/shop`, `/shop/[product]`, `/shop/comma-four`, `/shop/body`, `/shop/comma-four-trade-in`
- Cart parity:
  - cart persists via `localStorage`
  - add/update lines works
  - discount/subtotal rendering works
  - checkout redirects correctly

## Proposed Architecture

- Astro static site (`output: "static"`, `outDir: "build"`).
- Shared HTML shell in `src/layouts/BaseLayout.astro`.
- Content/pages rendered as Astro templates (`.astro`), no client framework islands.
- Cart implemented as vanilla JS:
  - `public/js/shopify-api.js`
  - `public/js/cart-store.js`
  - `public/js/cart-ui.js`
  - `public/js/product-actions.js`
  - optional: `public/js/comma-four-config.js` for harness/trade-in flow
- Build-time config injection in layout:
  - expose Shopify storefront config to browser JS via a small inline `<script>` assigning `window.__SHOPIFY__`.

## Migration Plan (Phased)

### Phase 0 - Baseline + Guardrails

- Record route inventory and key flows.
- Add migration guardrails:
  - forbid `client:*` usage
  - verify no generated JS runtime chunks in build output
- Define parity checklist for nav/footer/cart/shop flows.

### Phase 1 - Astro Scaffold + Global Shell

- Add Astro dependencies/config.
- Set static output and `build` outDir.
- Port head/meta/analytics from `src/app.html`.
- Port global layout from `src/routes/+layout.svelte`:
  - header/nav
  - footer
  - mailing list section container
  - cart button and drawer mount points
- Port global styles from `src/app.css` and `src/space.css`.

### Phase 2 - Data + Utilities Conversion

- Convert Svelte module constants into plain data modules:
  - FAQ/support/product data
  - vehicles constants/meta
- Keep compatibility generation workflow (`scripts/compatibility.py`) and output files.
- Port RSS helpers currently used in load functions (`+layout.js`, `openpilot/+page.js`) into Astro build-time helpers.

### Phase 3 - Cart Core (Vanilla JS)

- Re-implement Shopify client calls from `src/lib/utils/shopify.js` in plain JS.
- Re-implement client state from `src/store.js` in plain JS store:
  - `cartId`, `checkoutUrl`, `cartCreatedAt`, `cartTotalQuantity`, lines, subtotal, discount
- Rebuild cart drawer UI behavior from `src/lib/components/ShoppingCart.svelte`:
  - open/close
  - line item rendering
  - quantity stepper
  - update line API calls
  - checkout navigation
- Bind cart triggers from static HTML via `data-*` attributes and event delegation.

### Phase 4 - Shop/Product Pages

- Port `/shop` and `/shop/[product]` pages to Astro templates.
- Keep product-specific pages:
  - `/shop/comma-four`
  - `/shop/body` (forced out-of-stock behavior)
  - `/shop/comma-four-trade-in`
- Preserve current product data strategy and variant IDs needed for add-to-cart.
- Add product page vanilla handlers for:
  - image variant switching
  - variant selection
  - add-to-cart (with optional additional product IDs and note)

### Phase 5 - Complex Interactions

- Port harness selector and comma-four configuration logic to vanilla JS:
  - searchable dropdown
  - trade-in option behavior
  - accessory auto-add logic
  - modal flow (if required by current UX)
- Replace Svelte-only widgets with semantic HTML + small JS where needed:
  - accordions/FAQ interaction
  - mobile menu behavior
  - mailing list submission behavior

### Phase 6 - Remaining Pages + Cleanup

- Port all remaining content pages to Astro.
- Remove SvelteKit-specific files/config:
  - `svelte.config.js`
  - SvelteKit deps/plugins
  - Svelte preprocess/image preprocess hooks
- Keep static assets in `public/` and verify redirects/headers in Firebase config.

### Phase 7 - Validation + Cutover

- Run full build and smoke test all routes.
- Validate no hydration/runtime chunks.
- Validate cart flow end-to-end in browser.
- Final cleanup and docs update (development/build commands).

## PR / Commit Breakdown (recommended)

1. Scaffold Astro + shared layout + global styles
2. Port data modules + content pages (no cart yet)
3. Implement vanilla cart API/store/UI
4. Port shop/product pages + add-to-cart wiring
5. Port comma-four/harness/trade-in interactions
6. Cleanup SvelteKit leftovers + final QA + docs

## Verification Checklist

- Build output:
  - no Svelte runtime files
  - no hydration directives used in source
  - no framework JS chunk graph
- Functional:
  - add item to cart
  - update quantity +/- and zero/removal behavior
  - subtotal/discount correct
  - checkout works
  - cart count in nav updates/persists after reload
  - comma-four special flow still works
- Content/SEO:
  - page titles and meta tags match current behavior
  - static pages under `public/*.html` still served

## Risks and Mitigations

- Risk: Cart parity regressions during rewrite  
  Mitigation: Port cart first with explicit parity checklist and side-by-side flow testing.
- Risk: Complex comma-four/harness logic drift  
  Mitigation: Isolate into dedicated script and test decision matrix with known cases.
- Risk: Shopify config handling in static context  
  Mitigation: Inject storefront config via layout script (`window.__SHOPIFY__`) and document required env vars.
- Risk: Hidden Svelte behavior loss (focus/hash/menu edge cases)  
  Mitigation: Add small targeted vanilla scripts for those exact interactions.

## Done Definition

Migration is complete when:

- site is Astro static build to `build/`
- cart works with parity
- no hydration/runtime chunked framework JS is shipped
- all major routes and SEO metadata are intact
- Firebase deploy path remains unchanged
