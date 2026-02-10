import { sendTCPServerAction } from "@modules/core/network/entities/tcp/client/sendTCPServerAction";
import {
	initNetworkClient,
	selectNickname,
	tcpClientSocketConnected,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	const action = initNetworkClient({
		nickname,
	});

	yield put(
		sendTCPServerAction({
			action,
		}),
	);
}

export function* initTCPClientOnConnectedSaga() {
	yield takeEvery(tcpClientSocketConnected.match, worker);
}
