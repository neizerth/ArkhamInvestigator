import { appIsOutdated } from "@modules/core/app/shared/lib";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import {
	selectMediaUpdateTime,
	selectMediaVersion,
} from "@modules/signature/shared/lib";
import { seconds } from "@shared/lib";
import type { ReturnAwaited } from "@shared/model";
import { put, retry, select, takeEvery } from "redux-saga/effects";
import { updateAppInfo } from "../updateAppInfo";
import { checkAppUpdates } from "./checkAppUpdates";
import { getAppStatusData } from "./getAppStatusData";
import { isOutdatedAppVersion, isUpdateNeeded } from "./lib";

function* worker() {
	const maxTries = 3;
	const { data }: ReturnAwaited<typeof getAppStatusData> = yield retry(
		maxTries,
		seconds(1),
		getAppStatusData,
	);

	const { minClientVersion } = data;

	const outdated = isOutdatedAppVersion(minClientVersion);

	if (outdated) {
		yield put(appIsOutdated());
		return;
	}

	const locale: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);
	const mediaVersion: ReturnType<typeof selectMediaVersion> =
		yield select(selectMediaVersion);
	const mediaUpdateTime: ReturnType<typeof selectMediaUpdateTime> =
		yield select(selectMediaUpdateTime);

	const needUpdate = isUpdateNeeded({
		info: data,
		locale,
		mediaVersion,
		mediaUpdateTime,
	});

	if (needUpdate) {
		yield put(updateAppInfo(data));
	}
}
export function* checkAppUpdatesSaga() {
	yield takeEvery(checkAppUpdates.match, worker);
}
