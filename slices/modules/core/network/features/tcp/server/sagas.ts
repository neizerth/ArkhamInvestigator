import { spawn } from "redux-saga/effects";
import { restartTCPServerOnNicknameChangeSaga } from "./restart-tcp-server-on-nickname-change/restartTCPServerOnNicknameChangeSaga";
import { runTCPServerOnNetworkRoleChangeSaga } from "./run-tcp-server-on-network-role-change/runTCPServerOnNetworkRoleChangeSaga";
import { transformTCPDataToReduxActionSaga } from "./transform-tcp-data-to-redux-action/transformTCPDataToReduxActionSaga";

export function* tcpServerSagas() {
	yield spawn(runTCPServerOnNetworkRoleChangeSaga);
	yield spawn(restartTCPServerOnNicknameChangeSaga);
	yield spawn(transformTCPDataToReduxActionSaga);
}
