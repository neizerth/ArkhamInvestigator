const extension = process.argv[2];

import { readdirSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";
import { version } from "../package.json";

const rootDir = join(__dirname, "..");

const files = readdirSync(rootDir)
	.filter((file) => file.endsWith(extension))
	.map((file) => ({ file, time: statSync(join(rootDir, file)).mtimeMs }))
	.sort((a, b) => b.time - a.time);

if (files.length === 0) {
	console.log(`No ${extension} files found`);
	process.exit(0);
}

const oldName = files[0].file;
const newName = `${version}${extension}`;

renameSync(join(rootDir, oldName), join(rootDir, newName));
console.log(`✓ ${oldName} → ${newName}`);
