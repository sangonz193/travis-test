import * as fs from "fs";
import * as path from "path";

import SFTP from "ssh2-promise/dist/sftp";
import { loadEnv } from "./loadEnv";
import { projectPath } from "../projectPath";

import SSH2Promise = require("ssh2-promise");

loadEnv();

const deploy = async () => {
	const { CI, SSH_KEY, DESTINATION_PATH, SSH_HOST, SSH_USERNAME, DELETE_DIR_FIRST, TRAVIS_TAG } = process.env;

	if (CI === "true" && (!TRAVIS_TAG || !/^v\d+\.\d+\.\d+-preview\d+$/.test(TRAVIS_TAG)))
		return console.log("Won't be deploying.");

	if (!SSH_KEY) throw new Error("No valid ssh key found");
	if (!DESTINATION_PATH) throw new Error("No valid destination path defined");
	if (!SSH_HOST) throw new Error("No valid ssh host defined");
	if (!SSH_USERNAME) throw new Error("No valid ssh username path defined");

	const uploadRecursive = async (options: { fromPath: string; toPath: string; sftp: SFTP }) => {
		const { fromPath, toPath, sftp } = options;
		const isDirectory = fs.lstatSync(fromPath).isDirectory();

		if (!isDirectory) {
			await new Promise(async (resolve, reject) => {
				const readStream = fs.createReadStream(fromPath);
				const writeStream = await sftp.createWriteStream(toPath);

				writeStream.on("close", () => resolve());
				writeStream.on("error", reject);

				readStream.pipe(writeStream);
			});
		} else {
			let shouldCreateFolder = true;

			try {
				const lsStat = await sftp.lstat(toPath);

				if (!lsStat.isDirectory()) await sftp.unlink(toPath);
				else shouldCreateFolder = false;
			} catch (e) {}

			if (shouldCreateFolder) await sftp.mkdir(toPath);

			const folderContent = fs.readdirSync(fromPath);

			for (const item of folderContent)
				await uploadRecursive({
					fromPath: path.join(fromPath, item),
					toPath: path.join(toPath, item),
					sftp,
				});
		}

		console.log(`- uploaded: ${fromPath} to ${toPath}`);
	};

	const deleteRecursive = async (options: { path: string; sftp: SFTP }) => {
		const { sftp } = options;
		const isDirectory = (await sftp.lstat(options.path)).isDirectory();

		if (!isDirectory) await sftp.unlink(options.path);
		else {
			const folderContent: Array<{ filename: string; longname: string }> = await sftp.readdir(options.path);

			for (const item of folderContent)
				await deleteRecursive({
					path: path.join(options.path, item.filename),
					sftp,
				});

			sftp.rmdir(options.path);
		}

		console.log(`- deleted: ${options.path}`);
	};

	const ssh = new SSH2Promise({
		host: SSH_HOST,
		username: SSH_USERNAME,
		privateKey: Buffer.from(SSH_KEY, "base64"),
	});

	await ssh.connect();
	const sftp = ssh.sftp();

	if (DELETE_DIR_FIRST === "true") {
		try {
			await sftp.lstat(DESTINATION_PATH);

			await deleteRecursive({
				path: DESTINATION_PATH,
				sftp,
			});
		} catch (e) {
			console.log(e);
		}
	}

	await uploadRecursive({
		fromPath: path.join(projectPath, "dist"),
		toPath: DESTINATION_PATH,
		sftp,
	});

	console.log("- done");
	ssh.close();
};

deploy().catch(e => process.exit(1));
