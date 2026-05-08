import { log } from "@modules/core/log/shared/config";
import { getLogFiles } from "@modules/core/log/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { ascend, descend, prop, sortWith } from "ramda";
import { call, takeEvery } from "redux-saga/effects";
import { shareLogs } from "./shareLogs";

function* worker() {
	if (!FileSystem.documentDirectory) {
		log.error("shareLogs: documentDirectory is not available");
		return;
	}

	const logFiles: ReturnAwaited<typeof getLogFiles> = yield call(getLogFiles);

	if (logFiles.length === 0) {
		log.info("shareLogs: no log files found");
		return;
	}

	const data = sortWith(
		[descend(prop("modificationTime")), ascend(prop("name"))],
		logFiles,
	);
	const [latest] = data;

	const cacheDir = FileSystem.cacheDirectory;
	if (!cacheDir) {
		log.error("shareLogs: cacheDirectory is not available");
		return;
	}

	const sharePath = `${cacheDir}${latest.name}.txt`;

	try {
		yield call(FileSystem.copyAsync, { from: latest.path, to: sharePath });
		yield call(Sharing.shareAsync, sharePath, {
			mimeType: "text/plain",
			dialogTitle: "Logs",
			UTI: "public.plain-text",
		});
	} finally {
		yield call(FileSystem.deleteAsync, sharePath, { idempotent: true });
	}
}

export function* shareLogsSaga() {
	yield takeEvery(shareLogs.match, worker);
}
