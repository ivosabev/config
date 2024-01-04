const jestRules = require('./rules/jest');
const jestDomRules = require('./rules/jest-dom');
const testingLibraryRules = require('./rules/testing-library');

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    node: true,
  },
  overrides: [
    {
      env: {
        'jest/globals': true,
      },
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      rules: {
        ...jestRules,
        ...jestDomRules,
        ...testingLibraryRules,
      },
    },
  ],
  plugins: ['jest', 'jest-dom', 'testing-library'],
};
