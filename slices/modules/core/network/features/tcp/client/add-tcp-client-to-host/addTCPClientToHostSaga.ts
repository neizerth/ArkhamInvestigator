import {
	connectNetworkClient,
	selectNickname,
	tcpClientSocketConnected,
} from "@modules/core/network/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);

	yield put(
		connectNetworkClient({
			nickname,
		}),
	);
}

export function* addTCPClientToHostSaga() {
	yield takeEvery(tcpClientSocketConnected.match, worker);
}
