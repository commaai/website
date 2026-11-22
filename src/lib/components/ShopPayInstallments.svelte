<script context="module">
  import { browser } from "$app/environment";

  const SHOP_JS_URL = "https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.payment-terms.en.esm.js";
  const LOADING_TIMEOUT_MS = 8000;

  // split mode hides shopify's text (we render it ourselves) and keeps only its shop logo and info button
  const BANNER_CSS = `
    #shopify-installments, #shopify-installments * {
      font-family: inherit !important;
      font-weight: inherit !important;
      letter-spacing: inherit !important;
    }
    :host([data-split]) {
      --size: var(--installments-rest-font-size, 0.875rem);
      line-height: inherit;
    }
    :host([data-split]) #shopify-installments {
      display: inline;
      line-height: inherit;
    }
    :host([data-split]) #shopify-installments-content { font-size: 0; }
    :host([data-split]) [data-testid="zero-apr-badge"] { display: none; }
    :host([data-split]) #shopify-installments-content > div { vertical-align: -0.2rem; }
    :host([data-split]) #shopify-installments-content svg {
      vertical-align: baseline;
      width: auto;
      height: min(14px, calc(var(--size) * 1.15));
    }
    /* top-aligned and no taller than the line, so the info button never grows the row past the skeleton's height */
    :host([data-split]) #shopify-installments-cta {
      display: inline-flex;
      align-items: center;
      height: 1lh;
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
      font-size: inherit;
      line-height: inherit;
      vertical-align: top;
    }
    :host([data-split]) #shopify-installments-cta svg {
      width: min(20px, calc(var(--size) * 1.45), 1lh);
      height: min(20px, calc(var(--size) * 1.45), 1lh);
    }
  `;

  function styleBanner(node, setRendered) {
    let destroyed = false;
    let observer = null;
    customElements.whenDefined("shopify-payment-terms").then(() => {
      const root = node.shadowRoot;
      if (destroyed || !root) return;
      const style = document.createElement("style");
      style.textContent = BANNER_CSS;
      const read = () => {
        if (style.parentNode !== root) root.append(style);
        setRendered(Boolean(root.getElementById("shopify-installments-content")?.textContent.trim()));
      };
      observer = new MutationObserver(read);
      observer.observe(root, { childList: true, subtree: true, characterData: true });
      read();
    });
    return {
      destroy() {
        destroyed = true;
        observer?.disconnect();
      },
    };
  }

  let activeCheckoutHandler = null;
  let scrollbarWidth = 0;

  if (browser) {
    const html = document.documentElement;
    new MutationObserver(() => {
      const padding = html.style.overflow === "hidden" && scrollbarWidth ? `${scrollbarWidth}px` : "";
      if (html.style.paddingRight !== padding) html.style.paddingRight = padding;
    }).observe(html, { attributeFilter: ["style"] });

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
  import { installmentsMeta, monthlyPlan, usd } from "$lib/utils/installments.js";

  export let amount = 0;
  export let variantId = null;
  export let onCheckout = null;
  export let split = false;
  export let inline = false;
  export let timedOut = false;

  let pricing = null; // null until loaded, {} if loading failed
  let rendered = false;
  $: meta = !timedOut && pricing && installmentsMeta({ ...pricing, amount, variantId });
  $: plan = meta && monthlyPlan(pricing.shopPricing, amount);
  $: loading = !timedOut && (!pricing || (meta && !rendered));

  function handleClick() {
    activeCheckoutHandler = onCheckout;
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  }

  onMount(() => {
    const timeout = setTimeout(() => {
      if (loading) timedOut = true;
    }, LOADING_TIMEOUT_MS);
    loadPricing();
    return () => clearTimeout(timeout);
  });

  async function loadPricing() {
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
  }
</script>

{#if split && loading}
  <!-- same elements as the real banner below, so page styles lay both out alike -->
  <div class="split skeleton" class:inline aria-hidden="true">
    <span class="lead"><span class="bar">From $00.00/mo</span></span>
    <div class="rest"><span class="bar">or 0% APR with shop ⓘ</span></div>
  </div>
{:else if split && (!plan || timedOut)}
  <span class="fallback" class:inline>View installment options at checkout</span>
{:else if loading}
  <!-- holds the cart's two-line banner open so the cart footer doesn't jump when it renders -->
  <div class="banner-placeholder" aria-hidden="true"></div>
{/if}
{#if meta}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class:split class:inline class:pending={!rendered || (split && !plan)} on:click|capture={handleClick}>
    {#if split}
      <span class="lead">From <strong>{usd.format(plan?.payment ?? 0)}/mo</strong></span>
    {/if}
    <div class="rest">
      {#if split}{plan?.hasZeroApr ? "or 0% APR with " : "with "}{/if}
      <shopify-payment-terms
        use:styleBanner={(value) => (rendered = value)}
        data-split={split ? "" : undefined}
        variant-id={meta.variants?.[0].id ?? ""}
        shopify-meta={JSON.stringify(meta)}
      ></shopify-payment-terms>
    </div>
  </div>
{/if}

<style>
  .pending {
    position: absolute;
    visibility: hidden;
  }

  .banner-placeholder {
    height: 3.25rem;
  }

  .fallback {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);

    &.inline {
      font-size: inherit;
      color: inherit;
    }
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

      & strong {
        font-weight: inherit;
      }
    }

    & .rest {
      min-height: 1.89em;
      font-size: var(--installments-rest-font-size, 0.875rem);
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.6);
    }

    &.inline {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: baseline;
      column-gap: 0.25em;

      & .lead strong {
        font-weight: 700;
      }

      & .rest {
        min-height: 0;
        color: inherit;
      }
    }
  }
</style>
