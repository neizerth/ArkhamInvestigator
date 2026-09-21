import { appStarted } from "@modules/core/app/shared/lib";
import { removeAllNetworkClients } from "@modules/core/network/shared/lib";
import { takeOnce } from "@shared/lib";
import { put } from "redux-saga/effects";

function* worker() {
	yield put(removeAllNetworkClients());
}

export function* resetNetworkClientsOnStartSaga() {
	yield takeOnce(appStarted.match, worker);
}
