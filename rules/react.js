const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  '@stylistic/function-component-definition': 'off',
  '@stylistic/jsx-props-no-spreading': 'off',
  '@stylistic/jsx-sort-props': [
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
  '@stylistic/no-children-prop': 'off',
  '@stylistic/no-unused-prop-types': 'off',
  '@stylistic/prop-types': 'off',
  '@stylistic/react-in-jsx-scope': OFF,
  '@stylistic/require-default-props': 'off',
  // react-hooks
  // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
  'react-hooks/exhaustive-deps': WARN,
  'react-hooks/rules-of-hooks': ERROR,
  // react
  'react/display-name': WARN,
  'react/forbid-foreign-prop-types': [WARN, {allowInPropTypes: true}],
  'react/jsx-key': WARN,
  'react/jsx-no-comment-textnodes': WARN,
  'react/jsx-no-target-blank': WARN,
  'react/jsx-no-undef': ERROR,
  'react/jsx-pascal-case': [WARN, {allowAllCaps: true, ignore: []}],
  'react/jsx-uses-react': WARN,
  'react/jsx-uses-vars': WARN,
  'react/no-danger-with-children': WARN,
  'react/no-direct-mutation-state': WARN,
  'react/no-find-dom-node': WARN,
  'react/no-is-mounted': WARN,
  'react/no-render-return-value': ERROR,
  'react/no-string-refs': WARN,
  'react/no-typos': WARN,
  'react/require-render-return': ERROR,
  'react/style-prop-object': WARN,
};
