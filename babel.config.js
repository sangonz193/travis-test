module.exports = function(api) {
	api.cache(true);

	return {
		presets: [
			[
				"@babel/env",
				{
					targets: {
						ie: "11",
					},
					debug: true,
				},
			],
		],
		plugins: [
			[
				"@babel/plugin-transform-runtime",
				{
					absoluteRuntime: false,
					corejs: 3,
					helpers: true,
					regenerator: true,
					useESModules: false,
				},
			],
			["@babel/plugin-proposal-decorators", { legacy: true }],
			["@babel/proposal-class-properties", { loose: true }],
			"@babel/proposal-object-rest-spread",
			"babel-plugin-styled-components",
		],
	};
};
