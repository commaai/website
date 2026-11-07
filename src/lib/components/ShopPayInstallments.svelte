<script context="module">
  // The same module Shopify themes load for the banner
  const SHOP_JS_URL = "https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.payment-terms.en.esm.js";

  // Use the page font for the banner text (the popup renders elsewhere and keeps Shopify's font)
  async function usePageFont(node) {
    await customElements.whenDefined("shopify-payment-terms");
    const sheet = new CSSStyleSheet();
    sheet.replaceSync("#shopify-installments, #shopify-installments * { font-family: inherit !important; }");
    node.shadowRoot?.adoptedStyleSheets.push(sheet);
  }

  let activeCheckoutHandler = null;
  let scrollbarWidth = 0;
  let installed = false;
  function install() {
    if (installed) return;
    installed = true;

    // Shopify's popup hides the scrollbar (`overflow: hidden` on <html>), so pad its width to keep the page from shifting
    const html = document.documentElement;
    new MutationObserver(() => {
      const padding = html.style.overflow === "hidden" && scrollbarWidth ? `${scrollbarWidth}px` : "";
      if (html.style.paddingRight !== padding) html.style.paddingRight = padding;
    }).observe(html, { attributeFilter: ["style"] });

    // Shopify's "Continue to checkout" goes to /cart or /checkout on comma.ai, which don't exist, so reroute it
    document.addEventListener("click", (event) => {
      const path = event.composedPath();
      const isPopupCheckout = path.some(
        (node) => node.getAttribute?.("data-testid")?.startsWith("sample-plans-modal-continue-to-checkout")
      );
      if (!isPopupCheckout || !activeCheckoutHandler) return;
      event.preventDefault();
      event.stopPropagation();

      const dialog = path.find((node) => node.getAttribute?.("role") === "dialog");
      dialog?.querySelector('[data-testid="authorize-modal-close-button"]')?.click();

      activeCheckoutHandler();
    }, true);
  }
</script>

<script>
  import { onMount } from "svelte";
  import { getShopInstallmentsPricing, getVariantInstallmentsPricing } from "$lib/utils/shopify";
  import { installmentsMeta } from "$lib/utils/installments.js";

  // Amount the customer pays (USD)
  export let amount = 0;
  // Product page variant; omit for the cart banner
  export let variantId = null;
  export let onCheckout = null;
  // Until a variant is selected, Shopify shows its generic banner and popup (no checkout button)
  export let variantSelected = true;

  let ready = false;
  let shopPricing = null;
  let variantPricing = null;
  $: meta = installmentsMeta({ shopPricing, amount, variantId, variantPricing });

  // Runs before the popup opens, while the scrollbar is still measurable
  function handleClick() {
    activeCheckoutHandler = onCheckout;
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  }

  onMount(() => {
    install();
    import(/* @vite-ignore */ SHOP_JS_URL).then(() => (ready = true), console.error);
    getShopInstallmentsPricing().then((pricing) => (shopPricing = pricing));
    if (variantId) getVariantInstallmentsPricing(variantId).then((pricing) => (variantPricing = pricing));
  });
</script>

{#if ready && meta}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="installments" on:click|capture={handleClick}>
    <!-- Shopify's banner doesn't revert to generic when the variant is cleared, so recreate it -->
    {#key variantSelected}
      <shopify-payment-terms
        use:usePageFont
        variant-id={variantId && variantSelected ? meta.variants[0].id : ""}
        shopify-meta={JSON.stringify(meta)}
      ></shopify-payment-terms>
    {/key}
  </div>
{/if}

<style>
  .installments {
    margin: 0.75rem 0;
  }
</style>
