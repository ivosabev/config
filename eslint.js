import globals from 'globals';

const ERROR = 'error';
const WARN = 'warn';

const has = (pkg) => {
  try {
    import.meta.resolve(pkg, import.meta.url);
    return true;
  } catch {
    return false;
  }
};

const hasTypeScript = has('typescript');
const hasReact = has('react');
const hasTestingLibrary = has('@testing-library/dom');
const hasJestDom = has('@testing-library/jest-dom');
const hasVitest = has('vitest');
const vitestFiles = ['**/__tests__/**/*', '**/*.test.*'];
const testFiles = ['**/tests/**', '**/#tests/**', ...vitestFiles];
const playwrightFiles = ['**/e2e/**'];

export const config = [
  {
    ignores: [
      '**/.cache/**',
      '**/node_modules/**',
      '**/build/**',
      '**/public/build/**',
      '**/playwright-report/**',
      '**/server-build/**',
      '**/dist/**',
    ],
  },

  // all files
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic/js': (await import('@stylistic/eslint-plugin-js')).default,
      import: (await import('eslint-plugin-import-x')).default,
      'sort-destructure-keys': (await import('eslint-plugin-sort-destructure-keys')).default,
      'sort-keys-fix': (await import('eslint-plugin-sort-keys-fix')).default,
    },
    rules: {
      '@stylistic/js/array-bracket-newline': [ERROR, 'consistent'],
      '@stylistic/js/array-bracket-spacing': [ERROR, 'never'],
      '@stylistic/js/array-element-newline': [ERROR, 'consistent'],
      '@stylistic/js/comma-dangle': [ERROR, 'always-multiline'],
      '@stylistic/js/comma-spacing': [ERROR, {after: true, before: false}],
      '@stylistic/js/func-call-spacing': [ERROR, 'never'],
      '@stylistic/js/indent': [ERROR, 2, {SwitchCase: 1, offsetTernaryExpressions: true}],
      '@stylistic/js/keyword-spacing': [ERROR, {after: true, before: true}],
      '@stylistic/js/max-len': [
        ERROR,
        {
          code: 140,
          comments: 140,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: false,
          ignoreUrls: true,
          tabWidth: 2,
        },
      ],
      '@stylistic/js/no-multi-spaces': [ERROR],
      '@stylistic/js/no-multiple-empty-lines': [ERROR, {max: 1, maxEOF: 1}],
      '@stylistic/js/quotes': [ERROR, 'single', {allowTemplateLiterals: true}],
      '@stylistic/js/semi': [ERROR, 'always'],
      '@stylistic/js/space-before-function-paren': [
        ERROR,
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'never',
        },
      ],
      '@stylistic/js/space-infix-ops': [ERROR, {int32Hint: false}],
      curly: [ERROR, 'all'],
      'import/no-duplicates': [WARN, {'prefer-inline': true}],
      'import/order': [
        WARN,
        {
          alphabetize: {caseInsensitive: true, order: 'asc'},
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{group: 'internal', pattern: '#*/**'}],
        },
      ],
      'no-func-assign': ERROR,
      'no-global-assign': ERROR,
      'no-unexpected-multiline': ERROR,
      'no-warning-comments': [ERROR, {location: 'anywhere', terms: ['FIXME']}],
      'sort-destructure-keys/sort-destructure-keys': [2, {caseSensitive: false}],
      'sort-keys-fix/sort-keys-fix': 'warn',
    },
  },

  // JSX/TSX files
  hasReact
    ? {
        files: ['**/*.tsx', '**/*.jsx'],
        languageOptions: {
          parser: (await import('typescript-eslint')).parser,
          parserOptions: {
            jsx: true,
          },
        },
        plugins: {
          react: (await import('eslint-plugin-react')).default,
        },
        rules: {
          'react/jsx-closing-bracket-location': [ERROR, {nonEmpty: 'after-props', selfClosing: 'tag-aligned'}],
          'react/jsx-first-prop-new-line': [ERROR, 'multiline'],
          'react/jsx-key': WARN,
          'react/jsx-max-props-per-line': [ERROR, {maximum: {multi: 1, single: 5}}],
          'react/jsx-newline': [ERROR, {prevent: true}],
          'react/jsx-no-undef': ERROR,
          'react/jsx-one-expression-per-line': [ERROR, {allow: 'single-child'}],
          'react/jsx-sort-props': [
            ERROR,
            {
              callbacksLast: false,
              ignoreCase: true,
              noSortAlphabetically: false,
              reservedFirst: false,
              shorthandFirst: false,
              shorthandLast: false,
            },
          ],
          'react/require-render-return': ERROR,
        },
      }
    : null,

  // react-hook rules are applicable in ts/js/tsx/jsx, but only with React as a
  // dep
  hasReact
    ? {
        files: ['**/*.ts?(x)', '**/*.js?(x)'],
        plugins: {
          'react-hooks': (await import('eslint-plugin-react-hooks')).default,
        },
        rules: {
          'react-hooks/exhaustive-deps': WARN,
          'react-hooks/rules-of-hooks': ERROR,
        },
      }
    : null,

  // JS and JSX files
  {
    files: ['**/*.js?(x)'],
    rules: {
      // most of these rules are useful for JS but not TS because TS handles these better
      // if it weren't for https://github.com/import-js/eslint-plugin-import/issues/2132
      // we could enable this :(
      // 'import/no-unresolved': ERROR,
      'no-unused-vars': [
        WARN,
        {
          args: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      quotes: ['error', 'single', {allowTemplateLiterals: true}],
    },
  },

  // TS and TSX files
  hasTypeScript
    ? {
        files: ['**/*.ts?(x)'],
        languageOptions: {
          parser: (await import('typescript-eslint')).parser,
          parserOptions: {
            projectService: true,
          },
        },
        plugins: {
          '@typescript-eslint': (await import('typescript-eslint')).plugin,
        },
        rules: {
          '@typescript-eslint/consistent-type-imports': [
            WARN,
            {
              disallowTypeAnnotations: true,
              fixStyle: 'inline-type-imports',
              prefer: 'type-imports',
            },
          ],
          '@typescript-eslint/no-floating-promises': ERROR,
          '@typescript-eslint/no-misused-promises': [ERROR, {checksVoidReturn: false}],
          '@typescript-eslint/no-unused-expressions': [
            ERROR,
            {
              allowShortCircuit: true,
              allowTaggedTemplates: true,
              allowTernary: true,
            },
          ],
          '@typescript-eslint/no-unused-vars': [
            WARN,
            {
              args: 'after-used',
              argsIgnorePattern: '^_',
              ignoreRestSiblings: true,
              varsIgnorePattern: '^ignored',
            },
          ],
          '@typescript-eslint/no-use-before-define': [
            ERROR,
            {
              classes: false,
              functions: false,
              typedefs: false,
              variables: false,
            },
          ],
          '@typescript-eslint/return-await': ERROR,
          'import/consistent-type-specifier-style': [WARN, 'prefer-inline'],

          // here are rules we've decided to not enable. Commented out rather
          // than setting them to disabled to avoid them being referenced at all
          // when config resolution happens.

          // @typescript-eslint/require-await - sometimes you really do want
          // async without await to make a function async. TypeScript will ensure
          // it's treated as an async function by consumers and that's enough for me.

          // @typescript-eslint/prefer-promise-reject-errors - sometimes you
          // aren't the one creating the error, and you just want to propagate an
          // error object with an unknown type.

          // @typescript-eslint/only-throw-error - same reason as above.
          // However, this rule supports options to allow you to throw `any` and
          // `unknown`. Unfortunately, in Remix you can throw Response objects,
          // and we don't want to enable this rule for those cases.

          // @typescript-eslint/no-unsafe-declaration-merging - this is a rare
          // enough problem (especially if you focus on types over interfaces)
          // that it's not worth enabling.

          // @typescript-eslint/no-unsafe-enum-comparison - enums are not
          // recommended or used in epic projects, so it's not worth enabling.

          // @typescript-eslint/no-unsafe-unary-minus - this is a rare enough
          // problem that it's not worth enabling.

          // @typescript-eslint/no-base-to-string - this doesn't handle when
          // your object actually does implement toString unless you do so with
          // a class which is not 100% of the time. For example, the timings
          // object in the epic stack uses defineProperty to implement toString.
          // It's not high enough risk/impact to enable.

          // @typescript-eslint/no-non-null-assertion - normally you should not
          // use ! to tell TS to ignore the null case, but you're a responsible
          // adult and if you're going to do that, the linter shouldn't yell at
          // you about it.

          // @typescript-eslint/restrict-template-expressions - toString is a
          // feature of many built-in objects and custom ones. It's not worth
          // enabling.

          // @typescript-eslint/no-confusing-void-expression - what's confusing
          // to one person isn't necessarily confusing to others. Arrow
          // functions that call something that returns void is not confusing
          // and the types will make sure you don't mess something up.

          // these each protect you from `any` and while it's best to avoid
          // using `any`, it's not worth having a lint rule yell at you when you
          // do:
          // - @typescript-eslint/no-unsafe-argument
          // - @typescript-eslint/no-unsafe-call
          // - @typescript-eslint/no-unsafe-member-access
          // - @typescript-eslint/no-unsafe-return
          // - @typescript-eslint/no-unsafe-assignment
        },
      }
    : null,

  // This assumes test files are those which are in the test directory or have
  // *.test.* in the filename. If a file doesn't match this assumption, then it
  // will not be allowed to import test files.
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    ignores: testFiles,
    rules: {
      'no-restricted-imports': [
        ERROR,
        {
          patterns: [
            {
              group: testFiles,
              message: 'Do not import test files in source files',
            },
          ],
        },
      ],
    },
  },

  hasTestingLibrary
    ? {
        files: testFiles,
        ignores: [...playwrightFiles],
        plugins: {
          'testing-library': (await import('eslint-plugin-testing-library')).default,
        },
        rules: {
          'testing-library/no-unnecessary-act': [ERROR, {isStrict: false}],
          'testing-library/no-wait-for-side-effects': ERROR,
          'testing-library/prefer-find-by': ERROR,
        },
      }
    : null,

  hasJestDom
    ? {
        files: testFiles,
        ignores: [...playwrightFiles],
        plugins: {
          'jest-dom': (await import('eslint-plugin-jest-dom')).default,
        },
        rules: {
          'jest-dom/prefer-checked': ERROR,
          'jest-dom/prefer-enabled-disabled': ERROR,
          'jest-dom/prefer-focus': ERROR,
          'jest-dom/prefer-required': ERROR,
        },
      }
    : null,

  hasVitest
    ? {
        files: testFiles,
        ignores: [...playwrightFiles],
        plugins: {
          vitest: (await import('@vitest/eslint-plugin')).default,
        },
        rules: {
          // you don't want the editor to autofix this, but we do want to be
          // made aware of it
          'vitest/no-focused-tests': [WARN, {fixable: false}],
        },
      }
    : null,
].filter(Boolean);

// this is for backward compatibility
export default config;
