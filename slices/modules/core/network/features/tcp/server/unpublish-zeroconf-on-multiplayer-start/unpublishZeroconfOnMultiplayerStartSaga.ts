import {
	selectNetworkRole,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { startGame } from "@modules/game/entities/startGame";
import { selectGameMode } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	if (gameMode !== "multiplayer" || networkRole !== "host") {
		return;
	}
	yield put(stopTCPServerZeroconf());
}

export function* unpublishZeroconfOnMultiplayerStartSaga() {
	yield takeEvery(startGame.match, worker);
}
