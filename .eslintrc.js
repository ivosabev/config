const prettierrc = require('./.prettierrc');

const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off';
  return acc;
}, {});

module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'plugin:import/recommended'],
  plugins: ['react', 'react-hooks', 'prettier', 'sort-destructure-keys', 'sort-keys-fix'],
  rules: {
    ...a11yOff,
    'comma-dangle': ['warn', 'always-multiline'],
    'import/extensions': 'off',
    'import/no-cycle': ['error', {maxDepth: Infinity}],
    'import/no-internal-modules': [
      'error',
      {
        allow: ['**/*'],
      },
    ],
    // 'import/no-relative-packages': 'error',
    // 'import/no-relative-parent-imports': 'error',
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
    'no-alert': 'off',
    // TODO: Turn this on when we migrate the window.confirm calls
    'no-case-declarations': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 0,
    'no-use-before-define': 'off',
    'object-curly-spacing': ['error', 'never'],
    'prettier/prettier': ['error', prettierrc],
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
};
