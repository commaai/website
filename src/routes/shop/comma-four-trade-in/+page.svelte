<script>
  import { FOUR_PRICE, FOUR_STRIKETHROUGH_PRICE, FOUR_TRADE_IN_CREDIT } from '$lib/constants/prices.js';
</script>

<svelte:head>
  <title>comma four trade-in — comma shop</title>
</svelte:head>

<section class="light" id="trade-in">
  <div class="container">
    <h1 class="type-h2">comma four trade-in</h1>

    <div class="content type-prose">
      <p>
        Trade in any older comma device (EON, comma two, comma three, or comma 3X) for ${FOUR_TRADE_IN_CREDIT} credit towards a brand new comma four. Device can be in any condition as long as you are the original purchaser.
      </p>

      <hr>
      <strong class="type-h5">Trade-in Instructions</strong>
      <p>
        1. Check the trade-in option on the <a href="/shop/comma-four" class="highlight">comma four</a> product page. If you forgot to do this before placing your order, please contact <a href="/support" class="highlight">support</a>.
      </p>
      <p>
        2. We ship you a new comma four.
      </p>
      <p>
        3. Ship your old comma device back to us with tracking within 30 days of receiving your new comma four.
        <br>
        <u>You must include your trade-in comma four order number <b>and</b> the trade-in device's original order number <b>inside</b> the box.</u>
        Can't find it? Open a ticket with <a href="/support" class="highlight">support</a>.
      </p>
      <p>Address to:</p>
      <p class="type-small" style="margin-left: 1em"><b>
        comma four upgrade<br>
        Upgrade Order #<br>
        3900 Harney Street<br>
        San Diego, CA 92110<br>
      </b></p>
      <p>
        4. When the old comma device arrives, we apply your trade-in credit (${FOUR_TRADE_IN_CREDIT}) to your original payment method. Please give us 1-2 business days to process the device once it arrives.
      </p>

      <hr>
      <strong class="type-h5">THE FINE PRINT</strong>
      <ul>
        <li>
          This trade-in offer is ONLY good for the original device owner. <b>What does this mean?</b> The device sent for trade-in must have been purchased
          from the comma shop by the same person purchasing the comma four trade-in offer. The name and/or address on the original and new comma four order must
          be the same. Resale and second market devices do not qualify for trade-in at this time. You must include your original comma device's order number <b>and</b>
          your trade-in order number with your device when returning it. We reserve the right to cancel orders that do not follow this policy.
        </li>
        <li>
          Devices sent in for trade-in cannot be returned, even if you cancel or return your order later.
        </li>
        <li>
          This offer is for new comma four purchases only.
        </li>
        <li>
          The regular trade-in credit is ${FOUR_TRADE_IN_CREDIT + FOUR_STRIKETHROUGH_PRICE - FOUR_PRICE}. During a sale it is reduced by the sale discount to the current credit of ${FOUR_TRADE_IN_CREDIT}.
        </li>
        <li>
          Trade-in device must be shipped back to us within 30 days of receiving your new comma four. We are not responsible for lost or damaged packages.
          Please be sure to have tracking on your package. Ship your device according to local laws and regulations.
        </li>
      </ul>
    </div>
  </div>
</section>

<style>
  h1 {
    margin-bottom: 2rem;
  }

  li {
    margin-bottom: 1rem;
  }

  .content {
    max-width: 800px;
  }

  .content strong {
    display: block;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .content p {
    margin: 1rem 0;
  }

  .content hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.15);
  }
</style>

