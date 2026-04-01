import Vehicles from '$lib/vehicles.json';
import CarHarnesses from '$lib/constants/car-harnesses.json';

import { getProduct } from '$lib/utils/shopify';

// Simple store without Svelte
function createStore(initialValue) {
  let value = initialValue;
  const listeners = new Set();
  return {
    get() { return value; },
    set(newValue) {
      value = newValue;
      listeners.forEach(fn => fn(value));
    },
    subscribe(fn) {
      listeners.add(fn);
      fn(value);
      return () => listeners.delete(fn);
    }
  };
}

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
const vehicleHarnesses = createStore([]);
const genericHarnesses = createStore([]);
const allHarnesses = createStore([]);

async function initializeHarnesses() {
  if (initialized) return;

  const harnessInfo = await fetchHarnessVariants();

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
        backordered: harness?.backordered,
        setupNotes: model.setup_notes,
        setupVideo: model.setup_video,
      };
    }).filter(Boolean);
  });
  vehicleHarnesses.set(vehiclesHarnessList);

  let genericHarnessList = CarHarnesses.map(harness => {
    return {
      ...harnessInfo[harness.id],
      car: harness.title,
      id: harness.id,
      backordered: harness.backordered,
    };
  });
  genericHarnesses.set(genericHarnessList);

  let allHarnessList = vehiclesHarnessList.concat(genericHarnessList);
  allHarnesses.set(allHarnessList);

  initialized = true;
}

initializeHarnesses();

export { allHarnesses, vehicleHarnesses, genericHarnesses };
