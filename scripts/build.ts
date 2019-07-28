import * as webpack from "webpack";

import { loadEnv } from "./loadEnv";
import { webpackConfigFactory } from "../config/webpack.config";

loadEnv();

webpack(webpackConfigFactory("production"), (err, stats) => {
	if (err) console.error(err);
	if (stats) console.log(stats.toString({ colors: true }));
});
