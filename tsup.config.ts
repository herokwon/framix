import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  minify: true,
  sourcemap: true,
  treeshake: true,
  injectStyle: true,
  target: 'es2020',
  tsconfig: 'tsconfig.app.json',
  external: ['react', 'react-dom', 'tailwindcss', 'lucide-react'],
  esbuildOptions: opts => {
    opts.jsx = 'automatic';
  },
});
