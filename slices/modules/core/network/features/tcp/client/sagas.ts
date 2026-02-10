import { spawn } from "redux-saga/effects";

import { initTCPClientOnConnectedSaga } from "./init-tcp-client-on-connected/initTCPClientOnConnectedSaga";
import { runTCPClientOnHostIPChangeSaga } from "./run-tcp-client-on-host-ip-change/runTCPClientOnHostIPChangeSaga";
import { stopTCPClientOnNetworkRoleChangeSaga } from "./stop-tcp-client-on-network-role-change/stopTCPClientOnNetworkRoleChangeSaga";

export function* tcpClientSagas() {
	yield spawn(runTCPClientOnHostIPChangeSaga);
	yield spawn(stopTCPClientOnNetworkRoleChangeSaga);
	yield spawn(initTCPClientOnConnectedSaga);
}
