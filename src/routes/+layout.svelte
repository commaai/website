<script>
  import "../app.css";

  import MonumentExtendedBlack from "$lib/fonts/MonumentExtended/MonumentExtended-Black.woff2";
  import "@fontsource/inter/400.css";
  import "@fontsource/inter/600.css";
  import "@fontsource/inter/700.css";
  import '@fontsource/jetbrains-mono/400.css';

  import { get } from "svelte/store";

  import Badge from "$lib/components/Badge.svelte";
  import Grid from "$lib/components/Grid.svelte";
  import SocialIcons from "$lib/components/SocialIcons.svelte";
  import MailingListForm from "$lib/components/MailingListForm.svelte";

  import CommaIcon from "$lib/icons/comma-logo.svg?raw";
  import CartIcon from "$lib/icons/ui/cart.svg?raw";

  import { updateCart } from '$lib/utils/shopify';
  import { printConsoleBanner } from '$lib/utils/console';

  import HeaderMenu from "$lib/components/HeaderMenu.svelte";
  import ShoppingCart from "$lib/components/ShoppingCart.svelte";
  import {
    loadCart,
    cartId,
    cartTotalQuantity,
    showCart,
  } from "../store.js";

  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let loading = false;

  async function openCart() {
    await loadCart();
    showCart.set(true);
  }

  function hideCart() {
    showCart.set(false);
  }

  async function updateProduct(event) {
    await updateCart({
      cartId: get(cartId),
      lineId: event.detail.body.lineId,
      quantity: event.detail.body.quantity,
      variantId: event.detail.body.variantId,
    });
    await loadCart();
    loading = false;
  }

  onMount(async () => {
    await loadCart();
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        showCart.set(false);
      }
    });
  });

  printConsoleBanner();
</script>

<svelte:head>
  <link
    rel="preload"
    href={MonumentExtendedBlack}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
</svelte:head>

