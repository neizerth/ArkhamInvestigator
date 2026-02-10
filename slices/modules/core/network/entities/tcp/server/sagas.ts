import { spawn } from "redux-saga/effects";
import { runTCPServerSaga } from "./runTCPServer/runTCPServerSaga";
import { stopTCPServerSaga } from "./stopTCPServer/stopTCPServerSaga";

export function* serverTcpSagas() {
	yield spawn(runTCPServerSaga);
	yield spawn(stopTCPServerSaga);
}
