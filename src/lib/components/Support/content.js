import ShippingIcon from '$lib/icons/features/shipping.svg';
import WarrantyIcon from '$lib/icons/features/warranty.svg';
import CarIcon from '$lib/icons/features/car.svg';
import CommaIcon from '$lib/icons/comma.svg?raw';
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
import homeMarkdown from '$lib/content/support/index.md?raw';
import { parseFrontmatter, renderArticle } from './markdown';

const productImages = {
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

const optionImages = { shipping: ShippingIcon, warranty: WarrantyIcon, car: CarIcon };
const productIcons = { comma: CommaIcon };

function lookup(images, name, path) {
  if (!images[name]) throw new Error(`Unknown image "${name}" in ${path}`);
  return images[name];
}

// Maps each file's slug to its frontmatter, any fields from images(metadata, path), and its rendered body.
function loadMarkdown(files, images = () => ({})) {
  return new Map(Object.entries(files).map(([path, source]) => {
    const slug = path.split('/').pop().slice(0, -'.md'.length);
    const { metadata, body } = parseFrontmatter(path, source);
    if (!metadata.title) throw new Error(`Missing title in ${path}`);
    return [slug, { ...metadata, ...images(metadata, path), ...renderArticle(body) }];
  }));
}

export const articles = loadMarkdown(
  import.meta.glob(['/src/lib/content/support/*.md', '!/src/lib/content/support/index.md'], { eager: true, query: '?raw', import: 'default' })
);

export const products = loadMarkdown(
  import.meta.glob('/src/lib/content/products/*.md', { eager: true, query: '?raw', import: 'default' }),
  (metadata, path) => ({
    image: metadata.image && lookup(productImages, metadata.image, path),
    icon: metadata.icon && lookup(productIcons, metadata.icon, path)
  })
);

// Each option is a list item: "- [Title](/href) — Description" followed by an indented "image: name" line.
const home = parseFrontmatter('support/index.md', homeMarkdown);
export const supportHome = {
  ...home.metadata,
  options: [...home.body.matchAll(/^- \[(.+)\]\((\S+)\) — (.+)\n\s+image: (\S+)$/gm)].map(([, title, href, description, image]) => ({
    title, href, description, image: lookup(optionImages, image, 'support/index.md')
  }))
};
