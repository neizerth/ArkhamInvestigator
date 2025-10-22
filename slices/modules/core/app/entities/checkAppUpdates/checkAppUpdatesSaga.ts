import { appIsOutdated, updateAppData } from "@modules/core/app/shared/lib";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import {
	selectMediaUpdateTime,
	selectMediaVersion,
} from "@modules/signature/base/shared/lib";
import { seconds } from "@shared/lib";
import type { ReturnAwaited } from "@shared/model";
import { put, retry, select, takeEvery } from "redux-saga/effects";
import { updateAppInfo } from "../updateAppInfo";
import { appUpdatesChecked, checkAppUpdates } from "./checkAppUpdates";
import { getAppStatusData } from "./getAppStatusData";
import { isOutdatedAppVersion, isUpdateNeeded } from "./lib";

function* worker({ payload }: ReturnType<typeof checkAppUpdates>) {
	const { notify } = payload;
	console.log("checking app updates");
	try {
		const maxTries = 3;
		const { data }: ReturnAwaited<typeof getAppStatusData> = yield retry(
			maxTries,
			seconds(1),
			getAppStatusData,
		);

		console.log("version", data.version);
		const { minClientVersion } = data;

		const outdated = isOutdatedAppVersion(minClientVersion);

		if (outdated) {
			yield put(appIsOutdated());
			return;
		}

		const language: ReturnType<typeof selectCurrentLanguage> = yield select(
			selectCurrentLanguage,
		);
		const mediaVersion: ReturnType<typeof selectMediaVersion> =
			yield select(selectMediaVersion);
		const mediaUpdateTime: ReturnType<typeof selectMediaUpdateTime> =
			yield select(selectMediaUpdateTime);

		const needUpdate = isUpdateNeeded({
			info: data,
			language,
			mediaVersion,
			mediaUpdateTime,
		});

		if (notify && !needUpdate) {
			yield put(
				sendNotification({
					type: "info",
					message: "update.notNeeded",
				}),
			);
		}

		if (needUpdate) {
			console.log("updating app info");
			yield put(updateAppInfo(data));
			yield put(
				updateAppData({
					language,
				}),
			);
		}

		if (notify && needUpdate) {
			yield put(
				sendNotification({
					message: "update.updated",
					data: {
						version: data.version,
					},
				}),
			);
		}
		yield put(appUpdatesChecked(data));
	} catch (e) {
		console.error("error checking app updates", e);
		if (e instanceof Error && notify) {
			yield put(
				sendNotification({
					type: "error",
					message: "update.failed",
					data: {
						error: e.message,
					},
				}),
			);
		}
		return;
	}
}
export function* checkAppUpdatesSaga() {
	yield takeEvery(checkAppUpdates.match, worker);
}
