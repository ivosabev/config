const OFF = 0;
// const WARN = 1;
const ERROR = 2;

module.exports = {
  'import/extensions': OFF,
  'import/first': ERROR,
  'import/no-amd': ERROR,
  'import/no-duplicates': ERROR,
  'import/no-internal-modules': ['error', {allow: ['*/*', '[~#@]*/**']}],
  'import/no-webpack-loader-syntax': ERROR,
  'import/order': [
    'error',
    {
      alphabetize: {caseInsensitive: true, order: 'asc'},
      distinctGroup: false,
      'newlines-between': 'never',
    },
  ],
  'import/prefer-default-export': OFF,
};
