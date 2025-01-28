<script>
  import XIcon from "$lib/icons/social/x.svg";

  export let id;
  export let authorUsername;
  export let authorImage;
  export let body;
  export let timestamp;
</script>

<a
  href={`https://twitter.com/${authorUsername}/status/${id}`}
  target="_blank"
  class="twitter-card"
>
  <div class="header">
    <img src={authorImage} alt="profile picture of {authorUsername}" />
    <div class="username">@{authorUsername}</div>
    <div class="logo">
      <img src={XIcon} loading="lazy" alt="x.com logo" />
    </div>
  </div>
  <div class="body">{@html body}</div>
  <span class="date muted">{timestamp}</span>
</a>

<style>
  .twitter-card {
    color: #000;
    background-color: #fff;
    border: 1px solid #000;
    flex: 1;
    display: inline-block;
    padding: 1rem;
    line-height: 1.25;
    transition: all 0.2s;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-card-background-hover);
        transform: scale(1.02);
      }
    }
    &:active {
      background-color: var(--color-card-background-hover);
      transform: scale(1.02);
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    & img {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      margin-right: 0.75rem;
      display: inline-block;
    }

    & .username {
      flex: 1;
      margin-right: 0.5rem;
      font-weight: 600;
    }

    & .logo {
      flex: none;
      width: 24px;
      height: 48px;

      & svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.25rem;
        fill: currentColor;
      }
    }
  }

  .body {
    margin-bottom: 0.5rem;
    & a {
      color: #000;
      border-bottom: 2px solid #86ff4e;
      background-color: rgba(134, 255, 78, 0.15);
    }
  }

  .date {
    text-transform: uppercase;
    margin-top: 0.75rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 140%;
  }
</style>
