import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    rollupOptions: {
      external: [], // Externalize mongoose
    },
  },
  resolve: {
    alias: {
      // Ensure no accidental alias to backend folder
    },
  },
});
