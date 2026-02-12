import { selectGameStatus } from "@modules/game/shared/lib";
import { seconds } from "@shared/lib";
import { call, delay, put, select } from "redux-saga/effects";
import {
	selectClientRunning,
	selectHostIp,
	selectNetworkRole,
	sendNetworkKeepAlive,
	startTCPClient,
} from "../../shared/lib";

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
		console.log("Sending network keep alive");
		yield put(sendNetworkKeepAlive());
	}
	if (!hostIp) {
		console.log("No host IP found");
		return;
	}

	yield put(startTCPClient({ host: hostIp }));
}

export function* sendNetworkClientKeepAliveSaga() {
	while (true) {
		yield call(worker);
		yield delay(seconds(20));
	}
}
