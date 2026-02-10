import { spawn } from "redux-saga/effects";
import { runTCPClientSaga } from "./runTCPClient/runTCPClientSaga";

export function* clientTcpSagas() {
	yield spawn(runTCPClientSaga);
}
