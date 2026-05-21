<script>
  import PhoneIcon from "$lib/icons/features/phone.svg?raw";
  import ChatIcon from "$lib/icons/features/contact.svg?raw";
  import EmailIcon from "$lib/icons/features/email.svg?raw";

  export let eyebrow = "Got questions?";
  export let title = "We're here to help.";
  export let phoneNumber = "1-800-GO-COMMA";
  export let phoneHref = "tel:+18004626662";
  export let email = "support@comma.ai";
  export let chatFallbackHref = "";

  $: resolvedChatFallbackHref = chatFallbackHref || `mailto:${email}?subject=Support%20question`;

  function openLiveChat() {
    if (typeof window === "undefined") return;

    if (window.tidioChatApi && typeof window.tidioChatApi.open === "function") {
      window.tidioChatApi.open();
      return;
    }

    window.location.href = resolvedChatFallbackHref;
  }
</script>

<section class="contact-banner dark" aria-labelledby="contact-banner-title">
  <div class="container contact-banner-container">
    <hgroup>
      <p>{eyebrow}</p>
      <h2 id="contact-banner-title">{title}</h2>
    </hgroup>

    <div class="contact-methods" aria-label="Contact options">
      <a class="contact-method phone" href={phoneHref} aria-label={`Call us at ${phoneNumber}`}>
        <span class="method-icon">{@html PhoneIcon}</span>
        <span class="method-copy">
          <span class="method-label">Call us at</span>
          <strong>{phoneNumber}</strong>
        </span>
      </a>

      <button class="contact-method" type="button" on:click={openLiveChat} aria-label="Open live chat">
        <span class="method-icon">{@html ChatIcon}</span>
        <span class="method-copy">
          <span class="method-label">Live chat</span>
          <strong>Talk to us</strong>
        </span>
      </button>

      <a class="contact-method" href={`mailto:${email}`} aria-label={`Email us at ${email}`}>
        <span class="method-icon">{@html EmailIcon}</span>
        <span class="method-copy">
          <span class="method-label">Email us</span>
          <strong>{email}</strong>
        </span>
      </a>
    </div>
  </div>
</section>

<style>
  .contact-banner {
    background-color: #000;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    padding: 4rem 0;
  }

  .contact-banner-container {
    display: grid;
    grid-template-columns: minmax(14rem, 0.6fr) minmax(0, 1.4fr);
    align-items: center;
    gap: 3rem;
  }

  hgroup {
    margin: 0;
  }

  p {
    color: var(--color-accent);
    font-family: JetBrains Mono, monospace;
    font-size: 0.9rem;
    line-height: 1.2;
    letter-spacing: 0;
    text-transform: uppercase;
    margin: 0 0 0.75rem;
  }

  h2 {
    color: white;
    font-size: 3rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0;
    margin: 0;
  }

  .contact-methods {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .contact-method {
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    color: white;
    background-color: #111;
    border: 1px solid rgba(255, 255, 255, 0.28);
    padding: 1.25rem;
    text-align: left;
    font: inherit;
    letter-spacing: 0;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  }

  .contact-method.phone {
    color: black;
    background-color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .contact-method.phone .method-icon,
  .contact-method.phone .method-label,
  .contact-method.phone strong {
    color: black;
  }

  .method-icon {
    color: currentColor;
    width: 3rem;
    height: 3rem;
    display: block;
  }

  .method-icon :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  .method-copy {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .method-label {
    color: currentColor;
    opacity: 0.68;
    font-family: JetBrains Mono, monospace;
    font-size: 0.78rem;
    line-height: 1.1;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  strong {
    color: currentColor;
    font-size: 1.35rem;
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }

  @media (hover: hover) and (pointer: fine) {
    .contact-method:hover {
      background-color: #1d1d1d;
      border-color: rgba(255, 255, 255, 0.52);
    }

    .contact-method.phone:hover {
      color: black;
      background-color: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
    }
  }

  .contact-method:active {
    background-color: #1d1d1d;
    border-color: rgba(255, 255, 255, 0.52);
  }

  .contact-method.phone:active {
    color: black;
    background-color: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }

  @media screen and (max-width: 1024px) {
    .contact-banner-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    .contact-banner {
      padding: 3rem 0;
    }

    h2 {
      font-size: 2.25rem;
    }

    .contact-methods {
      grid-template-columns: 1fr;
    }

    .contact-method {
      min-height: 7.5rem;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }

  @media screen and (max-width: 375px) {
    h2 {
      font-size: 2rem;
    }

    strong {
      font-size: 1.15rem;
    }
  }
</style>
