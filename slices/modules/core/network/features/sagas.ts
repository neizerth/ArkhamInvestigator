import { spawn } from "redux-saga/effects";
import { generateRandomNicknameIfEmptySaga } from "./generate-random-nickname-if-empty/generateRandomNicknameIfEmptySaga";
import { runTCPServerOnNetworkRoleChangeSaga } from "./run-tcp-server-on-network-role-change/runTCPServerOnNetworkRoleChangeSaga";
import { watchNetworkUpdateSaga } from "./watch-network-update/watchNetworkUpdateSaga";

export function* networkFeaturesSaga() {
	yield spawn(watchNetworkUpdateSaga);
	yield spawn(generateRandomNicknameIfEmptySaga);
	// yield spawn(runTCPServerOnNetworkTypeChangeSaga);
	yield spawn(runTCPServerOnNetworkRoleChangeSaga);
}
