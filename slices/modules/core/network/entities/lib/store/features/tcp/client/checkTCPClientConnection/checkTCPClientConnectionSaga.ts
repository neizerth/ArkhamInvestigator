import { log } from "@modules/core/log/shared/config";
import {
	getTCPServerSocket,
	selectClientRunning,
	selectHostIP,
	selectNetworkRole,
	sendNetworkKeepAlive,
} from "@modules/core/network/shared/lib";
import { selectCurrentRoute } from "@modules/core/router/shared/lib";
import { selectGameStatus } from "@modules/game/shared/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { restartTCPClient } from "../restartTCPClient";
import { checkTCPClientConnection } from "./checkTCPClientConnection";

function* worker() {
	const currentRoute: ReturnType<typeof selectCurrentRoute> =
		yield select(selectCurrentRoute);
	if (currentRoute === routes.home) {
		return;
	}

	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	if (networkRole !== "client") {
		return;
	}

	const hostIP: ReturnType<typeof selectHostIP> = yield select(selectHostIP);
	if (!hostIP) {
		return;
	}

	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);
	if (gameStatus === "initial") {
		return;
	}
	const running: ReturnType<typeof selectClientRunning> =
		yield select(selectClientRunning);

	if (!running) {
		const socket = getTCPServerSocket();
		if (socket && !socket.destroyed) {
			return;
		}
		log.info("Client not running, restarting");
		yield put(restartTCPClient());
		return;
	}

	const socket = getTCPServerSocket();
	if (!socket || socket.destroyed) {
		log.info("Client socket dead (e.g. after HMR), reconnecting");
		yield put(restartTCPClient());
		return;
	}

	/** Application-level ping so semi-open sockets fail fast after host restart/resume. */
	yield put(sendNetworkKeepAlive());
}

export function* checkTCPClientConnectionSaga() {
	yield takeEvery(checkTCPClientConnection.match, worker);
}
