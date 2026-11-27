// schema.org JSON-LD for Google rich results, rendered through <Seo jsonLd={…}>.
// Only facts already on the site go here: Shopify product data fetched at build time,
// the shipping and returns copy in src/lib/content/support/orders-returns.md, and the
// shipping notes on the product pages. No ratings, reviews or GTINs.

import { ORIGIN, SITE_NAME, absoluteUrl, canonicalUrl } from './site.js';

const SCHEMA = 'https://schema.org';
const schemaUrl = name => `${SCHEMA}/${name}`;

export const ORGANIZATION_ID = `${ORIGIN}/#organization`;
const WEBSITE_ID = `${ORIGIN}/#website`;
const RETURNS_PAGE = `${ORIGIN}/support/orders-returns`;

// profiles linked from the footer (src/lib/components/SocialIcons.svelte)
const SAME_AS = [
  'https://github.com/commaai',
  'https://twitter.com/comma_ai',
  'https://www.instagram.com/comma_ai',
  'https://www.youtube.com/commaai',
  'https://discord.comma.ai',
];

const usd = value => ({ '@type': 'MonetaryAmount', value, currency: 'USD' });
const days = (minValue, maxValue) => ({ '@type': 'QuantitativeValue', minValue, maxValue, unitCode: 'DAY' });

// "If you're within 30 days of your order delivery, you can request a return ...
// U.S. returns: A prepaid return label is available ... $9.99 will be deducted from your refund."
// (support/orders-returns)
const RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'US',
  returnPolicyCountry: 'US',
  returnPolicyCategory: schemaUrl('MerchantReturnFiniteReturnWindow'),
  merchantReturnDays: 30,
  returnMethod: schemaUrl('ReturnByMail'),
  returnFees: schemaUrl('ReturnShippingFees'),
  returnShippingFeesAmount: usd(9.99),
  merchantReturnLink: RETURNS_PAGE,
};

// "items marked Final Sale are ineligible for return"
const NO_RETURNS = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'US',
  returnPolicyCategory: schemaUrl('MerchantReturnNotPermitted'),
  merchantReturnLink: RETURNS_PAGE,
};

// Product pages: "Free US shipping" (free Rush, UPS 2nd Day Air, for products with freeRush).
// "Orders placed after 7:00 AM PT ship the next business day" and "Most orders arrive within
// 5–10 days unless expedited" (support/orders-returns). International is a $30 flat rate to
// "most countries", which can't be listed as regions, so only the US is described.
function shippingDetails({ freeRush, inStock }) {
  const details = {
    '@type': 'OfferShippingDetails',
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
    shippingRate: usd(0),
  };
  // delivery times only hold for items that are in stock
  if (inStock) {
    details.deliveryTime = {
      '@type': 'ShippingDeliveryTime',
      handlingTime: days(0, 1),
      transitTime: freeRush ? days(2, 2) : days(5, 9),
    };
  }
  return details;
}

export function organizationJsonLd() {
  return [
    {
      '@context': SCHEMA,
      '@type': 'OnlineStore',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      alternateName: 'comma',
      legalName: 'Comma.ai, Inc.',
      url: `${ORIGIN}/`,
      logo: absoluteUrl('/logo.png'),
      description: 'Hands free driving for the car you already have. Make driving chill.',
      sameAs: SAME_AS,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: 'https://commasupport.zendesk.com/hc/en-us/requests/new',
      },
      hasMerchantReturnPolicy: RETURN_POLICY,
    },
    {
      '@context': SCHEMA,
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      alternateName: 'comma',
      url: `${ORIGIN}/`,
      publisher: { '@id': ORGANIZATION_ID },
    },
  ];
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': SCHEMA,
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, path }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: canonicalUrl(path),
    })),
  };
}

// apparel sizes are the only Shopify option that maps to a property Google understands
// (variesBy: color, size, material, pattern, ...); "Size" on the OBD-C cable is a cable type
const APPAREL_SIZE = /^(x*s|m|x*l|\d*xl|small|medium|large|extra large)$/i;

// imported images are URLs, or { img: { src } } objects from vite-imagetools
function imageUrl(image) {
  const src = typeof image === 'string' ? image : image?.img?.src ?? image?.src;
  return src ? absoluteUrl(src) : undefined;
}

