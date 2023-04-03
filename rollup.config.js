/* eslint-disable @typescript-eslint/no-var-requires */
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/Slider/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: 'inline',
      },
    ],
    external: ['react', 'react-dom', '@quangnv13/react-slider'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'dist/esm/types/Slider/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
  },
];
