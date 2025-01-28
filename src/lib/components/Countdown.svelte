<script>
  import {onMount} from 'svelte';

  export let date = "";

  const parsedDate = new Date(date).getTime();

  let remaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: true
  }

  function countdown() {
    const now = new Date().getTime();
    const distance = parsedDate - now;

    if (distance < 0) {
      remaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        done: true,
      }
    } else {
      remaining = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        done: false,
      }
    }
    return date;
  }

  // initialize before the component is rendered
  countdown();

  onMount(() => {
    let interval = setInterval(countdown, 1000);

    return () => clearInterval(interval);
  });

</script>

<slot {remaining}></slot>
