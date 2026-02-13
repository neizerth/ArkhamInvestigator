import { spawn } from "redux-saga/effects";
import { connectTCPClientSaga } from "./connect-tcp-client/connectTCPClientSaga";
import { disconnectTCPClientSaga } from "./disconnect-tcp-client/disconnectTCPClientSaga";
import { restartTCPServerOnNicknameChangeSaga } from "./restart-tcp-server-on-nickname-change/restartTCPServerOnNicknameChangeSaga";
import { runTCPServerOnNetworkRoleChangeSaga } from "./run-tcp-server-on-network-role-change/runTCPServerOnNetworkRoleChangeSaga";
import { runTCPServerOnAppResumeSaga } from "./run-tcp-server-on-resume/runTCPServerOnAppResumeSaga";
import { transformTCPServerDataToActionSaga } from "./transform-tcp-server-data-to-action/transformTCPServerDataToActionSaga";

export function* tcpServerSagas() {
	yield spawn(runTCPServerOnNetworkRoleChangeSaga);
	yield spawn(runTCPServerOnAppResumeSaga);
	yield spawn(restartTCPServerOnNicknameChangeSaga);
	yield spawn(transformTCPServerDataToActionSaga);
	yield spawn(connectTCPClientSaga);
	yield spawn(disconnectTCPClientSaga);
}
