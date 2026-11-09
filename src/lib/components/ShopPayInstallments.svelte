<script context="module">
  import { browser } from "$app/environment";

  const SHOP_JS_URL = "https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.payment-terms.en.esm.js";

  // split mode hides shopify's text (we render it ourselves) and keeps only its shop logo and info button
  const BANNER_CSS = `
    #shopify-installments, #shopify-installments * {
      font-family: inherit !important;
      font-weight: inherit !important;
      letter-spacing: inherit !important;
    }
    :host([data-split]) { --size: var(--installments-rest-font-size, 0.875rem); }
    :host([data-split]) #shopify-installments { display: inline; }
    :host([data-split]) #shopify-installments-content { font-size: 0; }
    :host([data-split]) #shopify-installments-content > div { vertical-align: -0.2rem; }
    :host([data-split]) #shopify-installments-content svg {
      vertical-align: baseline;
      width: auto;
      height: min(14px, calc(var(--size) * 1.15));
    }
    :host([data-split]) #shopify-installments-cta { padding-right: 0; }
    :host([data-split]) #shopify-installments-cta svg {
      width: min(20px, calc(var(--size) * 1.45));
      height: min(20px, calc(var(--size) * 1.45));
    }
  `;

  // styles the banner's shadow DOM and reports its text (without the logo's title)
  async function styleBanner(node, onText) {
    await customElements.whenDefined("shopify-payment-terms");
    const root = node.shadowRoot;
    if (!root) return;
    const style = document.createElement("style");
    style.textContent = BANNER_CSS;
    const read = () => {
      // shopify's render can remove it. check parentNode, because isConnected is false once {#key} detaches this banner
      if (style.parentNode !== root) root.append(style);
      const content = root.getElementById("shopify-installments-content")?.cloneNode(true);
      content?.querySelectorAll("svg").forEach((svg) => svg.remove());
      onText(content?.textContent.replace(/\s+/g, " ").trim() ?? "");
    };
    new MutationObserver(read).observe(root, { childList: true, subtree: true, characterData: true });
    read();
  }

  // set by whichever banner was clicked last, since shopify's popup lives outside the component
  let activeCheckoutHandler = null;
  let scrollbarWidth = 0;

  if (browser) {
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
  // render "From $X/mo" and the rest of the banner as two separately styled lines, with a skeleton and a fallback
  export let split = false;

  let pricing = null; // null until loaded, {} if loading failed
  let text = "";
  $: meta = pricing && installmentsMeta({ ...pricing, amount, variantId });
  $: [, lead = "", rest = ""] = (meta && text.match(/^(From \S+\/mo) ?(.*)$/)) || [];
  $: loading = !pricing || (meta && !text);

  function handleClick() {
    activeCheckoutHandler = onCheckout;
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  }

  onMount(async () => {
    try {
      const [shopPricing, variantPricing] = await Promise.all([
        getShopInstallmentsPricing(),
        variantId && getVariantInstallmentsPricing(variantId),
        import(/* @vite-ignore */ SHOP_JS_URL),
      ]);
      pricing = { shopPricing, variantPricing };
    } catch (error) {
      console.error(error);
      pricing = {};
    }
  });
</script>

{#if split && loading}
  <span class="split skeleton" aria-hidden="true">
    <span class="lead"><span class="bar">From $00.00/mo</span></span>
    <span class="rest"><span class="bar">or 0% APR with shop ⓘ</span></span>
  </span>
{:else if split && !lead}
  <span class="fallback">View installment options at checkout</span>
{/if}
{#if meta}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class:split class:pending={split && !lead} on:click|capture={handleClick}>
    {#if split}
      <span class="lead">{lead}</span>
    {/if}
    <div class="rest">
      {#if split}{rest}{/if}
      {#key amount}
        <shopify-payment-terms
          use:styleBanner={(value) => (text = value)}
          data-split={split ? "" : undefined}
          variant-id={meta.variants?.[0].id ?? ""}
          shopify-meta={JSON.stringify(meta)}
        ></shopify-payment-terms>
      {/key}
    </div>
  </div>
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
      min-height: 1.89em;
      font-size: var(--installments-rest-font-size, 0.875rem);
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
