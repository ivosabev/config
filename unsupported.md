# Unsupported rules and features

Rules from the old ESLint and Prettier setup that this package does not carry.

## Not enabled

### sort-destructure-keys

No native oxlint rule, and the JS plugin is not loaded.

### react/jsx-sort-props

Not enabled. Oxfmt does not sort JSX attributes.

### import/order

Import order belongs to oxfmt `sortImports`. `internalPattern` is prefixes, not globs: `["#", "~/", "@/"]`. That marks `#app/foo`, `~/foo`, and `@/foo` as internal. `@ivosabev/foo` stays external.

## Different tool

### max-len

Oxfmt wraps at `printWidth: 140` where it can. A long string, URL, regex, or comment is left on one line, and nothing fails the build for length.
