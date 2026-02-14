import { selectHostIp, startTCPClient } from "@modules/core/network/shared/lib";
import { seconds } from "@shared/lib";
import { put, select, takeLeading } from "redux-saga/effects";
import { restartTCPClient } from "./restartTCPClient";

const RESTART_THROTTLE_MS = seconds(5);
let lastRestartTime = 0;

function* worker() {
	const now = Date.now();
	if (now - lastRestartTime < RESTART_THROTTLE_MS) {
		return;
	}

	const hostIp: ReturnType<typeof selectHostIp> = yield select(selectHostIp);
	if (!hostIp) {
		return;
	}

	lastRestartTime = now;
	yield put(startTCPClient({ host: hostIp }));
}

export function* restartTCPClientSaga() {
	yield takeLeading(restartTCPClient.match, worker);
}
