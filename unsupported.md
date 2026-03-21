# Unsupported Rules & Features

Rules and features from the previous ESLint/Prettier setup that require attention after migration.

## JS Plugins (migrate to native oxlint when available)

### eslint-plugin-sort-destructure-keys (`sort-destructure-keys/sort-destructure-keys`)

Kept as a JS plugin via oxlint. No native oxlint rule exists yet.

**TODO:** Migrate to a native oxlint rule when one becomes available. Track https://github.com/oxc-project/oxc/issues/481 for progress.

---

### react/jsx-sort-props

Kept as a JS plugin via `eslint-plugin-react`. Native oxlint support is pending.

**TODO:** Migrate to native oxlint rule when [PR #19208](https://github.com/oxc-project/oxc/pull/19208) is merged. Remove `eslint-plugin-react` from `jsPlugins` and dependencies at that point.

---

## Verify After Migration

### import/order

Import ordering is now handled by oxfmt's `sortImports`. The `pathGroups` option for mapping `#*/**` to the internal group is replaced by oxfmt's `internalPattern: ["#*/**", "~/**", "@/**"]`.

**Action:** Verify that `#*/**` imports are sorted correctly with the oxfmt config. Adjust `internalPattern` in `oxfmt.json` if needed.

---

### @stylistic/max-len

Oxfmt uses `printWidth: 140` for line wrapping. It does not error on lines that exceed the limit (long strings, URLs, regex) -- it wraps where it can. The previous config already ignored strings, template literals, URLs, regex, and comments, so the effective difference is minimal.
