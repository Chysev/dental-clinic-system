import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tsAlias from "vite-plugin-ts-alias";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    tsAlias({
      /**
       * tsconfig name, optional.
       * @default 'tsconfig.json'
       */
      tsConfigName: "tsconfig.json",
    }),
  ],
});
