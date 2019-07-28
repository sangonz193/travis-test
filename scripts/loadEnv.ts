import * as fs from "fs";
import * as path from "path";

import { parse } from "dotenv";
import { projectPath } from "../projectPath";

export const loadEnv = () => {
	const { ENV_FILE = ".env" } = process.env;

	const envFilePath = path.resolve(projectPath, ENV_FILE);

	if (!fs.existsSync(envFilePath)) return console.log(`${ENV_FILE} file not found. Skiping loadEnv.`);

	const envFileData = fs.readFileSync(envFilePath);

	const envs = parse(envFileData);

	process.env = {
		...process.env,
		...envs,
	};
};
