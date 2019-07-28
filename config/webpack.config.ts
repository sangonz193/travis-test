/// <reference path="../src/typings/create-file-webpack.d.ts" />
/// <reference path="../src/typings/inline-environment-variables-webpack-plugin.d.ts" />

import * as CreateFileWebpack from "create-file-webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";
import * as InlineEnvironmentVariablesPlugin from "inline-environment-variables-webpack-plugin";
import * as TerserPlugin from "terser-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { projectPath } from "../projectPath";

const babelConfig = {
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

export const webpackConfigFactory = (
	env: "development" | "production" | "none",
	isStorybook: boolean = false
): webpack.Configuration & {
	devServer: {
		publicPath: string;
		historyApiFallback: boolean;
		host: string;
	};
} => {
	const publicPath = process.env.PUBLIC_URL || "/";
	const outputPath = path.resolve(projectPath, "dist");

	const isProd = env === "production";

	const minimizers = [];

	if (isProd)
		minimizers.push(
			new TerserPlugin({
				sourceMap: true,
				extractComments: "all",
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			})
		);

	const plugins = [
		new webpack.EnvironmentPlugin(process.env),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.optimize.OccurrenceOrderPlugin(false),
		new InlineEnvironmentVariablesPlugin(),
		new CreateFileWebpack({
			path: outputPath,
			fileName: ".htaccess",
			content: `RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ /var/www/html/OpenFING-FW${publicPath !== "/" && publicPath !== "./" ? publicPath : ""}/index.html
`,
		}),
	];

	if (isProd) plugins.push(new CleanWebpackPlugin());

	const resolve: { extensions: string[]; plugins: any[]; alias?: any } = {
		extensions: [".ts", ".tsx", ".js", ".json"],
		plugins: [new TsconfigPathsPlugin()],
	};

	if (isStorybook)
		resolve.alias = {
			src: path.resolve(__dirname, "../src"),
		};

	const modulesToCompile = ["openfing-core"];

	return {
		mode: env,
		output: {
			path: outputPath,
			filename: isProd ? "static/js/[hash].bundle.js" : "main.js",
			publicPath,
		},
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								cacheDirectory: true,
								...babelConfig,
							},
						},
						{
							loader: "ts-loader",
							options: {
								transpileOnly: true,
							},
						},
					],
				},
				{
					test: /\.js(x?)$/,
					include: new RegExp(`/node_modules\/(${modulesToCompile.join("|")})/`),
					use: [
						{
							loader: "babel-loader",
							options: {
								cacheDirectory: true,
								...babelConfig,
							},
						},
					],
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader",
						},
					],
				},
				{
					test: /\.(svg|jpg|jpeg)$/,
					use: {
						loader: "url-loader",
						options: isStorybook
							? {}
							: {
									limit: 1024,
									publicPath: (isProd ? publicPath : "") + "/static/assets",
									outputPath: "static/assets",
							  },
					},
				},
			],
		},
		resolve,
		plugins,
		devServer: {
			publicPath: "/",
			historyApiFallback: true,
			host: "0.0.0.0",
		},
		devtool: isProd ? undefined : "source-map",
		optimization: {
			minimizer: minimizers,
		},
	};
};
