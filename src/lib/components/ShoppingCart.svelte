<script>
  import { createEventDispatcher } from "svelte";
  import { get } from "svelte/store";
  import {
    cartItems,
    cartDiscount,
    cartDiscountAllocations,
    cartSubtotal,
    cartReferralDiscount,
    checkoutUrl,
  } from "../../store";
  import Button from "./Button.svelte";
  import SteppableInput from "./SteppableInput.svelte";
  import Space from "./Space.svelte";
  import { formatCurrency } from "$lib/utils/currency";

  export let loading = false;

  const dispatch = createEventDispatcher();

  function updateProductQuantity(item, quantity) {
    loading = true;
    dispatch("updateProduct", {
      body: {
        variantId: item.node.merchandise.id,
        quantity: quantity,
        lineId: item.node.id,
      },
    });
  }

  async function checkout() {
    loading = true;
    window.open(get(checkoutUrl), "_self");
    loading = false;
  }
</script>

<div class="overlay" role="presentation" on:click />
<div class="sidemenu" role="dialog" aria-modal="true">
  <div class="header">
    <span>Your Cart</span>
    <button on:click>×</button>
  </div>
  <div class="inventory">
    {#if $cartItems?.length === 0}
      <div class="empty">Your cart is empty.</div>
    {/if}
    {#each $cartItems as item}
      {@const imageUrl = item.node.merchandise.image?.url || item.node.merchandise.product.images.edges[0].node.originalSrc}
      {@const referralDiscountAllocation = item.node.discountAllocations?.find(
        ({ code }) => code?.toLowerCase() === $cartReferralDiscount?.code?.toLowerCase()
      )}
      {@const priceExcludingReferralDiscount = {
        amount: Number(item.node.estimatedCost.totalAmount.amount) + Number(referralDiscountAllocation?.discountedAmount.amount || 0),
        currencyCode: item.node.estimatedCost.totalAmount.currencyCode
      }}
      <div class="item">
        <img
          alt={item.node.merchandise.product.title}
          src={imageUrl}
        />
        <div class="details">
          <div class="title">
            {item.node.merchandise.product.title}
          </div>
          {#if item.node.merchandise.title !== "Default Title"}
            <div class="variant">
              {item.node.merchandise.title}
            </div>
          {/if}
          <Space multiplier={0.5} />
          <SteppableInput
            label="quantity"
            onChange={(nextQuantity) => {
              updateProductQuantity(item, nextQuantity);
            }}
            value={item.node.quantity}
          />
        </div>
        <div>
          {formatCurrency(priceExcludingReferralDiscount)}
        </div>
      </div>
    {/each}
  </div>
  <div class="footer">
    {#if $cartItems?.length !== 0}
      {@const referralDiscountAmount = $cartReferralDiscount?.amount || 0}
      {@const hasReferralDiscount = Boolean($cartReferralDiscount)}
      {@const bulkDiscountAllocation = $cartDiscountAllocations.find(({ title }) => title?.toUpperCase() === 'BULK ORDER')}
      {#if hasReferralDiscount}
        <div class="referral-discount">
          <div class="referral-details">
            <strong>Referral discount applied</strong>
            <span class="referral-code">{$cartReferralDiscount.code}</span>
          </div>
          <h4 class="referral-amount">-{formatCurrency({ amount: referralDiscountAmount, currencyCode: $cartSubtotal.currencyCode }, 0)}</h4>
        </div>
      {/if}
      {#if $cartDiscount || hasReferralDiscount}
        {@const subtotalAmountBeforeDiscount = Number($cartSubtotal.amount) + Number(referralDiscountAmount || 0)}
        {@const subtotalAmountAfterDiscount = Number($cartSubtotal.amount) - Number($cartDiscount?.amount || 0)}
        {#if bulkDiscountAllocation && !hasReferralDiscount}
          <div class="price">
            <span>Bulk Order Discount</span>
            <span>
              -{formatCurrency(bulkDiscountAllocation.discountedAmount)}
            </span>
          </div>
        {/if}
        <div class="price">
          <span>Subtotal</span>
          <span><s>{formatCurrency({ amount: subtotalAmountBeforeDiscount, currencyCode: $cartSubtotal.currencyCode })}</s> {formatCurrency({ amount: subtotalAmountAfterDiscount, currencyCode: $cartSubtotal.currencyCode })}</span>
        </div>
      {:else}
        <div class="price">
          <span>Subtotal</span>
          <span>{formatCurrency($cartSubtotal)}</span>
        </div>
      {/if}
      <div class="disclaimer">
        Customs/duties/taxes are between you and your country.
      </div>
      <Button on:click={checkout} style="accent" fullWidth={true}>
        Checkout
      </Button>
    {/if}
  </div>
</div>

<style>
  .referral-discount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 5rem;
    padding: 1rem;
    box-sizing: border-box;
    background: rgba(81, 255, 0, 0.18);

    & .referral-amount {
      margin: 0;
      color: var(--color-accent-hover);
      white-space: nowrap;
    }
  }

  .referral-details {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    & .referral-code {
      color: rgba(0, 0, 0, 0.65);
      font-size: 0.875rem;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
  }

  .sidemenu {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    top: 6rem;
    bottom: 2rem;
    width: 340px;
    background-color: #fff;
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 11;
    border-radius: 0.5rem 0 0 0.5rem;

    @media screen and (max-width: 1300px) {
      top: 9rem;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem 1rem 1rem;

    & span {
      font-size: 1.25rem;
      color: #000;
    }

    & button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 2rem;
    }
  }

  .inventory {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;

    & .empty {
      text-align: center;
    }

    & .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
      flex: 1;

      & img {
        width: 65px;
        height: auto;
      }

      & .details {
        flex: 1;
        margin: 0 0.75rem;

        & .title {
          font-size: 1rem;
          font-weight: bold;
        }

        & .variant {
          font-size: 0.875rem;
          opacity: 0.8;
        }
      }
    }
  }

  .footer {
    padding: 1rem;
    display: flex;
    flex-flow: column;
    gap: 1rem;

    & .price {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      text-transform: uppercase;

      & span {
        color: #000;
      }

      & s {
        margin-right: 0.25rem;
      }
    }

    & .disclaimer {
      font-size: 0.75rem;
      text-align: center;
    }
  }
</style>
