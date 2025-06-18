import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  minify: true,
  sourcemap: true,
  treeshake: true,
  target: 'es2020',
  tsconfig: 'tsconfig.app.json',
  external: ['react', 'react-dom'],
  esbuildOptions: opts => {
    opts.jsx = 'automatic';
  },
});
