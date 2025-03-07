import { expect, test } from "bun:test";

import { getProduct } from "./shopify";

test("getProduct", async () => {
  const response = await getProduct("gid://shopify/Product/4447447908415");
  expect(response.status).toBe(200);
  const { body: { data: { product } } } = response;
  expect(product).toMatchObject({
    title: "car harness",
    id: "gid://shopify/Product/4447447908415",
  });
  expect(product.variants.nodes.length).toBeGreaterThan(1);
});
