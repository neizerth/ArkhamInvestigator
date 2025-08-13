import { appStarted } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { preloadAssetImage, preloadFonts } from "../../entities/lib";
import { initAssetsInternal } from "../../shared/lib";

function* worker() {
	yield put(initAssetsInternal());

	yield put(preloadAssetImage(0));
	yield put(preloadFonts());
}

export function* initAssetsSaga() {
	yield takeEvery(appStarted.match, worker);
}
