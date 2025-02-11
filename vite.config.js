import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: 'https://amolmahor50.github.io/Translator',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react"; // React-related libraries
            }
            if (id.includes("lodash")) {
              return "vendor-lodash"; // Lodash in a separate chunk
            }
            if (id.includes("firebase")) {
              return "vendor-firebase"; // Firebase in a separate chunk
            }
            return "vendor"; // Other node_modules dependencies
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust this limit if needed
  },
});
