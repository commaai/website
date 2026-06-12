import '../main.js';
import { initProductPage } from '../lib/product-page.js';

// Generic /shop/<product> page: shell + Product behaviors (runtime Shopify
// refetch, gallery, variant select, add-to-cart, harness selector on
// /shop/car-harness). No overrides — those are for comma-four/body/setup.
initProductPage();
