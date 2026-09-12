// Fails when a car on /vehicles needs a harness that doesn't exist yet

import Vehicles from '../src/lib/vehicles.json';
import CarHarnesses from '../src/lib/constants/car-harnesses.json';
import { products } from '../src/lib/data/products.js';

const store = process.env.VITE_SHOPIFY_STORE_URL;
const version = process.env.VITE_SHOPIFY_API_VERSION;

const variants = handle => `product(id: "${products[handle].id}") { variants(first: 250) { nodes { id title availableForSale } } }`;

const response = await fetch(`https://${store}/api/${version}/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
  },
  body: JSON.stringify({
    query: /* graphql */ `{ harness: ${variants('car-harness')} connector: ${variants('harness-connector')} }`,
  }),
});

const { data, errors } = await response.json();
if (!data) throw new Error(`Shopify request failed: ${JSON.stringify(errors)}`);

const sources = {
  'Shopify "car harness" variants': data.harness.variants.nodes,
  'Shopify "harness connector" variants': data.connector.variants.nodes,
  'car-harnesses.json': CarHarnesses,
};

// availableForSale is false only when a variant is out of stock with continue selling off
const connectors = new Set(Object.values(Vehicles).flat().map(car => car.harness_connector).filter(Boolean));
const problems = [...connectors].flatMap(connector => Object.entries(sources).flatMap(([source, entries]) => {
  const entry = entries.find(({ title }) => title === connector);
  if (!entry) return `${connector}: missing from ${source}`;
  if (entry.availableForSale === false) return `${connector}: not for sale in ${source}, turn on continue selling when out of stock`;
  return [];
}));

// every harness in our list must point at the live Shopify variant id
for (const { id, title } of CarHarnesses) {
  const variant = data.harness.variants.nodes.find(variant => variant.title === title);
  if (!variant) problems.push(`${title}: in car-harnesses.json but not a Shopify "car harness" variant`);
  else if (variant.id !== id) problems.push(`${title}: car-harnesses.json id should be ${variant.id}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`${connectors.size} harnesses on /vehicles pass`);
