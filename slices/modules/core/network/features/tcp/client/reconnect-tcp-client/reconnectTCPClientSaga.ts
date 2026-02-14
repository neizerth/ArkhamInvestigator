import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import { tcpClientSocketClosed } from "@modules/core/network/shared/lib";
import { selectGameMode, selectGameStatus } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);
	if (gameMode !== "multiplayer") {
		return;
	}
	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);
	if (gameStatus === "initial") {
		return;
	}

	yield put(restartTCPClient());
}

export function* reconnectTCPClientSaga() {
	yield takeEvery(tcpClientSocketClosed.match, worker);
}
