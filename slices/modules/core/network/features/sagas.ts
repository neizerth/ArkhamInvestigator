import { spawn } from "redux-saga/effects";
import { watchNetworkUpdateSaga } from "./watch-network-update/watchNetworkUpdateSaga";

export function* networkFeaturesSaga() {
	yield spawn(watchNetworkUpdateSaga);
}
