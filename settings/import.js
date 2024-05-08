module.exports = {
  'import/ignore': ['node_modules', '\\.(css|md|svg|json)$'],
  'import/parsers': {
    [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
  },
  'import/resolver': {
    [require.resolve('eslint-import-resolver-node')]: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.cts', '.mjs', '.mts'],
    },
    [require.resolve('eslint-import-resolver-typescript')]: {
      alwaysTryTypes: true,
    },
  },
};
