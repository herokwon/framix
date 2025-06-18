/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  test: {
    globals: true,
    pool: 'threads',
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    coverage: {
      enabled: true,
      provider: 'v8',
    },
  },
});
