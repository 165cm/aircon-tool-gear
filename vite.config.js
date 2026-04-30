import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/aircon-tool-gear/',
  plugins: [react()],
});
