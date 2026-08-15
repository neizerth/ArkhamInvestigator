import { log } from "@modules/core/log/shared/config";
import {
	getTCPServerSocket,
	selectClientReconnectAllowed,
	selectClientRunning,
	sendNetworkKeepAlive,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { restartTCPClient } from "../restartTCPClient";
import { checkTCPClientConnection } from "./checkTCPClientConnection";

function* worker() {
	const allowed: ReturnType<typeof selectClientReconnectAllowed> = yield select(
		selectClientReconnectAllowed,
	);
	if (!allowed) {
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
