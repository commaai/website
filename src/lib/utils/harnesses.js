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

let _initPromise = null;
let _vehicleHarnesses = [];
let _genericHarnesses = [];
let _allHarnesses = [];

async function _initialize() {
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
        backordered: harness?.backordered,
        setupNotes: model.setup_notes,
        setupVideo: model.setup_video,
      };
    }).filter(Boolean);
  });
  _vehicleHarnesses = vehiclesHarnessList;

  // Add developer and generic make harnesses
  let genericHarnessList = CarHarnesses.map(harness => ({
    ...harnessInfo[harness.id],
    car: harness.title,
    id: harness.id,
    backordered: harness.backordered,
  }));
  _genericHarnesses = genericHarnessList;

  _allHarnesses = vehiclesHarnessList.concat(genericHarnessList);
}

export function initializeHarnesses() {
  if (!_initPromise) _initPromise = _initialize();
  return _initPromise;
}

export function getHarnesses({ vehicle = true, generic = true } = {}) {
  if (vehicle && generic) return _allHarnesses;
  if (vehicle) return _vehicleHarnesses;
  return _genericHarnesses;
}
