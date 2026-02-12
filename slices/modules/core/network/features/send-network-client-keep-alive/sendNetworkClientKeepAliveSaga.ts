import { callEvery, seconds } from "@shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

import { appStateChanged } from "@modules/core/app/shared/lib";
import { checkTCPClientConnection } from "../../entities/tcp/client/checkTCPClientConnection";
import { selectClientRunning } from "../../shared/lib";

const filterAppStateAction = (action: unknown) => {
	if (!appStateChanged.match(action)) {
		return false;
	}
	return action.payload === "active";
};

function* worker() {
	yield put(checkTCPClientConnection());
}

function* deadHostWorker() {
	const running: ReturnType<typeof selectClientRunning> =
		yield select(selectClientRunning);
	if (running) {
		return;
	}
	yield put(checkTCPClientConnection());
}

export function* sendNetworkClientKeepAliveSaga() {
	yield callEvery(seconds(20), worker);
	yield callEvery(seconds(1), deadHostWorker);
	yield takeEvery(filterAppStateAction, worker);
}
