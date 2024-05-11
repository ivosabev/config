module.exports = {
  'import/internal-regex': '^[~#@]/',
  'import/resolver': {
    node: {
      extensions: ['.ts', '.tsx'],
    },
    typescript: {
      alwaysTryTypes: true,
    },
  },
};
