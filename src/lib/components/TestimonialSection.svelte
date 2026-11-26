<script>
  import TestimonialCards from "$lib/components/TestimonialCards.svelte";
  import { press } from "$lib/constants/press.js";
  import { tweets } from "$lib/constants/tweets.js";
</script>

<div class="subhead">
  <h2>owners on 𝕏</h2>
  <span class="line" aria-hidden="true"></span>
  <a class="meta type-mono type-small" href="https://twitter.com/comma_ai" target="_blank" rel="noopener">@comma_ai</a>
</div>
<TestimonialCards items={tweets} style="tweet" />

<div class="subhead">
  <h2>the press</h2>
  <span class="line" aria-hidden="true"></span>
</div>
<TestimonialCards items={press} style="press" />

<style>
  .subhead {
    --head-size: var(--text-h2); /* type deviation: D9, feeds a baseline-nudge calc, not a font-size */
    --lowercase-drop: calc(var(--head-size) * 0.0908);

    align-items: center;
    display: flex;
    gap: 1.25rem;
    margin: 5rem 0 2rem;
  }

  .subhead:first-of-type {
    margin-top: 0;
  }

  h2 {
    margin: 0;
  }

  .line {
    background: #000;
    flex: 1;
    height: 1px;
    opacity: 0.25;
    transform: translateY(var(--lowercase-drop));
  }

  .meta {
    color: var(--color-muted);
    transform: translateY(var(--lowercase-drop));
    transition: color 0.2s;
    white-space: nowrap;
  }

  @media (hover: hover) and (pointer: fine) {
    .meta:hover {
      color: var(--color-foreground);
    }
  }

  @media screen and (max-width: 768px) {
    .subhead {
      margin: 3rem 0 1.5rem;
    }
  }

  @media screen and (max-width: 599px) {
    .meta {
      display: none;
    }
  }
</style>
