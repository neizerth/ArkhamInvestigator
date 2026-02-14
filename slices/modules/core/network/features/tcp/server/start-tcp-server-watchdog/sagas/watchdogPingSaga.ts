import {
	startTCPServer,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import { callEvery, seconds } from "@shared/lib";
import type { Task } from "redux-saga";
import { call, cancel, fork, put, take } from "redux-saga/effects";
import { filterHostRunning } from "../lib";
import { checkTCPServerAlive } from "../lib/checkTCPServerAlive";

function* worker() {
	const alive: boolean = yield call(checkTCPServerAlive);
	if (alive) {
		return;
	}
	yield put(stopTCPServer({ name: null }));
	yield put(startTCPServer());
}

function* callSaga() {
	yield callEvery(seconds(5), worker);
}

export function* watchdogPingSaga() {
	while (true) {
		yield take(filterHostRunning(true));
		const task: Task = yield fork(callSaga);
		yield take(filterHostRunning(false));
		yield cancel(task);
	}
}
