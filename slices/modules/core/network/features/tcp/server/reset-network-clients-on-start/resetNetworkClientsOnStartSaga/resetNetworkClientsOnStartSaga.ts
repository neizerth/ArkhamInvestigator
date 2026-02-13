import { appStarted } from "@modules/core/app/shared/lib";
import { removeAllNetworkClients } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(removeAllNetworkClients());
}

export function* resetNetworkClientsOnStartSaga() {
	yield takeEvery(appStarted.match, worker);
}
