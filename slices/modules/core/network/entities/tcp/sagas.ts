import { spawn } from "redux-saga/effects";
import { clientTcpSagas } from "./client/sagas";
import { serverTcpSagas } from "./server/sagas";

export function* tcpSagas() {
	yield spawn(serverTcpSagas);
	yield spawn(clientTcpSagas);
}
