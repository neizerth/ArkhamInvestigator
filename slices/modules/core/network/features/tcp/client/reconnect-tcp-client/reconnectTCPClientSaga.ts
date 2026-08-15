import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import {
	selectClientReconnectAllowed,
	tcpClientSocketClosed,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const allowed: ReturnType<typeof selectClientReconnectAllowed> = yield select(
		selectClientReconnectAllowed,
	);

	if (!allowed) {
		return;
	}

	yield put(restartTCPClient());
}

export function* reconnectTCPClientSaga() {
	yield takeEvery(tcpClientSocketClosed.match, worker);
}
