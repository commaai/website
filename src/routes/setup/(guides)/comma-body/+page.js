import CommaThreeDeviceImage from "$lib/images/device.png";
import CommaBodyImage from "$lib/images/comma-body.png";
import CommaBodyAssemblyInstructionsImage from "$lib/images/setup/comma-body/comma-body-assembly-instructions.jpeg";
import { THREEX_PRICE } from '$lib/constants/prices.js';

export async function load() {
  return {
    banner: { label: "Setup", link: "/setup" },
    product: 'comma body',
    title: 'Assembly Instructions',
    imgSrc: CommaBodyAssemblyInstructionsImage,
    stepCount: 8,
    minuteEstimate: 40,
    parts: [
      {
        name: 'comma 3X',
        price: `from $${THREEX_PRICE}`,
        image: CommaThreeDeviceImage,
        link: '/shop/comma-3x',
        contents: ['comma 3X', 'right-angle OBD-C cable (1.5 ft)', '2 mounts']
      },
      {
        name: 'comma body',
        price: '$999',
        image: CommaBodyImage,
        link: '/shop/body',
        contents: ['comma body kit (base, rails, and hardware)', '29.4V 2A charger', 'USB-C 6.6ft 90 deg cable']
      },
    ],
    notes: [],
  }
};
