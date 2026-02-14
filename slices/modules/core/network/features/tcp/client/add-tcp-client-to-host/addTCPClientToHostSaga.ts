import { sendNetworkClientInfo } from "@modules/core/network/entities/lib/store/features/tcp/client/sendNetworkClientInfo";
import { tcpClientSocketConnected } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(sendNetworkClientInfo());
}

export function* addTCPClientToHostSaga() {
	yield takeEvery(tcpClientSocketConnected.match, worker);
}
