import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    'process.env': process.env, 
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://csbi-users.csbihub.id",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});



