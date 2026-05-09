import {
	stopTCPServer,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(stopTCPServerZeroconf());
}

export function* stopTCPServerSaga() {
	yield takeEvery(stopTCPServer.match, worker);
}
