import {
	selectHostIP,
	startTCPClient,
	stopTCPClient,
} from "@modules/core/network/shared/lib";
import { seconds } from "@shared/lib";
import { delay, put, select, takeLeading } from "redux-saga/effects";
import { restartTCPClient } from "./restartTCPClient";

const RESTART_THROTTLE_MS = seconds(5);
let lastRestartTime = 0;

function* worker() {
	const now = Date.now();
	if (now - lastRestartTime < RESTART_THROTTLE_MS) {
		return;
	}

	const hostIP: ReturnType<typeof selectHostIP> = yield select(selectHostIP);
	if (!hostIP) {
		return;
	}

	lastRestartTime = now;
	yield put(stopTCPClient());
	yield delay(100);
	yield put(startTCPClient({ host: hostIP }));
}

export function* restartTCPClientSaga() {
	yield takeLeading(restartTCPClient.match, worker);
}
