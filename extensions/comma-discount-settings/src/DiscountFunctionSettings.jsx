import "@shopify/ui-extensions/preact";
import {render} from "preact";
import {useState} from "preact/hooks";

export default async () => {
  render(<App />, document.body);
};

// The free-harness + bulk-order rules live in the function code
// (extensions/comma-discounts/src/cart_lines_discounts_generate_run.js). This
// settings panel only has to turn on the discount classes the function emits —
// Product (free harness) and Order (bulk 10%) — so Shopify lets it apply both.
function App() {
  const {i18n, discounts} = shopify;
  const discountClasses = discounts?.discountClasses?.value ?? [];
  const [error, setError] = useState();

  const toggleClass = async (cls) => {
    const next = discountClasses.includes(cls)
      ? discountClasses.filter((c) => c !== cls)
      : [...discountClasses, cls];
    const result = await discounts?.updateDiscountClasses?.(next);
    if (!result?.success) {
      setError(i18n.translate("error"));
    } else if (error) {
      setError(undefined);
    }
  };

  return (
    <s-function-settings>
      <s-heading>{i18n.translate("title")}</s-heading>
      <s-section>
        <s-stack gap="base">
          {error ? <s-banner tone="critical">{error}</s-banner> : null}
          <s-paragraph>{i18n.translate("description")}</s-paragraph>
          <s-checkbox
            checked={discountClasses.includes("product")}
            onChange={() => toggleClass("product")}
            label={i18n.translate("discountClasses.product")}
          />
          <s-checkbox
            checked={discountClasses.includes("order")}
            onChange={() => toggleClass("order")}
            label={i18n.translate("discountClasses.order")}
          />
        </s-stack>
      </s-section>
    </s-function-settings>
  );
}
