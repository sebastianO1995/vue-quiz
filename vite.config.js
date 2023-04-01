import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `js/[name].[${require('./package.json').version}].js`,
        chunkFileNames: `js/[name].[${require('./package.json').version}].js`,
        assetFileNames: `[ext]/[name].[${
          require('./package.json').version
        }].[ext]`
      }
    },
    assetsInlineLimit: 0,
    assetsDir: 'assets'
  },
  plugins: [vue()]
});
