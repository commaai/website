// Cars without researched stock features are assumed to have the most capable stock systems,
// so we never claim to "add" something the car may already have.
const ASSUMED_STOCK_FEATURES = {
  lane_centering: 'lane_centering',
  driver_monitoring: 'camera',
  fcw: true,
  dashcam: 'none',
};

// Makes whose cars already get driving improvements over the air
const OTA_MAKES = ['Tesla', 'Rivian'];

// Returns what openpilot + comma four adds to or upgrades in a car from vehicles.json, adds first.
// Each feature includes a kind, label, description, and optional detail and link.
export function getVehicleFeatures(car) {
  const stock = car.stock_features ?? ASSUMED_STOCK_FEATURES;
  const openpilotLongitudinal = car.longitudinal === 'openpilot';
  const features = [];

  // Cars with camera-based driver monitoring already offer hands-off driving and lane changes (e.g. Super Cruise, BlueCruise)
  const stockHandsFree = stock.driver_monitoring === 'camera';
  features.push({
    kind: stockHandsFree ? 'upgrades' : 'adds',
    label: 'hands-off, eyes-on driving',
    description: 'No wheel nags, even on long drives',
    href: '/openpilot#driver-monitoring',
  });

  if (car.experimental_mode) {
    features.push({
      kind: 'adds',
      label: 'traffic light and stop sign handling',
      description: 'Stops for red lights and stop signs',
      href: '/openpilot#adaptive-cruise-control',
    });
  }

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
    kind: stockHandsFree ? 'upgrades' : 'adds',
    label: 'assisted lane changes',
    description: 'Signal and nudge the wheel, openpilot does the rest',
    href: '/openpilot#lane-centering',
  });

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

  if (stock.dashcam !== 'multi') {
    features.push({
      kind: 'adds',
      label: '360° dashcam',
      description: 'Road and night-vision cabin cameras, backed up to the cloud',
      href: '/openpilot#dashcam',
    });
  }

  features.push({
    kind: OTA_MAKES.some((make) => car.name.startsWith(make)) ? 'upgrades' : 'adds',
    label: 'over-the-air updates',
    description: 'Gets better with every openpilot release',
    href: '/openpilot',
  });

  features.push({
    kind: 'adds',
    label: 'check on your car from anywhere',
    description: 'Live GPS location and remote camera',
    detail: 'with connect subscription',
    href: '/connect',
  });

  return [
    ...features.filter((feature) => feature.kind === 'adds'),
    ...features.filter((feature) => feature.kind === 'upgrades'),
  ];
}
