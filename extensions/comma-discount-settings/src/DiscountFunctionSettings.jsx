import "@shopify/ui-extensions/preact";
import {render} from "preact";
import {useState} from "preact/hooks";

export default async () => {
  render(<App />, document.body);
};

// This function only emits an order-class discount (the 10% bulk on comma
// fours). The free harness + $50-off are separate native Shopify discounts, so
// the panel just needs to enable the Order class.
function App() {
  const {i18n, discounts} = shopify;
  const discountClasses = discounts?.discountClasses?.value ?? [];
  const [error, setError] = useState();

  const toggleOrder = async () => {
    const next = discountClasses.includes("order")
      ? discountClasses.filter((c) => c !== "order")
      : [...discountClasses, "order"];
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
            checked={discountClasses.includes("order")}
            onChange={toggleOrder}
            label={i18n.translate("discountClasses.order")}
          />
        </s-stack>
      </s-section>
    </s-function-settings>
  );
}
