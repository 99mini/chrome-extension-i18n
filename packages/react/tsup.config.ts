import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react'],
  clean: true,
  treeshake: true,
  target: 'es2020',
  sourcemap: true,
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
