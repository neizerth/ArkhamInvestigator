import { spawn } from "redux-saga/effects";
import { restartTCPServerZeroconfSaga } from "./restartTCPServerZeroconfSaga";
import { startTCPServerZeroconfSaga } from "./startTCPServerZeroconfSaga";
import { stopTCPServerZeroconfSaga } from "./stopTCPServerZeroconfSaga";

export function* zeroconfSagas() {
	yield spawn(startTCPServerZeroconfSaga);
	yield spawn(stopTCPServerZeroconfSaga);
	yield spawn(restartTCPServerZeroconfSaga);
}
