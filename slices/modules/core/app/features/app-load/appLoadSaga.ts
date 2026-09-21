import {
	appLoaded,
	appStarted,
	setAppLoaded,
} from "@modules/core/app/shared/lib";
import { loadAssets } from "@modules/core/assets/base/features/load-assets";
import { takeOnce } from "@shared/lib";
import { call, put } from "redux-saga/effects";

function* worker() {
	// the flag is persisted, reset it before the first render
	yield put(setAppLoaded(false));

	yield call(loadAssets);

	yield put(setAppLoaded(true));
	yield put(appLoaded());
}

export function* appLoadSaga() {
	yield takeOnce(appStarted.match, worker);
}
