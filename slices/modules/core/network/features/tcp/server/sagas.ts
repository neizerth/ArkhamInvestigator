import { spawn } from "redux-saga/effects";
import { connectTCPClientSaga } from "./connect-tcp-client/connectTCPClientSaga";
import { disconnectTCPClientSaga } from "./disconnect-tcp-client/disconnectTCPClientSaga";
import { restartTCPServerOnNicknameChangeSaga } from "./restart-tcp-server-on-nickname-change/restartTCPServerOnNicknameChangeSaga";
import { runTCPServerOnNetworkRoleChangeSaga } from "./run-tcp-server-on-network-role-change/runTCPServerOnNetworkRoleChangeSaga";
import { runTCPServerOnAppStartSaga } from "./run-tcp-server-on-start/runTCPServerOnAppStartSaga";
import { transformServerTCPDataToActionSaga } from "./transform-tcp-server-data-to-action/transformServerTCPDataToActionSaga";

export function* tcpServerSagas() {
	yield spawn(runTCPServerOnNetworkRoleChangeSaga);
	yield spawn(runTCPServerOnAppStartSaga);
	yield spawn(restartTCPServerOnNicknameChangeSaga);
	yield spawn(transformServerTCPDataToActionSaga);
	yield spawn(connectTCPClientSaga);
	yield spawn(disconnectTCPClientSaga);
}
