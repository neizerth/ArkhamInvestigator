import {
	selectNetworkRole,
	startTCPServer,
} from "@modules/core/network/shared/lib";
import { resumeGame } from "@modules/game/entities/resumeGame";
import { selectGameMode, selectGameStatus } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);
	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);

	if (
		networkRole !== "host" ||
		gameMode !== "multiplayer" ||
		gameStatus === "initial"
	) {
		return;
	}
	yield put(startTCPServer());
}

export function* runTCPServerOnAppResumeSaga() {
	yield takeEvery(resumeGame.match, worker);
}
