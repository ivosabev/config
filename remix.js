const remixSettings = require('./settings/remix');

const OFF = 0;
// const WARN = 1;
// const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client'],
  overrides: [
    {
      files: ['**/routes/**/*.js?(x)', '**/routes/**/*.tsx', 'app/root.js?(x)', 'app/root.tsx'],
      rules: {
        // Routes may use default exports without a name. At the route level
        // identifying components for debugging purposes is less of an issue, as
        // the route boundary is more easily identifiable.
        'react/display-name': OFF,
      },
    },
  ],
  settings: {
    ...remixSettings,
  },
};
