import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import prettyCssModules from "vite-plugin-pretty-css-modules";

export default defineConfig({
  plugins: [react(), prettyCssModules()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
});
