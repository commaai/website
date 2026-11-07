<script context="module">
  const SHOP_JS_URL = "https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.payment-terms.en.esm.js";

  const BANNER_CSS = `
    #shopify-installments, #shopify-installments * {
      font-family: inherit !important;
      font-weight: inherit !important;
      letter-spacing: inherit !important;
    }
    :host([data-split]) #shopify-installments { display: inline; }
    :host([data-split]) #shopify-installments-content { font-size: 0; }
    :host([data-split]) #shopify-installments-content svg { vertical-align: baseline; }
    :host([data-split]) #shopify-installments-content > div { vertical-align: -0.2rem; }
  `;

  async function styleBanner(node, onText) {
    await customElements.whenDefined("shopify-payment-terms");
    const root = node.shadowRoot;
    if (!root) return;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(BANNER_CSS);
    root.adoptedStyleSheets.push(sheet);
    const read = () => {
      const content = root.getElementById("shopify-installments-content");
      if (!content) return onText("");
      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
        acceptNode: (t) => (t.parentElement.closest("svg") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
      });
      let text = "";
      while (walker.nextNode()) text += walker.currentNode.data;
      onText(text.replace(/\s+/g, " ").trim());
    };
    new MutationObserver(read).observe(root, { childList: true, subtree: true, characterData: true });
    read();
  }

  let activeCheckoutHandler = null;
  let scrollbarWidth = 0;
  let installed = false;
  function install() {
    if (installed) return;
    installed = true;

    // shopify's popup hides the scrollbar (`overflow: hidden` on <html>), so pad its width to keep the page from shifting
    const html = document.documentElement;
    new MutationObserver(() => {
      const padding = html.style.overflow === "hidden" && scrollbarWidth ? `${scrollbarWidth}px` : "";
      if (html.style.paddingRight !== padding) html.style.paddingRight = padding;
    }).observe(html, { attributeFilter: ["style"] });

    // shopify's "Continue to checkout" goes to /cart or /checkout on comma.ai, which don't exist, so reroute it
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

  export let amount = 0;
  export let variantId = null;
  export let onCheckout = null;
  export let split = false;

  let ready = false;
  let failed = false;
  let text = "";
  let shopPricing;
  let variantPricing;
  $: pricingLoaded = shopPricing !== undefined && (!variantId || variantPricing !== undefined);
  $: meta = installmentsMeta({ shopPricing, amount, variantId, variantPricing });
  $: offered = Boolean(ready && meta);
  $: match = text.match(/^(From \S+\/mo) ?(.*)$/);
  $: [, lead = "", rest = ""] = match ?? [];
  $: loading = !failed && (!ready || !pricingLoaded || (offered && !text));

  function handleClick() {
    activeCheckoutHandler = onCheckout;
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  }

  onMount(() => {
    install();
    const fail = (error) => {
      console.error(error);
      failed = true;
    };
    import(/* @vite-ignore */ SHOP_JS_URL).then(() => (ready = true), fail);
    getShopInstallmentsPricing().then((pricing) => (shopPricing = pricing), fail);
    if (variantId) getVariantInstallmentsPricing(variantId).then((pricing) => (variantPricing = pricing), fail);
  });
</script>

{#if split && loading}
  <span class="split skeleton" aria-hidden="true">
    <span class="lead"><span class="bar">From $00.00/mo</span></span>
    <span class="rest"><span class="bar">or 0% APR with shop ⓘ</span></span>
  </span>
{/if}
{#if offered}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="installments" class:split class:pending={split && (loading || !match)} on:click|capture={handleClick}>
    {#if split}
      <span class="lead">{lead}</span>
    {/if}
    <div class="rest">
      {#if split}{rest}{/if}
      {#key amount}
        <shopify-payment-terms
          use:styleBanner={(value) => (text = value)}
          data-split={split ? "" : undefined}
          variant-id={variantId ? meta.variants[0].id : ""}
          shopify-meta={JSON.stringify(meta)}
        ></shopify-payment-terms>
      {/key}
    </div>
  </div>
{/if}
{#if split && !loading && !(offered && match)}
  <span class="fallback">View installment options at checkout</span>
{/if}

<style>
  .pending {
    position: absolute;
    visibility: hidden;
  }

  .fallback {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .skeleton .bar {
    color: transparent;
    border-radius: 0.25rem;
    background-color: rgba(0, 0, 0, 0.08);
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton .bar {
      animation: none;
    }
  }

  .split {
    display: flex;
    flex-direction: column;

    & .lead {
      white-space: nowrap;
    }

    & .rest {
      min-height: 1.65rem;
      font-size: var(--installments-rest-font-size, 0.875rem);
      white-space: var(--installments-rest-white-space, normal);
      color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
