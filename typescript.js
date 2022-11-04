module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    './.eslintrc.js',
  ],
  globals: {
    JSX: true,
    React: true,
  },
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
  },
  // plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    // This allows us to use async function on addEventListener(). Discussion: https://twitter.com/wesbos/status/1337074242161172486
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
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
    'no-shadow': 'off',

    // '@typescript-eslint/no-explicit-any': 'off',
    // 'no-unused-vars': 0,
    // '@typescript-eslint/no-unused-vars': [1, { ignoreRestSiblings: true }],
    // 'no-redeclare': 'off',
    // '@typescript-eslint/no-redeclare': [
    //   'warn',
    //   {
    //     ignoreDeclarationMerge: true,
    //   },
    // ],
    // '@typescript-eslint/no-floating-promises': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    'no-undef': 'off',

    'react/jsx-filename-extension': [1, {extensions: ['.jsx', '.tsx']}], // TS does it
  },
};
