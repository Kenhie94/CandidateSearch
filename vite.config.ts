import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";
dotenv.config({ path: "./environment/.env" });
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './enviornment',
  plugins: [react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects", // Path to your _redirects file
          dest: ".", // Copy it to the root of the dist folder
        },
      ],
    })
  ],
  base: "/", // Base URL for assets
  build: {
    outDir: "dist", // Output directory
  },
});
