import { defineConfig } from "vite";
import glob from "tiny-glob";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
  build: {
    lib: {
      entry: ["src/index.ts", ...(await glob("src/components/**/*.ts"))],
      formats: ["es"],
    },
  },
});
