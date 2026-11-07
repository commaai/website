// builds `shopify-meta` for Shopify's <shopify-payment-terms> banner, mirroring Liquid's `{{ form | payment_terms }}` output

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const price = (key, amount) => ({ [key]: usd.format(Number(amount)), [`${key}_amount`]: Number(amount) });

const priceRange = ({ minPrice, maxPrice }) => ({
  ...price('min_price', minPrice.amount),
  ...price('max_price', maxPrice.amount),
});

const paymentTerms = (amount, count) => ({
  ...price('full_price', amount),
  ...price('price_per_term', Math.floor((amount / count) * 100) / 100),
  number_of_payment_terms: count,
});

export function installmentsMeta({ shopPricing, amount, variantId, variantPricing }) {
  if (!(amount > 0) || !shopPricing?.financingPlans?.length || shopPricing.minPrice.currencyCode !== 'USD') return null;
  if (variantId && !variantPricing?.available) return null;

  const meta = {
    type: variantId ? 'product' : 'cart',
    currency_code: 'USD',
    country_code: 'US',
    ...priceRange(shopPricing),
    financing_plans: shopPricing.financingPlans.map((plan) => ({
      ...priceRange(plan),
      terms: plan.terms.map(({ apr, loanType, installmentsCount }) => ({
        apr,
        loan_type: loanType.toLowerCase(),
        installments_count: installmentsCount?.count,
      })),
    })),
    installments_buyer_prequalification_enabled: false,
  };

  if (!variantId) {
    return {
      ...meta,
      eligible: amount >= Number(shopPricing.minPrice.amount) && amount <= Number(shopPricing.maxPrice.amount),
      ...paymentTerms(amount, 4),
    };
  }

  return {
    ...meta,
    variants: [{
      id: Number(variantId.split('/').pop()),
      ...paymentTerms(amount, variantPricing.installmentsCount?.count || 4),
      eligible: variantPricing.eligible,
      available: true,
    }],
  };
}