<header class="navbar">
  <div class="menu-container">
    <HeaderMenu/>
  </div>
  <div class="navbar-container">
    <span class="comma-home-icon">
      <a href="/">{@html CommaIcon}</a>
    </span>
    <nav class="navbar-section-links">
      <a href="/">{@html CommaIcon}</a>
      <a href="/vehicles" class="hide-mobile-1">compatibility</a>
      <a href="/shop">shop</a>
      <a href="/setup">setup</a>
      <a href="https://blog.comma.ai">autonomy</a>
      <a href="/jobs" class="hide-mobile-2">jobs</a>
    </nav>
    <div class="navbar-section-buttons">
      {#if $cartTotalQuantity > 0}
        <button class="button cart" on:click={openCart}>
          <div class="cart-text">cart ({$cartTotalQuantity})</div>
          {@html CartIcon}
        </button>
      {/if}
    </div>
  </div>
</header>

{#if $showCart}
  <ShoppingCart
    on:click={hideCart}
    on:updateProduct={updateProduct}
    bind:loading
  />
{/if}

<main>
  <slot></slot>
</main>

<footer>
  <div class="footer-content">
    <div class="footer-left">
      <h1>COMMA</h1>
      <div class="copyright">© comma_ai 2025</div>
    </div>
    <div class="footer-right">
      <div class="footer-links-grid">
        <a href="https://connect.comma.ai">CONNECT</a>
        <a href="https://github.com/commaai/openpilot/releases">RELEASES</a>
        <a href="/jobs">JOBS</a>
        <a href="/leaderboard.html">LEADERBOARD</a>
        <a href="/vehicles">SUPPORTED CARS</a>
        <a href="/support">SUPPORT</a>
        <a href="/setup">SETUP GUIDE</a>
        <a href="https://github.com/commaai">GITHUB</a>
        <a href="https://twitter.com/comma_ai">TWITTER</a>
        <a href="https://www.instagram.com/comma_ai">INSTAGRAM</a>
        <a href="https://discord.comma.ai">DISCORD</a>
        <a href="https://www.youtube.com/commaai">YOUTUBE</a>
        <a href="/terms">TERMS & PRIVACY</a>
      </div>
    </div>
  </div>
</footer>

<style>
  @font-face {
    font-display: block;
    font-family: "Monument Extended Black";
    font-style: normal;
    src: url("$lib/fonts/MonumentExtended/MonumentExtended-Black.woff2");
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: auto;
    height: 64px;
    margin: 20px;
    z-index: 20;

    /*background-color: #EAEAEA66;*/
    /*backdrop-filter: blur(32px);*/
    overflow: visible;
  }

  .navbar-container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    overflow: visible;
    padding-left: 24px;
    padding-right: 24px;
    background-color: #EAEAEA66;
    backdrop-filter: blur(24px) saturate(220%);

    & .comma-home-icon {
      display: none;
      & a {
        display: flex;
        align-items: center;
        height: 100%;
      }

      @media only screen and (max-width: 700px) {
        display: flex;
      }
    }

    @media only screen and (max-width: 1160px) {
      flex-wrap: wrap;
    }
  }

  .navbar-section-links {
    display: flex;
    flex: 1;
    align-items: stretch;
    justify-content: left;
    gap: 24px;

    & a {
      display: flex;
      align-items: center;
      color: black;
      font-family: Inter, sans-serif;
      font-size: 1.25rem;
      letter-spacing: -0.06em;
      white-space: nowrap;
      transition: color 0.2s, text-shadow 0.2s;
      line-height: 1;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          text-shadow: 0 0 8px white, 0 0 16px black;
        }
      }

      @media only screen and (max-width: 700px) {
        display: none;
      }

      /*@media only screen and (max-width: 710px) {*/
      /*  margin: 1.0rem 0.75rem;*/
      /*  font-size: 1rem;*/
      /*}*/
    }

    /*@media only screen and (max-width: 405px) {*/
    /*  & a.hide-mobile-2 {*/
    /*    display: none;*/
    /*  }*/
    /*}*/

    /*@media only screen and (max-width: 350px) {*/
    /*  & a.hide-mobile-1 {*/
    /*    display: none;*/
    /*  }*/
    /*}*/
  }

  @media (max-width: 490px) {
    .navbar-container:has(.cart) .navbar-section-links a.hide-mobile-2 {
      display: none;
    }
  }

  @media (max-width: 436px) {
    .navbar-container:has(.cart) .navbar-section-links a.hide-mobile-1 {
      display: none;
    }
  }

  .navbar-section-buttons {
    display: flex;
    height: 64px;  /* Why?! */

    & .cart {
      border: none;

      & svg {
        margin-left: 1rem;
      }
    }

    & .button {
      padding: 0;
      color: black;
      font-family: Inter, sans-serif;
      /*padding-left: 56px;*/
      /*padding-right: 56px;*/
      font-size: 20px;
      font-weight: 400;
      letter-spacing: -0.06em;
      display: flex;
      align-items: center;
      cursor: pointer;
      background-color: transparent;
    }
  }

  footer {
    background-color: black;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 10;
    border-top: 1px solid black;

    & .footer-content {
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      box-sizing: border-box;
      overflow-x: auto;
    }

    & .footer-left {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      gap: 2rem;
      flex: 0 0 50%;
      width: 50%;
    }

    & h1 {
      font-family: "Monument Extended Black", sans-serif;
      font-size: 64px;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      line-height: 1;
    }

    & .footer-left .copyright {
      font-size: 0.875rem;
      margin: 0;
      padding: 0;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 400;
      line-height: 1;
    }

    & .footer-right {
      display: flex;
      align-items: center;
      align-self: center;
      flex: 0 0 50%;
      width: 50%;
    }

    & .footer-links-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem 2rem;
      justify-content: flex-end;
      align-items: flex-end;
    }

    & .footer-links-grid a {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 400;
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
      transition: opacity 0.2s;
      line-height: 1;
      text-align: right;
      display: block;
      white-space: nowrap;
    }

    & .footer-links-grid a:hover,
    & .footer-links-grid a:active {
      opacity: 0.6;
    }

    @media screen and (max-width: 1100px) {
      & .footer-content {
        flex-direction: column;
        align-items: start;
        gap: 2rem;
      }

      & .footer-left {
        width: 100%;
        flex: 1 1 100%;
      }

      & .footer-right {
        align-self: flex-start;
        width: 100%;
        flex: 1 1 100%;
      }

      & .footer-links-grid {
        gap: 1.25rem 2rem;
        justify-content: flex-start;
      }

      & .footer-links-grid a {
        text-align: left;
      }
    }

    @media screen and (max-width: 500px) {
      & .footer-left {
        flex-direction: column;
        gap: 1rem;
      }
    }

    @media screen and (max-width: 698px) {
      & h1 {
        font-size: 48px;
      }
    }

  }
</style>
