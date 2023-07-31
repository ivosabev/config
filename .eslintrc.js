const prettierrc = require('./.prettierrc');

const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off';
  return acc;
}, {});

/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      extends: [
        '@remix-run/eslint-config',
        '@remix-run/eslint-config/node',
        '@remix-run/eslint-config/jest-testing-library',
        'prettier',
        'plugin:import/recommended',
      ],
      files: ['*.js'],
      plugins: ['react', 'react-hooks', 'prettier', 'sort-destructure-keys', 'sort-keys-fix'],
    },
    {
      extends: [
        '@remix-run/eslint-config',
        '@remix-run/eslint-config/node',
        '@remix-run/eslint-config/jest-testing-library',
        'prettier',
        // 'airbnb',
        // 'airbnb-typescript',
        // 'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'sort-destructure-keys', 'sort-keys-fix'],
      rules: {
        ...a11yOff,
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        'comma-dangle': ['warn', 'always-multiline'],
        'import/extensions': 'off',
        // 'import/no-cycle': ['error', {maxDepth: Infinity}],
        'import/no-internal-modules': [
          'error',
          {
            allow: ['~/**', '@emotion/**', 'lodash/*', 'react/*', 'react-dom/*'],
          },
        ],
        'import/no-relative-packages': 'error',
        'import/no-relative-parent-imports': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
          'error',
          {
            alphabetize: {caseInsensitive: true, order: 'asc'},
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
        'no-alert': 'off', // TODO: Turn this on when we migrate the window.confirm calls
        'no-case-declarations': 'off',
        'no-console': 'off',
        'no-else-return': ['error', {allowElseIf: true}],
        'no-nested-ternary': 'off',
        'no-return-await': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'object-curly-spacing': ['error', 'never'],
        'prettier/prettier': 'error',
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
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'sort-destructure-keys/sort-destructure-keys': [2, {caseSensitive: false}],
        'sort-imports': [
          'warn',
          {
            allowSeparatedGroups: false,
            ignoreCase: true,
            ignoreDeclarationSort: true,
          },
        ],
        'sort-keys-fix/sort-keys-fix': 'warn',
      },
    },
  ],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it means we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 28,
    },
  },
};
