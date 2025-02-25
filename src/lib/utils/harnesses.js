import { writable } from 'svelte/store';
import Vehicles from '$lib/vehicles.json';
import CarHarnesses from '$lib/constants/car-harnesses.json';

import { getProduct } from '$lib/utils/shopify';

async function fetchHarnessVariants() {
  const harnessResponse = await getProduct("gid://shopify/Product/4447447908415");
  const harnesses = harnessResponse.body?.data?.product?.variants?.nodes || [];
  return harnesses.reduce((harnessInfo, harness) => {
    harnessInfo[harness.id] = {
      currentlyNotInStock: harness.currentlyNotInStock,
      availableForSale: harness.availableForSale,
    };
    return harnessInfo;
  }, {});
}

const harnesses = writable([]);
let initialized = false;

async function initializeHarnesses() {
  if (initialized) return;

  const harnessInfo = await fetchHarnessVariants();

  let harnessList = Object.values(Vehicles).flatMap(make => {
    return make.map(model => {
      if (model.name === 'comma body') return false;
      const harness = CarHarnesses.find(harness => harness.title === model.harness_connector);
      if (!harness) {
        console.error(`No harness found for car ${model.name}`);
      }
      return {
        ...harnessInfo[harness.id],
        ...harness,
        car: model.name,
        package: model.package,
        angledMount: model.angled_mount,
        backordered: null,
      };
    }).filter(Boolean);
  });

  // add developer harnesses
  harnessList.push(...CarHarnesses.map(harness => {
    return {
      ...harnessInfo[harness.id],
      car: harness.title,
      id: harness.id,
      backordered: harness.backordered,
    };
  }));

  harnesses.set(harnessList);
  initialized = true;
}

initializeHarnesses();

export { harnesses };
