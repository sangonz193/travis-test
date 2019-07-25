require("ts-node").register({
	compilerOptions: {
		module: "commonjs"
	}
});

module.exports = env => require("./config/webpack.config").webpackConfigFactory(env);
