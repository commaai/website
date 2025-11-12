<script>
  import NoteCard from "./NoteCard.svelte";
  
  export let notes;
  
  $: cards = parseNoteCards(notes);
  
  function parseNoteCards(html) {
    if (!html) return [];
    const regex = /<NoteCard\s+title="([^"]+)">([\s\S]*?)<\/NoteCard>/g;
    const cards = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      cards.push({ title: match[1], content: match[2].trim() });
    }
    return cards;
  }
</script>

{#each cards as card}
  <NoteCard title={card.title}>
    {@html card.content}
  </NoteCard>
{/each}

