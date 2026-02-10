import { spawn } from "redux-saga/effects";
import { runTCPClientSaga } from "./runTCPClient/runTCPClientSaga";
import { sendTCPServerActionSaga } from "./sendTCPServerAction/sendTCPServerActionSaga";

export function* clientTcpSagas() {
	yield spawn(runTCPClientSaga);
	yield spawn(sendTCPServerActionSaga);
}
