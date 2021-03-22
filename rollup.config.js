import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/sw.ts',
  output: { format: 'esm', file: 'build/tmp/sw.js' },
  plugins: [
    terser(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    resolve({ browser: true, preferBuiltins: true }),
  ],
};
