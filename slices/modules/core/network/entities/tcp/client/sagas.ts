import { spawn } from "redux-saga/effects";
import { checkTCPClientConnectionSaga } from "./checkTCPClientConnection/checkTCPClientConnectionSaga";
import { runTCPClientSaga } from "./runTCPClient/runTCPClientSaga";
import { sendNetworkClientInfoSaga } from "./sendNetworkClientInfo/sendNetworkClientInfoSaga";
import { sendTCPActionToServerSaga } from "./sendTCPActionToServer/sendTCPActionToServerSaga";

export function* clientTcpSagas() {
	yield spawn(runTCPClientSaga);
	yield spawn(sendTCPActionToServerSaga);
	yield spawn(sendNetworkClientInfoSaga);
	yield spawn(checkTCPClientConnectionSaga);
}
