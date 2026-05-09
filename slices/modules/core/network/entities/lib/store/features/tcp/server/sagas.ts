import { spawn } from "redux-saga/effects";
import { restartTCPServerSaga } from "./restartTCPServer/restartTCPServerSaga";
import { runTCPServerSaga } from "./runTCPServer/runTCPServerSaga";
import { sendTCPActionToClientSaga } from "./sendTCPActionToClient/sendTCPActionToClientSaga";
import { stopTCPServerSaga } from "./stopTCPServer/stopTCPServerSaga";
import { zeroconfSagas } from "./zeroconf/sagas";

export function* serverTcpSagas() {
	yield spawn(zeroconfSagas);
	yield spawn(runTCPServerSaga);
	yield spawn(stopTCPServerSaga);
	yield spawn(restartTCPServerSaga);
	yield spawn(sendTCPActionToClientSaga);
}
