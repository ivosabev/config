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

Create an `.oxfmtrc.json` file in your project root that extends the shared config:

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "printWidth": 140,
  "singleQuote": true,
  "bracketSpacing": false
}
```

Or copy the config from `@ivosabev/config/oxfmt` and customize as needed.

<details>
  <summary>Customizing Oxfmt</summary>

Copy `node_modules/@ivosabev/config/oxfmt.json` to your project root as `.oxfmtrc.json` and modify it. See the [Oxfmt config reference](https://oxc.rs/docs/guide/usage/formatter/config-file-reference) for all available options.

</details>

### Oxlint (Linter)

Create an `.oxlintrc.json` file in your project root:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["@ivosabev/config/oxlint"]
}
```

Or copy the config from `@ivosabev/config/oxlint` and customize as needed.

<details>
  <summary>Customizing Oxlint</summary>

Copy `node_modules/@ivosabev/config/oxlint.json` to your project root as `.oxlintrc.json` and modify it. See the [Oxlint config reference](https://oxc.rs/docs/guide/usage/linter/config) for all available options.

</details>

### TypeScript

Create a `tsconfig.json` file in your project root with the following content:

```json
{
  "extends": "@ivosabev/config/typescript",
  "include": ["@ivosabev/config/reset.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
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
  "include": ["@ivosabev/config/reset.d.ts", "src", "tailwind.config.ts"],
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
  "fmt": "oxfmt",
  "fmt:check": "oxfmt --check",
  "lint": "oxlint",
  "lint-check": "oxlint",
  "typecheck": "tsc",
  "validate": "run-p -l lint fmt:check typecheck"
}
```

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
