import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/EscapeRoom-grupp2/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for src directory
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
   @use "@/styles/global-styles/_buttons.scss" as *;
          @use "@/styles/global-styles/_colors.scss" as *;
          @use "@/styles/global-styles/_fonts.scss" as *;
          @use "@/styles/global-styles/_screens.scss" as *;
        `,
      },
    },
    devSourcemap: true, 
  },
  build: {
    sourcemap: true,
    rollupOptions: {
        input: {
          main: 'index.html',
          page1: path.resolve(__dirname, 'challenges.html'),
        },
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false, 
  },
  test: {
    environment: 'jsdom',
  },
});
