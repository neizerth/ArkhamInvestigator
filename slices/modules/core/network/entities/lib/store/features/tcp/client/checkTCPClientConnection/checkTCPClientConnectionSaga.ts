import {
	getTCPServerSocket,
	selectClientRunning,
	selectNetworkRole,
	sendNetworkKeepAlive,
} from "@modules/core/network/shared/lib";
import { selectGameStatus } from "@modules/game/shared/lib";
import { selectIsClientPlaying } from "@modules/multiplayer/entities/lib";
import { log } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { restartTCPClient } from "../restartTCPClient";
import { checkTCPClientConnection } from "./checkTCPClientConnection";

function* worker() {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	if (networkRole !== "client") {
		return;
	}
	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);
	if (gameStatus === "initial") {
		return;
	}
	const running: ReturnType<typeof selectClientRunning> =
		yield select(selectClientRunning);

	const isClientPlaying: ReturnType<typeof selectIsClientPlaying> =
		yield select(selectIsClientPlaying);

	if (!running) {
		log.info("Client not running, restarting");
		yield put(restartTCPClient());
		return;
	}

	if (!isClientPlaying) {
		log.info("Sending network keep alive");
		yield put(sendNetworkKeepAlive());
		return;
	}

	const socket = getTCPServerSocket();
	if (!socket || socket.destroyed) {
		log.info("Client socket dead (e.g. after HMR), reconnecting");
		yield put(restartTCPClient());
		return;
	}
}

export function* checkTCPClientConnectionSaga() {
	yield takeEvery(checkTCPClientConnection.match, worker);
}
