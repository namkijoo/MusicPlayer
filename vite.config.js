import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  build: {
    minify: 'esbuild',
    treeshake: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        purge: true,
      },
    },
  },
});
