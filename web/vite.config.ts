import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: "$1",
      },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.REMOTE_HOST || "",
        changeOrigin: process.env.REMOTE_HOST ? true : false,
      },
      "/socket": {
        target: process.env.REMOTE_HOST?.replace("http", "ws") || "",
        ws: true,
      },
    },
  },
});
