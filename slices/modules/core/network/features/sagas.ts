import { spawn } from "redux-saga/effects";
import { runTCPClientSaga } from "./run-tcp-client/runTCPClientSaga";
import { runTCPServerSaga } from "./run-tcp-server/runTCPServerSaga";
import { watchNetworkUpdateSaga } from "./watch-network-update/watchNetworkUpdateSaga";

export function* networkFeaturesSaga() {
	yield spawn(watchNetworkUpdateSaga);
	yield spawn(runTCPServerSaga);
	yield spawn(runTCPClientSaga);
}
