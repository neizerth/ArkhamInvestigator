import { callEvery, seconds } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

import { appStateChanged } from "@modules/core/app/shared/lib";
import { selectGameMode, selectGameStatus } from "@modules/game/shared/lib";
import { checkTCPClientConnection } from "../../entities/tcp/client/checkTCPClientConnection";
import {
	selectClientRunning,
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

function* deadHostWorker() {
	const running: ReturnType<typeof selectClientRunning> =
		yield select(selectClientRunning);
	if (running) {
		return;
	}
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
	yield callEvery(seconds(20), worker);
	yield callEvery(seconds(1), deadHostWorker);
	yield callEvery(seconds(1), deadServerWorker);
	yield takeEvery(filterAppStateAction, worker);
	yield takeEvery(filterAppStateAction, deadServerWorker);
}
