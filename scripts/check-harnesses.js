// Fails when a car on /vehicles needs a harness that doesn't exist yet

import Vehicles from '../src/lib/vehicles.json';
import CarHarnesses from '../src/lib/constants/car-harnesses.json';

const PRODUCTS = {
  'car harness': 'gid://shopify/Product/4447447908415',
  'harness connector': 'gid://shopify/Product/4310075310143',
};

async function getVariantTitles(id) {
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
        product(id: $id) { variants(first: 250) { nodes { title } } }
      }`,
      variables: { id },
    }),
  });

  const { data, errors } = await response.json();
  if (!data?.product) throw new Error(`Shopify request failed: ${JSON.stringify(errors ?? data)}`);
  return data.product.variants.nodes.map(variant => variant.title);
}

const sources = Object.fromEntries(await Promise.all(
  Object.entries(PRODUCTS).map(async ([name, id]) => [`${name} variants`, await getVariantTitles(id)])
));
sources['src/lib/constants/car-harnesses.json'] = CarHarnesses.map(harness => harness.title);

const connectors = [...new Set(Object.values(Vehicles).flat().map(car => car.harness_connector).filter(Boolean))];
const missing = connectors.flatMap(connector => Object.entries(sources)
  .filter(([, titles]) => !titles.includes(connector))
  .map(([source]) => `${connector}: missing from ${source}`));

if (missing.length) {
  console.error(missing.join('\n'));
  process.exit(1);
}

console.log(`${connectors.length} harnesses on /vehicles exist in Shopify`);
