import {
	selectHostIP,
	selectNetworkRole,
	startTCPClient,
} from "@modules/core/network/shared/lib";
import { resumeGame } from "@modules/game/entities/resumeGame";
import { selectGameStatus } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);
	if (gameStatus === "initial" || networkRole !== "client") {
		return;
	}

	const hostIP: ReturnType<typeof selectHostIP> = yield select(selectHostIP);
	console.log("hostIP", hostIP);

	if (!hostIP) {
		console.error("No host IP found");
		return;
	}
	yield put(startTCPClient({ host: hostIP }));
}

export function* runTCPClientOnResumeSaga() {
	yield takeEvery(resumeGame.match, worker);
}
