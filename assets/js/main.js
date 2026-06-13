/**
 * Global shell behaviors on every page (port of src/routes/+layout.svelte,
 * ShoppingCart.svelte, SteppableInput.svelte, MailingListForm.svelte and
 * src/lib/utils/console.js):
 *   - Shopify config injection (from hugo.toml params, keys lowercased)
 *   - cart bootstrap (refreshCart on every page load)
 *   - header cart button: inserted/removed from the DOM as cartTotalQuantity
 *     changes (NOT merely hidden — the mobile `:first-child:not(:only-child)`
 *     CSS rule depends on the node count). First paint uses the synchronous
 *     localStorage value, reconciled once Shopify responds.
 *   - cart drawer: client-rendered between </header> and the banner while
 *     showCart is true; overlay/× click and Escape close it; SteppableInput
 *     quantity updates, line removal (qty 0), checkout, discount/subtotal.
 *   - #mailing-list hash focus (300 ms; on load and hashchange)
 *   - mailing-list JSONP submit (Mailchimp only answers JSONP, not CORS)
 *   - console banner
 */
import * as params from '@params';
import { init as initShopify, updateCart } from './lib/shopify.js';
import {
  get,
  cartId,
  checkoutUrl,
  cartTotalQuantity,
  showCart,
  cartItems,
  cartDiscount,
  cartSubtotal,
  refreshCart,
  openCart,
} from './lib/cart.js';
import { formatCurrency } from './lib/currency.js';

initShopify({
  storeUrl: params.shopify.storeurl,
  apiVersion: params.shopify.apiversion,
  apiToken: params.shopify.storefrontapitoken,
});

// --- console banner (src/lib/utils/console.js) ------------------------------

function printConsoleBanner() {
  console.log(`
                          .~ssos+.
                        +8888888888i,
                      {888888888888o.
                      h8888888888888k
                      t888888888s888k
                        \`t88888d/ h88k
                          \`\`\`    h88l
                                ,88k\`
                                .d8h\`
                              +d8h
                            _+d8h\`
                          ;y8h+\`
                          |-\`

                    https://comma.ai/jobs
    `);
}

printConsoleBanner();

// loading flag — bound between layout and drawer in Svelte but never rendered
// anywhere (vestigial; kept for parity).
let loading = false;

function hideCart() {
  showCart.set(false);
}

// +layout.svelte updateProduct(event)
async function updateProduct({ variantId, quantity, lineId }) {
  await updateCart({
    cartId: get(cartId),
    lineId: lineId,
    quantity: quantity,
    variantId: variantId,
  });
  await refreshCart();
  loading = false;
}

// --- header cart button (client-only, conditional on cartTotalQuantity > 0) --

// src/lib/icons/ui/cart.svg, verbatim (it shipped inside the JS bundle on the
// old site too — `?raw` import in +layout.svelte).
const CART_ICON = `<svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path d="M24.6 3.6c-.3-.4-.8-.6-1.3-.6h-18.4l-.1-.5c-.3-1.5-1.7-1.5-2.5-1.5h-1.3c-.6 0-1 .4-1 1s.4 1 1 1h1.8l3 13.6c.2 1.2 1.3 2.4 2.5 2.4h12.7c.6 0 1-.4 1-1s-.4-1-1-1h-12.7c-.2 0-.5-.4-.6-.8l-.2-1.2h12.6c1.3 0 2.3-1.4 2.5-2.4l2.4-7.4v-.2c.1-.5-.1-1-.4-1.4zm-4 8.5v.2c-.1.3-.4.8-.5.8h-13l-1.8-8.1h17.6l-2.3 7.1z"></path>
    <circle cx="9" cy="22" r="2"></circle>
    <circle cx="19" cy="22" r="2"></circle>
  </g>
</svg>
`;

let cartButtonEl = null;

function renderCartButton(quantity) {
  const container = document.querySelector('.navbar-section-buttons');
  if (!container) return;
  if (quantity > 0) {
    if (!cartButtonEl) {
      cartButtonEl = document.createElement('button');
      cartButtonEl.className = 'button cart svelte-uhk6nj';
      cartButtonEl.innerHTML = CART_ICON + ' <div class="cart-text svelte-uhk6nj"></div>';
      cartButtonEl.addEventListener('click', openCart);
      container.appendChild(cartButtonEl);
    }
    cartButtonEl.querySelector('.cart-text').textContent = `cart (${quantity})`;
  } else if (cartButtonEl) {
    cartButtonEl.remove();
    cartButtonEl = null;
  }
}

// subscribe fires immediately with the localStorage-derived value, so the
// button shows synchronously (pre-network), then reconciles after refreshCart.
cartTotalQuantity.subscribe(renderCartButton);

// --- cart drawer (ShoppingCart.svelte, scope svelte-10ouxai) -----------------

let overlayEl = null;
let sidemenuEl = null;
let inventoryEl = null;
let footerEl = null;

