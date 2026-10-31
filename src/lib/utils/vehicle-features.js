// Cars without researched stock features are assumed to have the most capable stock systems,
// so we never claim to "add" something the car may already have.
const ASSUMED_STOCK_FEATURES = {
  lane_centering: 'lane_centering',
  driver_monitoring: 'camera',
  fcw: true,
  dashcam: 'none',
};

// Returns what openpilot + comma four adds to or upgrades in a car from vehicles.json, adds first.
// Each feature includes a kind, label, description, and optional detail and link.
export function getVehicleFeatures(car) {
  const stock = car.stock_features ?? ASSUMED_STOCK_FEATURES;
  const openpilotLongitudinal = car.longitudinal === 'openpilot';
  const features = [];

  const laneCenteringMinSpeed = Math.max(car.min_steer_speed_mph, car.min_enable_speed_mph);
  const laneCenteringDetails = [laneCenteringMinSpeed > 0 ? `above ${laneCenteringMinSpeed} mph` : 'at all speeds'];
  features.push({
    kind: stock.lane_centering === 'lane_centering' ? 'upgrades' : 'adds',
    label: 'lane centering',
    description: 'Natural steering, even without lane lines',
    href: '/openpilot#lane-centering',
    detail: laneCenteringDetails.join(', '),
  });

  if (openpilotLongitudinal) {
    let detail;
    if (car.min_enable_speed_mph > 0) {
      detail = `above ${car.min_enable_speed_mph} mph`;
    } else if (car.auto_resume) {
      detail = 'resumes from a stop';
    }
    features.push({
      kind: 'upgrades',
      label: 'adaptive cruise control',
      description: 'Smooth, human-like braking and acceleration',
      href: '/openpilot#adaptive-cruise-control',
      detail,
    });
  }

  features.push({
    kind: stock.driver_monitoring === 'camera' ? 'upgrades' : 'adds',
    label: 'driver monitoring',
    description: 'A camera helps keep you attentive',
    href: '/openpilot#driver-monitoring',
  });

  // Model-based warnings run regardless of who controls gas and brakes.
  features.push({
    kind: stock.fcw ? 'upgrades' : 'adds',
    label: 'forward collision warning',
    description: 'Anticipates collision risks on the road ahead',
    href: '/openpilot#forward-collision-warning',
  });

  if (car.experimental_mode) {
    features.push({
      kind: 'adds',
      label: 'traffic light and stop sign handling',
      description: 'Stops for red lights and stop signs',
      href: '/openpilot#adaptive-cruise-control',
    });
  }

  if (stock.dashcam !== 'multi') {
    features.push({
      kind: 'adds',
      label: '360° dashcam',
      description: 'Records the road and cabin together',
      href: '/openpilot#dashcam',
    });
  }

  // comma connect features
  features.push({
    kind: 'adds',
    label: 'drive replays on your phone',
    description: 'Watch and share clips of past drives',
    href: '/connect',
  });
  features.push({
    kind: 'adds',
    label: 'live location and remote camera',
    description: 'Check on your car from anywhere',
    detail: 'with connect subscription',
    href: '/connect',
  });

  return [
    ...features.filter((feature) => feature.kind === 'adds'),
    ...features.filter((feature) => feature.kind === 'upgrades'),
  ];
}
