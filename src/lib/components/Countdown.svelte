<script>
  import { onMount } from 'svelte';

  export let date = '';

  const parsedDate = new Date(date).getTime();

  let remaining;

  function countdown() {
    const distance = Math.max(0, parsedDate - Date.now());

    remaining = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      done: distance === 0,
    };
  }

  countdown();

  onMount(() => {
    countdown();
    const interval = setInterval(countdown, 1000);
    return () => clearInterval(interval);
  });
</script>

<slot {remaining}></slot>
