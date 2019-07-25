/// <reference path="../src/typings/create-file-webpack.d.ts" />
/// <reference path="../src/typings/inline-environment-variables-webpack-plugin.d.ts" />

import * as CreateFileWebpack from "create-file-webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";
import * as InlineEnvironmentVariablesPlugin from "inline-environment-variables-webpack-plugin";
import * as TerserPlugin from "terser-webpack-plugin";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as webpack from "webpack";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export const webpackConfigFactory = (env: string, isStorybook: boolean = false) => {
	const publicPath = process.env.PUBLIC_URL || "/";
	const outputPath = path.resolve(process.cwd(), "dist");

	const isProd = env === "production";

	const minimizers = [];

	if (isProd)
		minimizers.push(
			new TerserPlugin({
				sourceMap: true,
				extractComments: "all",
				terserOptions: {
					compress: {
						drop_console: false,
					},
				},
			})
		);

	const envFile = fs.readFileSync(".env", { encoding: "utf8" });
	const envVariables = dotenv.parse(envFile);

	const plugins = [
		new webpack.EnvironmentPlugin(envVariables),
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
