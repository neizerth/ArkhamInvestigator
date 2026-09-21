import {
	appLoaded,
	appStarted,
	setAppLoaded,
	setAppReady,
} from "@modules/core/app/shared/lib";
import { preloadFonts } from "@modules/core/assets/base/entities/preloadFonts";
import { loadAssets } from "@modules/core/assets/base/features/load-assets";
import { initI18N } from "@modules/core/i18n/features/init-i18n";
import { takeOnce } from "@shared/lib";
import type { Task } from "redux-saga";
import { all, call, fork, join, put } from "redux-saga/effects";

function* worker() {
	// started right away: it has to catch the result of the initial update check
	const assets: Task = yield fork(loadAssets);

	// the loader shows no text until fonts and language are ready
	yield all([call(preloadFonts), call(initI18N)]);

	yield put(setAppReady(true));

	yield join(assets);

	yield put(setAppLoaded(true));
	yield put(appLoaded());
}

export function* appLoadSaga() {
	yield takeOnce(appStarted.match, worker);
}
