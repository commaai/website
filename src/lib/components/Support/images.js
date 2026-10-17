import ShippingIcon from '$lib/icons/features/shipping.svg';
import WarrantyIcon from '$lib/icons/features/warranty.svg';
import CarIcon from '$lib/icons/features/car.svg';
import CommaFourImage from '$lib/images/products/comma-four/four_screen_on.png?w=900';
import ChestnutImage from '$lib/images/products/chestnut/bnut_front.png?w=900';
import CarHarnessImage from '$lib/images/products/car-harness/car-harness.jpg?w=900';
import CommaPowerImage from '$lib/images/products/comma-power/comma-power.jpg?w=900';
import Comma3XImage from '$lib/images/products/comma-3x/comma-3x.jpg?w=900';
import CommaThreeImage from '$lib/images/device.png?w=900';
import CommaTwoImage from '$lib/images/products/comma-two/comma-two.jpg?w=900';
import CommaBodyImage from '$lib/images/products/body/comma-body.jpg?w=900';
import CommaPandaImage from '$lib/images/products/panda/red-panda.jpg?w=900';
import CommaJungleImage from '$lib/images/products/panda-jungle/panda-jungle-v2.jpeg?w=900';

const supportIcons = { shipping: ShippingIcon, warranty: WarrantyIcon, car: CarIcon };

export function supportIcon(name) {
  if (!supportIcons[name]) throw new Error(`Unknown support image: ${name}`);
  return supportIcons[name];
}

export const productImages = {
  'comma-four': CommaFourImage,
  chestnut: ChestnutImage,
  'car-harness': CarHarnessImage,
  'comma-power': CommaPowerImage,
  'comma-3x': Comma3XImage,
  'comma-three': CommaThreeImage,
  'comma-two': CommaTwoImage,
  'comma-body': CommaBodyImage,
  'comma-panda': CommaPandaImage,
  'comma-jungle': CommaJungleImage
};