// SteppableInput.svelte (scope svelte-1m6ox4m). Not clamped: decrement at 0
// sends -1, like the original.
function buildSteppableInput(label, value, onChange) {
  const root = document.createElement('div');
  root.className = 'svelte-1m6ox4m';

  const dec = document.createElement('button');
  dec.className = 'svelte-1m6ox4m';
  dec.setAttribute('aria-label', `Decrement ${label}`);
  dec.textContent = '-';

  const input = document.createElement('input');
  input.type = 'number';
  input.min = '0';
  input.setAttribute('aria-label', label);
  input.className = 'svelte-1m6ox4m';
  input.value = value;

  const inc = document.createElement('button');
  inc.className = 'svelte-1m6ox4m';
  inc.setAttribute('aria-label', `Increment ${label}`);
  inc.textContent = '+';

  // svelte's bind:value to_number coercion ('' -> null)
  const toNumber = () => (input.value === '' ? null : +input.value);
  dec.addEventListener('click', () => onChange(toNumber() - 1));
  inc.addEventListener('click', () => onChange(toNumber() + 1));
  input.addEventListener('change', () => onChange(toNumber()));

  root.append(dec, ' ', input, ' ', inc);
  return root;
}

function buildItem(item) {
  const el = document.createElement('div');
  el.className = 'item';
  el.dataset.lineId = item.node.id;

  // dynamic-src images stay inside a bare <picture> wrapper (preprocessor)
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  img.setAttribute('alt', item.node.merchandise.product.title);
  img.setAttribute('decoding', 'async');
  img.setAttribute('loading', 'lazy');
  img.setAttribute('src', item.node.merchandise.product.images.edges[0].node.originalSrc);
  picture.appendChild(img);

  const details = document.createElement('div');
  details.className = 'details';

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = item.node.merchandise.product.title;
  details.append(title, ' ');

  if (item.node.merchandise.title !== 'Default Title') {
    const variant = document.createElement('div');
    variant.className = 'variant';
    variant.textContent = item.node.merchandise.title;
    details.append(variant, ' ');
  }

  // Space.svelte multiplier={0.5}
  const space = document.createElement('div');
  space.style.height = '0.5rem';
  details.append(space, ' ');

  details.appendChild(
    buildSteppableInput('quantity', item.node.quantity, (nextQuantity) => {
      // ShoppingCart.svelte updateProductQuantity
      loading = true;
      updateProduct({
        variantId: item.node.merchandise.id,
        quantity: nextQuantity,
        lineId: item.node.id,
      });
    })
  );

  const price = document.createElement('div');
  price.textContent = formatCurrency(item.node.estimatedCost.totalAmount);

  el.append(picture, ' ', details, ' ', price);
  return el;
}

function buildPriceRow(labelText, valueNode) {
  const row = document.createElement('div');
  row.className = 'price';
  const label = document.createElement('span');
  label.textContent = labelText;
  const value = document.createElement('span');
  if (typeof valueNode === 'string') value.textContent = valueNode;
  else value.append(...valueNode);
  row.append(label, ' ', value);
  return row;
}

function checkout() {
  loading = true;
  window.open(get(checkoutUrl), '_self');
  loading = false;
}

function renderDrawerContents() {
  const items = get(cartItems);

  // Svelte updated quantity rows in place, so focus survived a cart reload;
  // we rebuild the list, so capture and restore the focused stepper control.
  let refocus = null;
  const active = document.activeElement;
  if (active && inventoryEl.contains(active)) {
    const itemEl = active.closest('[data-line-id]');
    if (itemEl) {
      refocus = {
        lineId: itemEl.dataset.lineId,
        role: active.matches('input') ? 'input' : active.textContent,
      };
    }
  }

  inventoryEl.textContent = '';
  if (items?.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'Your cart is empty.';
    inventoryEl.appendChild(empty);
  }
  for (const item of items || []) {
    inventoryEl.appendChild(buildItem(item));
  }

  if (refocus) {
    const itemEl = inventoryEl.querySelector(`[data-line-id="${CSS.escape(refocus.lineId)}"]`);
    if (itemEl) {
      const target =
        refocus.role === 'input'
          ? itemEl.querySelector('input[type="number"]')
          : [...itemEl.querySelectorAll('button')].find((b) => b.textContent === refocus.role);
      if (target) target.focus();
    }
  }

  footerEl.textContent = '';
  if (items?.length !== 0) {
    const discount = get(cartDiscount);
    const subtotal = get(cartSubtotal);
    // Svelte renders a collapsed-whitespace text node between sibling elements.
    const space = () => footerEl.appendChild(document.createTextNode(' '));
    if (discount) {
      const subtotalAmountAfterDiscount = subtotal.amount - discount.amount;
      footerEl.appendChild(buildPriceRow('Bulk Order Discount', `-${formatCurrency(discount)}`));
      space();
      const s = document.createElement('s');
      s.textContent = formatCurrency(subtotal);
      footerEl.appendChild(
        buildPriceRow('Subtotal', [
          s,
          ` ${formatCurrency({ amount: subtotalAmountAfterDiscount, currencyCode: subtotal.currencyCode })}`,
        ])
      );
    } else {
      footerEl.appendChild(buildPriceRow('Subtotal', formatCurrency(subtotal)));
    }
    space();

    const disclaimer = document.createElement('div');
    disclaimer.className = 'disclaimer';
    disclaimer.textContent = 'Customs/duties/taxes are between you and your country.';
    footerEl.appendChild(disclaimer);
    space();

    // Button.svelte: style="accent" fullWidth
    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'svelte-1io34pc accent full-width';
    checkoutBtn.textContent = 'Checkout';
    checkoutBtn.addEventListener('click', checkout);
    footerEl.appendChild(checkoutBtn);
  }
}

