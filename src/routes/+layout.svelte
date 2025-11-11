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

  import CommaIcon from "$lib/icons/comma.svg?raw";
  import CartIcon from "$lib/icons/ui/cart.svg?raw";
  import BasketIcon from "$lib/icons/ui/basket.svg?raw";
  import ExternalIcon from "$lib/icons/ui/external.svg?raw";

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
  <div class="navbar-container">
    <!-- <div class="navbar-section-logo">
      <div class="menu-container">
        <HeaderMenu />
      </div>
    </div> -->
    <nav class="navbar-section-links">
      <a href="/" class:active={$page.url.pathname === '/'}>comma four</a>
      <a href="/shop" class:active={$page.url.pathname.startsWith('/shop')}>shop</a>
      <a href="/setup" class:active={$page.url.pathname.startsWith('/setup')}>setup</a>
      <a href="/support" class="hide-mobile-1" class:active={$page.url.pathname.startsWith('/support')}>support</a>
      <a href="/jobs" class="hide-mobile-2" class:active={$page.url.pathname.startsWith('/jobs')}>jobs</a>
    </nav>
    <div class="navbar-section-buttons">
      <!-- <a class="button shop" href="/shop">
        {@html BasketIcon}
        Shop
      </a> -->
      {#if $cartTotalQuantity > 0}
        <button class="button cart" on:click={openCart}>
          {@html CartIcon}
          <div class="cart-text">cart ({$cartTotalQuantity})</div>
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
    top: 1rem;
    position: fixed;
    left: 1rem;
    right: 1rem;
    width: auto;
    z-index: 20;
    border-radius: 0.5rem;

    background-color: rgba(0, 0, 0, 0.75);
    border-bottom: 1px solid #000;
    backdrop-filter: blur(10px);
    overflow: visible;
  }

  .navbar-container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-radius: 0.5rem;
    overflow: visible;

    @media only screen and (max-width: 1160px) {
      flex-wrap: wrap;
    }
  }

  .navbar-section-logo {
    flex-direction: row-reverse;
    align-items: center;
    display: flex;
    border-right: 1px solid #000;

    & > .title {
      font-family: "Monument Extended Black", sans-serif;
      font-size: 20px;
      color: black;
      height: 20px;
      text-transform: uppercase;
      padding: 0 2rem;
    }

    @media only screen and (max-width: 1280px) {
      border-right: none;
    }

    @media only screen and (max-width: 768px) {
      flex: 1;

      & > .title {
        display: flex;
        flex: 1;
        justify-content: center;
      }
    }

    @media only screen and (max-width: 375px) {
      & > .title {
        padding: 0 0.25rem;
      }
    }
  }

  .navbar-section-links {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: left;

    & a {
      color: #ffffff;
      margin: 1.0rem 1.5rem;
      font-family: Inter, sans-serif;
      font-size: 1.125rem;
      white-space: nowrap;
      transition: color 0.2s, text-shadow 0.2s;

      &.active,
      &:active {
        color: var(--color-accent);
        text-shadow: 0 0 8px var(--color-accent), 0 0 16px var(--color-accent);
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--color-accent);
          text-shadow: 0 0 8px var(--color-accent), 0 0 16px var(--color-accent);
        }
      }

      @media only screen and (max-width: 698px) {
        margin: 1.0rem 0.75rem;
        font-size: 1rem;
      }
    }

    @media only screen and (max-width: 400px) {
      & a.hide-mobile-2 {
        display: none;
      }
    }

    @media only screen and (max-width: 350px) {
      & a.hide-mobile-1 {
        display: none;
      }
    }
  }

  /* Wrap nav bar links earlier if cart button is showing */
  @media (max-width: 500px) {
    .navbar-container:has(.cart) .navbar-section-links a.hide-mobile-2 {
      display: none;
    }
  }

  @media (max-width: 450px) {
    .navbar-container:has(.cart) .navbar-section-links a.hide-mobile-1 {
      display: none;
    }
  }

  .navbar-section-buttons {
    display: flex;

    & .cart, & .shop {
      border: none;

      & svg {
        margin-right: 0.5rem;
      }
    }

    & .button {
      color: #000;
      text-transform: uppercase;
      font-family: Inter, sans-serif;
      border: none;
      padding-left: 56px;
      padding-right: 56px;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      cursor: pointer;
      background-color: var(--color-accent);

      &:last-child {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }

      &:not(:first-child) {
        border-left: 1px solid #000;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: var(--color-accent-hover);
        }
      }
      &:active {
        background-color: var(--color-accent-hover);
      }
    }

    @media only screen and (max-width: 1300px) {
      /* show single button, with priority for cart */
      &.navbar-section-buttons > :first-child:not(:only-child) {
        display: none;
      }

      & .cart .cart-text {
        display: none;
      }

      & .cart {
        padding-left: 25px;
        padding-right: 25px;
      }

      & .shop {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }

  footer {
    background-color: #333;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 10;
    border-top: 1px solid black;

    & .footer-content {
      background-color: #EAEAEA;
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
    }

    & h1 {
      color: #000;
      font-family: "Monument Extended Black", sans-serif;
      font-size: 64px;
      text-transform: uppercase;
      margin: 0;
      padding: 0;
      line-height: 1;
    }

    & .footer-left .copyright {
      color: black;
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
    }

    & .footer-links-grid {
      display: grid;
      grid-template-columns: repeat(6, auto);
      gap: 0.75rem 60px;
      justify-content: flex-end;
      justify-items: end;
      grid-auto-flow: row;
      direction: rtl;

      @media screen and (max-width: 1440px) {
        grid-template-columns: repeat(4, auto);
      }

      @media screen and (max-width: 1170px) {
        grid-template-columns: repeat(3, auto);
      }

      @media screen and (max-width: 471px) {
        grid-template-columns: repeat(2, auto);
      }

      @media screen and (max-width: 300px) {
        grid-template-columns: repeat(1, auto);
      }
    }

    & .footer-links-grid a {
      direction: ltr;
      color: #000;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 400;
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
      transition: opacity 0.2s;
      line-height: 1;
      text-align: right;
      justify-self: end;
      align-self: end;
      width: 100%;
      display: block;
    }

    & .footer-links-grid a:hover,
    & .footer-links-grid a:active {
      opacity: 0.6;
    }

    /*@media screen and (max-width: 1024px) {*/
    /*  & .footer-content {*/
    /*    padding: 1rem;*/
    /*    flex-direction: column;*/
    /*    gap: 2rem;*/
    /*  }*/

    /*  & .footer-right {*/
    /*    align-items: flex-start;*/
    /*    width: 100%;*/
    /*  }*/

    /*  & .footer-links-grid {*/
    /*    grid-template-columns: repeat(auto-fit, minmax(120px, auto));*/
    /*    justify-content: flex-start;*/
    /*    width: 100%;*/
    /*    gap: 1.5rem 1.5rem;*/
    /*  }*/
    /*}*/

    @media screen and (max-width: 1010px) {
      & .footer-content {
        flex-direction: column;
        align-items: start;
        gap: 2rem;
      }

      & .footer-left {
        order: 2;
      }

      & .footer-right {
        order: 1;
        align-self: flex-start;
      }

      & .footer-links-grid {
        gap: 1rem 60px;
        justify-content: flex-start;
        justify-items: start;
        direction: ltr;
      }

      & .footer-links-grid a {
        text-align: left;
        justify-self: start;
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
