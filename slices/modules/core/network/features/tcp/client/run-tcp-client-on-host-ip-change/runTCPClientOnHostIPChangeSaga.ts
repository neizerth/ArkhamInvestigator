import { selectGameStatus } from "@modules/game/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	selectNetworkRole,
	setHostIp,
	startTCPClient,
	stopTCPClient,
} from "../../../../shared/lib";

function* worker({ payload }: ReturnType<typeof setHostIp>) {
	const gameStatus: ReturnType<typeof selectGameStatus> =
		yield select(selectGameStatus);

	if (gameStatus !== "initial") {
		return;
	}

	const networkRole: ReturnType<typeof selectNetworkRole> =
		yield select(selectNetworkRole);

	if (networkRole !== "client" || !payload) {
		return;
	}

	yield put(stopTCPClient());
	yield put(startTCPClient({ host: payload }));
}

export function* runTCPClientOnHostIPChangeSaga() {
	yield takeEvery(setHostIp.match, worker);
}
