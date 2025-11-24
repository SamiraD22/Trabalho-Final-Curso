// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    // Esta configuração garante que o PostCSS é usado
    postcss: './postcss.config.js',
  },
});