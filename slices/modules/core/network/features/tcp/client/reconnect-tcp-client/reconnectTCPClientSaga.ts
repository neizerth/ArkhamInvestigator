import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import {
	selectHostIP,
	tcpClientSocketClosed,
} from "@modules/core/network/shared/lib";
import { selectCurrentRoute } from "@modules/core/router/shared/lib";
import { selectGameMode, selectGameStatus } from "@modules/game/shared/lib";
import { routes } from "@shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const currentRoute: ReturnType<typeof selectCurrentRoute> =
		yield select(selectCurrentRoute);
	if (currentRoute === routes.home) {
		return;
	}

	const hostIP: ReturnType<typeof selectHostIP> = yield select(selectHostIP);
	if (!hostIP) {
		return;
	}

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
