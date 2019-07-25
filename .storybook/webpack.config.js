// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
require("ts-node").register({
	compilerOptions: {
		module: "commonjs",
	},
});
const { webpackConfigFactory } = require("../config/webpack.config");

module.exports = async ({ config }) => {
	const merge = (a, b) => {
		Object.keys(b).forEach(key => {
			const bValue = b[key];

			if (!(key in a)) {
				a[key] = bValue;
				return;
			}

			const aValue = a[key];

			const isObject = o => o && typeof o === "object";

			if (Array.isArray(aValue) && Array.isArray(bValue)) a[key] = [...aValue, ...bValue];
			else if (isObject(aValue) && isObject(bValue)) merge(aValue, bValue);
			else a[key] = bValue;
		});
	};

	const customConfig = webpackConfigFactory("development", true);
	merge(config, customConfig);
	config.resolve.extensions = customConfig.resolve.extensions;

	return config;
};
