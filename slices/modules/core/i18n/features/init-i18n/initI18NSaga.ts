import { initAppUI } from "@modules/core/app/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { restoreTranslation } from "../../shared/lib";

function* worker() {
	yield put(restoreTranslation());
}

export function* initI18NSaga() {
	yield takeEvery(initAppUI.match, worker);
}
