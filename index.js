/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: ['@remix-run/eslint-config', 'prettier', 'plugin:import/recommended'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
  plugins: ['prettier', 'sort-destructure-keys', 'sort-keys-fix'],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'import/extensions': 'off',
    'import/no-duplicates': ['error'],
    'import/no-internal-modules': ['error', {allow: ['*/*', '[~#@]*/**']}],
    'import/order': [
      'error',
      {
        alphabetize: {caseInsensitive: true, order: 'asc'},
        distinctGroup: false,
        'newlines-between': 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'max-len': [
      'error',
      {
        code: 140,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-alert': 'off',
    // TODO: Turn this on when we migrate the window.confirm calls
    'no-case-declarations': 'off',
    'no-console': 'off',
    'no-else-return': ['error', {allowElseIf: true}],
    'no-nested-ternary': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-spacing': ['error', 'never'],
    'prettier/prettier': ['error'],
    quotes: ['error', 'single', {allowTemplateLiterals: true}],
    'react-hooks/exhaustive-deps': 'warn',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: false,
        shorthandFirst: false,
        shorthandLast: false,
      },
    ],
    'react/no-children-prop': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'sort-destructure-keys/sort-destructure-keys': [2, {caseSensitive: false}],
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
};
