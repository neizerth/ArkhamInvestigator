import { spawn } from "redux-saga/effects";
import { changeNicknameSaga } from "./changeNickname/changeNicknameSaga";
import { checkNetworkSaga } from "./checkNetwork/checkNetworkSaga";
import { generateRandomNicknameSaga } from "./generateRandomNickname/generateRandomNicknameSaga";
import { tcpSagas } from "./tcp/sagas";

export function* networkEntitiesSaga() {
	yield spawn(checkNetworkSaga);
	yield spawn(generateRandomNicknameSaga);
	yield spawn(changeNicknameSaga);
	yield spawn(tcpSagas);
}
