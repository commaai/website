// Fails when a car on /vehicles needs a harness we can't sell: missing from
// car-harnesses.json, or missing / not for sale in Shopify

import Vehicles from '../src/lib/vehicles.json';
import CarHarnesses from '../src/lib/constants/car-harnesses.json';

const PRODUCTS = {
  'car harness': 'gid://shopify/Product/4447447908415',
  'harness connector': 'gid://shopify/Product/4310075310143',
};

async function getVariants(id) {
  const store = process.env.VITE_SHOPIFY_STORE_URL;
  const version = process.env.VITE_SHOPIFY_API_VERSION;
  const response = await fetch(`https://${store}/api/${version}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({
      query: `query getVariants($id: ID!) {
        product(id: $id) { variants(first: 250) { nodes { id title availableForSale } } }
      }`,
      variables: { id },
    }),
  });

  const { data, errors } = await response.json();
  if (!data?.product) throw new Error(`Shopify request failed: ${JSON.stringify(errors ?? data)}`);
  return data.product.variants.nodes;
}

const variants = Object.fromEntries(await Promise.all(
  Object.entries(PRODUCTS).map(async ([name, id]) => [name, await getVariants(id)])
));

const connectors = [...new Set(Object.values(Vehicles).flat().map(car => car.harness_connector).filter(Boolean))];
const problems = [];

for (const connector of connectors) {
  for (const [product, nodes] of Object.entries(variants)) {
    const variant = nodes.find(node => node.title === connector);
    if (!variant) problems.push(`${connector}: no ${product} variant in Shopify`);
    else if (!variant.availableForSale) problems.push(`${connector}: ${product} variant is not for sale in Shopify`);
  }

  const mapped = CarHarnesses.find(harness => harness.title === connector);
  const variant = variants['car harness'].find(node => node.title === connector);
  if (variant && mapped?.id !== variant.id) {
    problems.push(`${connector}: src/lib/constants/car-harnesses.json needs {"id": "${variant.id}", "title": "${connector}"}`);
  }
}

if (problems.length) {
  console.error(`${problems.length} harness problems:\n${problems.join('\n')}`);
  process.exit(1);
}

console.log(`${connectors.length} harnesses on /vehicles are for sale`);