// products whose notes say "final sale" (src/lib/data/products.js)
const isFinalSale = product => (product.notes ?? []).some(note => /final sale/i.test(note.title));

function availability(variant, forceOutOfStock) {
  if (forceOutOfStock || !variant.availableForSale) return 'OutOfStock';
  return variant.currentlyNotInStock ? 'BackOrder' : 'InStock';
}

// Shopify's placeholder option for products without options
const realOptions = variant => (variant.selectedOptions ?? []).filter(option => option.name !== 'Title');

/**
 * Product (one variant) or ProductGroup (several variants shown on the same page) JSON-LD.
 *   product      the product page's data.product (Shopify product merged with src/lib/data/products.js)
 *   path         the page path, e.g. "/shop/comma-four"
 *   description  the page's meta description
 *   price        price shown on the page when it overrides Shopify's (comma four)
 *   strikethroughPrice  crossed-out "was" price shown on the page, if any
 *   showVariantImages   false when the page hides the variant image (chestnut)
 */
export function productJsonLd({ product, path, description, price, strikethroughPrice, showVariantImages = true }) {
  const url = canonicalUrl(path);
  const siteImages = (product.images ?? []).map(imageUrl).filter(Boolean);
  const brand = { '@type': 'Brand', name: 'comma' };
  const seller = { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME, url: `${ORIGIN}/` };
  const returnPolicy = isFinalSale(product) ? NO_RETURNS : RETURN_POLICY;

  // the same variants the page offers (Product.svelte hides unavailable ones on some products)
  const allVariants = product.variants?.nodes ?? [];
  const variants = product.hideOutOfStockVariants
    ? allVariants.filter(variant => variant.availableForSale)
    : allVariants;
  if (!variants.length) return null;
  const grouped = variants.length > 1;

  function offer(variant) {
    const stock = availability(variant, product.forceOutOfStock);
    const amount = price ?? Number(variant.price.amount);
    const result = {
      '@type': 'Offer',
      url,
      price: amount,
      priceCurrency: price == null ? variant.price.currencyCode : 'USD',
      availability: schemaUrl(stock),
      itemCondition: schemaUrl('NewCondition'),
      seller,
      shippingDetails: shippingDetails({ freeRush: product.freeRush, inStock: stock === 'InStock' }),
      hasMerchantReturnPolicy: returnPolicy,
    };
    if (strikethroughPrice && strikethroughPrice > amount) {
      result.priceSpecification = [
        { '@type': 'UnitPriceSpecification', price: amount, priceCurrency: result.priceCurrency },
        {
          '@type': 'UnitPriceSpecification',
          priceType: schemaUrl('StrikethroughPrice'),
          price: strikethroughPrice,
          priceCurrency: result.priceCurrency,
        },
      ];
    }
    return result;
  }

  function variantNode(variant) {
    // the gallery the page shows for this variant: its own images if it has them (chestnut),
    // else the variant's Shopify image (shown next to the selector) and the product images
    const variantImage = grouped && showVariantImages ? variant.image?.url : undefined;
    const images = variant.images?.length ? variant.images.map(imageUrl) : [variantImage, ...siteImages];
    const node = {
      '@type': 'Product',
      name: grouped ? `${product.title} — ${variant.title.trim()}` : product.title,
      description: (grouped && variant.subtitle) || description || undefined,
      image: [...new Set(images.filter(Boolean))],
      brand,
      sku: variant.sku?.trim() || undefined,
      offers: offer(variant),
    };
    for (const option of realOptions(variant)) {
      if (option.name === 'Size' && APPAREL_SIZE.test(option.value)) node.size = option.value;
    }
    if (grouped) node.inProductGroupWithID = product.id.split('/').at(-1);
    return node;
  }

  if (!grouped) {
    return { '@context': SCHEMA, '@id': `${url}#product`, url, ...variantNode(variants[0]) };
  }

  const variesBy = variants.some(variant => 'size' in variantNode(variant)) ? [schemaUrl('size')] : undefined;
  return {
    '@context': SCHEMA,
    '@type': 'ProductGroup',
    '@id': `${url}#product`,
    url,
    name: product.title,
    description: description || undefined,
    image: siteImages.length ? siteImages : undefined,
    brand,
    productGroupID: product.id.split('/').at(-1),
    variesBy,
    hasVariant: variants.map(variantNode),
  };
}
