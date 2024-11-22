import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        
      },
    },
    devSourcemap: true, 
  },
  build: {
    sourcemap: false,
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true, 
  },
});
