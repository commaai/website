import '../main.js';
import { initProductPage } from '../lib/product-page.js';

// /shop/body renders the generic ProductPage TWICE (src/routes/shop/body/
// +page.svelte:26 and :191) — two independent Svelte instances in the
// original. initProductPage() binds the FIRST #product-item/#product-config
// (getElementById semantics); wire the second section's gallery and runtime
// price/button repaint here so both instances behave like the old site.
// The buy button stays dead in both (forceOutOfStock — Button.svelte never
// dispatches when disabled).
const controller = initProductPage();

const sections = document.querySelectorAll('section#product-item');
const second = sections[1];
if (second) {
  /* --- image gallery (Product.svelte:100-113), scoped to the 2nd instance --- */
  const previewPicture = second.querySelector('.preview picture');
  const thumbs = Array.from(second.querySelectorAll('.product-images button.variant'));
  thumbs.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      thumbs.forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
      // swap BOTH <source srcset> avif/webp AND <img src> in the preview
      const from = btn.querySelector('picture');
      for (const type of ['image/avif', 'image/webp']) {
        const fromSource = from.querySelector(`source[type="${type}"]`);
        const toSource = previewPicture.querySelector(`source[type="${type}"]`);
        if (fromSource && toSource) toSource.setAttribute('srcset', fromSource.getAttribute('srcset'));
      }
      previewPicture.querySelector('img').setAttribute('src', from.querySelector('img').getAttribute('src'));
    });
  });

  /* --- runtime refetch parity: the original's 2nd instance re-ran the
         universal load too and repainted price/button. One fetch serves both
         (same consolidation as the harness stock fetch) — mirror the 1st
         instance's painted state once its refetch settles. ------------------ */
  if (controller) {
    const first = sections[0];
    controller.ready.then(() => {
      const price = first.querySelector('.variant-selector .price');
      const buyBtn = first.querySelector('button.svelte-1io34pc');
      const price2 = second.querySelector('.variant-selector .price');
      const buyBtn2 = second.querySelector('button.svelte-1io34pc');
      if (price && price2) price2.textContent = price.textContent;
      if (buyBtn && buyBtn2) {
        buyBtn2.textContent = buyBtn.textContent;
        buyBtn2.classList.toggle('disabled', buyBtn.classList.contains('disabled'));
      }
    });
  }
}
