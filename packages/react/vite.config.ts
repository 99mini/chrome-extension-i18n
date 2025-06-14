import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    MOCK_CHROME: mode === 'development',
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    APP_NAME: JSON.stringify(process.env.npm_package_name)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  },
}));
