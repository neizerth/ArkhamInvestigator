import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const file = path.join(__dirname, "../app.version.json");
const data = JSON.parse(readFileSync(file, "utf8"));

data.versionCode++;

writeFileSync(file, JSON.stringify(data, null, 2));

console.log("new app version:", data.versionCode);
