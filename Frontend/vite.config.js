import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:15000",
        secure: false,
        changeOrigin: true, // This is often necessary to prevent host header issues
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: rewrites the URL path
      },
    },
  },
});
