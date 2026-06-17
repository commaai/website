import '@shopify/ui-extensions';

//@ts-ignore
declare module './src/DiscountFunctionSettings.jsx' {
  const shopify: import('@shopify/ui-extensions/admin.discount-details.function-settings.render').Api;
  const globalThis: { shopify: typeof shopify };
}
