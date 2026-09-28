import { callEvery, seconds } from "@shared/lib";
import { fork, put, select, takeEvery } from "redux-saga/effects";

import { appStateChanged } from "@modules/core/app/shared/lib";
import { selectGameMode, selectGameStatus } from "@modules/game/shared/lib";
import { checkTCPClientConnection } from "../../entities/lib/store/features/tcp/client/checkTCPClientConnection";
import {
	selectHostRunning,
	selectNetworkRole,
	startTCPServer,
} from "../../shared/lib";

const filterAppStateAction = (action: unknown) => {
	if (!appStateChanged.match(action)) {
		return false;
	}
	return action.payload === "active";
};

function* worker() {
	yield put(checkTCPClientConnection());
}

function* deadServerWorker() {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	if (networkRole !== "host") {
		return;
	}
	const hostRunning: ReturnType<typeof selectHostRunning> =
		yield select(selectHostRunning);
	if (hostRunning) {
		return;
	}
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);
	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);
	if (gameMode !== "multiplayer" || gameStatus === "initial") {
		return;
	}
	yield put(startTCPServer());
}

export function* sendNetworkClientKeepAliveSaga() {
	// FIXED (found 2026-09-28, unreported/unnoticed bug): `callEvery` (unlike `takeEvery`) is a
	// plain hand-written `while (true) { call; delay }` generator, not a self-forking helper —
	// yielding it directly blocks this generator on its infinite loop forever. Un-`fork`ed, only the
	// very first line below ever ran: the 1s dead-server-restart poll and BOTH `appStateChanged`
	// watchers never started at all, silently, since nothing throws — host self-healing on a dead
	// TCP server and the foreground-triggered pings never fired. `fork` runs all four concurrently,
	// which is what the original code was actually trying to do.
	/** Covers lobby + `playing`: pushes TCP traffic so stale sessions surface without waiting for user input. */
	yield fork(pingEveryTenSeconds);
	yield fork(pollDeadServer);
	yield takeEvery(filterAppStateAction, worker);
	yield takeEvery(filterAppStateAction, deadServerWorker);
}

function* pingEveryTenSeconds() {
	yield* callEvery(seconds(10), worker);
}

function* pollDeadServer() {
	yield* callEvery(seconds(1), deadServerWorker);
}
