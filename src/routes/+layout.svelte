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

    // Focus mailing list input when hash is #mailing-list
    const focusMailingList = () => {
      if (window.location.hash === '#mailing-list') {
        setTimeout(() => {
          const input = document.querySelector('#mailing-list input[type="email"]');
          if (input) input.focus();
        }, 300);
      }
    };

    // Check on load and on hash change
    focusMailingList();
    window.addEventListener('hashchange', focusMailingList);
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
    <div class="navbar-section-logo">
      <a class="title" href="/">comma</a>
      <div class="menu-container">
        <HeaderMenu />
      </div>
    </div>
    <nav class="navbar-section-links">
      <a href="/" class:active={$page.url.pathname === '/'}>home</a>
      <a href="/openpilot" class:active={$page.url.pathname.startsWith('/openpilot')}>openpilot</a>
      <a href="/shop/comma-four" class:active={$page.url.pathname.startsWith('/shop/comma-four')}>comma four</a>
      <a href="/vehicles" class:active={$page.url.pathname.startsWith('/vehicles')}>compatibility</a>
      <a href="/jobs" class:active={$page.url.pathname.startsWith('/jobs')}>jobs</a>
    </nav>
    <div class="navbar-section-buttons">
      <a class="button shop" href="/shop">
        {@html BasketIcon}
        Shop
      </a>
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
  <div class="container">
    <Grid columns={4} wrapMode="single" alignItems="start" size="large">
      <div class="footer-links">
        <strong>Product</strong>
        <a href="/openpilot">openpilot</a>
        <a class="badged" href="/shop/comma-four">
          <span>comma four</span>
          <Badge style="light" display="inline">new</Badge>
        </a>
        <a href="/connect">connect</a>
        <a href="/vehicles">Compatibility</a>
        <a href="/shop">Shop</a>
      </div>
      <div class="footer-links">
        <strong>Company</strong>
        <a href="https://blog.comma.ai">Blog</a>
        <a class="badged" href="/jobs">
          <span>Jobs</span>
          <Badge style="light" display="inline">we're hiring!</Badge>
        </a>
        <a class="badged" href="/leaderboard.html">
          <span>Leaderboard</span>
          <Badge style="accent" display="inline">New Challenge!</Badge>
        </a>
      </div>
      <div class="footer-links">
        <strong>Support</strong>
        <a href="/support">Support & FAQs</a>
        <a href="/setup">Setup Guide</a>
        <a class="badged" href="https://discord.comma.ai/">
          <span>Discord</span>
          {@html ExternalIcon}
        </a>
      </div>
      <div class="footer-links">
        <div class="tagline">{@html CommaIcon}<span>make driving chill</span></div>
        <SocialIcons size="1.5rem" />
        <div id="mailing-list" class="mailing-list">
          <MailingListForm style="primary" />
        </div>
      </div>
    </Grid>
    <div class="copyright">
      <span>© comma_ai 2025</span>
      <a href="/terms">Terms & Privacy</a>
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
    top: 0;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;

    background-color: rgba(245, 245, 245, 0.75);
    border-bottom: 1px solid #000;
    backdrop-filter: blur(10px);
  }

  .navbar-container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
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
    justify-content: center;

    & a {
      color: #000;
      margin: 0 1.75rem;
      font-family: Inter, sans-serif;
      font-size: 1.125rem;
      transition: text-shadow 0.2s;
    }

    & a.active {
      text-shadow: 0 0 8px rgba(81, 255, 0, 0.8),
                   0 0 12px rgba(81, 255, 0, 0.5);
    }

    @media only screen and (max-width: 1280px) {
      & {
        display: none;
      }
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
      border-left: 1px solid #000;
      padding-left: 56px;
      padding-right: 56px;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      cursor: pointer;
      background-color: var(--color-accent);

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: var(--color-accent-hover);
        }
      }
      &:active {
        background-color: var(--color-accent-hover);
      }
    }

    @media only screen and (max-width: 768px) {
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
    color: #fff;
    background-color: #000;
    padding: 6rem 6rem 1.25rem;

    @media screen and (max-width: 1024px) {
      & {
        padding: 2rem;
      }

      & .footer-links {
        margin-bottom: 1rem;
      }
    }

    & .container {
      max-width: 1440px;
      margin-left: auto;
      margin-right: auto;
    }

    & .footer-links {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;

      & strong {
        color: #fff;
        opacity: 0.65;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 600;
      }

      & a {
        color: #fff;
        font-size: 1.25rem;
        transition: opacity 0.2s;
      }

      @media (hover: hover) and (pointer: fine) {
        & a:hover {
          opacity: 0.65;
        }
      }
      & a:active {
        opacity: 0.65;
      }

      & .badged {
        display: flex;
        align-items: center;
        transition: opacity 0.2s;

        & span {
          margin-right: 0.75rem;
        }

        & div {
          padding: 0.25rem 0.4rem;
          text-wrap: nowrap;
          margin: 0;
        }
      }

      & .tagline {
        display: flex;

        & svg {
          width: 16px;
          height: 28px;
          margin-right: 0.75rem;
          color: white;
        }

        & span {
          font-size: 1.2rem;
          font-weight: 400;
        }
      }
    }

    & .mailing-list {
      margin-top: 2rem;
      width: 100%;
      color: white;
    }

    @media only screen and (max-width: 1024px) and (min-width: 512px) {
      & .mailing-list {
        width: unset;
      }
    }

    & .copyright {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      margin-top: 4rem;
      opacity: 0.65;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.25);
    }
  }
</style>
