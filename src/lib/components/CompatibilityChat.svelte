<script>
  import { tick } from 'svelte';

  let messages = [];
  let draft = '';
  let images = [];
  let loading = false;
  let error = '';
  let fileInput;
  let messagesElement;

  const suggestions = [
    'Is a 2024 Toyota RAV4 supported?',
    'What trim does my car need?',
    'Can you identify my car from a photo?'
  ];

  function addImages(event) {
    error = '';
    const files = Array.from(event.currentTarget.files || []);
    const available = Math.max(0, 3 - images.length);

    for (const file of files.slice(0, available)) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 8 * 1024 * 1024) {
        error = 'Images must be smaller than 8 MB.';
        continue;
      }
      const reader = new FileReader();
      reader.onload = () => {
        images = [...images, { name: file.name, url: reader.result }];
      };
      reader.readAsDataURL(file);
    }
    event.currentTarget.value = '';
  }

  function removeImage(index) {
    images = images.filter((_, currentIndex) => currentIndex !== index);
  }

  async function scrollToLatestMessage() {
    await tick();
    messagesElement?.scrollTo({ top: messagesElement.scrollHeight, behavior: 'smooth' });
  }

  async function send(message = draft) {
    const text = message.trim();
    if ((!text && images.length === 0) || loading) return;

    const userMessage = { role: 'user', text, images };
    const nextMessages = [...messages, userMessage];
    messages = nextMessages;
    draft = '';
    images = [];
    loading = true;
    error = '';
    scrollToLatestMessage();

    try {
      const response = await fetch('/api/compatibility-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not get an answer.');
      messages = [...messages, { role: 'assistant', text: result.answer }];
      scrollToLatestMessage();
    } catch (requestError) {
      error = requestError.message;
    } finally {
      loading = false;
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  }
</script>

<div class="compatibility-chat">
  <div class="chat-intro">
    <span class="eyebrow">Ask comma</span>
    <h2>Will openpilot work with your car?</h2>
    <p>Tell us the year, make, model, and trim—or upload a photo. We’ll check it against the compatibility list.</p>
  </div>

  <div class="chat-panel">
    {#if messages.length === 0}
      <div class="empty-state">
        <div class="spark" aria-hidden="true">✦</div>
        <strong>Ask about your car</strong>
        <span>Try one of these, or type your own question below.</span>
        <div class="suggestions">
          {#each suggestions as suggestion}
            <button type="button" on:click={() => send(suggestion)}>{suggestion}</button>
          {/each}
        </div>
      </div>
    {:else}
      <div class="messages" bind:this={messagesElement} aria-live="polite">
        {#each messages as message}
          <div class:assistant={message.role === 'assistant'} class="message">
            <span class="message-label">{message.role === 'assistant' ? 'comma' : 'you'}</span>
            {#if message.images?.length}
              <div class="message-images">
                {#each message.images as image}
                  <img src={image.url} alt={image.name} />
                {/each}
              </div>
            {/if}
            {#if message.text}<p>{message.text}</p>{/if}
          </div>
        {/each}
        {#if loading}
          <div class="message assistant thinking"><span></span><span></span><span></span></div>
        {/if}
      </div>
    {/if}

    <form on:submit|preventDefault={() => send()}>
      {#if images.length}
        <div class="image-previews">
          {#each images as image, index}
            <div class="image-preview">
              <img src={image.url} alt={image.name} />
              <button type="button" aria-label="Remove {image.name}" on:click={() => removeImage(index)}>×</button>
            </div>
          {/each}
        </div>
      {/if}
      <div class="composer">
        <button class="upload" type="button" aria-label="Upload car photos" title="Upload car photos" on:click={() => fileInput.click()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" /></svg>
        </button>
        <input bind:this={fileInput} class="file-input" type="file" accept="image/*" multiple on:change={addImages} />
        <textarea bind:value={draft} on:keydown={handleKeydown} rows="1" placeholder="Ask about your car…" aria-label="Ask about your car"></textarea>
        <button class="send" type="submit" disabled={loading || (!draft.trim() && images.length === 0)} aria-label="Send message">↑</button>
      </div>
      <div class="composer-note">AI can make mistakes. Confirm details in the compatibility list below.</div>
      {#if error}<div class="error" role="alert">{error}</div>{/if}
    </form>
  </div>
</div>

<style>
  .compatibility-chat { width: 85%; margin: 2rem auto 3rem; }
  .chat-intro { text-align: center; max-width: 42rem; margin: 0 auto 1.5rem; }
  .eyebrow { display: inline-block; text-transform: uppercase; font-size: .75rem !important; font-weight: 800; letter-spacing: .12em; background: var(--color-accent); padding: .35rem .65rem; margin-bottom: .75rem; }
  h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; margin: 0 0 .75rem; letter-spacing: -.055em; }
  .chat-intro p { font-size: 1.1rem; margin: 0; color: var(--color-muted); }
  .chat-panel { max-width: 48rem; margin: 0 auto; border: 1px solid rgba(0,0,0,.35); background: #fff; box-shadow: 6px 6px 0 #000; }
  .empty-state { min-height: 15rem; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: .4rem; }
  .empty-state strong { font-size: 1.35rem; }
  .empty-state > span { color: var(--color-muted); }
  .spark { width: 2.5rem; height: 2.5rem; display: grid; place-items: center; background: #000; color: var(--color-accent); margin-bottom: .35rem; }
  .suggestions { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-top: 1rem; }
  .suggestions button { border: 1px solid rgba(0,0,0,.25); background: var(--color-card-background); padding: .55rem .75rem; font: inherit; cursor: pointer; }
  .suggestions button:hover { border-color: #000; background: var(--color-card-background-hover); }
  .messages { min-height: 15rem; max-height: 28rem; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; background: var(--color-card-background); }
  .message { align-self: flex-end; max-width: 80%; background: #000; color: #fff; padding: .75rem 1rem; }
  .message.assistant { align-self: flex-start; background: #fff; color: #000; border: 1px solid rgba(0,0,0,.18); }
  .message-label { display: block; color: inherit; opacity: .6; font-size: .7rem; font-weight: 800; text-transform: uppercase; margin-bottom: .25rem; }
  .message p { margin: 0; white-space: pre-wrap; }
  .message-images { display: flex; gap: .4rem; margin-bottom: .5rem; }
  .message-images img { width: 5rem; height: 5rem; object-fit: cover; }
  form { border-top: 1px solid rgba(0,0,0,.25); padding: .75rem; }
  .composer { display: flex; align-items: flex-end; gap: .5rem; }
  textarea { flex: 1; min-height: 1.6rem; max-height: 7rem; padding: .6rem .25rem; border: 0; resize: vertical; font: inherit; outline: none; }
  .upload, .send { border: 0; width: 2.5rem; height: 2.5rem; display: grid; place-items: center; cursor: pointer; flex: none; }
  .upload { background: transparent; }
  .upload:hover { background: var(--color-card-background); }
  .upload svg { width: 1.35rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  .send { background: var(--color-accent); color: #000; font-size: 1.5rem; font-weight: 700; }
  .send:disabled { opacity: .3; cursor: default; }
  .file-input { display: none; }
  .image-previews { display: flex; gap: .5rem; padding-bottom: .5rem; }
  .image-preview { position: relative; }
  .image-preview img { display: block; width: 4rem; height: 4rem; object-fit: cover; border: 1px solid rgba(0,0,0,.2); }
  .image-preview button { position: absolute; top: -.35rem; right: -.35rem; width: 1.25rem; height: 1.25rem; padding: 0; border: 0; border-radius: 50%; background: #000; color: #fff; cursor: pointer; line-height: 1; }
  .composer-note { color: var(--color-muted); font-size: .72rem; text-align: center; margin-top: .35rem; }
  .error { color: #b42318; background: #fff0ee; font-size: .85rem; padding: .5rem; margin-top: .5rem; }
  .thinking { flex-direction: row; gap: .3rem; padding: 1rem; }
  .thinking span { width: .35rem; height: .35rem; border-radius: 50%; background: #000; animation: pulse 1s infinite alternate; }
  .thinking span:nth-child(2) { animation-delay: .2s; }
  .thinking span:nth-child(3) { animation-delay: .4s; }
  @keyframes pulse { to { opacity: .2; } }
  @media (max-width: 600px) {
    .compatibility-chat { width: 100%; }
    .chat-panel { box-shadow: 4px 4px 0 #000; }
    .empty-state { padding: 1.25rem; }
    .message { max-width: 90%; }
  }
</style>
