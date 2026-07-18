<script>
  import SocialIcons from "$lib/components/SocialIcons.svelte";
  import { page } from '$app/stores';
  import { tick } from 'svelte';

  let isOpen = false;
  let menuElement;
  let navElement;
  let toggleElement;

  async function toggleMenu() {
    isOpen = !isOpen;
    if (isOpen) {
      await tick();
      menuElement?.focus();
    }
  }

  function handleWindowClick(event) {
    if (isOpen && !navElement?.contains(event.target)) isOpen = false;
  }

  function handleWindowKeydown(event) {
    if (event.key === 'Escape' && isOpen) {
      isOpen = false;
      toggleElement?.focus();
    }
  }
</script>

<svelte:window on:click={handleWindowClick} on:keydown={handleWindowKeydown} />

<nav bind:this={navElement} aria-label="navigation menu">
  <button
    bind:this={toggleElement}
    type="button"
    class="toggle-button"
    aria-expanded={isOpen}
    aria-controls="menu-dropdown"
    on:click={toggleMenu}
  >
    <svg viewBox="0 0 24 24" width="32" height="32">
      <rect x="3" y="5" width="18" height="2"></rect>
      <rect x="3" y="11" width="18" height="2"></rect>
      <rect x="3" y="17" width="18" height="2"></rect>
    </svg>
  </button>
  <div
    bind:this={menuElement}
    class:open={isOpen}
    class="menu-container"
    id="menu-dropdown"
    tabindex="-1"
  >
    <div class="section-links">
      <a href="/">home</a>
      <a href="/openpilot">openpilot</a>
      <a href="/shop/comma-four">comma four</a>
      <a href="/shop">shop</a>
      <a href="/connect">connect</a>
      <a href="/vehicles">compatibility</a>
      <a href="/setup">setup guide</a>
      <a href="/support">support & FAQs</a>
      <a href="https://blog.comma.ai">blog</a>
      <a href="/jobs">jobs - we're hiring!</a>
    </div>
    <div class="news-feed">
      <div class="blog">
        <div class="title">Latest from the blog:</div>
        {#each $page.data.blogPosts as blogPost}
          <div class="entry">
            <a href={blogPost.link}>{blogPost.title}</a>
            <div>{blogPost.date} - {blogPost.readTime}</div>
          </div>
        {/each}
      </div>
      <div class="social-links">
        <div class="title">Social</div>
        <SocialIcons size="2rem" />
      </div>
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
    max-height: calc(100dvh - 65px);
    overflow-y: auto;

    @media (hover: hover) and (pointer: fine) {
      & a:hover {
        color: var(--color-accent);
      }
    }
    & a:active {
      color: var(--color-accent);
    }
  }

  nav:has(.menu-container.open) {
    & .toggle-button {
      background-color: black;
      color: white;
      transition: background-color 250ms, color 250ms;
      cursor: pointer;

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

  .menu-container.open {
    opacity: 1;
    display: flex;
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

  .news-feed {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 32%;
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    padding: 4rem 0 4rem 4rem;

    & .title {
      color: rgba(255, 255, 255, 0.45);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    & .entry {
      margin-top: 1rem;
      margin-bottom: 2rem;

      & a {
        font-size: 1.5rem;
        text-decoration: none;
      }

      & div {
        color: rgba(255, 255, 255, 0.65);
        font-size: 0.875rem;
      }
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

    .news-feed {
      display: none;
    }
  }
</style>
