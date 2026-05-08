import { log } from "@modules/core/log/shared/config";
import { getLogFiles } from "@modules/core/log/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { ascend, descend, prop, sortWith } from "ramda";
import { Share } from "react-native";
import { call, put, takeEvery } from "redux-saga/effects";
import { shareLogs } from "./shareLogs";

function* worker() {
	if (!FileSystem.documentDirectory) {
		log.error("shareLogs: documentDirectory is not available");
		return;
	}

	const logFiles: ReturnAwaited<typeof getLogFiles> = yield call(getLogFiles);

	if (logFiles.length === 0) {
		log.info("shareLogs: no log files found");
		yield put(
			sendNotification({
				message: "log.noLogs",
				type: "error",
			}),
		);
		return;
	}

	const data = sortWith(
		[descend(prop("modificationTime")), ascend(prop("name"))],
		logFiles,
	);
	const [latest] = data;

	try {
		yield call(Share.share, {
			message: latest.name,
			url: latest.path,
		});
	} catch (e) {
		log.error("shareLogs: share failed", e);
	}
}

export function* shareLogsSaga() {
	yield takeEvery(shareLogs.match, worker);
}
