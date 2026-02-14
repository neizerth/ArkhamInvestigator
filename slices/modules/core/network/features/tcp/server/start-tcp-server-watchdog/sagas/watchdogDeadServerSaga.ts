import { startTCPServer } from "@modules/core/network/shared/lib";
import { callEvery, seconds } from "@shared/lib";
import type { Task } from "redux-saga";
import { cancel, fork, put, take } from "redux-saga/effects";
import { filterHostRunning } from "../lib";

function* worker() {
	yield put(startTCPServer());
}

function* callSaga() {
	yield callEvery(seconds(1), worker);
}

export function* watchdogDeadServerSaga() {
	while (true) {
		yield take(filterHostRunning(false));
		const task: Task = yield fork(callSaga);
		yield take(filterHostRunning(true));
		yield cancel(task);
	}
}
