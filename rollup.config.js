/* eslint-disable @typescript-eslint/no-var-requires */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const packageJson = require('./package.json');
const tailwindConfig = require('./tailwind.config.cjs');

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
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extensions: ['.css'],
        plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
      }),
    ],
  },
  {
    input: 'dist/esm/types/Slider/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
  },
];
