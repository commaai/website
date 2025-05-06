const context = import.meta.glob('./products/*.svelte', { eager: true });

const componentMap = Object.fromEntries(
  Object.entries(context).map(([path, module]) => [
    path.split('/').pop().split('.')[0],  // Component name
    { component: module.default, productInfo: module.productInfo }
  ])
);

const componentOrder = [
  'car-harness',
  'replacement-mounts',
  'panda',
  'harness-connector',
  'harness-box',
  'obd-c-cable',
  'comma-power',
  'comma-prime-sim',
  'panda-jungle',
  'panda-paw',
  'comma-ai-hoodie',
  'comma-ai-beanie',
  'comma-ai-t-shirt',
  'comma-power-extender',
  'comma-device-screen',
  'comma-3x-trade-in',
  'comma-3x-out-of-warranty-repair',
];

const accessoriesList = [];

[...componentOrder, ]
  .map(name => {
    const component = componentMap[name];
    if (component.productInfo.category === 'accessories') {
      accessoriesList.push(component);
    } else {
      throw new Error('Product declared with invalid category', component.productInfo.title)
    }
  });

export { accessoriesList };