function mountDrawer() {
  overlayEl = document.createElement('div');
  overlayEl.className = 'overlay svelte-10ouxai';
  overlayEl.setAttribute('role', 'presentation');
  overlayEl.addEventListener('click', hideCart);

  sidemenuEl = document.createElement('div');
  sidemenuEl.className = 'sidemenu svelte-10ouxai';
  sidemenuEl.setAttribute('role', 'dialog');
  sidemenuEl.setAttribute('aria-modal', 'true');

  const header = document.createElement('div');
  header.className = 'header svelte-10ouxai';
  const headerTitle = document.createElement('span');
  headerTitle.textContent = 'Your Cart';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', hideCart);
  header.append(headerTitle, ' ', closeBtn);

  inventoryEl = document.createElement('div');
  inventoryEl.className = 'inventory svelte-10ouxai';

  footerEl = document.createElement('div');
  footerEl.className = 'footer svelte-10ouxai';

  sidemenuEl.append(header, ' ', inventoryEl, ' ', footerEl);
  renderDrawerContents();

  // mount point: between </header> and the HeaderBanner
  const navbar = document.querySelector('header.navbar');
  if (navbar) navbar.after(overlayEl, sidemenuEl);
}

function unmountDrawer() {
  overlayEl?.remove();
  sidemenuEl?.remove();
  overlayEl = sidemenuEl = inventoryEl = footerEl = null;
}

showCart.subscribe((open) => {
  if (open && !sidemenuEl) mountDrawer();
  else if (!open && sidemenuEl) unmountDrawer();
});

// re-render the open drawer whenever the cart data changes (refreshCart)
for (const store of [cartItems, cartDiscount, cartSubtotal]) {
  store.subscribe(() => {
    if (sidemenuEl) renderDrawerContents();
  });
}

// --- mailing list (MailingListForm.svelte, scope svelte-q96sfc) --------------

function setupMailingListForm(form) {
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('input[type="submit"]');
  if (!emailInput || !submitBtn) return;

  // disabled={email.length === 0}
  emailInput.addEventListener('input', () => {
    submitBtn.disabled = emailInput.value.length === 0;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = new URLSearchParams(formData);
    const script = document.createElement('script');
    const callbackName = 'mailchimpFormSubmit_' + Math.random().toString(36).substr(2, 9);
    script.src = `https://comma.us12.list-manage.com/subscribe/post?u=e127cf7151180db2b566d880b&id=f150bd2a9c&EMAIL=${searchParams.get('email')}&Email=${searchParams.get('email')}&c=${callbackName}`;

    window[callbackName] = function (response) {
      const result = document.createElement('div');
      if (response.result === 'success') {
        result.className = 'success svelte-q96sfc';
        const p = document.createElement('p');
        p.textContent = 'Thanks for signing up! We only send emails we would want to receive.';
        result.appendChild(p);
      } else {
        result.className = 'error svelte-q96sfc';
        const p1 = document.createElement('p');
        p1.textContent = 'Oops! Something went wrong while submitting the form.';
        const p2 = document.createElement('p');
        p2.innerHTML = response.msg; // {@html error.message} — Mailchimp returns HTML
        result.append(p1, ' ', p2);
      }
      form.replaceWith(result);
      document.body.removeChild(script);
      delete window[callbackName];
    };

    document.body.appendChild(script);
  });
}

document.querySelectorAll('form[aria-label="Email Form"]').forEach(setupMailingListForm);

// --- layout onMount (+layout.svelte:60–81) -----------------------------------

// Focus mailing list input when hash is #mailing-list
const focusMailingList = () => {
  if (window.location.hash === '#mailing-list') {
    setTimeout(() => {
      const input = document.querySelector('#mailing-list input[type="email"]');
      if (input) input.focus();
    }, 300);
  }
};

(async () => {
  await refreshCart();
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showCart.set(false);
    }
  });

  // Check on load and on hash change
  focusMailingList();
  window.addEventListener('hashchange', focusMailingList);
})();
