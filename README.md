<div>
  <h1>@ivosabev/config</h1>
  <strong>
    ESLint, Prettier, and TypeScript configs
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

### Prettier

The easiest way to use this config is in your `package.json`:

```json
"prettier": "@ivosabev/config/prettier"
```

<details>
  <summary>Customizing Prettier</summary>

If you want to customize things, you should probably just copy/paste the
built-in config. But if you really want, you can override it using regular
JavaScript stuff.

Create a `.prettierrc.js` file in your project root with the following content:

```js
import defaultConfig from '@ivosabev/config/prettier';

/** @type {import("prettier").Options} */
export default {
	...defaultConfig,
	// .. your overrides here...
};
```

</details>

### TypeScript

Create a `tsconfig.json` file in your project root with the following content:

```json
{
	"extends": ["@ivosabev/config/typescript"],
	"include": ["@ivosabev/config/reset.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
	"compilerOptions": {
		"paths": {
			"#app/*": ["./app/*"],
			"#tests/*": ["./tests/*"]
		}
	}
}
```

<details>
  <summary>Customizing TypeScript</summary>

Learn more from
[the TypeScript docs here](https://www.typescriptlang.org/tsconfig/#extends).

</details>

### ESLint

Create a `eslint.config.js` file in your project root with the following
content:

```js
import {config as defaultConfig} from '@ivosabev/config/eslint';

/** @type {import("eslint").Linter.Config} */
export default [...defaultConfig];
```

<details>
  <summary>Customizing ESLint</summary>

Learn more from
[the Eslint docs here](https://eslint.org/docs/latest/extend/shareable-configs#overriding-settings-from-shareable-configs).

</details>

There are endless rules we could enable. However, we want to keep our
configurations minimal and only enable rules that catch real problems (the kind
that are likely to happen). This keeps our linting faster and reduces the number
of false positives.

### package.json

You may want to add the following scripts to your project:

```json
{
  "format-check": "prettier --check .",
  "format": "prettier --write .",
  "lint-check": "eslint .",
  "lint": "eslint .",
  "typecheck": "tsc",
  "validate": "run-p -l format lint typecheck"
}
```

## Credits

- https://github.com/epicweb-dev/config
- https://github.com/remix-run/remix/tree/main/packages/remix-eslint-config
- https://github.com/total-typescript/tsconfig
- https://github.com/mattpocock/ts-reset

## License

MIT
