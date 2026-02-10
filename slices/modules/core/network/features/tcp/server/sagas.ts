import { spawn } from "redux-saga/effects";
import { restartTCPServerOnNicknameChangeSaga } from "./restart-tcp-server-on-nickname-change/restartTCPServerOnNicknameChangeSaga";
import { runTCPServerOnNetworkRoleChangeSaga } from "./run-tcp-server-on-network-role-change/runTCPServerOnNetworkRoleChangeSaga";

export function* tcpServerSagas() {
	yield spawn(runTCPServerOnNetworkRoleChangeSaga);
	yield spawn(restartTCPServerOnNicknameChangeSaga);
}
