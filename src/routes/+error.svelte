<script>
  import { page } from '$app/stores';

  import CommaIcon from '$lib/icons/comma.svg?raw';
</script>

<div class="page">
  {@html CommaIcon}
  <h1>{$page.error.message}</h1>
  <span>An issue occurred. <a class="highlight" href="/">Click here</a> to go back to the homepage.</span>
</div>

<style>
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 3rem;
  }

  h1 {
    color: black !important;
    margin: 3rem 0 1rem;
  }

  span {
    color: black !important;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
</style>
