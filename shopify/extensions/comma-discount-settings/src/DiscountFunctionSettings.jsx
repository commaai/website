import "@shopify/ui-extensions/preact";
import {render} from "preact";
import {useState} from "preact/hooks";

const NAMESPACE = "$app:comma-discounts";
const KEY = "config";

export default async () => {
  // The discount's config metafield needs a DISCOUNT-owned definition with
  // merchant write access before the settings form can write it — otherwise
  // saving fails with "Access to this namespace and key ... is not allowed".
  // Create it once (idempotent) on load.
  await ensureConfigDefinition();
  render(<App />, document.body);
};

async function ensureConfigDefinition() {
  try {
    const existing = await shopify.query(
      `query {
        metafieldDefinitions(first: 1, ownerType: DISCOUNT, namespace: "${NAMESPACE}", key: "${KEY}") {
          nodes { id }
        }
      }`,
    );
    if (existing?.data?.metafieldDefinitions?.nodes?.length) return;

    const created = await shopify.query(
      `mutation Create($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition { id }
          userErrors { message }
        }
      }`,
      {
        variables: {
          definition: {
            access: {admin: "MERCHANT_READ_WRITE"},
            namespace: NAMESPACE,
            key: KEY,
            name: "comma discount config",
            ownerType: "DISCOUNT",
            type: "json",
          },
        },
      },
    );
    const errs = created?.data?.metafieldDefinitionCreate?.userErrors;
    if (errs?.length) console.error("metafield definition:", errs);
  } catch (e) {
    console.error("ensureConfigDefinition failed", e);
  }
}

// Each comma discount is one of three types. Picking a type writes it to the
// discount's config metafield (read by the function) and sets the matching
// discount class. Create a separate discount per type so they report separately
// in analytics.
const TYPES = [
  {value: "free_harness", label: "Free car harness (per paired comma four)", classes: ["product"]},
  {value: "fifty_off", label: "$50 off comma four (no harness)", classes: ["product"]},
  {value: "bulk", label: "Bulk order discount (10% at 10+ comma four)", classes: ["order"]},
];

function App() {
  const {data, applyMetafieldChange, discounts} = shopify;

  let initial = "";
  try {
    const mf = data?.metafields?.find((m) => m.key === KEY);
    initial = JSON.parse(mf?.value || "{}").type || "";
  } catch (_) {
    initial = "";
  }

  const [type, setType] = useState(initial);
  const [error, setError] = useState();

  const onSelect = async (value) => {
    setType(value);
    const def = TYPES.find((t) => t.value === value);
    if (!def) return;
    const result = await discounts?.updateDiscountClasses?.(def.classes);
    if (result && result.success === false) {
      setError("Couldn't set the discount class. Try again.");
    } else {
      setError(undefined);
    }
  };

  return (
    <s-function-settings
      onSubmit={(event) => {
        event.waitUntil?.(
          applyMetafieldChange({
            type: "updateMetafield",
            namespace: NAMESPACE,
            key: KEY,
            value: JSON.stringify({type}),
            valueType: "json",
          }),
        );
      }}
    >
      <s-heading>comma discount</s-heading>
      <s-section>
        <s-stack gap="base">
          {error ? <s-banner tone="critical">{error}</s-banner> : null}
          <s-paragraph>
            Pick which offer this discount is. Create a separate discount for each
            so they report separately in analytics.
          </s-paragraph>
          <s-select
            label="Discount type"
            value={type}
            onChange={(event) => onSelect(event.currentTarget.value)}
          >
            <s-option value="">Select…</s-option>
            {TYPES.map((t) => (
              <s-option value={t.value}>{t.label}</s-option>
            ))}
          </s-select>
        </s-stack>
      </s-section>
    </s-function-settings>
  );
}
