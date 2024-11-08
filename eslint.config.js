import {config as defaultConfig} from './eslint.js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...defaultConfig,
  {ignores: ['_old/']},
];
