import { log } from "@modules/core/log/shared/config";
import { getLogFiles } from "@modules/core/log/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import moment from "moment";
import { always, lte } from "ramda";
import { call, put, takeEvery } from "redux-saga/effects";
import { clearLogs } from "./clearLogs";

function* worker({ payload }: ReturnType<typeof clearLogs>) {
	if (!FileSystem.documentDirectory) {
		log.error("clearLogs: documentDirectory is not available");
		return;
	}

	const { period, notify = false } = payload;

	const files: ReturnAwaited<typeof getLogFiles> = yield call(getLogFiles);

	const today = moment();
	const yesterday = moment().subtract(1, "day");

	const filters = {
		today: lte(today.unix()),
		yesterday: lte(yesterday.unix()),
		all: always(true),
	};

	const query = filters[period];

	const toRemove = files.filter((file) => query(file.modificationTime));

	if (toRemove.length === 0) {
		if (notify) {
			yield put(
				sendNotification({
					message: "log.noLogs",
					type: "info",
				}),
			);
		}
		return;
	}

	for (const { path } of toRemove) {
		yield call(FileSystem.deleteAsync, path, { idempotent: true });
	}

	if (!notify) {
		return;
	}
	yield put(
		sendNotification({
			message: "file.removed",
			data: {
				count: toRemove.length,
			},
			type: "success",
		}),
	);
}

export function* clearLogsSaga() {
	yield takeEvery(clearLogs.match, worker);
}
