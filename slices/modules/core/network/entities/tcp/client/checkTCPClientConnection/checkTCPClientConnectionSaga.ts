import {
	selectClientRunning,
	selectHostIp,
	selectNetworkRole,
} from "@modules/core/network/shared/lib";
import {
	sendNetworkKeepAlive,
	startTCPClient,
} from "@modules/core/network/shared/lib";
import { selectGameStatus } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
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
	const hostIp: ReturnType<typeof selectHostIp> = yield select(selectHostIp);

	if (running) {
		console.log(Date.now(), "Sending network keep alive");
		yield put(sendNetworkKeepAlive());
	}
	if (!hostIp) {
		console.log("No host IP found");
		return;
	}

	yield put(startTCPClient({ host: hostIp }));
}

export function* checkTCPClientConnectionSaga() {
	yield takeEvery(checkTCPClientConnection.match, worker);
}
