// rollup.config.js

import { readFileSync } from 'node:fs';

import camelCase from 'camelcase';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(readFileSync('package.json'));

// Human timestamp for banner.
const datetime = new Date().toISOString().substring(0, 19).replace('T', ' ');
const year = datetime.substring(0, 4);

// Remove npm namespace from the package name.
const pkgName = pkg.name.replace(/@.*\//, '');
const name = camelCase(pkgName, { pascalCase: true });

// Main banner.
const banner = `/*! ${name} v${pkg.version} ${datetime}
 *! ${pkg.homepage}
 *! Copyright (C) ${year} ${pkg.author}.
 *! ${pkg.license} license.
 */
`;

const modules = ['comb'];

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        banner,
        file: `esm/index.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ module: 'esnext' })],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        banner,
        file: `dist/index.min.js`,
        format: 'iife',
        name: `RecMath`,
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ module: 'esnext' }),
      terser({ output: { comments: /^!/ } }),
    ],
  },
];

for (const moduleName of modules) {
  const banner = `/*! ${name}.${moduleName} v${pkg.version} ${datetime}
  *! ${pkg.homepage}
  *! Copyright (C) ${year} ${pkg.author}.
  *! ${pkg.license} license.
  */
 `;

  config.push({
    input: `src/${moduleName}/index.ts`,
    output: [
      {
        banner,
        file: `dist/${moduleName}.min.js`,
        format: 'iife',
        name: `${name}.${moduleName}`,
        sourcemap: true,
      },
      {
        banner,
        file: `esm/${moduleName}.min.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({ module: 'esnext' }),
      terser({ output: { comments: /^!/ } }),
    ],
  });
}

export default config;
