import { spawn } from "redux-saga/effects";
import { runTCPClientSaga } from "./runTCPClient/runTCPClientSaga";
import { runTCPServerSaga } from "./runTCPServer/runTCPServerSaga";
import { stopTCPServerSaga } from "./stopTCPServer/stopTCPServerSaga";

export function* tcpSagas() {
	yield spawn(runTCPServerSaga);
	yield spawn(runTCPClientSaga);
	yield spawn(stopTCPServerSaga);
}
