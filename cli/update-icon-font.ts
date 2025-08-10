import "./env";
import path from "node:path";
import fs from "node:fs";
const baseURL = process.env.EXPO_PUBLIC_API_URL;

const jsonURL = `${baseURL}/icons.json`;
const fontURL = `${baseURL}/fonts/icons.ttf`;

const dest = path.join(__dirname, "/../assets/fonts/common/ArkhamIcons");

const copy = (url: string, file: string) =>
	fetch(url)
		.then((r) => r.text())
		.then((contents) => {
			fs.writeFileSync(file, contents);
			console.log(`file ${file} updated!`);
		});

copy(fontURL, `${dest}/ArkhamIcons.ttf`);
copy(jsonURL, `${dest}/ArkhamIcons.json`);
