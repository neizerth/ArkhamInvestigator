import {
	restartTCPServerZeroconf,
	startTCPServerZeroconf,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(stopTCPServerZeroconf());
	yield put(startTCPServerZeroconf());
}

export function* restartTCPServerZeroconfSaga() {
	yield takeEvery(restartTCPServerZeroconf.match, worker);
}
