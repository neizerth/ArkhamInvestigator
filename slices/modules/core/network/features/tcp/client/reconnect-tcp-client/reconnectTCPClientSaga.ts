import {
	selectHostIp,
	startTCPClient,
	tcpClientSocketClosed,
} from "@modules/core/network/shared/lib";
import { selectGameMode, selectGameStatus } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof tcpClientSocketClosed>) {
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);
	if (gameMode !== "multiplayer") {
		return;
	}
	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);
	const hostIp: ReturnType<typeof selectHostIp> = yield select(selectHostIp);
	if (gameStatus === "initial" || !hostIp) {
		return;
	}

	yield put(startTCPClient({ host: hostIp }));
}

export function* reconnectTCPClientSaga() {
	yield takeEvery(tcpClientSocketClosed.match, worker);
}
