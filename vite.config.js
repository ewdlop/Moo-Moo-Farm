import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import gltf from "vite-plugin-gltf";
import { draco } from "@gltf-transform/functions";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.png'],
  plugins: [react(), gltf({ functions: [draco({})] })],
  base: '/Moo-Moo-Farm/'
})
