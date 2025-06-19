/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  test: {
    globals: true,
    pool: 'threads',
    environment: 'jsdom',
    coverage: {
      enabled: true,
      provider: 'v8',
    },
    projects: [
      // Default project
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          exclude: ['src/**/*.stories.{ts,tsx}'],
          setupFiles: 'vitest.setup.ts',
        },
      },
      // Storybook project
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          exclude: ['src/**/*.{test,spec}.{ts,tsx}'],
          setupFiles: '.storybook/vitest.setup.ts',
        },
      },
    ],
  },
});
