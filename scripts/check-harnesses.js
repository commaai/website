// Fails when a car on /vehicles needs a harness that doesn't exist yet

import Vehicles from '../src/lib/vehicles.json';
import CarHarnesses from '../src/lib/constants/car-harnesses.json';
import { products } from '../src/lib/data/products.js';

const store = process.env.VITE_SHOPIFY_STORE_URL;
const version = process.env.VITE_SHOPIFY_API_VERSION;

const variantTitles = handle => `product(id: "${products[handle].id}") { variants(first: 250) { nodes { title } } }`;

const response = await fetch(`https://${store}/api/${version}/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
  },
  body: JSON.stringify({
    query: /* graphql */ `{ harness: ${variantTitles('car-harness')} connector: ${variantTitles('harness-connector')} }`,
  }),
});

const { data, errors } = await response.json();
if (!data) throw new Error(`Shopify request failed: ${JSON.stringify(errors)}`);

const sources = {
  'car harness variants': data.harness.variants.nodes.map(({ title }) => title),
  'harness connector variants': data.connector.variants.nodes.map(({ title }) => title),
  'car-harnesses.json': CarHarnesses.map(({ title }) => title),
};

const connectors = new Set(Object.values(Vehicles).flat().map(car => car.harness_connector).filter(Boolean));
const missing = [...connectors].flatMap(connector => Object.entries(sources)
  .filter(([, titles]) => !titles.includes(connector))
  .map(([source]) => `${connector}: missing from ${source}`));

if (missing.length) {
  console.error(missing.join('\n'));
  process.exit(1);
}

console.log(`${connectors.size} harnesses on /vehicles exist in Shopify`);
