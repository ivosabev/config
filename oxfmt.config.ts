import {defineConfig} from 'oxfmt';

export default defineConfig({
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: false,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  ignorePatterns: [
    '**/.cache/**',
    '**/node_modules/**',
    '**/build/**',
    '**/public/build/**',
    '**/playwright-report/**',
    '**/server-build/**',
    '**/dist/**',
  ],
  jsxSingleQuote: false,
  overrides: [
    {
      files: ['**/package.json'],
      options: {useTabs: false},
    },
    {
      files: ['**/*.mdx'],
      options: {
        htmlWhitespaceSensitivity: 'ignore',
        proseWrap: 'preserve',
      },
    },
  ],
  printWidth: 140,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  sortImports: {
    groups: ['builtin', 'external', ['internal', 'subpath'], ['parent', 'sibling', 'index'], 'style', 'unknown'],
    ignoreCase: true,
    internalPattern: ['#*/**', '~/**', '@/**'],
    newlinesBetween: true,
    order: 'asc',
  },
  sortPackageJson: {
    sortScripts: false,
  },
  sortTailwindcss: {
    attributes: ['ngClass'],
    functions: ['clsx', 'cn'],
  },
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
});
