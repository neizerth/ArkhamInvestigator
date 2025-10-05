import { reloadExternalAssets } from "@modules/core/assets/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { restartApp } from "../../entities/restartApp";
import { reloadAssets } from "./reloadAssets";

function* worker() {
	yield put(reloadExternalAssets());

	yield put(restartApp());
}

export function* reloadAssetsSaga() {
	yield takeEvery(reloadAssets.match, worker);
}
