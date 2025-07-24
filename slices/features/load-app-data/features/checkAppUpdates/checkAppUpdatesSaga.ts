import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { loadAPIStatus } from "@shared/api";
import {
	seconds,
	selectMediaUpdateTime,
	selectMediaVersion,
	setAppOutdated,
} from "@shared/lib";
import type { ReturnAwaited } from "@shared/model";
import { put, retry, select, takeEvery } from "redux-saga/effects";
import { updateAppData } from "../updateAppData";
import { checkAppUpdates } from "./checkAppUpdates";
import { isOutdatedAppVersion, isUpdateNeeded } from "./lib";

function* worker() {
	const maxTries = 3;
	const data: ReturnAwaited<typeof loadAPIStatus> = yield retry(
		maxTries,
		seconds(1),
		loadAPIStatus,
	);

	const { minClientVersion } = data;

	if (isOutdatedAppVersion(minClientVersion)) {
		yield put(setAppOutdated(true));
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
		yield put(updateAppData());
	}
}
export function* checkAppUpdatesSaga() {
	yield takeEvery(checkAppUpdates.match, worker);
}
