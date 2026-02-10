import { spawn } from "redux-saga/effects";
import { clientTcpSagas } from "./client/sagas";
import { sendTCPActionSaga } from "./sendTCPAction/sendTCPActionSaga";
import { serverTcpSagas } from "./server/sagas";

export function* tcpSagas() {
	yield spawn(serverTcpSagas);
	yield spawn(clientTcpSagas);
	yield spawn(sendTCPActionSaga);
}
