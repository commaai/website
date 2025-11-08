<script>
  import SocialIcons from "$lib/components/SocialIcons.svelte";
  import { page } from '$app/stores';
</script>

<nav aria-label="navigation menu">
  <button
    type="button"
    class="toggle-button"
    aria-expanded="false"
    aria-controls="menu-dropdown"
    tabindex="0"
  >
    <svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="3" y="5" width="18" height="2"></rect>
      <rect x="3" y="11" width="18" height="2"></rect>
      <rect x="3" y="17" width="18" height="2"></rect>
    </svg>
  </button>
  <div
    class="menu-container"
    id="menu-dropdown"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div class="section-links">
      <a href="/shop/comma-3x">comma 3X</a>
      <a href="/shop">shop</a>
      <a href="/setup">setup guide</a>
      <a href="/support">support & FAQs</a>
      <a href="https://blog.comma.ai">blog</a>
      <a href="/jobs">jobs</a>
    </div>
  </div>
</nav>

<style>
  .toggle-button {
    display: block;
    border: none;
    border-right: 1px solid #000;
    background-color: transparent;
    height: 65px;
    width: 90px;
    padding: 0;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-accent);
      }
    }

    & svg {
      margin: auto;
      display: block;
      height: 100%;
    }
  }

  .menu-container {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    padding: 0 3rem;
    z-index: 2;
    background-color: black;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    color: white;
    display: none;

    @media (hover: hover) and (pointer: fine) {
      & a:hover {
        color: var(--color-accent);
      }
    }
    & a:active {
      color: var(--color-accent);
    }
  }

  nav:focus-within {
    & .toggle-button {
      background-color: black;
      color: white;
      transition: background-color 250ms, color 250ms;
      cursor: pointer;
      pointer-events: none;

      & svg {
        fill: white;
      }
    }

    & .menu-container {
      opacity: 1;
      display: flex;

      & a {
        opacity: 1;
      }
    }
  }

  .section-links {
    flex: 1;
    justify-content: flex-start;
    display: flex;
    flex-flow: column;
    width: 62%;
    padding: 4rem 0;

    & a {
      color: #fff;
      margin-bottom: 2rem;
      padding: 0;
      font-size: 2.5rem;
      line-height: 0.9;
      text-decoration: none;
    }
  }

  @media only screen and (max-width: 768px) {
    .menu-container {
      flex-flow: column nowrap;
      row-gap: 1.75rem;
      justify-content: flex-start;
    }

    .section-links {
      width: 100%;
      padding: 2.5rem 0 0;
      flex: unset;
    }

    .section-links a {
      font-size: 1.5rem;
    }
  }
</style>
