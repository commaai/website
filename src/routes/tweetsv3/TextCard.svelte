<script>
  import XIcon from "$lib/icons/social/x.svg?raw";

  export let tweet;

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
  class="tweet"
  href="https://x.com/{tweet.author}/status/{tweet.id}"
  target="_blank"
  rel="noopener"
>
  <div class="head">
    {#if avatarFor(tweet.author)}
      <img class="avatar" src={avatarFor(tweet.author)} alt="" width="36" height="36" loading="lazy" />
    {:else}
      <span class="avatar initial" aria-hidden="true">{tweet.author[0].toUpperCase()}</span>
    {/if}
    <span class="who">
      {#if tweet.name}<span class="name">{tweet.name}</span>{/if}
      <span class="handle">@{tweet.author}</span>
    </span>
    <span class="mark" aria-hidden="true">{@html XIcon}</span>
  </div>
  <p class="body">{#each segment(tweet.body) as part}{#if part.handle}<span class="mention">{part.text}</span>{:else}{part.text}{/if}{/each}</p>
  <span class="date">{tweet.timestamp}</span>
</a>

<style>
  .tweet {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 0.875rem;
    height: 100%;
    padding: 1.5rem;
    background-color: #0d0d0d;
    border: 1px solid #262626;
    overflow: hidden;
    transition:
      background-color 0.2s ease,
      box-shadow 0.16s ease-out,
      transform 0.32s cubic-bezier(0.22, 1.2, 0.36, 1);
  }

  @media (hover: hover) and (pointer: fine) {
    .tweet:hover {
      background-color: #131313;
      box-shadow: 5px 5px 0 var(--color-accent);
      transform: translate(-6px, -6px);
      z-index: 1;
    }
  }

  .head {
    align-items: center;
    display: flex;
    gap: 0.75rem;
  }

  .avatar {
    align-self: center;
    background-color: #1c1c1c;
    border: 1px solid #333;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    flex: 0 0 2.25rem;
    height: 2.25rem;
    width: 2.25rem;
    object-fit: cover;
  }

  .avatar.initial {
    align-items: center;
    color: var(--color-accent);
    display: flex;
    font-family: JetBrains Mono, monospace;
    font-size: 0.9rem;
    justify-content: center;
  }

  .who {
    display: flex;
    flex-flow: column;
    line-height: 1.2;
    min-width: 0;
  }

  .name {
    color: white;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .handle {
    color: var(--color-muted);
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mark {
    display: flex;
    margin-left: auto;
    opacity: 0.35;
    transition: opacity 0.2s ease;
  }

  .tweet:hover .mark {
    opacity: 1;
  }

  .body {
    color: white;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    white-space: pre-line;
  }

  .mention {
    color: var(--color-accent);
  }

  .date {
    color: var(--color-muted);
    font-family: JetBrains Mono, monospace;
    font-size: 0.75rem;
    margin-top: auto;
    white-space: nowrap;
  }
</style>
