import CommaThreeDeviceImage from "$lib/images/device.png";
import CarHarnessImage from "$lib/images/products/car-harness/car-harness.jpg";
import { THREEX_PRICE, CAR_HARNESS_PRICE } from '$lib/constants/prices.js';

export async function load() {
  return {
    banner: { label: "Setup", link: "/setup" },
    product: 'comma 3X',
    title: 'Setup Guide',
    videoSrc: "https://www.youtube.com/embed/hrA3czvBo2w?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0",
    stepCount: 5,
    minuteEstimate: 15,
    parts: [
      {
        name: 'comma 3X',
        price: `$${THREEX_PRICE}`,
        image: CommaThreeDeviceImage,
        link: '/shop/comma-3x',
        contents: ['comma 3X', 'right-angle OBD-C cable (1.5 ft)', '2 mounts']
      },
      {
        name: 'car harness',
        price: `$${CAR_HARNESS_PRICE}`,
        image: CarHarnessImage,
        link: '/shop/car-harness',
        contents: ['car harness (harness box & connector)', 'comma power']
      },
    ],
    notes: [],
  }
};
