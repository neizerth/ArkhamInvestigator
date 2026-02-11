import { spawn } from "redux-saga/effects";
import { clearNetworkOnNewGameSaga } from "./clear-network-on-new-game/clearNetworkOnNewGameSaga";
import { generateRandomNicknameIfEmptySaga } from "./generate-random-nickname-if-empty/generateRandomNicknameIfEmptySaga";
import { sendNetworkClientKeepAliveSaga } from "./send-network-client-keep-alive/sendNetworkClientKeepAliveSaga";
import { tcpSagas } from "./tcp/sagas";
import { watchNetworkUpdateSaga } from "./watch-network-update/watchNetworkUpdateSaga";

export function* networkFeaturesSaga() {
	yield spawn(watchNetworkUpdateSaga);
	yield spawn(generateRandomNicknameIfEmptySaga);
	yield spawn(clearNetworkOnNewGameSaga);

	yield spawn(tcpSagas);
	yield spawn(sendNetworkClientKeepAliveSaga);
}
