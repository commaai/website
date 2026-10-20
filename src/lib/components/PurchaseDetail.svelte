<script>
  import Accordion from "$lib/components/Accordion.svelte";

  export let icon;
  export let title;
</script>

<div class="purchase-detail">
  <Accordion>
    <div class="label" slot="label">
      <div>{@html icon}</div>
      <span>{title}</span>
    </div>
    <div class="details" slot="content">
      <slot></slot>
    </div>
  </Accordion>
</div>

<style>
  .purchase-detail {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .label {
    display: flex;
    align-items: center;
  }

  .label div {
    width: 2.5rem;
    height: 24px;
  }

  .label span {
    margin-right: 1rem;
  }

  .details {
    max-width: 80%;
    margin-top: 0.875rem;
    margin-left: 2.5rem;
  }
</style>
