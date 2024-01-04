const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  // react-hooks
  // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
  'react-hooks/exhaustive-deps': WARN,
  'react-hooks/rules-of-hooks': ERROR,
  'react/display-name': WARN,
  'react/forbid-foreign-prop-types': [WARN, {allowInPropTypes: true}],
  'react/function-component-definition': 'off',
  'react/jsx-key': WARN,
  'react/jsx-no-comment-textnodes': WARN,
  'react/jsx-no-target-blank': WARN,
  'react/jsx-no-undef': ERROR,
  'react/jsx-pascal-case': [WARN, {allowAllCaps: true, ignore: []}],
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
  'react/jsx-uses-react': WARN,
  'react/jsx-uses-vars': WARN,
  'react/no-children-prop': 'off',
  'react/no-danger-with-children': WARN,
  'react/no-direct-mutation-state': WARN,
  'react/no-find-dom-node': WARN,
  'react/no-is-mounted': WARN,
  'react/no-render-return-value': ERROR,
  'react/no-string-refs': WARN,
  'react/no-typos': WARN,
  'react/no-unused-prop-types': 'off',
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': OFF,
  'react/require-default-props': 'off',
  'react/require-render-return': ERROR,
  'react/style-prop-object': WARN,
};
