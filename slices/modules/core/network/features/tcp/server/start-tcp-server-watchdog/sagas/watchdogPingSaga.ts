import {
	removeAllNetworkClients,
	startTCPServer,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import { callEvery, seconds } from "@shared/lib";
import type { Task } from "redux-saga";
import { call, cancel, fork, put, take } from "redux-saga/effects";
import { filterHostRunning } from "../lib";
import { checkTCPServerAlive } from "../lib/checkTCPServerAlive";

/**
 * The liveness probe opens a real TCP connection to our own port, so every tick costs a connect,
 * a write and a teardown that the server sees as a client session. 5s was pure churn — a dead
 * listener does not recover on its own, so noticing it half a minute later is soon enough.
 */
const WATCHDOG_INTERVAL = seconds(30);

function* worker() {
	const alive: boolean = yield call(checkTCPServerAlive);
	if (alive) {
		return;
	}
	yield put(stopTCPServer());
	// Sockets are destroyed with the server (`clearTCPClientSockets`), so the roster must go too —
	// otherwise the lobby keeps showing players whose connection no longer exists.
	yield put(removeAllNetworkClients());
	yield put(startTCPServer());
}

function* callSaga() {
	yield callEvery(WATCHDOG_INTERVAL, worker);
}

export function* watchdogPingSaga() {
	while (true) {
		yield take(filterHostRunning(true));
		const task: Task = yield fork(callSaga);
		yield take(filterHostRunning(false));
		yield cancel(task);
	}
}
