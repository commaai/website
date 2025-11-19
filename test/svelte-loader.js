import { plugin } from "bun";

plugin({
  name: "svelte-kit env",
  setup(build) {
    build.module("$app/environment", () => {
      return {
        exports: {
          browser: true,
        },
        loader: "object",
      };
    });
  },
});
