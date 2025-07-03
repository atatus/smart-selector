import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 * 
 * @license ${pkg.license}
 */`;

export default [
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      banner,
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types'
      })
    ],
    external: []
  },
  
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      banner,
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      })
    ],
    external: []
  },
  
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'SmartSelector',
      banner,
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      })
    ],
    external: []
  },
  
  // Minified UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'SmartSelector',
      banner,
      sourcemap: true
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser({
        output: {
          comments: /^!/
        }
      })
    ],
    external: []
  }
];
