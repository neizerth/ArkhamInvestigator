import { spawn } from "redux-saga/effects";
import { clearNetworkOnNewGameSaga } from "./clear-network-on-new-game/clearNetworkOnNewGameSaga";
import { generateRandomNicknameOnLanguageSaga } from "./generate-random-nickname-on-language/generateRandomNicknameOnLanguageSaga";
import { initAndroidNetworkingSaga } from "./init-android-networking/initAndroidNetworkingSaga";
import { sendNetworkClientKeepAliveSaga } from "./send-network-client-keep-alive/sendNetworkClientKeepAliveSaga";
import { tcpSagas } from "./tcp/sagas";
import { watchNetworkUpdateSaga } from "./watch-network-update/watchNetworkUpdateSaga";

export function* networkFeaturesSaga() {
	yield spawn(initAndroidNetworkingSaga);
	yield spawn(watchNetworkUpdateSaga);
	yield spawn(generateRandomNicknameOnLanguageSaga);
	yield spawn(clearNetworkOnNewGameSaga);

	yield spawn(tcpSagas);
	yield spawn(sendNetworkClientKeepAliveSaga);
}
