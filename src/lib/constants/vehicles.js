import vehicles from '$lib/vehicles.json'

export const vehicleCountText = `${Math.round(Object.values(vehicles).reduce((sum, list) => sum + list.length, 0) / 25) * 25}+`;
