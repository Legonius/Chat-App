import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_"); //"VITE_" if '' can read all varialbles in env but now read only start with "VITE_"
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
        },
      },
    },
    optimizeDeps: {
      exclude: ["../Backend"],
    },
  };
});
