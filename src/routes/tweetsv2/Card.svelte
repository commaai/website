<script>
  import XIcon from "$lib/icons/social/x.svg?raw";

  export let tweet;
  export let showMark = true;
  export let showDate = false;
  export let handleOnly = false;

  const avatars = import.meta.glob("$lib/images/featured-tweets/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const avatarFor = (author) =>
    avatars[`/src/lib/images/featured-tweets/${author}.jpg`];

  const segment = (body) =>
    body.split(/(@\w+)/).map((part) => ({
      text: part,
      handle: part.startsWith("@") ? part.slice(1) : null,
    }));
</script>

<a
  class="c-card"
  href="https://x.com/{tweet.author}/status/{tweet.id}"
  target="_blank"
  rel="noopener"
>
  <div class="c-head">
    <img class="c-avatar" src={avatarFor(tweet.author)} alt="" width="36" height="36" loading="lazy" />
    <span class="c-who">
      {#if !handleOnly}<span class="c-name">{tweet.name}</span>{/if}
      <span class="c-handle">@{tweet.author}</span>
    </span>
    {#if showMark}
      <span class="c-mark" aria-hidden="true">{@html XIcon}</span>
    {/if}
  </div>
  <p class="c-body">{#each segment(tweet.body) as p}{#if p.handle}<span class="c-mention">{p.text}</span>{:else}{p.text}{/if}{/each}</p>
  {#if showDate}
    <span class="c-date">{tweet.timestamp}</span>
  {/if}
</a>

<style>
  .c-card {
    background-color: var(--card-bg, #0d0d0d);
    border: 1px solid var(--card-border, #262626);
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    height: 100%;
    padding: var(--card-padding, 1.5rem);
    box-shadow: 0 0 0 rgba(81, 255, 0, 0);
    transition:
      background-color 0.2s ease,
      box-shadow 0.16s ease-out,
      transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .c-card:hover {
      background-color: var(--card-bg-hover, #131313);
      box-shadow: 5px 5px 0 var(--color-accent);
      transform: translate(-6px, -6px);
      z-index: 1;
    }
  }

  .c-head {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  .c-avatar {
    background-color: #1c1c1c;
    border: 1px solid var(--card-border, #333);
    border-radius: 50%;
    box-sizing: border-box;
    flex: 0 0 var(--avatar-size, 2.25rem);
    height: var(--avatar-size, 2.25rem);
    width: var(--avatar-size, 2.25rem);
    object-fit: cover;
  }

  .c-who {
    display: flex;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
  }

  .c-name,
  .c-handle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .c-name {
    color: var(--card-fg, white);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.02em;
  }

  .c-handle {
    color: var(--color-muted);
    font-size: 0.875rem;
  }

  .c-mark {
    display: flex;
    margin-left: auto;
    opacity: 0.35;
  }

  .c-body {
    color: var(--card-fg, white);
    font-size: var(--card-font, 1rem);
    line-height: 1.4;
    margin: 0;
    white-space: pre-line;
  }

  .c-mention {
    color: var(--mention-color, var(--color-accent));
  }

  .c-date {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    margin-top: auto;
  }
</style>
