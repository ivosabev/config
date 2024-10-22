/** @type {import("prettier").Options} */
export const config = {
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: false,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	insertPragma: false,
	jsxSingleQuote: false,
	overrides: [
		// formatting the package.json with anything other than spaces will cause
		// issues when running install...
		{
			files: ['**/package.json'],
			options: {
				useTabs: false,
			},
		},
		{
			files: ['**/*.mdx'],
			options: {
				htmlWhitespaceSensitivity: 'ignore',
				// This stinks, if you don't do this, then an inline component on the
				// end of the line will end up wrapping, then the next save Prettier
				// will add an extra line break. Super annoying and probably a bug in
				// Prettier, but until it's fixed, this is the best we can do.
				proseWrap: 'preserve',
			},
		},
	],
	plugins: ['prettier-plugin-tailwindcss'],
	printWidth: 120,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	requirePragma: false,
	semi: true,
	singleAttributePerLine: false,
	singleQuote: true,
	tabWidth: 2,
	tailwindAttributes: ['class', 'className', 'ngClass', '.*[cC]lassName'],
	tailwindFunctions: ['clsx', 'cn'],
	trailingComma: 'all',
	useTabs: true,
};

// this is for backward compatibility
export default config;
