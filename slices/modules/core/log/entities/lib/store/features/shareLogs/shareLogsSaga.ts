import { log } from "@modules/core/log/shared/config";
import { getLogFiles } from "@modules/core/log/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { ascend, descend, prop, sortWith } from "ramda";
import { Share } from "react-native";
import { call, takeEvery } from "redux-saga/effects";
import { shareLogs } from "./shareLogs";

function* worker() {
	const dir = FileSystem.documentDirectory;
	if (!dir) {
		log.error("shareLogs: documentDirectory is not available");
		return;
	}

	const logFiles: ReturnAwaited<typeof getLogFiles> = yield call(getLogFiles);

	if (logFiles.length === 0) {
		log.info("shareLogs: no log files found", dir);
		return;
	}

	const data = sortWith(
		[descend(prop("modificationTime")), ascend(prop("name"))],
		logFiles,
	);
	const [latest] = data;

	yield call(Share.share, {
		title: "Logs",
		url: latest.path,
		message: latest.name,
	});
}

export function* shareLogsSaga() {
	yield takeEvery(shareLogs.match, worker);
}
