<div>
  <h1>@ivosabev/config</h1>
  <strong>
    Oxlint, Oxfmt, and TypeScript configs
  </strong>
  <p>
    This makes assumptions about the way you prefer to develop software and gives you configurations that will actually help you in your development.
  </p>
</div>

## Install

```
npm install @ivosabev/config
```

```
yarn add @ivosabev/config
```

```
pnpm add @ivosabev/config
```

<hr />

## Usage

### Oxfmt (Formatter)

Oxfmt ignores `extends`. Spread the shared config in `oxfmt.config.ts` and override what you need. Do not also keep `.oxfmtrc.json` in the same directory.

```ts
import config from '@ivosabev/config/oxfmt' with {type: 'json'};
import {type OxfmtConfig, defineConfig} from 'oxfmt';

export default defineConfig({
  ...(config as OxfmtConfig),
  ignorePatterns: [...config.ignorePatterns, '**/coverage/**'],
});
```

A later `ignorePatterns` list replaces the shared one. Spread `config.ignorePatterns`, then add yours. See the [Oxfmt config reference](https://oxc.rs/docs/guide/usage/formatter/config-file-reference).

`sortImports.internalPattern` is a list of prefixes. `#`, `~/`, and `@/` mark `#app/foo`, `~/foo`, and `@/foo` as internal. `@ivosabev/foo` stays external.

### Oxlint (Linter)

Create `oxlint.config.ts` in the project root. Import the shared config and pass it to `extends`. A string path to the package name does not work.

```ts
import config from '@ivosabev/config/oxlint' with {type: 'json'};
import {type OxlintConfig, defineConfig} from 'oxlint';

export default defineConfig({
  extends: [config as unknown as OxlintConfig],
  ignorePatterns: [...config.ignorePatterns, '**/coverage/**'],
});
```

A child `ignorePatterns` list replaces the shared one. Spread `config.ignorePatterns`, then add yours. Do not also keep `.oxlintrc.json` in the same directory. See the [Oxlint config reference](https://oxc.rs/docs/guide/usage/linter/config).

### TypeScript

Create a `tsconfig.json` file in your project root with the following content:

```json
{
  "extends": "@ivosabev/config/typescript/base",
  "include": ["@ivosabev/config/typescript/reset.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "compilerOptions": {
    "paths": {
      "#app/*": ["./app/*"],
      "#tests/*": ["./tests/*"]
    }
  }
}
```

If you want to build with `tsc` create a `tsconfig.build.json` file in your project root with the following content:

```json
{
  "extends": "@ivosabev/config/typescript/build",
  "include": ["@ivosabev/config/typescript/reset.d.ts", "src", "tailwind.config.ts"],
  "compilerOptions": {
    "declarationDir": "dist/dts",
    "outDir": "dist/esm",
    "tsBuildInfoFile": ".tsbuildinfo/build.tsbuildinfo"
  }
}
```

<details>
  <summary>Customizing TypeScript</summary>

Learn more from
[the TypeScript docs here](https://www.typescriptlang.org/tsconfig/#extends).

</details>

### package.json

You may want to add the following scripts to your project:

```json
{
  "format": "oxfmt",
  "format-check": "oxfmt --check",
  "lint": "oxlint",
  "lint-fix": "oxlint --fix",
  "typecheck": "tsc",
  "validate": "run-p -l lint format-check typecheck"
}
```

`oxfmt` does not sort object keys. `sort-keys` is an error, and `oxlint --fix` sorts them.

## Migration from ESLint/Prettier

This package previously used ESLint and Prettier. It now uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) from the [Oxc](https://oxc.rs/) project.

See `unsupported.md` for a list of rules and features that could not be directly migrated.

## Credits

- https://github.com/epicweb-dev/config
- https://github.com/remix-run/remix/tree/main/packages/remix-eslint-config
- https://github.com/total-typescript/tsconfig
- https://github.com/mattpocock/ts-reset
- https://oxc.rs

## License

MIT
