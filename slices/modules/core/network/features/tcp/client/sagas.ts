import { spawn } from "redux-saga/effects";

import { addTCPClientToHostSaga } from "./add-tcp-client-to-host/addTCPClientToHostSaga";
import { reconnectTCPClientSaga } from "./reconnect-tcp-client/reconnectTCPClientSaga";
import { runTCPClientOnHostIPChangeSaga } from "./run-tcp-client-on-host-ip-change/runTCPClientOnHostIPChangeSaga";
import { stopTCPClientOnNetworkRoleChangeSaga } from "./stop-tcp-client-on-network-role-change/stopTCPClientOnNetworkRoleChangeSaga";
import { transformTCPClientDataToActionSaga } from "./transform-tcp-client-data-to-action/transformTCPClientDataToActionSaga";

export function* tcpClientSagas() {
	yield spawn(runTCPClientOnHostIPChangeSaga);
	yield spawn(stopTCPClientOnNetworkRoleChangeSaga);
	yield spawn(transformTCPClientDataToActionSaga);
	yield spawn(addTCPClientToHostSaga);
	yield spawn(reconnectTCPClientSaga);
}
