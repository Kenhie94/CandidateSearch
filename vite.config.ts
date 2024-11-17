import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";
dotenv.config({ path: "./environment/.env" });

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './enviornment',
  plugins: [react()],
});
