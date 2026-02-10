import { spawn } from "redux-saga/effects";
import { generateRandomNicknameIfEmptySaga } from "./generate-random-nickname-if-empty/generateRandomNicknameIfEmptySaga";
import { tcpSagas } from "./tcp/sagas";
import { watchNetworkUpdateSaga } from "./watch-network-update/watchNetworkUpdateSaga";

export function* networkFeaturesSaga() {
	yield spawn(watchNetworkUpdateSaga);
	yield spawn(generateRandomNicknameIfEmptySaga);
	yield spawn(tcpSagas);
}
