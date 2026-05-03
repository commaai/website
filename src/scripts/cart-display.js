import {
  cartEvents,
  loadCart,
  getCheckoutUrl,
  getCartTotalQuantity,
  updateProductQuantity,
} from '$scripts/cart.js';
import { formatCurrency } from '$lib/utils/currency.js';

function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

function updateCartButton() {
  const total = getCartTotalQuantity();
  const cartBtn = $('#cart-button');
  const cartCount = $('#cart-count');
  if (!cartBtn) return;
  if (total > 0) {
    cartBtn.style.display = '';
    if (cartCount) cartCount.textContent = String(total);
  } else {
    cartBtn.style.display = 'none';
  }
}

function renderCart(state) {
  const inventory = $('[data-cart-inventory]');
  const footer = $('[data-cart-footer]');
  if (!inventory || !footer) return;

  const items = state.items || [];

  if (items.length === 0) {
    inventory.innerHTML = '<div class="empty">Your cart is empty.</div>';
  } else {
    inventory.innerHTML = items.map((edge) => {
      const node = edge.node;
      const merch = node.merchandise;
      const product = merch.product;
      const img = product.images.edges[0]?.node;
      const variantTitle = merch.title !== 'Default Title' ? `<div class="variant">${merch.title}</div>` : '';
      return `
        <div class="item">
          <img alt="${product.title}" decoding="async" src="${img?.originalSrc ?? ''}" />
          <div class="details">
            <div class="title">${product.title}</div>
            ${variantTitle}
            <div style="height: 0.5rem"></div>
            <div class="steppable-input" data-line-id="${node.id}" data-variant-id="${merch.id}">
              <button class="step-down" aria-label="Decrement quantity">-</button>
              <input type="number" min="0" aria-label="quantity" value="${node.quantity}" />
              <button class="step-up" aria-label="Increment quantity">+</button>
            </div>
          </div>
          <div>${formatCurrency(node.estimatedCost.totalAmount)}</div>
        </div>
      `;
    }).join('');

    inventory.querySelectorAll('.steppable-input').forEach((el) => {
      const lineId = el.dataset.lineId;
      const variantId = el.dataset.variantId;
      const input = el.querySelector('input');
      const update = async (qty) => {
        await updateProductQuantity({ lineId, variantId, quantity: qty });
      };
      el.querySelector('.step-down').addEventListener('click', () => {
        const next = Number(input.value) - 1;
        update(next);
      });
      el.querySelector('.step-up').addEventListener('click', () => {
        const next = Number(input.value) + 1;
        update(next);
      });
      input.addEventListener('change', () => {
        update(Number(input.value));
      });
    });
  }

  if (items.length === 0) {
    footer.innerHTML = '';
    return;
  }

  const subtotal = state.subtotal;
  const discount = state.discount;
  let html = '';
  if (discount && subtotal) {
    const subtotalAfter = subtotal.amount - discount.amount;
    html += `
      <div class="price">
        <span>Bulk Order Discount</span>
        <span>-${formatCurrency(discount)}</span>
      </div>
      <div class="price">
        <span>Subtotal</span>
        <span><s>${formatCurrency(subtotal)}</s> ${formatCurrency({ amount: subtotalAfter, currencyCode: subtotal.currencyCode })}</span>
      </div>
    `;
  } else if (subtotal) {
    html += `
      <div class="price">
        <span>Subtotal</span>
        <span>${formatCurrency(subtotal)}</span>
      </div>
    `;
  }
  html += `
    <div class="disclaimer">Customs/duties/taxes are between you and your country.</div>
    <button class="checkout-btn" data-cart-checkout>Checkout</button>
  `;
  footer.innerHTML = html;

  footer.querySelector('[data-cart-checkout]')?.addEventListener('click', () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, '_self');
  });
}

function showCartDrawer() {
  const root = $('#shopping-cart');
  if (root) root.style.display = '';
}

function hideCartDrawer() {
  const root = $('#shopping-cart');
  if (root) root.style.display = 'none';
}

function init() {
  // Initial cart count from localStorage
  updateCartButton();

  // Wire close buttons
  $$('[data-cart-close]').forEach((el) => {
    el.addEventListener('click', hideCartDrawer);
  });

  // Open cart on button click
  const openBtn = $('#cart-button');
  if (openBtn) {
    openBtn.addEventListener('click', async () => {
      await loadCart();
      showCartDrawer();
    });
  }

  // Listen for cart events
  cartEvents.addEventListener('change', (e) => {
    renderCart(e.detail);
    updateCartButton();
  });
  cartEvents.addEventListener('show', async () => {
    await loadCart();
    showCartDrawer();
  });
  cartEvents.addEventListener('hide', () => hideCartDrawer());

  // Escape closes the cart
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideCartDrawer();
  });

  // Refresh cart total quantity on initial load (best-effort)
  // We don't auto-load to avoid hitting Shopify on every page; mirror layout's onMount.
  loadCart().catch(() => {});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
