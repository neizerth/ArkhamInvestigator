import { spawn } from "redux-saga/effects";
import { checkNetworkSaga } from "./checkNetwork/checkNetworkSaga";

export function* networkEntitiesSaga() {
	yield spawn(checkNetworkSaga);
}
