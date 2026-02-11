import { appStarted } from "@modules/core/app/shared/lib";
import {
	selectNetworkRole,
	startTCPServer,
} from "@modules/core/network/shared/lib";
import { selectGameMode } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);
	if (networkRole !== "host" || gameMode !== "multiplayer") {
		return;
	}
	yield put(startTCPServer());
}

export function* runTCPServerOnAppStartSaga() {
	yield takeEvery(appStarted.match, worker);
}
