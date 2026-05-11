import { selectGameStatus } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectNetworkRole,
	setHostIP,
	startTCPClient,
	stopTCPClient,
} from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setHostIP>) {
	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	if (networkRole !== "client") {
		return;
	}

	if (!payload) {
		yield put(stopTCPClient());
		return;
	}

	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);

	if (gameStatus !== "initial") {
		return;
	}

	yield put(stopTCPClient());
	yield put(startTCPClient({ host: payload }));
}

export function* runTCPClientOnHostIPChangeSaga() {
	yield takeEvery(setHostIP.match, worker);
}
