import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           return 'vendor'; // Split vendor libraries
  //         }
  //         if (id.includes('src/components/')) {
  //           return 'components'; // Split components into their own chunk
  //         }
  //       },
  //     },
  //   },
  // },
});