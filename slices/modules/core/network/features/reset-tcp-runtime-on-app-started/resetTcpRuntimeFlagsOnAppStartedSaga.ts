import { appStarted } from "@modules/core/app/shared/lib";
import {
	getTCPClientSockets,
	getTCPServerInstance,
	setClientRunning,
	setHostRunning,
} from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

/**
 * Clear stale persisted TCP flags only when there is no matching native socket.
 * Blind `false` on every `appStarted` raced with router → server could listen before
 * `useAppLoad`'s effect and we'd wipe `hostRunning` while the port was up.
 */
function* worker() {
	if (!getTCPServerInstance()) {
		yield put(setHostRunning(false));
	}
	if (getTCPClientSockets().length === 0) {
		yield put(setClientRunning(false));
	}
}

export function* resetTcpRuntimeFlagsOnAppStartedSaga() {
	yield takeEvery(appStarted.match, worker);
}
