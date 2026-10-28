import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // 1. Remove 'esbuild' (Vite 8 uses Oxc by default now)
    // 2. Use 'oxc' if you want to be explicit, or omit for default
    minify: "oxc", 
    cssMinify: true,
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router") || id.includes("react-dom") || id.includes("/react/")) {
              return "react";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            return "vendor";
          }
        },
      },
    },

    chunkSizeWarningLimit: 600,
  },

  server: {
    open: true,
  },
});