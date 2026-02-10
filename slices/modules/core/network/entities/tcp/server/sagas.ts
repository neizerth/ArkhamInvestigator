import { spawn } from "redux-saga/effects";
import { runTCPServerSaga } from "./runTCPServer/runTCPServerSaga";
import { sendTCPClientActionSaga } from "./sendTCPClientAction/sendTCPClientActionSaga";
import { stopTCPServerSaga } from "./stopTCPServer/stopTCPServerSaga";

export function* serverTcpSagas() {
	yield spawn(runTCPServerSaga);
	yield spawn(stopTCPServerSaga);
	yield spawn(sendTCPClientActionSaga);
}
