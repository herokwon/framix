/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react-swc';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    dts({
      entryRoot: 'src',
      outDir: 'dist/types',
      tsconfigPath: 'tsconfig.app.json',
      insertTypesEntry: true,
      copyDtsFiles: true,
      include: ['src'],
      exclude: [
        '**/__tests__',
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.spec.tsx',
      ],
    }),
  ],
  build: {
    cssCodeSplit: true,
    cssMinify: true,
    emptyOutDir: true,
    sourcemap: true,
    target: 'es2020',
    lib: {
      entry: {
        index: path.resolve(dirname, 'src/index.ts'),
        client: path.resolve(dirname, 'src/client.ts'),
      },
      name: 'Framix',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
        banner: chunk => (chunk.name === 'client' ? `'use client';` : ''),
      },
      external: [
        /^react(\/.*)?$/,
        /^react-dom(\/.*)?$/,
        'lucide-react',
        'tailwindcss',
      ],
    },
  },
  esbuild: {
    jsx: 'automatic',
    legalComments: 'none',
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  test: {
    globals: true,
    pool: 'threads',
    environment: 'jsdom',
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        '.storybook/**',
        'src/types/**',
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
        '*.config.{js,ts}',
        '**/*.d.ts',
        'vitest.setup.ts',
      ],
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
