// Prices used across multiple pages
// These can override Shopify API prices when needed

// turns price red
export const FOUR_SALE = true;
export const FOUR_STRIKETHROUGH_PRICE = 999;

export const FOUR_PRICE = 899;
export const FOUR_TRADE_IN_CREDIT = 150;
export const NO_HARNESS_DISCOUNT = 50;

// Affirm's longest term, which is the one we advertise since it's the lowest monthly.
// Verified against affirm.com's own calculator at $699/$749/$949/$999 — same term and
// rate across the range, so the monthly scales with the price.
export const AFFIRM_APR = 0.15;
export const AFFIRM_TERM_MONTHS = 12;

// Standard amortized payment. Rounded up, so we never advertise less than what Affirm charges.
export function affirmMonthly(price) {
  const monthlyRate = AFFIRM_APR / 12;
  const payment = price * monthlyRate / (1 - Math.pow(1 + monthlyRate, -AFFIRM_TERM_MONTHS));
  return Math.ceil(payment);
}
