<script>
  import SocialIcons from "$lib/components/SocialIcons.svelte";
  import HamburgerIcon from "$lib/icons/ui/hamburger.svg?raw";
  import Close from "$lib/icons/ui/close-new.svg?raw";
  import CommaIcon from "$lib/icons/comma-logo.svg?raw";
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
    <span class="hamburger-icon">{@html HamburgerIcon}</span>
    <span class="close-icon">{@html Close}</span>
  </button>
  <div
    class="menu-container"
    id="menu-dropdown"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div class="section-links">
      <a href="/">{@html CommaIcon}</a>
      <a href="/vehicles">compatibility</a>
      <a href="/shop">shop</a>
      <a href="/setup">setup</a>
      <a href="https://blog.comma.ai">autonomy</a>
      <a href="/jobs">jobs</a>
    </div>
  </div>
</nav>

<style>
  .toggle-button {
    display: none;
    position: absolute;
    border: none;
    background-color: transparent;
    height: 64px;
    top: 0;
    /* Position to the right of the comma logo + padding */
    left: calc(24px + 13px + 24px);
    z-index: 1000;
    padding: 0;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;

    @media screen and (max-width: 700px) {
      display: block;
    }

    & svg {
      margin: auto;
      display: block;
      height: 100%;
    }

    & .hamburger-icon {
      display: block;
    }

    & .close-icon {
      display: none;
    }
  }

  .menu-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 63px;
    padding: 0 2rem;
    z-index: 2;
    color: white;
    display: none;
    background-color: #EAEAEA66; backdrop-filter: blur(32px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  nav:focus-within {
    & .toggle-button {
      color: white;
      transition: background-color 250ms, color 250ms;
      cursor: pointer;
      pointer-events: none;

      & svg {
        fill: white;
      }
    }

    & .hamburger-icon {
      display: none;
    }

    & .close-icon {
      display: block;
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
    padding: 2rem 0;

    & a {
      color: black;
      margin-bottom: 24px;
      padding: 0;
      font-size: 32px;
      letter-spacing: -0.06em;
      line-height: 0.9;
      text-decoration: none;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          text-shadow: 0 0 8px white, 0 0 16px black;
        }
      }
    }

    & svg {
      width: 24px;
      height: auto;
    }
  }
</style>
