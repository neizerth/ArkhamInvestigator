import * as FileSystem from "expo-file-system";
import type { LogFile } from "../model/log";

const LOG_PREFIX = "logs_";

export const getLogFiles = async () => {
	const dir = FileSystem.documentDirectory;
	if (!dir) {
		return [];
	}
	const entries = await FileSystem.readDirectoryAsync(dir);

	const logFiles = entries.filter((name) => name.startsWith(LOG_PREFIX));

	const data: LogFile[] = [];

	for (const name of logFiles) {
		const date = name.replace(LOG_PREFIX, "").replace(".log", "");
		const uri = `${dir}${name}`;
		const info = await FileSystem.getInfoAsync(uri);

		if (info.exists && info.uri) {
			const modificationTime = info.modificationTime ?? 0;

			data.push({
				name,
				date,
				path: uri,
				modificationTime,
			});
		}
	}

	return data;
};
