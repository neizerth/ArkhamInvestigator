import { spawn } from "redux-saga/effects";
import { tcpClientSagas } from "./client/sagas";
import { commonTcpSagas } from "./common/sagas";
import { tcpServerSagas } from "./server/sagas";

export function* tcpSagas() {
	yield spawn(tcpServerSagas);
	yield spawn(tcpClientSagas);
	yield spawn(commonTcpSagas);
}
