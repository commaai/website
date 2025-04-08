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

let initialized = false;
const vehicleHarnesses = writable([]); // List of vehicle model harnesses, excluding developer and generic make harnesses
const genericHarnesses = writable([]); // List of developer and generic make harnesses
const allHarnesses = writable([]); // List of all vehicle model harnesses, including developer and generic make harnesses

async function initializeHarnesses() {
  if (initialized) return;

  const harnessInfo = await fetchHarnessVariants();

  // Add harnesses for vehicles
  let vehiclesHarnessList = Object.entries(Vehicles).flatMap(([make, models]) => {
    return models.map(model => {
      if (model.name === 'comma body') return false;
      const harness = CarHarnesses.find(harness => harness.title === model.harness_connector);
      if (!harness) {
        console.error(`No harness found for car ${model.name}`);
        return false;
      }
      return {
        ...harnessInfo[harness.id],
        ...harness,
        make,
        car: model.name,
        package: model.package,
        angledMount: model.angled_mount,
        backordered: harness?.backordered,  // these overrides are only shown if the harness is out of stock in Shopify
        setupVideo: model.setup_video_link,
      };
    }).filter(Boolean);
  });
  vehicleHarnesses.set(vehiclesHarnessList);

  // Add developer and generic make harnesses
  let genericHarnessList = CarHarnesses.map(harness => {
    return {
      ...harnessInfo[harness.id],
      car: harness.title,
      id: harness.id,
      backordered: harness.backordered,
    };
  });
  genericHarnesses.set(genericHarnessList);

  // Combine the two lists
  let allHarnessList = vehiclesHarnessList.concat(genericHarnessList);
  allHarnesses.set(allHarnessList);

  initialized = true;
}

initializeHarnesses();

export { allHarnesses, vehicleHarnesses, genericHarnesses };
